import test from 'node:test';
import assert from 'node:assert/strict';
import {flyersHard} from '../flyers-hard.mjs';
import {allExams} from '../public-data.mjs';
import {getExam,grade,validateSubmission} from '../server/scoring.mjs';
import {PGlite} from '@electric-sql/pglite';
import {Repository} from '../server/repository.mjs';
import {correctedFlyers16Result,correctFlyers16Results} from '../server/flyers16-correction.mjs';

const correctLinks={Oliver:'p6',Robert:'p3',Isabel:'p7',Emma:'p2',Sophia:'p4'};
test('Mock 16 Part 1 awards all five script-correct links and excludes the example and mascot',()=>{
 const exam=getExam('flyers-16'),part=exam.listening[0],source=flyersHard.find(e=>e.id===exam.id);
 assert.deepEqual(part.matchKey,correctLinks);assert.deepEqual(source.listening[0].matchKey,correctLinks);
 const interaction=allExams.find(e=>e.id===exam.id).listening[0].interaction;
 assert.deepEqual(interaction.example,{name:'Harry',target:'p1'});
 assert.equal(correctLinks.Harry,undefined);assert.ok(!Object.values(correctLinks).includes('p5'));
 const submission=validateSubmission(exam,{answers:{l1:correctLinks}});
 const result=grade(exam,submission.answers),review=result.review.filter(q=>q.skill==='listening'&&q.part==='l1');
 assert.equal(review.length,5);assert.ok(review.every(q=>q.correct));assert.equal(result.listening.correct,5);
 const oldLinks={Oliver:'p7',Robert:'p2',Isabel:'p3',Emma:'p6',Sophia:'p5'};
 assert.equal(grade(exam,{l1:oldLinks}).review.filter(q=>q.skill==='listening'&&q.part==='l1'&&q.correct).length,0);
 for(const [name,target] of Object.entries(correctLinks)){
  assert.equal(grade(exam,{l1:{[name]:target}}).listening.correct,1,`${name} must award one mark`);
 }
 assert.equal(exam.version,'2026-10-23-flyers-hard-v1');
});

test('Stored Mock 16 scores and first-attempt ranking are corrected once with an audit backup',async()=>{
 const db=new PGlite(),repo=new Repository(db);await repo.migrate();
 try{
  const student=await repo.createUser({username:'correction-fixture',nickname:'Fixture',role:'student',passwordHash:'fixture',mustChange:false});
  const owner={id:student.id,kind:'user'},exam=getExam('flyers-16'),old=structuredClone(exam);
  const oldLinks={Oliver:'p7',Robert:'p2',Isabel:'p3',Emma:'p6',Sophia:'p5'};
  old.listening[0].questions.forEach(q=>q.answer=oldLinks[q.prompt]);
  const attempt=await repo.createAttempt(owner,exam),answers={l1:correctLinks,'r5-6':'divided the jobs'};
  const previous=grade(old,answers);
  await repo.submit(attempt,owner,answers,{'r7-1':'Saved writing'},previous,true);
  const stored=await repo.attempt(attempt.id),corrected=correctedFlyers16Result(stored);
  assert.equal(previous.listening.correct,0);assert.equal(corrected.listening.correct,5);
  assert.deepEqual(corrected.reading,previous.reading);
  assert.deepEqual(corrected.review.filter(q=>q.part!=='l1'||q.skill!=='listening'),previous.review.filter(q=>q.part!=='l1'||q.skill!=='listening'));
  assert.equal(await correctFlyers16Results(repo),1);
  const after=await repo.attempt(attempt.id);
  assert.deepEqual(after.result,corrected);assert.deepEqual(after.answers,stored.answers);assert.deepEqual(after.writing,stored.writing);
  assert.equal(after.submitted_at.getTime(),stored.submitted_at.getTime());assert.equal(after.updated_at.getTime(),stored.updated_at.getTime());
  const rank=(await repo.q('SELECT * FROM practice_rankings WHERE attempt_id=$1',[attempt.id]))[0];
  assert.equal(Number(rank.listening_score),corrected.listening.score);assert.equal(Number(rank.total_score),corrected.total);
  assert.deepEqual((await repo.q('SELECT previous_result FROM practice_score_corrections WHERE attempt_id=$1',[attempt.id]))[0].previous_result,previous);
  assert.equal(await correctFlyers16Results(repo),0);
 }finally{await db.close();}
});
