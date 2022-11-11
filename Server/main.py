from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

origins = [

    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

resp_json = """[
    {
        "code": "field1",
        "caption": "Стоимость руб.",
        "type": "number"
    },
    {
        "code": "field2",
        "caption": "Цвет",
        "type": "string"
    },
    {
        "code": "field4",
        "caption": "Работает",
        "type": "bool"
    },
    {
        "code": "field7",
        "caption": "Название",
        "type": "string"
    }
]"""

@app.get("/config")
def update_item():
    return resp_json


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}