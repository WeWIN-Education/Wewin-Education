# Release: Starters/Movers 40–49 and KET 18 November edition

The user requested upload of three supplied packs on 2026-11-18.

- Add ten `starters-40`–`starters-49` papers (25 Reading, 20 Listening each).
- Add ten `movers-40`–`movers-49` papers (29 objective Reading, 25 Listening, six separate Writing answers each).
- Add ten `ket-20261118-01`–`ket-20261118-10` papers (30 objective Reading, 25 Listening, two teacher-assessed Writing tasks each).
- The supplied KET book revises existing Mock 01–10, including several different gap questions/keys. Its new IDs and “Bản 18/11” titles preserve all earlier paper versions, attempts and rankings.
- Preserve all 80 previous private/public test records exactly.
- Importer: `tools/import_20261118_packs.py`; reviewed colouring centres: `tools/ms40-colour-map.json`.
- New test data: `packs20261118.mjs` and appended generated private/public catalogs. Logical asset namespace: `packs20261118/`. Responsive WebP namespace: `optimized/packs20261118/`.
- Import 140 individual Listening Part recordings with SHA-256 source/output identity records, duration comparison and full decoding. This is technical audio validation, not a transcription/pronunciation review.
- Keep the new KET teacher documents under `server/materials/ket20261118/`, outside static output.
- Correct only Starters 40 Reading Part 5 question 1 in the web rendition: “What animal is near the pond?” (answer “frog”). The supplied PDF's “What is near the frog?” does not fit that key. Render the corrected question into the reference page and the answer form; never overwrite the user's source PDF.
- For its “Where is the frog?” question, accept “rock” and “stone” as well as the supplied “pond”: the picture shows the frog on a rock beside the pond.
- Show the supplied colouring example as a fixed overlay and exclude it from editable regions so it cannot consume a learner's answer allowance.

Speaking source materials remain in the supplied packs. This release extends the website's established Reading/Writing and Listening workflow.
