import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
import {flyersHard} from '../flyers-hard.mjs';
import {allExams} from '../public-data.mjs';
import {getExam,correct,grade} from '../server/scoring.mjs';
import media from '../media-manifest.mjs';

test('Mock 16 question 6 asks about shared work without inventing a speed comparison',async()=>{
 const prompt='Instead of doing everything together, the helpers ______.';
 const source=flyersHard.find(e=>e.id==='flyers-16'),exam=getExam(source.id),publicExam=allExams.find(e=>e.id===source.id);
 for(const e of [source,exam,publicExam])assert.equal(e.reading[4].questions[5].prompt,prompt);
 const q=exam.reading[4].questions[5];assert.equal(q.answer,'divided the jobs');assert.deepEqual(q.accepted,['divided the jobs']);
 assert.equal(correct(q,'divided the jobs'),true);assert.equal(correct(q,'prepared faster'),false);assert.equal(correct(q,'trying to do everything together'),false);
 assert.deepEqual(exam.reading[4].questions.map(q=>q.answer),['half an hour','smaller writing','one helper','entrance','quarter to three','divided the jobs','two new cards']);
 assert.equal(exam.version,'2026-10-23-flyers-hard-v1');assert.equal(grade(exam,{'r5-6':'divided the jobs'}).reading.correct,1);
 const variants=media.images['flyers/16/page-13.jpg'].variants;assert.ok(variants.every(v=>v.file.includes('page-13-q6-20261103-')));
 for(const v of variants)await access(new URL('../assets/'+v.file,import.meta.url));
});
