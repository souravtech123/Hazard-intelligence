try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from app.api.prediction import router as prediction_router
    from app.api.nlp import router as nlp_router

    app = FastAPI(
        title="Hazard-Intelligence ML Service",
        description="ML & NLP endpoints for hazard risk assessment and disaster text analysis",
        version="1.0.0",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health_check():
        return {
            "status": "healthy",
            "service": "ml-service",
            "version": "1.0.0",
        }

    app.include_router(prediction_router)
    app.include_router(nlp_router)

except ImportError as e:
    missing_pkg = getattr(e, "name", "fastapi")
    raise ImportError(
        f"Missing required Python dependency '{missing_pkg}'. "
        f"Please install it by running 'sudo apt install python3-{missing_pkg}' or 'pip install {missing_pkg}'."
    ) from e
