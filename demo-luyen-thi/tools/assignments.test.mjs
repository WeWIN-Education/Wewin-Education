import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {PGlite} from '@electric-sql/pglite';
import {Repository} from '../server/repository.mjs';
import {createPlatformHandler,passwordHash} from '../server/platform.mjs';
import {getExam} from '../server/scoring.mjs';

test('class ownership, assignment deadlines, independent attempts and class results are enforced on the server',async()=>{
 const db=new PGlite(),repo=new Repository(db);await repo.migrate();let time=Date.parse('2026-11-03T01:00:00Z');
 const server=createServer(createPlatformHandler({getRepository:async()=>repo,now:()=>time}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const request=async(resource,{cookie='',data}={})=>{const r=await fetch(origin+'/?resource='+resource,{headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},...(data?{method:'POST',body:JSON.stringify(data)}:{})});return {status:r.status,body:await r.json(),cookie:r.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ')};};
 try{
  const users={},cookies={},hash=await passwordHash('123');for(const [name,role] of [['admin','admin'],['teacher','teacher'],['outside','teacher'],['student','student'],['other','student']]){users[name]=await repo.createUser({username:name,nickname:name,role,passwordHash:hash,mustChange:false});cookies[name]=(await request('login',{data:{username:name,password:'123'}})).cookie;}
  const cls=await repo.createClass('Flyers 1',null);await repo.enroll(cls.id,users.student.id);await repo.enroll(cls.id,users.other.id);
  const teacher=(id)=>request('class-teacher&id='+cls.id,{cookie:cookies.admin,data:{teacherId:id}});
  assert.equal((await request('class-teacher&id='+cls.id,{cookie:cookies.teacher,data:{teacherId:users.teacher.id}})).status,403);
  assert.equal((await teacher(users.student.id)).status,422);assert.equal((await teacher(users.teacher.id)).status,200);
  const payload={classId:cls.id,examId:'flyers-16',title:'Mock 16 homework',instructions:'Complete Reading and Listening.',dueAt:'2026-11-03T02:00:00Z'};
  assert.equal((await request('assignments')).status,401);
  assert.equal((await request('assignments',{cookie:cookies.outside,data:payload})).status,403);
  assert.equal((await request('assignments',{cookie:cookies.student,data:payload})).status,403);
  assert.equal((await request('assignments',{cookie:cookies.teacher,data:{...payload,dueAt:'2020-01-01T00:00:00Z'}})).status,422);
  assert.equal((await request('assignments',{cookie:cookies.teacher,data:{...payload,dueAt:'not-a-date'}})).status,422);
  const assigned=await request('assignments',{cookie:cookies.teacher,data:payload});assert.equal(assigned.status,201);const id=assigned.body.assignment.id;
  assert.equal((await request('assignments',{cookie:cookies.student})).body.assignments.length,1);
  assert.equal((await request('assignments',{cookie:cookies.outside})).body.assignments.length,0);
  assert.equal((await request('assignment&id='+id,{cookie:cookies.student})).status,403);
  const report=await request('assignment&id='+id,{cookie:cookies.teacher});assert.equal(report.body.students.length,2);assert.ok(report.body.students.every(s=>s.attempt_id===null));
  const unrelated=await repo.createUser({username:'unenrolled',nickname:'Unenrolled',role:'student',passwordHash:hash,mustChange:false});const outsider=(await request('login',{data:{username:unrelated.username,password:'123'}})).cookie;
  assert.equal((await request('assignment-start&id='+id,{cookie:outsider,data:{}})).status,403);
  const start=()=>request('assignment-start&id='+id,{cookie:cookies.student,data:{}});const starts=await Promise.all([start(),start()]);assert.equal(starts[0].status,200);assert.equal(starts[0].body.attempt.id,starts[1].body.attempt.id);const a=starts[0].body.attempt;
  const free=await request('attempts',{cookie:cookies.student,data:{examId:payload.examId}});assert.equal(free.status,200);assert.notEqual(free.body.attempt.id,a.id);assert.equal(free.body.attempt.assignment_id,null);
  const second=(await request('assignments',{cookie:cookies.teacher,data:{...payload,title:'Second independent assignment'}})).body.assignment;
  const a2=(await request('assignment-start&id='+second.id,{cookie:cookies.student,data:{}})).body.attempt;assert.notEqual(a2.id,a.id);assert.notEqual(a2.id,free.body.attempt.id);
  const exam=getExam(payload.examId),answers={};for(const skill of ['reading','listening'])for(const part of exam[skill]){if(part.manual)continue;if(part.painting)answers[part.id]=Object.fromEntries(part.questions.map(q=>[q.answer.target,{...(q.answer.color?{color:q.answer.color}:{word:q.answer.word})}]));else if(part.matchKey)answers[part.id]={...part.matchKey};else for(const q of part.questions)answers[q.id]=q.answer;}
  const submit=await request('submit&id='+a.id,{cookie:cookies.student,data:{answers,writing:{}}});assert.equal(submit.status,200);assert.equal(submit.body.attempt.result.total,100);
  assert.equal((await start()).body.attempt.id,a.id);
  assert.equal((await request('submit&id='+a.id,{cookie:cookies.student,data:{answers:{},writing:{}}})).body.attempt.result.total,100);
  time=Date.parse('2026-11-03T03:00:00Z');const late=await request('assignment-start&id='+id,{cookie:cookies.other,data:{}});assert.equal(late.status,200,'late submissions remain allowed and are labelled by due date');
  await request('submit&id='+late.body.attempt.id,{cookie:cookies.other,data:{answers:{},writing:{}}});
  const rows=(await request('assignment&id='+id,{cookie:cookies.teacher})).body.students;assert.equal(rows.find(s=>s.student_id===users.student.id).result.total,100);assert.equal(rows.find(s=>s.student_id===users.other.id).result.total,0);
  // Submission time comes from Postgres, not the client clock or input body.
  assert.ok(rows.every(s=>s.submitted_at));assert.equal((await request('assignments',{cookie:cookies.teacher})).body.assignments.find(x=>x.id===id).submitted_count,2);
  await teacher(users.outside.id);assert.equal((await request('assignment&id='+id,{cookie:cookies.teacher})).status,403);assert.equal((await request('assignment&id='+id,{cookie:cookies.outside})).status,200);
  const shared=await repo.createClass('Another class',users.teacher.id);await repo.enroll(shared.id,users.student.id);
  assert.equal((await request('attempt&id='+a.id,{cookie:cookies.teacher})).status,403,'teaching the same student elsewhere does not grant this assignment');
  assert.ok(!(await request('history&id='+users.student.id,{cookie:cookies.teacher})).body.attempts.some(x=>x.id===a.id));
  assert.ok(!(await request('activity',{cookie:cookies.teacher})).body.activities.some(x=>x.id===a.id));
  assert.equal((await request('assignment&id='+second.id,{cookie:cookies.outside,data:{dueAt:'2026-11-04T03:00:00Z'}})).status,200);
  assert.equal((await request('assignment&id='+second.id,{cookie:cookies.outside,data:{close:true}})).status,200);
  assert.equal((await request('assignment-start&id='+second.id,{cookie:cookies.student,data:{}})).status,409);
  assert.equal((await request('submit&id='+a2.id,{cookie:cookies.student,data:{answers:{},writing:{}}})).status,409);
  assert.ok(!(await request('assignments',{cookie:cookies.student})).body.assignments.some(x=>x.id===second.id));
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));await db.close();}
});
