from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db

router = APIRouter(
    prefix="/v1/auth",
    tags=["Authentication"]
)
