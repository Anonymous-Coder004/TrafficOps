from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.assignment import AssignmentResponse
from app.services.assignment_service import get_my_assignments,start_assignment,complete_assignment,get_assignment_by_id
from app.api.dep import get_current_ground_officer
from app.models.users import User

router = APIRouter(
    prefix="/v1/ground_officers/assignments",
    tags=["Ground Officers"],
    dependencies=[Depends(get_current_ground_officer)]
)


@router.get(
    "",
    response_model=list[AssignmentResponse],
    status_code=status.HTTP_200_OK,
)
def get_assignments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    if current_user.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
        )

    return get_my_assignments(
        db=db,
        team_id=current_user.team_resource.id,
    )

@router.get(
    "/{assignment_id}",
    response_model=AssignmentResponse,
    status_code=status.HTTP_200_OK
)
def get_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    if current_user.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
    )
    return get_assignment_by_id(
        db=db,
        assignment_id=assignment_id,
        team_id=current_user.team_resource.id,
    )

@router.patch(
    "/{assignment_id}/start",
    response_model=AssignmentResponse,
    status_code=status.HTTP_200_OK,
)
def start_assignment_endpoint(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    if current_user.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
        )

    return start_assignment(
        db=db,
        assignment_id=assignment_id,
        team_id=current_user.team_resource.id,
    )

@router.patch(
    "/{assignment_id}/complete",
    response_model=AssignmentResponse,
    status_code=status.HTTP_200_OK,
)
def complete_assignment_endpoint(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    if current_user.team_resource is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ground officer is not assigned to any team.",
        )

    return complete_assignment(
        db=db,
        assignment_id=assignment_id,
        team_id=current_user.team_resource.id,
    )