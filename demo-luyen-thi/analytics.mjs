const productionOrigin = 'https://exam.wewin.edu.vn';
const mainHosts = new Set(['wewin.edu.vn', 'www.wewin.edu.vn']);
const levels = new Set(['starters', 'movers', 'flyers', 'ket']);
const pages = new Map([
  ['dashboard', ['/', 'WeWIN Exam']],
  ['catalog', ['/practice', 'Practice library']],
  ['intro', ['/practice/test', 'Test introduction']],
  ['exam', ['/practice/exam', 'Exam practice']],
  ['result', ['/practice/result', 'Exam result']],
  ['assignments', ['/assignments', 'Assigned work']],
  ['history', ['/results', 'Results history']],
  ['board', ['/leaderboard', 'Leaderboard']],
  ['vocab', ['/vocab', 'Vocab']],
  ['storyland', ['/storyland', 'StoryLand']],
  ['storyland-robot', ['/storyland-robot', 'StoryLand Robot']],
]);

function referrerOrigin(value) {
  try {
    const referrer = new URL(value);
    if (referrer.protocol === 'https:' || referrer.protocol === 'http:') return referrer.origin + '/';
  } catch {}
  return '';
}

// An anonymous, host-local browser identifier. It never depends on an account or attempt.
function browserClientId() {
  const key = 'wewin-exam-ga-client';
  let id;
  try { id = localStorage.getItem(key); } catch {}
  if (/^\d{1,10}\.\d{10}$/.test(id || '')) return id;
  id = crypto.getRandomValues(new Uint32Array(1))[0] + '.' + Math.floor(Date.now() / 1000);
  try { localStorage.setItem(key, id); } catch {}
  return id;
}

export function createExamAnalytics({origin, measurementId, referrer, send}) {
  const enabled = origin === productionOrigin && /^G-[A-Z0-9]+$/.test(measurementId || '');
  let lastView, previousLocation = referrerOrigin(referrer), currentPage;
  function emit(event, params = {}) {
    if (!enabled || !currentPage) return;
    try { send(event, {...currentPage, ...params}); } catch {}
  }
  return {
    page(screen, viewKey) {
      if (!enabled || lastView === viewKey) return;
      lastView = viewKey;
      const page = pages.get(screen);
      if (!page) { currentPage = null; return; }
      const [path, title] = page;
      currentPage = {page_location: origin + path, page_title: title, page_referrer: previousLocation};
      emit('page_view');
      previousLocation = currentPage.page_location;
    },
    attempt(event, level, assigned) {
      if (event !== 'exam_started' && event !== 'exam_completed') return;
      emit(event, {exam_mode: assigned ? 'assignment' : 'practice', ...(levels.has(level) ? {exam_level: level} : {})});
    },
    link(href) {
      try {
        const url = new URL(href, origin);
        if (url.protocol === 'https:' && mainHosts.has(url.hostname)) {
          emit('main_site_click', {destination_host: url.hostname});
        }
      } catch {}
    },
  };
}

export function installExamAnalytics() {
  const measurementId = document.querySelector('meta[name="ga-measurement-id"]')?.content;
  let frame, ready = false;
  const pending = [];

  return createExamAnalytics({
    origin: location.origin, measurementId, referrer: document.referrer,
    send(event, params) {
      const message = {type: 'exam-analytics-event', event, params};
      if (ready) {
        frame.contentWindow.postMessage(message, '*');
        return;
      }
      if (pending.length < 64) pending.push(message);
      if (frame) return;

      // The opaque origin keeps Enhanced Measurement and PII scanning away from the app.
      frame = document.createElement('iframe');
      frame.hidden = true;
      frame.title = 'Analytics';
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.referrerPolicy = 'no-referrer';
      frame.src = '/analytics-frame.html';
      function onReady(reply) {
        if (reply.origin !== 'null' || reply.source !== frame.contentWindow || reply.data?.type !== 'exam-analytics-ready') return;
        window.removeEventListener('message', onReady);
        frame.contentWindow.postMessage({type: 'exam-analytics-config', measurementId, clientId: browserClientId()}, '*');
        ready = true;
        for (const item of pending.splice(0)) frame.contentWindow.postMessage(item, '*');
      }
      window.addEventListener('message', onReady);
      document.body.append(frame);
    },
  });
}
