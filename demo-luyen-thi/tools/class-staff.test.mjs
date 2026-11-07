import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {PGlite} from '@electric-sql/pglite';
import {Repository} from '../server/repository.mjs';
import {createPlatformHandler,passwordHash} from '../server/platform.mjs';
import {teacherForm,renderClassManagement} from '../assignments-ui.mjs';
import {readFile} from 'node:fs/promises';

test('additive staffing setup preserves an existing database and is safe to repeat on a new instance',async()=>{
 const db=new PGlite(),repo=new Repository(db);
 try{
  const schema=await readFile(new URL('../server/schema.sql',import.meta.url),'utf8');for(const sql of schema.split(';').filter(s=>s.trim()))await repo.q(sql);
  const teacher=await repo.createUser({username:'legacy.teacher',nickname:'Existing teacher',role:'teacher',passwordHash:await passwordHash('123'),mustChange:false});
  const cls=await repo.createClass('Existing class',teacher.id);
  await Promise.all([repo.ensureClassStaff(),repo.ensureClassStaff()]);
  assert.equal((await repo.classById(cls.id)).teacher_id,teacher.id);
  await repo.assignClassStaff(cls.id,[teacher.id],[],'WW-EXISTING');
  const fresh=new Repository(db);await fresh.ensureClassStaff();
  assert.equal((await fresh.classById(cls.id)).class_code,'WW-EXISTING');assert.equal((await fresh.user(teacher.id)).nickname,'Existing teacher');
 }finally{await db.close();}
});

