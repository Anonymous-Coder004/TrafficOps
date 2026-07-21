from pydantic import BaseModel
class AvailableTeamResponse(BaseModel):
    team_id: int
    team_name: str