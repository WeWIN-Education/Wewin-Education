# Practice platform implementation

Approved scope: the 2026-10-21/23 conversation plan. Keep visual direction A and all original media. Add English exam UI, picture interactions, server scoring, accounts, ranking and formative AI writing.

## Inspected baseline

- ES modules + CSS, separate Starters and Movers/Flyers renderers; all answers and samples are currently shipped in static modules.
- Vercel Node function only handles Google lead submission. Attempts are sessionStorage-only. Other backend/frontend directories belong to a different management application and are excluded.
- Production environment listing on 2026-10-23 has LEAD_GATE_SECRET only. DATABASE_URL, OPENAI_API_KEY and initial administrator are not configured. Do not fabricate working remote services.

## Boundary corrections

- High: browser scoring and public answer keys cannot support trustworthy ranking. Build an allowlisted public dist; private catalog/answer keys remain server-side. Server calculates all persisted scores.
- High: server authorization is required for ownership, classes, AI entitlement and account administration; hiding buttons is insufficient.
- Medium: picture data lacks coordinate metadata. Generate explicit public hit regions/examples and private associations, verify against source pages. No descriptive answer choices in Listening 1/5.
- Medium: current draft format is obsolete. New attempts carry an exam version; old browser scores never enter rankings.

## Chosen implementation

One vanilla frontend, one Vercel API router, Neon Postgres via a server-only driver. Opaque HttpOnly session cookies, Node scrypt password hashing, SQL transactions/constraints for idempotent submission and first-attempt ranking. Guest lead cookie remains separate from authenticated access. Public aliases only in ranking.

Student writes -> submitted attempt -> persisted writing review job -> OpenAI Responses (images + structured JSON) -> formative feedback. Teacher override preserves AI original and audit history. No OpenAI request for guests. Missing service configuration returns explicit unavailable errors; never falls back to mock success in production.

## Validation contract

Regression: 40 tests / 2,300 objective answers / 80 separate Writing tasks, original 140 audio parts plus 50 added Part tracks. Validate no keys in public output, role/owner boundaries, first-submission races, duplicate requests, model failures and picture transforms. Browser QA through cua_repl at desktop/tablet/mobile, both themes.

## Connected services and verification · 23 October 2026

The owner authorised the supplied OpenAI key and Neon account thanhnhanngo153@gmail.com. The new Singapore Neon project has the actual migrated schema, one administrator, one teacher and an empty class. No fictional students or rankings were inserted into production. Temporary credentials are outside the repository and must be changed by their owner at first login. Production secrets were saved through Vercel's sensitive environment settings; local copies are ignored.

A real OpenAI Responses request against the original Flyers writing image returned valid structured feedback in all five sections. Automated tests use isolated PGlite PostgreSQL and cover 2,300 objective answers across 40 tests, ownership, assigned-class access, forced password changes, CSRF rejection, duplicate/concurrent submission, first-attempt ranking, guest exclusion and teacher review audit. Local browser checks use clearly labelled simulated AI, separate from this real provider smoke test.

Remaining operational limit: WeWIN must issue actual student accounts and enrol them into classes before student history, AI entitlements and rankings can be used by those learners. Scores are formative practice scores, not official Cambridge or CEFR placement results.
