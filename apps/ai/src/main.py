from fastapi import FastAPI
from datetime import datetime, timezone

app = FastAPI(
    title="CortexIQ AI Service",
    description="Document processing, embeddings, and RAG pipeline",
    version="0.1.0",
)


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "cortexiq-ai",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
