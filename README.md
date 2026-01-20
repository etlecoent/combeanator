# Combeanator

A full-stack monorepo application built with React 19, Express 5, and PostgreSQL, featuring AI integration via AWS Bedrock.

## Prerequisites

- [Node.js](https://nodejs.org/) v24.13.0+ (use [nvm](https://github.com/nvm-sh/nvm) for version management)
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- Git

## Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd combeanator

# Use correct Node.js version
nvm use

# Create environment files
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2. Choose Your Development Method

#### Option A: Docker (Recommended)

Everything runs in containers - no local Node.js needed.

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **PostgreSQL**: localhost:5432

#### Option B: Local Development

Requires Node.js 24.13.0+ installed locally.

```bash
# Install dependencies
npm install

# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Port 3000
npm run dev:backend   # Port 5000
```

Note: You'll still need PostgreSQL running (via Docker or locally).

## Development Workflow

### Common Commands

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Frontend only (Vite dev server)
npm run dev:backend      # Backend only (tsx watch)

# Building
npm run build            # Build both workspaces
npm run build:frontend   # Frontend production build
npm run build:backend    # Backend TypeScript compilation

# Testing
npm test                 # Run all tests
npm run test:ui          # Vitest UI (backend)
npm run test:coverage    # Coverage reports

# Code Quality
npm run lint             # Check with Biome
npm run lint:fix         # Auto-fix issues
npm run format           # Format code
npm run type-check       # TypeScript validation

# Cleanup
npm run clean            # Remove node_modules and build artifacts
```

### Docker Commands

```bash
# Start services
docker-compose up -d                    # All services
docker-compose up frontend -d           # Frontend only
docker-compose up backend -d            # Backend only

# Rebuild after dependency changes
docker-compose down
docker-compose up --build -d

# View logs
docker-compose logs -f                  # All services
docker-compose logs -f backend          # Backend only
docker-compose logs -f frontend         # Frontend only

# Execute commands in containers
docker-compose exec backend npm install <package>
docker-compose exec backend npx prisma studio
docker-compose exec frontend npm test

# Stop and cleanup
docker-compose down                     # Stop services
docker-compose down -v                  # Stop and remove volumes (resets database)
```

### Database Management

```bash
# Run Prisma migrations
docker-compose exec backend npx prisma migrate dev --name describe_change

# Generate Prisma client
docker-compose exec backend npx prisma generate

# Open Prisma Studio (database GUI)
docker-compose exec backend npx prisma studio

# Reset database
docker-compose exec backend npx prisma migrate reset
```

## Project Structure

```
combeanator/
├── frontend/                  # React 19 + Vite application
│   ├── src/
│   │   ├── routes/           # File-based routing (TanStack Router)
│   │   ├── main.tsx          # App entry point
│   │   └── routeTree.gen.ts  # Auto-generated (do not edit)
│   ├── Dockerfile            # Multi-stage build (dev + production)
│   ├── package.json
│   └── .env.example
│
├── backend/                   # Express 5 + TypeScript API
│   ├── src/
│   │   ├── index.ts          # Express app entry
│   │   └── logger.ts         # Pino logger config
│   ├── Dockerfile            # Multi-stage build (dev + production)
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml         # Local development services
├── biome.json                 # Code formatting & linting
├── package.json               # Root workspace config
└── .nvmrc                     # Node.js version (24.13.0)
```

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: TanStack Router (file-based, auto code-split)
- **State Management**: TanStack Query (server state) + Axios
- **Styling**: Tailwind CSS 4
- **Validation**: Zod
- **AI**: Vercel AI SDK

### Backend
- **Framework**: Express 5 with TypeScript
- **Logging**: Pino + pino-http (structured JSON)
- **Security**: Helmet (HTTP headers)
- **Validation**: Zod
- **ORM**: Prisma
- **AI**: Vercel AI SDK
- **Process Manager**: tsx (hot reload)

### Database
- **Primary**: PostgreSQL 16
- **ORM**: Prisma (migrations, type-safe queries)
- **Dev Credentials**: `combeanator` / `combeanator`

### Testing
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright (planned)
- **API Testing**: Supertest
- **Mocking**: MSW (Mock Service Worker)

### Tooling
- **Code Quality**: Biome (linting + formatting)
- **Containerization**: Docker + Docker Compose
- **Node Version**: 24.13.0 (managed via nvm)

### Infrastructure (Production)
- **Hosting**: AWS Elastic Beanstalk
- **AI Services**: AWS Bedrock
- **Frontend**: Nginx serves static Vite build
- **Backend**: Node.js runtime

## Environment Variables

### Frontend (`.env`)
All variables must be prefixed with `VITE_` to be exposed to the browser:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Combeanator
```

### Backend (`.env`)
```env
NODE_ENV=development
PORT=5000
LOG_LEVEL=info

# Database (use 'postgres' as host in Docker, 'localhost' for local)
DATABASE_URL=postgresql://combeanator:combeanator@postgres:5432/combeanator
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=combeanator
POSTGRES_PASSWORD=combeanator
POSTGRES_DB=combeanator

# JWT (when authentication is implemented)
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000

# AWS Bedrock (when AI features are implemented)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
```

**Production Note**: AWS Elastic Beanstalk injects environment variables at runtime - `.env` files are only for local development.

## Code Quality Standards

### Biome Configuration
- **Line Width**: 100 characters
- **Quotes**: Single quotes
- **Indentation**: 2 spaces
- **Strict Mode**: No unused variables/imports, prefer `const`
- **Warnings**: `console.log`, explicit `any` types

Run before committing:
```bash
npm run lint:fix
npm run format
```

### TypeScript
- **Backend**: `NodeNext` module resolution with ES modules
- **Frontend**: Standard React + Vite TypeScript setup
- Both enforce strict type checking
- Use `.js` extensions in imports (even for `.ts` files)

### ES Modules
Both frontend and backend use ES modules (`"type": "module"`):
```typescript
// ✓ Correct
import express from 'express';
import logger from './logger.js';  // Note: .js extension
export default app;

// ✗ Incorrect
const express = require('express');
module.exports = app;
```

## Troubleshooting

### Services Won't Start
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f
```

### Permission Issues
If you get permission errors with `node_modules`:
```bash
# Fix ownership
sudo chown -R $USER:$USER frontend/ backend/

# Clean rebuild
docker-compose down -v
docker-compose up --build -d
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose ps
docker-compose logs postgres

# Verify connection settings in backend/.env
# Docker: POSTGRES_HOST=postgres
# Local: POSTGRES_HOST=localhost
```

### Port Already in Use
```bash
# Find and kill process using port 3000 or 5000
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### TypeScript Import Errors
Remember to use `.js` extensions in TypeScript imports:
```typescript
import logger from './logger.js'  // ✓ Correct
import logger from './logger.ts'  // ✗ Wrong
import logger from './logger'     // ✗ Wrong
```

### Reset Everything
```bash
docker-compose down -v
docker volume prune -f
docker-compose build --no-cache
docker-compose up -d
```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Detailed development guide for AI assistants
- **[DOCKER.md](./DOCKER.md)** - Docker usage and troubleshooting (if exists)
- **[_planning/](./\_planning/)** - Architecture decisions and planning docs

## Contributing

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `test:` - Test additions/updates
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks

### Commit Guidelines
```bash
# Run before committing
npm run lint:fix
npm run type-check
npm test

# Ensure tests pass
git add .
git commit -m "feat: add user authentication endpoint"
```

## License

[Add your license here]
