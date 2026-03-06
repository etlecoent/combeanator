import psycopg

from config import CONFIG


def get_connection() -> psycopg.Connection:
    return psycopg.connect(
        host=CONFIG.POSTGRES_HOST,
        port=CONFIG.POSTGRES_PORT,
        user=CONFIG.POSTGRES_USER,
        password=CONFIG.POSTGRES_PASSWORD,
        dbname=CONFIG.POSTGRES_DB,
        options=f"-c search_path={CONFIG.POSTGRES_SCHEMA}",
    )
