from math import radians, sin, cos, sqrt, atan2

from sqlalchemy.orm import Session

from app.models.junction import Junction
from app.models.police_station import PoliceStation


EARTH_RADIUS_KM = 6371.0


def haversine_distance(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:
    """
    Returns distance between two coordinates in kilometers.
    """

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return EARTH_RADIUS_KM * c


def get_nearby_police_stations(
    db: Session,
    latitude: float,
    longitude: float,
    radius_km: float = 5.0,
) -> list[PoliceStation]:
    """
    Returns all police stations within the specified radius.
    """

    stations = db.query(PoliceStation).all()

    nearby_stations = []

    for station in stations:

        distance = haversine_distance(
            latitude,
            longitude,
            station.latitude,
            station.longitude,
        )

        if distance <= radius_km:
            nearby_stations.append(station)

    return nearby_stations


def get_candidate_junctions(
    db: Session,
    police_station_ids: list[int],
) -> list[Junction]:
    """
    Returns all active junctions belonging to the supplied
    police station IDs.
    """

    if not police_station_ids:
        return []

    return (
        db.query(Junction)
        .filter(
            Junction.police_station_id.in_(police_station_ids),
            Junction.is_active.is_(True),
        )
        .all()
    )


def get_candidate_junctions_from_nearby_stations(
    db: Session,
    latitude: float,
    longitude: float,
    radius_km: float = 5.0,
) -> list[Junction]:
    """
    Returns all active junctions belonging to police stations
    within the specified radius.
    """

    nearby_stations = get_nearby_police_stations(
        db,
        latitude,
        longitude,
        radius_km,
    )

    if not nearby_stations:
        return []

    station_ids = [
        station.id
        for station in nearby_stations
    ]

    return get_candidate_junctions(
        db,
        station_ids,
    )


def get_all_junctions(
    db: Session,
) -> list[Junction]:
    """
    Returns all active junctions.
    """

    return (
        db.query(Junction)
        .filter(
            Junction.is_active.is_(True)
        )
        .all()
    )


def get_junction_by_id(
    db: Session,
    junction_id: int,
) -> Junction | None:
    """
    Returns a junction by ID.
    """

    return (
        db.query(Junction)
        .filter(
            Junction.id == junction_id
        )
        .first()
    )


def get_junctions_by_ids(
    db: Session,
    junction_ids: list[int],
) -> list[Junction]:
    """
    Returns all junctions matching the supplied IDs.
    """

    if not junction_ids:
        return []

    return (
        db.query(Junction)
        .filter(
            Junction.id.in_(junction_ids)
        )
        .all()
    )