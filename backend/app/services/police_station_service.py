from math import (
    radians,
    sin,
    cos,
    sqrt,
    atan2,
)

from sqlalchemy.orm import Session

from app.models.police_station import (
    PoliceStation,
)
def calculate_distance_km(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:

    earth_radius = 6371.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)

    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        sin(dlat / 2) ** 2
        + cos(lat1)
        * cos(lat2)
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a),
    )

    return earth_radius * c

def find_nearest_police_station(
    db: Session,
    latitude: float,
    longitude: float,
):
    stations = db.query(PoliceStation).all()

    if not stations:
        raise ValueError(
            "No police stations found in database."
        )

    nearest_station = None
    nearest_distance = float("inf")

    for station in stations:
        distance = calculate_distance_km(
            latitude,
            longitude,
            station.latitude,
            station.longitude,
        )

        if distance < nearest_distance:
            nearest_distance = distance
            nearest_station = station

    return {
        "station": nearest_station,
        "distance_km": round(nearest_distance, 2),
    }