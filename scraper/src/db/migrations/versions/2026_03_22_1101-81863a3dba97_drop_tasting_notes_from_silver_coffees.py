"""drop_tasting_notes_from_silver_coffees

Revision ID: 81863a3dba97
Revises: c56c2477d0cf
Create Date: 2026-03-22 11:01:58.337497

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '81863a3dba97'
down_revision: Union[str, Sequence[str], None] = 'c56c2477d0cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE silver_coffees DROP COLUMN tasting_notes")


def downgrade() -> None:
    op.execute("ALTER TABLE silver_coffees ADD COLUMN tasting_notes TEXT")
