# infra

## Local development

```bash
docker compose -f infra/docker-compose.dev.yml up -d   # postgres:5432, s3 (RustFS):9000, console :9001
bun run s3:init                                         # create the media bucket + public-read policy
```

Then `bun run dev` from the repo root. RustFS console at http://localhost:9001, login `rustfsadmin / rustfsadmin` (dev only).

## Database migrations

- Development: the Postgres adapter pushes schema changes automatically (`push` is on when
  `NODE_ENV !== 'production'`). No migration files needed while iterating.
- Before merging a collection/global change: run `bun run migrate:create <name>` against your
  local DB and commit the generated files in `src/migrations/`.
- CI and production: `bun run migrate` applies pending migrations; the app also runs
  `prodMigrations` on startup, so a Coolify deploy needs no extra step.

## Coolify (staging / production)

`docker-compose.coolify.yml` is a Docker Compose resource for Coolify:

- `app` — built from the repo `Dockerfile` (Next.js standalone output, runs Payload migrations on start)
- `postgres` — PostgreSQL 16 with a named volume
- `s3` — RustFS, S3-compatible storage with a named volume (ADR-0004); expose port 9000 on a subdomain (e.g. `files.<domain>`) and set `S3_PUBLIC_URL` to it; after first start run `bun run s3:init` once (or create the bucket in the console)

Set every variable from `.env.example` in the Coolify UI. Point the app domain at port 3000. Enable Coolify's automatic backups for the `postgres` volume and schedule a nightly `rclone sync` of the S3 bucket to off-site storage.

Branch mapping: `main` → staging auto-deploy; production is a second Coolify resource pinned to a release tag.
