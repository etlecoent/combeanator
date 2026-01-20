# Docker Development Environment

## Architecture

This project uses **separate Docker containers** for frontend and backend to match the production deployment architecture:

- **Frontend**: React + Vite development server (development) / Nginx (production)
- **Backend**: Express API with hot reload (development) / Node.js (production)
- **PostgreSQL**: Database service

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```

2. **Build and start all services**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - Frontend container (http://localhost:3000)
   - Backend container (http://localhost:5000)
   - PostgreSQL container

3. **View logs**
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f frontend
   docker-compose logs -f backend
   ```

## Common Commands

### Managing Services

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d frontend
docker-compose up -d backend

# Stop all services
docker-compose down

# Stop specific service
docker-compose stop frontend

# Restart services
docker-compose restart

# Rebuild services (after Dockerfile changes)
docker-compose build
docker-compose up -d
```

### Working with Containers

```bash
# Execute commands in frontend container
docker-compose exec frontend npm install <package>
docker-compose exec frontend npm test

# Execute commands in backend container
docker-compose exec backend npm install <package>
docker-compose exec backend npx prisma migrate dev

# Open shell in container
docker-compose exec frontend sh
docker-compose exec backend sh
```

### Database Operations

```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U combeanator -d combeanator

# Run Prisma migrations
docker-compose exec backend npx prisma migrate dev

# Generate Prisma client
docker-compose exec backend npx prisma generate

# Open Prisma Studio
docker-compose exec backend npx prisma studio
```

## Service Endpoints

- **Frontend (Development)**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **PostgreSQL**: localhost:5432
  - User: `combeanator`
  - Password: `combeanator`
  - Database: `combeanator`

## Docker Files Overview

### Development
- `frontend/Dockerfile.dev` - Vite dev server with hot reload
- `backend/Dockerfile.dev` - Express with tsx watch for hot reload
- `docker-compose.yml` - Orchestrates all development services

### Production
- `frontend/Dockerfile` - Multi-stage build with nginx
- `backend/Dockerfile` - Multi-stage build with production dependencies only

## Volume Mounts

Development containers use volume mounts for hot reloading:
- Frontend: `./frontend:/app` (with node_modules excluded)
- Backend: `./backend:/app` (with node_modules excluded)

Changes to source files are immediately reflected in running containers.

## Environment Variables

### Frontend
- `NODE_ENV` - Set to `development`
- `VITE_API_URL` - Backend API URL (http://backend:5000 in Docker network)

### Backend
- `NODE_ENV` - Set to `development`
- `PORT` - API server port (5000)
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_*` - Individual database connection parameters

See `.env.example` for full list.

## Production Builds

To test production builds locally:

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Run production containers
docker-compose -f docker-compose.prod.yml up -d
```

Note: You'll need to create `docker-compose.prod.yml` for production testing.

## Enabling MongoDB (Optional)

Uncomment the MongoDB service in `docker-compose.yml`:

```yaml
mongodb:
  image: mongo:7-jammy
  # ... rest of config
```

Then restart:
```bash
docker-compose down
docker-compose up -d
```

## Troubleshooting

### Services won't start
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
docker-compose logs -f
```

### Permission issues with node_modules
```bash
docker-compose down
docker volume prune
docker-compose up -d
```

### Hot reload not working
Ensure volume mounts are correct:
```bash
docker-compose down
docker-compose up -d
# Check volumes
docker-compose exec frontend ls -la /app
```

### Port conflicts
If ports 3000, 5000, or 5432 are already in use, update the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Map to different host port
```

### Database connection issues
Check that PostgreSQL is running and backend can connect:
```bash
docker-compose ps
docker-compose logs postgres
docker-compose logs backend
```

### Database reset
To completely reset the database:
```bash
docker-compose down
docker volume rm combeanator_postgres-data
docker-compose up -d
```

### Rebuilding after dependency changes
When you update package.json:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## AWS Deployment Alignment

The separate container architecture aligns with AWS deployment:

- **Frontend**: Build static files → Deploy to S3 + CloudFront (or Elastic Beanstalk)
- **Backend**: Build and deploy to Elastic Beanstalk or ECS
- **Database**: RDS PostgreSQL

Production Dockerfiles are optimized for this deployment model.
