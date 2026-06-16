from pydantic import BaseModel, ConfigDict

# Función de configuración centralizada para todos los esquemas como lo dictamina pydantic v2
class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True, str_strip_whitespace=True)

# Configuración para el esquema user
from .user_schema import (
    UserBase,
    UserCreate,
    UserRead,
    UserUpdate,
)

# Configuración para el esquema profile_lawyer
from .profile_lawyer_schema import (
    ProfileLawyerBase,
    ProfileLawyerCreate,
    ProfileLawyerRead,
    ProfileLawyerUpdate,
)

# Configuración para el esquema profile_client
from .profile_client_schema import (
    ProfileClientBase,
    ProfileClientCreate,
    ProfileClientRead,
    ProfileClientUpdate,
)

__all__ = [
    "BaseSchema",
    "UserBase",
    "UserCreate",
    "UserRead",
    "UserUpdate",
    "ProfileLawyerBase",
    "ProfileLawyerCreate",
    "ProfileLawyerRead",
    "ProfileLawyerUpdate",
    "ProfileClientBase",
    "ProfileClientCreate",
    "ProfileClientRead",
    "ProfileClientUpdate",
]
