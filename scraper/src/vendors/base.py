from abc import ABC, abstractmethod

import psycopg


class BaseVendor(ABC):
    name: str

    def run_bronze(self, conn: psycopg.Connection) -> None:
        items = self.bronze_extract()
        items = self.bronze_transform(items)
        self.bronze_load(conn, items)

    def run_silver(self, conn: psycopg.Connection) -> None:
        rows = self.silver_extract(conn)
        items = self.silver_transform(rows)
        self.silver_load(conn, items)

    @abstractmethod
    def bronze_extract(self) -> list[dict]: ...

    @abstractmethod
    def bronze_transform(self, items: list[dict]) -> list[dict]: ...

    @abstractmethod
    def bronze_load(self, conn: psycopg.Connection, items: list[dict]) -> None: ...

    @abstractmethod
    def silver_extract(self, conn: psycopg.Connection) -> list[dict]: ...

    @abstractmethod
    def silver_transform(self, rows: list[dict]) -> list[dict]: ...

    @abstractmethod
    def silver_load(self, conn: psycopg.Connection, items: list[dict]) -> None: ...
