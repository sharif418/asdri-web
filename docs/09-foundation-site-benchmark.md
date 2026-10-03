# 09 — Benchmark: assunnahfoundation.org

Measured in the browser on 2026-10-03 (computed styles, loaded fonts, CSS variables). The institute's site must read as a member of the Foundation family and be clearly better in typography and reading comfort, which is what the client asked for.

## What the Foundation site is

| Aspect | Foundation site | Evidence |
|--------|-----------------|----------|
| Stack | React SPA built on MUI (Material UI) | `--shadows-0…24`, `--shape-borderRadius: 8px`, `--spacing: 8px`, `--zIndex-appBar` on `:root` |
| Bangla typeface | **Bornomala** (sans), weights 400 and 700 only | `@font-face Bornomala 400/700`; body stack `UbuntuSans, Bornomala` |
| Latin typeface | Ubuntu Sans 500–700 (Public Sans declared, not loaded) | `document.fonts` |
| Headings | Bold sans, centred, h1 70px/70px, h2 32px | computed on home |
| Body | 16–17px, line-height 1.5–1.625, colour #333 | `--font-body1`, `p` |
| Brand green | `#008E48` = oklch(56.7% 0.148 152) | buttons, links, pills |
| Dark green | `#0F2920` = oklch(25.7% 0.037 168) | headings, footer, top bar on mobile |
| Gold | fill `#E8B65D` = oklch(80% 0.121 80); text `#D08322` = oklch(67.6% 0.14 66) | fund band, logo wordmark bar, section labels |
| Soft background | `#EEF2F0` = oklch(95.8% 0.005 165) | card bands |
| Buttons | solid green, white 17px bold text, 8px radius, `→` appended | "দান করুন", "আরও জানুন" |
| Cards | white, 8px radius, MUI shadow, identical for every content type | activity, fund, blog grids |
| Layout | centred headings, three-card rows, pill labels ("নিয়মিত কার্যক্রম"), faint Islamic geometric overlay on hero and fund band, dark-green footer with logo | screenshots |
| Logo | green mosque mark, white "AS-SUNNAH", gold/orange "FOUNDATION" bar | footer |

## What we keep (family resemblance)

- **Hue family.** Our primary green sits on the Foundation's hue (≈152–155°), only deeper and less saturated: oklch(44% 0.10 153). Our ink is the Foundation's dark green hue (168°). Our gold sits between their fill and text golds (hue ≈72°). Side by side the two sites read as relatives.
- **Dark-green footer** and the idea of a quiet geometric motif, used far more sparingly.
- **Gold as the Foundation's second colour**, which we restrict to one illumination per screen.
- A visible line under the institute name: "আস-সুন্নাহ ফাউন্ডেশনের একটি শিক্ষাপ্রতিষ্ঠান", with the Foundation's exact brand green as a small mark (token `--brand-green`), so the relationship is explicit.

## What we deliberately do better

| Topic | Foundation site | ASDRI | Why |
|-------|-----------------|-------|-----|
| Bangla headings | Bornomala bold sans, centred | Noto Serif Bengali 600, left-aligned | A research institute's voice is the kitab, not the poster; serif Bangla with full conjunct coverage and consistent Latin pairing (Source Serif 4) |
| Bangla body | Bornomala 400 at 16px / 1.5 | Noto Sans Bengali 400 at 17px / 1.75 for interface; serif 18px / 1.8 for reading | Bangla needs taller leading; two weights are not enough for hierarchy; Noto ships 400–700 with matching Latin |
| Hierarchy | Everything bold, everything centred | Weight and size carry hierarchy; structure in margins and rules | Readers of long course and fatwa pages need a stable reading column |
| Cards | Same card + shadow for all content | Ruled lists and the matn/hashiya layout; cards only for true item sets, 1px border, no shadow | Avoids the SaaS-card look and makes content types distinguishable |
| Buttons | `→` on every button, 17px bold | Verb labels, no arrows, 44px height, medium weight | Plain language, touch size, no generated-page tell |
| Colour use | Brand green and gold used liberally | Green for actions, gold once per screen | Calm, institutional |
| Accessibility | Not measured here | All text ≥ 4.5:1 in light and dark, inputs ≥ 3:1, scoped tables, `lang` attributes | Lighthouse ≥ 90 target |

## Decisions recorded

1. Token hues aligned to the Foundation palette (see `globals.css`). Exact brand green exposed as `--brand-green` for the Foundation mark only.
2. Typeface choice unchanged: Noto Serif Bengali + Noto Sans Bengali. Bornomala rejected for the institute (two weights, no matching serif).
3. 8px radius and MUI shadows not adopted; our radius is 6px and surfaces are ruled, not shadowed.
4. When the institute's own logo arrives (GAP-B4), it should sit beside the Foundation line, not replace it.
