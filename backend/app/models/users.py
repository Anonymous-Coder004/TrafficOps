from app.db.base import Base

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import INTEGER, String, TIMESTAMP, Enum
from sqlalchemy.sql.expression import text

from datetime import datetime
import enum


class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    GROUND_OFFICER = "GROUND_OFFICER"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        INTEGER,
        primary_key=True,
        nullable=False
    )

    username: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()")
    )

    team_resource = relationship(
        "TeamResource",
        back_populates="user",
        uselist=False
    )
    created_patrols = relationship(
    "Patrol",
    back_populates="admin"
)