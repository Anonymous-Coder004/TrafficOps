from datetime import datetime

from sqlalchemy import (
    ForeignKey,
    Integer,
    TIMESTAMP,
    UniqueConstraint,
    Enum as SAEnum,
    text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base

from app.enums.assignment import (
    AssignmentStatus,
)

"""
Stores actual resource deployment.

One incident can have multiple assigned teams.
Each assignment tracks officers, barricades,
and execution progress.
"""

class IncidentAssignment(Base):

    __tablename__ = "incident_assignments"

    __table_args__ = (
        UniqueConstraint(
            "incident_id",
            "team_id",
            name="uq_incident_team",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    incident_id: Mapped[int] = mapped_column(
        ForeignKey(
            "incidents.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    team_id: Mapped[int] = mapped_column(
        ForeignKey(
            "team_resources.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
        index=True,
    )

    officers_assigned: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    barricades_assigned: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    status: Mapped[AssignmentStatus] = mapped_column(
        SAEnum(
            AssignmentStatus,
            name="assignment_status_enum",
        ),
        nullable=False,
        default=AssignmentStatus.ASSIGNED,
    )

    assigned_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=True,
    )

    incident = relationship(
        "Incident",
        back_populates="assignments",
    )

    team = relationship(
        "TeamResource",
        back_populates="assignments",
    )