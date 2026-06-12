from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base


# Creación de enums
class UserRole(str, Enum):
    LAWYER = "abogado"
    CLIENT = "cliente"


# Creamos clase de modelo users para tabla en la bd 
class Users(Base):
    __tablename__ =  "users" # Nombre de la tabla    

    id: Mapped[int] = mapped_column(primary_key=True) # Id de la tabla
    email: Mapped[str] = mapped_column(String(255), nullable= False) # Email del usuario
    password_hash: Mapped[str] = mapped_column(String(50), nullable=False) # Contraseña
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=False) # Fecha de creación del usuario
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False) # Usuario activo/inactivo
    role: Mapped[str] = mapped_column(String(20), nullable=False, default=UserRole.CLIENT.value)

    # Aquí irán las relaciones
