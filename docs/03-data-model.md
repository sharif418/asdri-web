# 03 — Data model (Payload collections and globals)

Localised fields are marked **(L)**. All collections have `createdAt/updatedAt`, drafts + versions where content is editorial.

## Globals

- **site-settings** — institute name (L), tagline (L), logos, contact (phones, email, hours, addresses), social links, Facebook QR image, other websites list, default SEO, analytics IDs, **feature flags**: `fatwa`, `clarifications`, `library`, `researchProjects`, `books`, `videos`, `news`, `events`, `gallery`, `blog`, `comments`, `donations`, `sponsorship`, `donorPortal`, `recurring`, `international`, `campaigns`, `zakatCalculator`, `admissions`, `studentPortal`, `alumniPortal`, `facebookFeed`, `search`.
- **navigation** — header groups and footer columns (editable labels (L), links).
- **home** — ordered array of home blocks with per-block `enabled`, copy (L), and references.
- **impact-stats** — counters (label (L), value, suffix, order).
- **zakat-config** — nisab method, gold/silver price (manual or API), rates, disclaimer (L).
- **donation-settings** — gateways enabled, currencies, receipt template fields, anonymous policy text (L), tax-rebate note (L).

## People & organisation

- **people** — name (L), slug, photo, roles[] (`leadership`, `faculty`, `staff`, `author`), designation (L), team (`core`, `arabic`, `tajweed`, `tarbiyah`, `language`, `computer`, `math`, `science`), subjects[] (L), bio (L), email/phone (private), social, `featuredOnHome`, order.
- **alumni-batches** — programme (rel courses), batch no, year, graduates count, note.

## Academics

- **courses** — title (L), slug, arabicTitle, shortTitle/code, type (`long`, `short`), summary (L), intro (L rich), objectives[] (L), format: durationLabel (L), residential (`residential`, `nonResidential`, `both`), gender, eligibility[] (L), specialisations[] (L) , curriculum: semesters[] { title (L), totalCredits, totalMarks, durationLabel, rows[] { sl, code, title, modules[], credits, hours, marks } }, supplementaryTable, sdpTable, topics[] (L), outcomes (L rich), downloads (rel), heroImage, `featured`, order, status.
- **intakes** — course (rel), title (L), applicationOpen/Close dates, examDate, vivaDate, seats, formSchema (which optional fields to show), fee (0 default), status (`upcoming`, `open`, `closed`, `completed`), linked notice.
- **applications** — intake (rel), applicant (rel users), personal block, education[] block, documents[] (upload), declaration, status (`submitted`, `screened`, `written`, `viva`, `admitted`, `rejected`, `waitlist`), scores, admitCardNo, staff notes, timeline[].

## Notices & content

- **notices** — title (L), slug, category (`admission`, `recruitment`, `academic`, `general`), body (L rich), publishedAt, activeFrom, activeUntil, statusOverride, attachments[] (rel media), applyLink or intake (rel), pinned.
- **posts** (blog) — title (L), slug, category (rel categories), authors (rel people), cover, excerpt (L), body (L rich), readingMinutes (computed), tags, related (rel, auto fallback), allowComments, publishedAt.
- **categories** — name (L), slug, kind (`blog`, `fatwa`, `publication`, `download`, `faq`, `video`).
- **comments** — post (rel), name, email, body, status (`pending`, `approved`, `spam`).
- **faqs** — question (L), answer (L rich), category (rel), order.
- **downloads** — title (L), file (rel media), category (`syllabus`, `form`, `dawah-material`, `prospectus`, `other`), description (L), course (rel optional), printable flag.
- **news** — title (L), slug, body (L rich), cover, gallery[], source (`manual`, `facebook`), fbPostId, publishedAt.
- **events** — title (L), slug, startsAt, endsAt, venue (L), description (L rich), cover, registrationLink, report (L rich), photos (rel album), status (computed upcoming/past).
- **albums** — title (L), slug, cover, photos[] { media, caption (L) }, event (rel optional).
- **videos** — youtubeId, title (auto + L override), thumbnail (auto), duration (auto), playlist (rel), audioOnlyUrl, description (L), topics (rel).
- **playlists** — title (L), slug, youtubePlaylistId (optional for sync), order.
- **media** — uploads (S3/MinIO), alt (L), focal point, sizes.

