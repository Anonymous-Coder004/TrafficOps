from scripts.seed_police_station import seed_police_stations
from scripts.seed_junction import seed_junctions


def seed_database():

    print("Checking police stations...")
    seed_police_stations()

    print("Checking junctions...")
    seed_junctions()