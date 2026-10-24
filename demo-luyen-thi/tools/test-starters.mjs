import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {exams} from '../exams.mjs';
import {startersHard} from '../starters-hard.mjs';
import report from '../generated/starters-audio-report.json' with {type:'json'};

assert.equal(exams.length,10);assert.deepEqual(exams.map(e=>e.number),Array.from({length:10},(_,i)=>String(i+6).padStart(2,'0')));
assert.equal(startersHard.length,10);assert.deepEqual(startersHard.map(e=>e.number),Array.from({length:10},(_,i)=>String(i+16)));
assert.equal(report.normalTests,10);assert.equal(report.hardTests,10);assert.equal(report.parts,80);assert.equal(report.files.length,80);
for(const e of [...exams,...startersHard]){
 assert.equal(e.reading.length,5);assert.equal(e.listening.length,4);assert.equal(e.audio.length,4);
 assert.equal(e.reading.flatMap(p=>p.questions).length,25,e.id);assert.equal(e.listening.flatMap(p=>p.questions).length,20,e.id);
 assert.equal(e.listening[0].personOrder.length,7);assert.equal(e.listening[0].personOrder[0],e.listening[0].exampleName);
 assert.equal(Object.keys(e.listening[0].matchKey).length,5);
 assert.equal(e.listening[3].questions.length,5);assert.ok(e.listening[3].questions.every(q=>q.colour&&q.answer.target&&q.answer.colour));
 assert.equal(e.difficulty==='Hard',Number(e.number)>=16,e.id);
 for(const audio of e.audio)assert.ok(existsSync(fileURLToPath(new URL('../assets/'+audio,import.meta.url))),audio);
 for(const p of [...e.reading,...e.listening])for(const path of [...(p.images||[]),...(p.image?[p.image]:[])])assert.ok(existsSync(fileURLToPath(new URL('../assets/'+path,import.meta.url))),path);
}
assert.ok(report.files.filter(x=>x.test.startsWith('starters-16')).every(x=>x.qa==='PASS'));
for(const row of report.files){const bytes=readFileSync(fileURLToPath(new URL('../assets/'+row.file,import.meta.url)));assert.equal(bytes.length,row.bytes,row.file);assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256,row.file);}
console.log('PASS: Starters 06–15 and Hard 16–25, 900 objective answers, 80 Part audio tracks, aligned Part 1 targets and colour tasks.');
