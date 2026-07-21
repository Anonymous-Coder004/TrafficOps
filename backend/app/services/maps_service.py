import requests
from typing import List

from app.schemas.maps import LocationResponse,RouteResponse,MultiStopRouteResponse


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

def get_route(
    start_lat: float,
    start_lng: float,
    end_lat: float,
    end_lng: float,
) -> RouteResponse:

    response = requests.get(
        f"https://router.project-osrm.org/route/v1/driving/"
        f"{start_lng},{start_lat};"
        f"{end_lng},{end_lat}",
        params={
            "overview": "full",
            "geometries": "geojson",
        },
        headers={
            "User-Agent": "TrafficOps/1.0"
        },
        timeout=10,
    )

    response.raise_for_status()

    data = response.json()

    route = data["routes"][0]

    coordinates = [
        [lat, lng]
        for lng, lat in route["geometry"]["coordinates"]
    ]

    return RouteResponse(
        coordinates=coordinates,
        distance=route["distance"] / 1000,
        duration=route["duration"],
    )

def get_distance_matrix(
    coordinates: List[tuple[float, float]]
) -> list[list[float]]:
    """
    coordinates:
        [
            (lat, lon),
            (lat, lon),
            ...
        ]

    Returns:
        NxN distance matrix in meters.
    """

    coord_string = ";".join(
        f"{lon},{lat}"
        for lat, lon in coordinates
    )

    response = requests.get(
        f"https://router.project-osrm.org/table/v1/driving/{coord_string}",
        params={
            "annotations": "distance"
        },
        headers={
            "User-Agent": "TrafficOps/1.0"
        },
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    return data["distances"]

def get_multi_stop_route(
    coordinates: List[tuple[float, float]]
)->MultiStopRouteResponse:
    """
    coordinates:
        [
            (lat, lon),
            ...
        ]

    Returns:
        route geometry,
        total distance (km),
        duration (sec)
    """

    coord_string = ";".join(
        f"{lon},{lat}"
        for lat, lon in coordinates
    )

    response = requests.get(
        f"https://router.project-osrm.org/route/v1/driving/{coord_string}",
        params={
            "overview": "full",
            "geometries": "geojson"
        },
        headers={
            "User-Agent": "TrafficOps/1.0"
        },
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    route = data["routes"][0]

    geometry = [
        [lat, lon]
        for lon, lat in route["geometry"]["coordinates"]
    ]

    return MultiStopRouteResponse(
        coordinates=geometry,
        distance=route["distance"] / 1000,
        duration=route["duration"],
    )