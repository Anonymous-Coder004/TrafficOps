from pydantic import (
    BaseModel,
    Field,
)
from datetime import datetime
from app.enums.incident import (
    EventType,
    EventCause,
    VehicleType,
    CriticalityLevel,
    IncidentStatus,
)
class IncidentCreate(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=255,
    )
    description: str = Field(
        min_length=5,
    )
    event_type: EventType
    event_cause: EventCause
    vehicle_type: VehicleType | None = None
    latitude: float = Field(
        ge=-90,
        le=90,
    )
    longitude: float = Field(
        ge=-180,
        le=180,
    )

class IncidentRecommendationResponse(BaseModel):
    criticality: CriticalityLevel
    confidence: float
    recommended_officers: int | None=None
    recommended_barricades: int | None=None
    model_config = {
        "from_attributes": True
    }

class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    event_type: EventType
    event_cause: EventCause
    vehicle_type: VehicleType | None
    latitude: float
    longitude: float
    police_station_id: int
    nearest_station_distance_km: float
    status: IncidentStatus
    created_at: datetime
    recommendation: IncidentRecommendationResponse | None = None
    model_config = {
        "from_attributes": True
    }

class IncidentCreatedResponse(BaseModel):
    incident_id: int
    message: str

class RecommendationUpdate(BaseModel):
    recommended_officers: int
    recommended_barricades: int
