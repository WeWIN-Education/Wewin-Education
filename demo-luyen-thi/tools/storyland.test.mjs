import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createStorylandUI} from '../storyland.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

function createMockDOM(initialHTML = '') {
  const listeners = new Map();
  const streamListeners = new Map();
  const nodesBySelector = new Map();

  const followBtn = {
    id: 'storyland-follow-btn',
    hidden: true,
    attrs: new Map([['aria-pressed', 'true']]),
    classes: new Set(['storyland-follow-btn', 'is-following']),
    classList: {
      toggle(cls, force) {
        if (force) followBtn.classes.add(cls);
        else followBtn.classes.delete(cls);
      },
      contains(cls) { return followBtn.classes.has(cls); },
    },
    setAttribute(k, v) { this.attrs.set(k, String(v)); },
    getAttribute(k) { return this.attrs.get(k); },
  };

  const scrollCalls = [];
  const stream = {
    id: 'storyland-scenes-stream',
    scrollTop: 0,
    clientHeight: 480,
    scrollHeight: 1600,
    clientWidth: 620,
    scrollCalls,
    scrollTo(opts) {
      this.scrollTop = opts.top ?? 0;
      scrollCalls.push(opts);
    },
    getBoundingClientRect() {
      return {top: 120, height: 480};
    },
    addEventListener(type, cb) {
      if (!streamListeners.has(type)) streamListeners.set(type, new Set());
      streamListeners.get(type).add(cb);
    },
    dispatch(type, event = {}) {
      const set = streamListeners.get(type);
      if (set) set.forEach(cb => cb(event));
    },
  };

  const activeImg = {
    id: 'storyland-active-img',
    attrs: new Map([['src', '']]),
    setAttribute(k, v) { this.attrs.set(k, String(v)); },
    getAttribute(k) { return this.attrs.get(k) || ''; },
    removeAttribute(k) { this.attrs.delete(k); },
  };

  const sceneFrame = {
    id: 'storyland-scene-frame',
    classes: new Set(['storyland-scene-image']),
    attrs: new Map(),
    style: {
      props: new Map(),
      setProperty(k, v) { this.props.set(k, String(v)); },
    },
    classList: {
      add(c) { sceneFrame.classes.add(c); },
      remove(c) { sceneFrame.classes.delete(c); },
      contains(c) { return sceneFrame.classes.has(c); },
    },
    setAttribute(k, v) { this.attrs.set(k, String(v)); },
  };

  const playerEl = {
    classes: new Set(['storyland-player']),
    classList: {
      toggle(c, force) {
        if (force) playerEl.classes.add(c);
        else playerEl.classes.delete(c);
      },
      contains(c) { return playerEl.classes.has(c); },
    },
  };

  const playerStatus = {textContent: ''};
  const playerTitle = {textContent: ''};
  const caption = {textContent: ''};
  const seekInput = {id: 'storyland-seek', value: '0', disabled: false};
  const timeCurrent = {textContent: '00:00'};
  const timeTotal = {textContent: '00:00'};
  const grid = {innerHTML: ''};
  const resultCount = {textContent: ''};
  const resetInline = {hidden: true};
  const clearSearchBtn = {hidden: true};
  const searchInput = {id: 'storyland-search', value: '', focus() {}};

  const rateButtons = [0.75, 1, 1.25, 1.5].map(rate => {
    const btn = {
      dataset: {value: String(rate)},
      classes: new Set(['storyland-rate-btn', ...(rate === 1 ? ['is-active'] : [])]),
      attrs: new Map([['aria-pressed', String(rate === 1)]]),
      classList: {
        toggle(c, force) {
          if (force) btn.classes.add(c);
          else btn.classes.delete(c);
        },
        contains(c) { return btn.classes.has(c); },
      },
      setAttribute(k, v) { this.attrs.set(k, String(v)); },
      getAttribute(k) { return this.attrs.get(k); },
    };
    return btn;
  });

  const sceneItems = Array.from({length: 25}, (_, idx) => {
    const item = {
      id: `storyland-scene-${idx}`,
      offsetTop: idx * 140,
      offsetHeight: 120,
      classes: new Set(['storyland-scene-item', ...(idx === 0 ? ['is-active'] : [])]),
      classList: {
        add(c) { item.classes.add(c); },
        remove(c) { item.classes.delete(c); },
        toggle(c, force) {
          if (force) item.classes.add(c);
          else item.classes.delete(c);
        },
        contains(c) { return item.classes.has(c); },
      },
      getBoundingClientRect() {
        return {top: 120 + idx * 140 - stream.scrollTop, height: 120};
      },
    };
    return item;
  });

  const activeWords = new Map();
  function getWordNode(scene, word) {
    const key = `${scene}:${word}`;
    if (!activeWords.has(key)) {
      const node = {
        scene,
        word,
        classes: new Set(['storyland-word']),
        classList: {
          add(c) { node.classes.add(c); },
          remove(c) { node.classes.delete(c); },
          contains(c) { return node.classes.has(c); },
        },
      };
      activeWords.set(key, node);
    }
    return activeWords.get(key);
  }

  const host = {
    html: initialHTML,
    stream,
    followBtn,
    activeImg,
    sceneFrame,
    playerEl,
    playerStatus,
    seekInput,
    grid,
    resultCount,
    resetInline,
    clearSearchBtn,
    searchInput,
    rateButtons,
    sceneItems,
    activeWords,
    addEventListener(type, cb) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(cb);
    },
    dispatch(type, event = {}) {
      const set = listeners.get(type);
      if (set) set.forEach(cb => cb(event));
    },
    querySelector(sel) {
      if (sel === '#storyland-scenes-stream') return stream;
      if (sel === '#storyland-follow-btn') return followBtn;
      if (sel === '#storyland-active-img') return activeImg;
      if (sel === '#storyland-scene-frame') return sceneFrame;
      if (sel === '.storyland-player') return playerEl;
      if (sel === '.storyland-player-status') return playerStatus;
      if (sel === '.storyland-player-label strong') return playerTitle;
      if (sel === '#storyland-scene-caption') return caption;
      if (sel === '#storyland-seek') return seekInput;
      if (sel === '#storyland-time-current') return timeCurrent;
      if (sel === '#storyland-time-total') return timeTotal;
      if (sel === '#storyland-grid') return grid;
      if (sel === '#storyland-result-count') return resultCount;
      if (sel === '#storyland-reset-inline') return resetInline;
      if (sel === '#storyland-search-clear') return clearSearchBtn;
      if (sel === '#storyland-search') return searchInput;
      if (sel.startsWith('#storyland-scene-')) {
        const idx = Number(sel.replace('#storyland-scene-', ''));
        return sceneItems[idx] || null;
      }
      const wordMatch = sel.match(/\.storyland-word\[data-scene="(\d+)"\]\[data-word="(\d+)"\]/);
      if (wordMatch) return getWordNode(Number(wordMatch[1]), Number(wordMatch[2]));
      return nodesBySelector.get(sel) || null;
    },
    querySelectorAll(sel) {
      if (sel === '.storyland-scene-item') return sceneItems;
      if (sel === '.storyland-scene-item.is-active') return sceneItems.filter(item => item.classes.has('is-active'));
      if (sel === '.storyland-word.is-speaking') {
        return [...activeWords.values()].filter(w => w.classList.contains('is-speaking'));
      }
      if (sel === '[data-action="storyland-rate"]') return rateButtons;
      return [];
    },
  };

  return host;
}

