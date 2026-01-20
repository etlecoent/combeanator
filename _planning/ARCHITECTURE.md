# Architecture

## Project Structure

- **Repository Type**: Monorepo
- **Package Manager**: NPM Workspaces

## Tech Stack

### Front End

- **Build Tool**: Vite
- **Framework**: React with TypeScript
- **Styling**: Tailwind
- **Routing**: React Router
- **Data Fetching**: Tanstack Query (with Axios)
- **Streaming**: Vercel AI SDK

### Backend

- **Framework**: Express with TypeScript
- **Schema Validation**: Zod
- **Authentication**: JSON Web Token
- **Data Fetching**: Axios
- **Streaming**: Vercel AI SDK

### Database

- **Primary Database**: PostgreSQL with Prisma for ORM & migrations
- **Optional NoSQL**: MongoDB (if needed for specific use cases)

### Testing

- **E2E Testing**: Playwright & MSW for API Mocking
- **Unit/Integration**: Vitest & React Testing Library
- **API Testing**: Supertest for Express

### Infrastructure

- **Containerization**: Docker for environment setup
- **Full Stack Hosting**: AWS Elastic BeanStalk
- **AI Hosting**: AWS Bedrock for hosting AI Services


### Workflows & Integration

- **MCPs**: Github, PostgreSQL, Playwright (MongoDB if used)
- **Formatting**: Biome
- **Package Management**: NPM as package manager
