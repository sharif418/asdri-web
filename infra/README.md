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
`media._objectkey` from the chain. This happened once (`20261003_153157_people_collection`);
`20261004_062500_restore_media_objectkey` repairs it idempotently, so fresh databases are fine.


## Coolify (staging / production)

### Staging in five steps (asdri.ailearnersbd.com)

1. DNS: `A asdri → <VPS IP>` (done 2026-10-04 at Namecheap). Coolify issues the certificate.
2. Coolify → Project → **New resource → Docker Compose** → source: the public GitHub repo
   `sharif418/asdri-web`, branch `main`, compose file `infra/docker-compose.coolify.yml`.
3. Environment variables: copy `infra/staging.env.example`, fill the secrets
   (`openssl rand -hex 32`), set `NEXT_PUBLIC_SERVER_URL=https://asdri.ailearnersbd.com`,
   leave `S3_PUBLIC_URL` empty (files are served through the app).
4. Domain: on the `app` service set `https://asdri.ailearnersbd.com` → port 3000. Deploy.
   The build needs no database (the public site renders on request); the container runs
   pending migrations on start (`prodMigrations`) and creates the media bucket.
5. First run: open `/admin`, create the first admin user, then press **Load starter content**
   on the dashboard. It seeds both locales and purges the caches. Health: `/api/health`.

Redeploys happen on every push to `main` if the resource's auto-deploy is on; otherwise press
Deploy. Database and bucket live in named volumes and survive redeploys.


`docker-compose.coolify.yml` is a Docker Compose resource for Coolify:

- `app` — built from the repo `Dockerfile` (Next.js standalone output, runs Payload migrations on start)
- `postgres` — PostgreSQL 16 with a named volume
- `s3` — RustFS, S3-compatible storage with a named volume (ADR-0004); expose port 9000 on a subdomain (e.g. `files.<domain>`) and set `S3_PUBLIC_URL` to it; after first start run `bun run s3:init` once (or create the bucket in the console)

Set every variable from `.env.example` in the Coolify UI. Point the app domain at port 3000. Enable Coolify's automatic backups for the `postgres` volume and schedule a nightly `rclone sync` of the S3 bucket to off-site storage.

Branch mapping: `main` → staging auto-deploy; production is a second Coolify resource pinned to a release tag.
