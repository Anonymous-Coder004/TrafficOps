from sqlalchemy.orm import Session, joinedload
from fastapi import (
    HTTPException,
    status,
)
from app.models.incident_assignment import (IncidentAssignment,AssignmentStatus)
from app.enums.assignment import AssignmentStatus
from app.enums.incident import IncidentStatus
from app.enums.team_resources import TeamStatus
from datetime import datetime, UTC

def get_my_assignments(
    db: Session,
    team_id: int,
):
    return (
        db.query(IncidentAssignment)
        .options(
            joinedload(IncidentAssignment.team),
            joinedload(IncidentAssignment.incident),
        )
        .filter(
            IncidentAssignment.team_id == team_id
        )
        .order_by(
            IncidentAssignment.assigned_at.desc()
        )
        .all()
    )

def get_assignment_by_id(
    db: Session,
    assignment_id: int,
    team_id: int,
):

    assignment = (
        db.query(IncidentAssignment)
        .options(
            joinedload(IncidentAssignment.team),
            joinedload(IncidentAssignment.incident),
        )
        .filter(
            IncidentAssignment.id == assignment_id,
            IncidentAssignment.team_id == team_id,
        )
        .first()
    )

    if assignment is None:
        raise HTTPException(
            status_code=404,
            detail="Assignment not found.",
        )

    return assignment

def start_assignment(
    db: Session,
    assignment_id: int,
    team_id: int,
):
    """
    Starts an assigned task for a ground team.
    """

    assignment = (
        db.query(IncidentAssignment)
        .options(
            joinedload(IncidentAssignment.team),
            joinedload(IncidentAssignment.incident),
        )
        .filter(
            IncidentAssignment.id == assignment_id
        )
        .first()
    )

    if assignment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found.",
        )

    if assignment.team_id != team_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to start this assignment.",
        )

    if assignment.status != AssignmentStatus.ASSIGNED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only assigned tasks can be started.",
        )

    assignment.status = AssignmentStatus.IN_PROGRESS

    if (
        assignment.incident.status
        == IncidentStatus.RESOURCE_ALLOCATED
    ):
        assignment.incident.status = (
            IncidentStatus.PROCESSING
        )

    db.commit()

    db.refresh(assignment)

    return assignment

def complete_assignment(
    db: Session,
    assignment_id: int,
    team_id: int,
):
    """
    Completes an assignment, restores team resources,
    and resolves the incident if all assignments
    are completed.
    """

    assignment = (
        db.query(IncidentAssignment)
        .options(
            joinedload(IncidentAssignment.team),
            joinedload(IncidentAssignment.incident),
        )
        .filter(
            IncidentAssignment.id == assignment_id,
        )
        .first()
    )

    if assignment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found.",
        )

    if assignment.team_id != team_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to complete this assignment.",
        )

    if assignment.status != AssignmentStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only in-progress assignments can be completed.",
        )

    # Complete assignment
    assignment.status = AssignmentStatus.COMPLETED
    assignment.completed_at = datetime.now(UTC)

    # Restore team resources
    team = assignment.team

    team.available_officers += assignment.officers_assigned
    team.available_barricades += assignment.barricades_assigned

    # Check if any assignment is still pending
    remaining_assignments = (
        db.query(IncidentAssignment)
        .filter(
            IncidentAssignment.incident_id == assignment.incident_id,
            IncidentAssignment.status != AssignmentStatus.COMPLETED,
            IncidentAssignment.id != assignment.id
        )
        .count()
    )

    if remaining_assignments == 0:
        assignment.incident.status = IncidentStatus.RESOLVED
        assignment.incident.resolved_at = datetime.now(UTC)

    db.commit()
    db.refresh(assignment)

    return assignment