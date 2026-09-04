# Entry point for uvicorn when run from the /ml-services directory:
#   uvicorn main:app --reload
#
# All application code lives in app/. This file simply re-exports the FastAPI
# app instance so uvicorn can find it without any path hacks.

from app.main import app  # re-exports FastAPI app for uvicorn

__all__ = ["app"]
