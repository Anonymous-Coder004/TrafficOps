from math import radians, sin, cos, sqrt, atan2
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models.team_resources import (
    TeamResource,TeamStatus
)
from app.models.incident import Incident
from app.enums.assignment import AssignmentStatus
from app.models.incident_assignment import IncidentAssignment
from fastapi import HTTPException, status
from app.enums.incident import IncidentStatus
from app.services.incident_service import (
    get_incident_by_id,
)
EARTH_RADIUS_KM = 6371.0
def haversine_distance(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return EARTH_RADIUS_KM * c


def find_available_teams(
    db: Session,
    incident_latitude: float,
    incident_longitude: float,
):
    teams = (
        db.query(TeamResource)
        .filter(
            TeamResource.status == TeamStatus.AVAILABLE,
            or_(
                TeamResource.available_officers > 0,
                TeamResource.available_barricades > 0,
            )
        )
        .all()
    )

    teams.sort(
        key=lambda team: haversine_distance(
            incident_latitude,
            incident_longitude,
            team.assigned_latitude,
            team.assigned_longitude,
        )
    )

    return teams

def _allocate_resources(
    db: Session,
    incident: Incident,
):
    required_officers = (
        incident.recommendation.recommended_officers
    )

    required_barricades = (
        incident.recommendation.recommended_barricades
    )

    remaining_officers = required_officers
    remaining_barricades = required_barricades

    assignments = []

    teams = find_available_teams(
        db=db,
        incident_latitude=incident.latitude,
        incident_longitude=incident.longitude,
    )

    for team in teams:

        if (
            remaining_officers <= 0
            and remaining_barricades <= 0
        ):
            break

        officers_to_assign = min(
            remaining_officers,
            team.available_officers,
        )

        barricades_to_assign = min(
            remaining_barricades,
            team.available_barricades,
        )

        if (
            officers_to_assign == 0
            and barricades_to_assign == 0
        ):
            continue

        assignment = IncidentAssignment(
            incident_id=incident.id,
            team_id=team.id,
            officers_assigned=officers_to_assign,
            barricades_assigned=barricades_to_assign,
            status=AssignmentStatus.ASSIGNED
        )

        assignments.append(assignment)

        team.available_officers -= officers_to_assign
        team.available_barricades -= barricades_to_assign


        remaining_officers -= officers_to_assign
        remaining_barricades -= barricades_to_assign

    if (
        remaining_officers > 0
        or remaining_barricades > 0
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient resources available.",
        )

    return assignments

def deploy_incident(
    db: Session,
    incident_id: int,
):
    incident = get_incident_by_id(
        db=db,
        incident_id=incident_id,
    )

    if incident.status != IncidentStatus.ANALYZED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only analyzed incidents can be deployed.",
        )

    if incident.recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recommendation not found.",
        )

    # Allocation logic goes here
    assignments = _allocate_resources(
        db=db,
        incident=incident,
    )

    for assignment in assignments:
        db.add(assignment)

    incident.status = IncidentStatus.RESOURCE_ALLOCATED

    db.commit()
    db.refresh(incident)

    return incident