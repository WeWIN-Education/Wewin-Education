import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {packs20261118} from '../packs20261118.mjs';
import {allExams} from '../public-data.mjs';
import {getExam,grade,validateSubmission} from '../server/scoring.mjs';
import {paintScene,personAtPoint} from '../picture-ui.mjs';
import media from '../media-manifest.mjs';

test('Thirty new papers grade correctly with source-aligned part counts and protected answers',async()=>{
 assert.equal(packs20261118.length,30);assert.equal(allExams.length,110);
 for(const exam of packs20261118){
  const expected=exam.levelKey==='starters'?[25,20,5,4]:exam.levelKey==='movers'?[29,25,6,5]:[30,25,7,5];
  assert.equal(exam.reading.length,expected[2]);assert.equal(exam.listening.length,expected[3]);assert.equal(exam.audio.length,expected[3]);
  const answers={};for(const p of exam.reading.concat(exam.listening)){
   if(p.manual)continue;
   if(p.matchKey)answers[p.id]=p.matchKey;
   else if(p.painting)answers[p.id]=Object.fromEntries(p.questions.map(q=>[q.answer.target,{color:q.answer.color,word:q.answer.word}]));
   else for(const q of p.questions){answers[q.id]=q.answer;if(q.choices)assert.ok(q.choices.some(c=>(typeof c==='string'?c:c.value)===q.answer),`${exam.id} ${q.id}`);}
  }
  const result=grade(exam,validateSubmission(exam,{answers}).answers);assert.equal(result.total,100,exam.id);assert.equal(result.reading.total,expected[0]);assert.equal(result.listening.total,expected[1]);
  const pub=allExams.find(e=>e.id===exam.id);assert.doesNotMatch(JSON.stringify(pub),/"(?:answer|accepted|sample|matchKey|writingImages)"\s*:/);
  for(const file of exam.audio)assert.ok((await stat(new URL('../assets/'+file,import.meta.url))).size>1000);
  if(exam.levelKey!=='ket'){
   const spec=pub.listening[0].interaction;assert.equal(spec.names.length,7);assert.equal(spec.targets.length,6);
   for(const t of spec.targets)assert.equal(personAtPoint(spec,t.x*10,100+t.y*spec.imageHeight/100)?.id,t.id);
   const painting=pub.listening.at(-1).interaction;assert.ok(painting.example.color);assert.ok(!painting.regions.some(r=>r.path===painting.example.path));
   assert.ok(paintScene(pub.listening.at(-1),{}).includes('pointer-events:none'));
   for(const q of exam.listening.at(-1).questions)assert.ok(painting.regions.some(r=>r.id===q.answer.target));
  }
  const images=[pub.cover,...pub.reading.flatMap(p=>p.images||[]),...pub.listening.flatMap(p=>p.images||[])];
  for(const image of images)assert.ok(media.images[image],image);
 }
 const fixed=getExam('starters-40').reading[4].questions[0];assert.equal(fixed.prompt,'What animal is near the pond?');assert.equal(fixed.answer,'frog');
 assert.equal(grade(getExam('starters-40'),{'r5-2':'rock'}).reading.correct,1);
});

test('New KET edition has independent IDs and corrected source keys without replacing the old edition',()=>{
 assert.equal(getExam('ket-01').version,'2026-11-07-ket-v1');assert.equal(getExam('ket-01').reading[4].questions[5].answer,'to');
 const e=getExam('ket-20261118-01');assert.equal(e.reading[4].questions[5].answer,'with');assert.match(e.title,/18\/11/);assert.equal(e.writingAssessment,'teacher');
 assert.equal(e.reading[5].minWords,25);assert.equal(e.reading[6].minWords,35);
 assert.equal(allExams.filter(e=>e.levelKey==='ket').length,20);
});

test('All 140 supplied Part tracks are decoded, assigned to the right paper and match stored hashes',async()=>{
 const report=JSON.parse(await readFile(new URL('../generated/packs20261118-report.json',import.meta.url),'utf8'));
 assert.equal(report.audioParts,140);assert.equal(report.audioFiles.length,140);
 const files=new Set(packs20261118.flatMap(e=>e.audio));assert.equal(files.size,140);
 for(const row of report.audioFiles){assert.equal(row.status,'PASS');assert.ok(files.has(row.file));const bytes=await readFile(new URL('../assets/'+row.file,import.meta.url));assert.equal(bytes.length,row.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256);}
});
