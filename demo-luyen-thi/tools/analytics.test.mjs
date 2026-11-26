import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {createExamAnalytics} from '../analytics.mjs';

const origin = 'https://exam.wewin.edu.vn';
const measurementId = 'G-BHPHF3EMKF';

test('public navigation is measured once with fixed URLs and origin-only referrers', () => {
  const sent = [];
  const a = createExamAnalytics({
    origin, measurementId,
    referrer: 'https://wewin.edu.vn/private/user-name?token=secret',
    send: (...message) => sent.push(message),
  });
  a.page('dashboard', 'dashboard');
  a.page('dashboard', 'dashboard');
  a.page('exam', 'exam-private-attempt-id');
  a.page('exam', 'exam-private-attempt-id');
  a.page('staff', 'staff-private-user');
  a.page('login', 'login-return-url');
  a.page('dashboard', 'dashboard');
  assert.deepEqual(sent.map(([event, fields]) => [event, fields.page_location, fields.page_referrer]), [
    ['page_view', origin + '/', 'https://wewin.edu.vn/'],
    ['page_view', origin + '/practice/exam', origin + '/'],
    ['page_view', origin + '/', origin + '/practice/exam'],
  ]);
  assert.doesNotMatch(JSON.stringify(sent), /secret|private|user-name|return-url/);
});

test('events only carry fixed level and mode or the exact main-site hostname', () => {
  const sent = [];
  const a = createExamAnalytics({origin, measurementId, send: (...message) => sent.push(message)});
  a.page('exam', 'exam');
  a.attempt('exam_started', 'flyers', false);
  a.attempt('exam_completed', 'private-student-text', true);
  a.attempt('form_submit', 'flyers', false);
  a.link('https://www.wewin.edu.vn/private?email=example');
  a.link('https://wewin.edu.vn.other.test/');
  a.link('https://exam.wewin.edu.vn/?token=secret');
  const {page_location, page_title, page_referrer} = sent[0][1];
  const page = {page_location, page_title, page_referrer};
  assert.deepEqual(sent.slice(1), [
    ['exam_started', {...page, exam_level: 'flyers', exam_mode: 'practice'}],
    ['exam_completed', {...page, exam_mode: 'assignment'}],
    ['main_site_click', {...page, destination_host: 'www.wewin.edu.vn'}],
  ]);
});

test('local, preview, other domains and missing configuration do not send analytics', () => {
  const sent = [];
  const send = (...args) => sent.push(args);
  for (const location of ['http://localhost:8780', 'https://wewin-luyen-thi.vercel.app', 'http://exam.wewin.edu.vn', origin + ':444']) {
    createExamAnalytics({origin: location, measurementId, send}).page('dashboard', 'dashboard');
  }
  createExamAnalytics({origin, send}).page('dashboard', 'dashboard');
  assert.deepEqual(sent, []);
});

test('the opaque tag frame can retain its own analytics cookie without touching application cookies', async () => {
  const source = await readFile(new URL('../analytics-frame.mjs', import.meta.url), 'utf8');
  const messages = [];
  const parent = {postMessage: (data, target) => messages.push({data, target})};
  let receive, scripts = 0;
  const window = {parent, origin: 'null', addEventListener: (_name, callback) => { receive = callback; }};
  const document = {createElement: () => ({}), head: {append: () => scripts++}};
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get() { throw new Error('Sandbox cookie access denied'); },
  });
  runInNewContext(source, {window, document, location: {origin}});
  assert.equal(messages[0].data.type, 'exam-analytics-ready');
  receive({origin, source: parent, data: {type:'exam-analytics-config', measurementId, cookies:[['wewin_exam_ga','GA1.1.123.456']]}});
  assert.equal(document.cookie, 'wewin_exam_ga=GA1.1.123.456');
  document.cookie = 'session=fixture; Max-Age=30';
  document.cookie = 'wewin_exam_ga_BHPHF3EMKF=GS2.1.s123; Max-Age=60';
  assert.equal(messages.length, 2);
  assert.equal(messages[1].data.name, 'wewin_exam_ga_BHPHF3EMKF');
  assert.doesNotMatch(document.cookie, /session=fixture/);
  const params = {page_location:origin+'/',page_title:'WeWIN Exam',page_referrer:''};
  receive({origin, source: parent, data: {type:'exam-analytics-event',event:'page_view',params}});
  receive({origin, source: parent, data: {type:'exam-analytics-event',event:'exam_started',params}});
  assert.equal(scripts, 1);
  assert.equal(window.dataLayer.find(command => command[0]==='config')[2].send_page_view, false);
});
