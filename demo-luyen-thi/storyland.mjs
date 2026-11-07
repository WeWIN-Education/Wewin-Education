import {escapeHTML as esc, uiIcon} from './learning-ui.mjs';
import {getLanguage} from './language.mjs';

const STORAGE_KEY = 'wewin-storyland-v1';
const iconPaths = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  play: '<path d="m8 5 12 7-12 7V5Z" fill="currentColor" stroke="none"/>',
  pause: '<path d="M8 5h3v14H8zm6 0h3v14h-3z" fill="currentColor" stroke="none"/>',
  bookmark: '<path d="M6 4h12v17l-6-4-6 4V4Z"/>',
  back: '<path d="m14 5-7 7 7 7M7 12h14"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  repeat: '<path d="m17 2 4 4-4 4M3 10V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14 0v2a2 2 0 0 1-2 2H3"/>',
  translate: '<path d="M3 5h12M9 3v2M5 5c1 6 5 8 9 10M13 5c-1 6-5 8-10 11m12 5 4-10 4 10m-6-3h4"/>',
  book: '<path d="M12 5v15M12 5C9 3 5 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1Z"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5Zm4.5 3.5a5 5 0 0 1 0 7m2.5-9.5a9 9 0 0 1 0 12"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`;
const cleanSearch = value => String(value || '').toLocaleLowerCase('vi').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/g, 'd');
const formatTime = value => {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
};

function createSafeAudio() {
  if (typeof Audio === 'function') {
    const el = new Audio();
    el.preload = 'metadata';
    return el;
  }
  return {
    paused: true,
    ended: false,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
    preload: 'metadata',
    src: '',
    play: async function () { this.paused = false; },
    pause: function () { this.paused = true; },
    load: function () {},
    addEventListener: function () {},
  };
}

