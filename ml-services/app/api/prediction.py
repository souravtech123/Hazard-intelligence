from fastapi import APIRouter
from app.schemas.prediction import (
    HazardPredictionRequest,
    VulnerabilityPredictionRequest,
)
from app.services.hazard_prediction import predict_hazard
from app.services.vulnerability_prediction import predict_vulnerability

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"],
)


@router.post("/hazard")
def hazard_prediction(data: HazardPredictionRequest):
    result = predict_hazard(data)

    return {
        "success": True,
        "data": result,
    }


@router.post("/vulnerability")
def vulnerability_prediction(
    data: VulnerabilityPredictionRequest,
):
    result = predict_vulnerability(data)

    return {
        "success": True,
        "data": result,
    }