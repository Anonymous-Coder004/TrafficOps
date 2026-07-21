from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.dep import get_current_admin
from app.schemas.teams import AvailableTeamResponse
from app.services.team import get_available_teams

router = APIRouter(
    prefix="/v1/admin/patrols",
    dependencies=[Depends(get_current_admin)],
    tags=["Admin"],
)
@router.get(
    "/teams/available",
    response_model=list[AvailableTeamResponse],
    status_code=status.HTTP_200_OK
)
def get_available_teams_endpoint(
    db: Session = Depends(get_db),
):
    return get_available_teams(db)