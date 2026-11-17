# Flyers 40–49 — release prepared on 2026-11-17

Source pack: `C:\Users\wewin2026\Downloads\WeWIN_Flyers_40-49_Full_Pack (1)`.

The user supplied the final audio, replaced Test 49 Listening Part 3 themselves, and explicitly requested publication after verification. The earlier hold on Git/deployment is superseded. Use only the user-supplied recordings; the assistant-generated draft in `output/flyers40-audio-review/` is discarded and excluded from Git and deployment.

- Ten tests, `flyers-40` through `flyers-49`: 430 objective Reading & Writing questions, 250 Listening questions and ten separately assessed Writing tasks.
- Runtime data: `flyers40.mjs`, `generated/exams-private.json`, `generated/exams-public.json`, `public-data.mjs`.
- Pictures: 320 responsive WebP files under `assets/optimized/flyers40/`, referenced by `media-manifest.mjs`.
- Listening: 50 Part recordings under `assets/flyers40/40` through `assets/flyers40/49`; the audio version includes a source-content hash so changed recordings invalidate cached tracks.
- Audio review: `generated/flyers40-audio-review.json`; imported-file hashes, durations and byte counts: `generated/flyers40-audio.json`.
- The user's revised Test 49 Part 3 SHA-256 is `ce6d6943af1f8fcc629aa76d80dc4db143a91df7e37d14da7f7a6f610531d4b5`. Both occurrences are now recognized as “pilot” by the first-pass and larger English recognizer.
- The review covered 90 Part recordings with local speech recognition, 110 final files with decoding checks, and 20 full mixes with ordered-Part envelope comparison. This checks content and file integrity; it does not certify every pronunciation.
- Full mixes and Speaking source recordings are retained in the supplied pack. The website continues its existing Reading/Writing and Listening workflow using individual Listening Parts.
- All 70 previous test objects must remain unchanged. The earlier Mock 16 key correction is preserved.

Reimport content with `tools/import_flyers40.py`; source placeholder person coordinates are ignored in favor of the reviewed `tools/flyers40-picture-map.json`. Reimport audio with `tools/import_flyers40_audio.py --review generated/flyers40-audio-review.json`; it checks the source hashes before encoding. The content importer preserves already reviewed audio only when the task-data source hash is unchanged.

Audio recognition models, transcripts and discarded repair drafts remain under ignored `tmp/` and `output/` folders and are excluded from the public build.
