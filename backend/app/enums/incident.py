from enum import Enum


class IncidentStatus(str, Enum):
    REPORTED = "REPORTED"
    ANALYZED = "ANALYZED"
    RESOURCE_ALLOCATED = "RESOURCE_ALLOCATED"
    PROCESSING = "PROCESSING"
    RESOLVED = "RESOLVED"

class CriticalityLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class EventType(str, Enum):
    PLANNED = "planned"
    UNPLANNED = "unplanned"

class EventCause(str, Enum):
    VEHICLE_BREAKDOWN = "vehicle_breakdown"
    OTHERS = "others"
    POT_HOLES = "pot_holes"
    CONSTRUCTION = "construction"
    WATER_LOGGING = "water_logging"
    ACCIDENT = "accident"
    TREE_FALL = "tree_fall"
    ROAD_CONDITIONS = "road_conditions"
    CONGESTION = "congestion"
    PUBLIC_EVENT = "public_event"
    PROCESSION = "procession"
    VIP_MOVEMENT = "vip_movement"
    PROTEST = "protest"
    DEBRIS = "debris"
    FOG_LOW_VISIBILITY = "fog_low_visibility"

class VehicleType(str, Enum):
    BMTC_BUS = "bmtc_bus"
    HEAVY_VEHICLE = "heavy_vehicle"
    LCV = "lcv"
    OTHERS = "others"
    PRIVATE_BUS = "private_bus"
    PRIVATE_CAR = "private_car"
    TRUCK = "truck"
    KSRTC_BUS = "ksrtc_bus"
    TAXI = "taxi"
    AUTO = "auto"