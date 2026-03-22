"""add_description_to_silver_coffees

Revision ID: c56c2477d0cf
Revises: 67eb8e2e7c03
Create Date: 2026-03-22 10:48:01.553899

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c56c2477d0cf'
down_revision: Union[str, Sequence[str], None] = '67eb8e2e7c03'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE silver_coffees ADD COLUMN description TEXT")


def downgrade() -> None:
    op.execute("ALTER TABLE silver_coffees DROP COLUMN description")
