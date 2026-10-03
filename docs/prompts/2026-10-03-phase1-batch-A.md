# Work order — Phase 1, batch A: People, Courses, Notices, Home, Static pages

You are a senior full-stack engineer with a design lead's eye, joining a project that already has its foundation built and reviewed. You are working alone for a long session (several hours). Nobody will answer questions mid-way, so this document gives you everything: what the institute is, what has been decided, what to build in which order, how it must look, how to verify, and how to hand it over. Read it fully before touching anything. Then read the repository documents it points to; they are the contract.

---

## 0. The project in three paragraphs

**As-Sunnah Dawah & Research Institute (ASDRI)** is the educational institution of As-Sunnah Foundation, Bangladesh's largest Islamic charity. It trains young ulama and university graduates to answer modern intellectual challenges (scientism, secularism, atheism, feminism, orientalism) from classical Islamic knowledge. It runs a 3-year flagship programme (PYS), a 6-month certificate (CCIS), a 2-year diploma, and short trainings (Arabic teacher training, Ramadan dawah training, Azan training, research methodology). Students who qualify study, live and eat for free, funded by the Foundation's Zakat Fund.

We are building its website: a Bangla-first (English second) public site on **Next.js 16 + Payload CMS 3 + PostgreSQL**, where **every piece of content is editable by staff in the admin** and every module can be switched on or off. The client cares most about one thing: **it must look like a real institution's site, not a template and not an AI-generated page.** Typography, hierarchy and reading comfort in Bangla are the quality bar. The Foundation's own site (assunnahfoundation.org) is the family we belong to and the benchmark we must exceed in typography and readability.

Two batches of work are already merged: the design system (tokens, typefaces, base components, `/design` specimen) and the site shell (settings, navigation, bilingual routing, header, footer, seed). Your job is the next five modules, in order, each as its own pull request. A supervisor reviews every PR against this document and the design docs; a PR that looks generic, hard-codes content, or skips the checks will be sent back.

---

## 1. Repository and access

- Repository: `https://github.com/sharif418/asdri-web` (public). Clone with the token below for push access:

```bash
git clone https://<GITHUB_TOKEN>@github.com/sharif418/asdri-web.git
cd asdri-web
git config user.name "ASDRI Agent"
git config user.email "automation@assunnahfoundation.org"
```

- **Always start from the latest `main`.** Before each module: `git checkout main && git pull`. Then `git checkout -b feat/<module>`.
- **Never commit to `main`. Never merge your own PRs.** Open a PR per module, push often (at least after every meaningful step, and always before you stop), and move on to the next module on a fresh branch from `main` while the previous PR waits for review. If a later module needs code from an unmerged earlier PR, branch from that PR's branch and say so in the PR description.
- Do not change anything under `.github/`, `infra/`, `Dockerfile`, `docs/adr/`, `docs/00`–`docs/09`, `src/payload.config.ts` plugins/adapters, `src/styles/fonts.ts`, the token set in `globals.css`, `src/proxy.ts`, or `src/i18n/config.ts` unless this document tells you to. If you believe a change there is unavoidable, do the smallest possible change and explain it at the top of the PR.

## 2. Read these first, in this order (they are short)

1. `AGENTS.md` — the engineering contract.
2. `docs/00-vision-and-products.md`, `docs/01-requirements.md` (requirement IDs you will cite), `docs/02-information-architecture.md` (routes), `docs/03-data-model.md` (collections), `docs/04-gap-register.md` (unknowns and the default to build), `docs/05-design-direction.md` (**§3a and §3b especially**), `docs/08-design-plan.md`, `docs/09-foundation-site-benchmark.md`.
3. `docs/source/02-website-content-and-features-bn.extracted.txt` and `docs/source/01-navbar-and-home-contents.extracted.txt` — the client's own words. **All Bangla copy is copied from here, character for character.** Never retype, "improve", or translate Bangla content from memory. English copy comes from the English document where it exists; where it does not, write plain, factual English and mark it in the PR as "EN draft, needs client review".
4. Look at the running site before building: `/design` (the specimen), `/` and `/en` (shell + interim home). Everything you build must look like it belongs on the same site as those pages.

