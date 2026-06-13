from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chains import change_tone


app  = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ToneRequest(BaseModel):
    text:str
    tone:str
    
@app.get("/")
def root():
    return {"message": "hello"}
    
@app.post("/change-tone")
def change_tone_api(request:ToneRequest):
    result = change_tone(request.text,request.tone)
    if not result["success"]:
        return {"error": result["message"]}
    return {"rewritten_text": result["email"]}

