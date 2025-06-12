# Dockerfile

# ---- Base Stage ----
FROM node:20-alpine AS base

# Install bash for dev container features compatibility
RUN apk add --no-cache bash git

# Install pnpm globally and ensure it's in PATH
RUN npm install -g pnpm@latest

# Create app directory and set proper ownership
WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS dependencies
# Copy package files with proper ownership
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# ---- Development Stage ----
FROM base AS dev
# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
# Copy source code
COPY . .

# Ensure pnpm is available in PATH
ENV PATH="/home/node/.local/share/pnpm:$PATH"

# Default command for development
CMD