"""create bronze_coffees

Revision ID: 539d79c3806e
Revises:
Create Date: 2026-02-27 17:11:50.935958

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "539d79c3806e"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE bronze_coffees (
            id UUID PRIMARY KEY,
            vendor TEXT NOT NULL,
            raw_data JSONB NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE bronze_coffees")
