from datetime import datetime

from sqlalchemy import (
    ForeignKey,
    Integer,
    Float,
    TIMESTAMP,
    text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base

from app.enums.incident import (
    CriticalityLevel,
)

from sqlalchemy import Enum as SAEnum


class IncidentRecommendation(Base):

    __tablename__ = "incident_recommendations"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    incident_id: Mapped[int] = mapped_column(
        ForeignKey(
            "incidents.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
        index=True,
    )

    criticality: Mapped[CriticalityLevel] = mapped_column(
        SAEnum(
            CriticalityLevel,
            name="criticality_level_enum",
        ),
        nullable=False,
    )

    confidence: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    recommended_officers: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    recommended_barricades: Mapped[int] = mapped_column(
        Integer,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )

    incident = relationship(
        "Incident",
        back_populates="recommendation",
    )