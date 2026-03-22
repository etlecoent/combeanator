import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "src"))

from db.connection import get_connection as get_db_connection
from redis_client.connection import get_connection as get_redis_connection
from vendors import vendors


def main():
    with get_db_connection() as conn:
        with get_redis_connection() as redis_conn:
            for vendor in vendors:
                print(f"[{vendor.name}] Running bronze...")
                vendor.run_bronze(conn)
                print(f"[{vendor.name}] Done with bronze.")
                print(f"[{vendor.name}] Running silver...")
                vendor.run_silver(conn)
                print(f"[{vendor.name}] Done with silver.")
                print(f"[{vendor.name}] Running gold...")
                vendor.run_gold(conn, redis_conn)
                print(f"[{vendor.name}] Done with gold.")


if __name__ == "__main__":
    main()
