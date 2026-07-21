from sqlalchemy import String, Float
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import relationship
from app.models.users import Base


class PoliceStation(Base):

    __tablename__ = "police_stations"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    zone: Mapped[str] = mapped_column(
        String(100),
        index=True,
        nullable=False
    )

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )
    
    junctions = relationship(
        "Junction",
        back_populates="police_station",
        cascade="all, delete-orphan"
    )