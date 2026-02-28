import psycopg
import redis
import json

from .config import VENDOR

QUEUE_NAME = "coffees:v1"

def extract(conn: psycopg.Connection) -> list[dict]:
    with conn.cursor(row_factory=psycopg.rows.dict_row) as cur:
        cur.execute(
            """SELECT 
                id, 
                name,
                vendor,
                roaster,
                origin,
                process,
                roast_level,
                producer,
                altitude,
                variety,
                tasting_notes,
                recommended_brew 
            
            FROM silver_coffees 
            
            WHERE vendor = %(vendor)s""",
            {"vendor": VENDOR},
        )
        return cur.fetchall()
    
def transform(bronze_rows: list[dict]) -> list[dict]:
    return bronze_rows

def load(conn: redis.Redis, items: list[dict]) -> None:
    for item in items:
        json_item = json.dumps(item, default=str)  # Convert to JSON string, handling any non-serializable types
        conn.lpush(QUEUE_NAME, json_item)