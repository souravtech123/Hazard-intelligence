from fastapi import APIRouter
from app.services.disaster_nlp import analyze_disaster_text

router = APIRouter(
    prefix="/nlp",
    tags=["NLP"],
)


@router.post("/analyze")
def analyze_text(data: dict):
    result = analyze_disaster_text(data)

    return {
        "success": True,
        "data": result,
    }