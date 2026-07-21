from app.db.base import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import (
    INTEGER,
    FLOAT,
    Enum,
    ForeignKey
)

import enum

from app.enums.team_resources import TeamStatus



class TeamResource(Base):
    __tablename__ = "team_resources"

    id: Mapped[int] = mapped_column(
        INTEGER,
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        unique=True,
        nullable=False
    )

    total_officers: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    available_officers: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    total_barricades: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    available_barricades: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    assigned_latitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    assigned_longitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    status: Mapped[TeamStatus] = mapped_column(
        Enum(TeamStatus),
        nullable=False,
        default=TeamStatus.AVAILABLE,
        server_default="AVAILABLE"
    )

    user = relationship(
        "User",
        back_populates="team_resource"
    )

    assignments = relationship(
        "IncidentAssignment",
        back_populates="team",
    )

    patrols = relationship(
    "Patrol",
    back_populates="team"
) 