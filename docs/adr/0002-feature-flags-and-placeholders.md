# ADR-0002 — Build everything behind feature flags with designed placeholders

**Status:** accepted · **Date:** 2026-10-03

## Context

The client's documents specify ~15 modules but leave several decisions and much content open (see gap register). Waiting for answers would stall the build; shipping half-features would look unprofessional.

## Decision

- Every module has an `enabled` flag in the `site-settings` global. Disabled modules vanish from navigation, routes return 404, sitemap and search exclude them.
- Every list/detail page has a designed empty state. Staff see an "add content" link in empty states when logged in.
- Client-supplied text is seeded verbatim from `docs/source/*.extracted.txt`; where content is missing, the seed inserts a clearly marked placeholder in Bangla ("তথ্য শীঘ্রই যুক্ত হবে") and an admin-only note.
- Unknown business decisions are implemented as configuration (gateway adapter, domain, currencies, fatwa roles) with safe defaults.

## Consequences

- The client reviews a complete live system and fills gaps in context rather than answering a questionnaire.
- Slight extra work for empty states and flags, repaid by fewer rework cycles.
- Agents and developers must consult the gap register instead of inventing behaviour.
