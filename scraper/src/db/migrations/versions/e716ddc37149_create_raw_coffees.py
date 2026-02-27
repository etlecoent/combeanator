"""create_raw_coffees

Revision ID: e716ddc37149
Revises: 
Create Date: 2026-02-27 13:55:01.122042

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e716ddc37149'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE raw_coffees (
            id UUID PRIMARY KEY,
            vendor TEXT NOT NULL,
            raw_data JSONB NOT NULL,
            scraped_at TIMESTAMPTZ NOT NULL,
            processed BOOLEAN DEFAULT false
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE raw_coffees")
