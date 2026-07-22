from fastapi import HTTPException, status
from datetime import datetime,timezone
from sqlalchemy.orm import Session
from app.schemas.patrol import (
    PatrolActionResponse,
    PatrolRouteResponse,
    CheckpointResponse,PatrolSummaryResponse
)
from app.models.patrol import Patrol, PatrolStatus
from app.models.patrol_checkpoint import PatrolCheckpoint
from app.services.junction_service import (
    get_junctions_by_ids
)
from app.enums.team_resources import TeamStatus
from app.models.users import User
from app.services.patrol_helper_service import (_build_patrol_response,_generate_route,_get_ordered_checkpoints,_save_patrol_checkpoints,_validate_team,_create_patrol,_rank_candidate_junctions,_select_patrol_checkpoints,_build_patrol_summary)

def create_patrol(
    db: Session,
    team_id: int,
    radius_km: float,
    admin_id: int,
) -> PatrolSummaryResponse:

    team = _validate_team(
        db=db,
        team_id=team_id,
    )

    ordered_checkpoints = _get_ordered_checkpoints(
        db=db,
        team=team,
        radius_km=radius_km,
    )

    route = _generate_route(
        team=team,
        ordered_checkpoints=ordered_checkpoints,
    )

    patrol = _create_patrol(
        team=team,
        admin_id=admin_id,
        ordered_checkpoints=ordered_checkpoints,
        route=route,
    )

    db.add(patrol)
    db.flush()

    _save_patrol_checkpoints(
        db=db,
        patrol=patrol,
        ordered_checkpoints=ordered_checkpoints,
    )

    # Mark team as occupied
    team.status = TeamStatus.OCCUPIED

    db.commit()
    db.refresh(patrol)

    return _build_patrol_summary(
        patrol=patrol,
        team=team,
    )

def get_patrol_by_id(
    db: Session,
    patrol_id: int,
) -> PatrolRouteResponse:

    patrol = (
        db.query(Patrol)
        .filter(Patrol.id == patrol_id)
        .first()
    )

    if patrol is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patrol not found.",
        )

    patrol_checkpoints = (
        db.query(PatrolCheckpoint)
        .filter(
            PatrolCheckpoint.patrol_id == patrol_id
        )
        .order_by(PatrolCheckpoint.visit_order)
        .all()
    )

    junction_ids = [
        checkpoint.junction_id
        for checkpoint in patrol_checkpoints
    ]

    junctions = get_junctions_by_ids(
        db=db,
        junction_ids=junction_ids,
    )

    junction_map = {
        junction.id: junction
        for junction in junctions
    }

    checkpoint_responses = []

    for checkpoint in patrol_checkpoints:

        junction = junction_map[checkpoint.junction_id]

        checkpoint_responses.append(
            CheckpointResponse(
                junction_id=junction.id,
                junction_name=junction.junction_name,
                latitude=junction.latitude,
                longitude=junction.longitude,
                priority_score=checkpoint.priority_score,
                visit_order=checkpoint.visit_order,
            )
        )

    return _build_patrol_response(
        patrol=patrol,
        team=patrol.team,
        admin_id=patrol.assigned_by,
        checkpoint_responses=checkpoint_responses,
    )

def get_all_patrols(
    db: Session,
) -> list[PatrolRouteResponse]:

    patrols = (
        db.query(Patrol)
        .order_by(Patrol.created_at.desc())
        .all()
    )

    patrol_responses = []

    for patrol in patrols:

        patrol_checkpoints = (
            db.query(PatrolCheckpoint)
            .filter(
                PatrolCheckpoint.patrol_id == patrol.id
            )
            .order_by(PatrolCheckpoint.visit_order)
            .all()
        )

        junction_ids = [
            checkpoint.junction_id
            for checkpoint in patrol_checkpoints
        ]

        junctions = get_junctions_by_ids(
            db=db,
            junction_ids=junction_ids,
        )

        junction_map = {
            junction.id: junction
            for junction in junctions
        }

        checkpoint_responses = []

        for checkpoint in patrol_checkpoints:

            junction = junction_map[checkpoint.junction_id]

            checkpoint_responses.append(
                CheckpointResponse(
                    junction_id=junction.id,
                    junction_name=junction.junction_name,
                    latitude=junction.latitude,
                    longitude=junction.longitude,
                    priority_score=checkpoint.priority_score,
                    visit_order=checkpoint.visit_order,
                )
            )

        patrol_responses.append(
            _build_patrol_response(
                patrol=patrol,
                team=patrol.team,
                admin_id=patrol.assigned_by,
                checkpoint_responses=checkpoint_responses,
            )
        )

    return patrol_responses

def get_current_patrol(
    db: Session,
    officer_id: int,
) -> PatrolRouteResponse:

    officer = (
        db.query(User)
        .filter(User.id == officer_id)
        .first()
    )

    if officer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ground officer not found.",
        )

    if officer.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
        )

    patrol = (
        db.query(Patrol)
        .filter(
            Patrol.team_id == officer.team_resource.id,
            Patrol.status.in_(
                [
                    PatrolStatus.PENDING,
                    PatrolStatus.IN_PROGRESS,
                ]
            ),
        )
        .first()
    )

    if patrol is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No patrol has been assigned yet.",
        )

    return get_patrol_by_id(
        db=db,
        patrol_id=patrol.id,
    )

def start_patrol(
    db: Session,
    patrol_id: int,
    officer_id: int,
) -> PatrolActionResponse:

    officer = (
        db.query(User)
        .filter(User.id == officer_id)
        .first()
    )

    if officer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ground officer not found.",
        )

    if officer.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
        )

    patrol = (
        db.query(Patrol)
        .filter(Patrol.id == patrol_id)
        .first()
    )

    if patrol is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patrol not found.",
        )

    if patrol.team_id != officer.team_resource.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not assigned to this patrol.",
        )

    if patrol.status != PatrolStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only pending patrols can be started.",
        )

    patrol.status = PatrolStatus.IN_PROGRESS
    patrol.started_at = datetime.now(timezone.utc)

    db.commit()

    return PatrolActionResponse(
        patrol_id=patrol.id,
        status=patrol.status,
        message="Patrol started successfully.",
    )

def complete_patrol(
    db: Session,
    patrol_id: int,
    officer_id: int,
) -> PatrolActionResponse:

    officer = (
        db.query(User)
        .filter(User.id == officer_id)
        .first()
    )

    if officer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ground officer not found.",
        )

    if officer.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
        )

    patrol = (
        db.query(Patrol)
        .filter(Patrol.id == patrol_id)
        .first()
    )

    if patrol is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patrol not found.",
        )

    if patrol.team_id != officer.team_resource.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not assigned to this patrol.",
        )

    if patrol.status != PatrolStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only patrols in progress can be completed.",
        )

    patrol.status = PatrolStatus.COMPLETED
    patrol.completed_at = datetime.now(timezone.utc)

    # Mark all checkpoints as completed
    (
        db.query(PatrolCheckpoint)
        .filter(PatrolCheckpoint.patrol_id == patrol.id)
        .update(
            {
                PatrolCheckpoint.is_completed: True
            },
            synchronize_session=False,
        )
    )

    # Make the team available again
    patrol.team.status = TeamStatus.AVAILABLE

    db.commit()

    return PatrolActionResponse(
        patrol_id=patrol.id,
        status=patrol.status,
        message="Patrol completed successfully.",
    )