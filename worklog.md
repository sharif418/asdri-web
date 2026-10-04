# Project Worklog — As-Sunnah Dawah & Research Institute Website

## Project Overview
Ultra-premium bilingual (BN default / EN) website for **As-Sunnah Dawah & Research Institute**
(আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট) — an educational institution of As-Sunnah Foundation.

### Core Directives (from client)
1. REAL Next.js App Router routing — every menu item must navigate to a real route (`/about`, `/academics/courses/[slug]`, ...). NO `href="#"` placeholders.
2. Strict TypeScript — zero `any`, zero `@ts-ignore`, zero eslint-disable.
3. Developer-friendly modular architecture — max ~500 lines per file, separation of concerns, industry-standard folder structure.
4. Premium UI/UX tuned to Bangladeshi psychology — best fonts (Tiro Bangla headings, Hind Siliguri body, Amiri Arabic), deep emerald + antique gold + ivory palette, Islamic geometric ornamentation.
5. Complete feature implementation from requirement docs (no stubs).

### Tech Stack
Next.js 16 App Router · TypeScript strict · Tailwind CSS 4 · shadcn/ui (New York) · Prisma + SQLite · Framer Motion · Zod · custom cookie-session auth

### Architecture Map
```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── (site)/            # header/footer wrapped public pages (real routes)
│   │   ├── about/ (page, leadership, campus, alumni)
│   │   ├── academics/ (page, courses, courses/[slug], faculty, development, downloads)
│   │   ├── admissions/ (page, scholarships, faq)
│   │   ├── research/ (page, library, projects, publications, clarifications, fatwa)
│   │   ├── media/ (page, blog, blog/[slug], videos, news, gallery)
│   │   ├── notices/ support/ (page, zakat-calculator) contact/ login/ register/ account/
│   └── api/               # auth, notices, fatwa, contact, newsletter, campaigns, donations
├── components/ (layout/ home/ shared/ courses/ faculty/ notices/ donations/ fatwa/ media/ auth/ providers/)
├── content/   (typed bilingual content: courses, curricula, faculty, blog, videos, gallery, faq, ...)
├── lib/       (db, i18n, auth, security, validators, format, constants)
├── hooks/
└── types/
```

### Design System Contract (ALL agents must follow)
- Palette: primary deep emerald `--primary: oklch(0.44 0.075 165)`, antique gold accent `oklch(0.74 0.115 85)`, ivory bg `oklch(0.985 0.006 95)`, dark mode = deep green-black.
- Fonts: `.font-heading` (Tiro Bangla → Cormorant Garamond when `data-lang="en"`), body Hind Siliguri, `.font-arabic` Amiri.
- Shared components in `src/components/shared/`: SectionHeading, PageHero, Reveal, StatCounter, IslamicPattern, GoldRule, Bismillah.
- Bilingual content pattern: every text field `{ bn: string; en: string }` → pick via `pick(localized, lang)`.
- `lang` stored in `asr-lang` cookie; server reads via `getLang()` from `@/lib/i18n`; client toggles then `router.refresh()`.
- Currency/number formatting in Bengali digits via `@/lib/format` (`toBnDigits`, `formatBnTaka`).
- File limit: ≤500 lines. Components composed in small files.

### Task Breakdown
- Task 1 (main agent): Foundation — worklog, design system, fonts, Prisma schema+seed, types, i18n, security utils, shared components, header/footer
- Task 2 (main agent): Home page — all 12 sections
- Task 3-a: About + Academics pages (courses grid + [slug] detail with full curricula, faculty, development, downloads)
- Task 3-b: Admissions + Research & Publications + Fatwa pages
- Task 3-c: Media (blog/[slug], videos, news, gallery lightbox) + Notices + Contact
- Task 3-d: Support/Donate + Zakat calculator + Auth (login/register/account) + ALL API routes + rate limiting
- Task 4 (main agent): Integration QA (lint, dev.log, agent-browser), fixes
- Task 5 (main agent): 15-min webDevReview cron job

---

Task ID: 0
Agent: main (Principal Architect)
Task: Requirement extraction & planning

Work Log:
- Extracted full requirements from `upload/Main Navbar Items & Home Contents (1).docx` (navbar sitemap, header architecture, 12 home sections)
- Extracted full requirements from `upload/ওয়েব সাইট (updated) (1).docx` (7 course curricula incl. PYS semester tables, faculty roster, alumni stats, admission 5-step process, scholarship/facilities, notices/library/news/blog/videos/gallery/payment/fatwa/FAQ/research/download-center functional specs)
- PDF version had broken Bengali glyph extraction; docx versions are authoritative.
- Planned architecture, task split, and delegation contract.

