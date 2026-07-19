from datetime import datetime

from sqlalchemy import (
    Enum as SAEnum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from sqlalchemy import TIMESTAMP, text

from app.db.base import Base

from app.enums.incident import (
    CriticalityLevel,
    EventCause,
    EventType,
    IncidentStatus,
    VehicleType,
)


class Incident(Base):

    __tablename__ = "incidents"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    event_type: Mapped[EventType] = mapped_column(
        SAEnum(EventType),
        nullable=False,
    )

    event_cause: Mapped[EventCause] = mapped_column(
        SAEnum(EventCause),
        nullable=False,
    )

    vehicle_type: Mapped[VehicleType | None] = mapped_column(
        SAEnum(VehicleType),
        nullable=True,
    )

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    police_station_id: Mapped[int] = mapped_column(
        ForeignKey(
            "police_stations.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
        index=True,
    )

    nearest_station_distance_km: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    reported_by_team_id: Mapped[int] = mapped_column(
        ForeignKey(
            "team_resources.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
        index=True,
    )

    status: Mapped[IncidentStatus] = mapped_column(
        SAEnum(IncidentStatus),
        nullable=False,
        default=IncidentStatus.REPORTED,
    )

    criticality: Mapped[CriticalityLevel | None] = mapped_column(
        SAEnum(CriticalityLevel),
        nullable=True,
    )

    criticality_confidence: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )

    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )

    resolved_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=True
    )

    police_station = relationship(
        "PoliceStation",
        backref="incidents",
    )

    reported_by_team = relationship(
        "TeamResource",
        backref="reported_incidents",
    )
    assignments = relationship(
        "IncidentAssignment",
        back_populates="incident",
        cascade="all, delete-orphan",
    )
    recommendation = relationship(
        "IncidentRecommendation",
        back_populates="incident",
        uselist=False,
        cascade="all, delete-orphan",
    )