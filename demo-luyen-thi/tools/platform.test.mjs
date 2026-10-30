import test from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {createServer} from 'node:http';
import {guestPhoneHash,issueGuestSession,GUEST_LIFETIME_MS} from '../server/guest-access.mjs';
import {readFile} from 'node:fs/promises';
import {Repository} from '../server/repository.mjs';
import {createPlatformHandler,passwordHash,passwordMatches} from '../server/platform.mjs';
import {exams,grade,validateSubmission} from '../server/scoring.mjs';
import {validateReview} from '../server/writing.mjs';
const allAnswers=e=>Object.fromEntries(['reading','listening'].flatMap(s=>e[s].filter(p=>!p.manual).flatMap(p=>p.painting?[[p.id,Object.fromEntries(p.questions.map(q=>[q.answer.target,{color:q.answer.color,word:q.answer.word}]))]]:p.matchKey?[[p.id,p.matchKey]]:p.questions.map(q=>[q.id,q.answer]))));
test('all 60 available Starter, Movers and Flyers tests grade perfectly without exposing private data',async()=>{
 let count=0;for(const e of exams){const answers=allAnswers(e);const s=grade(e,validateSubmission(e,{answers}).answers);assert.equal(s.total,100,e.id);assert.equal(grade(e,{}).total,0);count+=s.reading.total+s.listening.total;}
 assert.equal(count,3340);
 const data=JSON.parse(await readFile(new URL('../generated/exams-public.json',import.meta.url),'utf8'));
 assert.equal(data.length,60);for(const e of data){assert.equal(e.listening[0].interaction.names.length,7,e.id);assert.equal(new Set(e.listening[0].interaction.names.map(n=>n.id)).size,7,e.id);for(const skill of ['reading','listening'])for(const part of e[skill])for(const q of part.questions){assert.ok(!('answer'in q));assert.ok(!('sample'in q));assert.ok(!('accepted'in q));}}
 const starters=data.filter(e=>e.levelKey==='starters');assert.equal(starters.length,20);assert.ok(starters.every(e=>e.readingCount===25&&e.listeningCount===20));assert.equal(starters.filter(e=>e.difficulty==='Hard').length,10);assert.deepEqual(starters.map(e=>e.number),Array.from({length:20},(_,i)=>String(i+6).padStart(2,'0')));
 const hardFlyers=data.filter(e=>e.id>='flyers-16'&&e.id<='flyers-25');assert.equal(hardFlyers.length,10);assert.ok(hardFlyers.every(e=>e.difficulty==='Hard'&&e.readingCount===43&&e.listeningCount===25));
 const hardMovers=data.filter(e=>e.id>='movers-16'&&e.id<='movers-25');assert.equal(hardMovers.length,10);assert.ok(hardMovers.every(e=>e.difficulty==='Hard'&&e.readingCount===29&&e.listeningCount===25));
 const f=exams.find(e=>e.id==='flyers-12');assert.equal(grade(f,{'l2-3':'thirty two'}).listening.correct,1);
});
test('password hashing has random salts and constant length comparisons',async()=>{const a=await passwordHash('abcdefghij123');const b=await passwordHash('abcdefghij123');assert.notEqual(a,b);assert.ok(await passwordMatches('abcdefghij123',a));assert.equal(await passwordMatches('wrong',a),false);});
test('real Postgres semantics: auth, permissions, atomic first ranking, idempotency and writing ownership',async()=>{
 const db=new PGlite();const repo=new Repository(db);await repo.migrate();
 const key='local-lead-test-secret-at-least-thirty-two-characters';
 let calls=0;const ai=async()=>{calls++;return {completion:'Bé kể đúng các tranh.',corrections:[],vocabulary:['afterwards'],score:4,maxScore:5,sample:'The children helped one another.',itemScores:[]};};
 const server=createServer(createPlatformHandler({getRepository:async()=>repo,ai,leadSecret:key}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const request=async(resource,{cookie='',data,method}={})=>{const r=await fetch(origin+'/?resource='+resource,{method:method||(data===undefined?'GET':'POST'),headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},...(data===undefined?{}:{body:JSON.stringify(data)})});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};};
 try{
  const password=await passwordHash('Temporary-12345');const admin=await repo.createUser({username:'admin',nickname:'Admin',role:'admin',passwordHash:password,mustChange:false});const student=await repo.createUser({username:'student',nickname:'Learner A',role:'student',passwordHash:password,mustChange:false});const other=await repo.createUser({username:'other',nickname:'Learner B',role:'student',passwordHash:password,mustChange:false});const teacher=await repo.createUser({username:'teacher',nickname:'Teacher',role:'teacher',passwordHash:password,mustChange:false});const outsider=await repo.createUser({username:'outsider',nickname:'Outside',role:'teacher',passwordHash:password,mustChange:false});
  const login=async username=>(await request('login',{data:{username,password:'Temporary-12345'}})).cookie;
  const cookies={student:await login('student'),other:await login('other'),teacher:await login('teacher'),outsider:await login('outsider'),admin:await login('admin')};
  assert.equal((await request('login',{data:{username:'student',password:'bad'}})).status,401);
  const defaultAccount=await request('users',{cookie:cookies.admin,data:{username:'default.student',nickname:'Default learner',role:'student'}});assert.equal(defaultAccount.status,201);
  const defaultLogin=await request('login',{data:{username:'default.student',password:'123'}});assert.equal(defaultLogin.status,200);assert.equal(defaultLogin.body.user.mustChangePassword,false);
  assert.equal((await request('attempts',{cookie:defaultLogin.cookie,data:{examId:'flyers-06'}})).status,200);
  await request('user&id='+defaultAccount.body.user.id,{cookie:cookies.admin,data:{password:'123'}});
  assert.equal((await request('session',{cookie:defaultLogin.cookie})).body.user,null);
  assert.equal((await request('login',{data:{username:'default.student',password:'123'}})).body.user.mustChangePassword,false);
  await repo.q('DELETE FROM practice_attempts WHERE owner_id=$1',[defaultAccount.body.user.id]);

  const crossOrigin=await fetch(origin+'/?resource=attempts',{method:'POST',headers:{Origin:'https://unrelated.example','Content-Type':'application/json',Cookie:cookies.student},body:JSON.stringify({examId:'flyers-06'})});assert.equal(crossOrigin.status,403);
  await repo.createUser({username:'temporary',nickname:'Temporary',role:'student',passwordHash:password});const temporary=await login('temporary');assert.equal((await request('attempts',{cookie:temporary,data:{examId:'flyers-06'}})).body.code,'PASSWORD_CHANGE_REQUIRED');const changed=await request('password',{cookie:temporary,data:{currentPassword:'Temporary-12345',password:'Updated-123456'}});assert.equal(changed.status,200);assert.equal((await request('session',{cookie:temporary})).body.user,null);assert.equal((await request('session',{cookie:changed.cookie})).body.user.mustChangePassword,false);
  const cls=await repo.createClass('Class A',teacher.id);await repo.enroll(cls.id,student.id);
  assert.equal((await request('users',{cookie:cookies.teacher,data:{username:'bad',nickname:'Bad',role:'admin',password:'Temporary-12345'}})).status,403);
  const exam=exams.find(e=>e.id==='flyers-06');const start=()=>request('attempts',{cookie:cookies.student,data:{examId:exam.id}});let attempt=(await start()).body.attempt;
  assert.equal((await start()).body.attempt.id,attempt.id,'two starts resume one draft');
  assert.equal((await request('attempt&id='+attempt.id,{cookie:cookies.other})).status,403);
  assert.equal((await request('attempt&id='+attempt.id,{cookie:cookies.outsider})).status,403);
  assert.equal((await request('attempt&id='+attempt.id,{cookie:cookies.teacher})).status,200);
  const data={answers:allAnswers(exam),writing:{'r7-1':'Lily and Win helped their friend. An adult found the kite. They played together in the park and were happy.'}};
  const submitted=await request('submit&id='+attempt.id,{cookie:cookies.student,data});assert.equal(submitted.status,200);assert.equal(submitted.body.attempt.result.total,100);
  const duplicate=await request('submit&id='+attempt.id,{cookie:cookies.student,data:{answers:{},writing:{}}});assert.equal(duplicate.body.attempt.result.total,100);
  const concurrent=(await request('attempts',{cookie:cookies.other,data:{examId:exam.id}})).body.attempt;const replies=await Promise.all([request('submit&id='+concurrent.id,{cookie:cookies.other,data}),request('submit&id='+concurrent.id,{cookie:cookies.other,data:{answers:{},writing:{}}})]);assert.equal(replies[0].body.attempt.result.total,replies[1].body.attempt.result.total);assert.equal((await repo.q('SELECT count(*)::int AS count FROM practice_rankings WHERE attempt_id=$1',[concurrent.id]))[0].count,1);
  const second=(await start()).body.attempt;await request('submit&id='+second.id,{cookie:cookies.student,data:{answers:{},writing:{}}});
  const rankings=await request('leaderboard&exam='+exam.id);assert.equal(rankings.body.entries.length,2);assert.equal(Number(rankings.body.entries.find(e=>e.nickname==='Learner A').total_score),100);assert.ok(!JSON.stringify(rankings.body).includes('username'));assert.equal(rankings.body.entries.find(e=>e.nickname==='Learner A').reading_correct,exam.reading.filter(p=>!p.manual).flatMap(p=>p.questions).length);assert.equal(rankings.body.entries.find(e=>e.nickname==='Learner A').listening_total,exam.listening.flatMap(p=>p.questions).length);
  assert.equal((await request('writing&id='+attempt.id,{cookie:cookies.other,data:{}})).status,403);
  const reviewed=await request('writing&id='+attempt.id,{cookie:cookies.student,data:{}});assert.equal(reviewed.body.review.status,'completed');await request('writing&id='+attempt.id,{cookie:cookies.student,data:{}});assert.equal(calls,1);
  const override={...reviewed.body.review.original,score:5,completion:'Giáo viên xác nhận bài tốt.'};assert.equal((await request('review-override&id='+attempt.id,{cookie:cookies.outsider,data:{review:override,reason:'Test'}})).status,403);const adjusted=await request('review-override&id='+attempt.id,{cookie:cookies.teacher,data:{review:override,reason:'Reviewed all three pictures'}});assert.equal(adjusted.body.review.original.score,4);assert.equal(adjusted.body.review.teacher_override.score,5);assert.equal(adjusted.body.audit.length,1);
  const guestRecord=await repo.registerGuest(guestPhoneHash('0900000000',key),await passwordHash('123'),Date.now(),GUEST_LIFETIME_MS);const issuedGuest=await issueGuestSession(repo,guestRecord,key);const guestCookie='wewin_lead_access='+issuedGuest.token;
  const guestAttempt=(await request('attempts',{cookie:guestCookie,data:{examId:exam.id}})).body.attempt;const guestSubmit=await request('submit&id='+guestAttempt.id,{cookie:guestCookie,data});assert.equal(guestSubmit.status,200);assert.equal(guestSubmit.body.attempt.result.total,100);assert.equal((await request('writing&id='+guestAttempt.id,{cookie:guestCookie,data:{}})).status,401);assert.equal((await request('leaderboard&exam='+exam.id)).body.entries.length,2);
  assert.equal((await request('activity')).status,401);
  assert.equal((await request('activity',{cookie:cookies.student})).status,403);
  assert.equal((await request('activity',{cookie:guestCookie})).status,401);
  const teacherActivity=await request('activity',{cookie:cookies.teacher});assert.equal(teacherActivity.status,200);assert.ok(teacherActivity.body.activities.length>=2);assert.ok(teacherActivity.body.activities.every(a=>a.nickname==='Learner A'&&a.owner_kind==='user'));assert.ok(teacherActivity.body.activities.every(a=>!('answers' in a)&&!('writing' in a)&&!('password_hash' in a)));
  assert.equal((await request('activity',{cookie:cookies.outsider})).body.activities.length,0);
  assert.equal((await request('activity&student='+other.id,{cookie:cookies.teacher})).body.activities.length,0);
  assert.equal((await request('activity&status=draft',{cookie:cookies.teacher})).body.activities.length,0);
  assert.equal((await request('activity&offset=50',{cookie:cookies.admin})).body.activities.length,0);
  assert.equal((await request('activity&status=invalid',{cookie:cookies.admin})).status,422);
  const adminActivity=(await request('activity',{cookie:cookies.admin})).body.activities;assert.ok(adminActivity.some(a=>a.owner_kind==='guest'));assert.ok(adminActivity.some(a=>a.nickname==='Learner B'));
  const inactive=await request('user&id='+student.id,{cookie:cookies.admin,data:{active:false}});assert.equal(inactive.status,200);assert.equal((await request('session',{cookie:cookies.student})).body.user,null);
  assert.equal((await request('user&id='+admin.id,{cookie:cookies.admin,data:{active:false}})).status,409);
  assert.equal(validateReview(override,5,1).score,5);
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));await db.close();}
});
