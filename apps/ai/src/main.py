from fastapi import FastAPI
from datetime import datetime, timezone

app = FastAPI(
    title="CortexIQ AI Service",
    description="Document processing, embeddings, and RAG pipeline",
    version="0.1.0",
)


@app.get("/")
async def root() -> dict:
    """Root endpoint."""
    return {
        "service": "cortexiq-ai",
        "version": "0.1.0",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint — used by load balancers and monitoring."""
    return {
        "status": "ok",
        "service": "ai",
    }
