from pydantic import BaseModel


class LocationResponse(BaseModel):
    place_id: int
    display_name: str
    lat: float
    lon: float

class RouteResponse(BaseModel):
    coordinates: list[list[float]]
    distance: float
    duration: float