# ASDRI web — production image for Coolify.
# Next.js standalone output (next.config.ts: output 'standalone') + Payload, built with bun, run with node.

FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time env. The build never touches a database (the public site is force-dynamic) and the
# admin bundle only needs *a* secret to compile, so these are fixed dummies that exist only in this
# stage. They are deliberately NOT build args: Coolify's compose parser merges hard-coded build args
# into the runtime env store under the same key, which once pointed staging at 127.0.0.1:1.
# Real DATABASE_URL / PAYLOAD_SECRET come from the runtime environment only.
ENV DATABASE_URL=postgres://build:build@127.0.0.1:1/build \
    PAYLOAD_SECRET=build-only-secret-not-used-at-runtime
# The only genuine build-time input: NEXT_PUBLIC_* values are inlined into the client bundle.
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
RUN bun run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Bucket bootstrap: idempotent, tolerant of a missing S3 (local-disk fallback), uses the SDK
# already traced into the standalone bundle by @payloadcms/storage-s3.
COPY --from=builder --chown=nextjs:nodejs /app/scripts/ensure-bucket.mjs ./scripts/ensure-bucket.mjs
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node scripts/ensure-bucket.mjs || echo 'bucket bootstrap skipped'; exec node server.js"]
