from pydantic import BaseModel, ConfigDict


class JunctionResponse(BaseModel):

    id: int
    junction_name: str

    latitude: float
    longitude: float

    violation_count: int
    active_days: int
    unique_violation_types: int
    peak_hour: int
    avg_daily_violations: float

    model_config = ConfigDict(
        from_attributes=True
    )