import assert from 'node:assert/strict';
import {exams as sourceStarters} from '../exams.mjs';
import {allExams} from '../public-data.mjs';
import manifest from '../media-manifest.mjs';
import privateExams from '../generated/exams-private.json' with {type:'json'};
import publicExams from '../generated/exams-public.json' with {type:'json'};

assert.deepEqual(sourceStarters,[]);
for(const collection of [allExams,privateExams,publicExams])assert.equal(collection.some(e=>e.levelKey==='starters'||e.id.startsWith('starters-')),false);
assert.equal(allExams.length,40);
assert.equal(allExams.filter(e=>e.levelKey==='movers').length,20);
assert.equal(allExams.filter(e=>e.levelKey==='flyers').length,20);
assert.equal(Object.keys(manifest.images).some(path=>path.startsWith('tests/')),false);
assert.equal(manifest.files.some(path=>path.includes('/tests/')),false);
console.log('PASS: existing Starter tests are absent from source, private/public exam data, and optimized media; 20 Movers and 20 Flyers remain.');
