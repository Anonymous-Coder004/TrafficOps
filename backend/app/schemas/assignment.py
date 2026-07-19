from pydantic import (
    BaseModel,
)
from datetime import datetime
from app.enums.incident import (
    EventType,
    IncidentStatus,
)
from app.enums.assignment import AssignmentStatus
class AssignmentIncidentResponse(BaseModel):
    id: int
    title: str
    event_type: EventType
    latitude: float
    longitude: float
    status: IncidentStatus

    model_config = {
        "from_attributes": True
    }


class AssignmentResponse(BaseModel):
    id: int
    officers_assigned: int
    barricades_assigned: int
    status: AssignmentStatus
    assigned_at: datetime
    completed_at: datetime | None = None

    incident: AssignmentIncidentResponse

    model_config = {
        "from_attributes": True
    }