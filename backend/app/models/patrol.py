from datetime import datetime
import enum

from app.db.base import Base

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from sqlalchemy import (
    INTEGER,
    FLOAT,
    TIMESTAMP,
    Enum,
    ForeignKey,
    JSON,
)
from app.enums.patrol import PatrolStatus
from sqlalchemy.sql.expression import text

class Patrol(Base):

    __tablename__ = "patrols"

    id: Mapped[int] = mapped_column(
        INTEGER,
        primary_key=True
    )

    team_id: Mapped[int] = mapped_column(
        ForeignKey(
            "team_resources.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    assigned_by: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="SET NULL"
        ),
        nullable=True,
        index=True
    )

    start_latitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    start_longitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    end_latitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    end_longitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    total_distance: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    estimated_duration: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    route_geometry: Mapped[list] = mapped_column(
        JSON,
        nullable=False
    )

    status: Mapped[PatrolStatus] = mapped_column(
        Enum(PatrolStatus),
        nullable=False,
        default=PatrolStatus.PENDING,
        server_default=PatrolStatus.PENDING.value,
        index=True,  
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )

    started_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=True
    )

    completed_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=True
    )

    team = relationship(
        "TeamResource",
        back_populates="patrols"
    )

    admin = relationship(
        "User",
        back_populates="created_patrols"
    )

    checkpoints = relationship(
        "PatrolCheckpoint",
        back_populates="patrol",
        cascade="all, delete-orphan",
        order_by="PatrolCheckpoint.visit_order"
    )

