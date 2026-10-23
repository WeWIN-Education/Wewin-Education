import assert from 'node:assert/strict';
import {existsSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {flyersHard} from '../flyers-hard.mjs';
import allPrivate from '../generated/exams-private.json' with {type:'json'};
import audioReport from '../generated/flyers-hard-audio.json' with {type:'json'};
import {flyers as baseFlyers} from '../flyers.mjs';
assert.equal(flyersHard.length,10);
assert.deepEqual(flyersHard.map(e=>e.number),Array.from({length:10},(_,i)=>String(i+16)));
assert.equal(baseFlyers.length,10);
for(const e of flyersHard){
 assert.equal(e.difficulty,'Hard');assert.equal(e.reading.length,7);assert.equal(e.listening.length,5);
 const reading=e.reading.filter(p=>!p.manual).flatMap(p=>p.questions),listening=e.listening.flatMap(p=>p.questions);
 assert.equal(reading.length,43,e.id);assert.equal(listening.length,25,e.id);
 assert.equal(e.reading[6].manual,true);assert.equal(e.reading[6].questions.length,1);
 assert.ok(e.reading[6].questions[0].sample.split(/\s+/).length>=20);
 assert.equal(e.audio.length,5);assert.equal(new Set(e.audio).size,5);assert.equal(e.version,'2026-10-23-flyers-hard-v1');
 for(const path of [...e.audio,...[e.cover,...e.reading.flatMap(p=>p.images||[]),...e.listening.flatMap(p=>p.images||[])].filter(Boolean)])assert.ok(existsSync(fileURLToPath(new URL('../assets/'+path,import.meta.url))),`${e.id}: ${path}`);
 for(const p of [...e.reading,...e.listening])for(const q of p.questions){if(q.choices?.length)assert.ok(q.choices.some(c=>(typeof c==='string'?c:c.value)===q.answer),`${e.id} ${q.id}`);}
 const p1=e.listening[0];assert.equal(p1.personOrder.length,7);assert.equal(p1.personOrder[0],p1.exampleName);assert.equal(Object.keys(p1.matchKey).length,5);assert.equal(new Set(Object.values(p1.matchKey)).size,5);
 assert.ok(e.listening[4].questions.slice(0,3).every(q=>q.answer.includes('|')&&!q.answer.includes('| ')),`${e.id}: paint colors must be trimmed`);
 for(const file of e.audio){const row=audioReport.audio.find(a=>a.file===file);assert.ok(row?.qa==='PASS',file);assert.equal(statSync(fileURLToPath(new URL('../assets/'+file,import.meta.url))).size,row.bytes,file);}
}
const imported=allPrivate.filter(e=>e.id>='flyers-16'&&e.id<='flyers-25');assert.equal(imported.length,10);assert.equal(audioReport.partAudios,50);assert.equal(audioReport.qaPass,50);
for(const e of imported){assert.equal(e.difficulty,'Hard');assert.equal(e.version,'2026-10-23-flyers-hard-v1');assert.equal(e.reading.filter(p=>!p.manual).reduce((n,p)=>n+p.questions.length,0),43);assert.equal(e.listening.reduce((n,p)=>n+(p.matchKey?Object.keys(p.matchKey).length:p.questions.length),0),25);}
console.log('PASS: ten Hard Flyers tests, 680 objective questions, seven correctly mapped Part 1 people, five Listening parts per test, 20-word Writing prompts and 50 QA-approved Part MP3s.');
