# Validations

## Routes
- Use Zod schemas to validate request bodies, query parameters, and path parameters.
- Create separate schemas for each route and HTTP method.
- Use `validateBody`, `validateQuery`, and `validateParams` middleware to apply the schemas to the routes.
