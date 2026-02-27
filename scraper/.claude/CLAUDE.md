# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Python web scraper for the combeanator monorepo. Uses a medallion architecture: **bronze** (raw extraction) → **silver** (normalized) layers, per vendor.

**Stack**: Python 3.14, uv (package manager), httpx (HTTP), psycopg (PostgreSQL), pydantic (config/validation), alembic (migrations)

## Commands

```bash
# Install dependencies
uv sync

# Run
uv run main.py

# Format
uv run black src/

# Add a dependency
uv add <package>

# Migrations (from scraper root)
uv run alembic upgrade head
uv run alembic revision --autogenerate -m "description"
```

## Architecture

**Entry point**: `main.py` (root) — iterates vendors, calls `run_bronze` then `run_silver` per vendor.

**Vendor pattern**: Each vendor subclasses `BaseVendor` and implements ETL for both layers:
- `bronze_extract() -> list[dict]` — fetch raw data from source
- `bronze_transform(items) -> list[dict]` — minimal normalization
- `bronze_load(conn, items)` — persist to `bronze_coffees`
- `silver_extract(conn) -> list[dict]` — read from bronze layer
- `silver_transform(rows) -> list[dict]` — structured normalization
- `silver_load(conn, items)` — persist to `silver_coffees`

**Structure**:
```
main.py                          # Entry point
src/
  config.py                      # Pydantic config from env vars
  db/
    connection.py                # psycopg connection helper
    migrations/                  # Alembic migrations
      versions/                  # Migration files
  vendors/
    base.py                      # BaseVendor ABC
    __init__.py                  # Vendor registry (list of vendor instances)
    coffeeaddicts/               # One folder per vendor
      __init__.py                # CoffeeAddictsVendor(BaseVendor)
      bronze.py                  # extract / transform / load for bronze
      silver.py                  # extract / transform / load for silver
```

**Key patterns**:
- Sync (not async): httpx.Client, psycopg sync API
- psycopg3 (not psycopg2) — package name is `psycopg`
- Config via pydantic BaseModel reading from env vars (loaded via dotenv)

## Database

Connects to the same PostgreSQL instance as the backend (see `backend/.env` for credentials: `combeanator`/`combeanator`, port 5432).

Tables: `bronze_coffees` (raw JSONB), `silver_coffees` (structured/normalized).
