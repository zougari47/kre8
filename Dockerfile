FROM oven/bun:1-alpine AS base
WORKDIR /app

# ---- Install deps ----
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- Build ----
FROM base AS build
COPY --from=install /app/node_modules node_modules
COPY . .
ENV NODE_ENV=production
ENV NITRO_PRESET=bun
RUN bun run build

# ---- Production image ----
FROM base AS release
COPY --from=build /app/.output .output
COPY --from=build /app/package.json .

USER bun
EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]
