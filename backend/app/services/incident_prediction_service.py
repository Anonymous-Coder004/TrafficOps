from datetime import datetime
import pandas as pd
from app.enums.incident import (CriticalityLevel,)
from app.core.model_loader import (priority_model,)

model=priority_model

def build_features(
    *,
    event_type: str,
    event_cause: str,
    vehicle_type: str | None,
    police_station: str,
    zone: str,
    description: str,
) -> pd.DataFrame:

    now = datetime.now()

    start_hour = now.hour
    start_dow = now.weekday()
    start_month = now.month

    is_weekend = int(start_dow in [5, 6])

    is_night = int(
        start_hour in [22, 23, 0, 1, 2, 3, 4, 5]
    )

    is_morning_peak = int(
        8 <= start_hour <= 10
    )

    is_evening_peak = int(
        17 <= start_hour <= 20
    )

    description = description or ""

    desc_missing = int(description.strip() == "")
    desc_len = len(description)
    desc_word_count = len(description.split())

    row = {
        "event_type": event_type,
        "event_cause": event_cause,
        "veh_type": vehicle_type or "others",
        "police_station": police_station,
        "zone": zone,

        "start_hour": start_hour,
        "start_dow": start_dow,
        "start_month": start_month,

        "is_weekend": is_weekend,
        "is_night": is_night,
        "is_morning_peak": is_morning_peak,
        "is_evening_peak": is_evening_peak,

        "desc_missing": desc_missing,
        "desc_len": desc_len,
        "desc_word_count": desc_word_count,
    }

    return pd.DataFrame([row])

def map_prediction_to_criticality(
    prediction: int,
    confidence: float,
) -> CriticalityLevel:

    prediction = int(prediction)

    if prediction == 0:
        if confidence >= 80:
            return CriticalityLevel.LOW
        return CriticalityLevel.MEDIUM

    if confidence >= 90:
        return CriticalityLevel.CRITICAL

    return CriticalityLevel.HIGH

def predict_incident_priority(
    *,
    event_type: str,
    event_cause: str,
    vehicle_type: str | None,
    police_station: str,
    zone: str,
    description: str,
):
    features = build_features(
        event_type=event_type,
        event_cause=event_cause,
        vehicle_type=vehicle_type,
        police_station=police_station,
        zone=zone,
        description=description,
    )

    features = features[
        model.feature_names_
    ]

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]

    confidence = round(
        max(probabilities) * 100,
        2,
    )

    criticality = map_prediction_to_criticality(
        prediction=prediction,
        confidence=confidence,
    )

    return {
        "criticality": criticality,
        "confidence": confidence,
    }