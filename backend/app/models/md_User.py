from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

# Asegurandonos que no haya una referencia circular
if TYPE_CHECKING:
    from app.models.md_ProfileClient import ProfileClient
    from app.models.md_ProfileLawyer import ProfileLawyer


# Creando Enum de los roles de usuario
class UserRole(str, Enum):
    LAWYER = "abogado"
    CLIENT = "cliente"


# Creando clase User que servirá como ORM 
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default=UserRole.CLIENT.value)

    # Instanceando relación entre las demás tablas (profile_lawyer y profile_client)
    profile_lawyer: Mapped["ProfileLawyer"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")
    profile_client: Mapped["ProfileClient"] = relationship(back_populates="user", uselist=False, cascade="all, delete-orphan")


    # Integrando función __repr__ que sirve para manejo de errores
    def __repr__(self) -> str:
        return f"User(id={self.id}, email={self.email}, role={self.role})"