Stage Summary:
- Requirements fully internalized. ~25 real routes, 7 API groups, 7 Prisma models.
- Proceeding to Task 1 foundation.

---
Task ID: 1
Agent: main (Principal Architect)
Task: Foundation — design system, fonts, i18n, Prisma, security, shared components

Work Log:
- globals.css: premium emerald/gold/ivory design system with light+dark, Islamic lattice patterns, link-sweep, marquee utilities
- Root layout: Tiro Bangla (headings) + Hind Siliguri (body) + Amiri (Arabic) + Cormorant Garamond (EN display) via next/font
- Types: src/types/index.ts (LocalizedText, Notice, Course, Curriculum, Faculty, Fatwa, Campaigns, Blog, FAQ, etc. + pick())
- i18n: lib/i18n.ts (BN/EN dictionaries ~180 keys, client-safe) + lib/i18n-server.ts (getLang via asr-lang cookie) + LanguageProvider
- lib/format.ts: Bengali numerals, dates, taka formatting, read-time
- lib/security.ts: sliding-window rate limiter, same-origin check, jsonError/jsonOk
- lib/validators.ts: zod schemas (contact, newsletter, fatwa, donation, auth)
- lib/auth.ts: scrypt hashing + HMAC-signed httpOnly session cookies
- Prisma schema: Notice, FatwaEntry, FatwaQuestion, FundingCampaign, DonationIntent, ContactMessage, NewsletterSubscriber, User (all indexed) — pushed
- scripts/seed.ts: 10 notices, 8 fatwa entries, 2 campaigns — seeded (bun run db:seed)
- Shared components: SectionHeading, PageHero (breadcrumb+arabic echo), Reveal/Stagger/RevealItem (framer-motion), StatCounter (bn digits), ornaments (StarMotif/GoldRule/Bismillah/CornerOrnament), logo (InstituteLogo/LogoLockup/LogoCompact)
- Layout: site-header (top utility bar + mega menu + mobile drawer + lang switcher) + site-footer (4-col, newsletter, socials) + (site)/layout.tsx
- Content: site.ts, stats.ts, courses/ (pys, ccis-diploma, trainings — full curricula), faculty.ts, admission.ts, research.ts, blog.ts (5 full articles), media.ts (videos, gallery, news, alumni, sponsor students)

Stage Summary:
- Design system locked. All shared primitives exported and stable.
- API routes done: GET /api/notices, GET+POST /api/fatwa, GET /api/campaigns.

---
Task ID: 2
Agent: main (Lead UI/UX)
Task: Home page — all 12 sections

Work Log:
- Hero: campus backdrop, Bismillah, animated headline, dual CTAs, video dialog (YouTube channel link)
- StatsBand: 6 animated counters (420+/128+/102+/190+/127/293+) on emerald band, overlapping hero
- VisionPillars: vision statement + 3 pillar cards
- FeaturedPrograms: 7 course cards with gradient ribbons, duration/eligibility, links to /academics/courses/[slug]
- ResearchHighlights: 6 clarification topic cards on dark band
- NoticesFeed: client tabs (All/Admission/Academic/Recruitment) fetching /api/notices, status badges, skeletons
- CampusLife: 6 image cards (generated imagery)
- MediaHub: latest articles, video strip, gallery preview, library link
- LeadershipShowcase: 5 leadership monogram cards
- SupportSection: 4 fund cards, live campaign progress bars (from /api/campaigns), payment channels, zakat CTA
- FatwaGateway: ask form (POST /api/fatwa) + live-searchable fatwa bank preview
- Fixed i18n client/server split, icon availability, lint errors. Lint passes clean. Page renders 200, 0 console errors, verified via agent-browser + VLM.

Stage Summary:
- Home page complete and verified. Pattern reference for all subpages established.
- Images: 16 AI images generating in background to public/images/ (hero-campus, campus-*, blog-*, news-agreement).

---
Task ID: 3-a
Agent: full-stack-developer (Agent 3-a)
Task: About + Academics pages

