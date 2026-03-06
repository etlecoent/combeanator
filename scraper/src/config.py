import os

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class Config(BaseModel):
    # postgres
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_SCHEMA: str
    # redis
    REDIS_HOST: str
    REDIS_PORT: int


CONFIG = Config(
    # postgres
    POSTGRES_HOST=os.environ["POSTGRES_HOST"],
    POSTGRES_PORT=int(os.environ["POSTGRES_PORT"]),
    POSTGRES_USER=os.environ["POSTGRES_USER"],
    POSTGRES_PASSWORD=os.environ["POSTGRES_PASSWORD"],
    POSTGRES_DB=os.environ["POSTGRES_DB"],
    POSTGRES_SCHEMA=os.environ["POSTGRES_SCHEMA"],
    # redis
    REDIS_HOST=os.environ["REDIS_HOST"],
    REDIS_PORT=int(os.environ["REDIS_PORT"]),
)
