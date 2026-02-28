from abc import ABC, abstractmethod

import psycopg
import redis


class BaseVendor(ABC):
    name: str

    def run_bronze(self, db_conn: psycopg.Connection) -> None:
        items = self.bronze_extract()
        items = self.bronze_transform(items)
        self.bronze_load(db_conn, items)

    def run_silver(self, db_conn: psycopg.Connection) -> None:
        rows = self.silver_extract(db_conn)
        items = self.silver_transform(rows)
        self.silver_load(db_conn, items)

    def run_gold(self, db_conn: psycopg.Connection, redis_conn: redis.Redis) -> None:
        rows = self.gold_extract(db_conn)
        items = self.gold_transform(rows)
        self.gold_load(redis_conn, items)

    @abstractmethod
    def bronze_extract(self) -> list[dict]: ...

    @abstractmethod
    def bronze_transform(self, items: list[dict]) -> list[dict]: ...

    @abstractmethod
    def bronze_load(self, conn: psycopg.Connection, items: list[dict]) -> None: ...

    @abstractmethod
    def silver_extract(self, conn: psycopg.Connection) -> list[dict]: ...

    @abstractmethod
    def silver_transform(self, items: list[dict]) -> list[dict]: ...

    @abstractmethod
    def silver_load(self, conn: psycopg.Connection, items: list[dict]) -> None: ...

    @abstractmethod
    def gold_extract(self, conn: psycopg.Connection) -> list[dict]: ...

    @abstractmethod
    def gold_transform(self, items: list[dict]) -> list[dict]: ...

    @abstractmethod
    def gold_load(self, conn: redis.Redis, items: list[dict]) -> None: ...