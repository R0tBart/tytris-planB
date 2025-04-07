# 1. Build stage
FROM node:18-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY . .

# Install deps und build
RUN pnpm install
RUN pnpm build

# 2. Runtime stage
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["pnpm", "start"]
