from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.logger import logger
from app.core.security import get_password_hash
from app.models.md_User import User as tbl_User
from app.schemas.user_schema import UserCreate, UserRead, UserUpdate

router = APIRouter()

# ENDPOINT POST
@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate, conex: AsyncSession = Depends(get_db)):
    try:
        result = await conex.execute(select(tbl_User).where(tbl_User.email == user_data.email))
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        user_dict = user_data.model_dump(exclude_unset=True)
        user_dict["password_hash"] = get_password_hash(user_dict.pop("password"))
        nuevo = tbl_User(**user_dict)
        conex.add(nuevo)
        await conex.commit()
        await conex.refresh(nuevo)
        return nuevo
    except HTTPException:
        raise
    except IntegrityError as e:
        logger.error(f"Error de integridad al crear usuario: {e}")
        await conex.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error al crear usuario: {str(e)}",
        )
    except Exception as e:
        logger.exception("Error inesperado al crear usuario")
        await conex.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al crear usuario: {str(e)}",
        )

# ENDPOINT GET (Obtiene todos los usuarios)
@router.get("/", response_model=list[UserRead])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    conex: AsyncSession = Depends(get_db),
):
    try:
        stmt = select(tbl_User).offset(skip).limit(limit)
        result = await conex.execute(stmt)
        return list(result.scalars().all())
    except Exception as e:
        logger.exception("Error inesperado al listar usuarios")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener usuarios: {str(e)}",
        )

# ENDPOINT GET (Obtiene un usuario por ID)
@router.get("/{user_id}", response_model=UserRead)
async def get_user(user_id: int, conex: AsyncSession = Depends(get_db)):
    try:
        stmt = select(tbl_User).where(tbl_User.id == user_id)
        result = await conex.execute(stmt)
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        return user
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error inesperado al obtener usuario")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener usuario: {str(e)}",
        )

# ENDPOINT PATCH 
@router.patch("/{user_id}", response_model=UserRead)
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    conex: AsyncSession = Depends(get_db),
):
    try:
        stmt = select(tbl_User).where(tbl_User.id == user_id)
        result = await conex.execute(stmt)
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        update_data = user_data.model_dump(exclude_unset=True)
        if not update_data:
            return user

        password = update_data.pop("password", None)
        if password:
            update_data["password_hash"] = get_password_hash(password)

        for field, value in update_data.items():
            setattr(user, field, value)
        await conex.commit()
        await conex.refresh(user)
        return user
    except HTTPException:
        raise
    except IntegrityError as e:
        logger.error(f"Error de integridad al actualizar usuario: {e}")
        await conex.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error al actualizar usuario: {str(e)}",
        )
    except Exception as e:
        logger.exception("Error inesperado al actualizar usuario")
        await conex.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al actualizar usuario: {str(e)}",
        )

# ENDPOINT DELETE
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, conex: AsyncSession = Depends(get_db)):
    try:
        stmt = select(tbl_User).where(tbl_User.id == user_id)
        result = await conex.execute(stmt)
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        await conex.delete(user)
        await conex.commit()
        return None
    except HTTPException:
        raise
    except IntegrityError as e:
        logger.error(f"Error de integridad al eliminar usuario: {e}")
        await conex.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error al eliminar usuario: {str(e)}",
        )
    except Exception as e:
        logger.exception("Error inesperado al eliminar usuario")
        await conex.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al eliminar usuario: {str(e)}",
        )
