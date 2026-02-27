import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / "src"))

from db.connection import get_connection
from vendors import vendors


def main():
    with get_connection() as conn:
        for vendor in vendors:
            print(f"[{vendor.name}] Running bronze...")
            vendor.run_bronze(conn)
            print(f"[{vendor.name}] Running silver...")
            vendor.run_silver(conn)
            print(f"[{vendor.name}] Done.")


if __name__ == "__main__":
    main()
