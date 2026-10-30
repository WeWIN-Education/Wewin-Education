import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createHmac} from 'node:crypto';
import {PGlite} from '@electric-sql/pglite';
import {Repository} from '../server/repository.mjs';
import {createPlatformHandler} from '../server/platform.mjs';
import {createLeadHandler} from '../lead-server.mjs';
import {GUEST_IDLE_MS,GUEST_LIFETIME_MS,guestTokenHash,guestCookieToken} from '../server/guest-access.mjs';
import {createGuestSessionGuard} from '../guest-session.mjs';

test('guest access has a fixed 24-hour lifetime, a server-enforced 3-hour idle limit, and phone re-login',async()=>{
 const db=new PGlite(),repo=new Repository(db);await repo.migrate();
 const key='guest-time-test-secret-longer-than-thirty-two-characters';
 const start=Date.now();let time=start;
 const google=async url=>new Response(url.endsWith('viewform')?'<input name="fbzx" value="test">':'<div>Cảm ơn Quý phụ huynh đã đăng ký! WeWIN Education đã ghi nhận thông tin</div>');
 const lead=createLeadHandler({secret:key,fetchImpl:google,getRepository:async()=>repo,now:()=>time});
 const platform=createPlatformHandler({leadSecret:key,getRepository:async()=>repo,now:()=>time});
 const server=createServer((req,res)=>req.url.startsWith('/lead')?lead(req,res):platform(req,res));
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const request=async(resource,{data,cookie='',lead=false}={})=>{
  const response=await fetch(origin+(lead?'/lead':'/?resource='+resource),{method:data===undefined?'GET':'POST',headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},...(data===undefined?{}:{body:JSON.stringify(data)})});
  const setCookies=response.headers.getSetCookie();return {status:response.status,body:await response.json(),cookies:setCookies,cookie:setCookies.find(c=>c.startsWith('wewin_lead_access=')&&!c.includes('Max-Age=0'))?.split(';')[0]};
 };
 try{
  const form={phone:'0900000000',school:'Lớp 1–2',goal:'Luyện Cambridge'};
  const registered=await request('',{lead:true,data:form});assert.equal(registered.status,200);assert.equal(registered.body.registered,true);
  const first=registered.cookie,id=registered.body.guest.id,expiry=new Date(start+GUEST_LIFETIME_MS).toISOString();
  assert.equal(registered.body.guest.expiresAt,expiry);assert.ok(registered.cookies[0].includes('Max-Age=86400'));assert.ok(!first.includes(form.phone));
  const started=await request('attempts',{cookie:first,data:{examId:'starters-06'}});assert.equal(started.status,200);const attemptId=started.body.attempt.id;
  assert.equal(started.body.attempt.owner_id,id);assert.equal(started.body.attempt.owner_kind,'guest');
  time=start+GUEST_IDLE_MS-1;
  for(let i=0;i<3;i++)assert.equal((await request('session',{cookie:first})).body.registered,true);
  const row=await repo.guestSession(guestTokenHash(guestCookieToken(first)),id);assert.equal(new Date(row.last_activity_at).getTime(),start,'GET polling is not activity');
  time=start+GUEST_IDLE_MS;
  const idle=await request('session',{cookie:first});assert.equal(idle.body.registered,false);assert.equal(idle.body.guestStatus,'idle_expired');assert.ok(idle.cookies.some(c=>c.includes('Max-Age=0')));
  for(const [resource,data] of [['attempts',{examId:'starters-06'}],['draft&id='+attemptId,{answers:{}}],['submit&id='+attemptId,{answers:{}}],['touch-session',{}]]){
   const denied=await request(resource,{cookie:first,data});assert.equal(denied.status,401);assert.equal(denied.body.code,'GUEST_SESSION_EXPIRED');
  }
  assert.equal((await request('attempt&id='+attemptId,{cookie:first})).status,401);
  assert.equal((await request('login',{data:{username:form.phone,password:'wrong'}})).status,401);
  const logged=await request('login',{data:{username:form.phone,password:'123'}});assert.equal(logged.status,200);assert.equal(logged.body.user,null);assert.equal(logged.body.accessType,'guest');
  const second=logged.cookie;assert.notEqual(second,first);assert.equal(logged.body.guest.id,id);assert.equal(logged.body.guest.expiresAt,expiry);
  const history=await request('history',{cookie:second});assert.ok(history.body.attempts.some(a=>a.id===attemptId),'re-login retains the same guest draft owner');
  assert.equal((await request('writing&id='+attemptId,{cookie:second,data:{}})).status,401,'guests never gain student/AI permissions');
  // Keep active for a full day; activity may extend idle time but never the original access expiry.
  for(let hours=5;hours<=23;hours+=2){time=start+hours*3600000;const touched=await request('touch-session',{cookie:second,data:{}});assert.equal(touched.status,200);assert.equal(touched.body.guest.expiresAt,expiry);}
  time=start+GUEST_LIFETIME_MS;
  assert.equal((await request('session',{cookie:second})).body.registered,false);
  const expired=await request('login',{data:{username:form.phone,password:'123'}});assert.equal(expired.status,401);assert.equal(expired.body.code,'GUEST_ACCESS_EXPIRED');
  assert.equal((await request('submit&id='+attemptId,{cookie:second,data:{}})).body.code,'GUEST_ACCESS_EXPIRED');
  const renewed=await request('',{lead:true,data:form});assert.equal(renewed.body.guest.expiresAt,new Date(time+GUEST_LIFETIME_MS).toISOString());
  assert.equal((await request('session',{cookie:second})).body.registered,false,'registering again cannot revive a previously expired session');
  time+=1000;
  const repeated=await request('',{lead:true,data:form});assert.equal(repeated.body.guest.expiresAt,renewed.body.guest.expiresAt,'repeating the form inside 24 hours cannot extend access');
  const oldPayload=Buffer.from(JSON.stringify({v:1,exp:time+30*86400000,nonce:'legacy'})).toString('base64url');const oldCookie='wewin_lead_access='+oldPayload+'.'+createHmac('sha256',key).update(oldPayload).digest('base64url');
  assert.equal((await request('session',{cookie:oldCookie})).body.registered,false,'old 30-day cookies are rejected');
  assert.equal((await request('attempts',{cookie:oldCookie,data:{examId:'starters-06'}})).status,401);
  const logout=await request('logout',{cookie:renewed.cookie,data:{}});assert.equal(logout.status,200);assert.ok(logout.cookies.filter(c=>c.includes('Max-Age=0')).length===2);
  assert.equal((await request('session',{cookie:renewed.cookie})).body.registered,false);
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));await db.close();}
});

