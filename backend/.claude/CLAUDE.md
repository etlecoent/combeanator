# Backend CLAUDE.md

## Project Structure (Hybrid Convention)

Feature-based organization with shared utilities:

```
src/
  users/              # Feature folder - all user-related code
    usersRouter.ts
    usersController.ts
    usersService.ts
  products/           # Feature folder - all product-related code
    productsRouter.ts
    ...
  shared/             # Shared utilities and cross-cutting concerns
    middlewares/
    utils/
  db/                 # Database configuration and types
  index.ts            # Application entry point
```

- Related code for each feature stays together (routes, controllers, services)
- Shared code (middlewares, utilities, database) in dedicated folders

## Development Commands

```bash
npm run dev              # tsx watch (hot reload)
npm run build            # Compile TypeScript
npm start                # Run compiled JavaScript
npm run type-check       # TypeScript validation only
npm test                 # Run tests
```

## TypeScript

Uses `NodeNext` module resolution with ES modules. In imports, use `.js` extensions even though files are `.ts` (e.g., `import logger from "./logger.js"`).

## Environment Variables

Standard env vars (no prefix needed).

## Key File Locations

- **Entry**: `src/index.ts` (Express app setup)
- **Logger**: `src/logger.ts` (Pino configuration)

## Database & Kysely

- **Primary Database**: PostgreSQL 16
- **Query Builder**: Kysely for type-safe SQL queries
- **Dev Credentials**: `combeanator` / `combeanator` (see `.env`)
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
npm test                         # Run tests (currently backend only from root)
npm run test:ui                  # Vitest UI
npm run test:coverage            # Coverage reports
```

## Logging

Backend uses **Pino** for structured JSON logging:
- HTTP requests logged via `pino-http` middleware
- Log level controlled by `LOG_LEVEL` env var (default: `info`)
- Development logs are JSON (use `pino-pretty` for readable format if needed)
- Production logs sent to CloudWatch (JSON format)

## Middleware Stack

Order matters - current setup:
1. `pino-http` - Request logging (must be first)
2. `helmet()` - Security headers
3. `express.json()` - Body parser
4. Route handlers
5. 404 handler (before error middleware)
6. Error middleware (must be last)

## Production

Node.js runs compiled JavaScript with production dependencies only on port 5000.
