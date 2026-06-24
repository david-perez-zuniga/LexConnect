from datetime import timedelta
from genericpath import _AllowMissingType

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.sql.functions import current_user
from sqlalchemy.sql.type_api import UserDefinedType

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token, verify_password
from app.models.md_User import User
from app.schemas.user_schema import LoginRequest, UserRead
from app.core.logger import logger
from app.api.deps import get_current_user


router = APIRouter(tags=["auth"])

# API de login de usuario
@router.post("/login")
async def login(
    login_req: LoginRequest,
    conex: AsyncSession = Depends(get_db)):

    try:
        stmt = select(User).where(User.email == login_req.email)
        result =  await conex.execute(stmt)
        user = result.scalar_one_or_none()

        if not user or not verify_password(login_req.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate":"Bearer"},
            )
        access_token = create_access_token(data={"sub": str(user.id),
                                                 "email": user.email,
                                                 "role": user.role},
                                          expires_delta=timedelta(minutes=settings.access_token_expire_minutes),)
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            },
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error inesperado en login")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al iniciar sesión: {str(e)}",
        )

# API para obtener al usuario conectado
@router.get("/me", response_model=UserRead)
async def read_current_user_me(
    current_user: User = Depends(get_current_user),
    conex: AsyncSession = Depends(get_db)):

    try:
        stmt = select(User).options(
        selectinload(User.profile_client)).where(
        User.id == current_user.id)

        result =  await conex.execute(stmt)
        user = result.scalar_one

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error inesperado en el perfil")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Eror inesperado al obtener usuario: {str(e)}", 
        )
    return user
