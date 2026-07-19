
from pathlib import Path
from catboost import CatBoostClassifier

BASE_DIR = Path(__file__).resolve().parent.parent.parent

ASTRAM_MODEL_PATH = (
    BASE_DIR
    / "ML_models"
    / "astram_priority_catboost1.cbm"
)

if not ASTRAM_MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model not found: {ASTRAM_MODEL_PATH}"
    )

priority_model = CatBoostClassifier()

priority_model.load_model(
    str(ASTRAM_MODEL_PATH)
)