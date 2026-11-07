import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createStorylandUI} from '../storyland.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('StoryLand catalog, compressed WebP artwork, MP3 audio and word cues exist and are valid', async () => {
  const catalogRaw = await readFile(resolve(root, 'storyland/data.json'), 'utf8');
  const catalog = JSON.parse(catalogRaw);
  assert.equal(catalog.stories.length, 50);
  assert.equal(Object.keys(catalog.assets).length, 956);

  for (const [key, rel] of Object.entries(catalog.assets)) {
    assert.match(rel, /^assets\/[\w-]+\.webp$/, `Asset ${key} should point to WebP`);
    const fileStat = await stat(resolve(root, 'assets/storyland', rel.replace(/^assets\//, '')));
    assert.ok(fileStat.size > 200, `Empty WebP image for ${key}`);
  }

  for (const story of catalog.stories) {
    assert.ok(story.id && story.titleEn && story.titleVi);
    assert.ok(Array.isArray(story.scenes) && story.scenes.length > 0);
    assert.equal(story.audioSrc, `assets/storyland/audio/${story.id}.mp3`);
    assert.equal(story.cuesSrc, `assets/storyland/audio/${story.id}.cues.json`);
    const mp3Stat = await stat(resolve(root, story.audioSrc));
    assert.ok(mp3Stat.size > 1024, `Missing or empty MP3 for ${story.id}`);
    const cuesRaw = JSON.parse(await readFile(resolve(root, story.cuesSrc), 'utf8'));
    assert.ok(Array.isArray(cuesRaw.cues) && cuesRaw.cues.length > 0, `Missing cues for ${story.id}`);
  }
});

test('StoryLand UI renders library, filters stories, opens reader, toggles translation and bookmarks', async () => {
  const catalog = JSON.parse(await readFile(resolve(root, 'storyland/data.json'), 'utf8'));
  const firstStory = catalog.stories[0];
  const firstCues = JSON.parse(await readFile(resolve(root, firstStory.cuesSrc), 'utf8'));

  globalThis.localStorage = {
    store: new Map(),
    getItem(k) { return this.store.get(k) ?? null; },
    setItem(k, v) { this.store.set(k, String(v)); },
  };
  globalThis.matchMedia = () => ({matches: false});
  globalThis.fetch = async url => {
    if (String(url).includes('storyland/data.json')) {
      return {ok: true, json: async () => catalog};
    }
    if (String(url).includes('.cues.json')) {
      return {ok: true, json: async () => firstCues};
    }
    throw new Error('Unexpected fetch: ' + url);
  };

  let html = '';
  const ui = createStorylandUI({
    redraw() {
      html = ui.render();
    },
  });

  html = ui.render();
  assert.match(html, /WEWIN STORYLAND/);
  await new Promise(r => setTimeout(r, 30));
  assert.match(html, /50 truyện song ngữ|50 bilingual stories/);
  assert.match(html, new RegExp(firstStory.titleEn));

  await ui.handleAction('storyland-open', {id: firstStory.id});
  assert.match(html, /storyland-reading/);
  assert.match(html, new RegExp(firstStory.titleEn));
  assert.match(html, /storyland-word/);
  assert.match(html, /storyland-player/);

  await ui.handleAction('storyland-translation');
  assert.match(html, /storyland-vietnamese-line is-hidden/);

  await ui.handleAction('storyland-save', {id: firstStory.id});
  assert.match(html, /aria-pressed="true"/);

  await ui.handleAction('storyland-back');
  assert.doesNotMatch(html, /storyland-reading/);
});
