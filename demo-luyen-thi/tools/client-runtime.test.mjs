// Runtime smoke test with browser primitives stubbed. This does not measure layout or replace browser QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import {allExams} from '../public-data.mjs';
import {getExam,grade} from '../server/scoring.mjs';

test('client renders overview, library, resumed draft, listening, result, history and staff activity',async()=>{
 const listeners=new Map(),nodes=new Map(),calls=[];
 const node=id=>{if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',textContent:'',dataset:{},hidden:false,disabled:false,open:false,isConnected:true,addEventListener(){},querySelector(){return null;},querySelectorAll(){return [];},contains(){return false;},focus(){},scrollIntoView(){},setAttribute(){},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(id);};
 const root=node('app'),modal=node('modal'),audio=node('audio');audio.paused=true;audio.pause=()=>audio.paused=true;audio.play=async()=>audio.paused=false;audio.load=()=>{};audio.currentTime=0;
 globalThis.document={documentElement:{dataset:{}},body:{dataset:{}},activeElement:null,querySelector:selector=>selector.startsWith('#')?node(selector.slice(1)):null,querySelectorAll:()=>[],getElementById:node,addEventListener:(name,fn)=>{const list=listeners.get(name)||[];list.push(fn);listeners.set(name,list);}};
 globalThis.matchMedia=()=>({matches:false});globalThis.localStorage={getItem:()=>null,setItem(){}};globalThis.sessionStorage={getItem:()=>null,setItem(){}};
 globalThis.location={search:'',href:'http://localhost/'};globalThis.window={history:{replaceState(){}},scrollTo(){},addEventListener(){},dispatchEvent(){}};
 let user={id:'fixture-student',nickname:'Local QA Learner',role:'student',mustChangePassword:false};
 const e=allExams[0];let stored={id:'fixture-attempt',exam_id:e.id,exam_version:e.version,answers:{},writing:{},created_at:'2026-10-24T01:00:00Z',updated_at:'2026-10-24T01:00:00Z',submitted_at:null};
 globalThis.fetch=async(url,options={})=>{const p=new URL(url,'http://localhost').searchParams,resource=p.get('resource');calls.push(resource);let data;
  if(resource==='session')data={user,registered:true,databaseReady:true};
  else if(resource==='history')data={attempts:[stored]};
  else if(resource==='attempts'||resource==='attempt')data={attempt:stored,review:null};
  else if(resource==='leaderboard')data={entries:[]};
  else if(resource==='logout'){user=null;data={ok:true};}
  else if(resource==='staff')data={users:[{id:'fixture-student',nickname:'Local QA Learner',role:'student',active:true}],classes:[],enrollments:[]};
  else if(resource==='activity')data={activities:[{...stored,nickname:'Local QA Learner',username:'qa',role:'student',owner_kind:'user',total_score:stored.result?.total??null}]};
  else if(resource==='submit'){stored={...stored,submitted_at:'2026-10-24T02:00:00Z',result:grade(getExam(stored.exam_id),{})};data={attempt:stored};}
  else if(resource==='draft')data={ok:true};
  else throw Error('Unexpected resource '+resource);
  return {ok:true,status:200,json:async()=>data};
 };
 await import('../platform-app.mjs?runtime-smoke');
 const click=async(action,extra={})=>{const el={dataset:{action,...extra},disabled:false,closest:()=>null};const target={closest:selector=>selector==='[data-action]'?el:null};for(const fn of listeners.get('click')||[])await fn({target,preventDefault(){}});};
 assert.match(root.innerHTML,/Local QA Learner/);assert.match(root.innerHTML,/Tiếp tục bài đang làm/);assert.match(root.innerHTML,/learning-sidebar/);assert.ok(!root.innerHTML.includes('NaN'));
 await click('catalog');assert.match(root.innerHTML,/id="catalog-search"/);assert.match(root.innerHTML,/test-row/);
 await click('library-level',{value:'flyers'});assert.match(root.innerHTML,/20 đề Flyers/);
 await click('load-attempt',{id:stored.id});assert.equal(document.body.dataset.screen,'exam');assert.match(root.innerHTML,/exam-focus/);assert.match(root.innerHTML,/Reading & Writing/);
 await click('skill',{value:'listening'});assert.match(root.innerHTML,/audio-seek/);assert.match(root.innerHTML,/Draw lines/);
 await click('confirm-submit');assert.equal(document.body.dataset.screen,'result');assert.match(root.innerHTML,/here are your results/);assert.match(root.innerHTML,/Practice complete/);assert.ok(!root.innerHTML.includes('NaN'));
 await click('my-history');assert.equal(document.body.dataset.screen,'history');assert.match(root.innerHTML,/Xem kết quả/);assert.match(root.innerHTML,/0<small>\/100/);
 // Staff rendering is exercised with a stubbed service; real role enforcement is covered by platform.test.mjs.
 assert.ok(calls.includes('submit'));assert.ok(calls.includes('history'));
 await click('staff');assert.equal(document.body.dataset.screen,'staff');assert.match(root.innerHTML,/Nhật ký bài làm/);assert.match(root.innerHTML,/Xem kết quả/);
});
