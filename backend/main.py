import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv(dotenv_path="../.env")

app = FastAPI()

# Root Route
@app.get("/")
def home():
    return {
        "message": "Gemini AI Backend Running Successfully 🚀"
    }

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API Key
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("WARNING: GEMINI_API_KEY missing from .env file!")

# Configure Gemini
genai.configure(api_key=api_key)

# Gemini Model
model = genai.GenerativeModel("gemini-1.5-flash")

# Request Model
class ChatRequest(BaseModel):
    message: str
    systemPrompt: str

# Response Model
class ChatResponse(BaseModel):
    reply: str

# Chat Endpoint
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:

        # Validate inputs
        if not request.message or not request.systemPrompt:
            raise HTTPException(
                status_code=400,
                detail="Missing message or system prompt"
            )

        print(f"Received message: {request.message}")

        # Combine System Prompt + User Message
        full_prompt = f"""
        {request.systemPrompt}

        User: {request.message}
        """

        # Gemini Response
        response = model.generate_content(full_prompt)

        # Correct Response Parsing
        reply_content = response.text

        if not reply_content:
            raise HTTPException(
                status_code=500,
                detail="Empty response generated"
            )

        return ChatResponse(reply=reply_content)

    except Exception as e:

        print(f"Backend Error: {str(e)}")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# Run Server
if __name__ == "__main__":

    import uvicorn

    print("Starting Gemini AI Backend on port 8000 🚀")

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )