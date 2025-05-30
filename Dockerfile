<<<<<<< Updated upstream
FROM node:18-alpine AS builder
=======
# FROM node:18-alpine
>>>>>>> Stashed changes

# WORKDIR /app

# # Install pnpm
# RUN npm install -g pnpm

<<<<<<< Updated upstream
# Copy package files first
COPY package*.json ./

# Install dependencies
RUN pnpm install --no-strict-peer-dependencies

# Copy source code (node_modules is excluded via .dockerignore)
COPY . .

# Build the application
RUN pnpm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "run", "start"]
=======
# COPY package*.json ./

# RUN pnpm install

# COPY . .

# EXPOSE 3000

# CMD ["pnpm", "run", "dev"]
>>>>>>> Stashed changes
