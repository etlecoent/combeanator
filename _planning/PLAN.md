# Project Build Plan

## Recommended Method

Build in phases using an **incremental vertical slice approach**. This gets you to a working application quickly, validates the architecture early, and builds momentum.

## Build Steps

### Phase 1: Foundation (Infrastructure & Tooling)

1. **Initialize monorepo structure**
   - Set up NPM workspaces
   - Create workspace folders (apps/frontend, apps/backend, packages/shared)
   - Configure root package.json with workspace commands

2. **Configure tooling**
   - Biome for formatting/linting
   - TypeScript configurations (root + per workspace)
   - Shared tsconfig for common settings

3. **Set up Docker environment**
   - docker-compose.yml with PostgreSQL
   - Environment variable templates
   - Local development database

### Phase 2: Backend Foundation

4. **Express server setup**
   - Basic Express app with TypeScript
   - Middleware (CORS, body-parser, error handling)
   - Health check endpoint
   - Development hot-reload

5. **Prisma & Database**
   - Initialize Prisma
   - Create initial schema (User model)
   - Run first migration
   - Seed script for development data

6. **Authentication scaffolding**
   - JWT utilities
   - Auth middleware
   - Zod schemas for validation

### Phase 3: Frontend Foundation

7. **Vite + React setup**
   - Initialize Vite project
   - Configure Tailwind
   - Set up React Router
   - Configure Tanstack Query

8. **Basic UI structure**
   - Layout components
   - Navigation
   - Basic styling system

### Phase 4: First Feature (Authentication)

9. **Backend auth implementation**
   - Register/login endpoints
   - JWT generation/validation
   - Protected route example
   - Supertest tests

10. **Frontend auth implementation**
    - Login/register forms
    - Auth context/state
    - Protected routes
    - Connect to backend API

11. **Testing**
    - Vitest tests for auth logic
    - Playwright E2E test for login flow

### Phase 5: AI Integration (if needed early)

12. **AWS Bedrock setup**
    - Configure credentials
    - Vercel AI SDK integration
    - Streaming endpoint example
    - Frontend streaming UI

### Phase 6: Iterate

13. **Add main features** (repeat vertical slices)
14. **Refine testing** (add MSW, more E2E tests)
15. **Deployment setup** (AWS Elastic Beanstalk config)

## Why This Approach?

- **Validates architecture early** - You'll know if the stack works together by Phase 4
- **Working software quickly** - Something functional after Phase 4
- **Easier debugging** - Small increments make issues easier to isolate
- **Flexibility** - Can adjust architecture based on what you learn
- **Motivation** - Seeing progress keeps momentum

## Alternative Approaches

If you prefer a different method:
- **Feature-first**: Skip some infrastructure, build a feature, add tooling later (faster but messier)
- **Infrastructure-heavy**: Complete all setup first, then build features (more organized but slower to see results)
