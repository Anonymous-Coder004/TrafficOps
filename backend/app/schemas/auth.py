from enum import Enum

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
    model_validator
)


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    GROUND_OFFICER = "GROUND_OFFICER"


class SignupRequest(BaseModel):

    email: EmailStr

    username: str = Field(
        min_length=3,
        max_length=50
    )

    password: str = Field(
        min_length=8
    )

    role: UserRole

    total_officers: int | None = None

    total_barricades: int | None = None

    @model_validator(mode="after")
    def validate_ground_officer(self):

        if self.role == UserRole.GROUND_OFFICER:

            if self.total_officers is None:
                raise ValueError(
                    "total_officers is required for ground officers"
                )

            if self.total_barricades is None:
                raise ValueError(
                    "total_barricades is required for ground officers"
                )

        return self


class LoginRequest(BaseModel):

    email: EmailStr

    password: str


class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"

    class Config:
        from_attributes = True


class UserResponse(BaseModel):

    id: int

    email: EmailStr

    username: str

    role: UserRole

    class Config:
        from_attributes = True