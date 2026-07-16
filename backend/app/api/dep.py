from fastapi import Depends,HTTPException,status
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.users import User,UserRole
from app.core.security import verify_access_token

security=HTTPBearer(description="Paste JWT access token here")

def get_current_user(credentials:HTTPAuthorizationCredentials=Depends(security),db:Session=Depends(get_db)):
    credentials_exception=HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"}
    )

    token=credentials.credentials

    try:
        payload=verify_access_token(token)
        user_id=payload.get("user_id")

        if user_id is None:
            raise credentials_exception

    except Exception:
        raise credentials_exception

    user=db.query(User).filter(User.id==user_id).first()

    if user is None:
        raise credentials_exception

    return user


def get_current_admin(current_user:User=Depends(get_current_user)):
    if current_user.role!=UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user


def get_current_ground_officer(current_user:User=Depends(get_current_user)):
    if current_user.role!=UserRole.GROUND_OFFICER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Ground Officer access required"
        )
    return current_user