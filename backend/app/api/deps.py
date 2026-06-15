from typing import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.md_User import User

# Ruta de la autenticación
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Función para obtener al usuario actual
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_db),
) -> User:
    token_data = decode_access_token(token)

    stmt = select(User).where(User.id == token_data.user_id)
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user

# Función para comprobar el rol de usuario
def require_role(allowed_roles: list[str]) -> Callable:
    async def role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user
    return role_checker

# Función para obtener al administrador
async def get_current_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "administrador":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user

# Función para obtener al abagado
async def get_current_lawyer(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "abogado":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Lawyer privileges required",
        )
    return current_user

# Función para obtener al cliente
async def get_current_client(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "cliente":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Client privileges required",
        )
    return current_user
