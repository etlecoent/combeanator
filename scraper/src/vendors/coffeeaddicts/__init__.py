import psycopg

from vendors.base import BaseVendor
from vendors.coffeeaddicts import bronze, silver


class CoffeeAddictsVendor(BaseVendor):
    name = "coffeeaddicts"

    def bronze_extract(self) -> list[dict]:
        return bronze.extract()

    def bronze_transform(self, items: list[dict]) -> list[dict]:
        return bronze.transform(items)

    def bronze_load(self, conn: psycopg.Connection, items: list[dict]) -> None:
        bronze.load(conn, items)

    def silver_extract(self, conn: psycopg.Connection) -> list[dict]:
        return silver.extract(conn)

    def silver_transform(self, rows: list[dict]) -> list[dict]:
        return silver.transform(rows)

    def silver_load(self, conn: psycopg.Connection, items: list[dict]) -> None:
        silver.load(conn, items)
