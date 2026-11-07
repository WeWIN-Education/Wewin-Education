import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {stat,readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {allExams} from '../public-data.mjs';
import {exams,grade,validateSubmission} from '../server/scoring.mjs';
import {Repository} from '../server/repository.mjs';
import {createPlatformHandler,passwordHash} from '../server/platform.mjs';
import {renderScoreCards,renderLeaderboard} from '../results-ui.mjs';
import {assignmentForm} from '../assignments-ui.mjs';
import {ketMaterials,readKetMaterial} from '../server/ket-materials.mjs';
import manifest from '../media-manifest.mjs';

test('all ten KET papers contain every part, 55 answer-key-verified objective items and separate writing',async()=>{
 const ket=exams.filter(e=>e.levelKey==='ket');assert.equal(ket.length,10);assert.equal(allExams.length,70);
 for(const e of ket){
  assert.equal(e.title,'Mock '+e.number);
  assert.equal(e.reading.length,7);assert.equal(e.listening.length,5);assert.equal(e.writingAssessment,'teacher');
  const answers=Object.fromEntries([...e.reading.filter(p=>!p.manual),...e.listening].flatMap(p=>p.questions.map(q=>[q.id,q.answer])));
  const result=grade(e,answers);assert.equal(result.reading.total,30);assert.equal(result.listening.total,25);assert.equal(result.total,100);
  assert.equal(grade(e,{}).total,0);assert.equal(e.reading[5].minWords,25);assert.equal(e.reading[6].minWords,35);
  const saved=validateSubmission(e,{answers,writing:{'r6-1':'My email.','r7-1':'My story.'}});assert.deepEqual(saved.writing,{'r6-1':'My email.','r7-1':'My story.'});
  assert.equal(new Set([...e.reading,...e.listening].flatMap(p=>p.questions.map(q=>q.id))).size,57);
  for(const path of [...e.audio,e.fullAudio,e.studentPdf])assert.ok((await stat(new URL('../assets/'+path,import.meta.url))).size>1000,path);
  const pub=allExams.find(p=>p.id===e.id);assert.ok(!/"(?:answer|accepted|sample|script|answer_key)"\s*:/.test(JSON.stringify(pub)));
  for(const p of [...pub.reading,...pub.listening])for(const image of p.images)assert.ok(manifest.images[image]);
  assert.equal(pub.speakingImages.length,1);
  assert.doesNotMatch(renderScoreCards(result,'ket'),/shield/);assert.match(renderScoreCards(result,'ket'),/30/);
 }
 assert.doesNotMatch(renderLeaderboard([{nickname:'KET learner',rank:1,total_score:100,reading_correct:30,reading_total:30,listening_correct:25,listening_total:25}],'ket'),/shield-symbol/);
 assert.match(assignmentForm({cls:{id:'test',name:'KET class'},exams:allExams}),/value="ket-10"/);
 assert.equal(await readKetMaterial('../../schema.sql'),null);
});

test('KET can be assigned, submitted and reviewed; only staff can download keys and scripts',async()=>{
 const db=new PGlite(),repo=new Repository(db);await repo.migrate();
 const server=createServer(createPlatformHandler({getRepository:async()=>repo}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const request=async(resource,{cookie='',data}={})=>fetch(origin+'/?resource='+resource,{headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},...(data?{method:'POST',body:JSON.stringify(data)}:{})});
 try{
  const cookies={},users={},hash=await passwordHash('123');
  for(const role of ['admin','teacher','student']){users[role]=await repo.createUser({username:'ket.'+role,nickname:'KET '+role,role,passwordHash:hash,mustChange:false});const r=await request('login',{data:{username:'ket.'+role,password:'123'}});assert.equal(r.status,200);cookies[role]=r.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ');}
  for(const [id,,filename] of ketMaterials){
   assert.equal((await request('ket-material&id='+id)).status,401);
   assert.equal((await request('ket-material&id='+id,{cookie:cookies.student})).status,403);
   const r=await request('ket-material&id='+id,{cookie:cookies.teacher});assert.equal(r.status,200);assert.equal(r.headers.get('cache-control'),'private, no-store');assert.match(r.headers.get('content-disposition'),new RegExp(filename.replaceAll('.','\\.')));
   const expected=await readFile(new URL('../server/materials/ket/'+filename,import.meta.url));assert.deepEqual(Buffer.from(await r.arrayBuffer()),expected);
  }
  assert.equal((await request('ket-material&id=unknown',{cookie:cookies.admin})).status,404);
  const cls=await repo.createClass('KET import fixture',users.teacher.id);await repo.enroll(cls.id,users.student.id);
  const assigned=await request('assignments',{cookie:cookies.teacher,data:{classId:cls.id,examId:'ket-01',dueAt:new Date(Date.now()+86400000).toISOString()}});assert.equal(assigned.status,201);const {assignment}=await assigned.json();
  const started=await request('assignment-start&id='+assignment.id,{cookie:cookies.student,data:{}});assert.equal(started.status,200);const {attempt}=await started.json();
  const e=exams.find(e=>e.id==='ket-01'),answers=Object.fromEntries([...e.reading.filter(p=>!p.manual),...e.listening].flatMap(p=>p.questions.map(q=>[q.id,q.answer])));
  answers['r5-2']='that'; // A listed alternative remains valid.
  const submitted=await request('submit&id='+attempt.id,{cookie:cookies.student,data:{answers,writing:{'r6-1':'My email.','r7-1':'My story.'}}});assert.equal(submitted.status,200);const saved=(await submitted.json()).attempt;assert.equal(saved.result.total,100);assert.equal(saved.writing['r7-1'],'My story.');
  const report=await request('assignment&id='+assignment.id,{cookie:cookies.teacher});assert.equal(report.status,200);assert.equal((await report.json()).students[0].result.total,100);
  const review=await request('attempt&id='+attempt.id,{cookie:cookies.teacher});assert.equal((await review.json()).attempt.writing['r6-1'],'My email.');
  assert.equal((await request('writing&id='+attempt.id,{cookie:cookies.student,data:{}})).status,422);
 }finally{await new Promise(r=>server.close(r));await db.close();}
});
