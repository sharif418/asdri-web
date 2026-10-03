# Brief — ASDRI website, phase 1 batch A

You are joining a project as its lead engineer and de-facto design lead for a long autonomous session. The foundation is built and reviewed; what comes next is the first real content of the site. This brief tells you who the client is, what they are afraid of, what has already been decided, what to build next, and how your work will be judged. It deliberately does not tell you how to type commands or structure every component: you know how to run a Next.js and Payload project, and the repository documents the rest. Where this brief is silent, choose the better option and write down why in the pull request.

## The client, and the one thing they fear

As-Sunnah Dawah & Research Institute is the educational institution of As-Sunnah Foundation, the largest Islamic charity in Bangladesh. It takes young ulama from qawmi madrasas and graduates from universities and trains them, over months or years, to answer the modern world's intellectual challenges from classical knowledge: scientism, secularism, atheism, feminism, orientalism. Students who qualify study, live and eat free, paid for by the Foundation's Zakat Fund. Its people read kitabs: a main text with commentary in the margins, ruled pages, restrained illumination. That material culture is the visual idea of the whole site.

The institute has never had a website. Admissions are announced on Facebook. Donors, many of them abroad, want to know where Zakat goes. Readers want the institute's fatwa and research to be findable and citable. The client has said one thing more clearly than anything else: **the site must look like a serious institution made it, and must never look like a template or an AI-generated page.** They judge by feel, not by vocabulary, and they will compare it with the Foundation's own site, assunnahfoundation.org, which ours must visibly belong to and quietly surpass in typography and reading comfort. Take that as the brief for every screen you make.

## What exists

Repository: `https://github.com/sharif418/asdri-web`. Use this token for access; it can read and write contents and pull requests on this repository only: `<GITHUB_TOKEN>`

Merged so far, on `main`:

- A **design system**: typefaces (Noto Serif Bengali + Source Serif 4 for content, Noto Sans Bengali + Inter for interface, Noto Naskh Arabic), a token set aligned to the Foundation's green, dark green and gold, a fluid type scale, base components, and a specimen page at `/design` built from the client's real content. The design plan is `docs/08-design-plan.md`; its central layout idea is **matn and hashiya**, a reading column with a margin column that carries the structure.
- A **site shell**: Payload globals for settings (identity, contact, module feature flags), navigation and impact figures; Bangla-first routing (no prefix) with English under `/en`; a three-row institutional masthead; a dark-green footer; an interim home page; a seed that loads the client's own words in both languages.

The repository's `AGENTS.md` is the engineering contract and tells you how to run everything. `docs/00` to `docs/09` hold the vision, every requirement with a stable ID, the information architecture, the data model, a register of what the client has not told us yet with the default we build anyway, the design direction (its section 3a lists the generated-page tells we refuse), and the benchmark of the Foundation's site. The client's two documents are in `docs/source/`; the `.extracted.txt` files are the only source of Bangla copy. Read all of it before you write code, then open `/design`, `/` and `/en` in a browser and look, because everything you build has to sit beside those pages as if the same hand made it.

## How we work

You work alone; nobody answers questions mid-session. Never stop on an unknown: the gap register (`docs/04`) gives the default, and if your unknown is not there, add a row and build the sensible default. Mention every such decision in the pull request.

Work in modules, in the order below, each on its own branch from a freshly pulled `main`, each ending in a pull request. Push as soon as something coherent exists and again before you stop; a pull request that another engineer could merge without talking to you is the unit of done. Do not commit to `main` and do not merge your own pull requests; a supervisor reviews each one. If a module genuinely needs code from an earlier unmerged module, branch from that branch and say so.

The supervisor reviews from screenshots, so for every page you build, capture it at phone width (375px) and desktop width (1280px) in both languages and commit the images under `docs/review/<module>/`, named by route, locale and width. Playwright is already a dev dependency. Before you capture, look at the page yourself as the client would and fix what is wrong. A page that reads as generic is a defect, the same as a failing type check.

Some things are fixed and not yours to change in this batch: the stack and its adapters, the fonts and the token set, the locale routing, the CI and infrastructure files, and the decision records in `docs/adr/`. If you believe one of them is wrong, make the smallest change that unblocks you and lead the pull request with the explanation.

## The quality bar

Design, in the order that matters:

- Type is the hero. Serif Bangla headings, left-aligned; generous leading for Bangla reading text (the `.reading` class, at most 68 characters wide). Only a hero headline may be centred.
- Structure is drawn, not decorated: hairline rules between real units, the margin column for codes, dates, credits and authors. Lists are ruled rows. Cards exist only for true sets of equal items (the six programmes on home, gallery albums), with a one-pixel border and never a shadow.
- Gold is illumination: at most one gold element on a screen (a hairline, a "new" badge, one button). Green is for actions and active states. Everything else is ink on stone.
- Motion only answers the user. Nothing fades in on scroll; nothing lifts on hover.
- Refuse the tells in `docs/05` section 3a: tracked ALL-CAPS labels, meta strings joined with middle dots, labels shaped `WORD — fragment`, arrows glued to links, one coloured word in a headline, numbers on things that are not sequences, identical rounded cards everywhere.
- Every list has a designed empty state that says what will appear and, for staff, how to add it. Every page works with the minimum data (a teacher with no photo or bio, a course with one semester, a notice with no attachment).
- Bengali digits for quantities, dates, credits and amounts in Bangla; Latin digits for codes, phone numbers and identifiers, always. Arabic gets `lang="ar"`.

Engineering, briefly, because you already know most of it:

