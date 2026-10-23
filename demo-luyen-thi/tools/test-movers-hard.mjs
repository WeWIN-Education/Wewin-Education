import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {moversHard} from '../movers-hard.mjs';
import report from '../generated/movers-hard-audio.json' with {type:'json'};

assert.equal(moversHard.length,10);
assert.deepEqual(moversHard.map(e=>e.number),Array.from({length:10},(_,i)=>String(i+16)));
assert.equal(report.tests,10);assert.equal(report.parts,50);assert.equal(report.allPass,true);
assert.equal(report.files.length,50);assert.ok(report.files.every(row=>row.qa==='PASS'));
for(const e of moversHard){
 assert.equal(e.difficulty,'Hard');assert.equal(e.version,'2026-10-23-movers-hard-v1');
 assert.equal(e.reading.length,6);assert.equal(e.listening.length,5);assert.equal(e.audio.length,5);
 const reading=e.reading.filter(p=>!p.manual).flatMap(p=>p.questions),listening=e.listening.flatMap(p=>p.questions);
 assert.equal(reading.length,29,e.id);assert.equal(listening.length,25,e.id);
 assert.equal(e.reading[5].manual,true);assert.equal(e.reading[5].questions.length,6);
 assert.ok(e.reading[5].questions.every(q=>q.sample&&!q.answer));
 assert.equal(e.listening[0].personOrder.length,7);assert.equal(e.listening[0].personOrder[0],e.listening[0].exampleName);
 assert.equal(Object.keys(e.listening[0].matchKey).length,5);
 assert.equal(new Set(Object.values(e.listening[0].matchKey)).size,5);
 assert.equal(e.listening[4].questions.filter(q=>q.colour).length,4);
 assert.equal(e.listening[4].questions.filter(q=>!q.colour).length,1);
 assert.ok(e.listening[4].questions.every(q=>q.targets?.length===4));
 for(const audio of e.audio){assert.ok(existsSync(fileURLToPath(new URL('../assets/'+audio,import.meta.url))),audio);}
 for(const p of [...e.reading,...e.listening])for(const image of p.images)assert.ok(existsSync(fileURLToPath(new URL('../assets/'+image,import.meta.url))),image);
}
for(const row of report.files){
 const bytes=readFileSync(fileURLToPath(new URL('../assets/'+row.file,import.meta.url)));
 assert.equal(bytes.length,row.bytes,row.file);
 assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256,row.file);
}
console.log('PASS: ten Hard Movers tests, 290 auto-marked Reading answers, 250 Listening answers, 60 separate Part 6 writing responses and 50 QA-approved Part MP3s.');
