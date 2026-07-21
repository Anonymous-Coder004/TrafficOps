from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.dep import get_current_admin
from app.models.users import User

from app.schemas.patrol import (
    PatrolCreate,PatrolSummaryResponse,
    PatrolRouteResponse,
)

from app.services.patrol_service import (
    create_patrol,
    get_all_patrols,
    get_patrol_by_id,
)

router = APIRouter(
    prefix="/v1/admin/patrols",
    dependencies=[Depends(get_current_admin)],
    tags=["Admin"],
)

@router.post(
    "",
    response_model=PatrolSummaryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_patrol_endpoint(
    body: PatrolCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    return create_patrol(
        db=db,
        team_id=body.team_id,
        admin_id=current_admin.id,
    )

@router.get(
    "",
    response_model=list[PatrolSummaryResponse],
    status_code=status.HTTP_200_OK,
)
def get_all_patrols_endpoint(
    db: Session = Depends(get_db),
):
    return get_all_patrols(db)

@router.get(
    "/{patrol_id}",
    response_model=PatrolRouteResponse,
    status_code=status.HTTP_200_OK,
)
def get_patrol_endpoint(
    patrol_id: int,
    db: Session = Depends(get_db),
):
    return get_patrol_by_id(
        db=db,
        patrol_id=patrol_id,
    )