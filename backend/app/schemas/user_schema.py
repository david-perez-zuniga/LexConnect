from datetime import datetime

from pydantic import EmailStr, Field

from . import BaseSchema
from ..models.md_User import UserRole

# Clase padre que los hijos heredarán
class UserBase(BaseSchema):
    email: EmailStr
    role: UserRole = UserRole.CLIENT
    is_active: bool = True

# Clase hija UserCreate que hereda de UserBase esta se usará para crear
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)

# Clase hija UserUpdate que hereda de UserBase esta se usará para actualizar
class UserUpdate(BaseSchema):
    email: EmailStr | None = None
    is_active: bool | None = None
    password: str | None = Field(None, min_length=8, max_length=128)

# Clase hija UserRead que hereda de UserBase esta se usará para el response
class UserRead(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime
