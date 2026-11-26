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

const analyticsCookie = /^wewin_exam_ga(?:_[A-Z0-9]+)?$/;
const cookieValue = /^[A-Za-z0-9.%$_-]{0,256}$/;
const cookieLifetime = 63072000;

function analyticsCookies() {
  return (document.cookie || '').split(/;\s*/).flatMap(item => {
    const [name, value] = item.split('=', 2);
    return analyticsCookie.test(name) && cookieValue.test(value || '') ? [[name, value]] : [];
  });
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
  function optedOut() {
    return window['ga-disable-' + measurementId] === true ||
      window._gaUserPrefs?.ioo?.() ||
      document.documentElement.hasAttribute?.('data-google-analytics-opt-out') ||
      document.getElementById?.('__gaOptOutExtension') ||
      (document.cookie || '').split(/;\s*/).includes('AMP_TOKEN=$OPT_OUT');
  }

  return createExamAnalytics({
    origin: location.origin, measurementId, referrer: document.referrer,
    send(event, params) {
      if (optedOut()) return;
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
      function onFrameMessage({origin, source, data}) {
        if (origin !== 'null' || source !== frame.contentWindow || !data || optedOut()) return;
        if (!ready && data.type === 'exam-analytics-ready') {
          frame.contentWindow.postMessage({type: 'exam-analytics-config', measurementId, cookies: analyticsCookies()}, '*');
          ready = true;
          for (const item of pending.splice(0)) frame.contentWindow.postMessage(item, '*');
        } else if (ready && data.type === 'exam-analytics-cookie') {
          const {name, value, maxAge} = data;
          if (analyticsCookie.test(name) && typeof value === 'string' && cookieValue.test(value) && Number.isInteger(maxAge)) {
            document.cookie = `${name}=${value}; Max-Age=${Math.min(cookieLifetime, Math.max(0, maxAge))}; Path=/; Secure; SameSite=Lax`;
          }
        }
      }
      window.addEventListener('message', onFrameMessage);
      document.body.append(frame);
    },
  });
}