## 3. Environment

```bash
bun install
cp .env.example .env
docker compose -f infra/docker-compose.dev.yml up -d postgres   # Postgres 16 on :5432
bun run migrate && bun run seed                                 # schema + starter content (bn + en)
bun run dev                                                     # http://localhost:3000, admin at /admin
```

- If Docker is unavailable in your environment, run any PostgreSQL 16 and set `DATABASE_URL` in `.env`. Do **not** switch the database adapter or add SQLite.
- S3 is optional locally: leave `S3_BUCKET` empty and uploads go to disk.
- Create the first admin user at `/admin` with a throwaway email/password; never commit credentials.
- Fonts download at build time via `next/font`; you need network access for `bun run build`.

## 4. Non-negotiable rules (the supervisor checks each of these)

**Content and i18n**
- Everything a staff member might change lives in Payload: collections or globals. Hard-coded institute content in components is a defect.
- Every interface string goes through `getDictionary(locale)` (`src/i18n/dictionaries/bn.ts` and `en.ts`; add keys to both). Every Payload text field a visitor sees is `localized: true`.
- Pass `locale` to every Payload query. Build internal links with `localizedHref(locale, path)`.
- Bengali digits for quantities, dates, credits and amounts in `bn` (`formatNumber`, `formatDate`, `formatCounter` in `src/utilities/formatNumber.ts`). Latin digits for codes (`PYS 1101`), phone numbers and IDs, always.
- Arabic text (course Arabic titles) gets `lang="ar"` on its element.

**Design (docs/05, docs/08)**
- Use only the existing tokens and type classes (`text-display`, `text-h1`…`text-caption`, `text-reading`, `.reading`, `.rule`, `.illumination`, `bg-paper-2`, `text-ink-muted`, `bg-primary`, `bg-accent`…). Do not invent colours, shadows or font sizes. Do not add CSS files per component; Tailwind classes only, plus `globals.css` for genuinely global utilities.
- Reading pages use the **matn/hashiya** layout (`MatnHashiya`, `MarginFacts`, `MarginFact` in `src/components/layout/MatnHashiya.tsx`): main column ≤ 68ch, margin column with the structural facts (code, duration, credits, dates, author). On mobile the margin folds above the text.
- Lists are **ruled rows** (hairlines), not card stacks. Cards only for true sets of equal items (the six programmes on home, gallery albums), with a 1px border and **no shadow**.
- **One gold element per screen at most** (`bg-accent` / `.illumination` / `Badge variant="new"`). If a page already has a gold hairline, nothing else on it is gold.
- Forbidden tells (docs/05 §3a): ALL-CAPS tracked labels, middle-dot meta strings (`A · B · C`), `WORD — fragment` labels, arrows appended to links/buttons, one coloured word in a headline, identical rounded cards everywhere, numbered markers on content that is not a sequence, fade-in-on-scroll on every section, hover-lift on every card, decorative icons next to every heading.
- Headings in serif (`font-serif`, already the default for h1–h4), interface in sans. Left-aligned everything; only a hero headline may be centred.
- Every list has a **designed empty state** (`EmptyState`) that says what will appear and, for staff, how to add it.
- Motion only in response to the user's action; respect `prefers-reduced-motion` (already global).

**Engineering**
- TypeScript strict; no `any`. Server components by default; `'use client'` only where interaction needs it, and keep those files small.
- One Payload collection per file in `src/collections/<Name>.ts`; register in `src/payload.config.ts`. Access control on every collection: public `read` for published content, `authenticated` for writes (see `src/access/`).
- Route files under `src/app/(frontend)/[locale]/...` stay thin: fetch, then render components from `src/components/<module>/`. **No file over ~300 lines.** Split by responsibility (config / query / view / client interaction).
- After changing collections: `bun run generate:types`, then a migration (`bun run payload migrate:create <name>`). If one change both drops and creates tables or enums, split it into two migrations (remove first, then add) so the generator does not prompt. Commit the migration files. If `bun run migrate` on your dev database asks an interactive question, delete the `dev` marker row first (see `infra/README.md`).
- Seed: extend `src/endpoints/seed/` with one file per module (e.g. `people.ts`, `courses.ts`, `notices.ts`) and call it from `seed/index.ts`. Seeds are idempotent (find by slug → update or create). Content verbatim from `docs/source`.
- Before every push: `bun run lint && bun run typecheck && bun run build` all pass with **zero new warnings**. CI runs the same.
- Commits: Conventional Commits with requirement IDs, e.g. `feat(courses): course detail with curriculum tables (REQ-ACA-02, REQ-ACA-03)`.
- Do not add dependencies except where this document allows it (`@payloadcms/plugin-seo` is already there; Radix primitives are fine if a new primitive is genuinely needed; no UI kits, no icon packs beyond `lucide-react`, no animation libraries, no date libraries: use `Intl`).

