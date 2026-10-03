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

- **Primary:** deep green (institutional, Islamic connotation without cliché) e.g. oklch(0.35 0.08 160).
- **Accent:** warm gold/ochre used sparingly (CTAs, highlights, rules).
- **Neutrals:** warm paper-like off-white backgrounds, ink-dark text (not pure black).
- **Semantic:** success/warn/error + notice-badge colours (New = accent, Active = green, Closed = neutral).
- Contrast AA minimum everywhere, AAA for body text.

No gradients-on-everything, no glassmorphism, no neon.

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

1. Design tokens and type specimen page first (`/design` route, not in nav) — approve before building pages.
2. Build home, course, notice, fatwa, donate as reference screens; review on real phones.
3. Every PR with UI attaches mobile and desktop screenshots.
4. A page that "looks generic" is a blocking review comment, equal to a bug.
