# ML Service

Machine Learning service for the **Disaster Risk & Relocation System**.

This service is built with **Python, FastAPI, NumPy, Pandas and Scikit-learn** and is responsible for ML-based hazard prediction, vulnerability prediction and disaster-related NLP processing.

---

## 1. Responsibilities

The ML service handles:

* Hazard prediction
* Vulnerability prediction
* Disaster text/NLP analysis
* ML model inference
* Model experimentation and training

The main backend communicates with this service through HTTP APIs.

---

## 2. Architecture

```text
Main Backend
(TypeScript / Node.js)
        │
        │ HTTP
        ▼
┌──────────────────────────┐
│       ML Service         │
│       Python/FastAPI     │
├──────────────────────────┤
│ Prediction API           │
│ NLP API                  │
│                          │
│ Hazard Prediction        │
│ Vulnerability Prediction │
│ Disaster NLP             │
└────────────┬─────────────┘
             │
             ▼
        Trained Model
          model.pkl
```

---

## 3. Project Structure

```text
ml-service/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   ├── prediction.py
│   │   └── nlp.py
│   │
│   ├── models/
│   │   └── risk_model.py
│   │
│   ├── services/
│   │   ├── hazard_prediction.py
│   │   ├── vulnerability_prediction.py
│   │   └── disaster_nlp.py
│   │
│   └── schemas/
│       └── prediction.py
│
├── notebooks/
│   └── experiments.ipynb
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│   └── model.pkl
│
├── requirements.txt
└── README.md
```

---

## 4. Setup

### Create virtual environment

```bash
python -m venv venv
```

### Activate environment

Linux/macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Run the Service

From the `ml-service` directory:

```bash
uvicorn app.main:app --reload
```

The service will run on:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

---

## 6. API Endpoints

### Hazard Prediction

```http
POST /prediction/hazard
```

Used to predict hazard-related risk from environmental and geographical features.

---

### Vulnerability Prediction

```http
POST /prediction/vulnerability
```

Used to estimate vulnerability using population, socioeconomic and infrastructure features.

---

### Disaster NLP

```http
POST /nlp/analyze
```

Used to analyze disaster-related text and identify relevant hazard information.

---

## 7. ML Model

The trained model is stored at:

```text
models/model.pkl
```

The model is loaded through:

```text
app/models/risk_model.py
```

Prediction flow:

```text
API Request
     ↓
Pydantic Schema
     ↓
Service
     ↓
RiskModel
     ↓
model.pkl
     ↓
Prediction
```

---

## 8. Data Pipeline

Training data is organized into two stages:

```text
data/raw/
     ↓
Data Cleaning
     ↓
Feature Engineering
     ↓
data/processed/
     ↓
Model Training
     ↓
models/model.pkl
```

Raw datasets should remain unchanged.

Processed datasets are prepared for machine learning experiments and training.

---

## 9. Development Workflow

```text
Collect Data
     ↓
Store in data/raw/
     ↓
Clean & Process Data
     ↓
Store in data/processed/
     ↓
Experiment in notebooks/
     ↓
Train Model
     ↓
Evaluate Model
     ↓
Save model.pkl
     ↓
Integrate with API
     ↓
Backend consumes predictions
```

---

## 10. Service Boundary

The ML service should focus on **machine learning and NLP operations**.

Business workflows such as:

* Risk assessment orchestration
* Relocation decisions
* Recommendations
* Scenario management
* Report generation

remain inside the main backend.

The ML service only provides the required predictions/analysis to the backend.

---

## 11. Future Improvements

Possible future additions:

* Separate hazard and vulnerability models
* Model versioning
* Model evaluation metrics
* Feature preprocessing pipeline
* Better NLP models
* Automated model retraining
* Model monitoring
* Prediction confidence and explainability
* Docker deployment
* ML model registry
