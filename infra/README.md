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
- Applying migrations to a **dev** database that has been pushed to: Payload records a `dev`
  marker row in `payload_migrations` and `migrate` then asks an interactive question. Either
  answer it in a terminal, or remove the marker first:
  `docker compose -f infra/docker-compose.dev.yml exec postgres psql -U postgres -d asdri -c "delete from payload_migrations where name='dev'"`.
- `migrate:create` prompts (interactively) when one run both drops and creates tables or enums
  of the same kind ("created or renamed?"). Avoid the prompt by splitting such a change into two
  migrations: first remove, then add (see the two `site_shell` migrations for an example).
- Starter content: `bun run seed` writes the site globals (settings, navigation, impact stats,
  home), and upserts the starter collections (people, courses, sample notices) by slug in bn + en.
  It is idempotent: re-running overwrites the seeded starter content with the same values and
  leaves anything the office has added untouched (items are matched by slug).

### The snapshot baseline (`20261003_173205_schema_baseline.json`)

`migrate:create` does not diff against the database or the last applied migration: it diffs the
current schema against the **lexicographically latest `*.json` snapshot** in `src/migrations/`.
When several feature branches each carry their own migration, their snapshots each describe a
different partial schema, so after merging such branches a naive `migrate:create` would try to
re-create tables that already exist (dropped on another branch, missing on this one).

The baseline file exists to close that gap: it is a **snapshot-only** migration — a full picture
of the merged schema (people + courses + notices, everything before the home global) that is
**deliberately not imported by `src/migrations/index.ts`** and never runs. Its only job is to be
the lexicographically latest snapshot at the time it was cut, so the generator diffs from a
complete picture instead of a partial one. (`20261003_173258_home_global.json` and everything
generated after it now serve the same role as they are later in sort order.)

**Rule for parallel branches:** after merging a branch that added a migration, regenerate the
baseline on the merged branch *before* creating the next migration — point the generator at a
complete schema by keeping the latest snapshot accurate. In practice: merge, then
`bun run payload migrate:create baseline_refresh` (or cut a new snapshot-only baseline) whenever
the newest `.json` in the folder predates tables that already exist on your branch. Never
hand-edit snapshots; never reference the baseline from `index.ts`.

One more generator quirk: run `migrate:create` **with the S3 variables set** (or empty), matching
how the committed migration history was generated — otherwise the generated diff drops
`media._objectkey` from the chain.


## Coolify (staging / production)

`docker-compose.coolify.yml` is a Docker Compose resource for Coolify:

- `app` — built from the repo `Dockerfile` (Next.js standalone output, runs Payload migrations on start)
- `postgres` — PostgreSQL 16 with a named volume
- `s3` — RustFS, S3-compatible storage with a named volume (ADR-0004); expose port 9000 on a subdomain (e.g. `files.<domain>`) and set `S3_PUBLIC_URL` to it; after first start run `bun run s3:init` once (or create the bucket in the console)

Set every variable from `.env.example` in the Coolify UI. Point the app domain at port 3000. Enable Coolify's automatic backups for the `postgres` volume and schedule a nightly `rclone sync` of the S3 bucket to off-site storage.

Branch mapping: `main` → staging auto-deploy; production is a second Coolify resource pinned to a release tag.
