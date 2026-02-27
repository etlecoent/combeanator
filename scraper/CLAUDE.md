# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Python web scraper for the combeanator monorepo. Uses a three-phase pipeline: extraction → transformation → storage.

**Stack**: Python 3.14, uv (package manager), crawl4ai (scraping), httpx (HTTP), psycopg (PostgreSQL), pydantic (validation)

## Commands

```bash
# Install dependencies
uv sync

# Run
uv run src/main.py

# Format
uv run black src/

# Add a dependency
uv add <package>
```

## Architecture

**Pipeline phases** (each in its own module):
- `src/extraction.py` — fetch data from web using crawl4ai/httpx
- `src/transformation.py` — process/normalize data using pydantic models
- `src/db.py` — persist to PostgreSQL via psycopg
- `src/main.py` — entry point, orchestrates the pipeline

**Key patterns**:
- Async-first: crawl4ai and httpx are async-native; use `asyncio` throughout
- Pydantic for data validation and schema definition at pipeline boundaries
- psycopg3 (not psycopg2) — uses `psycopg` package name

## Database

Connects to the same PostgreSQL instance as the backend (see `backend/.env` for credentials: `combeanator`/`combeanator`, port 5432).
