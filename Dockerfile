# ---- Stage 1: Builder ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (cached if package*.json doesn't change)
COPY package*.json ./
RUN npm ci

# Copy application code (but .dockerignore will exclude junk like node_modules)
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build


# ---- Stage 2: Production Image ----
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Expose Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
