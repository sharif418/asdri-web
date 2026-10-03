# 04 — Gap register

What the client has not told us, whether it blocks engineering, and the default we build so the client can review a live system instead of a question list.

**Kind:** `content` = admin types it later; `decision` = business choice, built behind config; `data` = needs an operational data source; `tech` = platform constraint we must explain.

| ID | Area | Question | Kind | Blocks build? | Default we build | Who decides |
|----|------|----------|------|---------------|------------------|-------------|
| GAP-C1 | Stats | Alumni total 293 vs batch sum 104 (20+29+29+26); home stats differ slightly between docs | content | No | Counters and batch table editable; seed with doc values and an admin note "please confirm" | Institute office |
| GAP-C2 | Courses | Credit totals in headings vs tables (PYS sem 2: 19 vs 17; Diploma Y1S1: 25 vs 24) | content | No | Totals computed from rows; heading shows computed value; admin can override | Academic coordinator |
| GAP-C3 | Courses | Code inconsistencies: CCAIS vs CCIS; PGD-DIS 101 vs 1102; "PGDID" vs "Diploma in Dawah & Islamic Studies" | content | No | Use CCIS and PGD-DIS 1101 style in seed; flag in admin | Academic coordinator |
| GAP-C4 | Courses | Islamic Research Methodology has no content | content | No | Course exists, status `draft`, placeholder "বিবরণ শীঘ্রই" on public listing unless hidden | Academic coordinator |
| GAP-C5 | People | No photos, bios, qualifications for faculty; English spellings of names | content | No | Profile cards with initials avatar; bio optional; EN names transliterated in seed, editable | Institute office |
| GAP-C6 | Media | No intro video, prospectus PDF, campus photos | content | No | Hero supports video URL or poster image; prospectus button hidden until file uploaded | Institute office |
| GAP-C7 | Content | Email address of the institute not given; only phone | content | No | Placeholder in site-settings | Institute office |
| GAP-C8 | Stats | Alumni batch programmes (PGDID) do not map onto the current course catalogue; are they the Diploma's former batches? | content | No | `alumni-batches` stores programme names as free text, verbatim from the document; a relation to courses can be added when the office maps batches to programmes | Institute office |
| GAP-D1 | Admissions | Exact application form fields per course; documents required; any fee | data | No | Common fields (name, father, DOB, NID/birth cert, phone, email, address, district, education rows, photo, certificates) + per-intake optional toggles | Admissions |
| GAP-D2 | Sponsorship | Progress reports need results and attendance per student — no system records these today | data | No for phase 1; Yes for REQ-DON-08 | Build `students` + `academic-records` with manual entry form; reports generated from them; if left empty, send narrative-only update | In-Charge |
| GAP-D3 | Sponsorship | Which students may be listed, what cost per student/month, consent | decision | No | Profiles invisible until `visible=true`; cost fields editable | In-Charge |
| GAP-B1 | Payments | Which gateway: SSLCommerz / bKash merchant / Nagad merchant / aamarPay? Who owns the merchant account (Institute or Foundation)? International: Stripe/PayPal need a non-BD entity or an aggregator | decision | Partially (needs credentials) | Gateway abstraction with adapters; sandbox SSLCommerz first; `international` flag off until credentials | Foundation finance |
| GAP-B2 | Fatwa | Separate ASDRI fatwa board or the Foundation's existing "শরয়ী সমাধান" team? | decision | No | Workflow built; roles assignable to any users | Foundation dawah dept |
| GAP-B3 | Domain | Separate domain or subdomain of assunnahfoundation.org? | decision | No (affects launch) | Env-driven `SITE_URL`; Coolify can bind any domain | Foundation IT |
| GAP-B4 | Brand | Must the institute visually match the Foundation site? Logo files? | decision | No | Own identity in the Foundation family (see design direction); logo placeholder | Foundation + Institute |
| GAP-B5 | Accounts | What a Student / Alumni / Staff login should show | decision | No (phase 4) | Schema reserved; login routes to role landing; student/alumni portals behind flags (off) | In-Charge |
| GAP-B6 | Receipts | Tax-rebate certificate wording, registration no. to print on receipts | decision | No | Receipt template with editable fields | Foundation finance |
| GAP-T1 | Payments | Recurring auto-debit on bKash/Nagad is not generally available to merchants | tech | No | Recurring = card tokenisation where gateway supports it, otherwise monthly reminder with one-tap pay link | explain to client |
| GAP-T2 | Facebook | Page feed sync needs Graph API page token + app review; tokens expire | tech | No | Manual "import post by URL" in admin + optional scheduled sync when token provided | explain to client |
| GAP-T3 | YouTube | Auto-fetch metadata requires a YouTube Data API key (free quota is enough) | tech | No | oEmbed fallback (no key) for title/thumbnail; duration requires key | IT |
| GAP-T4 | PDF | In-browser PDF reader with search: use pdf.js; large journals must be optimised | tech | No | pdf.js viewer component, lazy-loaded | — |
| GAP-T5 | SMS | Receipt by SMS needs a BD SMS gateway account | tech | No | Email receipt always; SMS adapter behind flag | Foundation IT |

## How to use this register

- Building something? Follow the "Default we build" column.
- Client answers a question? Update the row, link the decision in an ADR if it changes architecture, and open an issue for the change.
- New unknown found? Add a row in the same PR.
