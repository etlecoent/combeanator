import uuid
from datetime import datetime, timezone

import httpx
import psycopg

from .config import URL, VENDOR

VENDOR = "coffeeaddicts"
URL = "https://coffeeaddicts.ca/collections/coffee-beans/products.json"


def extract() -> list[dict]:
    products = []
    page = 1
    with httpx.Client() as client:
        while True:
            response = client.get(URL, params={"page": page, "limit": 250})
            response.raise_for_status()
            batch = response.json().get("products", [])
            if not batch:
                break
            products.extend(batch)
            page += 1
    return products


def transform(products: list[dict]) -> list[dict]:
    return products


def load(conn: psycopg.Connection, products: list[dict]) -> None:
    now = datetime.now(timezone.utc)

    prepared_items = [
        {
            "id": str(uuid.uuid4()),
            "vendor": VENDOR,
            "raw_data": psycopg.types.json.Jsonb(product),
            "created_at": now,
        }
        for product in products
    ]
    with conn.cursor() as cur:
        cur.executemany(
            """
            INSERT INTO bronze_coffees (id, vendor, raw_data, created_at)
            VALUES (%(id)s, %(vendor)s, %(raw_data)s, %(created_at)s)
            """,
            prepared_items,
        )

    conn.commit()
