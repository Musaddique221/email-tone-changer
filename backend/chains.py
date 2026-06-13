from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile"
)

def change_tone(text: str, tone: str) -> dict:
    prompt = PromptTemplate(
        input_variables=["text", "tone"],
        template="""
        You are an AI email writer.
        
        First check if the user's request is meaningful and related to writing an email.
        If the request is random, gibberish, or not related to email writing — respond with exactly:
        ERROR: Please provide a valid email request. For example: "Write a leave request for 3 days" or "Request for meeting appointment"
        
        If the request is valid, write a complete properly formatted email in a {tone} tone.
        
        The email must include:
        - Subject line
        - Greeting
        - Body
        - Closing
        
        Only return the email or the ERROR message, nothing else.
        
        User request: {text}
        """
    )

    chain = prompt | llm
    response = chain.invoke({"text": text, "tone": tone})
    content = response.content

    if content.startswith("ERROR:"):
        return {"success": False, "message": content.replace("ERROR:", "").strip()}
    
    return {"success": True, "email": content}