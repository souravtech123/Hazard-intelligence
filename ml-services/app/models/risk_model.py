import os
import pickle
from pathlib import Path

try:
    import numpy as np
except ImportError:
    np = None


class BaselineRiskPredictor:
    def predict(self, input_data):
        results = []
        for row in input_data:
            vals = [float(v) for v in row]
            avg_val = sum(vals) / max(1, len(vals))
            score = min(max(avg_val, 0.0), 100.0)
            results.append(score)
        if np is not None:
            return np.array(results)
        return results

    def predict_proba(self, input_data):
        probs = [[0.15, 0.85] for _ in input_data]
        if np is not None:
            return np.array(probs)
        return probs


class RiskModel:
    def __init__(self):
        base_dir = Path(__file__).resolve().parents[2]
        model_path = base_dir / "models" / "model.pkl"
        if not model_path.exists():
            model_path = base_dir / "model" / "model.pkl"

        try:
            if model_path.exists() and model_path.stat().st_size > 0:
                with open(model_path, "rb") as file:
                    self.model = pickle.load(file)
            else:
                self.model = BaselineRiskPredictor()
        except Exception:
            self.model = BaselineRiskPredictor()

    def predict(self, features: list[float]):
        if self.model is not None:
            if np is not None:
                input_data = np.array(features).reshape(1, -1)
            else:
                input_data = [features]
            prediction = self.model.predict(input_data)
            return float(prediction[0])

        avg_val = sum(float(x) for x in features) / max(len(features), 1)
        return float(min(max(avg_val, 0.0), 100.0))

    def predict_proba(self, features: list[float]):
        if self.model is not None and hasattr(self.model, "predict_proba"):
            if np is not None:
                input_data = np.array(features).reshape(1, -1)
                probabilities = self.model.predict_proba(input_data)
                return float(np.max(probabilities[0]))
            else:
                input_data = [features]
                probabilities = self.model.predict_proba(input_data)
                return float(max(probabilities[0]))

        return 0.85


risk_model = RiskModel()
