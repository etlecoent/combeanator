import uuid

import psycopg

from .config import VENDOR


def _extract_tag(tags: list[str], prefix: str) -> list[str]:
    parsed = []
    for tag in tags:
        if tag.lower().startswith(prefix.lower() + "_"):
            parsed.append(tag.split("_", 1)[1].strip())

    return parsed


def _transform_row(row: dict) -> dict:
    raw = row["raw_data"]
    tags = raw.get("tags", [])

    return {
        "bronze_coffees_id": str(row["id"]),
        "name": raw.get("title"),
        "vendor": VENDOR,
        "roaster": raw.get("vendor"),
        "origin": _extract_tag(tags, "origin"),
        "process": _extract_tag(tags, "process"),
        "roast_level": _extract_tag(tags, "roast"),
        "producer": _extract_tag(tags, "producer"),
        "altitude": _extract_tag(tags, "altitude"),
        "variety": _extract_tag(tags, "variety"),
        "tasting_notes": _extract_tag(tags, "tasting notes"),
        "recommended_brew": _extract_tag(tags, "brew"),
    }


def extract(conn: psycopg.Connection) -> list[dict]:
    with conn.cursor(row_factory=psycopg.rows.dict_row) as cur:
        cur.execute(
            "SELECT id, raw_data FROM bronze_coffees WHERE vendor = %(vendor)s",
            {"vendor": VENDOR},
        )
        return cur.fetchall()


def transform(bronze_rows: list[dict]) -> list[dict]:
    return [_transform_row(row) for row in bronze_rows]


def load(conn: psycopg.Connection, items: list[dict]) -> None:
    if not items:
        return

    prepared_items = [
        {
            "id": str(uuid.uuid4()),
            "bronze_coffees_id": item["bronze_coffees_id"],
            "name": item["name"],
            "vendor": item["vendor"],
            "roaster": item["roaster"],
            "origin": item["origin"],
            "process": item["process"],
            "roast_level": item["roast_level"],
            "producer": item["producer"][0] if item["producer"] else None,
            "altitude": item["altitude"][0] if item["altitude"] else None,
            "variety": item["variety"],
            "tasting_notes": item["tasting_notes"],
            "recommended_brew": item["recommended_brew"],
        }
        for item in items
    ]

    with conn.cursor() as cur:
        cur.executemany(
            """
            INSERT INTO silver_coffees (
                id, bronze_coffees_id, name, vendor, roaster,
                origin, process, roast_level, producer, altitude, variety, tasting_notes, recommended_brew
            ) VALUES (
                %(id)s, %(bronze_coffees_id)s, %(name)s, %(vendor)s, %(roaster)s,
                %(origin)s, %(process)s, %(roast_level)s, %(producer)s,
                %(altitude)s, %(variety)s, %(tasting_notes)s, %(recommended_brew)s
            )
            """,
            prepared_items,
        )
    conn.commit()
