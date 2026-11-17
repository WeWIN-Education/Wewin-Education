import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {flyers40} from '../flyers40.mjs';
import {allExams} from '../public-data.mjs';
import media from '../media-manifest.mjs';
import {grade,validateSubmission} from '../server/scoring.mjs';
import {personAtPoint} from '../picture-ui.mjs';
import {createHash} from 'node:crypto';

test('Flyers 40–49 contain 680 objective questions, ten writing tasks and no placeholder audio URLs',async()=>{
 assert.equal(flyers40.length,10);assert.deepEqual(flyers40.map(e=>e.number),Array.from({length:10},(_,i)=>String(i+40)));
 for(const exam of flyers40){
  const pub=allExams.find(e=>e.id===exam.id);assert.ok(pub);assert.equal(exam.reading.length,7);assert.equal(exam.listening.length,5);
  assert.equal(exam.reading.filter(p=>!p.manual).flatMap(p=>p.questions).length,43);
  assert.equal(exam.listening.flatMap(p=>p.questions).length,25);assert.equal(exam.reading[6].manual,true);
  assert.equal(exam.audioPending,false);assert.equal(exam.audio.length,5);assert.deepEqual(pub.audio,exam.audio);assert.ok(exam.audioVersion);
  for(const file of exam.audio)assert.ok((await stat(new URL('../assets/'+file,import.meta.url))).size>1024);
  const answers={};for(const p of exam.reading.concat(exam.listening)){
   if(p.manual)continue;
   if(p.matchKey)answers[p.id]=p.matchKey;
   else if(p.painting)answers[p.id]=Object.fromEntries(p.questions.map(q=>[q.answer.target,{color:q.answer.color,word:q.answer.word}]));
   else for(const q of p.questions){answers[q.id]=q.answer;if(q.choices)assert.ok(q.choices.some(c=>(typeof c==='string'?c:c.value)===q.answer));}
  }
  assert.equal(grade(exam,validateSubmission(exam,{answers}).answers).total,100,exam.id);
  const spec=pub.listening[0].interaction;assert.equal(spec.targets.length,8);assert.ok(spec.targets.some(t=>t.id===spec.example.target));
  for(const target of spec.targets)assert.equal(personAtPoint(spec,target.x*10,100+target.y*spec.imageHeight/100)?.id,target.id,`${exam.id}: overlapping person hit area`);
  assert.equal(pub.listening[4].interaction.regions.length,5);
  for(const key of [exam.cover,...exam.reading.flatMap(p=>p.images||p.storyImages||[]),...exam.listening.flatMap(p=>p.images||[]),spec.image,pub.listening[4].interaction.image]){
   const item=media.images[key];assert.ok(item,key);for(const v of item.variants)assert.ok((await stat(new URL('../assets/'+v.file,import.meta.url))).size>100);
  }
 }
 const pub=await readFile(new URL('../public-data.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(pub,/"(?:answer|accepted|matchKey|sample)"\s*:/);
});

test('Test 40 follows named people and teacher examples rather than source coordinate placeholders',()=>{
 const exam=flyers40[0],pub=allExams.find(e=>e.id===exam.id);
 assert.deepEqual(exam.listening[0].matchKey,{William:'p2',Katy:'p6',Sarah:'p8',Holly:'p5',George:'p4'});
 assert.equal(pub.listening[0].interaction.example.name,'Betty');
 assert.equal(pub.listening[0].interaction.example.target,'p7');
 assert.deepEqual(pub.listening[0].interaction.names.map(n=>n.id),['David','Holly','Sarah','George','Katy','Betty','William']);
 assert.ok(new Set(pub.listening[0].interaction.targets.map(p=>`${p.x},${p.y}`)).size===8);
 assert.deepEqual(exam.listening[2].questions.map(q=>q.answer),['B','G','A','F','D']);
 assert.deepEqual(exam.listening[3].questions.map(q=>q.answer),['A','B','A','C','B']);
 assert.deepEqual(exam.reading[5].questions[0].accepted,['who','that']);
 assert.equal(grade(exam,{'r6-1':'that'}).reading.correct,1);
});

test('All 50 Listening recordings match the reviewed and decoded audio manifest',async()=>{
 const report=JSON.parse(await readFile(new URL('../generated/flyers40-audio.json',import.meta.url),'utf8'));
 const review=JSON.parse(await readFile(new URL('../generated/flyers40-audio-review.json',import.meta.url),'utf8'));
 assert.equal(report.partAudioFiles,50);assert.equal(report.files.length,50);assert.equal(review.readyForListeningPublication,true);
 const reviewed=new Set(review.listeningFiles.map(f=>f.sha256));
 assert.equal(new Set(report.files.map(f=>f.sha256)).size,50);
 for(const row of report.files){
  assert.equal(row.status,'PASS');assert.ok(reviewed.has(row.sourceSHA256));assert.ok(row.duration>30);
  const bytes=await readFile(new URL('../assets/'+row.file,import.meta.url));assert.equal(bytes.length,row.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256);
  assert.ok(flyers40.find(e=>Number(e.number)===row.test).audio.includes(row.file));
 }
});
