from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict,Field

from app.models.patrol import PatrolStatus


class PatrolCreate(BaseModel):
    team_id: int
    radius_km: float = Field(
        ge=1,
        le=10,
    )


class PatrolStatusUpdate(BaseModel):

    status: PatrolStatus


class PatrolResponse(BaseModel):

    id: int

    team_id: int
    team_name: str

    assigned_by: int

    start_latitude: float
    start_longitude: float

    end_latitude: float
    end_longitude: float

    total_distance: float
    estimated_duration: float

    route_geometry: list[tuple[float, float]]

    status: PatrolStatus

    created_at: datetime
    started_at: datetime | None
    completed_at: datetime | None

    model_config = ConfigDict(
        from_attributes=True
    )

class CheckpointResponse(BaseModel):

    junction_id: int
    junction_name: str

    latitude: float
    longitude: float

    priority_score: float|None
    visit_order: int

    model_config = ConfigDict(
        from_attributes=True
    )

class PatrolRouteResponse(BaseModel):

    patrol_id: int

    team_id: int

    team_name: str
    assigned_by: int
    status: PatrolStatus

    start_latitude: float
    start_longitude: float

    end_latitude: float
    end_longitude: float

    total_distance: float

    estimated_duration: float

    total_checkpoints: int

    checkpoints: list[CheckpointResponse]

    route_geometry: list[list[float]]

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

class PatrolSummaryResponse(BaseModel):
    patrol_id: int
    team_id: int
    team_name: str
    status: PatrolStatus
    total_distance: float
    estimated_duration: float
    created_at: datetime

class PatrolActionResponse(BaseModel):
    patrol_id: int
    status: PatrolStatus
    message: str