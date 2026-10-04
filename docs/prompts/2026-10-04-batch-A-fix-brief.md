# Follow-up brief — batch A review fixes

You built the first five modules of the As-Sunnah Dawah & Research Institute website (pull requests #5 to #9 on `https://github.com/sharif418/asdri-web`). We reviewed them properly: rebuilt the database from your migration chain, ran your seed, read the code, and went through every page in Bangla and English on a phone and a desktop. This note tells you what we found and what to do next. Same repository, same token as before: `<GITHUB_TOKEN>`

## First, the honest verdict

The work is good. The courses pages are exactly what the brief hoped for: the facts in the margin, the curriculum as a ruled table that stacks on a phone, totals computed from the rows, all seven programmes carried over from the client's document. The notice board, the faculty directory, the admissions steps, the FAQ, the downloads, the contact page: all of it reads like one site made by one hand, and nothing in it looks like a template. You kept the client's Bangla verbatim almost everywhere, marked sample content as নমুনা, wrote honest pull-request descriptions, and documented your decisions. PR #5 (people) is already merged on `main`.

What follows is not a rejection. It is the second pass every serious piece of work gets.

## Where the full review lives

Start by pulling `main`; it moved while you were working. The complete review, with file paths and the reasoning behind each point, is in `docs/prompts/2026-10-04-batch-A-review.md`. Read it before you touch code. The summary below is so you know what you are walking into, not a substitute for reading it.

## What needs fixing

Seven things block merging; five more should be done in the same pass.

The blocking ones. On the home page the Campus Life list breaks when an item has no image, because the component reserves an image column anyway and the text gets squeezed into it. The heading of the dark-green support band is set in dark ink, so it is nearly invisible. The home page carries two gold elements (the hero hairline and the gold donate button) where the design allows one. The "গবেষণা ও প্রকাশনা" menu item has no children left once the module flags hide them, so it renders as a plain link to a page that does not exist; a parent whose children are all hidden should disappear. Unknown multi-segment URLs show Next's raw 404 instead of our designed one, so a catch-all route is needed under the locale segment. Your migration snapshot baseline is a sound idea that nobody will understand in six months unless it is written down in `infra/README.md`. And two of the client's strings were changed without being flagged: "আবেদন ফর্মে" became "আবেদন ফরমে" (the source is right, put it back) and a real typo "জেনারলেদের" was corrected (keep the correction, but say so in the pull request and in the field's admin description, so the office can confirm).

The should-fix ones. The faculty page ends with three empty-state blocks in a row; hide the catch-all group when it is empty and collapse an empty named team to one quiet line. "Campus Life" and "মূল লক্ষ্য (Vision)" are English headings on the Bangla site; seed Bangla ones and keep the client's forms in the English locale. The three vision pillars are missing in Bangla; add marked drafts rather than leaving the primary language empty. The courses collection file and the courses seed have grown large; split them into field modules and one file per course. And confirm the English 404 and empty states under `/en`.

## Order of work, and the one mechanical thing to expect

Because `main` now contains PR #5 as a squash commit, every remaining branch conflicts with it in the generated files and in the few files every module touches. Work in order: **#6 courses, then #7 notices, then #8 home, then #9 institutional pages**. For each branch, merge the current `main` in first. Regenerate `src/payload-types.ts` with `bun run generate:types`, rebuild `src/migrations/index.ts` from the migration files that are present, and in `src/payload.config.ts`, `src/endpoints/seed/index.ts` and the two dictionaries keep both sides' additions. Then apply the fixes that belong to that pull request, run lint, type check and build, re-shoot the affected pages into `docs/review/`, and push. Add a "Review fixes" section to each pull request description that lists what you changed against the numbered items in the review. We merge in that order, so #7 will need `main` merged again after #6 lands, and so on; that is expected.

One thing to know: while resolving #6 ourselves we briefly pushed a broken merge commit to `feat/courses` and then restored the branch to your original commit `d0724e3`. Nothing of yours was lost; just pull before you start.

## The bar has not moved

Everything from the first brief still applies: Bangla copied from `docs/source`, every string through the dictionaries, every query with a locale, ruled rows not cards, one gold per screen, designed empty states, small focused files, no new dependencies, no changes to the stack, tokens, routing or infrastructure. When you fix a page, look at it again the way the client will, in both languages, on a phone and a desktop, and ask whether a serious institution would publish it. If the answer is yes, push.

When the four pull requests are updated, stop. The next brief (admissions forms, donations, blog, gallery, contact form) comes after they are merged.
