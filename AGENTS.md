# AGENTS.md — operating manual for humans and AI agents

This file is the contract for anyone (developer or coding agent) who changes this repository. Read it fully before the first commit.

## 1. What we are building

The web platform for As-Sunnah Dawah & Research Institute (ASDRI). Start with `README.md`, then read in order:

1. `docs/00-vision-and-products.md` — who the users are and what "done" looks like
2. `docs/01-requirements.md` — every requirement with a stable ID
3. `docs/02-information-architecture.md` — routes, navigation, page inventory
4. `docs/03-data-model.md` — Payload collections and relationships
5. `docs/04-gap-register.md` — what the client has not told us yet, and the default we build
6. `docs/05-design-direction.md` — the UI/UX bar. Non-negotiable.
7. `docs/06-roadmap.md` — phases and the current milestone
8. `docs/adr/` — decisions already taken. Do not relitigate without a new ADR.

The client's original documents are in `docs/source/`. The `*.extracted.txt` files are the source of truth for all Bangla copy. Copy text from there; never retype or "improve" the client's wording without flagging it.

## 2. Non-negotiables

- **Bangla first.** Every user-facing string goes through i18n (`bn` default, `en` second). Bangla typography must use the project fonts (see design direction) and Bengali digits where the design system says so.
- **No template look.** No stock hero + three cards + testimonials. Follow `docs/05-design-direction.md`. If you cannot make a screen look intentional, stop and ask rather than ship generic.
- **Everything editable.** Any text, image, number or list a staff member might change lives in Payload (a collection or a global), not in code. Hard-coding client content is a bug.
- **Feature flags.** Each module (fatwa, library, donor portal, sponsorship, FB feed, …) has a toggle in the `site-settings` global. Hidden modules must disappear from navigation, sitemap and search.
- **Privacy of students and donors.** Sponsored-student lists expose only the anonymised profile fields defined in `docs/03-data-model.md`. Donor data never appears publicly unless the donor opted in. Anonymous donations hide the name everywhere except the backend and the receipt email.
- **Accessibility and performance.** Lighthouse ≥ 90 on Performance / Accessibility / SEO for every public page on a mid-range Android profile. Images via `next/image`, lazy loading, no layout shift.
- **Security.** Payload access control on every collection. Admin routes behind auth. Payment webhooks verified by signature. Secrets only in env.

## 3. Engineering conventions

- TypeScript strict. No `any` without a comment explaining why.
- Payload collections live in `src/collections/<Name>.ts`, one per file, exported and registered in `src/payload.config.ts`. Globals in `src/globals/`.
- Page-builder blocks in `src/blocks/<Name>/{config.ts,Component.tsx}`.
- UI primitives in `src/components/ui/`; composed sections in `src/components/sections/`.
- Server components by default; `"use client"` only where interaction needs it.
- Data access from the frontend uses Payload's Local API (`getPayload`) in server components; REST/GraphQL only for the client side or external consumers.
- Run `bun run lint && bun run typecheck && bun run build` before opening a PR. CI enforces the same.
- Commit messages: Conventional Commits, scope = module, and reference requirement IDs: `feat(fatwa): submission form with privacy opt-out (REQ-FAT-02)`.
- Branches: `main` (deployable), `feat/<module>-<short>`, `fix/<short>`. Squash-merge via PR.

## 4. How to handle unknowns

If a requirement is ambiguous:

1. Check `docs/04-gap-register.md`. If it is listed, build the stated default.
2. If not listed, add a row (ID, question, static/dynamic, default we build, who decides) in the same PR, and build the default.
3. Never block on the client. Ship the system with a clearly labelled placeholder that admin can edit.

## 5. Definition of done for a feature

- Requirement IDs covered are listed in the PR description
- Admin can create/edit/hide all content the feature displays
- Works in `bn` and `en`, on 360px mobile and 1440px desktop
- Empty state designed (what the page shows before admin adds data)
- Lint, typecheck, build pass; seed data updated if the feature needs demo content
- Screenshots (mobile + desktop) attached to the PR

## 6. Local environment

```bash
bun install
cp .env.example .env
docker compose -f infra/docker-compose.dev.yml up -d
bun run dev
```

Admin at `/admin`. Seed demo content with `bun run seed` once the seed script exists for the module you are working on.

## 7. Deployment

Coolify on the team VPS. `infra/docker-compose.coolify.yml` is the deployed stack (app + postgres + minio). Each merge to `main` deploys to staging; production is a manual promote. See `infra/README.md`.
