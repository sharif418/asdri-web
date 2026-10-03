# 01 — Requirements (with stable IDs)

Source: `docs/source/01-navbar-and-home-contents.docx` (IA, English) and `docs/source/02-website-content-and-features-bn.docx` (content + features, Bangla). Every requirement below traces to one of them. Items marked **[GAP]** have an entry in `04-gap-register.md`.

Priority: **P1** = launch, **P2** = knowledge platform, **P3** = donor transparency, **P4** = portals.

## GEN — Global

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-GEN-01 | Bilingual site, Bangla default, English second, language switcher in top utility bar | P1 |
| REQ-GEN-02 | Top utility bar: phone, email, location, language switcher, Login, Create Account | P1 |
| REQ-GEN-03 | Main navbar: logo + institute title, 8 menu items with dropdowns, primary CTA "Support Us / Donate" | P1 |
| REQ-GEN-04 | Footer: address (Holding 99, Satarkul Pukurpar, Kazibari, Badda, Dhaka-1212), phone +880 1805-437910 (9 AM–5 PM), email, Google Maps embed, quick links (Download Center, FAQ, Alumni Portal, social), QR code for admission updates | P1 |
| REQ-GEN-05 | Global search across notices, blog, fatwa, publications, courses | P2 |
| REQ-GEN-06 | Every module can be enabled/disabled from admin (feature flags) | P1 |
| REQ-GEN-07 | SEO: metadata, Open Graph, sitemap, structured data for courses/articles/events | P1 |
| REQ-GEN-08 | Responsive, fast on low-end Android, lazy loading everywhere | P1 |

## HOME — Home page (12 sections)

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-HOME-01 | Hero: heading, sub-heading ("An Educational Institution of As-Sunnah Foundation"), tagline, CTAs [Explore Courses] [Download Prospectus PDF], embedded intro video | P1 |
| REQ-HOME-02 | Impact counters: Total 420+, Alem 128+, General 102+, Short-term 190+, Currently enrolled 127, Alumni 293+ (editable) **[GAP-C1]** | P1 |
| REQ-HOME-03 | Vision statement + 3 core pillars | P1 |
| REQ-HOME-04 | Featured programmes card grid (6 courses: duration, eligibility, Learn more) | P1 |
| REQ-HOME-05 | Intellectual refutations highlight: topics (Scientism, Secularism, Atheism & Skepticism, Feminism, Orientalism, LGBTQ/Gender) + featured papers + CTA | P2 |
| REQ-HOME-06 | Recent notices: tabs All / Admission / Academic / Recruitment, cards with date and status badge, CTA to notice board | P1 |
| REQ-HOME-07 | Campus life & student development grid/slider (Tarbiyah, Intellectual discussions, Fieldwork, Facilities) | P1 |
| REQ-HOME-08 | Media & knowledge hub: latest articles, featured videos (YouTube pop-up), gallery thumbnails, journal previews | P2 |
| REQ-HOME-09 | Featured leadership & faculty carousel (Chairman, In-Charge, key scholars) | P1 |
| REQ-HOME-10 | Support Us bar: 4 fund categories, zakat calculator, live funding goal bar, sponsor a student, payment logos | P1 (goal bar/sponsor P3) |
| REQ-HOME-11 | Fatwa gateway: quick ask box + searchable fatwa bank entry | P2 |
| REQ-HOME-12 | Footer per REQ-GEN-04 | P1 |

## ABT — About Us

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-ABT-01 | Vision & Objectives page (13 objectives, verbatim from source) | P1 |
| REQ-ABT-02 | Leadership & Administration (Chairman Shaykh Ahmadullah, In-Charge Khaled Muhammad Saifullah, Asst In-Charges Abir Muhsin & Shoaib Mahmud, Academic Coordinator Salahuddin Tareq) | P1 |
| REQ-ABT-03 | Campus & Facilities (residential, library & lab, amali tracker, spiritual environment) | P1 |
| REQ-ABT-04 | Alumni Association page: intro + batch statistics (PGDID 20, 29; CCIS 29; Teachers Training 26) **[GAP-C1]** | P1 |

