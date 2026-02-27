import psycopg

from config import config


def get_connection() -> psycopg.Connection:
    return psycopg.connect(
        host=config.postgres_host,
        port=config.postgres_port,
        user=config.postgres_user,
        password=config.postgres_password,
        dbname=config.postgres_db,
        options=f"-c search_path={config.postgres_schema}",
    )
