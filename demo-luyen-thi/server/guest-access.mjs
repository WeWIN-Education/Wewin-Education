import {createHash,createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
export const GUEST_COOKIE='wewin_lead_access';
export const GUEST_LIFETIME_MS=24*60*60*1000;
export const GUEST_IDLE_MS=3*60*60*1000;
const sign=(value,key)=>createHmac('sha256',key).update(value).digest('base64url');
export const guestPhoneHash=(phone,key)=>createHmac('sha256',key).update('guest-phone:'+phone).digest('hex');
export const guestTokenHash=token=>createHash('sha256').update(token).digest('hex');
export const guestCookieToken=cookie=>(cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(GUEST_COOKIE+'='))?.slice(GUEST_COOKIE.length+1)||'';
export function readGuestToken(cookie,key,now=Date.now(),allowExpired=false){
 if(!key)return null;
 const [payload,signature,...extra]=guestCookieToken(cookie).split('.');
 if(!payload||!signature||extra.length||! /^[A-Za-z0-9_-]{43}$/.test(signature))return null;
 const expected=sign(payload,key);
 if(!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return null;
 try{
  const value=JSON.parse(Buffer.from(payload,'base64url').toString());
  // Reject the former 30-day v1 cookies; they do not have an idle deadline.
  return value.v===2&&/^[a-f0-9-]{36}$/.test(value.id||'')&&/^[a-f0-9]{32}$/.test(value.nonce||'')&&Number.isFinite(value.exp)&&(allowExpired||value.exp>now)?value:null;
 }catch{return null;}
}
export function guestCookie(req,token='',expiresAt=0,now=Date.now()){
 const age=token?Math.max(0,Math.ceil((expiresAt-now)/1000)):0;
 return `${GUEST_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${age}${req.headers['x-forwarded-proto']==='https'||process.env.VERCEL?'; Secure':''}`;
}
export const guestSummary=(row,now)=>({id:row.guest_id||row.id,expiresAt:new Date(row.guest_expires_at||row.expires_at).toISOString(),idleExpiresAt:new Date(Math.min(new Date(row.last_activity_at).getTime()+GUEST_IDLE_MS,new Date(row.guest_expires_at||row.expires_at).getTime())).toISOString(),serverNow:new Date(now).toISOString()});
export async function authenticateGuest(repo,cookie,key,now=Date.now()){
 const raw=guestCookieToken(cookie);if(!raw)return {guest:null,reason:null};
 const value=readGuestToken(cookie,key,now,true);
 if(!value)return {guest:null,reason:'invalid'};
 if(value.exp<=now)return {guest:null,reason:'expired'};
 if(!repo)return {guest:null,reason:'unavailable'};
 const row=await repo.guestSession(guestTokenHash(raw),value.id);
 if(!row)return {guest:null,reason:'invalid'};
 if(new Date(row.guest_expires_at).getTime()<=now||new Date(row.expires_at).getTime()<=now)return {guest:null,reason:'expired'};
 if(new Date(row.last_activity_at).getTime()+GUEST_IDLE_MS<=now)return {guest:null,reason:'idle_expired'};
 return {guest:guestSummary(row,now),reason:null,tokenHash:guestTokenHash(raw)};
}
export async function issueGuestSession(repo,record,key,now=Date.now()){
 const expiresAt=new Date(record.expires_at).getTime();
 const payload=Buffer.from(JSON.stringify({v:2,id:record.id,exp:expiresAt,nonce:randomBytes(16).toString('hex')})).toString('base64url');
 const token=payload+'.'+sign(payload,key);
 await repo.newGuestSession(guestTokenHash(token),record.id,expiresAt,now);
 return {token,guest:guestSummary({...record,last_activity_at:new Date(now)},now),expiresAt};
}
