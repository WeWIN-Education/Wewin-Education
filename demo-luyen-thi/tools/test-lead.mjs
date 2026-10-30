import {PGlite} from '@electric-sql/pglite';
import {Repository} from '../server/repository.mjs';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createLeadHandler,hasSignedGuestToken,googleConfirmed} from '../lead-server.mjs';
import {validateLead,leadFields} from '../lead-fields.mjs';

const secret='test-only-secret-with-at-least-32-characters';
const valid={phone:'0900000000',school:'Lớp 1–2',goal:'Luyện Cambridge',parent:'Test fixture',age:'8',area:'Test fixture',vip:'Chưa chắc',student:'Không phải'};
assert.equal(leadFields.length,8);
assert.deepEqual(Object.keys(validateLead({}).errors),['phone','school','goal']);
assert.equal(validateLead({...valid,phone:'1234567890'}).valid,false);
assert.equal(validateLead({...valid,age:'19'}).valid,false);
assert.equal(validateLead({...valid,school:'fake option'}).valid,false);
assert.equal(validateLead({phone:valid.phone,school:valid.school,goal:valid.goal}).valid,true);
const thanks='Cảm ơn Quý phụ huynh đã đăng ký! WeWIN Education đã ghi nhận thông tin và sẽ liên hệ để tư vấn trong thời gian sớm nhất.';
assert.equal(googleConfirmed(`<script>var schema=${JSON.stringify(thanks)}</script><form>Phone required</form>`),false);
assert.equal(googleConfirmed(`<div>${thanks}</div>`),true);
let mode='success',calls=[];
const fakeFetch=async(url,options={})=>{
  calls.push({url,options});
  if(mode==='offline')throw new Error('offline');
  if(url.endsWith('viewform'))return new Response('<input name="fbzx" value="123">');
  return new Response(mode==='success'?`<div>${thanks}</div>`:'<h1>Verify you are human</h1>');
};
const db=new PGlite();const repo=new Repository(db);await repo.migrate();
const server=createServer(createLeadHandler({secret,fetchImpl:fakeFetch,getRepository:async()=>repo}));
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const post=(body,headers={})=>fetch(origin,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
try{
  assert.equal((await (await fetch(origin)).json()).registered,false);
  assert.equal((await post({})).status,422);assert.equal(calls.length,0);
  assert.equal((await post(valid,{Origin:'https://other.example'})).status,403);
  const accepted=await post(valid);assert.equal(accepted.status,200);
  const registration=await accepted.json();assert.equal(registration.registered,true);assert.ok(registration.guest.expiresAt);
  const cookie=accepted.headers.get('set-cookie');assert.ok(cookie.includes('HttpOnly'));assert.ok(!cookie.includes(valid.phone));
  assert.equal(hasSignedGuestToken(cookie,secret),true);assert.equal(hasSignedGuestToken(cookie,secret,Date.now()+86400000),false);
  assert.equal(hasSignedGuestToken(cookie,secret+'forged'),false);
  assert.equal(hasSignedGuestToken('wewin_lead_access=invalid.'+'Á'.repeat(43),secret),false);
  const encoded=calls[1].options.body;
  for(const field of leadFields)assert.equal(encoded.get('entry.'+field.entry),valid[field.name]);
  assert.equal(encoded.get('fbzx'),'123');
  assert.equal((await (await fetch(origin,{headers:{Cookie:cookie.split(';')[0]}})).json()).registered,true);
  mode='captcha';const denied=await post(valid);assert.equal(denied.status,502);assert.equal(denied.headers.get('set-cookie'),null);
  mode='offline';assert.equal((await post(valid)).status,502);
  assert.equal((await (await fetch(origin)).json()).registered,false);
  console.log('PASS: field validation, exact Google mappings, confirmed-only access, schema/captcha rejection, signed cookie, expiry and network failures. No live form submissions.');
}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await db.close();}
