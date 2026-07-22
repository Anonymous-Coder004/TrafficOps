from app.enums.incident import (CriticalityLevel,)

def generate_recommendation(
    criticality: CriticalityLevel,
):
    if criticality == CriticalityLevel.LOW:
        return {
            "recommended_officers": 2,
            "recommended_barricades": 0,
        }

    if criticality == CriticalityLevel.MEDIUM:
        return {
            "recommended_officers": 4,
            "recommended_barricades": 5,
        }

    if criticality == CriticalityLevel.HIGH:
        return {
            "recommended_officers": 8,
            "recommended_barricades": 10,
        }

    return {
        "recommended_officers": 15,
        "recommended_barricades": 20,
    }