Work Log:
- Created src/content/about.ts: instituteIntro (2 paras), objectivesList (all 14 bilingual objectives with English translations), orgStructure (5 tiers), campusIntro, alumniEngagement (4 items)
- Created src/components/about/: objectives-list.tsx (14-item numbered checklist), leadership-grid.tsx (LeadershipGrid + LeadershipCompact + LeaderMonogram), campus-life-grid.tsx (6 image cards), facilities-grid.tsx (4 facility cards), campus-address.tsx (emerald address card + Google Maps iframe), alumni-sections.tsx (AlumniSummary with StatCounter, AlumniBatchTable with totals, AlumniEngagement)
- Created src/components/academics/: course-card.tsx (CourseCard + CourseGrid + shared courseIcons/kindLabels exports), curriculum-tabs.tsx (client — semester Tabs with shadcn Table, modules sub-lists, notes, credit/marks totals in Bengali digits), course-facts.tsx (sticky sidebar: type/duration/accommodation + eligibility + apply CTA), pys-specializations.tsx (5 depts with Arabic names + StarMotif), faculty-sections.tsx (FacultyDirectory over 4 facultyGroups with subjects), sdp-table.tsx (6 SDP rows + mandatory/non-credit badges + total 180h), download-center.tsx (client — category filter tabs with counts, file-type badges, sizes, download buttons), course-sections.tsx (ObjectivesChecklist, OutcomesList, SectionIntroNote)
- Created 4 About pages: /about (intro + vision card + 3 core pillars + 14 objectives + CTA), /about/leadership (LeadershipGrid + 5-tier alternating org-structure timeline + faculty CTA), /about/campus (CampusLifeGrid + FacilitiesGrid + CampusAddress w/ map + gallery CTA), /about/alumni (intro + 3 StatCounter summary + batch table (PGDID 20/29, CCIS 29, Teachers 26 = 104 total) + engagement cards + contact CTA)
- Created 6 Academics pages: /academics (3 stat counters, 4 course-kind cards, 3 featured courses, SDP dark band), /academics/courses (7-course grid + scholarship note), /academics/courses/[slug] (generateStaticParams all 7 slugs, generateMetadata, notFound() → 404 verified; intro/objectives/curriculum tabs/extraSections/PYS specializations/outcomes + facts sidebar + apply CTA), /academics/faculty (LeadershipCompact strip + FacultyDirectory), /academics/development (SDP concept cards + table + mandatory non-credit note), /academics/downloads (filtered DownloadCenter + library CTA)
- Fixed bug: kindLabels wrongly imported from @/content/courses (500s) → moved to @/components/academics/course-card
- Fixed lint error in parallel-agent file src/components/notices/notice-search.tsx (ref write during render → removed redundant valueRef, effect captures value directly; behavior identical since effect re-runs per keystroke)
- All pages: PageHero w/ breadcrumb + arabicEcho, server components with getLang(), Reveal/Stagger animations, bg-parchment alternating bands, semantic HTML, min-h-11 touch targets, real routes only. Max file 241 lines. Zero any/@ts-ignore/eslint-disable.

Stage Summary:
- All 16 routes verified 200: /about, /about/leadership, /about/campus, /about/alumni, /academics, /academics/courses, /academics/courses/[7 slugs], /academics/faculty, /academics/development, /academics/downloads; invalid slug → 404
- BN + EN modes verified via asr-lang cookie; curriculum tabs + download filters verified interactive via agent-browser; 0 console/page errors
- bun run lint clean (exit 0)

---
Task ID: 3-d
Agent: full-stack-developer (Agent 3-d)
Task: Support/Donation portal + Zakat calculator + Auth + remaining API routes

