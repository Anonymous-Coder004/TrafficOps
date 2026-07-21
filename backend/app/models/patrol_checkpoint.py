from app.db.base import Base

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from sqlalchemy import (
    INTEGER,
    FLOAT,
    BOOLEAN,
    ForeignKey,UniqueConstraint
)


class PatrolCheckpoint(Base):

    __tablename__ = "patrol_checkpoints"

    __table_args__ = (
        UniqueConstraint(
            "patrol_id",
            "visit_order",
            name="uq_patrol_visit_order"
        ),
        UniqueConstraint(
            "patrol_id",
            "junction_id",
            name="uq_patrol_junction"
        ),
    )

    id: Mapped[int] = mapped_column(
        INTEGER,
        primary_key=True
    )

    patrol_id: Mapped[int] = mapped_column(
        ForeignKey(
            "patrols.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    junction_id: Mapped[int] = mapped_column(
        ForeignKey(
            "junctions.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    visit_order: Mapped[int] = mapped_column(
        INTEGER,
        nullable=False
    )

    priority_score: Mapped[float] = mapped_column(
        FLOAT,
        nullable=False
    )

    is_completed: Mapped[bool] = mapped_column(
        BOOLEAN,
        nullable=False,
        default=False,
        server_default="false"
    )

    patrol = relationship(
        "Patrol",
        back_populates="checkpoints"
    )

    junction = relationship(
        "Junction",
        back_populates="patrol_checkpoints"
    )