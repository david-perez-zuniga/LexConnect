from datetime import date

from pydantic import Field

from . import BaseSchema

# Clase padre que usarán los demás esquemas
class ProfileClientBase(BaseSchema):
    full_name: str = Field(..., min_length=1, max_length=255)
    phone: str | None = Field(None, max_length=20)
    address: str | None = None
    date_of_birth: date | None = None

# Clase esquema para crear un cliente
class ProfileClientCreate(ProfileClientBase):
    pass

# Clase esquema para actualizar un cliente
class ProfileClientUpdate(BaseSchema):
    full_name: str | None = Field(None, min_length=1, max_length=255)
    phone: str | None = Field(None, max_length=20)
    address: str | None = None
    date_of_birth: date | None = None

# Clase esquema para leer/response un cliente
class ProfileClientRead(ProfileClientBase):
    id: int
    user_id: int