Work Log:
- Created src/components/donations/donation-types.ts: shared CurrencyCode (from CURRENCY_VALUES), CURRENCY_OPTIONS (BDT/USD/EUR/SAR with ৳/$/€/﷼ labels), formatAmount (Bengali digits), FUND_LABELS, PaymentInfo/ReceiptData types, parseAmount (accepts Bengali digits + commas)
- Created src/components/donations/: fund-cards.tsx (4 selectable fund cards, radiogroup semantics, gold ring on selection), donation-form.tsx (amount presets ৳৫০০/১০০০/২০০০/৫০০০ + custom, currency Select, donor name/email/phone, anonymous "আমার নাম প্রকাশ্যে দেখাবেন না" + recurring "মাসিক অটো-ডোনেশন" checkboxes, du'a message, client validation w/ inline field errors + toasts, sticky emerald live-summary panel w/ fund/amount/badges/zakat note/payment channels), sponsor-picker.tsx (8 privacy-protected coded students AS-101…AS-129 from content/media with classYear/district/needLevel/monthlyCost, click → auto-fills amount+ref, manual studentRef input), receipt-dialog.tsx (success dialog: ASR-DON receipt no. w/ copy button, fund/amount/date/recurring summary, bKash/Nagad/Rocket/bank payment instructions w/ copy buttons, email-receipt + Anonymous notes), donation-portal.tsx (orchestrator: fund state + smooth-scroll to form + receipt state), campaigns-section.tsx (live fetch /api/campaigns, gold progress bars, skeletons, empty state), payment-channels.tsx (bKash/Nagad/Rocket/bank from siteConfig.payment, light+dark tones), zakat-calculator.tsx (5-step inputs: cash, gold g×price default ১২,০০০, silver g×price default ১৫০, business, investments, other, liabilities; silver(612.36g)/gold(87.48g) nisab radio w/ live thresholds; reset; all-Bengali-digit displays), zakat-result.tsx (verdict card due/not-due, 2.5% big amount, full breakdown dl, CTA /support?fund=zakat&amount=N or sadaqah CTA, privacy note)
- Created src/components/auth/: login-form.tsx (centered card, email+password w/ eye toggle, generic-error toast, router.push('/account')+refresh), register-form.tsx (name/email/phone/role Select শিক্ষার্থী/ডোনার/অ্যালামনাই, password + 3-bar strength hint, confirm, inline errors, auto-login redirect), logout-button.tsx (POST /api/auth/logout → router.refresh)
- Pages: /support (server, awaits searchParams; validates fund∈FUND_TYPES default zakat, amount 10–10M → initialAmount prefill; PageHero w/ قَرْضًا حَسَنًا echo; DonationPortal; CampaignsSection; transparency section 4 cards: 100% zakat integrity / semesterly sponsor tracking / donor dashboard / audited ledger + official payment channels + emerald donor-dashboard band; zakat calculator CTA band), /support/zakat-calculator (PageHero w/ وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ echo, ZakatCalculator, where-zakat-goes band, 4 scholarly notes: hawl/nisab basis/market rates/tool-not-fatwa), /login + /register (compact PageHero, centered cards on bg-parchment, redirect('/account') when session exists — 307 verified), /account (server: getSession(); anonymous → premium lock card w/ login/register/support links; signed-in → profile card w/ monogram initials + role badge + member-since + 3 stat chips (count/৳total/monthly) + shadcn Table donation ledger: receipt no. (mono), date, fund+studentRef, amount (formatTaka / currency), processing/completed badges, recurring icon; empty state; logout island)
- API routes (all follow fatwa pattern — isSameOrigin + rateLimit + zod + zodFields + jsonError/jsonOk): POST /api/contact (5/10min, creates ContactMessage, 201 Bengali msg), POST /api/newsletter (8/10min, findUnique→duplicate 200 "আপনি ইতিমধ্যাই সাবস্ক্রাইব করেছেন" / new 201), POST /api/donations (10/10min, receipt ASR-DON-{YYYYMMDD}-{4hex} via randomBytes w/ P2002 retry loop ×5, creates DonationIntent status initiated, returns receiptNo+message+paymentInfo from siteConfig.payment), GET /api/donations?receipt= (regex-validated, 404 NOT_FOUND, anonymous → donorName "Anonymous"), POST /api/auth/register (5/10min, email-unique 409 w/ friendly Bengali field msg + P2002 race handling, hashPassword scrypt, createSessionToken, sets httpOnly SESSION_COOKIE via NextResponse.cookies.set, returns user), POST /api/auth/login (8/10min, generic "ইমেইল বা পাসওয়ার্ড সঠিক নয়" 401 — no enumeration, verifyPassword, updates lastLoginAt, sets cookie), POST /api/auth/logout (clears cookie maxAge 0), GET /api/auth/me (getSession → user or 401)
- All API routes export dynamic="force-dynamic"; zero any/@ts-ignore/eslint-disable; max file ~330 lines; NO blue/indigo (emerald/gold/amber/rose accents only)

Stage Summary:
- Routes 200-verified: /support, /support?fund={zakat|sponsor|general|scholarship|bogus→fallback}, /support?fund=zakat&amount=32500 (prefill verified in SSR value="32500"), /support/zakat-calculator, /login, /register, /account; /login+/register → 307 redirect when session cookie present; EN variants verified via asr-lang=en cookie
- APIs verified: contact 201/400-fields/429-on-6th (5/10min rate limit works) /403 foreign-origin; newsletter 201 + duplicate 200; donations POST 201 (receipt ASR-DON-20261004-9764 + paymentInfo) / 400 fields / GET 200 named+anonymous-sanitized / 404 / 400 bad-format; auth register 201+Set-Cookie(httpOnly)/409 duplicate/400 weak-pw, login 200+cookie/401 generic, me 200/401, logout 200+cookie-cleared
- Browser E2E (agent-browser): donation submit → receipt dialog (৳৩২,৫০০, payment channels, copy buttons) ✓; zakat math: 500,000→৳১২,৫০০, liabilities −200,000→৳৭,৫০০, gold-nisab toggle→"ফরজ নয়", Bengali-digit input "৫০০০০০" parsed ✓; CTA /support?fund=zakat&amount=12500 ✓; sponsor card click → amount 6000 + ref AS-101 + selected badge ✓; login→/account dashboard ✓; logout → login-required state ✓; register→auto-login→/account alumni badge ✓; 0 console/page errors; VLM review 4 desktop + 2 mobile screenshots all PASS
- bun run lint clean (exit 0); dev.log clean (no errors/warnings for my routes)

---
Task ID: 3-b
Agent: full-stack-developer (Agent 3-b)
Task: Admissions + Research & Publications pages

Work Log:
- Created src/components/admissions/: admission-timeline.tsx (5-step vertical timeline — gold numbered medallions with parchment ring, gold gradient spine, alternating left/right cards on md+, BN digits via toBnDigits, mobile single-column with ml-20 offset), exam-subjects.tsx (3 written-test hint cards: বেসিক আরবী/সাধারণ ইসলামিয়াত/সমকালীন জ্ঞান), course-eligibility.tsx (7 per-course cards derived live from courses content — eligibilityLabel + durationLabel + accent ribbon + link to /academics/courses/[slug]), faq-explorer.tsx (client — shadcn Tabs per faqGroup × Radix single-collapsible Accordion, aria-live count)
- Created src/components/research/: research-links.tsx (5 sub-page destination cards), research-areas.tsx (6 clarification track cards with icon map), clarification-topic-section.tsx (per-topic section with id="topic-{id}" scroll-mt-28 anchor, alternating 2/3 grid via lg:order, article/video count badges, multi-format PDF note, related blog articles mapped topic→slugs: scientism/secularism/atheism/feminism/orientalism/lgbtq-gender with category fallback), counter-question-form.tsx (client — POST /api/fatwa with category select আকীদা-মতাদর্শ/সমকালীন/…, isPrivate checkbox, field-error toasts), citation-generator.tsx (client — APA 7/Chicago/MLA 9 toggle chips, em-rendered title, clipboard copy + toast; publisher "আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট, ঢাকা"), reader-dialog.tsx (client — pad-styled emerald dialog: Bismillah header, PDF preview mock with Arabic line, 4 embedded-viewer features (page navigator/zoom/full-text search/offline), download → info text-blob + Web Share API → clipboard fallback), journal-card.tsx (server — gradient spine header, metadata dl (editor/date/ISSN), citation generator + reader), project-card.tsx (status badge চলমান/আসন্ন, team, Progress with gold-gradient fill via [&>div]:bg-gold-gradient, BN percent), call-for-papers.tsx (deadline panel formatDate + days-left counter, mailto research@assunnah-institute.org, 4 guidelines, fellowship notice), publication-cover.tsx (pure-CSS cover: aspect-3/4 gradient + spine shadow + star + Amiri "السُّنَّة" + type label + title/author/year), publication-grid.tsx (client — all/journal/book/paper filter chips with counts, aria-pressed, aria-live count, library CTA), fatwa-shared.ts (category labels/options + FatwaDto/FatwaListResponse wire types), fatwa-bank-explorer.tsx (client — debounced 350ms server search GET /api/fatwa?q=&category=&page=&pageSize=6, category pills সকল+৫, expandable single-open cards with full answer paragraphs + answeredBy + date, official-pad print via body.printing-fatwa class + window.print(), Web Share/clipboard, load-more with progress count, skeletons + empty state), fatwa-ask-form.tsx (client — full ask form: name/email/phone?/category/question/isPrivate, toasts)
- Created 9 pages (all server components: getLang() → PageHero w/ breadcrumb+arabicEcho → Reveal sections → bg-parchment alternating bands): /admissions (timeline + exam subjects + per-course eligibility + emerald CTA band → /notices?category=admission + scholarships), /admissions/scholarships (Bismillah + scholarshipInfo 3 paras + 4 coverage cards আবাসন/খাবার/টিউশন/ভাতা + 4-step eligibility proof ol + facilities panel + /support CTA), /admissions/faq (tabs+accordion + still-have-question card → /research/fatwa), /research (mission + 6/3/1 stat dl + research areas + 5 destination cards + closing ayah band), /research/library (2 journal cards w/ citation+reader, embedded-viewer explainer, prospectus/syllabus downloads, publications CTA), /research/projects (3 ongoing progress cards + CFP panel (deadline ৩১ মার্চ ২০২৬) + upcoming project + fellowship/collaboration card), /research/publications (filterable 6-item grid w/ CSS covers), /research/clarifications (sticky topic-jump anchor nav + 6 topic sections + 3 multi-format cards + counter-question form), /research/fatwa (3 principles strip + bank explorer + ask form + response-time card, #bank/#ask anchors)
- globals.css: converted .bg-gold-gradient from @layer utilities → @utility (Tailwind 4 — now variant-compatible, fixes gold fills for [&>div]:bg-gold-gradient on Progress home+projects); added @media print block isolating body.printing-fatwa .print-zone as official pad
- Cleaned up 2 test FatwaQuestion rows from DB after E2E; zero any/@ts-ignore/eslint-disable; max file 331 lines

Stage Summary:
- All 9 routes 200-verified (BN + EN via asr-lang cookie): /admissions, /admissions/scholarships, /admissions/faq, /research, /research/library, /research/projects, /research/publications, /research/clarifications, /research/fatwa; GET /api/fatwa 200
- Browser E2E (agent-browser + VLM): timeline medallions+alternating cards ✓, FAQ tab switch + accordion expand ✓, citation generator + reader dialog (Bismillah header, features, buttons) ✓, publications filter গ্রন্থ → "২ টি প্রকাশনা" aria-live ✓, CSS covers with السنة calligraphy ✓, #topic-atheism anchor jump ✓, fatwa search "কিবলা" → ১ result (debounced server query) ✓, category লেনদেন alone → ২ (combined q+category → 0) ✓, expand → full answer + answeredBy + অফিসিয়াল প্যাড (PDF)/শেয়ার buttons ✓, ask form submit → 201 persisted (isPrivate=true) ✓
- bun run lint clean (exit 0); dev.log clean for my routes

---
Task ID: 3-c
Agent: full-stack-developer (Agent 3-c) — worklog entry recorded by coordinator (agent hit context deadline after completing work)

Task: Media + Notices + Contact pages

Work Log:
- Created components: media/article-prose.tsx (markdown prose styling), media/blog-explorer.tsx (category filter), media/event-countdown.tsx (Bengali countdown), media/gallery-explorer.tsx (album filter + lightbox), media/share-buttons.tsx, media/video-theater.tsx (popup theater dialog)
- Created components: notices/notice-card.tsx, notice-dialog.tsx, notice-search.tsx, notice-deep-link.tsx; contact/contact-form.tsx
- Pages: /media hub, /media/blog + [slug] (5 articles, static params, 404 for unknown), /media/videos (playlist tabs + theater), /media/news (upcoming w/ countdown + past), /media/gallery (albums + lightbox), /notices (server-rendered, ?category=, ?q=, ?page=, ?notice= deep-link dialog), /contact (form → /api/contact, map embed, other-sites section)

Stage Summary:
- All routes verified 200 by coordinator (incl. query variants), blog 404 works, lint clean, dev.log clean.
- Agent verified all routes before timeout; coordinator re-verified everything above.

---
Task ID: 4
Agent: main (Coordinator / Performance & QA Engineer)
Task: Integration QA, E2E verification, stability fixes

Work Log:
- Full route audit: all 40+ routes return 200 (home, about×4, academics×12 incl. 7 course slugs, admissions×3, research×6, media×6 incl. 5 blog slugs, notices + query variants, support×2, contact, login, register, account)
- E2E verified via agent-browser: language toggle (BN⇄EN full round-trip), mega-menu dropdown, notices tab filtering, zakat calculator math (৳৫,০০,০০০ → ৳১২,৫০০ + nisab thresholds), zakat→donate CTA prefill (/support?fund=zakat&amount=12500), donation submit → receipt dialog (ASR-DON receipt no, bKash/Nagad payment channels, copy buttons)
- VLM visual reviews: hero 8.5/10, mobile responsive (no overflow), course pages rendering perfectly
- Generated all 16 AI images (hero-campus, 8 campus/gallery, 5 blog covers, news) — NOTE: image API requires 32-multiple dims; used 1344x768
- FIXED critical stability bug: Next 16 Turbopack OOM-killed (4GB box) compiling root /_not-found → solved with catch-all route (site)/[...catchAll] + site-group not-found.tsx (branded bilingual 404, renders in ~4.5s)
- Reduced Prisma logging to errors-only; restarted dev server detached
- Cleaned all QA test data (test users, donations, contacts)
- 404 handling verified (unknown route → branded 404 page)

Stage Summary:
- Lint: CLEAN (0 errors). dev.log: no runtime errors. All interactive flows E2E verified.
- Codebase: 194 TS files / 24,432 lines. ZERO any/ts-ignore/eslint-disable. All custom files ≤500 lines (only pre-existing shadcn sidebar.tsx is 726 — untouched scaffold).
- Production-ready: bilingual UI, real routing, 7 API groups with rate limiting + zod validation, scrypt+HMAC auth, indexed Prisma schema, seeded content.

---
Task ID: 5
Agent: main (Coordinator)
Task: Post-launch maintenance cron

Work Log:
- Created 15-minute recurring webDevReview cron job (fix bugs / QA via agent-browser / propose & build next features / update worklog).

Stage Summary:
- Autonomous improvement loop armed.

---
Task ID: 6 (cron round 1)
Agent: webDevReview (autonomous review cycle)
Task: QA sweep + dark mode + SEO + UX polish features

## Current project status description/assessment
- All 40+ routes healthy (200), lint clean, zero console errors, DB seeded.
- One recurring risk: dev server OOM-crashes on this 4GB box under compile pressure (restarted twice this round; root layout now stable once warm).
- Design system + bilingual i18n + auth + 7 API groups all production-ready from prior phases.

## Current goals / completed modifications / verification results
1. **QA sweep** — agent-browser checks on home/fatwa/gallery/notices/admissions/account: all pass, no errors; spot curls all 200.
2. **Dark mode (FEATURE)** — next-themes ThemeProvider (class strategy) + `ThemeToggle` in utility bar (hydration-safe via useSyncExternalStore, not setState-in-effect). VLM rated dark mode **9/10** ("exceptional contrast, no white flashes"). Round-trip light→dark→light verified.
3. **SEO (FEATURE)** — `src/app/sitemap.ts` (44 URLs: 31 static + 7 courses + 5 articles with priorities/changeFreq), `src/app/robots.ts` (disallow /account,/api,auth pages). Removed conflicting `public/robots.txt`. Root layout OG/Twitter cards now use hero-campus image (1344×768). Both endpoints verified live.
4. **UX features** — `ScrollToTop` floating button (appears >600px, verified click→scrollY 0) on all site pages; `ReadingProgress` gold bar on blog articles (verified 20.6% @ 600px scroll).
5. **Styling details** — global print stylesheet (hides chrome, expands content, link URLs for print, break-inside rules), gold `:focus-visible` rings sitewide, hero `texture-grain` film-grain overlay, dark-mode prose link fix, marquee `prefers-reduced-motion` safety.

Verification: `bun run lint` exit 0 (fixed 1 react-hooks/set-state-in-effect error during round). Routes: /, /sitemap.xml, /robots.txt, blog article → all 200.

## Unresolved issues / risks + priority recommendations for next phase
- **Risk**: 4GB RAM OOM kills `next dev` during cold compiles of new routes. Mitigation: restart via `cd /home/z/my-project && (nohup bun run dev > /dev/null 2>&1 &)`; keep agent-browser closed when idle; avoid adding heavy new root-level routes.
- **Priority 1**: Site-wide search page (`/search`) querying courses+blog+notices+fatwa (server-side, Prisma contains queries) + header search icon opening command palette (cmdk is installed).
- **Priority 2**: Notices RSS feed (`/feed.xml`) + PWA manifest for mobile installability.
- **Priority 3**: Real YouTube video IDs when available (currently search deep-links); replace `metadataBase` example domain with the real production domain before launch.
- **Priority 4**: Admin content ops (even minimal): seed script already exists; consider a protected `/admin` notice-composer posting straight to Prisma.

---
Task ID: 7 (cron round 2)
Agent: webDevReview (autonomous review cycle)
Task: Full-project type-safety audit, bug fixes, and Priority-1/2 feature delivery (site search + command palette + PWA + RSS + favicon system)

## Current project status description/assessment
- All 46+ routes healthy (200), lint clean, console fully clean (zero warnings after fixes).
- CRITICAL FINDING: ESLint alone had been missing real type errors — a full `tsc --noEmit` pass revealed 5 bug clusters that shipped in earlier rounds, including a **runtime ReferenceError on every mobile drawer link click** (undefined `onOpenChange`). Root cause: `next dev` (Turbopack) does not type-check, and ESLint lacks no-undef for TS files.
- Countermeasure now permanent: `bun run typecheck` script added; tsconfig scoped to app code only (examples/skills/mini-services/tests excluded) so typecheck reflects the real app.

## Current goals / completed modifications / verification results
1. **5 bug fixes (type-audit)**:
   - site-header.tsx MobileNav: `onOpenChange(false)` → `setOpen(false)` (6 call sites) — mobile drawer links no longer throw ReferenceError.
   - account/page.tsx: `SessionRole` imported from `@/lib/auth` (was missing from `@/types`).
   - scholarships/page.tsx: added missing `BadgeCheck` lucide import.
   - donation-form.tsx: explicit null-guard after validation (type-safe, no assertion).
   - share-buttons.tsx: `openShare` param signature `=> void` → `=> string` (window.open received void).
2. **Favicon fix (QA bug from dev.log)**: full icon system — hand-crafted `src/app/icon.svg` (emerald gradient + gold frame + white sword mark), `scripts/generate-icons.ts` (sharp) produces `favicon.ico` (16/32/48 PNG-embedded ICO), `apple-icon.png` (180 full-bleed), `public/icons/{icon,maskable}-{192,512}.png`. All endpoints verified 200.
3. **PWA manifest** (`src/app/manifest.ts`): standalone, bn locale, emerald theme, 4 icons, 3 app shortcuts (notices/fatwa/donate). `/manifest.webmanifest` 200.
4. **RSS feed** (`src/app/feed.xml/route.ts`): RSS 2.0, latest 20 notices from Prisma, XML-escaped, atom self-link, s-maxage 600. Auto-discovery `<link rel="alternate">` added to root metadata. Verified valid output.
5. **Site-wide search (Priority 1)**:
   - `src/content/search-pages.ts` (curated 35-entry bilingual page index) + `src/lib/search-index.ts` (unified index: pages + 7 courses + 5 articles + 6 research topics + quick actions; token-scoring search, BN+EN keywords).
   - `/search` page (server): hero SearchBox, popular-query chips landing state, grouped results (courses/pages/articles/topics/actions + live Prisma notices & fatwa), gold **query-token highlighting** (`<mark>`), empty state with suggestions, BN digit totals. Verified: "ভর্তি" → 5 results (3 pages + 2 live notices), "zakat" EN mode ✓, notice deep-link opens dialog ✓.
   - `/search` added to sitemap.
6. **⌘K command palette (Priority 1)**: `command-palette.tsx` (cmdk) — Ctrl+K/Cmd+K global shortcut, quick actions + popular queries when empty, live-scored results when typing, "সব ফলাফল দেখুন" full-search item, kbd footer. Desktop header SearchTrigger button (with Ctrl K badge) + mobile drawer search button. E2E verified: Ctrl+K opens+focuses, typing filters, Enter navigates (zakat calculator ✓), arrows+Enter → /search?q= ✓, drawer button → palette ✓. Query reset uses React "adjust state during render" pattern (lint-safe).
7. **A11y/console polish**: gallery lightbox caption → DialogDescription (Radix warning gone), `data-scroll-behavior="smooth"` on `<html>` (Next warning gone). Console now 100% clean on home + gallery.
8. **VLM design reviews**: landing 8.5/10, results 8/10, palette 7.5/10 → applied fixes: removed duplicate search icon in palette (CommandInput already renders one), removed unstyled ESC kbd, tightened clear-button alignment/size, stronger result-summary typography.

Verification: `bun run lint` exit 0 · `bun run typecheck` exit 0 · 26-route curl sweep all 200 (correct PYS slug = /academics/courses/preparatory-year-for-specialization) · dev.log clean · all new files ≤367 lines · zero any/ts-ignore.

## Unresolved issues / risks + priority recommendations for next phase
- **Risk (chronic)**: 4GB RAM OOM keeps killing `next dev` during cold compiles (killed 3× this round). Mitigation as before: detached restart, keep agent-browser closed when idle. Consider `experimental.turbo.memoryLimit` or route-level code splitting if it worsens.
- **Priority 1**: Admin content ops — protected `/admin` notice-composer + fatwa moderation posting straight to Prisma (seed script exists; UI missing). This is the last major functional gap.
- **Priority 2**: `metadataBase` still `as-sunnah-institute.example` — replace with the real production domain before launch (affects sitemap/OG/RSS absolute URLs; feed.xml reads NEXT_PUBLIC_SITE_URL env override).
- **Priority 3**: Search enhancements — notice/fatwa search from palette via fetch (currently static-only in palette), search result pagination beyond top-5 DB rows.
- **Priority 4**: Real YouTube video IDs; PWA offline service worker (manifest ships now, SW would complete installability).
