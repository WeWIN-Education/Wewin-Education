import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {movers} from '../movers.mjs';
assert.equal(movers.length,10);
assert.equal(new Set(movers.map(e=>e.id)).size,10);
for(const [index,e] of movers.entries()){
 assert.equal(e.number,String(index+6).padStart(2,'0'));
 assert.equal(e.reading.length,6);assert.equal(e.listening.length,5);
 assert.equal(e.audio.length,5);assert.equal(new Set(e.audio).size,5);assert.ok(e.audioVersion);for(const a of e.audio){assert.equal(typeof a,'string');assert.ok(existsSync(fileURLToPath(new URL('../assets/'+a,import.meta.url))),a);}
 const reading=e.reading.filter(p=>!p.manual).flatMap(p=>p.questions);
 const listening=e.listening.flatMap(p=>p.questions);
 assert.equal(reading.length,29);assert.equal(listening.length,25);
 const all=[...reading,...listening];assert.equal(new Set(all.map(q=>q.id)).size,54);
 for(const q of all){assert.equal(typeof q.answer,'string');assert.ok(q.answer.trim());
  if(q.choices?.length)assert.ok(q.choices.some(c=>(typeof c==='string'?c:c.value)===q.answer),q.id);
  if(q.colour)assert.ok(q.targets.includes(q.answer.split('|')[0]));
 }
 assert.equal(e.reading[5].manual,true);assert.equal(e.reading[5].questions.length,6);
 assert.ok(e.reading[5].questions.every(q=>q.sample&&!q.answer));
 for(const p of [...e.reading,...e.listening])for(const image of p.images)assert.ok(existsSync(fileURLToPath(new URL('../assets/'+image,import.meta.url))),image);
 assert.deepEqual(e.reading[2].questions[5].choices.map(c=>c.value),['A','B','C']);
 assert.ok(e.reading[2].questions[5].choices.every(c=>c.label.length>5));
 assert.ok(!e.pdf);
}
console.log('PASS: 10 Movers tests, 540 objective questions, 60 teacher-reviewed writing answers, source images present, 50 Part MP3 files present, no PDF downloads.');
