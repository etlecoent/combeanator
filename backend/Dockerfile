# Base stage
FROM node:24.13.0-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
RUN npm ci --only=production=false
COPY . .
RUN npm run build

# Production stage
FROM node:24.13.0-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
