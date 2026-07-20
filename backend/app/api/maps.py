from fastapi import APIRouter

from app.schemas.maps import LocationResponse,RouteResponse
from app.services.maps_service import search_location,get_route

router = APIRouter(
    prefix="/v1/maps",
    tags=["Maps"]
)


@router.get(
    "/search",
    response_model=list[LocationResponse]
)
def search_locations(q: str):

    return search_location(q)

@router.get(
    "/route",
    response_model=RouteResponse,
)
def get_route_endpoint(
    start_lat: float,
    start_lng: float,
    end_lat: float,
    end_lng: float,
):

    return get_route(
        start_lat,
        start_lng,
        end_lat,
        end_lng,
    )