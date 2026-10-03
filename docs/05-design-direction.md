# 05 — Design direction

The client said explicitly: it must look like a real institution's site, not an AI-generated template. This document is the bar. Read it before touching any UI.

## 1. Positioning

An institute that answers modern intellectual challenges from classical knowledge. The design should feel **scholarly, calm, confident and contemporary**: a research institute, not a charity landing page and not a corporate SaaS. References to study (do not copy): Al-Azhar's research portals, Yaqeen Institute, Cambridge Muslim College, Oxford Centre for Islamic Studies, and Bengali literary publishers for typographic warmth.

## 2. Typography (the single biggest quality lever)

- **Bangla body & headings:** a high-quality Unicode Bangla typeface with proper conjuncts and matras at small sizes. Shortlist: *Noto Serif Bengali* (headings, scholarly feel) + *Noto Sans Bengali* or *Hind Siliguri* (UI, body). Evaluate *Li Ador Noirrit* / *Baloo Da 2* for display only if they render cleanly. Decide in the first design review and record in an ADR.
- **Latin:** pair with a serif for headings (e.g. *Source Serif 4* or *Fraunces*) and a humanist sans for UI (e.g. *Inter* or *Public Sans*). Latin and Bangla x-heights must be matched; test mixed lines ("PYS 1101 — Islam and Da'wah") carefully.
- **Arabic:** *Noto Naskh Arabic* or *Amiri* for course Arabic titles and Quranic text; always RTL-correct, never italicised.
- Bengali numerals in Bangla locale for human-facing numbers (dates, counters, credits); Latin digits in codes (PYS 1101) and phone numbers.
- Type scale: fluid (clamp), 1.2–1.25 ratio, generous line-height for Bangla (≥1.7 body).

## 3. Colour

Build from a restrained palette, defined as CSS tokens on `:root` with dark-mode variants:

- **Primary:** deep green (institutional, Islamic connotation without cliché) e.g. oklch(0.36 0.07 165).
- **Accent:** gold used as *illumination* (tazhib): one element per screen at most, never as a general highlight colour.
- **Neutrals:** cool white/stone backgrounds and a green-black ink for text. Do **not** use the warm cream (#F4F1EA-like) + terracotta pairing; it is the most recognisable generated-page palette.
- **Semantic:** success/warn/error + notice-badge colours (New = gold, Active = green, Closed = neutral).
- Contrast AA minimum everywhere, AAA for body text.

No gradients-on-everything, no glassmorphism, no neon.

## 3a. Generated-page tells to avoid (calibration from the frontend-design skill)

These read as AI defaults regardless of subject. Do not use them unless the content genuinely calls for it:

- Tracked-out ALL-CAPS "eyebrow" labels above headings. Use a plain sentence-case label only when it carries information (a category, a date), never as decoration.
- Meta strings joined with middle dots (`A · B · C`) and labels shaped `WORD — fragment`.
- A `→` appended to every link or button.
- Accenting one word of a headline in another colour or italic.
- Identical rounded cards with the same soft shadow for every content type; one border-radius everywhere.
- Numbered markers (01 / 02 / 03) on content that is not a sequence. The admission process *is* a sequence; the vision pillars are not.
- Fade-and-slide-up entrance on every section; hover lift on every card. One orchestrated moment per page at most.
- Near-black (#0B0B0B) as "black", monospace for small data labels, a cream background with a serif display and a clay accent.

## 3b. The ASDRI visual idea: matn and hashiya

Classical Islamic scholarship is laid out as a main text (matn) with commentary in the margins (hashiya). The institute's whole purpose is to train people who read that way and answer the modern world from it. We use this as the site's structural device, not as ornament:

- Reading pages (course, fatwa, article) have a main column and a **margin column** that carries the structural information: course code and credits, mufti and date, section numbers, related items. On mobile the margin folds above the text as a compact header block.
- Dividers and rules are the hairlines of a ruled manuscript page: thin, ink-coloured, used to separate real units (semesters, questions), never to decorate.
- The one bold element per screen is typographic: a large Bangla serif headline set with care. Everything else stays quiet.
- Gold appears once per screen as illumination (a rule under the headline, a seal mark, a badge) and nowhere else.

## 4. Layout and motion

- 12-column grid, max content width ~1200px, reading column ~68ch for articles and fatwa.
- Clear section rhythm: alternating paper/ink backgrounds instead of card-soup.
- Geometric Islamic pattern used as a *subtle* texture (low-contrast SVG) in hero/footer only.
- Motion: purposeful and short (150–250ms); counters animate once on view; no parallax; respect `prefers-reduced-motion`.
- Imagery: real campus photos, classrooms, books, fieldwork. Until photos arrive, use typographic/ pattern compositions, never stock photos of random people.

## 5. Component principles

- Course page is the hero product: curriculum tables must be beautiful and readable on mobile (stacked rows with code/credits chips, not horizontally scrolling tables).
- Notice cards: date, category, status badge, attachment icon; scannable in a list of 50.
- Fatwa answer page: question quoted, answer in reading column, references footnotes, mufti signature block, PDF button; print stylesheet.
- Donation flow: one screen, fund cards → amount chips + custom → details → pay. Zakat calculator result flows straight into the amount.
- Empty states are designed, not blank: "এই বিভাগে এখনো কিছু প্রকাশ হয়নি" with an icon and, for staff, a link to add.

## 6. Accessibility and performance budget

- Keyboard-navigable menus, visible focus, skip link, semantic landmarks.
- LCP < 2.5s on 4G mid-range Android; JS on public pages < 150KB gzipped excluding the PDF viewer and video players (both lazy).
- Fonts: subset Bangla fonts, `font-display: swap`, preload the two primary families.

## 7. Process

0. Before any UI work, load the `frontend-design` skill and the Design plugin. Work in two passes as that skill prescribes: write a compact design plan (palette, type roles, layout concept, principles), check it against §3a, then build.
1. Design tokens and type specimen page first (`/design` route, not in nav) — approve before building pages.
1a. Every UI deliverable passes two gates before merge: `design-critique` (structured critique) and `accessibility-review` (WCAG 2.1 AA). Findings are fixed, not waived.
2. Build home, course, notice, fatwa, donate as reference screens; review on real phones.
3. Every PR with UI attaches mobile and desktop screenshots.
4. A page that "looks generic" is a blocking review comment, equal to a bug.
