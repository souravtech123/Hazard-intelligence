from app.models.risk_model import risk_model
from app.schemas.prediction import HazardPredictionRequest


def predict_hazard(data: HazardPredictionRequest):
    features = [
        data.rainfall,
        data.temperature,
        data.humidity,
        data.wind_speed,
        data.elevation,
        data.slope,
    ]

    prediction = risk_model.predict(features)
    confidence = risk_model.predict_proba(features)

    return {
        "prediction": float(prediction),
        "confidence": confidence,
    }