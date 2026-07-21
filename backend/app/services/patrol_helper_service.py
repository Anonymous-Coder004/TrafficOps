from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from functools import lru_cache
from app.utils.tsp import solve_tsp
from datetime import datetime
from app.schemas.patrol import PatrolRouteResponse,CheckpointResponse,PatrolSummaryResponse
from app.models.team_resources import TeamResource
from app.models.patrol import Patrol, PatrolStatus
from app.models.patrol_checkpoint import PatrolCheckpoint
from app.services.maps_service import (
    get_distance_matrix,
    get_multi_stop_route,
)
from app.services.junction_service import (
    get_candidate_junctions_from_nearby_stations,haversine_distance
)
def _validate_team(
    db: Session,
    team_id: int,
) -> TeamResource:

    team = (
        db.query(TeamResource)
        .filter(TeamResource.id == team_id)
        .first()
    )

    if team is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found.",
        )

    if (
        team.assigned_latitude is None
        or team.assigned_longitude is None
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Team location unavailable.",
        )

    active_patrol = (
        db.query(Patrol)
        .filter(
            Patrol.team_id == team_id,
            Patrol.status.in_(
                [
                    PatrolStatus.PENDING,
                    PatrolStatus.IN_PROGRESS,
                ]
            ),
        )
        .first()
    )

    if active_patrol:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This team already has an active patrol assigned.",
        )

    return team

def _get_ordered_checkpoints(
    db: Session,
    team: TeamResource,
) -> list:

    candidate_junctions = (
        get_candidate_junctions_from_nearby_stations(
            db=db,
            latitude=team.assigned_latitude,
            longitude=team.assigned_longitude,
        )
    )

    if not candidate_junctions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No candidate junctions found.",
        )

    ranked = _rank_candidate_junctions(
        candidate_junctions,
        team.assigned_latitude,
        team.assigned_longitude,
    )

    top_checkpoints = _select_patrol_checkpoints(ranked)

    coordinates = [
        (
            team.assigned_latitude,
            team.assigned_longitude,
        )
    ]

    coordinates.extend(
        (
            checkpoint["junction"].latitude,
            checkpoint["junction"].longitude,
        )
        for checkpoint in top_checkpoints
    )

    distance_matrix = get_distance_matrix(
        coordinates
    )

    visit_order, _ = solve_tsp(distance_matrix)
    ordered_checkpoints = [
        top_checkpoints[i - 1]
        for i in visit_order[1:-1]  
    ]

    return ordered_checkpoints

def _generate_route(
    team: TeamResource,
    ordered_checkpoints: list,
):

    route_coordinates = [
        (
            team.assigned_latitude,
            team.assigned_longitude,
        )
    ]

    route_coordinates.extend(
        (
            checkpoint["junction"].latitude,
            checkpoint["junction"].longitude,
        )
        for checkpoint in ordered_checkpoints
    )

    # Return to the starting location
    route_coordinates.append(
        (
            team.assigned_latitude,
            team.assigned_longitude,
        )
    )

    return get_multi_stop_route(route_coordinates)

def _create_patrol(
    team: TeamResource,
    admin_id: int,
    ordered_checkpoints: list,
    route,
) -> Patrol:

    return Patrol(
        team_id=team.id,
        assigned_by=admin_id,
        start_latitude=team.assigned_latitude,
        start_longitude=team.assigned_longitude,
        end_latitude=team.assigned_latitude,
        end_longitude=team.assigned_longitude,
        total_distance=route.distance,
        estimated_duration=route.duration,
        route_geometry=route.coordinates,
        status=PatrolStatus.PENDING,
    )

def _save_patrol_checkpoints(
    db: Session,
    patrol: Patrol,
    ordered_checkpoints: list,
) -> list[CheckpointResponse]:

    checkpoint_responses = []

    for visit_order, checkpoint in enumerate(
        ordered_checkpoints,
        start=1,
    ):

        junction = checkpoint["junction"]

        db.add(
            PatrolCheckpoint(
                patrol_id=patrol.id,
                junction_id=junction.id,
                visit_order=visit_order,
                priority_score=checkpoint["score"]
            )
        )

        checkpoint_responses.append(
            CheckpointResponse(
                junction_id=junction.id,
                junction_name=junction.junction_name,
                latitude=junction.latitude,
                longitude=junction.longitude,
                priority_score=checkpoint["score"],
                distance_from_team=checkpoint["distance"],
                peak_hour_match=checkpoint["peak_hour_match"],
                visit_order=visit_order,
            )
        )

    return checkpoint_responses

