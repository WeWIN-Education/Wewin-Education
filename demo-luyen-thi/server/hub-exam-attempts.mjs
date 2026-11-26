import {createHash,timingSafeEqual} from 'node:crypto';
import {getExam} from './scoring.mjs';
import {productionRepository} from './repository.mjs';

const MAX_TAKE=100;
const DEFAULT_TAKE=50;

function hubKeyConfigured(){
 const key=process.env.WEWIN_HUB_API_KEY?.trim();
 return key&&key.length>=16?key:null;
}

/** Constant-time Bearer check for Admin Panel BFF. */
export function authorizeHubBearer(req){
 const expected=hubKeyConfigured();
 if(!expected)return {ok:false,status:503,code:'HUB_KEY_NOT_CONFIGURED'};
 const auth=String(req.headers.authorization||'');
 const match=/^Bearer\s+(\S+)$/i.exec(auth);
 if(!match)return {ok:false,status:401,code:'UNAUTHORIZED'};
 const provided=match[1];
 const a=createHash('sha256').update(provided).digest();
 const b=createHash('sha256').update(expected).digest();
 if(!timingSafeEqual(a,b))return {ok:false,status:401,code:'UNAUTHORIZED'};
 return {ok:true};
}

function publicOrigin(){
 const fromEnv=process.env.PUBLIC_APP_ORIGIN?.trim();
 if(fromEnv)return fromEnv.replace(/\/$/,'');
 return 'https://exam.wewin.edu.vn';
}

function mapItem(row,origin){
 const exam=getExam(row.exam_id);
 const submitted=!!row.submitted_at;
 const scoreRaw=row.total_score;
 const scoreTotal=scoreRaw===null||scoreRaw===undefined||scoreRaw===''?null:Number(scoreRaw);
 const studentName=row.nickname||(row.owner_kind==='guest'?'Khách đã đăng ký':'Học viên');
 const externalId=row.username?String(row.username).toUpperCase():(row.owner_kind==='guest'?'GUEST':'');
 return {
  id:row.id,
  externalId,
  studentName,
  ownerKind:row.owner_kind==='guest'?'guest':'user',
  examId:row.exam_id,
  examTitle:exam?.title||row.exam_id,
  examLevel:exam?.level||'',
  examNumber:exam?.number||'',
  status:submitted?'submitted':'draft',
  startedAt:row.created_at?new Date(row.created_at).toISOString():null,
  submittedAt:row.submitted_at?new Date(row.submitted_at).toISOString():null,
  scoreTotal:Number.isFinite(scoreTotal)?scoreTotal:null,
  scoreMax:100,
  detailUrl:`${origin}/?screen=staff&attempt=${encodeURIComponent(row.id)}`,
 };
}

/**
 * Lean hub list for WeWIN Admin Panel.
 * Auth: Authorization Bearer WEWIN_HUB_API_KEY (≥16).
 * Query: q, status=all|draft|submitted, take (1–100), offset.
 */
export async function listHubExamAttempts(req,{getRepository=productionRepository}={}){
 const auth=authorizeHubBearer(req);
 if(!auth.ok)return {status:auth.status,body:{code:auth.code}};

 const url=new URL(req.url,'https://exam.wewin.edu.vn');
 const status=url.searchParams.get('status')||'all';
 const q=String(url.searchParams.get('q')||'').trim().slice(0,100);
 const take=Math.min(MAX_TAKE,Math.max(1,Number(url.searchParams.get('take'))||DEFAULT_TAKE));
 const offset=Math.max(0,Math.min(10000,Number(url.searchParams.get('offset'))||0));
 if(!Number.isInteger(offset)||!['all','submitted','draft'].includes(status)){
  return {status:422,body:{code:'INVALID_INPUT',error:'Choose valid activity filters.'}};
 }

 const repo=await getRepository();
 if(!repo)return {status:503,body:{code:'DATABASE_UNAVAILABLE'}};

 const rows=await repo.hubLearningActivity({q,status,limit:take,offset});
 const origin=publicOrigin();
 const items=rows.map(row=>mapItem(row,origin));
 let submitted=0,draft=0;
 for(const item of items){
  if(item.status==='submitted')submitted+=1;
  else draft+=1;
 }
 return {
  status:200,
  body:{
   source:'exam',
   generatedAt:new Date().toISOString(),
   items,
   stats:{total:items.length,submitted,draft},
  },
 };
}
