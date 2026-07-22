from enum import Enum

class TeamStatus(str, Enum):
    # Represents patrol availability only.
    # Incident assignments do not modify this status.
    AVAILABLE = "AVAILABLE"
    OCCUPIED = "OCCUPIED"