def _build_patrol_response(
    patrol: Patrol,
    team: TeamResource,
    admin_id: int,
    checkpoint_responses: list[CheckpointResponse],
) -> PatrolRouteResponse:

    return PatrolRouteResponse(
        patrol_id=patrol.id,
        team_id=team.id,
        team_name=team.user.username,
        assigned_by=admin_id,
        status=patrol.status,
        start_latitude=patrol.start_latitude,
        start_longitude=patrol.start_longitude,
        end_latitude=patrol.end_latitude,
        end_longitude=patrol.end_longitude,
        total_distance=patrol.total_distance,
        estimated_duration=patrol.estimated_duration,
        total_checkpoints=len(checkpoint_responses),
        checkpoints=checkpoint_responses,
        created_at=patrol.created_at,
        route_geometry=patrol.route_geometry,
    )

def _build_patrol_summary(
    patrol: Patrol,
    team: TeamResource,
) -> PatrolSummaryResponse:

    return PatrolSummaryResponse(
        patrol_id=patrol.id,
        team_id=team.id,
        team_name=team.user.username,
        assigned_by=patrol.assigned_by,
        status=patrol.status,
        start_latitude=patrol.start_latitude,
        start_longitude=patrol.start_longitude,
        end_latitude=patrol.end_latitude,
        end_longitude=patrol.end_longitude,
        total_distance=patrol.total_distance,
        estimated_duration=patrol.estimated_duration,
        created_at=patrol.created_at,
    )

def _rank_candidate_junctions(
    junctions,
    team_latitude: float,
    team_longitude: float,
):
    """
    Computes an AI-inspired priority score for each junction.

    Factors:
    - Historical violation count
    - Average daily violations
    - Variety of violation types
    - Persistence (active days)
    - Distance from patrol team
    - Peak hour relevance
    """

    if not junctions:
        return []

    current_hour = datetime.now().hour

    max_violation = max(j.violation_count for j in junctions) or 1
    max_daily = max(j.avg_daily_violations for j in junctions) or 1
    max_types = max(j.unique_violation_types for j in junctions) or 1
    max_active_days = max(j.active_days for j in junctions) or 1

    distances = [
        haversine_distance(
            team_latitude,
            team_longitude,
            j.latitude,
            j.longitude,
        )
        for j in junctions
    ]

    max_distance = max(distances) or 1

    ranked = []

    for junction, distance in zip(junctions, distances):

        # -----------------------------
        # Normalized Scores
        # -----------------------------

        violation_score = (
            junction.violation_count / max_violation
        )

        daily_score = (
            junction.avg_daily_violations / max_daily
        )

        diversity_score = (
            junction.unique_violation_types / max_types
        )

        persistence_score = (
            junction.active_days / max_active_days
        )

        # nearer junction -> higher score
        proximity_score = max(
            0,
            1 - (distance / max_distance)
        )

        # ---------------------------------
        # Peak Hour Relevance
        # ---------------------------------

        hour_difference = abs(
            current_hour - junction.peak_hour
        )

        # handle wrap-around (23 -> 0)
        hour_difference = min(
            hour_difference,
            24 - hour_difference,
        )

        peak_hour_score = max(
            0,
            1 - (hour_difference / 12)
        )

        # ---------------------------------
        # Final Weighted Score
        # ---------------------------------

        score = (
            0.30 * violation_score
            + 0.20 * daily_score
            + 0.15 * diversity_score
            + 0.10 * persistence_score
            + 0.15 * proximity_score
            + 0.10 * peak_hour_score
        )

        ranked.append(
            {
                "junction": junction,
                "score": round(score, 4),
                "distance": round(distance, 2),
                "peak_hour_match": round(peak_hour_score, 2),
            }
        )

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True,
    )

    return ranked

def _select_patrol_checkpoints(
    ranked_junctions,
    top_k: int = 5,
    min_distance_km: float = 0.20,
):
    """
    Selects the top patrol checkpoints while ensuring
    checkpoints are spatially separated.

    Parameters:
        top_k: number of checkpoints required.
        min_distance_km: minimum separation between checkpoints.
                         Default = 200 meters.
    """

    if not ranked_junctions:
        return []

    selected = []

    for candidate in ranked_junctions:

        junction = candidate["junction"]

        too_close = False

        for existing in selected:

            distance = haversine_distance(
                junction.latitude,
                junction.longitude,
                existing["junction"].latitude,
                existing["junction"].longitude,
            )

            if distance < min_distance_km:
                too_close = True
                break

        if not too_close:
            selected.append(candidate)

        if len(selected) == top_k:
            break

    return selected
