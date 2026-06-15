from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import String, Text, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


# Asegurandonos que no hay referencias circulares
if TYPE_CHECKING:
    from app.models.md_User import User


# Creación de clase ProfileClient que servirá como ORM
class ProfileClient(Base):
    __tablename__ = "profiles_client"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20))
    address: Mapped[str | None] = mapped_column(Text)
    date_of_birth: Mapped[date | None] = mapped_column(Date)

# Instanceando relación con la tabla user
    user: Mapped["User"] = relationship(back_populates="profile_client")

 # Integrando función __repr__ que sirve para manejo de errores
    def __repr__(self) -> str:
        return f"ProfileClient(id={self.id}, full_name={self.full_name})"
