import {createHash,randomBytes,randomUUID,scrypt as scryptCallback,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {productionRepository} from './repository.mjs';
import {getExam,validateSubmission,grade} from './scoring.mjs';
import {hasLeadAccess} from '../lead-server.mjs';
import {assessWriting,writingPart,writingHash,validateReview} from './writing.mjs';
const scrypt=promisify(scryptCallback),COOKIE='wewin_session';
const hash=value=>createHash('sha256').update(value).digest('hex');
export async function passwordHash(password){if(typeof password!=='string'||password.length<10||password.length>128)throw new ApiError(422,'Use a password of 10–128 characters.');const salt=randomBytes(16).toString('hex'),key=await scrypt(password,salt,64);return salt+':'+key.toString('hex');}
export async function passwordMatches(password,encoded){if(typeof password!=='string'||password.length>128||typeof encoded!=='string')return false;const [salt,key]=encoded.split(':');if(!salt||! /^[0-9a-f]{128}$/.test(key||''))return false;const actual=await scrypt(password,salt,64);return timingSafeEqual(actual,Buffer.from(key,'hex'));}
export class ApiError extends Error{constructor(status,message,code='REQUEST_ERROR'){super(message);this.status=status;this.code=code;}}
const safeUser=u=>u?{id:u.id,username:u.username,nickname:u.nickname,role:u.role,active:u.active,mustChangePassword:u.must_change_password}:null;
const text=(v,max=160)=>typeof v==='string'?v.trim().slice(0,max):'';
const requireUser=(u,roles)=>{if(!u)throw new ApiError(401,'Please sign in.');if(roles&&!roles.includes(u.role))throw new ApiError(403,'You do not have access to this feature.');};
const tokenFrom=req=>(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE+'='))?.slice(COOKIE.length+1)||'';
function sessionCookie(req,token,clear=false){return `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${clear?0:30*86400}${req.headers['x-forwarded-proto']==='https'||process.env.VERCEL?'; Secure':''}`;}
async function body(req){if(!String(req.headers['content-type']||'').startsWith('application/json'))throw new ApiError(415,'Send JSON data.');if(Number(req.headers['content-length'])>65536)throw new ApiError(413,'Submission is too large.');try{if(req.body!==undefined)return typeof req.body==='string'?JSON.parse(req.body):req.body;let raw='';for await(const c of req){raw+=c;if(Buffer.byteLength(raw)>65536)throw new ApiError(413,'Submission is too large.');}return JSON.parse(raw||'{}');}catch(e){if(e instanceof ApiError)throw e;throw new ApiError(400,'Invalid request data.');}}
function csrf(req){const host=req.headers['x-forwarded-host']||req.headers.host;try{if(!req.headers.origin||new URL(req.headers.origin).host!==host)throw new Error();}catch{throw new ApiError(403,'Submit this request from the WeWIN website.');}}
export function createPlatformHandler({getRepository=productionRepository,ai=assessWriting,leadSecret=()=>process.env.LEAD_GATE_SECRET}={}){
 return async(req,res)=>{
  const send=(status,value)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(value));};
  try{
   const url=new URL(req.url,'https://wewin.example');const resource=url.searchParams.get('resource')||'session';const id=url.searchParams.get('id');const repo=await getRepository();
   let user=null;const token=tokenFrom(req);if(repo&&token&&/^[a-f0-9]{64}$/.test(token))user=await repo.session(hash(token));
   const leadKey=typeof leadSecret==='function'?leadSecret():leadSecret;
   const guest=hasLeadAccess(req.headers.cookie,leadKey);const owner=user?{id:user.id,kind:'user'}:guest?{id:hash(req.headers.cookie.split(';').map(x=>x.trim()).find(x=>x.startsWith('wewin_lead_access='))||''),kind:'guest'}:null;
   if(req.method==='GET'&&resource==='session')return send(200,{user:safeUser(user),registered:!!user||guest,databaseReady:!!repo,aiReady:!!process.env.OPENAI_API_KEY});
   if(!repo)throw new ApiError(503,'Account and result storage is being configured. Please try again later.','DATABASE_UNAVAILABLE');
   if(!['GET','POST'].includes(req.method))throw new ApiError(405,'Method not allowed.');
   const input=req.method==='POST'?(csrf(req),await body(req)):{};
   if(resource==='login'&&req.method==='POST'){
    const name=text(input.username,80).toLowerCase();if(!await repo.limit('login:'+hash(name+'|'+(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'')),10,900))throw new ApiError(429,'Too many sign-in attempts. Please try again later.');
    const found=await repo.userByName(name);const valid=await passwordMatches(input.password,found?.password_hash||'');if(!found?.active||!valid)throw new ApiError(401,'Incorrect username or password.');
    const value=randomBytes(32).toString('hex');await repo.newSession(hash(value),found.id);res.setHeader('Set-Cookie',sessionCookie(req,value));return send(200,{user:safeUser(found)});
   }
   if(resource==='logout'&&req.method==='POST'){if(token)await repo.endSession(hash(token));res.setHeader('Set-Cookie',sessionCookie(req,'',true));return send(200,{ok:true});}
   if(resource==='password'&&req.method==='POST'){
    requireUser(user);if(!await passwordMatches(input.currentPassword,user.password_hash))throw new ApiError(401,'Current password is incorrect.');await repo.changeUser(user.id,{passwordHash:await passwordHash(input.password),mustChange:false});const value=randomBytes(32).toString('hex');await repo.newSession(hash(value),user.id);res.setHeader('Set-Cookie',sessionCookie(req,value));return send(200,{ok:true});
   }
   if(user?.must_change_password)throw new ApiError(403,'Please change your temporary password first.','PASSWORD_CHANGE_REQUIRED');
   if(resource==='leaderboard'&&req.method==='GET'){const exam=getExam(url.searchParams.get('exam'));if(!exam)throw new ApiError(404,'Test not found.');return send(200,{exam:exam.id,entries:await repo.leaderboard(exam)});}
   if(resource==='history'&&req.method==='GET'){
    if(!owner)throw new ApiError(401,'Complete registration or sign in first.');const student=id||owner.id;if(student!==owner.id){requireUser(user,['teacher','admin']);if(!await repo.mayTeach(user,student))throw new ApiError(403,'This student is not in your assigned classes.');}return send(200,{attempts:await repo.history(student)});
   }
   const canRead=async attempt=>{if(!attempt)throw new ApiError(404,'Attempt not found.');if(owner?.id===attempt.owner_id||user?.role==='admin')return;if(!user||!['teacher','admin'].includes(user.role)||attempt.owner_kind!=='user'||!await repo.mayTeach(user,attempt.owner_id))throw new ApiError(403,'This attempt belongs to another learner.');};
   if(resource==='attempts'&&req.method==='POST'){
    if(!owner)throw new ApiError(401,'Complete registration or sign in first.');if(user&&user.role!=='student')throw new ApiError(403,'Use a student account to start a ranked attempt.');const exam=getExam(input.examId);if(!exam)throw new ApiError(404,'Test not found.');return send(200,{attempt:await repo.createAttempt(owner,exam)});
   }
   if(resource==='attempt'&&req.method==='GET'){const attempt=await repo.attempt(id);await canRead(attempt);return send(200,{attempt,review:await repo.reviewForAttempt(id)});}
   if(['draft','submit'].includes(resource)&&req.method==='POST'){
    const attempt=await repo.attempt(id);if(!attempt||attempt.owner_id!==owner?.id)throw new ApiError(403,'You cannot edit this attempt.');if(attempt.submitted_at)return send(200,{attempt});const exam=getExam(attempt.exam_id);if(exam?.version!==attempt.exam_version)throw new ApiError(409,'This test has been updated. Please start a new attempt.');
    let submission;try{submission=validateSubmission(exam,input);}catch(e){throw new ApiError(422,e.message);}
    if(resource==='draft'){await repo.draft(id,owner,submission.answers,submission.writing);return send(200,{ok:true});}
    const result=grade(exam,submission.answers);const submitted=await repo.submit(attempt,owner,submission.answers,submission.writing,result,user?.role==='student');return send(200,{attempt:submitted});
   }
   if(resource==='writing'&&req.method==='POST'){
    requireUser(user,['student']);const attempt=await repo.attempt(id);if(attempt?.owner_id!==user.id||!attempt.submitted_at)throw new ApiError(403,'Submit your own attempt before requesting writing feedback.');const exam=getExam(attempt.exam_id);if(!writingPart(exam))throw new ApiError(422,'This test has no open writing task.');
    if(!process.env.OPENAI_API_KEY&&ai===assessWriting)throw new ApiError(503,'AI Writing is not configured. Your writing is saved.');
    let review=await repo.reviewForAttempt(id);
    if(review?.status==='completed')return send(200,{review});
    if(!review){const maximum=Number(await repo.setting('daily_ai_limit'))||10;const day=new Date().toISOString().slice(0,10);if(!await repo.limit('writing:'+user.id+':'+day,maximum,86400))throw new ApiError(429,'Your daily AI Writing limit has been reached.');review=await repo.newReview(attempt,writingHash(exam,attempt.writing),process.env.AI_WRITING_MODEL||'gpt-5.6-terra');}
    const acquired=await repo.acquireReview(review.id);if(!acquired)return send(200,{review:await repo.reviewForAttempt(id)});
    try{const output=await ai(exam,attempt.writing);validateReview(output,exam.levelKey==='movers'?6:5,writingPart(exam).questions.length);await repo.finishReview(review.id,output);}catch(e){await repo.finishReview(review.id,null,['AI_NOT_CONFIGURED','AI_LIMIT_REACHED','INVALID_AI_OUTPUT','AI_REVIEW_UNAVAILABLE'].includes(e.message)?e.message:'AI_PROVIDER_ERROR');}
    return send(200,{review:await repo.reviewForAttempt(id)});
   }
   if(resource==='staff'&&req.method==='GET'){requireUser(user,['teacher','admin']);return send(200,{...await repo.staffData(user),dailyAiLimit:Number(await repo.setting('daily_ai_limit'))||10});}
   if(resource==='users'&&req.method==='POST'){
    requireUser(user,['admin']);const username=text(input.username,80).toLowerCase(),nickname=text(input.nickname,60),role=input.role;if(!/^[a-z0-9._-]{3,80}$/.test(username)||!nickname||!['student','teacher','admin'].includes(role))throw new ApiError(422,'Enter a valid username, display name and role.');const created=await repo.createUser({username,nickname,role,passwordHash:await passwordHash(input.password)});return send(201,{user:created});
   }
   if(resource==='user'&&req.method==='POST'){
    requireUser(user,['admin']);const target=await repo.user(id);if(!target)throw new ApiError(404,'Account not found.');if(input.active===false&&target.role==='admin'){const staff=await repo.staffData(user);if(staff.users.filter(u=>u.role==='admin'&&u.active).length<=1)throw new ApiError(409,'The last active administrator cannot be disabled.');}
    const changes={};if(typeof input.active==='boolean')changes.active=input.active;if(text(input.nickname,60))changes.nickname=text(input.nickname,60);if(input.password){changes.passwordHash=await passwordHash(input.password);changes.mustChange=true;}await repo.changeUser(id,changes);return send(200,{ok:true});
   }
   if(resource==='classes'&&req.method==='POST'){
    requireUser(user,['admin']);const teacher=input.teacherId?await repo.user(input.teacherId):null;if(!text(input.name,100)||teacher&&teacher.role!=='teacher')throw new ApiError(422,'Choose a valid class name and teacher.');return send(201,{class:await repo.createClass(text(input.name,100),teacher?.id)});
   }
   if(resource==='enroll'&&req.method==='POST'){requireUser(user,['admin']);const student=await repo.user(input.studentId);if(student?.role!=='student')throw new ApiError(422,'Choose a student account.');await repo.enroll(input.classId,input.studentId);return send(200,{ok:true});}
   if(resource==='settings'&&req.method==='POST'){requireUser(user,['admin']);if(!Number.isInteger(input.dailyAiLimit)||input.dailyAiLimit<1||input.dailyAiLimit>100)throw new ApiError(422,'Daily limit must be between 1 and 100.');await repo.setSetting('daily_ai_limit',input.dailyAiLimit);return send(200,{ok:true});}
   if(resource==='review-override'&&req.method==='POST'){
    requireUser(user,['teacher','admin']);const attempt=await repo.attempt(id);await canRead(attempt);const review=await repo.reviewForAttempt(id);if(!review)throw new ApiError(404,'Request an AI review before adjusting its feedback.');const exam=getExam(attempt.exam_id);let value;try{value=validateReview(input.review,exam.levelKey==='movers'?6:5,writingPart(exam).questions.length);}catch{throw new ApiError(422,'Provide complete, valid writing feedback.');}const reason=text(input.reason,1000);if(!reason)throw new ApiError(422,'Please give a reason for this adjustment.');await repo.overrideReview(review,user,value,reason);return send(200,{review:await repo.reviewForAttempt(id),audit:await repo.reviewAudit(review.id)});
   }
   if(resource==='review-audit'&&req.method==='GET'){requireUser(user,['teacher','admin']);const attempt=await repo.attempt(id);await canRead(attempt);const review=await repo.reviewForAttempt(id);return send(200,{audit:review?await repo.reviewAudit(review.id):[]});}
   throw new ApiError(404,'Resource not found.');
  }catch(error){if(error instanceof ApiError)return send(error.status,{message:error.message,code:error.code});if(error.code==='23505')return send(409,{message:'This account or record already exists.'});if(error.code==='22P02'||error.code==='23503')return send(422,{message:'Choose a valid record.'});return send(503,{message:'The service is temporarily unavailable. Your draft remains on this device. Please try again.','code':'SERVICE_UNAVAILABLE'});}
 };
}
