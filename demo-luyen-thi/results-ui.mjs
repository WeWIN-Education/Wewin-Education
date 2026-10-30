import {t,ui} from './language.mjs';
import {shieldsFor} from './shields.mjs';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shield = filled => ui`<svg class="shield-symbol${filled ? ' filled' : ''}" viewBox="0 0 24 28" aria-hidden="true"><path d="M12 2 22 6v8c0 6-6 10-10 12C8 24 2 20 2 14V6Z"/><path class="shield-check" d="m7 13 3 3 7-7"/></svg>`;
export function shieldStrip(count) {
  return ui`<span class="shield-strip" role="img" aria-label="${count} out of 5 shields">${Array.from({length:5}, (_, i) => shield(i < count)).join('')}</span>`;
}
export function renderScoreCards(result) {
  const counts = ['reading', 'listening'].map(skill => shieldsFor(skill, result[skill].correct, result[skill].total));
  return ui`<div class="score-grid"><section class="score-card total"><div class="score-label">Total score</div><div class="score-number">${result.total}<span> / 100</span></div><div class="shield-total">${shield(true)} ${counts[0] + counts[1]}<span> / 10 shields</span></div><p>Reading &amp; Writing 50% · Listening 50%</p></section>${['reading','listening'].map((skill,i) => ui`<section class="score-card"><div class="score-label">${skill === 'reading' ? t('Reading &amp; Writing') : t('Listening')}</div><div class="shield-card-count">${counts[i]}<span> / 5 shields</span></div>${shieldStrip(counts[i])}<p class="shield-raw-score">${result[skill].correct}/${result[skill].total} correct answers</p><p>${result[skill].score} / 50 points</p></section>`).join('')}</div>`;
}
export function renderLeaderboard(entries) {
  if (entries === null) return ui`<p class="empty-copy">Leaderboard is unavailable. Please try again later.</p>`;
  if (!entries.length) return ui`<p class="empty-copy">No ranked attempts for this test yet.</p>`;
  return ui`<ol class="shield-leaderboard" aria-label="${t("Student leaderboard")}">${entries.map(row => {
    const reading = shieldsFor('reading', Number(row.reading_correct), Number(row.reading_total));
    const listening = shieldsFor('listening', Number(row.listening_correct), Number(row.listening_total));
    const initials = Array.from(String(row.nickname || '').trim().split(/\s+/).map(word => Array.from(word)[0]).slice(-2).join('')).join('').toLocaleUpperCase();
    return ui`<li class="shield-board-row${Number(row.rank) <= 3 ? ' board-top' : ''}"><span class="board-rank" aria-label="Rank ${Number(row.rank)}">${Number(row.rank)}</span><span class="board-avatar" aria-hidden="true">${esc(initials)}</span><strong class="board-name">${esc(row.nickname)}</strong><div class="board-skill"><span>Reading &amp; Writing</span><strong>${reading} / 5</strong>${shieldStrip(reading)}</div><div class="board-skill"><span>Listening</span><strong>${listening} / 5</strong>${shieldStrip(listening)}</div><div class="board-points"><span class="board-shield-total">${shield(true)} ${reading + listening} / 10</span><strong>${Number(row.total_score)}<small> / 100</small></strong></div></li>`;
  }).join('')}</ol>`;
}
