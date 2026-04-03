from fastapi import FastAPI, Depends
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="OpenDesign AI Bridge", version="1.0.0")

class AnalyzeRequest(BaseModel):
    image_url: str
    project_context: str

@app.get("/health")
def health_check():
    return {"status": "ok", "provider": os.getenv("AI_PROVIDER", "LOCAL")}

@app.post("/analyze")
def analyze_screen(request: AnalyzeRequest):
    # This will be routed to the appropriate provider adapter
    return {"message": "Analysis started asynchronously."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
