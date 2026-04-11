from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="oux.ai AI Bridge", version="1.0.0")


class AnalyzeRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    image_url: str
    project_context: str
    provider: str
    api_key: str
    local_endpoint: Optional[str] = None
    model_name: Optional[str] = None


@app.get("/health")
async def health_check():
    return {"status": "ok", "provider": os.getenv("AI_PROVIDER", "LOCAL")}


@app.post("/analyze")
async def analyze_screen(request: AnalyzeRequest):
    return {"message": "Analysis started asynchronously.", "provider": request.provider}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
