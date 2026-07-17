import requests

from app.schemas.maps import LocationResponse


def search_location(query: str) -> list[LocationResponse]:

    response = requests.get(
        "https://nominatim.openstreetmap.org/search",
        params={
            "q": query,
            "format": "jsonv2",
            "limit": 5
        },
        headers={
            "User-Agent": "TrafficOps/1.0"
        },
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    return [
        LocationResponse(
            place_id=item["place_id"],
            display_name=item["display_name"],
            lat=float(item["lat"]),
            lon=float(item["lon"])
        )
        for item in data
    ]