from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session
from app.api.dep import (
    get_current_ground_officer,
)
from app.db.session import get_db
from app.models.users import User
from app.schemas.incident import (
    IncidentCreate,
    IncidentCreatedResponse,
)
from app.services.incident_service import (
    create_incident,
)


router = APIRouter(
    prefix="/v1/ground-officers/incidents",
    dependencies=[Depends(get_current_ground_officer)],
    tags=["Ground Officers"],
)

@router.post("",response_model=IncidentCreatedResponse,status_code=status.HTTP_201_CREATED)
def create_incident_endpoint(
    incident_data: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_ground_officer,
    ),
):
    if current_user.team_resource is None:
        raise HTTPException(
            status_code=400,
            detail="Officer is not assigned to a team.",
        )

    incident = create_incident(
        db=db,
        incident_data=incident_data,
        reporting_team_id=current_user.team_resource.id,
    )

    return IncidentCreatedResponse(
        incident_id=incident.id,
        message="Incident reported successfully.",
    )