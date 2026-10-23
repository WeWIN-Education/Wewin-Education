import exams from '../generated/exams-private.json' with {type:'json'};
export {exams};
export const getExam=id=>exams.find(e=>e.id===id);
export const normalise=value=>String(value??'').trim().toLowerCase().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
const numbers=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
function numberWord(n){return n<20?numbers[n]:['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'][Math.floor(n/10)]+(n%10?' '+numbers[n%10]:'');}
export function correct(q,value){
 if(q.answer&&typeof q.answer==='object')return value?.target===q.answer.target&&(q.answer.color?value.color===q.answer.color:normalise(value.word)===normalise(q.answer.word));
 return [q.answer,...q.accepted||[]].some(a=>normalise(a)===normalise(value))||(/^\d+$/.test(String(q.answer))&&Number(q.answer)<100&&normalise(value).replaceAll('-',' ')===numberWord(Number(q.answer)));
}
export function validateSubmission(exam,input){
 const answers={},writing={};const source=input?.answers||{},manual=input?.writing||{};
 if(!source||typeof source!=='object'||Array.isArray(source)||!manual||typeof manual!=='object'||Array.isArray(manual))throw new Error('Invalid answers.');
 for(const skill of ['reading','listening'])for(const part of exam[skill]){
  if(part.painting){const areas=source[part.id]||{};if(!areas||typeof areas!=='object'||Array.isArray(areas)||Object.keys(areas).length>20)throw new Error('Invalid picture answers.');const mapped={};for(const [target,v] of Object.entries(areas)){if(target.length>60||!v||typeof v!=='object')throw new Error('Invalid picture answers.');mapped[target]={...(typeof v.color==='string'?{color:v.color.slice(0,20)}:{}),...(typeof v.word==='string'?{word:v.word.slice(0,80)}:{})};}const colorCount=Object.values(mapped).filter(v=>v.color).length,wordCount=Object.values(mapped).filter(v=>v.word).length;if(colorCount>part.questions.filter(q=>q.answer.color).length||wordCount>part.questions.filter(q=>q.answer.word).length)throw new Error('Too many picture answers.');answers[part.id]=mapped;continue;}
  if(part.matchKey){const links=source[part.id]||{};if(!links||typeof links!=='object'||Array.isArray(links))throw new Error('Invalid matching answer.');const mapped={};for(const [name,value] of Object.entries(links)){if(typeof value!=='string'||value.length>40||name.length>40)throw new Error('Invalid matching answer.');mapped[name]=value;}if(Object.keys(mapped).length>part.questions.length)throw new Error('Too many matching lines.');if(Object.values(mapped).length!==new Set(Object.values(mapped)).size)throw new Error('Each person can have only one line.');answers[part.id]=mapped;continue;}
  for(const q of part.questions){
   if(part.manual){const v=manual[q.id]??'';if(typeof v!=='string'||v.length>6000)throw new Error('Writing must be text, up to 6000 characters.');writing[q.id]=v;continue;}
   const value=source[q.id];if(value===undefined)continue;
   if(typeof q.answer==='object'){
    if(!value||typeof value!=='object'||typeof value.target!=='string'||value.target.length>60)throw new Error('Invalid picture answer.');
    answers[q.id]={target:value.target,...(q.answer.color?{color:typeof value.color==='string'?value.color.slice(0,20):''}:{word:typeof value.word==='string'?value.word.slice(0,80):''})};
   }else{if(typeof value!=='string'||value.length>160)throw new Error('Invalid answer.');answers[q.id]=value;}
  }
 }
 return {answers,writing};
}
export function grade(exam,answers){const result={};const review=[];
 for(const skill of ['reading','listening']){
  const questions=exam[skill].filter(p=>!p.manual).flatMap(p=>p.questions.map(q=>({q,part:p})));
  let count=0,done=0;
  for(const {q,part} of questions){const value=part.painting?(answers[part.id]?.[q.answer.target]?{target:q.answer.target,...answers[part.id][q.answer.target]}:undefined):part.matchKey?answers[part.id]?.[q.prompt]:answers[q.id];const good=correct(q,value);count+=good?1:0;done+=typeof value==='object'?!!(value?.target&&(value.color||value.word)):!!normalise(value);review.push({id:q.id,skill,part:part.id,prompt:q.prompt.replace(/^Câu /,'Question '),value:value??'',expected:q.answer,correct:good});}
  result[skill]={correct:count,total:questions.length,answered:done,score:Math.round(500*count/questions.length)/10};
 }
 result.total=Math.round((result.reading.score+result.listening.score)*10)/10;result.review=review;return result;
}