test('lead teachers, co-teachers and assistants have equal access only to assigned classes',async()=>{
 const db=new PGlite(),repo=new Repository(db);await repo.migrate();await repo.ensureClassStaff();
 const server=createServer(createPlatformHandler({getRepository:async()=>repo}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const request=async(resource,{cookie='',data}={})=>{const r=await fetch(origin+'/?resource='+resource,{headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},...(data?{method:'POST',body:JSON.stringify(data)}:{})});return {status:r.status,body:await r.json(),cookie:r.headers.getSetCookie().map(s=>s.split(';')[0]).join('; ')};};
 try{
  const users={},cookies={},hash=await passwordHash('123');
  for(const name of ['admin','lead','co','assistant','outside','student','other']){users[name]=await repo.createUser({username:'staff.'+name,nickname:name,role:name==='admin'?'admin':['student','other'].includes(name)?'student':'teacher',passwordHash:hash,mustChange:false});cookies[name]=(await request('login',{data:{username:'staff.'+name,password:'123'}})).cookie;}
  const cls=await repo.createClass('Shared class',users.lead.id),foreign=await repo.createClass('Other class',users.outside.id);await repo.enroll(cls.id,users.student.id);await repo.enroll(foreign.id,users.student.id);await repo.enroll(foreign.id,users.other.id);
  const payload={classCode:'ww00192',teacherIds:[users.lead.id,users.co.id],assistantIds:[users.assistant.id]};
  assert.equal((await request('class-staff&id='+cls.id,{cookie:cookies.co,data:payload})).status,403);
  assert.equal((await request('class-staff&id='+cls.id,{cookie:cookies.admin,data:{...payload,assistantIds:[users.student.id]}})).status,422);
  assert.equal((await request('class-staff&id='+cls.id,{cookie:cookies.admin,data:{...payload,assistantIds:[users.co.id]}})).status,422);
  const saved=await request('class-staff&id='+cls.id,{cookie:cookies.admin,data:payload});assert.equal(saved.status,200);assert.equal(saved.body.class.class_code,'WW00192');
  assert.equal((await request('class-staff&id='+foreign.id,{cookie:cookies.admin,data:payload})).status,409);
  assert.equal((await repo.classById(foreign.id)).teacher_id,users.outside.id,'a class-code collision rolls back the whole staff edit');
  const create=async(name,classId=cls.id)=>request('assignments',{cookie:cookies[name],data:{classId,examId:'ket-01',dueAt:new Date(Date.now()+86400000).toISOString()}});
  for(const name of ['lead','co','assistant']){
   const staff=(await request('staff',{cookie:cookies[name]})).body;assert.deepEqual(staff.classes.map(c=>c.id),[cls.id]);assert.deepEqual(staff.users.map(u=>u.id),[users.student.id]);assert.equal(staff.classStaff.length,3);assert.ok(staff.classStaff.some(s=>s.role==='assistant'&&s.user_id===users.assistant.id));
   assert.ok(await repo.mayTeach(users[name],users.student.id));assert.equal(await repo.mayTeach(users[name],users.other.id),false);
   const assigned=await create(name);assert.equal(assigned.status,201);const id=assigned.body.assignment.id;
   assert.equal((await request('assignment&id='+id,{cookie:cookies.co})).status,200);
   assert.equal((await request('assignment&id='+id,{cookie:cookies.assistant,data:{dueAt:new Date(Date.now()+172800000).toISOString()}})).status,200);
  }
  assert.equal((await create('co',foreign.id)).status,403);
  const own=(await request('assignments',{cookie:cookies.co})).body.assignments[0];
  const attempt=(await request('assignment-start&id='+own.id,{cookie:cookies.student,data:{}})).body.attempt;
  await request('submit&id='+attempt.id,{cookie:cookies.student,data:{answers:{},writing:{}}});
  for(const name of ['lead','co','assistant']){
   assert.equal((await request('attempt&id='+attempt.id,{cookie:cookies[name]})).status,200);
   assert.ok((await request('history&id='+users.student.id,{cookie:cookies[name]})).body.attempts.some(a=>a.id===attempt.id));
   assert.ok((await request('activity',{cookie:cookies[name]})).body.activities.some(a=>a.id===attempt.id));
  }
  const outsideAssignment=(await create('outside',foreign.id)).body.assignment;
  const outsideAttempt=(await request('assignment-start&id='+outsideAssignment.id,{cookie:cookies.student,data:{}})).body.attempt;
  assert.equal((await request('attempt&id='+outsideAttempt.id,{cookie:cookies.co})).status,403);
  assert.equal((await request('assignment&id='+outsideAssignment.id,{cookie:cookies.assistant})).status,403);
  assert.ok(!(await request('history&id='+users.student.id,{cookie:cookies.co})).body.attempts.some(a=>a.id===outsideAttempt.id));
  assert.ok(!(await request('activity',{cookie:cookies.assistant})).body.activities.some(a=>a.id===outsideAttempt.id));
  await request('class-staff&id='+cls.id,{cookie:cookies.admin,data:{teacherIds:[users.lead.id],assistantIds:[]}});
  assert.equal((await repo.classById(cls.id)).class_code,'WW00192','omitting classCode preserves it');
  for(const name of ['co','assistant']){assert.equal((await request('staff',{cookie:cookies[name]})).body.classes.length,0);assert.equal((await request('assignment&id='+own.id,{cookie:cookies[name]})).status,403);assert.equal((await request('attempt&id='+attempt.id,{cookie:cookies[name]})).status,403);}
  assert.equal((await request('assignment&id='+own.id,{cookie:cookies.lead})).status,200);
 }finally{await new Promise(r=>server.close(r));await db.close();}
});

test('staff form supports searchable multiple selection and class cards name the entire teaching team',()=>{
 const cls={id:'c',name:'FLYERS 2',teacher_id:'a',class_code:'WW00230'},users=[{id:'a',nickname:'Teacher A',username:'a',role:'teacher',active:true},{id:'b',nickname:'Teacher B',username:'b',role:'teacher',active:true},{id:'t',nickname:'Assistant',username:'t',role:'teacher',active:true}];
 const classStaff=[{class_id:'c',user_id:'a',nickname:'Teacher A',role:'teacher',is_primary:true},{class_id:'c',user_id:'b',nickname:'Teacher B',role:'teacher'},{class_id:'c',user_id:'t',nickname:'Assistant',role:'assistant'}];
 const form=teacherForm(cls,users,classStaff);assert.match(form,/name="coTeacherIds" multiple/);assert.match(form,/name="assistantIds" multiple/);assert.match(form,/value="b" selected/);assert.match(form,/value="t" selected/);assert.match(form,/WW00230/);
 const cards=renderClassManagement({staff:{classes:[cls],users,enrollments:[],classStaff},user:{role:'admin'}});assert.match(cards,/Teacher A \+ Teacher B/);assert.match(cards,/Trợ giảng/);assert.match(cards,/Assistant/);assert.match(cards,/WW00230/);
});