## ACA — Academics

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-ACA-01 | Courses index listing 7 programmes | P1 |
| REQ-ACA-02 | Course detail page template: intro, objectives, type (duration, residential, gender), eligibility, curriculum tables (semester → courses → modules, credits, marks), outcomes/next steps, apply CTA, downloads | P1 |
| REQ-ACA-03 | PYS: 3-year, residential, male; year 1 = PYS; 5 specialisations; 2 semesters of core courses + non-credit supplementary + SDP table **[GAP-C2 credit totals]** | P1 |
| REQ-ACA-04 | CCIS: 6 months, residential/non-residential, male, eligibility (graduate, CGPA ≥ 2.5, full-time, pass exam), 6-row curriculum **[GAP-C3 code CCAIS vs CCIS]** | P1 |
| REQ-ACA-05 | Diploma in Dawah & Islamic Studies: 2 years / 4 semesters, 4 curriculum tables, next-steps section **[GAP-C2, C3]** | P1 |
| REQ-ACA-06 | Arabic Language Teacher Training: 15 days, eligibility, 8 curriculum items | P1 |
| REQ-ACA-07 | Ramadan Dawah Training: 20 days, eligibility (70%), 25 topics | P1 |
| REQ-ACA-08 | Azan Training: 15 days, eligibility, 9 curriculum items | P1 |
| REQ-ACA-09 | Islamic Research Methodology: page exists, content pending **[GAP-C4]** | P1 |
| REQ-ACA-10 | Faculty & Teachers directory: leadership, teacher panel with subjects, Arabic team, Tajweed team, Tarbiyah teacher; profile pages with bio, subjects, publications | P1 |
| REQ-ACA-11 | Student Development Programs page (SDP table) | P1 |
| REQ-ACA-12 | Download Center: syllabi PDFs, admission/admin forms, dawah materials (posters, pamphlets, booklets), categorised, searchable | P1 |

## ADM — Admissions

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-ADM-01 | Admission Process page: 5 steps (online application, screening, written exam, viva, final admission) | P1 |
| REQ-ADM-02 | Scholarships & Financial Aid page (100% zakat-funded scholarship, eligibility proof, allowances) | P1 |
| REQ-ADM-03 | Admission Notices (filtered view of notices) | P1 |
| REQ-ADM-04 | FAQs: accordion, category tabs (Admission, Courses, Donation rules, …) | P1 |
| REQ-ADM-05 | Online application form per course intake: personal info, education, documents upload, declaration; applicant account; status tracking **[GAP-D1 fields]** | P1 |
| REQ-ADM-06 | Admin: intake management (open/close dates, seats), applicant list, shortlist, exam schedule, results, export CSV | P1 |

