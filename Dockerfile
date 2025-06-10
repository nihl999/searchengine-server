# Dockerfile

# ---- Base Stage ----
# Use an official Node.js image
FROM node:18-alpine AS base
WORKDIR /app

# ---- Dependencies Stage ----
# Install only dependencies to leverage Docker cache
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install

# ---- Development Stage ----
# This stage is used when developing locally
FROM base AS dev
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
CMD ["pnpm", "run", "start:dev"] # Assumes a "dev" script in package.json for live-reloading (e.g., using nodemon)
