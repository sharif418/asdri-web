# 08 — Design plan (pass 1 of the frontend-design process)

Written before any UI code, reviewed against §3a of `05-design-direction.md`. Change this file first when the visual system changes.

## Subject, audience, job

- **Subject:** a dawah and research institute that trains ulama and university graduates to answer modern ideological challenges from classical knowledge. Its material culture is the kitab: ruled pages, main text with marginal commentary, restrained illumination.
- **Audience:** prospective students (madrasa and university backgrounds), donors (local and diaspora), readers of fatwa and research.
- **Primary job of the site:** make the institute's seriousness legible in three seconds, then route to a course, an application, or a donation.

## Palette (tokens in `globals.css`)

| Name | Light | Role |
|------|-------|------|
| Ink | `oklch(25% 0.03 168)` | text, rules on dark bands (Foundation dark green hue) |
| Stone | `oklch(98.2% 0.004 165)` | page background (cool, faintly green; not cream) |
| Panel | `oklch(100% 0 0)` | reading surfaces that sit on stone |
| Mihrab green | `oklch(44% 0.10 153)` | primary actions, links, active states (Foundation green hue, deeper) |
| Mihrab deep | `oklch(31% 0.075 155)` | dark bands, pressed states |
| Tazhib gold | `oklch(68% 0.13 72)` | illumination: one element per screen (Foundation gold family) |
| Rule | `oklch(87% 0.012 160)` | hairlines |
| Brand green | `#008E48` | the Foundation's exact green, only for the Foundation mark |

Hues are aligned to the Foundation's palette so the two sites read as relatives (docs/09-foundation-site-benchmark.md). Dark mode inverts stone/ink and lifts green and gold in lightness; tokens are defined for both.

## Type

Two families, clearly distinct by role:

- **Serif = content.** Noto Serif Bengali for Bangla, Source Serif 4 for Latin. Headlines, course titles, article and fatwa body text. Weight 600 for headings, 400 for reading text. Bangla reading text gets line-height 1.8.
- **Sans = interface.** Noto Sans Bengali for Bangla, Inter for Latin. Navigation, buttons, tables, badges, metadata, forms.
- **Arabic:** Noto Naskh Arabic for Arabic course titles and Quranic text, never italicised.
- Scale: fluid, display 2.5–4.25rem, h1 2–3rem, h2 1.6–2.125rem, h3 1.3–1.5rem, body 1.0625rem. Line length ≤ 68ch for Bangla serif reading text.
- Bengali digits for quantities in `bn`; Latin digits for codes and phone numbers (see `utilities/formatNumber.ts`).

## Layout: matn and hashiya

```
desktop (≥1024)                              mobile
┌──────────────────────────────┬─────────┐   ┌──────────────┐
│ headline (serif, large)      │         │   │ margin block │  ← compact header: code, credits, date
│ ───────── gold hairline ──── │ margin  │   ├──────────────┤
│                              │ (sans,  │   │ headline     │
│ main text column, ≤68ch      │ small,  │   │ ─── gold ─── │
│ ruled hairlines between      │ muted)  │   │ main text    │
│ real units (semesters,       │ sticky  │   │              │
│ questions)                   │         │   │              │
└──────────────────────────────┴─────────┘   └──────────────┘
```

- 12-column grid, content max 1200px. Reading pages: main 8 columns, margin 3 columns starting at column 10.
- Everything left-aligned. Only the hero headline may be centred.
- Structure is drawn with hairline rules and the margin column, not with cards. Cards are reserved for things that are genuinely items in a set (courses in the programme grid, gallery albums), and even there the rule is a 1px border, no shadow.
- Lists (notices, fatwa, publications) are ruled rows, not card stacks.

## Hero

The headline is the hero: the institute's Bangla name set large in serif, a one-line statement of purpose beneath, a single gold hairline as the illumination, and two actions (Explore courses, Apply). No counter bar in the hero; impact figures appear further down as a ruled row with ordinary-sized numbers and full labels.

## Principles

1. Type is the hero; everything else is quiet.
2. The margin carries structure; it is information, not decoration.
3. One gold per screen.
4. Rules, not cards.
5. Motion only answers an action.
6. Copy is plain, sentence case, says what happens ("আবেদন করুন", not "এখনই শুরু করুন").

## Review against the generic default

The default for "Islamic institute website" is green + gold + geometric pattern + cream + serif display + stat counters in the hero. Kept because the brief pins them: green primary, gold accent, serif Bangla headings. Changed:

- Cream → cool stone; the cream/clay pairing is the most recognisable generated look.
- Gold everywhere → gold once per screen, as illumination.
- Geometric pattern as hero texture → removed from the hero; allowed only as a hairline motif in the footer if at all.
- Stat counters in the hero → ruled row later on the page.
- ALL-CAPS eyebrows, middle-dot meta, arrows on links → removed from the component set.
- Card grid for everything → matn/hashiya reading layout and ruled lists; cards only for true item sets.