## RES — Research & Publications

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-RES-01 | Library & Journals: journals (peer-reviewed), magazines/periodicals, research bulletins | P2 |
| REQ-RES-02 | Embedded PDF reader (zoom, fullscreen, search within PDF), download & share buttons | P2 |
| REQ-RES-03 | Publication metadata: authors/editors, date, ISBN/ISSN, category; abstract, key findings, keywords without opening PDF | P2 |
| REQ-RES-04 | Citation generator (APA, Chicago, MLA) copy button | P2 |
| REQ-RES-05 | Research Projects & Fellowships: ongoing projects with progress bar; Call for Papers with guidelines, deadline, submission portal; fellowship notices | P2 |
| REQ-RES-06 | Faculty Publications & Books: cover, author (linked profile), intro, table of contents PDF, buy link (Rokomari) or collection instructions | P2 |
| REQ-RES-07 | Intellectual Clarifications & Refutations hub: topic filters (existence of God, Islam & science, women's rights, hadith authenticity, …); article + short video + PDF on one page; counter-question submission | P2 |
| REQ-RES-08 | Fatwa & Online Queries: submission form (name, email, category: ibadat, muamalat, aqidah, family…, question), "answer privately only" checkbox; searchable fatwa bank; branded PDF download per fatwa **[GAP-B2 board]** | P2 |
| REQ-RES-09 | Fatwa admin workflow: new → assigned → drafted → reviewed → published/private-answered; email to asker | P2 |

## MED — Media & Resources

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-MED-01 | Blog: categories (contemporary fitnah & doubts, tafsir & hadith research, dawah & comparative religion, Islamic economics & fiqh, sirah & history, …) | P1 |
| REQ-MED-02 | Blog features: read-time estimator, author profile link, moderated comments (approve in admin), WhatsApp/Facebook share, 3–4 related articles | P1 (comments P2) |
| REQ-MED-03 | Videos & Podcasts: YouTube integration (paste link → title, thumbnail, duration auto-fetched; or playlist sync), playlists (short doubt-clearing 4–5 min, podcast series, lectures & khutbah, seminar recordings), audio-only mode, pop-up theatre player | P2 |
| REQ-MED-04 | News & Events: Facebook page feed sync (API/webhook) **[GAP-T2]**, upcoming events with time/place/countdown, past events with report & photos, rich media in news | P2 |
| REQ-MED-05 | Photo Gallery: albums, masonry grid, lightbox with caption, lazy loading | P1 |
| REQ-MED-06 | Dawah Materials: printable posters/pamphlets/booklets, free download | P1 |

## NOT — Notices

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-NOT-01 | Categories: Admission, Recruitment, Academic (exam, routine, holiday), General | P1 |
| REQ-NOT-02 | Filter by category, keyword search | P1 |
| REQ-NOT-03 | Dynamic status badge New / Active / Closed (computed from dates, overridable) | P1 |
| REQ-NOT-04 | Attachments: PDF/Doc preview + one-click download | P1 |
| REQ-NOT-05 | "Fill online form" button linking to application (admission/recruitment) | P1 |
| REQ-NOT-06 | Archive by month and year | P1 |

## DON — Support Us / Donation

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-DON-01 | Fund selection (dropdown or visual cards): Zakat Fund, General Donation, Scholarship Fund, Sponsor a Student | P1 |
| REQ-DON-02 | Local payments: bKash, Nagad, cards **[GAP-B1 gateway]** | P1 |
| REQ-DON-03 | Instant confirmation + PDF receipt to mobile (SMS) and email, stating fund and sponsored student ID/name | P1 |
| REQ-DON-04 | Zakat calculator (cash, gold/silver, business goods) with one-click donate of the result | P1 |
| REQ-DON-05 | Anonymous donation checkbox (name hidden publicly, intact in backend/receipt) | P1 |
| REQ-DON-06 | Sponsor a Student, option A: anonymised student list (ID e.g. AS-104, year, district) → sponsor month/year | P3 |
| REQ-DON-07 | Sponsor a Student, option B: enter a specific student's name/roll/ID | P3 |
| REQ-DON-08 | Student progress updates by email every semester / 3–6 months (results, attendance %, short report) **[GAP-D2 data source]** | P3 |
| REQ-DON-09 | Donor portal: login, totals per fund, sponsored student status (privacy-preserving), thank-you messages | P3 |
| REQ-DON-10 | Recurring/monthly donation **[GAP-T1 BD recurring]** | P3 |
| REQ-DON-11 | Campaign funding goal tracker (target vs raised, real-time bar) | P3 |
| REQ-DON-12 | International payments: PayPal, Stripe, Visa/Mastercard in USD/SAR/EUR **[GAP-B1]** | P3 |
| REQ-DON-13 | Admin: donations ledger, filters, export, refund notes, receipts re-send, campaign management | P1 |

## CON — Contact

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-CON-01 | Contact & Location: addresses (office + residential campus), phone with hours, map, contact form | P1 |
| REQ-CON-02 | Other Websites: links to As-Sunnah Foundation and sister sites **[GAP-B4]** | P1 |
| REQ-CON-03 | Admission info note + Facebook QR code | P1 |

## AUTH — Accounts

| ID | Requirement | Pri |
|----|-------------|-----|
| REQ-AUTH-01 | Login for Students, Donors, Alumni, Staff (single login, role-based landing) | P1 (staff, applicant) / P3 (donor) / P4 (student, alumni) |
| REQ-AUTH-02 | Register: new applicant, donor signup, alumni registration | same as above |
| REQ-AUTH-03 | Email/phone OTP preferred over passwords for public roles | P1 |
