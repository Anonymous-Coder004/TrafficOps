from sqlalchemy.orm import Session
from app.models.incident import Incident
from app.models.incident_recommendation import (
    IncidentRecommendation,
)
from app.enums.incident import (
    IncidentStatus,
)
from app.schemas.incident import IncidentCreate,RecommendationUpdate
from app.services.police_station_service import (
    find_nearest_police_station,
)
from app.services.incident_prediction_service import (
    predict_incident_priority,
)
from app.models.incident_recommendation import (
    IncidentRecommendation,
)
from app.services.incident_recommendation_service import (
    generate_recommendation,
)
from fastapi import HTTPException, status

def create_incident(
    db: Session,
    incident_data: IncidentCreate,
    reporting_team_id: int,
):
    try:
        nearest_result = find_nearest_police_station(
            db=db,
            latitude=incident_data.latitude,
            longitude=incident_data.longitude,
        )

        station = nearest_result["station"]
        distance_km = nearest_result["distance_km"]

        incident = Incident(
            title=incident_data.title,
            description=incident_data.description,
            event_type=incident_data.event_type,
            event_cause=incident_data.event_cause,
            vehicle_type=incident_data.vehicle_type,
            latitude=incident_data.latitude,
            longitude=incident_data.longitude,
            police_station_id=station.id,
            nearest_station_distance_km=distance_km,
            reported_by_team_id=reporting_team_id,
            status=IncidentStatus.REPORTED,
        )

        db.add(incident)
        db.commit()
        db.refresh(incident)

        return incident

    except Exception:
        db.rollback()
        raise

def get_active_incidents(db: Session):
    """
    Returns all incidents,
    ordered by newest first.
    """
    return (
        db.query(Incident)
        .order_by(
            Incident.created_at.desc()
        )
        .all()
    )

def get_incident_by_id(
    db: Session,
    incident_id: int,
) -> Incident:
    """
    Fetch a single incident by its ID.
    Raises 404 if not found.
    """

    incident = (
        db.query(Incident)
        .filter(
            Incident.id == incident_id
        )
        .first()
    )

    if incident is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incident not found.",
        )

    return incident

def predict_incident_criticality(
    db: Session,
    incident_id: int,
):
    incident = get_incident_by_id(
        db=db,
        incident_id=incident_id,
    )

    if incident.status != IncidentStatus.REPORTED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Criticality can only be predicted for reported incidents.",
        )

    prediction = predict_incident_priority(
        event_type=incident.event_type.value,
        event_cause=incident.event_cause.value,
        vehicle_type=(
            incident.vehicle_type.value
            if incident.vehicle_type
            else None
        ),
        police_station=incident.police_station.name,
        zone=incident.police_station.zone,
        description=incident.description,
    )

    incident.criticality = prediction["criticality"]
    incident.criticality_confidence = prediction["confidence"]
    incident.status = IncidentStatus.ANALYZED

    # Create or update recommendation
    if incident.recommendation is None:
        recommendation = IncidentRecommendation(
            incident_id=incident.id,
            criticality=prediction["criticality"],
            confidence=prediction["confidence"],
        )
        db.add(recommendation)
    else:
        incident.recommendation.criticality = prediction["criticality"]
        incident.recommendation.confidence = prediction["confidence"]

    db.commit()

    db.refresh(incident)
    db.refresh(incident, attribute_names=["recommendation"])

    return incident

def recommend_resources(
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
            detail="Resources can only be recommended for analyzed incidents.",
        )

    recommendation = generate_recommendation(
        incident.criticality
    )

    if incident.recommendation is None:

        incident.recommendation = IncidentRecommendation(
            incident_id=incident.id,
            criticality=incident.criticality,
            confidence=incident.criticality_confidence,
            recommended_officers=recommendation[
                "recommended_officers"
            ],
            recommended_barricades=recommendation[
                "recommended_barricades"
            ],
        )

        db.add(incident.recommendation)

    else:

        incident.recommendation.criticality = (
            incident.criticality
        )

        incident.recommendation.confidence = (
            incident.criticality_confidence
        )

        incident.recommendation.recommended_officers = (
            recommendation["recommended_officers"]
        )

        incident.recommendation.recommended_barricades = (
            recommendation["recommended_barricades"]
        )

    db.commit()
    db.refresh(incident)

    return incident

def update_recommendation(
    db: Session,
    incident_id: int,
    recommendation_data: RecommendationUpdate,
):
    incident = get_incident_by_id(
        db=db,
        incident_id=incident_id,
    )

    if incident.status != IncidentStatus.ANALYZED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recommendation can only be updated for analyzed incidents.",
        )

    if incident.recommendation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recommendation not found.",
        )

    incident.recommendation.recommended_officers = (
        recommendation_data.recommended_officers
    )

    incident.recommendation.recommended_barricades = (
        recommendation_data.recommended_barricades
    )

    db.commit()
    db.refresh(incident)

    return incident