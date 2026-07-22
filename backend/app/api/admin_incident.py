from fastapi import (
    APIRouter,
    Depends,HTTPException,
    status,
)
from sqlalchemy.orm import Session
from app.api.dep import (
    get_current_admin
)
from app.db.session import get_db
from app.schemas.incident import (
    IncidentResponse,
)
from app.services.incident_service import (
    get_active_incidents,
    get_incident_by_id,
    predict_incident_criticality,
    recommend_resources,
    update_recommendation,
)
from app.services.incident_deployment_service import deploy_incident
from app.schemas.incident import RecommendationUpdate

router = APIRouter(
    prefix="/v1/admin/incidents",
    dependencies=[Depends(get_current_admin)],
    tags=["Admin"],
)

@router.get("",response_model=list[IncidentResponse],status_code=status.HTTP_200_OK)
def get_active_incidents_endpoint(
    db: Session = Depends(get_db),
):
    return get_active_incidents(db)

@router.get("/{incident_id}",response_model=IncidentResponse,status_code=status.HTTP_200_OK)
def get_incident_endpoint(
    incident_id: int,
    db: Session = Depends(get_db),
):
    return get_incident_by_id(
        db=db,
        incident_id=incident_id,
    )

@router.post("/{incident_id}/predict",response_model=IncidentResponse,status_code=status.HTTP_200_OK)
def predict_incident_endpoint(
    incident_id: int,
    db: Session = Depends(get_db),
):
    return predict_incident_criticality(
        db=db,
        incident_id=incident_id,
    )

@router.post("/{incident_id}/recommend",response_model=IncidentResponse,status_code=status.HTTP_200_OK)
def recommend_resources_endpoint(incident_id: int,db: Session = Depends(get_db),
                                ):
    return recommend_resources(
        db=db,
        incident_id=incident_id,
    )

@router.patch("/{incident_id}/recommendation",response_model=IncidentResponse,status_code=status.HTTP_200_OK)
def update_recommendation_endpoint(
    incident_id: int,
    recommendation: RecommendationUpdate,
    db: Session = Depends(get_db),
):
    return update_recommendation(
        db=db,
        incident_id=incident_id,
        recommendation_data=recommendation,
    )

@router.post(
    "/{incident_id}/deploy",
    response_model=IncidentResponse,status_code=status.HTTP_200_OK
)
def deploy_incident_endpoint(
    incident_id: int,
    db: Session = Depends(get_db),
):
    return deploy_incident(
        db=db,
        incident_id=incident_id,
    )