from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import string

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://spamzero.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


model = joblib.load("models/spam_classifier_model.joblib")
vectorizer = joblib.load("models/tfidf_vectorizer.joblib")


class MessageInput(BaseModel):
    message: str


def clean_text(message):
    message = str(message).lower()
    message = message.translate(str.maketrans('', '', string.punctuation))

    tokens = message.split()
    tokens = [t for t in tokens if t.isalpha()]

    return " ".join(tokens)


@app.get('/predict')
def home():
    return {"message": 'API Running'}


@app.post('/predict')
def predict(data: MessageInput):
    cleaned = clean_text(data.message)

    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    return {
        "input": data.message,
        "clean_text": cleaned,
        "prediction": prediction
    }
