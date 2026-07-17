from pydantic import BaseModel


class LocationResponse(BaseModel):
    place_id: int
    display_name: str
    lat: float
    lon: float