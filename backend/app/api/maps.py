from fastapi import APIRouter

from app.schemas.maps import LocationResponse
from app.services.maps_service import search_location

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