export function createStorylandUI({initialStoryId = '', redraw = () => {}} = {}) {
  let catalog = null;
  let loading = null;
  let loadError = '';
  let host = null;
  let cues = [];
  let cueRequest = 0;
  let pendingSeek = null;
  let lastCue = null;
  const audio = createSafeAudio();

  const state = {
    storyId: initialStoryId,
    scene: 0,
    category: 'all',
    level: 'all',
    query: '',
    showTranslation: true,
    readOnly: false,
    repeatScene: false,
    fontSize: 20,
    finished: false,
    message: '',
    playerError: '',
    rate: 1,
    store: readStore(),
  };

  function readStore() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        saved: Array.isArray(value.saved) ? value.saved.filter(id => typeof id === 'string') : [],
        progress: value.progress && typeof value.progress === 'object' ? value.progress : {},
        lastStory: typeof value.lastStory === 'string' ? value.lastStory : '',
      };
    } catch {
      return {saved: [], progress: {}, lastStory: ''};
    }
  }

  function saveStore() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.store)); } catch { /* Storage quota or private mode */ }
  }

  function text(vi, en) { return getLanguage() === 'en' ? en : vi; }
  function stories() { return catalog?.stories || []; }
  function currentStory() { return stories().find(item => item.id === state.storyId) || null; }
  function assetPath(key) {
    const source = catalog?.assets?.[key] || '';
    const relative = source.replace(/^(?:\.\/)?assets\//, '');
    return relative ? `assets/storyland/${relative}` : '';
  }
  function categories() { return [...new Set(stories().map(story => story.category))]; }
  function categoryLabel(value) {
    if (getLanguage() !== 'en') return value;
    return ({'Việt Nam': 'Vietnamese tales', 'Cổ tích thế giới': 'World fairy tales', 'Ngụ ngôn': 'Fables', 'WEWIN Original': 'WEWIN Originals'})[value] || value;
  }

  function loadCatalog() {
    if (catalog || loading) return loading;
    loadError = '';
    loading = fetch('storyland/data.json')
      .then(response => {
        if (!response.ok) throw new Error(text('Không tải được thư viện truyện. Vui lòng thử lại.', 'Could not load the story library. Please try again.'));
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data?.stories) || !data.stories.length || !data.assets) {
          throw new Error(text('Dữ liệu thư viện truyện chưa sẵn sàng.', 'Story library data is not ready.'));
        }
        catalog = data;
        if (state.storyId) {
          const initId = state.storyId;
          state.storyId = '';
          return openStory(initId);
        }
      })
      .catch(error => { loadError = error.message || text('Không tải được thư viện truyện.', 'Could not load the story library.'); })
      .finally(() => { loading = null; redraw(); });
    return loading;
  }

  function filterStories() {
    const query = cleanSearch(state.query.trim());
    return stories().filter(story => {
      const progress = state.store.progress[story.id];
      if (state.category === 'saved' && !state.store.saved.includes(story.id)) return false;
      if (state.category === 'completed' && !progress?.completed) return false;
      if (!['all', 'saved', 'completed'].includes(state.category) && story.category !== state.category) return false;
      if (state.level !== 'all' && story.level !== state.level) return false;
      return !query || cleanSearch(`${story.titleEn} ${story.titleVi} ${story.category} ${story.level}`).includes(query);
    });
  }

  function savedButton(story, compact = false) {
    const saved = state.store.saved.includes(story.id);
    const label = saved ? text('Đã lưu truyện', 'Saved story') : text('Lưu truyện', 'Save story');
    return `<button type="button" class="storyland-save${compact ? ' is-compact' : ''}" data-action="storyland-save" data-id="${esc(story.id)}" aria-label="${label}: ${esc(story.titleVi)}" aria-pressed="${saved}">${icon('bookmark')}${compact ? `<span class="sr-only">${label}</span>` : `<span>${label}</span>`}</button>`;
  }

  function storyCard(story) {
    const progress = state.store.progress[story.id];
    const status = progress?.completed
      ? text('✓ Đã nghe xong', '✓ Completed')
      : progress
        ? text(`Đang nghe · cảnh ${(progress.scene || 0) + 1}/${story.scenes.length}`, `In progress · scene ${(progress.scene || 0) + 1}/${story.scenes.length}`)
        : text('Nghe truyện →', 'Listen now →');
    const statusClass = progress?.completed ? ' is-done' : progress ? ' is-active' : '';
    return `<article class="storyland-card">
      <button type="button" class="storyland-card-open" data-action="storyland-open" data-id="${esc(story.id)}" aria-label="${text('Mở truyện', 'Open story')} ${esc(story.titleEn)} — ${esc(story.titleVi)}">
        <span class="storyland-cover"><img src="${esc(assetPath(story.cover || story.scenes[0]?.image))}" alt="${text('Minh họa', 'Illustration')}: ${esc(story.titleVi)}" loading="lazy" decoding="async" width="560" height="380"><span class="storyland-level" data-level="${esc(story.level)}">${esc(story.level)}</span></span>
        <span class="storyland-card-copy"><span class="storyland-category">${esc(categoryLabel(story.category))}</span><strong lang="en">${esc(story.titleEn)}</strong><span class="storyland-title-vi" lang="vi">${esc(story.titleVi)}</span><span class="storyland-card-meta"><span>${story.scenes.length} ${text('cảnh · Anh–Việt', 'scenes · EN–VI')}</span><span class="storyland-progress-label${statusClass}">${esc(status)}</span></span></span>
      </button>${savedButton(story, true)}
    </article>`;
  }

  function renderLibrary() {
    const resume = stories().find(story => story.id === state.store.lastStory) || stories()[0];
    const progress = resume && state.store.progress[resume.id];
    const completed = Object.values(state.store.progress).filter(value => value?.completed).length;
    const totalScenes = stories().reduce((sum, story) => sum + story.scenes.length, 0);
    const filterItems = [
      ['all', text('Tất cả', 'All stories'), stories().length],
      ...categories().map(value => [value, categoryLabel(value), null]),
      ['saved', text('Đã lưu', 'Saved'), state.store.saved.length],
      ['completed', text('Đã hoàn thành', 'Completed'), completed],
    ];
    const filterMarkup = filterItems.map(([value, label, count]) => `<button type="button" class="storyland-filter${state.category === value ? ' is-active' : ''}" data-action="storyland-filter" data-value="${esc(value)}" aria-pressed="${state.category === value}">${esc(label)}${count !== null ? `<span>${count}</span>` : ''}</button>`).join('');
    const levelOptions = ['all', ...new Set(stories().map(story => story.level))].map(level => `<option value="${esc(level)}" ${state.level === level ? 'selected' : ''}>${level === 'all' ? text('Mọi trình độ', 'All levels') : esc(level)}</option>`).join('');
    return `<section class="storyland-screen" aria-labelledby="storyland-title">
      <header class="page-heading storyland-heading"><div><p class="page-overline">WEWIN STORYLAND</p><h1 id="storyland-title">${text('Thư viện truyện song ngữ', 'Bilingual Story Library')}</h1><p>${text('Nghe truyện tiếng Anh, đọc theo từng từ được tô sáng và khám phá nghĩa tiếng Việt qua từng bức tranh.', 'Listen to English stories, follow word-by-word highlighting, and explore Vietnamese translations through illustrated scenes.')}</p></div><div class="storyland-heading-badges"><span class="vocab-public">${text('Mở cho tất cả mọi người', 'Open to everyone')}</span><span class="storyland-library-count">${stories().length} ${text('truyện song ngữ', 'bilingual stories')}</span></div></header>
      <section class="storyland-feature" aria-label="${text('Câu chuyện nổi bật', 'Featured story')}">
        <div class="storyland-feature-copy"><span class="storyland-eyebrow">${text('NGHE · ĐỌC THEO · HỌC TỪ MỚI', 'LISTEN · READ ALONG · LEARN NEW WORDS')}</span><h2>${text('Khơi sáng trí tuệ.<br>Nuôi dưỡng tâm hồn.', 'Stories for the Mind.<br>Lessons for the Heart.')}</h2><p>${text('Mỗi câu chuyện đều có giọng đọc tiếng Anh chuẩn và tranh minh họa theo từng cảnh. Chạm vào bất kỳ từ nào để nghe ngay từ vị trí đó.', 'Every story features natural English narration and scene-by-scene artwork. Tap any word or scene to listen right from that spot.')}</p><div class="storyland-feature-actions"><button type="button" class="btn primary storyland-feature-cta" data-action="storyland-open" data-id="${esc(resume.id)}">${uiIcon('headphones')}<span>${progress ? text(`Tiếp tục: ${resume.titleEn}`, `Continue: ${resume.titleEn}`) : text('Bắt đầu nghe truyện', 'Start listening')}</span></button></div><div class="storyland-facts"><span><strong>${stories().length}</strong> ${text('câu chuyện', 'stories')}</span><span><strong>${totalScenes}</strong> ${text('cảnh minh họa', 'illustrated scenes')}</span><span><strong>${completed}</strong> ${text('đã hoàn thành', 'completed')}</span></div></div>
        <button type="button" class="storyland-feature-art" data-action="storyland-open" data-id="${esc(resume.id)}" aria-label="${text('Mở truyện', 'Open story')}: ${esc(resume.titleEn)} — ${esc(resume.titleVi)}"><img src="${esc(assetPath(resume.cover || resume.scenes[0]?.image))}" alt="${text('Minh họa', 'Illustration')}: ${esc(resume.titleVi)}" loading="eager" decoding="async" width="560" height="380"><div class="storyland-feature-art-badge"><span class="storyland-level" data-level="${esc(resume.level)}">${esc(resume.level)}</span><strong>${esc(resume.titleEn)}</strong><small>${esc(resume.titleVi)}</small></div></button>
      </section>
      <section class="storyland-library" aria-labelledby="storyland-library-title"><div class="storyland-library-heading"><div><h2 id="storyland-library-title">${text('Chọn một câu chuyện', 'Choose a story')}</h2><p class="storyland-result-count" id="storyland-result-count"></p></div><div class="storyland-controls"><label class="storyland-search">${icon('search')}<span class="sr-only">${text('Tìm truyện', 'Search stories')}</span><input id="storyland-search" type="search" value="${esc(state.query)}" placeholder="${text('Tìm tên truyện tiếng Anh hoặc tiếng Việt…', 'Search by English or Vietnamese title…')}" autocomplete="off"></label><label class="sr-only" for="storyland-level">${text('Lọc theo trình độ', 'Filter by level')}</label><select class="storyland-level-select" id="storyland-level">${levelOptions}</select></div></div>
        <nav class="storyland-filters" aria-label="${text('Lọc truyện theo thể loại', 'Filter stories by category')}">${filterMarkup}</nav><div class="storyland-grid" id="storyland-grid"></div>
      </section>
    </section>`;
  }

  function renderSceneWords(sceneText, sceneIdx) {
    const tokens = Array.from(sceneText.matchAll(/\S+/g), m => ({text: m[0], start: m.index, end: m.index + m[0].length}));
    let cursor = 0;
    let html = '';
    tokens.forEach((tok, wordIdx) => {
      if (tok.start > cursor) html += esc(sceneText.slice(cursor, tok.start));
      const isCurrent = lastCue && lastCue.scene === sceneIdx && lastCue.word === wordIdx;
      html += `<span class="storyland-word${isCurrent ? ' is-speaking' : ''}" data-action="storyland-word" data-scene="${sceneIdx}" data-word="${wordIdx}" title="${text('Chạm để nghe từ đây', 'Tap to listen from here')}">${esc(tok.text)}</span>`;
      cursor = tok.end;
    });
    if (cursor < sceneText.length) html += esc(sceneText.slice(cursor));
    return html;
  }

  function renderReader(story) {
    const activeScene = story.scenes[state.scene] || story.scenes[0];
    const lesson = Array.isArray(story.lesson) ? story.lesson : [];
    const vocabulary = Array.isArray(story.vocab) ? story.vocab : [];
    const scenesMarkup = story.scenes.map((sc, idx) => {
      const isActive = idx === state.scene;
      return `<article class="storyland-scene-item${isActive ? ' is-active' : ''}" id="storyland-scene-${idx}" data-scene-index="${idx}">
        <div class="storyland-scene-item-head">
          <span class="storyland-scene-badge">${text('CẢNH', 'SCENE')} ${String(idx + 1).padStart(2, '0')} / ${String(story.scenes.length).padStart(2, '0')}</span>
          <button type="button" class="storyland-scene-play-btn" data-action="storyland-start-scene" data-value="${idx}" aria-label="${text('Nghe cảnh', 'Listen to scene')} ${idx + 1}">${icon('play')}<span>${text('Nghe cảnh này', 'Play scene')}</span></button>
        </div>
        <p class="storyland-english-line" lang="en" style="font-size:${state.fontSize}px">${renderSceneWords(sc.en, idx)}</p>
        <p class="storyland-vietnamese-line${state.showTranslation ? '' : ' is-hidden'}" lang="vi">${esc(sc.vi)}</p>
      </article>`;
    }).join('');

    return `<section class="storyland-screen storyland-reading${state.readOnly ? ' is-read-only' : ''}" aria-labelledby="storyland-reader-title">
      <header class="storyland-reader-header">
        <button type="button" class="storyland-back" data-action="storyland-back">${icon('back')}<span>${text('Thư viện truyện', 'Story library')}</span></button>
        <div class="storyland-reader-title">
          <p class="page-overline">STORYLAND · <span class="storyland-inline-level">${esc(story.level)}</span> · ${esc(categoryLabel(story.category))}</p>
          <h1 id="storyland-reader-title" lang="en">${esc(story.titleEn)}</h1>
          <p lang="vi">${esc(story.titleVi)}</p>
        </div>
        <div class="storyland-reader-tools">
          <div class="storyland-mode-switch" role="group" aria-label="${text('Chế độ đọc', 'Reading mode')}">
            <button type="button" class="storyland-mode-btn${!state.readOnly ? ' is-active' : ''}" data-action="storyland-mode" data-value="listen" aria-pressed="${!state.readOnly}">${uiIcon('headphones')}<span>${text('Nghe & Đọc', 'Listen & Read')}</span></button>
            <button type="button" class="storyland-mode-btn${state.readOnly ? ' is-active' : ''}" data-action="storyland-mode" data-value="read" aria-pressed="${state.readOnly}">${icon('book')}<span>${text('Chỉ đọc', 'Read only')}</span></button>
          </div>
          <button type="button" class="btn ghost storyland-tool-btn" data-action="storyland-translation" aria-pressed="${state.showTranslation}">${icon('translate')}<span>${state.showTranslation ? text('Ẩn dịch', 'Hide VI') : text('Hiện dịch', 'Show VI')}</span></button>
          <div class="storyland-font-controls" role="group" aria-label="${text('Cỡ chữ', 'Font size')}">
            <button type="button" class="storyland-font-btn" data-action="storyland-font" data-value="-2" aria-label="${text('Giảm cỡ chữ', 'Decrease font size')}" ${state.fontSize <= 16 ? 'disabled' : ''}>A−</button>
            <button type="button" class="storyland-font-btn" data-action="storyland-font" data-value="2" aria-label="${text('Tăng cỡ chữ', 'Increase font size')}" ${state.fontSize >= 28 ? 'disabled' : ''}>A+</button>
          </div>
          ${savedButton(story)}
        </div>
      </header>
      <div class="storyland-reader-grid">
        <aside class="storyland-picture-column" aria-label="${text('Tranh minh họa theo cảnh', 'Scene illustration')}">
          <figure class="storyland-scene-art">
            <div class="storyland-scene-image">
              <img id="storyland-active-img" src="${esc(assetPath(activeScene.image))}" alt="${esc(story.titleVi)} — ${text('cảnh', 'scene')} ${state.scene + 1}: ${esc(activeScene.vi)}" width="560" height="380" fetchpriority="high" decoding="async">
            </div>
            <figcaption>
              <div>
                <strong id="storyland-scene-caption">${text('Cảnh', 'Scene')} ${state.scene + 1} / ${story.scenes.length}</strong>
                <span>${story.category === 'WEWIN Original' ? 'WEWIN Original' : text('Minh họa WEWIN STORYLAND', 'WEWIN STORYLAND illustration')}</span>
              </div>
              <div class="storyland-picture-nav">
                <button type="button" class="storyland-scene-skip" data-action="storyland-previous" aria-label="${text('Cảnh trước', 'Previous scene')}" ${state.scene <= 0 ? 'disabled' : ''}>${icon('left')}</button>
                <button type="button" class="storyland-scene-skip" data-action="storyland-next" aria-label="${text('Cảnh tiếp theo', 'Next scene')}" ${state.scene >= story.scenes.length - 1 ? 'disabled' : ''}>${icon('right')}</button>
              </div>
            </figcaption>
          </figure>
          ${lesson.length ? `<aside class="storyland-lesson"><span>${text('BÀI HỌC Ý NGHĨA · LESSON FOR THE HEART', 'LESSON FOR THE HEART')}</span><p lang="en"><strong>${esc(lesson[0])}</strong></p><p lang="vi">${esc(lesson[1] || '')}</p></aside>` : ''}
        </aside>
        <div class="storyland-text-column">
          <div class="storyland-reading-hint">${uiIcon('headphones')}<span>${text('Chạm vào bất kỳ từ tiếng Anh nào hoặc nút "Nghe cảnh này" để nghe từ đúng vị trí đó.', 'Tap any English word or "Play scene" to listen right from that position.')}</span></div>
          <div class="storyland-scenes-stream" id="storyland-scenes-stream">${scenesMarkup}</div>
          ${state.finished ? `<div class="storyland-completion" role="status"><strong>${text('Tuyệt vời! Bạn đã nghe trọn vẹn câu chuyện!', 'Wonderful! You finished the story!')}</strong><p>${text('Hãy thử tự kể lại câu chuyện bằng lời của mình hoặc ôn lại kho báu từ vựng bên dưới nhé.', 'Try retelling the story in your own words or review the vocabulary treasures below.')}</p><button type="button" class="btn primary" data-action="storyland-replay">${icon('play')}<span>${text('Nghe lại từ đầu', 'Listen again from the start')}</span></button></div>` : ''}
          ${vocabulary.length ? `<section class="storyland-vocab-panel" aria-labelledby="storyland-vocab-heading"><h2 id="storyland-vocab-heading">${text('Kho báu từ vựng · My Word Treasures', 'My Word Treasures · Story Vocabulary')}</h2><p>${text('Chạm vào từ để nghe phát âm tiếng Anh.', 'Tap a word to hear its English pronunciation.')}</p><div class="storyland-vocab-grid">${vocabulary.map(([en, vi]) => `<button type="button" class="storyland-vocab-chip" data-action="storyland-pronounce" data-word="${esc(en)}"><span class="storyland-vocab-en" lang="en">${esc(en)}</span><span class="storyland-vocab-vi" lang="vi">${esc(vi)}</span>${icon('volume')}</button>`).join('')}</div></section>` : ''}
          ${story.note ? `<p class="storyland-adult-note">${esc(story.note)}</p>` : ''}
        </div>
      </div>
      ${state.readOnly ? '' : renderPlayer(story)}
    </section>`;
  }

  function renderPlayer(story) {
    const total = Number.isFinite(audio.duration) ? audio.duration : 0;
    const value = total ? Math.round((audio.currentTime / total) * 1000) : 0;
    const status = state.playerError || state.message || text('Bản thu âm tiếng Anh chuẩn', 'English narration ready');
    return `<section class="storyland-player" aria-label="${text('Điều khiển bản thu truyện', 'Story audio controls')}">
      <div class="storyland-player-top">
        <div class="storyland-player-label">
          <span class="storyland-player-icon">${uiIcon('headphones')}</span>
          <div>
            <strong>${text('Cảnh', 'Scene')} ${state.scene + 1}/${story.scenes.length} · ${esc(story.titleEn)}</strong>
            <span class="storyland-player-status" role="status" aria-live="polite">${esc(status)}</span>
          </div>
        </div>
        <div class="storyland-player-options">
          <button type="button" class="storyland-repeat-btn${state.repeatScene ? ' is-active' : ''}" data-action="storyland-repeat" aria-pressed="${state.repeatScene}" title="${text('Lặp lại cảnh đang nghe', 'Repeat current scene')}">${icon('repeat')}<span>${text('Lặp cảnh', 'Repeat scene')}</span></button>
          <label class="storyland-speed-label"><span>${text('Tốc độ', 'Speed')}</span><select id="storyland-rate" aria-label="${text('Tốc độ phát', 'Playback speed')}"><option value="0.8" ${state.rate === 0.8 ? 'selected' : ''}>0.8×</option><option value="1" ${state.rate === 1 ? 'selected' : ''}>1×</option><option value="1.2" ${state.rate === 1.2 ? 'selected' : ''}>1.2×</option><option value="1.5" ${state.rate === 1.5 ? 'selected' : ''}>1.5×</option></select></label>
        </div>
      </div>
      <div class="storyland-seek-row"><span id="storyland-time-current">${formatTime(audio.currentTime)}</span><input type="range" id="storyland-seek" min="0" max="1000" step="1" value="${value}" aria-label="${text('Vị trí trong câu chuyện', 'Position in the story')}" ${total ? '' : 'disabled'}><span id="storyland-time-total">${formatTime(total)}</span></div>
      <div class="storyland-play-row">
        <button type="button" class="storyland-scene-skip" data-action="storyland-previous" aria-label="${text('Về cảnh trước', 'Go to previous scene')}" ${state.scene <= 0 ? 'disabled' : ''}>${icon('left')}</button>
        <button type="button" class="storyland-play" data-action="storyland-play" aria-label="${audio.paused ? text('Phát truyện', 'Play story') : text('Tạm dừng truyện', 'Pause story')}">${icon(audio.paused ? 'play' : 'pause')}</button>
        <button type="button" class="storyland-scene-skip" data-action="storyland-next" aria-label="${text('Đến cảnh tiếp theo', 'Go to next scene')}" ${state.scene >= story.scenes.length - 1 ? 'disabled' : ''}>${icon('right')}</button>
        <span class="storyland-player-hint">${cues.length ? text('Đang đồng bộ từng từ với giọng đọc', 'Word-by-word sync active') : text('Nghe & chuyển cảnh', 'Audio ready')}</span>
      </div>
    </section>`;
  }

  function renderLoading() {
    if (loadError) {
      return `<section class="storyland-screen"><div class="storyland-error" role="alert"><h1>${text('StoryLand chưa mở được', 'StoryLand could not load')}</h1><p>${esc(loadError)}</p><button type="button" class="btn primary" data-action="storyland-retry">${text('Thử lại', 'Try again')}</button></div></section>`;
    }
    loadCatalog();
    return `<section class="storyland-screen" aria-labelledby="storyland-loading"><header class="page-heading"><div><p class="page-overline">WEWIN STORYLAND</p><h1 id="storyland-loading">${text('Đang mở thư viện truyện…', 'Opening the story library…')}</h1></div></header><div class="storyland-loading-card" role="status"></div></section>`;
  }

  function render() {
    if (!catalog) return renderLoading();
    const story = currentStory();
    return story ? renderReader(story) : renderLibrary();
  }

  function updateList() {
    if (!host) return;
    const target = host.querySelector('#storyland-grid');
    if (!target) return;
    const filtered = filterStories();
    target.innerHTML = filtered.length
      ? filtered.map(storyCard).join('')
      : `<div class="storyland-empty"><span>${text('Chưa tìm thấy truyện phù hợp.', 'No matching stories found.')}</span><p>${text('Thử từ khóa khác hoặc chọn "Tất cả".', 'Try another keyword or choose "All stories".')}</p></div>`;
    const count = host.querySelector('#storyland-result-count');
    if (count) count.textContent = `${filtered.length} ${text('câu chuyện', 'stories')}`;
    host.querySelectorAll('[data-action="storyland-filter"]').forEach(button => {
      const active = button.dataset.value === state.category;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function updatePlayer() {
    if (!host) return;
    const playBtn = host.querySelector('[data-action="storyland-play"]');
    const story = currentStory();
    if (playBtn && story) {
      const playing = !audio.paused;
      playBtn.innerHTML = icon(playing ? 'pause' : 'play');
      playBtn.setAttribute('aria-label', playing ? text('Tạm dừng truyện', 'Pause story') : text('Phát truyện', 'Play story'));
    }
    const total = Number.isFinite(audio.duration) ? audio.duration : 0;
    const seek = host.querySelector('#storyland-seek');
    if (seek && document.activeElement !== seek) seek.value = total ? String(Math.round((audio.currentTime / total) * 1000)) : '0';
    if (seek) seek.disabled = !total;
    const current = host.querySelector('#storyland-time-current');
    const duration = host.querySelector('#storyland-time-total');
    if (current) current.textContent = formatTime(audio.currentTime);
    if (duration) duration.textContent = formatTime(total);
    const status = host.querySelector('.storyland-player-status');
    if (status) status.textContent = state.playerError || state.message || text('Bản thu âm tiếng Anh chuẩn', 'English narration ready');
  }

  function updateActiveSceneDOM(sceneIndex, wordIndex, scroll = false) {
    if (!host) return;
    const story = currentStory();
    if (!story) return;
    host.querySelectorAll('.storyland-scene-item').forEach((item, idx) => {
      item.classList.toggle('is-active', idx === sceneIndex);
    });
    host.querySelectorAll('.storyland-word.is-speaking').forEach(node => node.classList.remove('is-speaking'));
    if (wordIndex >= 0) {
      const wordNode = host.querySelector(`.storyland-word[data-scene="${sceneIndex}"][data-word="${wordIndex}"]`);
      if (wordNode) wordNode.classList.add('is-speaking');
    }
    const activeScene = story.scenes[sceneIndex];
    const img = host.querySelector('#storyland-active-img');
    if (img && activeScene) {
      const nextSrc = assetPath(activeScene.image);
      if (img.getAttribute('src') !== nextSrc) {
        img.setAttribute('src', nextSrc);
        img.setAttribute('alt', `${story.titleVi} — ${text('cảnh', 'scene')} ${sceneIndex + 1}: ${activeScene.vi}`);
      }
    }
    const caption = host.querySelector('#storyland-scene-caption');
    if (caption) caption.textContent = `${text('Cảnh', 'Scene')} ${sceneIndex + 1} / ${story.scenes.length}`;
    host.querySelectorAll('[data-action="storyland-previous"]').forEach(btn => { btn.disabled = sceneIndex <= 0; });
    host.querySelectorAll('[data-action="storyland-next"]').forEach(btn => { btn.disabled = sceneIndex >= story.scenes.length - 1; });
    const playerTitle = host.querySelector('.storyland-player-label strong');
    if (playerTitle) playerTitle.textContent = `${text('Cảnh', 'Scene')} ${sceneIndex + 1}/${story.scenes.length} · ${story.titleEn}`;
    if (scroll) {
      const sceneEl = host.querySelector(`#storyland-scene-${sceneIndex}`);
      sceneEl?.scrollIntoView({block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  }

  function mount(root) {
    host = root;
    updatePlayer();
    if (lastCue) updateActiveSceneDOM(lastCue.scene, lastCue.word, false);
    if (catalog && !currentStory()) updateList();
  }

  function persistProgress(scene = state.scene, completed = false) {
    if (!state.storyId) return;
    const prevCompleted = Boolean(state.store.progress[state.storyId]?.completed);
    state.store.progress[state.storyId] = {scene, completed: completed || prevCompleted};
    state.store.lastStory = state.storyId;
    saveStore();
  }

  function findCue(scene, word = 0) {
    return cues.find(cue => cue.scene === scene && cue.word === word) || cues.find(cue => cue.scene === scene) || null;
  }

  function queueSeek(seconds) {
    if (!Number.isFinite(seconds)) return;
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      audio.currentTime = Math.min(Math.max(0, seconds), audio.duration);
    } else {
      pendingSeek = Math.max(0, seconds);
    }
  }

  function seekScene(sceneIndex, wordIndex = 0) {
    const story = currentStory();
    if (!story) return;
    const index = Math.max(0, Math.min(Number(sceneIndex) || 0, story.scenes.length - 1));
    state.scene = index;
    state.finished = false;
    state.playerError = '';
    const cue = findCue(index, wordIndex);
    if (cue) queueSeek(cue.start);
    persistProgress(index);
    lastCue = cue ? {scene: cue.scene, word: cue.word} : {scene: index, word: wordIndex};
    updateActiveSceneDOM(index, wordIndex, true);
    updatePlayer();
  }

  async function openStory(id) {
    const story = stories().find(item => item.id === id);
    if (!story) return;
    const request = ++cueRequest;
    audio.pause();
    state.storyId = story.id;
    state.finished = false;
    const progress = state.store.progress[story.id];
    state.scene = Math.max(0, Math.min(Number(progress?.scene) || 0, story.scenes.length - 1));
    state.store.lastStory = story.id;
    state.playerError = '';
    state.message = text('Đang tải bản thu âm…', 'Loading the recording…');
    cues = [];
    lastCue = null;
    const source = story.audioSrc || `assets/storyland/audio/${encodeURIComponent(story.id)}.mp3`;
    audio.src = source;
    audio.load();
    saveStore();
    try {
      const cuesUrl = story.cuesSrc || `assets/storyland/audio/${encodeURIComponent(story.id)}.cues.json`;
      const response = await fetch(cuesUrl);
      if (response.ok) {
        const raw = await response.json();
        cues = Array.isArray(raw) ? raw : Array.isArray(raw?.cues) ? raw.cues : [];
      }
    } catch {
      cues = [];
    }
    if (request !== cueRequest || state.storyId !== story.id) return;
    const cue = findCue(state.scene);
    lastCue = cue ? {scene: cue.scene, word: cue.word} : null;
    if (cue && state.scene > 0) queueSeek(cue.start);
    state.message = cues.length
      ? text('Sẵn sàng nghe · chạm Phát hoặc chọn một từ bất kỳ.', 'Ready to listen · press Play or tap any word.')
      : text('Bản thu sẵn sàng.', 'Recording ready.');
    redraw();
  }

  async function play() {
    state.playerError = '';
    if (state.readOnly) state.readOnly = false;
    if (audio.ended || state.finished) {
      state.finished = false;
      state.scene = 0;
      queueSeek(0);
      redraw();
    }
    try {
      audio.playbackRate = state.rate;
      await audio.play();
    } catch {
      state.playerError = text('Chưa phát được bản thu. Vui lòng bấm Phát lại.', 'The recording could not play. Please tap Play again.');
      updatePlayer();
    }
  }

  function pronounceWord(wordText) {
    if (!wordText) return;
    audio.pause();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function') {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(wordText);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
        state.message = `${text('Phát âm từ', 'Pronouncing')}: "${wordText}"`;
        updatePlayer();
        return;
      } catch { /* Fallback below */ }
    }
    state.message = `${wordText}`;
    updatePlayer();
  }

  function syncFromAudio() {
    if (!state.storyId || !cues.length) { updatePlayer(); return; }
    let low = 0, high = cues.length - 1, candidate = -1;
    while (low <= high) {
      const middle = (low + high) >> 1;
      if (cues[middle].start <= audio.currentTime) { candidate = middle; low = middle + 1; }
      else high = middle - 1;
    }
    const cue = candidate >= 0 ? cues[candidate] : null;
    if (cue) {
      if (state.repeatScene && cue.scene !== state.scene && audio.currentTime >= cue.start) {
        seekScene(state.scene, 0);
        return;
      }
      if (audio.currentTime <= cue.end + 0.12) {
        const sceneChanged = cue.scene !== state.scene;
        if (sceneChanged) {
          state.scene = cue.scene;
          persistProgress(cue.scene);
        }
        if (sceneChanged || !lastCue || cue.scene !== lastCue.scene || cue.word !== lastCue.word) {
          lastCue = {scene: cue.scene, word: cue.word};
          updateActiveSceneDOM(cue.scene, cue.word, sceneChanged);
        }
      }
    }
    updatePlayer();
  }

  function handleInput(event) {
    const input = event.target;
    if (input.id === 'storyland-search') {
      state.query = input.value;
      updateList();
      return true;
    }
    if (input.id === 'storyland-level') {
      state.level = input.value;
      updateList();
      return true;
    }
    if (input.id === 'storyland-seek') {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        queueSeek((Number(input.value) / 1000) * audio.duration);
        syncFromAudio();
      }
      return true;
    }
    return false;
  }

  function handleChange(event) {
    if (event.target.id === 'storyland-level') {
      state.level = event.target.value;
      updateList();
      return true;
    }
    if (event.target.id !== 'storyland-rate') return false;
    state.rate = Number(event.target.value) || 1;
    audio.playbackRate = state.rate;
    try { localStorage.setItem(`${STORAGE_KEY}-rate`, String(state.rate)); } catch { /* Ignore */ }
    return true;
  }

  async function handleAction(action, data = {}) {
    if (action === 'storyland-retry') { loadError = ''; await loadCatalog(); return; }
    if (action === 'storyland-filter') { state.category = data.value || 'all'; updateList(); return; }
    if (action === 'storyland-open') { await openStory(data.id); return; }
    if (action === 'storyland-back') { audio.pause(); state.storyId = ''; state.finished = false; cues = []; lastCue = null; persistProgress(); redraw(); return; }
    if (action === 'storyland-save') {
      const saved = new Set(state.store.saved);
      saved.has(data.id) ? saved.delete(data.id) : saved.add(data.id);
      state.store.saved = [...saved]; saveStore(); redraw(); return;
    }
    if (action === 'storyland-translation') { state.showTranslation = !state.showTranslation; redraw(); return; }
    if (action === 'storyland-mode') {
      state.readOnly = data.value === 'read';
      if (state.readOnly) audio.pause();
      redraw();
      return;
    }
    if (action === 'storyland-font') {
      state.fontSize = Math.max(16, Math.min(28, state.fontSize + (Number(data.value) || 0)));
      redraw();
      return;
    }
    if (action === 'storyland-repeat') {
      state.repeatScene = !state.repeatScene;
      redraw();
      return;
    }
    if (action === 'storyland-play') { if (audio.paused) await play(); else audio.pause(); return; }
    if (action === 'storyland-replay') { state.finished = false; seekScene(0, 0); await play(); return; }
    if (action === 'storyland-start-scene') { seekScene(Number(data.value) || 0, 0); await play(); return; }
    if (action === 'storyland-word') { seekScene(Number(data.scene) || 0, Number(data.word) || 0); await play(); return; }
    if (action === 'storyland-pronounce') { pronounceWord(data.word); return; }
    if (action === 'storyland-previous') { seekScene(state.scene - 1, 0); return; }
    if (action === 'storyland-next') { seekScene(state.scene + 1, 0); return; }
  }

  function setInitialStory(id) {
    if (id) state.storyId = id;
  }

  function stop() {
    audio.pause();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    persistProgress();
  }

  function params(searchParams) {
    if (currentStory()) searchParams.set('story', state.storyId);
  }

  audio.addEventListener('loadedmetadata', () => {
    if (pendingSeek !== null) {
      audio.currentTime = Math.min(pendingSeek, Number.isFinite(audio.duration) ? audio.duration : pendingSeek);
      pendingSeek = null;
    }
    updatePlayer();
  });
  audio.addEventListener('timeupdate', syncFromAudio);
  audio.addEventListener('play', () => {
    state.playerError = '';
    state.message = text('Đang phát bản thu âm · từ đang đọc được tô sáng.', 'Playing narration · active word highlighted.');
    updatePlayer();
  });
  audio.addEventListener('pause', () => {
    if (!audio.ended) state.message = text('Đã tạm dừng.', 'Paused.');
    persistProgress();
    updatePlayer();
  });
  audio.addEventListener('ended', () => {
    const story = currentStory();
    if (story) {
      if (state.repeatScene) {
        seekScene(state.scene, 0);
        play();
        return;
      }
      state.scene = story.scenes.length - 1;
      state.finished = true;
      persistProgress(state.scene, true);
    }
    state.message = text('Bạn đã nghe hết câu chuyện!', 'You finished the story!');
    redraw();
  });
  audio.addEventListener('error', () => {
    if (state.storyId) {
      state.playerError = text('Không tải được bản thu. Kiểm tra kết nối rồi thử lại.', 'The recording could not load. Check your connection and try again.');
      updatePlayer();
    }
  });

  try { state.rate = Number(localStorage.getItem(`${STORAGE_KEY}-rate`)) || 1; } catch { state.rate = 1; }
  audio.playbackRate = state.rate;

  return {render, mount, handleInput, handleChange, handleAction, setInitialStory, params, stop};
}