**Unknowns**
- Never stop to ask. Check `docs/04-gap-register.md`; build the stated default. If something is not listed, add a row (ID, question, kind, default you built, who decides) in the same PR and build the default.

## 5. Verification and handover for every module (Definition of Done)

1. `bun run lint && bun run typecheck && bun run build` pass.
2. Seed loads your module's content; the pages render in `bn` and `en`.
3. You looked at every new page at **375px** and **1280px** and fixed what looked wrong. Use Playwright (already a dev dependency; run `bunx playwright install chromium` once) to capture screenshots of each new page at both widths in both locales into `docs/review/<module>/` and commit them. Name them `<route>-<locale>-<width>.png`. The reviewer judges the PR from these.
4. Admin: open `/admin`, create one item of each new collection by hand, publish it, see it on the site. Note any field whose purpose is unclear from its label and fix the label or add `admin.description`.
5. Accessibility: headings in order (one h1 per page), landmarks (`main`, `nav` with `aria-label`), every image has `alt`, every interactive element is reachable by keyboard with visible focus, colour contrast relies only on the existing tokens.
6. Performance: images through `next/image` with sizes; no client component imported where a server component would do; no layout shift from late-loading content.
7. PR description (use the template): requirement IDs covered, what the admin can edit, decisions you took, gap-register rows added, "EN draft" notices, and the screenshot folder path. Then push and start the next module.

Before you consider a page done, look at it as the client will: *"Does this look like a serious institution made it, and is it more comfortable to read than assunnahfoundation.org?"* If the honest answer is no, fix the page before pushing. Generic is a bug.

---

## 6. The modules, in order

### Module A — People: leadership and faculty (REQ-ABT-02, REQ-ACA-10, REQ-HOME-09 data)

**Collection `people`** (docs/03): `name` (L), `slug`, `photo` (upload, optional), `roles` (multi-select: leadership, faculty, staff, author), `designation` (L), `team` (select: core, arabic, tajweed, tarbiyah, language, computer, math, science), `subjects` (array of text, L), `bio` (richText, L, optional), `email`/`phone` (private: `access.read` only for authenticated), `social` (array), `featuredOnHome` (checkbox), `order` (number), drafts enabled.

**Seed** every person in `docs/source/02-…extracted.txt` under "Faculty, Researchers & Leadership" and "TEACHER'S PANLE": the five leadership entries with their designations; every teacher with their subjects exactly as listed (keep Latin course names in Latin); the Arabic team (co-ordinator + three teachers), the Tajweed team (chief + two), the Tarbiyah teacher; the language/computer/math/science lines as team entries (names only; "(টিম)" entries become a team note, not a person). Shaykh Ahmadullah is both leadership (Chairman) and faculty (দাঈর ব্যক্তিত্ব ও গুণাবলি). English names: transliterate carefully and mark "EN draft".

