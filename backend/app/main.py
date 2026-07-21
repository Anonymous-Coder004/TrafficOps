print("STEP 0: main.py loading...")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from scripts.seed_database import seed_database
print("STEP 1: FastAPI imported")

# ==================================================
# SETTINGS
# ==================================================

try:
    from app.core.config import settings
    print("STEP 2: Settings imported")
except Exception as e:
    print("ERROR importing settings:", e)
    raise

# ==================================================
# ROUTERS
# ==================================================
@asynccontextmanager
async def lifespan(app: FastAPI):

    print("=" * 60)
    print("Running startup tasks...")

    try:
        seed_database()
        print("Database seeding completed successfully.")
    except Exception as e:
        print(f"Database seeding failed: {e}")

    print("=" * 60)

    yield

    print("Application shutting down...")
try:
    from app.api import auth
    print("STEP 3: Auth router imported")
except Exception as e:
    print("ERROR importing auth router:", e)
    raise

try:
    from app.api import maps
    print("maps router imported")
except Exception as e:
    print("ERROR importing map router:", e)
    raise
try:
    from app.api import ground_officer_incident,admin_incident,ground_officer_assignment,ground_officer_patrol,admin_patrol,teams
    print("incident router imported")
except Exception as e:
    print("ERROR importing map router:", e)
    raise

# ==================================================
# APP INIT
# ==================================================

app = FastAPI(
    title="Traffic Operations Command Center",
    description="Traffic Incident Management Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

print("STEP 6: FastAPI app created")

# ==================================================
# CORS
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("STEP 7: CORS configured")

# ==================================================
# ROOT
# ==================================================

@app.get("/")
def root():
    return {
        "project": "Traffic Operations Command Center",
        "status": "running"
    }

# ==================================================
# HEALTH
# ==================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# ==================================================
# ROUTERS
# ==================================================

try:
    app.include_router(auth.router,)
    app.include_router(maps.router,)
    app.include_router(ground_officer_incident.router,)
    app.include_router(admin_incident.router)
    app.include_router(ground_officer_assignment.router)
    app.include_router(admin_patrol.router)
    app.include_router(ground_officer_patrol.router)
    app.include_router(teams.router)

except Exception as e:
    print("ERROR registering routers:", e)
    raise

print("STEP 10: main.py fully loaded")