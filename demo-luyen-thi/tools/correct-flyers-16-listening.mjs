import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';

// Verified against the supplied Part 1 script, teacher key and seven picture targets.
const corrected={Oliver:'p6',Robert:'p3',Isabel:'p7',Emma:'p2',Sophia:'p4'};
const original={Oliver:'p7',Robert:'p2',Isabel:'p3',Emma:'p6',Sophia:'p5'};
function correct(exams){
 const before=structuredClone(exams),exam=exams.find(e=>e.id==='flyers-16');
 assert.ok(exam);const part=exam.listening[0];
 assert.ok(JSON.stringify(part.matchKey)===JSON.stringify(original)||JSON.stringify(part.matchKey)===JSON.stringify(corrected));
 part.matchKey={...corrected};for(const q of part.questions){assert.ok(corrected[q.prompt]);q.answer=corrected[q.prompt];}
 const check=structuredClone(exams),restored=check.find(e=>e.id==='flyers-16').listening[0],old=before.find(e=>e.id==='flyers-16').listening[0];
 restored.matchKey=old.matchKey;restored.questions=old.questions;
 assert.deepEqual(check,before,'Only Mock 16 Listening Part 1 keys may change.');
 return exams;
}
const source=new URL('../flyers-hard.mjs',import.meta.url),raw=await readFile(source,'utf8'),prefix='export const flyersHard = ',start=raw.indexOf(prefix)+prefix.length;
const end=raw.lastIndexOf(']')+1;
await writeFile(source,raw.slice(0,start)+JSON.stringify(correct(JSON.parse(raw.slice(start,end))),null,2)+raw.slice(end));
const privateFile=new URL('../generated/exams-private.json',import.meta.url);
await writeFile(privateFile,JSON.stringify(correct(JSON.parse(await readFile(privateFile,'utf8')))));
console.log('Corrected only Flyers Mock 16 Listening Part 1. Content version and all other keys remain unchanged.');
