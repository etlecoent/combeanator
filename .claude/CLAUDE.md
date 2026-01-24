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

**File-Based Routing**: Frontend uses TanStack Router with auto-generated route tree from `frontend/src/routes/`. Routes are code-split automatically. The `routeTree.gen.ts` file is auto-generated - do not edit manually.

**Multi-Stage Dockerfiles**: Each service has a single Dockerfile with multiple targets:
- `development` - Used by docker-compose (hot reload enabled)
- `builder` - Compiles TypeScript
- `production` - Minimal runtime (for CI/CD)

**Environment Variables**:
- Frontend: Must prefix with `VITE_` to expose to client (e.g., `VITE_API_URL`)
- Backend: Standard env vars (no prefix needed)
- Each workspace has its own `.env` file (loaded by docker-compose via `env_file`)
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
docker-compose up -d

# Start specific service
docker-compose up frontend -d
docker-compose up backend -d

# Rebuild after dependency changes
docker-compose down
docker-compose up --build -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Reset everything (including database)
docker-compose down -v
```

### Backend-Specific
```bash
# Or run locally (if Node installed)
cd backend
npm run dev              # tsx watch (hot reload)
npm run build            # Compile TypeScript
npm start                # Run compiled JavaScript
npm run type-check       # TypeScript validation only
npm test                 # Run tests
```

### Frontend-Specific
```bash
# Run locally (if Node installed)
cd frontend
npm run dev              # Vite dev server (hot reload)
npm run build            # Build for production
npm run preview          # Preview production build
# Note: Frontend testing not yet configured
```

## Code Quality & Standards

**Biome Configuration** (biome.json):
- Line width: 100 characters
- Single quotes, tab indentation
- Strict: no unused variables/imports, prefer const
- Warns on console.log and explicit `any` types
- Run `npm run lint:fix` before committing

**TypeScript Configuration**:
- Backend uses `NodeNext` module resolution with ES modules
- Frontend uses standard React + Vite TypeScript setup
- Both enforce strict type checking

## Database & Kysely

- **Primary Database**: PostgreSQL 16
- **Query Builder**: Kysely for type-safe SQL queries
- **Dev Credentials**: `combeanator` / `combeanator` (see `backend/.env`)
- **Docker Service**: `postgres` (accessible via `postgres:5432` inside Docker network)

**Kysely Documentation**: https://kysely.dev/llms-full.txt

**Key Kysely Features**:
- Type-safe SQL query builder with full TypeScript support
- Works directly with SQL migrations (no code generation needed)
- Automatic type inference from database schema
- Supports transactions, CTEs, and complex queries
- Lightweight and focused on SQL rather than ORM patterns

**Common Kysely Patterns**:
```typescript
// Simple select
const users = await db.selectFrom('users').selectAll().execute();

// With where clause
const user = await db
  .selectFrom('users')
  .where('id', '=', userId)
  .selectAll()
  .executeTakeFirst();

// Insert
await db
  .insertInto('users')
  .values({ name: 'John', email: 'john@example.com' })
  .execute();

// Update
await db
  .updateTable('users')
  .set({ name: 'Jane' })
  .where('id', '=', userId)
  .execute();

// Delete
await db.deleteFrom('users').where('id', '=', userId).execute();

// Transactions
await db.transaction().execute(async (trx) => {
  await trx.insertInto('users').values({ name: 'Alice' }).execute();
  await trx.insertInto('profiles').values({ userId: 1 }).execute();
});
```

**Database Seeding**:
```bash
npm run seed:make -- seed_name   # Create a new seed file
npm run seed:run                 # Run all seeds
```

## Testing Strategy

- **Unit**: Vitest for backend logic

**Test Commands**:
```bash
npm test                         # Run tests in all workspaces (currently backend only)
cd backend && npm run test:ui    # Vitest UI
cd backend && npm run test:coverage    # Coverage reports
```

## Logging

Backend uses **Pino** for structured JSON logging:
- HTTP requests logged via `pino-http` middleware
- Log level controlled by `LOG_LEVEL` env var (default: `info`)
- Development logs are JSON (use `pino-pretty` for readable format if needed)
- Production logs sent to CloudWatch (JSON format)

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

**Frontend Production**: Nginx serves static assets from Vite build on port 3000 with SPA routing configured.

**Backend Production**: Node.js runs compiled JavaScript with production dependencies only on port 5000.

**Environment**: AWS EB injects environment variables at runtime (not from `.env` files).

## Important File Locations

- **Frontend Routes**: `frontend/src/routes/` (file-based routing, auto-generates `routeTree.gen.ts`)
- **Backend Entry**: `backend/src/index.ts` (Express app setup)
- **Backend Logger**: `backend/src/logger.ts` (Pino configuration)
- **Docker Configs**: Root `docker-compose.yml` + `frontend/Dockerfile` + `backend/Dockerfile`
- **Environment Examples**: `frontend/example.env`, `backend/example.env`
- **Workspace Root**: `package.json` (defines workspaces and root scripts)

## Middleware Stack (Backend)

Order matters - current setup:
1. `pino-http` - Request logging (must be first)
2. `helmet()` - Security headers
3. `express.json()` - Body parser
4. Route handlers
5. 404 handler (before error middleware)
6. Error middleware (must be last)

## Node.js Version

- **Version**: 25.4.0 (specified in `.nvmrc`)
- **Rationale**: Latest version with full ES module support
- Use `nvm use` to switch to correct version locally
