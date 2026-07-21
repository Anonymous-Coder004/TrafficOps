from sqlalchemy.orm import Session

from app.enums.team_resources import TeamStatus
from app.models.team_resources import TeamResource
from app.schemas.teams import AvailableTeamResponse


def get_available_teams(
    db: Session,
) -> list[AvailableTeamResponse]:

    teams = (
        db.query(TeamResource)
        .filter(
            TeamResource.status == TeamStatus.AVAILABLE
        )
        .all()
    )

    return [
        AvailableTeamResponse(
            team_id=team.id,
            team_name=team.user.username,
        )
        for team in teams
    ]