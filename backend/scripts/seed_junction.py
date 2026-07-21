from pathlib import Path

import pandas as pd
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.junction import Junction
from app.models.police_station import PoliceStation


CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "junction_features.csv"


def seed_junctions():

    db: Session = SessionLocal()

    try:

        # Don't insert twice
        if db.query(Junction).count() > 0:
            print("Junction table already contains data.")
            return

        df = pd.read_csv(CSV_PATH)

        police_station_map = {
            station.name.strip().lower(): station.id
            for station in db.query(PoliceStation).all()
        }

        junctions = []
        skipped = 0

        for _, row in df.iterrows():

            station_name = str(row["police_station"]).strip().lower()

            police_station_id = police_station_map.get(station_name)

            if police_station_id is None:
                print(f"Police station not found: {row['police_station']}")
                skipped += 1
                continue

            junctions.append(
                Junction(
                    junction_name=row["junction_name"].strip(),

                    police_station_id=police_station_id,

                    latitude=float(row["latitude"]),
                    longitude=float(row["longitude"]),

                    violation_count=int(row["violation_count"]),
                    active_days=int(row["active_days"]),
                    unique_violation_types=int(row["unique_violation_types"]),
                    peak_hour=int(row["peak_hour"]),
                    avg_daily_violations=float(row["avg_daily_violations"]),

                    is_active=True,
                )
            )

        db.bulk_save_objects(junctions)
        db.commit()

        print("=" * 50)
        print(f"Inserted : {len(junctions)} Junctions")
        print(f"Skipped  : {skipped}")
        print("=" * 50)

    except Exception as e:
        db.rollback()
        print(f"Error: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    seed_junctions()