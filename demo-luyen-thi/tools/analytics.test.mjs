import test from 'node:test';
import assert from 'node:assert/strict';
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
