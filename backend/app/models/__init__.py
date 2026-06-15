from app.models.base import Base
from app.models.md_User import User, UserRole
from app.models.md_ProfileClient import ProfileClient
from app.models.md_ProfileLawyer import ProfileLawyer

# Con esto evitamos importaciones largas, esto permite que los modelos sean detectados
__all__ = [
    "Base",
    "User",
    "UserRole",
    "ProfileClient",
    "ProfileLawyer",
]
