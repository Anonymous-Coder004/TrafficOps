from sqlalchemy.orm import Session

from app.models.users import (
    User,
    UserRole
)

from app.models.team_resources import (
    TeamResource,
    TeamStatus
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


def signup_user(
    db: Session,
    email: str,
    username: str,
    password: str,
    role: UserRole,
    total_officers: int | None = None,
    total_barricades: int | None = None,
    assigned_latitude: float | None = None,
    assigned_longitude: float | None = None,
):

    # Email or username already exists
    existing_user = (
        db.query(User)
        .filter(
            (User.email == email)
            | (User.username == username)
        )
        .first()
    )

    if existing_user:
        return None

    # Only one admin allowed
    if role == UserRole.ADMIN:

        admin_exists = (
            db.query(User)
            .filter(
                User.role == UserRole.ADMIN
            )
            .first()
        )

        if admin_exists:
            raise ValueError(
                "Admin already exists"
            )

    # Create user
    user = User(
        email=email,
        username=username,
        hashed_password=hash_password(password),
        role=role
    )

    db.add(user)
    db.flush()

    # Create TeamResource only for officers
    if role == UserRole.GROUND_OFFICER:

        team_resource = TeamResource(
            user_id=user.id,

            total_officers=total_officers,
            available_officers=total_officers,

            total_barricades=total_barricades,
            available_barricades=total_barricades,

            assigned_latitude=assigned_latitude,
            assigned_longitude=assigned_longitude,

            status=TeamStatus.AVAILABLE
        )

        db.add(team_resource)

    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.hashed_password
    ):
        return None

    access_token = create_access_token(
        {
            "user_id": user.id,
            "role": user.role.value
        }
    )

    return access_token