import {createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
import {leadFields,validateLead} from './lead-fields.mjs';

const FORM='https://docs.google.com/forms/d/e/1FAIpQLSc5bUxbhReVstusCwfhTlXFX5mV-L_35JWzI7EO8LtzFIZkBg';
const COOKIE='wewin_lead_access';
const MAX_AGE=30*24*60*60;
const sign=(data,secret)=>createHmac('sha256',secret).update(data).digest('base64url');
export function hasLeadAccess(cookie,secret,now=Date.now()){
  if(!secret)return false;
  const token=(cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);
  if(!token)return false;
  const [payload,signature,...extra]=token.split('.');
  if(!payload||!signature||extra.length||! /^[A-Za-z0-9_-]{43}$/.test(signature))return false;
  const expected=sign(payload,secret);
  if(signature.length!==expected.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return false;
  try{const value=JSON.parse(Buffer.from(payload,'base64url').toString());return value.v===1&&Number.isFinite(value.exp)&&value.exp>now;}catch{return false;}
}

export function googleConfirmed(html){
  // The original unsubmitted form also contains the confirmation message inside
  // its schema script. Only inspect rendered text, never that embedded schema.
  const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/\s+/g,' ');
  return text.includes('Cảm ơn Quý phụ huynh đã đăng ký!')&&text.includes('WeWIN Education đã ghi nhận thông tin');
}

export function createLeadHandler({fetchImpl=fetch,secret=()=>process.env.LEAD_GATE_SECRET,now=()=>Date.now()}={}){
  return async function handler(req,res){
    const send=(status,body)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(body));};
    const key=typeof secret==='function'?secret():secret;
    if(!key||key.length<32)return send(503,{message:'Đăng ký đang được cập nhật. Vui lòng thử lại sau.'});
    const registered=hasLeadAccess(req.headers.cookie,key,now());
    if(req.method==='GET')return send(200,{registered});
    if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return send(405,{message:'Yêu cầu không hợp lệ.'});}
    const host=req.headers['x-forwarded-host']||req.headers.host;
    try{if(!req.headers.origin||new URL(req.headers.origin).host!==host)return send(403,{message:'Vui lòng gửi đăng ký từ trang WeWIN.'});}catch{return send(403,{message:'Yêu cầu không hợp lệ.'});}
    if(registered)return send(200,{registered:true});
    if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(415,{message:'Yêu cầu không hợp lệ.'});
    let input;
    try{
      if(Number(req.headers['content-length'])>8192)return send(413,{message:'Thông tin quá dài.'});
      if(req.body!==undefined)input=typeof req.body==='string'?JSON.parse(req.body):req.body;
      else{let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>8192)return send(413,{message:'Thông tin quá dài.'});}input=JSON.parse(raw);}
    }catch{return send(400,{message:'Không đọc được thông tin. Vui lòng thử lại.'});}
    const result=validateLead(input);
    if(!result.valid)return send(422,{message:'Vui lòng kiểm tra các thông tin được đánh dấu.',errors:result.errors});
    try{
      // Fetch current hidden form state first. No answers are sent during this GET.
      const page=await fetchImpl(FORM+'/viewform',{signal:AbortSignal.timeout(15000)});
      if(!page.ok)throw new Error('form-unavailable');
      const html=await page.text();
      const body=new URLSearchParams({fvv:'1',pageHistory:'0'});
      const fbzx=html.match(/name="fbzx"[^>]*value="([^"]+)"/);
      if(fbzx)body.set('fbzx',fbzx[1]);
      for(const field of leadFields)if(result.values[field.name])body.set('entry.'+field.entry,result.values[field.name]);
      const cookies=(page.headers.getSetCookie?.()||[]).map(c=>c.split(';')[0]).join('; ');
      const response=await fetchImpl(FORM+'/formResponse',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded',...(cookies?{Cookie:cookies}:{})},body,signal:AbortSignal.timeout(20000)});
      if(!response.ok||!googleConfirmed(await response.text()))return send(502,{message:'Chưa xác nhận được thông tin đăng ký. Vui lòng thử lại; bài luyện sẽ mở sau khi gửi thành công.'});
      const payload=Buffer.from(JSON.stringify({v:1,exp:now()+MAX_AGE*1000,nonce:randomBytes(12).toString('hex')})).toString('base64url');
      const secure=req.headers['x-forwarded-proto']==='https'||Boolean(process.env.VERCEL);
      res.setHeader('Set-Cookie',`${COOKIE}=${payload}.${sign(payload,key)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}${secure?'; Secure':''}`);
      return send(200,{registered:true});
    }catch{return send(502,{message:'Kết nối đăng ký đang gián đoạn. Thông tin bạn nhập vẫn được giữ trên màn hình; vui lòng thử lại.'});}
  };
}
