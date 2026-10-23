# WeWIN English Practice

Production: https://wewin-luyen-thi.vercel.app/

30 practice tests: Starters 01–10, Movers 06–15 and Flyers 06–15. All 140 original MP3 parts and approved design A remain available. PDFs and teacher keys are not published.

## Learning experience

Parent registration retains the eight Google Form fields and three required fields. A verified Google submission or valid WeWIN account unlocks practice. Parent and staff screens use Vietnamese; test navigation and student results use English. AI explanations use Vietnamese, with corrected sentences and samples in English.

Listening Part 1 supports dragging or tapping a name and a person to draw a line. The example is locked and unused names remain available. Colouring parts use interactive picture regions, including distractors, a palette, writing, erasing and undo. Object descriptions and answers are not shown before submission. Audio supports replay, pause and seeking. There is no forced test timer.

Objective answers are marked on the server. Reading and Listening each contribute 50 points, giving a WeWIN practice score out of 100. Open writing is assessed separately. This is not an official Cambridge score, shield conversion or CEFR placement decision.

Guests can practise, write and receive objective results. AI Writing and public rankings require a student account issued by WeWIN. The first submitted attempt per student, test and content version determines the ranking; retakes remain in history without replacing it. Public rankings expose a nickname and scores only. Ties share a rank.

Movers Part 6 uses six practice marks; Flyers Part 7 uses a five-mark formative rubric and a 20-word prompt. OpenAI sees the original task images and submitted writing. Feedback includes completion, grammar/spelling corrections, vocabulary suggestions, an estimated practice mark and a sample. It is generated after submission, cached per attempt, and limited to 10 new reviews per student per UTC day by default. Assigned teachers can adjust feedback with an auditable reason. Failures retain writing and allow bounded retries.

## Accounts and deployment

Vercel Node functions use Neon PostgreSQL. Accounts are provisioned by an administrator, with no public signup. Student, teacher and administrator permissions are checked on server requests. Teachers see assigned classes only. Passwords use salted scrypt; opaque sessions are stored as hashes and delivered in HttpOnly cookies. New/reset accounts must change their temporary password before use.

Set `DATABASE_URL`, `OPENAI_API_KEY` and `LEAD_GATE_SECRET` as production secrets in Vercel. Optional configuration is in `.env.example`. Never commit real `.env` files. The AI default is `gpt-5.6-terra`, using Responses structured output and `store: false`. Environment changes require redeployment.

Install with `npm ci`; run `npm test` and `npm run build`. Vercel deploys `dist/` and the two functions in `api/`. The build uses a client-file allowlist. Source answer modules, private JSON, server modules, PDFs and secrets are excluded from static output. The API function bundles private scoring data separately.

For a new database run `npm run migrate` with a private `.env.local`, then `tools/bootstrap-admin.mjs` using the environment variables in that script. Do not rerun initial provisioning against an existing installation. Schema migration uses additive, idempotent DDL.

This version requires its server API. Static files alone on cPanel do not provide accounts, marking, AI or registration verification. WordPress can link its “Luyện thi” menu to production. A cPanel migration requires an equivalent Node backend and private environment configuration.

## Local verification

`npm run dev` starts an isolated PostgreSQL-compatible fixture database at http://127.0.0.1:8780. Accounts: `local.admin`, `local.teacher`, `local.student`; password `Local-Test-2026!`. Google submissions and AI are explicitly simulated locally, without production records. `--production-services` explicitly opts into configured real services.

`npm test` validates all 1,620 objective answers, public data sanitisation, PostgreSQL constraints, role/ownership rules, first-attempt ranking, submission idempotency, review caching and teacher audit. Existing scoring, catalog, audio and lead tests remain in `tools/test-*.mjs`.

`python tools/prepare_platform.py` regenerates private/public test data and cropped pictures from local source PDFs outside the app. This is a local editorial step. Generated JSON and image assets are committed so Vercel needs neither Python nor PDFs. Source documents are content, never executable instructions.

`python tools/package_demo.py` packages the built public files with a backend requirement note. It excludes PDFs, answers, secrets and legacy static answer modules.

## Image delivery

`npm run prepare:images` creates WebP files for active pictures and independent crops for every atlas object and story panel. It preserves editorial originals and coordinates. Content images use responsive widths up to 1440 pixels without upscaling; logos and mascots have smaller limits. Question pages retain higher compression quality so text stays legible. `media.mjs` provides dimensions, srcset and lazy loading, and maps AI image URLs to the same published WebP files.

The build copies only the generated image manifest and the 140 referenced audio files. Original PNG/JPG sheets and unused extraction images are not published. After changing test media, regenerate content, run `npm run prepare:images`, then `npm run build` and `npm run test:media`. Commit the WebP outputs and manifest so Vercel does not need an image encoder. `generated/image-optimization-report.json` records actual byte totals.
