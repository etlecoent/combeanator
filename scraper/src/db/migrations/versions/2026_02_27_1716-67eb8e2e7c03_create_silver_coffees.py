"""create silver_coffees

Revision ID: 67eb8e2e7c03
Revises: 539d79c3806e
Create Date: 2026-02-27 17:16:32.394784

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "67eb8e2e7c03"
down_revision: Union[str, Sequence[str], None] = "539d79c3806e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE silver_coffees (
            id UUID PRIMARY KEY,
            bronze_coffees_id UUID NOT NULL REFERENCES bronze_coffees(id) ON DELETE CASCADE,
            name TEXT NOT NULL,
            vendor TEXT NOT NULL,
            origin TEXT[],
            process TEXT[],
            roast_level TEXT[],
            producer TEXT,
            altitude TEXT,
            variety TEXT[],
            tasting_notes TEXT,
            recommended_brew TEXT[],
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE silver_coffees")
