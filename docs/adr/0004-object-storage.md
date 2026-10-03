# ADR-0004 — S3-compatible object storage, RustFS as the self-hosted default

**Status:** accepted · **Date:** 2026-10-03

## Context

Media (photos, PDFs, journals, receipts) must survive container redeploys and be servable
publicly. We planned MinIO, but MinIO no longer publishes public container images on Docker
Hub or quay.io (pulls return "access denied"), so it cannot be a dependency.

## Decision

- The application depends only on the **S3 API** via `@payloadcms/storage-s3`
  (`S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_PUBLIC_URL`).
- Default self-hosted server: **RustFS** (`rustfs/rustfs`), MinIO-compatible API and console,
  Apache-2.0, single container, no config file. Used in `infra/docker-compose.dev.yml` and
  `infra/docker-compose.coolify.yml`.
- Bucket creation and public-read policy are done by `scripts/ensure-bucket.mjs`
  (`bun run s3:init`), which works with any provider.
- If RustFS proves immature in production, swap to Garage (`dxflrs/garage`) or a managed
  bucket (Cloudflare R2, Backblaze B2) by changing env vars only.

## Consequences

- No vendor lock-in; storage is a deployment detail.
- RustFS is young (2025). Mitigation: nightly `rclone`/`aws s3 sync` backup of the bucket to
  off-site storage, defined in infra/README.md.
