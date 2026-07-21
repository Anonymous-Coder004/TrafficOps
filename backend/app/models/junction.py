from datetime import datetime

from app.db.base import Base

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from sqlalchemy import (
    INTEGER,
    FLOAT,
    String,
    BOOLEAN,
    TIMESTAMP,
    ForeignKey,
)

from sqlalchemy.sql.expression import text


class Junction(Base):

    __tablename__ = "junctions"

    id: Mapped[int] = mapped_column(
        INTEGER,
        primary_key=True
    )

    junction_name: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    police_station_id: Mapped[int] = mapped_column(
        ForeignKey(
            "police_stations.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    latitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    longitude: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    violation_count: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    active_days: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    unique_violation_types: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    peak_hour: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    avg_daily_violations: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        BOOLEAN,
        nullable=False,
        default=True,
        server_default="true"
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )

    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
        onupdate=datetime.utcnow
    )

    police_station = relationship(
        "PoliceStation",
        back_populates="junctions"
    )

    patrol_checkpoints = relationship(
        "PatrolCheckpoint",
        back_populates="junction",
        cascade="all, delete-orphan"
    )