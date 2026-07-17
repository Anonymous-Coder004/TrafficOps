from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.auth import SignupRequest,LoginRequest,TokenResponse,UserResponse
from app.services.auth_service import signup_user,authenticate_user
from app.api.dep import get_current_user
from app.models.users import User

router=APIRouter(prefix="/v1/auth",tags=["Authentication"])


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):
    try:

        user = signup_user(
            db=db,
            email=data.email,
            username=data.username,
            password=data.password,
            role=data.role,
            total_officers=data.total_officers,
            total_barricades=data.total_barricades,
            assigned_latitude=data.assigned_latitude,
            assigned_longitude=data.assigned_longitude
        )

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email or username already exists"
            )

        return user

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login",response_model=TokenResponse)
def login(data:LoginRequest,db:Session=Depends(get_db)):
    access_token=authenticate_user(
        db=db,
        email=data.email,
        password=data.password
    )

    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {
        "access_token":access_token,
        "token_type":"bearer"
    }


@router.get("/me",response_model=UserResponse)
def read_me(current_user:User=Depends(get_current_user)):
    return current_user