## Research

- **publications** — title (L), slug, type (`journal`, `magazine`, `bulletin`, `paper`, `book`), cover, file (rel media PDF), authors (rel people) + externalAuthors[], editors, publishedAt, volume/issue, isbn, issn, pages, publisher, category, abstract (L), keyFindings[] (L), keywords[], tocFile, buyLinks[] { label, url }, collectionInstructions (L), citationOverride, downloadable, shareable.
- **research-projects** — title (L), slug, goal (L), progress %, status, lead (rel people), startedAt, summary (L rich).
- **calls** — type (`papers`, `fellowship`), title (L), guidelines (L rich), deadline, submissionEnabled, submissions (rel).
- **submissions** — call (rel), name, email, affiliation, abstract, file, status.
- **topics** (clarifications) — name (L), slug, description (L), order; posts/videos/publications link to topics.
- **counter-questions** — topic or post (rel), name, email, body, status.

## Fatwa

- **fatwa-questions** — name, email, phone, category (rel), question, privateOnly, status (`new`, `assigned`, `drafted`, `reviewed`, `answered`, `published`, `rejected`), assignedTo (rel users), internalNotes, answer (rich), answeredBy (rel people), answeredAt, publishedFatwa (rel).
- **fatwas** — title (L), slug, category (rel), question (L rich, anonymised), answer (L rich), references[], mufti (rel people), reviewedBy, issuedAt, pdf (generated), tags, views.

## Donations

- **funds** — name (L), slug, kind (`zakat`, `general`, `scholarship`, `sponsorship`), description (L), zakatEligible, active, order, image.
- **campaigns** — title (L), slug, fund (rel), target, raised (computed), currency, startsAt, endsAt, description (L), cover, showOnHome.
- **donations** — donor (rel users, optional), guest { name, email, phone }, fund (rel), campaign (rel), sponsorship (rel sponsorship-profiles), amount, currency, gateway, gatewayRef, status (`initiated`, `paid`, `failed`, `refunded`), anonymous, message, receiptNo, receiptPdf, paidAt, recurringPledge (rel).
- **recurring-pledges** — donor, fund, amount, currency, interval, method (`card-token`, `reminder`), nextRunAt, status.
- **sponsorship-profiles** — student (rel students, private), publicId (e.g. AS-104), year/class, district, shortNote (L), monthlyCost, yearlyCost, sponsored %, visible.
- **sponsor-updates** — sponsorship (rel), period, resultSummary, attendancePct, report (rich), sentAt.
- **thank-you-messages** — donor (rel), from (staff/student alias), body, sentAt.

## Portals (phase 4, schema reserved now)

- **students** — user (rel), studentId, course, batch, status, enrolledAt, guardian (private), zakatEligible (private).
- **academic-records** — student, semester, results[], attendancePct, remarks.
- **alumni** — user, student (rel), graduationYear, currentRole, publicProfile flag.

## Users & roles

- **users** — email, phone, name, roles[] (`admin`, `editor`, `fatwa-board`, `finance`, `admissions`, `donor`, `applicant`, `student`, `alumni`), locale, OTP fields. Access control per role defined in `src/access/`.

## Privacy rules enforced in access control

- `sponsorship-profiles` public read exposes only `publicId, year, district, shortNote, sponsored%`.
- `donations` readable by owner + finance/admin. Public aggregates come from a computed endpoint that respects `anonymous`.
- `fatwa-questions` never public; `fatwas` strip asker identity.
- `applications` readable by owner + admissions/admin.
