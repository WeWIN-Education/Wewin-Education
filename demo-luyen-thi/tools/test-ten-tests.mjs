import assert from 'node:assert/strict';
import {existsSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {exams,artwork,exam,selectExam,score,correct} from '../exam.mjs';

assert.equal(exams.length,10);
assert.equal(new Set(exams.map(e=>e.id)).size,10);
let count=0;
for(const e of exams) {
  assert.equal(selectExam(e.id),true);
  assert.equal(exam.id,e.id);
  const qs=['reading','listening'].flatMap(skill=>e[skill].flatMap(p=>p.questions));
  assert.equal(qs.length,40);
  assert.equal(new Set(qs.map(q=>q.id)).size,40);
  const all=Object.fromEntries(qs.map(q=>[q.id,q.answer]));
  assert.deepEqual(score(all),{reading:{total:20,correct:20,answered:20},listening:{total:20,correct:20,answered:20},total:40,answered:40});
  assert.equal(score({},e).answered,0);
  assert.equal(score(Object.fromEntries(qs.map(q=>[q.id,'wrong'])),e).total,0);
  assert.equal(score({...all,'r1-1':'wrong','l4-5':null},e).total,38);
  for(const q of e.listening[1].questions) if(q.numeric) assert.equal(correct(q,' '+q.accepted[0].toUpperCase()+' '),true);
  assert.equal(correct(e.reading[3].questions[4],'1'),true);
  assert.equal(correct(e.listening[3].questions[0],{target:'other',colour:e.listening[3].questions[0].answer.colour}),false);
  for(const q of e.listening[2].questions) assert.equal(q.choiceArts.length,3);
  const relative=[e.cover,...e.audio,...e.reading.filter(p=>p.image).map(p=>p.image),...e.listening.filter(p=>p.image).map(p=>p.image),...e.reading[3].storyArts.map(a=>a.file)];
  for(const path of relative) assert.equal(existsSync(fileURLToPath(new URL('../assets/'+path,import.meta.url))),true,path);
  const pdf=fileURLToPath(new URL('../'+e.pdf,import.meta.url));assert.ok(statSync(pdf).size>1000000,pdf);
  const arts=qs.flatMap(q=>q.choiceArts||q.art?[...(q.choiceArts||[q.art])]:[]);
  for(const word of [...arts,...e.reading[2].bank]) assert.ok(artwork[word],word);
  count+=qs.length;
}
for(const art of Object.values(artwork)) {
  assert.ok(art.clip[0]>=0&&art.clip[1]>=0&&art.clip[2]<=art.width&&art.clip[3]<=art.height);
  assert.equal(existsSync(fileURLToPath(new URL('../assets/'+art.file,import.meta.url))),true);
}
assert.equal(selectExam('invalid-test'),false);
assert.equal(exam.id,'starters-10');
selectExam('starters-01');
assert.equal(score({'l3-1':'A'}).total,1);
selectExam('starters-02');
assert.equal(score({'l3-1':'A'}).total,0);
assert.equal(score({'l3-1':'B'}).total,1);
console.log(`PASS: ${exams.length} tests / ${count} questions; independent answer keys, all-correct/wrong/blank/mixed scoring, numeric variants, colour targets, artwork and PDF/audio references.`);
