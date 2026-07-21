from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.dep import get_current_ground_officer
from app.models.users import User

from app.schemas.patrol import (
    PatrolRouteResponse,PatrolActionResponse
)

from app.services.patrol_service import (
    get_current_patrol,
    start_patrol,
    complete_patrol,
)

router = APIRouter(
    prefix="/v1/ground-officer/patrols",
    dependencies=[Depends(get_current_ground_officer)],
    tags=["Ground Officers"],
)

@router.get(
    "/current",
    response_model=PatrolRouteResponse,
    status_code=status.HTTP_200_OK,
)
def get_current_patrol_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    return get_current_patrol(
        db=db,
        officer_id=current_user.id,
    )

@router.patch(
    "/{patrol_id}/start",
    response_model=PatrolActionResponse,
    status_code=status.HTTP_200_OK,
)
def start_patrol_endpoint(
    patrol_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    return start_patrol(
        db=db,
        patrol_id=patrol_id,
        officer_id=current_user.id,
    )

@router.patch(
    "/{patrol_id}/complete",
    response_model=PatrolActionResponse,
    status_code=status.HTTP_200_OK,
)
def complete_patrol_endpoint(
    patrol_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_ground_officer),
):
    return complete_patrol(
        db=db,
        patrol_id=patrol_id,
        officer_id=current_user.id,
    )