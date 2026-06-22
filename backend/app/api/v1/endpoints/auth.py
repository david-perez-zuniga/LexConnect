from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import create_access_token, verify_password
from app.models.md_User import User
from app.core.logger import logger


router = APIRouter(prefix="/auth", tags=["auth"])

# API de login de usuario
@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    conex: AsyncSession = Depends(get_db)):

    try:
        stmt = select(User).where(User.email == form_data.username)
        result =  await conex.execute(stmt)
        user = result.scalar_one_or_none()

        if not user or not verify_password(form_data.password, user.password_hash):
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
            "acces_token": access_token,
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
