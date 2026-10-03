# ASDRI Web — As-Sunnah Dawah & Research Institute

Official web platform of **As-Sunnah Dawah & Research Institute** (আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট), an educational institution of As-Sunnah Foundation, Satarkul, Badda, Dhaka.

One codebase, five visible products:

| # | Product | Audience | Phase |
|---|---------|----------|-------|
| 1 | Public website (BN / EN) | Prospective students, donors, readers | 1 |
| 2 | Admin dashboard (Payload CMS) | Institute staff, editors, fatwa board, finance | 1 |
| 3 | Admissions portal (apply + track) | Applicants | 1 |
| 4 | Donor portal (history, receipts, sponsored student) | Donors, diaspora | 3 |
| 5 | Student / Alumni portal | Students, alumni | 4 |

Everything the client has not yet decided is built as a **feature-flagged module** with placeholder content the admin can fill or hide. See [docs/04-gap-register.md](docs/04-gap-register.md).

## Stack (see [ADR-0001](docs/adr/0001-stack.md))

- **Next.js 15** (App Router, RSC, SSR for SEO) + **Payload CMS 3** running inside the same Next app
- **PostgreSQL 16** (Payload DB adapter), **S3-compatible object storage** (RustFS self-hosted, swappable) for media & PDFs
- **Tailwind CSS v4** + a bespoke design system (see [docs/05-design-direction.md](docs/05-design-direction.md)); no stock template look
- **Docker** + **Coolify** on the team VPS ([infra/](infra/))
- Package manager: **bun**

## Quick start

```bash
bun install
cp .env.example .env            # fill DATABASE_URL, PAYLOAD_SECRET, S3 vars
docker compose -f infra/docker-compose.dev.yml up -d   # postgres + s3 (RustFS) locally
bun run s3:init                 # create the media bucket
bun run dev                     # http://localhost:3000  (admin: /admin)
```

First visit to `/admin` creates the first admin user.

## Repository map

```
.
├── docs/                 requirements, IA, data model, gap register, design direction, roadmap, ADRs
│   └── source/           the client's original requirement documents (docx/pdf + extracted text)
├── infra/                docker compose (dev + coolify), Dockerfile notes
├── src/
│   ├── app/              Next.js routes: (frontend) public site, (payload) admin + API
│   ├── collections/      Payload collections (content model)
│   ├── blocks/           page-builder blocks
│   ├── components/       UI components (design system lives in components/ui + styles)
│   └── ...
├── AGENTS.md             operating manual for developers and AI agents working in this repo
└── .github/              CI, issue / PR templates
```

## Working in this repo

Read [AGENTS.md](AGENTS.md) first. Requirements have stable IDs (e.g. `REQ-DON-07`) in [docs/01-requirements.md](docs/01-requirements.md); reference them in commits, PRs and issues.

Language policy: engineering docs and code in English; site content is Bangla-first with English as the second locale. Never paraphrase the client's Bangla content from memory — copy it from `docs/source/*.extracted.txt`.