test('client activity guard only touches on actual input and verifies before unlocking after inactivity',async()=>{
 let now=0,expired=[],updates=0;const requests=[];let callback;const base={registered:true,user:null,guest:{id:'one',serverNow:new Date(0).toISOString(),idleExpiresAt:new Date(GUEST_IDLE_MS).toISOString(),expiresAt:new Date(GUEST_LIFETIME_MS).toISOString()}};
 let response=base;
 const guard=createGuestSessionGuard({request:async resource=>{requests.push(resource);return response;},onExpired:r=>expired.push(r),onUpdate:()=>updates++,clock:()=>now,setTimer:fn=>{callback=fn;return 1;},clearTimer(){},setPoll:()=>2,clearPoll(){}});
 guard.setSession(base);await guard.check();assert.deepEqual(requests,['session']);
 await guard.noteActivity();assert.equal(requests.at(-1),'touch-session');
 await guard.noteActivity();assert.equal(requests.length,2,'input is throttled');
 now=GUEST_IDLE_MS;response={registered:false,guest:null,guestStatus:'idle_expired'};
 await guard.noteActivity();assert.equal(requests.at(-1),'session','input after expiry cannot revive the old session');assert.deepEqual(expired,['idle_expired']);
 await guard.noteActivity();assert.equal(requests.length,3);assert.equal(updates,2);
 guard.setSession({...base,guest:{...base.guest,serverNow:new Date(now).toISOString(),idleExpiresAt:new Date(now+GUEST_IDLE_MS).toISOString()}});
 response={registered:true,user:null,guest:{...base.guest,serverNow:new Date(now).toISOString(),idleExpiresAt:new Date(now+GUEST_IDLE_MS).toISOString()}};
 await callback();assert.equal(requests.at(-1),'session','deadline checks do not send a heartbeat');guard.stop();
});

test('client locks at an unverified deadline and ignores stale checks after account sign-in',async()=>{
 let now=0,expired=[];let resolve;
 const snapshot={registered:true,user:null,guest:{id:'guest',serverNow:new Date(0).toISOString(),idleExpiresAt:new Date(GUEST_IDLE_MS).toISOString(),expiresAt:new Date(GUEST_LIFETIME_MS).toISOString()}};
 let offline=false;
 const guard=createGuestSessionGuard({request:()=>offline?Promise.reject(new Error('offline')):new Promise(r=>resolve=r),onExpired:r=>expired.push(r),clock:()=>now,setTimer:()=>1,clearTimer(){},setPoll:()=>2,clearPoll(){}});
 guard.setSession(snapshot);const oldCheck=guard.check();guard.setSession({registered:true,user:{id:'student'},guest:null});resolve({registered:false,guest:null});await oldCheck;assert.deepEqual(expired,[]);
 guard.setSession(snapshot);now=GUEST_IDLE_MS;offline=true;await guard.check();assert.deepEqual(expired,['unverified']);guard.stop();
});
