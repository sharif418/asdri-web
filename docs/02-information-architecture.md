# 02 — Information architecture and routes

Locale prefix: default `bn` without prefix, English under `/en/...`.

## Header

- **Utility bar:** phone · email · location | BN | EN | Login | Register
- **Main nav:** Logo + "আস-সুন্নাহ দাওয়াহ অ্যান্ড রিসার্চ ইনস্টিটিউট" | Home | About Us ▾ | Academics ▾ | Admissions ▾ | Research & Publications ▾ | Media & Resources ▾ | Notices ▾ | Contact ▾ | **[Support Us]** (filled CTA)
- Mobile: full-screen drawer with accordion groups; Donate stays visible as a sticky bottom button.

## Route inventory

| Nav | Route | Page type | Data |
|-----|-------|-----------|------|
| Home | `/` | composed sections | globals + latest items |
| About ▸ Vision & Objectives | `/about` | editable page | page builder |
| About ▸ Leadership & Administration | `/about/leadership` | list | `people` (role=leadership) |
| About ▸ Campus & Facilities | `/about/campus` | editable page | page builder + gallery |
| About ▸ Alumni Association | `/about/alumni` | editable page + stats | `alumni-batches` |
| Academics ▸ Courses | `/academics/courses` | index | `courses` |
| Academics ▸ Course | `/academics/courses/[slug]` | course template | `courses` |
| Academics ▸ Faculty & Teachers | `/academics/faculty` | directory | `people` (role=faculty) grouped by team |
| Academics ▸ Faculty profile | `/academics/faculty/[slug]` | profile | `people` + `publications` + `posts` |
| Academics ▸ Student Development Programs | `/academics/student-development` | editable page | page builder + table |
| Academics ▸ Download Center | `/downloads` | filterable list | `downloads` |
| Admissions ▸ Admission Process | `/admissions` | editable page | page builder |
| Admissions ▸ Scholarships & Financial Aid | `/admissions/scholarships` | editable page | page builder |
| Admissions ▸ Admission Notices | `/notices?category=admission` | filtered list | `notices` |
| Admissions ▸ FAQs | `/faq` | accordion | `faqs` |
| Admissions ▸ Apply | `/apply/[intake]` | multi-step form | `intakes`, `applications` |
| Admissions ▸ My application | `/account/applications` | portal | auth |
| Research ▸ Library & Journals | `/research/library` | list + reader | `publications` (type=journal/magazine/bulletin) |
| Research ▸ Publication | `/research/library/[slug]` | reader page | `publications` |
| Research ▸ Research Projects & Fellowships | `/research/projects` | list | `research-projects`, `calls` |
| Research ▸ Faculty Publications & Books | `/research/books` | grid | `publications` (type=book) |
| Research ▸ Intellectual Clarifications | `/research/clarifications` | topic hub | `topics`, `posts`, `videos`, `publications` |
| Research ▸ Fatwa & Online Queries | `/fatwa` | search + ask | `fatwas`, `fatwa-questions` |
| Research ▸ Fatwa detail | `/fatwa/[slug]` | answer + PDF | `fatwas` |
| Media ▸ Blog | `/blog`, `/blog/[slug]` | list, article | `posts` |
| Media ▸ Videos & Podcasts | `/media/videos` | playlists | `videos`, `playlists` |
| Media ▸ News & Events | `/news`, `/news/[slug]`, `/events`, `/events/[slug]` | list, detail | `news`, `events` |
| Media ▸ Photo Gallery | `/gallery`, `/gallery/[album]` | albums, masonry | `albums`, `media` |
| Media ▸ Dawah Materials | `/downloads?category=dawah-materials` | filtered list | `downloads` |
| Notices | `/notices`, `/notices/[slug]` | board, detail | `notices` |
| Support Us | `/donate` | fund cards + form | `funds`, `campaigns` |
| Support Us ▸ Zakat Fund etc. | `/donate?fund=zakat` | preselected | `funds` |
| Support Us ▸ Sponsor a Student | `/donate/sponsor` | list + form | `sponsorship-profiles` |
| Support Us ▸ Zakat Calculator | `/zakat-calculator` | tool | config global |
| Support Us ▸ Donor portal | `/account/donations` | portal | auth |
| Contact ▸ Contact & Location | `/contact` | page + form | global + `contact-messages` |
| Contact ▸ Other Websites | `/contact/other-websites` | links | global |
| Auth | `/login`, `/register`, `/account` | auth | users |
| Admin | `/admin` | Payload | — |
| System | `/sitemap.xml`, `/robots.txt`, `/api/*` | — | — |

## Home page section order (from client doc)

1. Hero  2. Impact counters  3. Vision & pillars  4. Featured programmes  5. Refutations highlight  6. Notices feed  7. Campus life  8. Media & knowledge hub  9. Leadership & faculty  10. Support Us bar  11. Fatwa gateway  12. Footer

Each home section is a block in the `home` global so admin can reorder, hide, or edit copy.
