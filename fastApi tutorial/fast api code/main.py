from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def home() : 
    return "hello this is fast api"