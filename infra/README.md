# infra

## Local development

```bash
docker compose -f infra/docker-compose.dev.yml up -d   # postgres:5432, minio:9000 (console :9001)
```

Then `bun run dev` from the repo root. MinIO console login: `minioadmin / minioadmin` (dev only). Create the bucket named in `S3_BUCKET` once, or let the `createbuckets` service do it.

## Coolify (staging / production)

`docker-compose.coolify.yml` is a Docker Compose resource for Coolify:

- `app` — built from the repo `Dockerfile` (Next.js standalone output, runs Payload migrations on start)
- `postgres` — PostgreSQL 16 with a named volume
- `minio` — S3-compatible storage with a named volume; expose `minio` on a subdomain (e.g. `files.<domain>`) for public media URLs, or put it behind the app's `/media` proxy

Set every variable from `.env.example` in the Coolify UI. Point the app domain at port 3000. Enable Coolify's automatic backups for the `postgres` volume and schedule `mc mirror` for MinIO to off-site storage.

Branch mapping: `main` → staging auto-deploy; production is a second Coolify resource pinned to a release tag.
