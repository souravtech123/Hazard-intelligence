from pydantic import BaseModel, Field


class HazardPredictionRequest(BaseModel):
    rainfall: float = Field(..., ge=0)
    temperature: float
    humidity: float = Field(..., ge=0, le=100)
    wind_speed: float = Field(..., ge=0)
    elevation: float
    slope: float = Field(..., ge=0)


class VulnerabilityPredictionRequest(BaseModel):
    population: int = Field(..., ge=0)
    population_density: float = Field(..., ge=0)
    poverty_rate: float = Field(..., ge=0, le=100)
    elderly_population: float = Field(..., ge=0, le=100)
    children_population: float = Field(..., ge=0, le=100)
    infrastructure_score: float = Field(
        ...,
        ge=0,
        le=100,
    )


class PredictionResponse(BaseModel):
    prediction: float
    confidence: float | None = None
    risk_level: str | None = None
