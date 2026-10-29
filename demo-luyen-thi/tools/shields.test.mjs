import test from 'node:test';
import assert from 'node:assert/strict';
import {shieldsFor} from '../shields.mjs';
import {renderScoreCards,renderLeaderboard} from '../results-ui.mjs';

test('all supplied conversion boundaries including zero and scaled papers', () => {
  for (const [skill,total,bands] of [
    ['listening',20,[[0,0],[1,1],[4,1],[5,2],[8,2],[9,3],[12,3],[13,4],[16,4],[17,5],[20,5]]],
    ['reading',25,[[0,0],[1,1],[5,1],[6,2],[11,2],[12,3],[17,3],[18,4],[21,4],[22,5],[25,5]]]
  ]) for (const [correct,expected] of bands) {
    assert.equal(shieldsFor(skill,correct,total),expected);
    assert.equal(shieldsFor(skill,correct*2,total*2),expected);
  }
  assert.equal(shieldsFor('reading',0,0),0);
  assert.equal(shieldsFor('reading',NaN,25),0);
  assert.equal(shieldsFor('listening',21,25),5);
  assert.equal(shieldsFor('listening',20,25),4);
  assert.equal(shieldsFor('reading',37,43),5);
  assert.equal(shieldsFor('reading',36,43),4);
});

test('result shields use saved raw counts and handle an entirely blank attempt', () => {
  const result={total:0,reading:{correct:0,total:25,score:0},listening:{correct:0,total:20,score:0}};
  assert.match(renderScoreCards(result),/0<span> \/ 10 shields/);
  result.reading.correct=22;result.listening.correct=17;
  const html=renderScoreCards(result);
  assert.match(html,/10<span> \/ 10 shields/);
  assert.match(html,/22\/25 correct answers/);
  assert.match(html,/Reading &amp; Writing/);
});

test('ranking preserves rank and scores, escapes names, and includes both skill shields', () => {
  const html=renderLeaderboard([{rank:1,nickname:'<img onerror=alert(1)>',reading_correct:22,reading_total:25,listening_correct:17,listening_total:20,total_score:86.5}]);
  assert.ok(!html.includes('<img onerror'));
  assert.match(html,/&lt;img/);
  assert.match(html,/10 \/ 10/);
  assert.match(html,/86.5/);
  assert.match(html,/Rank 1/);
  assert.match(renderLeaderboard([]),/No ranked attempts/);
  assert.match(renderLeaderboard(null),/unavailable/);
});
