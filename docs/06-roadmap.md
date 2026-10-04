# 06 — Roadmap

Phases are scoped so each ends with something the client can click on. Durations assume a team of 3–4 (1 design-minded frontend, 1 backend/Payload, 1 full-stack, part-time QA/content).

## Phase 0 — Foundation (week 1–2, in parallel with phase 1 start)

- [x] Requirements extracted with IDs, gap register, data model, design direction (this repo)
- [x] Repo scaffold: Next.js + Payload 3 + Postgres + S3 storage, Docker, CI (Coolify staging pending)
- [x] Design tokens + type specimen page built (`/design`); client approval pending
- [ ] Client decisions requested: GAP-B1 gateway, GAP-B3 domain, GAP-B4 brand/logo

## Phase 1 — Launchable institutional site (weeks 2–7)

Modules: site-settings & navigation, home, about pages, courses (7) with curriculum, faculty directory, SDP, downloads, admission process, scholarships, FAQ, notices board, blog (without comments), gallery, dawah materials, contact, other websites, i18n BN/EN, SEO, search (basic), admin roles, seed data from client docs.
Admissions: intakes, application form, applicant account, status tracking, admin review, CSV export.
Donations: funds, one-time donation via gateway adapter (sandbox until credentials), receipt PDF + email, anonymous flag, zakat calculator, donations ledger.
Exit: client reviews live staging; content gaps filled by staff via admin.

Progress after batch A (PRs #5–#9):

- [x] site-settings & navigation, home, about pages (vision, leadership, campus, alumni), courses (7) with curriculum, faculty directory, SDP, downloads incl. dawah materials, admission process, scholarships, FAQ, notices board, contact, other websites, i18n BN/EN, SEO, seed data from client docs
- [ ] blog (without comments), gallery
- [ ] admin roles
- [ ] Admissions: intakes, application form, applicant account, status tracking, admin review, CSV export
- [ ] Donations: funds, gateway adapter, receipt PDF + email, anonymous flag, zakat calculator, donations ledger

## Phase 2 — Knowledge platform (weeks 8–12)

Fatwa workflow + public bank + PDF; clarifications topic hub + counter-questions; library & journals with pdf.js reader, metadata, abstract view, citation generator; books; research projects, calls for papers with submission; videos & playlists (YouTube), audio-only; news & events with countdown; Facebook import; blog comments with moderation; global search (Postgres FTS or Meilisearch if volume demands).

## Phase 3 — Donor transparency (weeks 13–17)

Donor accounts (OTP), donor portal, sponsorship profiles and sponsor-a-student flow (A: list, B: manual ID), campaigns with live goal bars, recurring pledges (token or reminder), international gateway when available, sponsor progress updates (manual entry → templated email), thank-you messages, finance dashboards.

## Phase 4 — Portals (after client confirms GAP-B5)

Student portal (profile, records, notices), alumni registration and directory, staff landing; records feed sponsor reports automatically.

## Always-on

Performance budget, accessibility checks, backups (Postgres + S3 bucket), uptime monitoring, security updates.
