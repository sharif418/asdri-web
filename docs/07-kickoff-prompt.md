# 07 — Kickoff prompt for developers and coding agents

Paste this (edit the task line) when assigning work to a teammate or an AI agent working in this repository.

---

You are working in the `asdri-web` repository: the web platform of As-Sunnah Dawah & Research Institute (Next.js 15 + Payload CMS 3 + PostgreSQL, bun, Docker/Coolify).

Before writing any code:

1. Read `AGENTS.md` completely and follow it as a contract.
2. Read `docs/00-vision-and-products.md`, `docs/01-requirements.md`, `docs/02-information-architecture.md`, `docs/03-data-model.md`, `docs/04-gap-register.md`, `docs/05-design-direction.md`, `docs/06-roadmap.md` and every file in `docs/adr/`.
3. Treat `docs/source/*.extracted.txt` as the only source of Bangla copy. Never invent or paraphrase client content.

Your task: **<MODULE / REQUIREMENT IDs, e.g. "Notices module — REQ-NOT-01..06, REQ-HOME-06">**

Rules for this task:

- Build exactly the requirement IDs listed; propose, don't silently add, anything else.
- Everything displayed must be editable in Payload admin and bilingual (bn default, en).
- Put the module behind its feature flag in `site-settings`; design the empty state.
- Follow `docs/05-design-direction.md`. A generic-looking UI is a failing result.
- If you hit an unknown, follow `docs/04-gap-register.md` (build the default, add a row if missing). Do not stop to ask the client.
- Run `bun run lint && bun run typecheck && bun run build` before finishing. Do not introduce new lint warnings.
- Work on a branch `feat/<module>-<short>`; open a PR using the template; include mobile + desktop screenshots and the requirement IDs covered.
- Commit messages: Conventional Commits with requirement IDs, e.g. `feat(notices): status badge computed from dates (REQ-NOT-03)`.

Deliver: the PR link, a short summary of what was built, and any gap-register rows you added.

---

## Suggested first assignments (phase 1)

| Order | Assignment | IDs |
|-------|------------|-----|
| 1 | ✅ Design tokens + type specimen page `/design`; fonts; colour tokens; base components (PR #1) | 05-design-direction §2–4 |
| 2 | ✅ `site-settings`, `navigation`, `impact-stats` globals + Header/Footer + locale routing and switcher + seed (PR #2) | REQ-GEN-01..04, REQ-HOME-02, 12 |
| 3 | `people` collection + Leadership page + Faculty directory + profile | REQ-ABT-02, REQ-ACA-10 |
| 4 | `courses` collection with curriculum tables + seed of 7 courses from source | REQ-ACA-01..09 |
| 5 | `notices` + board + status badge + attachments | REQ-NOT-01..06, REQ-HOME-06 |
| 6 | Home page blocks (hero, vision, programmes, campus, leadership, support bar) | REQ-HOME-01..10 |
| 7 | `faqs`, `downloads`, static About/Admissions pages seeded from source | REQ-ADM-01..04, REQ-ACA-11..12, REQ-ABT-01, 03, 04 |
| 8 | Admissions: `intakes`, `applications`, apply form, applicant account | REQ-ADM-05..06, REQ-AUTH-01..03 |
| 9 | Donations: `funds`, gateway abstraction (SSLCommerz sandbox), receipt PDF, zakat calculator | REQ-DON-01..05, 13, ADR-0003 |
| 10 | Blog + gallery + contact | REQ-MED-01, 02, 05, REQ-CON-01..03 |
