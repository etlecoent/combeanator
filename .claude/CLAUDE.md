# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack monorepo using NPM Workspaces with React frontend, Express backend, and PostgreSQL database. Configured for AWS Elastic Beanstalk deployment with AWS Bedrock AI integration.

## Architecture

### Monorepo Structure
- **Frontend**: React 19 + TypeScript + Vite (port 3000)
- **Backend**: Express 5 + TypeScript (port 5000)
- **Database**: PostgreSQL 16 (port 5432)

### Key Technologies
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, TanStack Router (file-based), TanStack Query, Axios, Zod
- **Backend**: Express 5, TypeScript, Pino (logging), Helmet (security), Zod (validation), Kysely (SQL query builder)
- **Testing**: Vitest
- **Tooling**: Biome (formatting/linting), Docker + Docker Compose
- **Infrastructure**: AWS Elastic Beanstalk (hosting), AWS Bedrock (AI services)

### Important Patterns

**ES Modules Everywhere**: Both workspaces use `"type": "module"` in package.json. Always use `import`/`export`, never `require`. In TypeScript imports, use `.js` extensions even though files are `.ts` (e.g., `import logger from "./logger.js"`).

**Multi-Stage Dockerfiles**: Each service has a single Dockerfile with multiple targets:
- `development` - Used by docker compose (hot reload enabled)
- `builder` - Compiles TypeScript
- `production` - Minimal runtime (for CI/CD)

**Environment Variables**:
- Each workspace has its own `.env` file (loaded by docker compose via `env_file`)
- Production uses AWS EB environment properties, not `.env` files

## Development Commands

### Root-Level (runs in all workspaces)
```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only
npm run build            # Build both
npm run build:frontend   # Frontend only
npm run build:backend    # Backend only
npm run test             # Run all tests
npm run lint             # Check with Biome
npm run lint:fix         # Auto-fix with Biome
npm run format           # Format code with Biome
npm run type-check       # TypeScript validation
npm run clean            # Remove all node_modules and build artifacts
```

### Docker Development
```bash
# Start all services
docker compose up -d

# Start specific service
docker compose up frontend -d
docker compose up backend -d

# Rebuild after dependency changes
docker compose down
docker compose up --build -d

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Stop all services
docker compose down

# Reset everything (including database)
docker compose down -v
```

## Code Quality & Standards

**Biome Configuration** (biome.json):
- Line width: 100 characters
- Single quotes, tab indentation
- Strict: no unused variables/imports, prefer const
- Warns on console.log and explicit `any` types
- Run `npm run lint:fix` before committing

**TypeScript Configuration**: Both workspaces enforce strict type checking. See workspace-specific CLAUDE.md for details.

## AI Integration

- **Provider**: AWS Bedrock (not yet implemented)
- Handle AI service failures gracefully with proper error handling

## Deployment

**Target**: AWS Elastic Beanstalk

**Docker Images**:
```bash
# Build production images (CI/CD)
docker build --target production -t combeanator-frontend:latest ./frontend
docker build --target production -t combeanator-backend:latest ./backend
```

**Environment**: AWS EB injects environment variables at runtime (not from `.env` files).

## Important File Locations

- **Docker Configs**: Root `docker-compose.yml` + `frontend/Dockerfile` + `backend/Dockerfile`
- **Environment Examples**: `frontend/example.env`, `backend/example.env`
- **Workspace Root**: `package.json` (defines workspaces and root scripts)
- **Frontend Routes**: `frontend/src/routes/`
- **Backend Entry**: `backend/src/index.ts`

## Node.js Version

- **Version**: 25.4.0 (specified in `.nvmrc`)
- **Rationale**: Latest version with full ES module support
- Use `nvm use` to switch to correct version locally
