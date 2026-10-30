# WeWIN English Practice

Production: https://exam.wewin.edu.vn/

60 practice tests: Starters 06–15 and Hard Starters 16–25, Movers 06–15 and Hard Movers 16–25, Flyers 06–15 and Hard Flyers 16–25. The previous Starter set and its practice records were cleared before these replacement tests were added. All 280 individual Part MP3 tracks are available. PDFs, teacher keys and Speaking material are not published.

## Learning experience

The Cambridge workspace now uses a sticky brand header, desktop sidebar and a native mobile navigation drawer. Overview highlights a resumable draft, level choices and recent results. The practice library has illustrated rows, live search, level filters and real draft/submitted states. Personal results are at `?screen=history`; detailed test results and the English exam workspace keep their existing routes. No XP, streaks or daily missions are displayed.

Teachers/admins can use the read-only “Nhật ký bài làm” in Management to filter attempts by student and status, page through start/submission times and open a saved result. Teachers are restricted to assigned classes in SQL and the API. The journal derives from existing attempts, with no database schema changes; it does not invent historic login/logout or device/IP records.

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

`npm test` validates all 3,340 objective answers, public data sanitisation, PostgreSQL constraints, role/ownership rules, first-attempt ranking, submission idempotency, review caching and teacher audit. `npm run test:starters` checks Starters 06–15 and Hard 16–25 with 80 Part tracks. `node tools/test-flyers-hard.mjs` and `npm run test:movers-hard` check the other advanced sets and their 100 QA-approved Part tracks. Existing scoring, catalog, audio and lead tests remain in `tools/test-*.mjs`.

`npm run test:ui` checks progress deduplication, content versions, resumable draft actions and escaped learner data. `npm run test:client` smoke-tests complete frontend rendering and route actions with stubbed browser primitives and services; it is not a visual/browser test. Role-scoped activity access and filters are covered by real PostgreSQL tests in `npm test`. The visual system is documented in `design-system/wewin-cambridge/MASTER.md`.

`python tools/prepare_flyers_hard.py` imports Hard Flyers 16–25 from the external source PDFs, answer key and supplied Part MP3s, checking all 50 audio files against the PASS QA manifest. It writes an intermediate `flyers-hard.mjs` and question-page images locally. Then `python tools/prepare_platform.py` regenerates the combined private/public test data and cropped interaction pictures. If the source pack is in another folder, pass `--hard-pack-dir <path>` to the latter. These are local editorial steps. Generated JSON and media are committed so Vercel needs neither Python nor PDFs.

The ten Hard Flyers mocks are marked as advanced practice inside the Flyers catalog. Each has 43 auto-marked Reading questions and 25 Listening questions; the story task remains separate Writing feedback. Speaking pages, answer keys and source PDFs stay out of the public site. The fifty Part MP3s passed the supplied audio QA report and are copied byte-for-byte.

The ten Hard Movers mocks are marked the same way in the Movers catalog. Each has 29 auto-marked Reading questions and 25 Listening questions; the six-answer Part 6 task remains separate AI writing feedback. Speaking pages, answer keys and source PDFs stay out of the public site. The fifty supplied Part MP3s passed the audio QA manifest and are copied byte-for-byte; Full Test mixes are not published.

Starters 06–15 and Hard 16–25 each contain 25 auto-marked Reading & Writing questions and 20 Listening questions. Part 1 matches names to characters, Part 4 uses the same uncropped colouring picture with target regions aligned to the objects, and all four individual MP3s play by Part. Hard Starter audio was checked against its PASS manifest. Full Test mixes, Speaking, PDFs and answer keys are not published.

`python tools/package_demo.py` packages the built public files with a backend requirement note. It excludes PDFs, answers, secrets and legacy static answer modules.

## Image delivery

`npm run prepare:images` creates WebP files for active pictures and independent crops for every atlas object and story panel. It preserves editorial originals and coordinates. Content images use responsive widths up to 1440 pixels without upscaling; logos and mascots have smaller limits. Question pages retain higher compression quality so text stays legible. `media.mjs` provides dimensions, srcset and lazy loading, and maps AI image URLs to the same published WebP files.

The build copies only the generated image manifest and the 280 referenced audio files. Original PNG/JPG sheets and unused extraction images are not published. After changing test media, regenerate content, run `npm run prepare:images`, then `npm run build` and `npm run test:media`. Commit the WebP outputs and manifest so Vercel does not need an image encoder. `generated/image-optimization-report.json` records actual byte totals.

The globe button in the header and parent registration dialog switches interface copy between Vietnamese and English, persisting `wewin-language` locally. Localisation translates authored UI literals only; exam text, images, audio, answers, names and Google Form option values retain their original data. Switching language preserves the active screen and unsaved interface fields.
