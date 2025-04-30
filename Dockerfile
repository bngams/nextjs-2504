# syntax=docker.io/docker/dockerfile:1

# This Dockerfile is used to build and run a Next.js application in a containerized environment.
# It is structured into multiple stages to optimize the build process and reduce the final image size.

# Stage 1: Base
# - Uses the official Node.js 18 Alpine image as the base image for all stages.
# - Alpine is chosen for its small size and efficiency.

# Stage 2: Dependencies (deps)
# - Installs necessary system dependencies (e.g., libc6-compat for compatibility).
# - Sets the working directory to /app.
# - Copies package manager lock files (yarn.lock, package-lock.json, pnpm-lock.yaml) and .npmrc if available.
# - Installs dependencies using the appropriate package manager based on the lock file present.
# - Ensures a consistent and reproducible dependency installation.

# Stage 3: Builder
# - Copies the installed node_modules from the deps stage to avoid redundant installations.
# - Copies the entire application source code into the container.
# - Builds the Next.js application using the appropriate package manager.
# - The build process generates a production-ready version of the application.

# Stage 4: Runner (Production)
# - Prepares the final production image.
# - Sets the working directory to /app.
# - Configures the environment for production (NODE_ENV=production).
# - Creates a non-root user (nextjs) and group (nodejs) for security purposes.
# - Copies the public assets and the standalone build output from the builder stage.
# - Ensures the application runs as the non-root user (nextjs).
# - Exposes port 3000 for the application.
# - Sets the default command to run the Next.js server using the standalone output.

# Additional Notes:
# - Telemetry collection by Next.js is disabled during the build or runtime by uncommenting the respective ENV lines.
# - The standalone output of Next.js is used to optimize the image size by including only the necessary files.
# - The HOSTNAME environment variable is set to "0.0.0.0" to allow the application to listen on all network interfaces.

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]