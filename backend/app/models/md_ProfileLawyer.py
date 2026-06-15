from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import String, Text, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


# Asegurandonos que no hayan dependencias circulares
if TYPE_CHECKING:
    from app.models.md_User import User


# Creando clase ProfileLawyer que servirá como ORM
class ProfileLawyer(Base):
    __tablename__ = "profiles_lawyer"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    specialization: Mapped[str | None] = mapped_column(String(255))
    license_number: Mapped[str | None] = mapped_column(String(100))
    phone: Mapped[str | None] = mapped_column(String(20))
    address: Mapped[str | None] = mapped_column(Text)
    date_of_birth: Mapped[date | None] = mapped_column(Date)
    biography: Mapped[str | None] = mapped_column(Text)
    years_of_experience: Mapped[int | None]

# Instanceando relación con la tabla user
    user: Mapped["User"] = relationship(back_populates="profile_lawyer")


 # Integrando función __repr__ que sirve para manejo de errores
    def __repr__(self) -> str:
        return f"ProfileLawyer(id={self.id}, full_name={self.full_name})"
