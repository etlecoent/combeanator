import os

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class Config(BaseModel):
    postgres_host: str
    postgres_port: int
    postgres_user: str
    postgres_password: str
    postgres_db: str
    postgres_schema: str


config = Config(
    postgres_host=os.environ["POSTGRES_HOST"],
    postgres_port=int(os.environ["POSTGRES_PORT"]),
    postgres_user=os.environ["POSTGRES_USER"],
    postgres_password=os.environ["POSTGRES_PASSWORD"],
    postgres_db=os.environ["POSTGRES_DB"],
    postgres_schema=os.environ["POSTGRES_SCHEMA"],
)
