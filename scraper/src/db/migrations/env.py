import sys
from logging.config import fileConfig
from pathlib import Path

from sqlalchemy import create_engine, pool
from alembic import context

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from config import config as app_config

alembic_config = context.config

if alembic_config.config_file_name is not None:
    fileConfig(alembic_config.config_file_name)

target_metadata = None

db_url = (
    f"postgresql+psycopg://{app_config.postgres_user}:{app_config.postgres_password}"
    f"@{app_config.postgres_host}:{app_config.postgres_port}/{app_config.postgres_db}"
)

connect_args = {"options": f"-c search_path={app_config.postgres_schema}"}


def run_migrations_offline() -> None:
    context.configure(
        url=db_url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = create_engine(db_url, connect_args=connect_args, poolclass=pool.NullPool)
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