test('StoryLand catalog, high-res WebP artwork, responsive srcset variants, MP3 audio and word cues exist and are valid', async () => {
  const catalogRaw = await readFile(resolve(root, 'storyland/data.json'), 'utf8');
  const catalog = JSON.parse(catalogRaw);
  assert.equal(catalog.stories.length, 50);
  assert.equal(Object.keys(catalog.assets).length, 956);
  assert.equal(Object.keys(catalog.assetMeta).length, 956);

  for (const [key, rel] of Object.entries(catalog.assets)) {
    assert.match(rel, /^assets\/(?:artwork-v2\/)?[\w-]+\.(?:webp|jpg)$/, `Asset ${key} should point to an optimized image or original JPEG`);
    const fileStat = await stat(resolve(root, 'assets/storyland', rel.replace(/^assets\//, '')));
    assert.ok(fileStat.size > 200, `Empty WebP image for ${key}`);
    const meta = catalog.assetMeta[key];
    assert.ok(meta && meta.w > 100 && meta.h > 100, `Missing intrinsic dimensions for ${key}`);
    if (meta.src360) {
      const smallStat = await stat(resolve(root, 'assets/storyland', meta.src360.replace(/^assets\//, '')));
      assert.ok(smallStat.size > 200, `Empty 360w WebP variant for ${key}`);
    }
    if (meta.src2x) {
      assert.equal(meta.w2x, meta.w * 2);
      assert.equal(meta.h2x, meta.h * 2);
      assert.ok((await stat(resolve(root, 'assets/storyland', meta.src2x.replace(/^assets\//, '')))).size > 200);
    }
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

test('StoryLand UI eliminates dropdowns, combines filters with empty state, and supports 0.75x/1x/1.25x/1.5x speed buttons', async () => {
  const catalog = JSON.parse(await readFile(resolve(root, 'storyland/data.json'), 'utf8'));
  const firstStory = catalog.stories[0];
  const firstCues = JSON.parse(await readFile(resolve(root, firstStory.cuesSrc), 'utf8'));

  globalThis.localStorage = {
    store: new Map(),
    getItem(k) { return this.store.get(k) ?? null; },
    setItem(k, v) { this.store.set(k, String(v)); },
  };
  globalThis.matchMedia = () => ({matches: false});
  globalThis.window = {innerWidth: 1440, scrollY: 0, scrollTo() {}};
  globalThis.fetch = async url => {
    if (String(url).includes('storyland/data.json')) return {ok: true, json: async () => catalog};
    if (String(url).includes('.cues.json')) return {ok: true, json: async () => firstCues};
    throw new Error('Unexpected fetch: ' + url);
  };

  let html = '';
  const mockHost = createMockDOM();
  const ui = createStorylandUI({
    redraw() {
      html = ui.render();
      mockHost.html = html;
      ui.mount(mockHost);
    },
  });

  html = ui.render();
  await new Promise(r => setTimeout(r, 30));

  // Requirement 1: Zero <select> dropdowns in Library view
  assert.doesNotMatch(html, /<select\b/i, 'Library view must not contain any <select> dropdown');
  assert.match(html, /data-action="storyland-filter"/);
  assert.match(html, /data-action="storyland-level"/);
  assert.match(html, /data-action="storyland-progress"/);

  // Requirement 2: Images have width, height, srcset, sizes, and lazy loading on cards
  assert.match(html, /loading="lazy" decoding="async" width="\d+" height="\d+"/);
  assert.match(html, /srcset="assets\/storyland\//);

  // Combinable filters: Category + Level + Progress + Search Query
  await ui.handleAction('storyland-filter', {value: firstStory.category});
  await ui.handleAction('storyland-level', {value: firstStory.level});
  assert.match(mockHost.grid.innerHTML, /storyland-card/);
  assert.match(mockHost.grid.innerHTML, new RegExp(firstStory.id));

  // Filter to empty state (Saved when nothing saved yet)
  await ui.handleAction('storyland-progress', {value: 'saved'});
  assert.match(mockHost.grid.innerHTML, /storyland-empty/);
  assert.match(mockHost.grid.innerHTML, /data-action="storyland-reset-filters"/);

  // Reset filters restores full catalog
  await ui.handleAction('storyland-reset-filters');
  assert.match(mockHost.resultCount.textContent, /50/);

  // Search by title without reloading
  ui.handleInput({target: {id: 'storyland-search', value: firstStory.titleEn.slice(0, 8)}});
  assert.match(mockHost.grid.innerHTML, new RegExp(firstStory.id));
  await ui.handleAction('storyland-clear-search');
  assert.equal(ui._state.query, '');

  // Open Reader view
  await ui.handleAction('storyland-open', {id: firstStory.id});
  assert.match(html, /storyland-reading/);
  // Zero <select> dropdowns in Reader view
  assert.doesNotMatch(html, /<select\b/i, 'Reader view must not contain any <select> dropdown');

  // Verify speed buttons 0.75x, 1x, 1.25x, 1.5x exist and work
  for (const rate of [0.75, 1, 1.25, 1.5]) {
    assert.match(html, new RegExp(`data-action="storyland-rate" data-value="${rate}"`));
    await ui.handleAction('storyland-rate', {value: String(rate)});
    assert.equal(ui._audio.playbackRate, rate);
    const activeBtn = mockHost.rateButtons.find(b => Number(b.dataset.value) === rate);
    assert.equal(activeBtn.getAttribute('aria-pressed'), 'true');
  }
});

test('StoryLand Smart Auto-Follow, Manual-Scroll Override, Resume-Follow, Seek, Pause/Resume, and Error Fallbacks', async () => {
  const catalog = JSON.parse(await readFile(resolve(root, 'storyland/data.json'), 'utf8'));
  const firstStory = catalog.stories[0];
  const firstCues = JSON.parse(await readFile(resolve(root, firstStory.cuesSrc), 'utf8'));

  let reducedMotion = false;
  let windowScrolled = 0;
  globalThis.matchMedia = () => ({matches: reducedMotion});
  globalThis.window = {
    innerWidth: 1440,
    scrollY: 0,
    scrollTo() { windowScrolled++; },
  };
  globalThis.fetch = async url => {
    if (String(url).includes('storyland/data.json')) return {ok: true, json: async () => catalog};
    if (String(url).includes('.cues.json')) return {ok: true, json: async () => firstCues};
    throw new Error('Unexpected fetch: ' + url);
  };

  let html = '';
  const mockHost = createMockDOM();
  const ui = createStorylandUI({
    redraw() {
      html = ui.render();
      mockHost.html = html;
      ui.mount(mockHost);
    },
  });

  html = ui.render();
  await new Promise(r => setTimeout(r, 30));
  await ui.handleAction('storyland-open', {id: firstStory.id});

  ui._audio.duration = 120;
  ui._audio.dispatchEvent('loadedmetadata');

  // Play & Pause/Resume
  await ui.handleAction('storyland-play');
  assert.equal(ui._audio.paused, false);
  await ui.handleAction('storyland-play');
  assert.equal(ui._audio.paused, true);
  await ui.handleAction('storyland-play');
  assert.equal(ui._audio.paused, false);

  // Requirement 3: Smart Auto-Follow scrolls transcript container only when scene changes, not on every word tick
  mockHost.stream.scrollCalls.length = 0;
  const scene0Word1 = firstCues.cues.find(c => c.scene === 0 && c.word === 1) || firstCues.cues[0];
  ui._audio.currentTime = scene0Word1.start + 0.02;
  ui._audio.dispatchEvent('timeupdate');
  assert.equal(mockHost.stream.scrollCalls.length, 0, 'Should not scroll on same-scene word tick');

  const scene1Cue = firstCues.cues.find(c => c.scene === 1);
  assert.ok(scene1Cue, 'First story should have scene 1 cue');
  ui._audio.currentTime = scene1Cue.start + 0.02;
  ui._audio.dispatchEvent('timeupdate');
  assert.equal(ui._state.scene, 1);
  assert.equal(mockHost.stream.scrollCalls.length, 1, 'Should scroll transcript container once when entering scene 1');
  assert.equal(mockHost.stream.scrollCalls[0].behavior, 'smooth');
  assert.equal(windowScrolled, 0, 'Desktop auto-follow must scroll transcript container, never window');

  // Same scene next word -> must not scroll again
  const scene1Word2 = firstCues.cues.find(c => c.scene === 1 && c.word > scene1Cue.word);
  if (scene1Word2) {
    ui._audio.currentTime = scene1Word2.start + 0.02;
    ui._audio.dispatchEvent('timeupdate');
    assert.equal(mockHost.stream.scrollCalls.length, 1, 'Must not jitter/scroll on subsequent words in scene 1');
  }

  // Requirement 4: Manual scroll (wheel / touchmove) disables auto-follow and shows "Theo dõi lời đọc" button
  mockHost.stream.dispatch('wheel', {});
  assert.equal(ui._state.autoFollow, false, 'Manual wheel scroll must disable autoFollow');
  assert.equal(mockHost.followBtn.hidden, false, '"Theo dõi lời đọc" button must be visible when autoFollow is off');

  // Advancing to scene 2 while autoFollow is off must NOT scroll transcript
  const scene2Cue = firstCues.cues.find(c => c.scene === 2);
  if (scene2Cue) {
    ui._audio.currentTime = scene2Cue.start + 0.02;
    ui._audio.dispatchEvent('timeupdate');
    assert.equal(ui._state.scene, 2, 'Active scene still updates while autoFollow is paused');
    assert.equal(mockHost.stream.scrollCalls.length, 1, 'Must not auto-scroll while manual override is active');
  }

  // Clicking "Theo dõi lời đọc" (storyland-follow) re-enables autoFollow and scrolls immediately, respecting prefers-reduced-motion
  reducedMotion = true;
  await ui.handleAction('storyland-follow');
  assert.equal(ui._state.autoFollow, true, 'Clicking Theo dõi lời đọc must re-enable autoFollow');
  assert.equal(mockHost.followBtn.hidden, true, '"Theo dõi lời đọc" button hides once following is resumed');
  assert.equal(mockHost.stream.scrollCalls.length, 2, 'Resuming follow must scroll to active scene');
  assert.equal(mockHost.stream.scrollCalls[1].behavior, 'auto', 'prefers-reduced-motion must use auto behavior');

  // Seeking audio updates active scene and transcript scroll position immediately
  const lastSceneCue = firstCues.cues[firstCues.cues.length - 1];
  const seekVal = Math.round((lastSceneCue.start / ui._audio.duration) * 1000);
  ui.handleInput({target: {id: 'storyland-seek', value: String(seekVal)}});
  assert.equal(ui._state.scene, lastSceneCue.scene, 'Audio seek must update active scene immediately');
  assert.equal(mockHost.stream.scrollCalls.length, 3, 'Audio seek must scroll transcript to seeked scene');

  // Image & Audio error fallbacks
  const brokenImg = {
    tagName: 'IMG',
    closest() { return mockHost.sceneFrame; },
  };
  mockHost.dispatch('error', {target: brokenImg});
  assert.equal(mockHost.sceneFrame.classList.contains('is-image-error'), true, 'Broken image must set .is-image-error on frame');

  ui._audio.dispatchEvent('error');
  assert.equal(mockHost.playerEl.classList.contains('has-error'), true, 'Audio error must set .has-error on player');
  assert.match(mockHost.playerStatus.textContent, /Không tải được bản thu|recording could not load/i);
});

test('StoryLand CSS enforces 43.5%/56.5% desktop split, object-fit contain on scenes, and responsive breakpoints (360, 390, 768, 1024, 1440px)', async () => {
  const css = await readFile(resolve(root, 'storyland.css'), 'utf8');
  assert.match(css, /grid-template-columns:minmax\(290px,43fr\)\s*minmax\(0,57fr\)/, 'Desktop reader must use 42-45% / 55-58% split');
  assert.match(css, /\.storyland-cover img\{[^}]*object-fit:contain/, 'Card covers must preserve the entire illustration');
  assert.match(css, /\.storyland-scene-image img\{[^}]*object-fit:contain/, 'Scene images must prioritize object-fit: contain');
  assert.match(css, /env\(safe-area-inset-bottom/, 'Mobile player and reader must respect safe-area-inset-bottom');
  assert.match(css, /\.storyland-english-line\{[^}]*overflow-wrap:break-word/, 'Long English lines must wrap cleanly');
  assert.match(css, /\.storyland-vietnamese-line\{[^}]*overflow-wrap:break-word/, 'Long Vietnamese lines must wrap cleanly');

  // Verify viewport behavior across 360, 390, 768, 1024, and 1440px
  const catalog = JSON.parse(await readFile(resolve(root, 'storyland/data.json'), 'utf8'));
  const longTextStory = structuredClone(catalog.stories[0]);
  longTextStory.scenes[0].en = 'Supercalifragilisticexpialidocious '.repeat(18).trim();
  longTextStory.scenes[0].vi = 'Một câu văn tiếng Việt rất dài dùng để kiểm thử khả năng tự động xuống dòng trên các màn hình nhỏ 360px và 390px. '.repeat(6).trim();
  const customCatalog = {...catalog, stories: [longTextStory, ...catalog.stories.slice(1)]};

  for (const width of [360, 390, 768, 1024, 1440]) {
    globalThis.localStorage.store.clear();
    let winScrolls = 0;
    globalThis.window = {
      innerWidth: width,
      scrollY: 0,
      scrollTo() { winScrolls++; },
    };
    globalThis.fetch = async url => {
      if (String(url).includes('storyland/data.json')) return {ok: true, json: async () => customCatalog};
      // Simulate missing cues to also test duration-based scene sync fallback
      return {ok: false, status: 404};
    };

    const mockHost = createMockDOM();
    if (width <= 860) {
      // On mobile single-column layout, stream is not a separate scroll box
      mockHost.stream.scrollHeight = 480;
      mockHost.stream.clientHeight = 480;
    }
    const ui = createStorylandUI({
      redraw() {
        mockHost.html = ui.render();
        ui.mount(mockHost);
      },
    });
    ui.render();
    await new Promise(r => setTimeout(r, 20));
    await ui.handleAction('storyland-open', {id: longTextStory.id});
    assert.match(mockHost.html, /Supercalifragilisticexpialidocious/);

    ui._audio.duration = 100;
    ui._audio.currentTime = 65;
    ui._audio.dispatchEvent('timeupdate');
    assert.ok(ui._state.scene > 0, `Duration fallback should advance scene at ${width}px`);
    if (width <= 860) {
      assert.equal(winScrolls, 1, `Mobile viewport (${width}px) should scroll window safely`);
    } else {
      assert.equal(winScrolls, 0, `Desktop viewport (${width}px) must never scroll window`);
      assert.equal(mockHost.stream.scrollCalls.length, 1, `Desktop viewport (${width}px) must scroll transcript container`);
    }
  }
});
