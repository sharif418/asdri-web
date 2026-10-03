# ADR-0001 — Next.js 15 + Payload CMS 3 on PostgreSQL

**Status:** accepted · **Date:** 2026-10-03

## Context

The site is content-heavy (courses, notices, journals, fatwa, blog, gallery) *and* has transactional modules (admissions, donations, donor portal, fatwa workflow). Staff must edit everything without developers. The team already runs Next.js/NestJS/Postgres/Docker/Coolify (Sunnah Life). UI/UX quality is a hard client requirement, which rules out theme-driven builders.

## Options considered

1. **WordPress + plugins** — fastest for content; weak for custom workflows (fatwa queue, donor portal, sponsorship), plugin security surface, design constrained by themes.
2. **Headless CMS (Strapi/Directus) + separate Next.js** — two deployables, two auth systems, more glue.
3. **Payload CMS 3 inside Next.js** — single deployable, TypeScript-native content model, drafts/versions, localisation, access control, S3 uploads, admin UI included, custom collections for transactional data, Local API in server components.

## Decision

Option 3. Payload 3 with `@payloadcms/db-postgres`, `@payloadcms/storage-s3` (MinIO), Lexical rich text, SEO + redirects + search + form-builder plugins, Tailwind v4 with a bespoke token set. Package manager bun. Deployed as one container plus Postgres and MinIO on Coolify.

## Consequences

- One repo, one deploy, one auth. Fast iteration on content model.
- Transactional modules (payments, OTP, PDF generation, emails) are implemented as Payload collections + Next route handlers + background jobs (Payload Jobs queue first; move to a worker if load demands).
- Team must learn Payload conventions (collections, hooks, access). Mitigated by AGENTS.md and the scaffold.
- Heavy search can later move to Meilisearch without changing the content model.
