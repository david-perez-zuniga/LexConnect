from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from jose import  jwt
from pydantic import BaseModel

from app.core.config import settings

ALGORITHM = settings.algorithm

# Clase de los datos de los tokens (tabla user)
class TokenData(BaseModel):
    user_id: int
    email: str
    role: str

# Función para verificar contraseña
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )

# Función para obtener contraseña hash
def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt(),
    ).decode("utf-8")

# Función para crear un token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)


# Función de decodación de token
def decode_access_token(token: str) -> TokenData:
    payload = jwt.decode(
        token,
        settings.secret_key,
        algorithms=[ALGORITHM],
    )
    sub = payload.get("sub")
    if sub is None:
        raise ValueError("Token missing 'sub' field")
    return TokenData(
        user_id=int(sub),
        email=payload.get("email"),
        role=payload.get("role"),
    )