**Pages**
- `/about/leadership`: a quiet page. h1 "নেতৃত্ব ও প্রশাসন". Leadership as ruled rows: photo or initials monogram (serif initials on `bg-paper-2`, 64px), name in serif `text-h4`, designation in sans `text-small text-ink-muted`. No cards.
- `/academics/faculty`: h1, one line of intro (dictionary), then **groups by team** with a serif group heading and a hairline above each group: উস্তাযগণ (core), আরবি টিম, তাজবিদ টিম, তারবিয়াহ, ভাষা ও কম্পিউটার. Each person a ruled row: monogram/photo, name, designation, subjects as plain sans text separated by commas (not chips). Mobile: same rows, stacked.
- `/academics/faculty/[slug]`: matn/hashiya. Margin: designation, team, subjects, (later: publications). Main: photo (if any, `next/image`, max 320px, 4:5), name as h1, bio reading text. Empty bio → the page still works with name, designation and subjects only.
- Home: expose a `getFeaturedPeople(locale)` helper in `src/components/people/queries.ts` for Module D.

### Module B — Courses (REQ-ACA-01…09, REQ-HOME-04 data, GAP-C2, GAP-C3, GAP-C4)

**Collection `courses`** exactly per docs/03: title (L), slug, arabicTitle, code (short, e.g. PYS, CCIS, PGD-DIS), type (long/short), summary (L), intro (L rich), objectives[] (L), format group {durationLabel (L), residential (residential/nonResidential/both), gender}, eligibility[] (L), specialisations[] (L), curriculum: semesters[] {title (L), totalCredits, totalMarks, durationLabel (L), rows[] {sl, code, title, modules[] (text), credits, hours, marks}}, supplementary table (same row shape), sdp table {title, objective, activities, hours, outcome}, topics[] (L) for list-style curricula (Ramadan training's 25 topics, Azan's items, Arabic teacher training's items), outcomes (L rich), downloads (rel media), heroImage, featured, order, status (draft/published). Compute semester totals from rows in the UI; show the admin a note when a stored heading total disagrees (GAP-C2).

**Seed all seven courses** from the source text: PYS (two core semesters, supplementary non-credit table, SDP table, five specialisations with Arabic names), CCIS, Diploma (four semesters + "পরবর্তী শিক্ষাক্রম" outcomes), Arabic Language Teacher Training, Ramadan Dawah Training (25 topics), Azan Training, Islamic Research Methodology (status `draft`, intro placeholder "তথ্য শীঘ্রই যুক্ত হবে", GAP-C4). Use `CCIS` codes and `PGD-DIS 1101…` style consistently (GAP-C3) and record that choice in the PR.

**Pages**
- `/academics/courses`: h1 "কোর্সসমূহ". Two groups with serif headings: দীর্ঘমেয়াদী প্রোগ্রাম (PYS, CCIS, Diploma) and স্বল্পমেয়াদী প্রশিক্ষণ (the rest). Each course a **ruled row**, not a card: left column (sans, small) code and duration; main: serif title `text-h3`, Arabic title beneath in Naskh where present, one-line summary; right: residential/gender facts in `text-caption`. Draft courses are hidden unless the viewer is logged in.
- `/academics/courses/[slug]`: **this is the hero product of the site.** Matn/hashiya: margin facts = code, duration, residential, gender, intake status (link to the matching notice when Module C exists, else omit), downloads. Main: h1 title, Arabic title `text-h4 font-normal text-ink-muted` with `lang="ar"`, intro as `.reading`, objectives as a ruled list (not numbered), eligibility as a ruled list, specialisations (PYS) as a two-column list with Arabic names, then **curriculum**: each semester a section with a serif heading and the computed totals in the margin position; desktop = the ruled "kitab" table from `/design` (code | course | modules | credits | marks; `th scope="col"`; totals row with a top rule); mobile = stacked rows with the code in a narrow left column. Supplementary and SDP tables follow the same pattern. Topic-list curricula (Ramadan, Azan, Arabic teacher) render as a ruled list in two columns on desktop. Outcomes as `.reading`. End with a single primary action: "আবেদন করুন" linking to `/admissions` (the form arrives in a later batch) and a secondary "সব কোর্স".
- Course table component lives in `src/components/courses/CurriculumTable.tsx` and is reused by `/design` (replace the hand-written specimen table with the component so there is one source of truth).

### Module C — Notices (REQ-NOT-01…06, REQ-HOME-06 data, REQ-ADM-03)

**Collection `notices`**: title (L), slug, category (select: admission, recruitment, academic, general), body (L rich), publishedAt, activeFrom, activeUntil, statusOverride (select: auto/new/active/closed), attachments[] (rel media, PDFs allowed), applyHref (text, optional), pinned (checkbox), drafts. Status is computed: `closed` if activeUntil < now; `active` if activeFrom ≤ now ≤ activeUntil (or activeFrom set and no end); `new` if published within the last 14 days and not active/closed; otherwise neutral; `statusOverride` wins. Put this in `src/components/notices/status.ts` with unit-test-style clarity (pure function).

**Seed** six realistic notices derived from the source (CCIS admission open, Azan training applications, PYS exam routine, Arabic teacher training closed, a general announcement, a recruitment placeholder marked "নমুনা") so the board, filters and badges are visible. Mark seeded samples clearly in the admin via a `sample: true` checkbox that the public UI ignores but the admin list shows.

**Pages**
- `/notices`: h1 "নোটিশ বোর্ড". Filter row as plain sans links (সব · ভর্তি · নিয়োগ · একাডেমিক · সাধারণ) driven by `?category=`; the active one underlined with the 2px rule used in the header nav. Search box (`?q=`) using Payload `like` on title. List = ruled rows: date (`formatDate`), serif title, category badge, status badge (`Badge` variants new/active/closed; gold `new` is the only gold on the page). Pinned notices first. Pagination 20 per page. **Archive**: a quiet right-hand (desktop) / bottom (mobile) list of months with counts (`?month=2026-09`). Empty state when no match.
- `/notices/[slug]`: matn/hashiya. Margin: category, published date, active window, status badge, attachments (file name, size, PDF icon from lucide, download link), "অনলাইনে আবেদন করুন" primary button when `applyHref` is set. Main: h1, body `.reading`. Below: "অন্যান্য নোটিশ" three ruled rows from the same category.
- Expose `getLatestNotices(locale, {category, limit})` in `src/components/notices/queries.ts` for home.

### Module D — Home page blocks (REQ-HOME-01…12)

Replace the interim `HomePlaceholder` with an editable **`home` global** holding an ordered `sections` blocks field, each block with `enabled`. Build these blocks (config in `src/blocks/home/<Name>/config.ts`, view in `Component.tsx`):

1. **Hero** — headline (L, default = institute name from settings), lede (L), primary/secondary actions (label + href), optional intro video URL (YouTube; render a poster with a play button that opens an inline player on click, no autoplay) or image. Design per docs/08: headline is the hero, one gold hairline, two actions, nothing else. If a video is set, it sits in a 12-column grid: text 7 columns, media 5, aligned to the baseline grid; on mobile media below text.
2. **Impact** — reads `impact-stats`; ruled row with full labels (exists in placeholder; move it into a block).
3. **Vision** — statement (L) + three pillars (L, array). Pillars as a ruled three-column list, not cards, not numbered.
4. **Programmes** — picks up to six `courses` (relationship, defaults to `featured`). This is the one place cards are allowed: six equal items, 1px border, no shadow, serif title, code + duration line, "বিস্তারিত" link. 3×2 on desktop, 1 column on mobile.
5. **Notices** — latest 5 via `getLatestNotices`, plain tabs (সব/ভর্তি/একাডেমিক/নিয়োগ) rendered as links to `/notices?category=`; ruled rows; "নোটিশ বোর্ড" link.
6. **Campus** — four items (L: title, text, optional image) as a ruled two-column list; images `next/image` 3:2 if present, otherwise text only. No placeholder stock photos.
7. **People** — featured people (from Module A), five across on desktop as monogram/photo + name + designation, two across on mobile.
8. **Support** — fund cards are a later batch; for now: heading (L), one paragraph (L), one primary action to `/donate` (hidden when the `donations` flag is off). Keep it a single ruled band in `bg-paper-2`.
9. **Refutations highlight**, **Media hub** and **Fatwa gateway** blocks: create the block configs with `enabled: false` default and a designed "module not enabled" admin description; render nothing on the site until their modules exist. Do not fake content.

Seed the `home` global with Hero (settings name + the source tagline), Impact, Vision (the three pillars from the English document, Bangla from the source's লক্ষ্য ও উদ্দেশ্য where it maps; else "EN draft"), Programmes (six featured courses), Notices, Campus (four items from the source "Campus Life" text), People (featured), Support (text from the source scholarship paragraph). Section order as in docs/02. The route `src/app/(frontend)/[locale]/page.tsx` renders the global; keep the Pages-collection "home" override only if it already exists in the file, otherwise remove it and say so.

### Module E — Static pages, FAQ, downloads (REQ-ABT-01, 03, 04; REQ-ADM-01, 02, 04; REQ-ACA-11, 12; REQ-CON-01, 02)

- **About (`/about`)**: h1 "লক্ষ্য ও উদ্দেশ্য", the vision paragraph as `.reading`, the **13 objectives as a ruled list** (not numbered: they are not a sequence). Content from the source "আমাদের সম্পর্কে". Store it as a Pages-collection document with slug `about` using the existing page builder blocks (Content block) — but if the builder cannot express a ruled list cleanly, add a small `RuledList` block (items[] rich text) to `src/blocks/` and use it.
- **Campus (`/about/campus`)**: the six "Campus Life" items and the four facility items from "Scholarship, Financial Aid & Facilities" as ruled two-column lists with optional images.
- **Alumni (`/about/alumni`)**: intro paragraph; **collection `alumni-batches`** (programme rel courses, batch number, year, graduates count, note) seeded with PGDID 1 (20), PGDID 2 (29), CCIS 1 (29), Teachers Training 1 (26); rendered as a ruled table; admin description noting GAP-C1.
- **Admission process (`/admissions`)**: the five steps **are a sequence**, so numbered (Bengali numerals via `formatNumber`), each step a serif heading and `.reading` paragraph, verbatim from the source. End with the primary action "ভর্তি বিজ্ঞপ্তি দেখুন" to `/notices?category=admission`.
- **Scholarships (`/admissions/scholarships`)**: the scholarship paragraph as `.reading` with a margin fact list (coverage: আবাসন, খাবার, টিউশন; source: যাকাত ফান্ড; eligibility note).
- **FAQ (`/faq`)**: **collection `faqs`** (question L, answer L rich, category rel `categories` kind faq, order) + category tabs (plain links) + Radix Accordion rows ruled, one open at a time, deep-linkable (`#faq-<id>`). Seed eight plausible questions marked `sample: true` (admissions, courses, donations) so the client sees the pattern; answers short and factual, drawn from the source where possible.
- **Downloads (`/downloads`)**: **collection `downloads`** (title L, file rel media, category select: syllabus/form/dawah-material/prospectus/other, description L, course rel optional, printable checkbox). Filter row by category (`?category=`); ruled rows with file type, size, and a download link; empty state. Dawah materials route `/downloads?category=dawah-materials` works via the same page.
- **Student Development (`/academics/student-development`)**: the SDP table from the PYS seed rendered with the shared curriculum table component.
- **Contact (`/contact`)**: from `site-settings`: addresses (each with a map link), phone with hours, email, the admission note and the Facebook QR image when present; a contact form is a later batch, so no form yet. **Other websites (`/contact/other-websites`)**: ruled list of `otherWebsites`.
- Add all new routes to the sitemap generation (`src/app/(frontend)/(sitemaps)/`), respecting feature flags.

### After Module E

Update `docs/07-kickoff-prompt.md` (tick the rows you completed) and `docs/06-roadmap.md` (Phase 1 checkboxes). Push. Stop when all five PRs are open; do not start admissions or donations.

---

## 7. How the supervisor will review

Each PR is checked against: the rules in §4, the DoD in §5, the screenshots in `docs/review/<module>/`, and this question per page: would a reader take this for the institute's real site? Common reasons a PR comes back: content typed from memory instead of copied from `docs/source`; a string not in the dictionary; a card where a ruled row belongs; a second gold element; a 600-line file; a missing empty state; a missing migration or seed; Latin digits in a Bangla quantity; a dropdown or accordion that does not work with the keyboard.

Work carefully, verify visually, push early and often, and leave each PR in a state another engineer could merge without talking to you.
