# Base stage
FROM node:24.13.0-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN apk add --no-cache su-exec && npm install
COPY . .
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 5000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
RUN npm ci --only=production=false
COPY . .
RUN npm run build

# Production stage
FROM node:24.14.0-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
