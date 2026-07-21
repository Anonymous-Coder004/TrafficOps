from pathlib import Path

import pandas as pd
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.police_station import PoliceStation


CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "police_stations.csv"

def seed_police_stations():

    db: Session = SessionLocal()

    try:

        # Don't insert twice
        if db.query(PoliceStation).count() > 0:
            print("Police stations already exist.")
            return

        df = pd.read_csv(CSV_PATH)

        police_stations = []

        for _, row in df.iterrows():

            police_stations.append(
                PoliceStation(
                    name=row["police_station"].strip(),
                    zone=row["zone"].strip(),
                    latitude=float(row["latitude"]),
                    longitude=float(row["longitude"]),
                )
            )

        db.bulk_save_objects(police_stations)
        db.commit()

        print("=" * 50)
        print(f"Inserted : {len(police_stations)} Police Stations")
        print("=" * 50)

    except Exception as e:
        db.rollback()
        print(f"Error: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    seed_police_stations()