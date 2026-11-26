import {listHubExamAttempts} from '../../server/hub-exam-attempts.mjs';

export default async function handler(req,res){
 res.setHeader('Content-Type','application/json; charset=utf-8');
 res.setHeader('Cache-Control','private, no-store');
 if(req.method!=='GET'){
  res.statusCode=405;
  res.end(JSON.stringify({code:'METHOD_NOT_ALLOWED'}));
  return;
 }
 try{
  const result=await listHubExamAttempts(req);
  res.statusCode=result.status;
  res.end(JSON.stringify(result.body));
 }catch(error){
  console.error('[hub/exam-attempts]',error);
  res.statusCode=500;
  res.end(JSON.stringify({code:'SERVER_ERROR'}));
 }
}
