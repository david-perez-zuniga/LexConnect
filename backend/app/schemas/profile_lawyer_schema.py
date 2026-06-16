from datetime import date

from pydantic import Field

from . import BaseSchema

# Clase padre que heredan los demás esquemas
class ProfileLawyerBase(BaseSchema):
    full_name: str = Field(..., min_length=1, max_length=255)
    specialization: str | None = Field(None, max_length=255)
    license_number: str | None = Field(None, max_length=100)
    phone: str | None = Field(None, max_length=20)
    address: str | None = None
    date_of_birth: date | None = None
    biography: str | None = None
    years_of_experience: int | None = Field(None, ge=0)

# Clase esquema para crear un abogado
class ProfileLawyerCreate(ProfileLawyerBase):
    pass

# Clase esquema para actualizar un abogado
class ProfileLawyerUpdate(BaseSchema):
    full_name: str | None = Field(None, min_length=1, max_length=255)
    specialization: str | None = Field(None, max_length=255)
    license_number: str | None = Field(None, max_length=100)
    phone: str | None = Field(None, max_length=20)
    address: str | None = None
    date_of_birth: date | None = None
    biography: str | None = None
    years_of_experience: int | None = Field(None, ge=0)

# Clase esquema para leer/response un abogado
class ProfileLawyerRead(ProfileLawyerBase):
    id: int
    user_id: int