- Everything a staff member might change is a Payload field. Every visitor-facing text field is localised. Every interface string lives in the dictionaries (`src/i18n/dictionaries/`, both languages). Every query carries the locale. Internal links go through `localizedHref`.
- Strict TypeScript, no `any`. Server components by default; client components small and only where interaction needs them. Files stay focused and short; a route file fetches and delegates, components live under `src/components/<module>/`. Nothing approaches several hundred lines.
- One collection per file, access control on each. After a model change: regenerate types and create a migration; if one change would both drop and create tables or enums, make it two migrations (remove, then add) so the generator never prompts. Commit migrations. Extend the seed one file per module; seeds are idempotent and the content is verbatim from `docs/source`.
- Lint, type check and build pass with no new warnings before every push; CI runs the same. Conventional commits citing requirement IDs.
- No new dependencies unless a Radix primitive is truly needed. No UI kits, no icon sets beyond lucide, no animation or date libraries.
- Accessibility is part of done: one h1 per page, landmarks, keyboard-reachable interaction with visible focus, scoped table headers, alt text, contrast from the existing tokens only.

English copy: use the English client document where it exists; otherwise write plain, factual English and mark it "EN draft" in the pull request. Bangla copy is never written from memory.

## What to build, in order

**A. People** — the people behind the institute: leadership (Chairman Shaykh Ahmadullah, In-Charge, two Assistant In-Charges, Academic Coordinator), the teachers' panel with the subjects each teaches, the Arabic team, the Tajweed team, the Tarbiyah teacher, and the language, computer, maths and science teams, all exactly as the client's document lists them. One collection with roles and teams, photos optional, private contact fields. A leadership page that is quiet and dignified; a faculty directory grouped by team where each person is a ruled row with a monogram or photo, name, designation and subjects in plain text; a profile page in matn/hashiya layout that still looks complete when the biography is empty. Expose what the home page will need. Requirements REQ-ABT-02, REQ-ACA-10.

**B. Courses** — the hero product of the site. Seven programmes with everything the client wrote: PYS with its two semesters of core courses, the non-credit supplementary table, the student development table and the five specialisations with their Arabic names; the certificate course; the two-year diploma with four semesters and the "what comes after" section; the Arabic teacher training; the Ramadan dawah training with its twenty-five topics; the Azan training; and the research methodology course, which has no content yet and stays a draft with a clearly marked placeholder. The data model is in `docs/03`. The index groups long programmes and short trainings as ruled rows, not cards. The detail page is matn/hashiya: facts in the margin, the text in the reading column, and the curriculum as the ruled kitab table shown on `/design` (desktop) that becomes stacked rows on a phone. Totals are computed from the rows; where the client's heading disagrees, the admin sees a note (gap C2). Course codes follow one consistent scheme (gap C3). Build the curriculum table once and let `/design` use the same component. Requirements REQ-ACA-01 to 09.

**C. Notices** — the institute's notice board, the thing that today lives only on Facebook. Four categories; a status that is computed from dates (new, active, closed) and can be overridden; PDF attachments; an optional "apply online" link; pinned items. A board with plain filter links, a search, ruled rows with date, serif title, category and status badges, and a quiet month archive; a detail page in matn/hashiya with attachments and the apply action in the margin. Seed a handful of plausible notices so the board, filters and badges are visible, marked as samples in the admin. Requirements REQ-NOT-01 to 06.

**D. Home** — replace the interim home with an editable home made of ordered, individually switchable sections: a hero where the headline is the hero and nothing competes with it (optional intro video shown as a poster that plays on click), the impact figures as a ruled row, the vision and its three pillars, the six featured programmes (the one place cards belong), the latest notices with plain category tabs, campus life as a ruled two-column list with optional images, featured people, and a single calm support band leading to the donation page. Create the configs for the sections whose modules do not exist yet (refutations, media hub, fatwa) switched off and rendering nothing; never fake content. Seed the home from the client's words. Requirements REQ-HOME-01 to 12.

**E. The remaining pages of the institutional site** — vision and objectives (thirteen objectives as a ruled list; they are not a sequence), campus and facilities, alumni with batch statistics in a small collection (the office must still confirm the totals, gap C1), the admission process (five steps, which are a sequence, so numbered in Bengali numerals), scholarships and financial aid, a FAQ with category tabs and accessible accordions, a download centre with categories that also serves the dawah materials, the student development programme page reusing the curriculum table, and contact pages drawn from the settings global (addresses with map links, phone with hours, the admission note and the Facebook QR). Add every new route to the sitemap, respecting the module flags. Requirements REQ-ABT-01, 03, 04; REQ-ADM-01, 02, 04; REQ-ACA-11, 12; REQ-CON-01, 02.

When all five pull requests are open, tick the completed rows in `docs/07-kickoff-prompt.md` and the phase-1 boxes in `docs/06-roadmap.md` in the last pull request, and stop. Admissions forms, donations, blog and gallery come in the next brief.

## How you will be judged

Each pull request is read against this brief and the design documents, and against its screenshots. The question asked of every page is the client's: would a reader take this for the real site of a serious institution, and is it more comfortable to read than the Foundation's site? The usual reasons work comes back: Bangla typed from memory instead of copied from the source; a string outside the dictionaries; a card where a ruled row belongs; a second gold element; an oversized file; a missing empty state, migration or seed; Latin digits in a Bangla quantity; a menu or accordion that does not work from the keyboard.

You have a lot of room here. Use it to make the pages better than this brief imagines, not different from what it asks.
