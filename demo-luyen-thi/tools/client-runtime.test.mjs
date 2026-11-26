// Runtime smoke test with browser primitives stubbed. This does not measure layout or replace browser QA.
import test from 'node:test';
import assert from 'node:assert/strict';
import {allExams} from '../public-data.mjs';
import {getExam,grade} from '../server/scoring.mjs';

test('client renders overview, library, resumed draft, listening, result, history and staff activity',async()=>{
 const listeners=new Map(),nodes=new Map(),calls=[],pictureRegions=[];
 const node=id=>{if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',textContent:'',dataset:{},hidden:false,disabled:false,open:false,isConnected:true,addEventListener(){},querySelector(){return null;},querySelectorAll(){return [];},contains(){return false;},focus(){},scrollIntoView(){},setAttribute(){},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(id);};
 const root=node('app'),modal=node('modal'),audio=node('audio');audio.paused=true;audio.pause=()=>audio.paused=true;audio.play=async()=>audio.paused=false;audio.load=()=>{};audio.currentTime=0;
 root.querySelectorAll=selector=>selector==='[data-name],[data-person],[data-region]'?pictureRegions:[];
 globalThis.document={documentElement:{dataset:{}},body:{dataset:{}},activeElement:null,querySelector:selector=>selector.startsWith('#')?node(selector.slice(1)):null,querySelectorAll:()=>[],getElementById:node,addEventListener:(name,fn)=>{const list=listeners.get(name)||[];list.push(fn);listeners.set(name,list);}};
 // The analytics frame is replaced by a local message receiver. No Google tag or requests are loaded.
 const analyticsMessages = [], historyEntries = [];
 const frame = {setAttribute(){},contentWindow:{postMessage:message=>analyticsMessages.push(message)}};
 let onFrameReady;
 const query = document.querySelector;
 document.querySelector = selector => selector === 'meta[name="ga-measurement-id"]' ? {content:'G-BHPHF3EMKF'} : query(selector);
 document.createElement = tag => {assert.equal(tag,'iframe');return frame;};
 document.body.append = () => onFrameReady({origin:'null',source:frame.contentWindow,data:{type:'exam-analytics-ready'}});
 globalThis.matchMedia=()=>({matches:false});globalThis.localStorage={getItem:()=>null,setItem(){}};globalThis.sessionStorage={getItem:()=>null,setItem(){}};
 globalThis.location={search:'',href:'https://exam.wewin.edu.vn/',origin:'https://exam.wewin.edu.vn'};
 globalThis.window={history:{replaceState(){},pushState(_state,_unused,url){historyEntries.push(url);}},scrollTo(){},addEventListener(name,fn){if(name==='message')onFrameReady=fn;},removeEventListener(){},dispatchEvent(){}};
 let user={id:'fixture-student',nickname:'Local QA Learner',role:'student',mustChangePassword:false};
 const e=allExams[0];let stored={id:'fixture-attempt',exam_id:e.id,exam_version:e.version,answers:{},writing:{},created_at:'2026-10-24T01:00:00Z',updated_at:'2026-10-24T01:00:00Z',submitted_at:null};
 let started = false;
 globalThis.fetch=async(url,options={})=>{const p=new URL(url,'http://localhost').searchParams,resource=p.get('resource');calls.push(resource);let data;
  if(resource==='session')data={user,registered:true,databaseReady:true};
  else if(resource==='assignments')data={assignments:[]};
  else if(resource==='history')data={attempts:[stored]};
  else if(resource==='attempts'){data={attempt:stored,created:!started};started=true;}
  else if(resource==='attempt')data={attempt:stored,review:null};
  else if(resource==='leaderboard')data={entries:[]};
  else if(resource==='logout'){user=null;data={ok:true};}
  else if(resource==='staff')data={users:[{id:'fixture-student',nickname:'Local QA Learner',role:'student',active:true}],classes:[],enrollments:[]};
  else if(resource==='activity')data={activities:[{...stored,nickname:'Local QA Learner',username:'qa',role:'student',owner_kind:'user',total_score:stored.result?.total??null}]};
  else if(resource==='submit'){const completed=!stored.submitted_at;stored={...stored,submitted_at:'2026-10-24T02:00:00Z',result:grade(getExam(stored.exam_id),{})};data={attempt:stored,completed};}
  else if(resource==='draft')data={ok:true};
  else throw Error('Unexpected resource '+resource);
  return {ok:true,status:200,json:async()=>data};
 };
 await import('../platform-app.mjs?runtime-smoke');
 const click=async(action,extra={})=>{const el={dataset:{action,...extra},disabled:false,closest:()=>null};const target={closest:selector=>selector==='[data-action]'?el:null};for(const fn of listeners.get('click')||[])await fn({target,preventDefault(){}});};
 assert.match(root.innerHTML,/Local QA Learner/);assert.match(root.innerHTML,/Tiếp tục bài đang làm/);assert.match(root.innerHTML,/learning-sidebar/);assert.ok(!root.innerHTML.includes('NaN'));
 await click('catalog');assert.match(root.innerHTML,/id="catalog-search"/);assert.match(root.innerHTML,/test-row/);
 await click('library-level',{value:'flyers'});assert.match(root.innerHTML,/30 đề Flyers/);
 assert.equal(historyEntries.length,1);
 await click('open-test',{exam:e.id});
 await click('start');
 await click('start');
 await click('load-attempt',{id:stored.id});assert.equal(document.body.dataset.screen,'exam');assert.match(root.innerHTML,/exam-focus/);assert.match(root.innerHTML,/Đọc & Viết/);
 await click('ui-language');assert.match(root.innerHTML,/Your learning space/);assert.ok(root.innerHTML.includes(e.reading[0].questions[0].prompt));await click('ui-language');assert.match(root.innerHTML,/Không gian học tập/);
 await click('skill',{value:'listening'});assert.match(root.innerHTML,/audio-seek/);assert.match(root.innerHTML,/Draw lines/);
 await click('confirm-submit');assert.equal(document.body.dataset.screen,'result');assert.match(root.innerHTML,/kết quả của bạn/);assert.match(root.innerHTML,/Hoàn thành bài luyện/);assert.ok(!root.innerHTML.includes('NaN'));
 await click('confirm-submit');
 await click('load-attempt',{id:stored.id});
 const link = {href:'https://wewin.edu.vn/?token=fixture-private'};
 for(const fn of listeners.get('click')) await fn({target:{closest:selector=>selector==='a[href]'?link:null}});
 const events = analyticsMessages.filter(message=>message.event);
 assert.deepEqual(events.map(message=>message.event),['page_view','page_view','page_view','page_view','exam_started','page_view','exam_completed','main_site_click']);
 assert.equal(events.at(-1).params.destination_host,'wewin.edu.vn');
 assert.doesNotMatch(JSON.stringify(events),/fixture-private|fixture-attempt|fixture-student|Local QA Learner/);
 await click('my-history');assert.equal(document.body.dataset.screen,'history');assert.match(root.innerHTML,/Xem kết quả/);assert.match(root.innerHTML,/0<small>\/100/);
 // Staff rendering is exercised with a stubbed service; real role enforcement is covered by platform.test.mjs.
 assert.ok(calls.includes('submit'));assert.ok(calls.includes('history'));
 await click('staff');await click('staff-section',{value:'activity'});assert.equal(document.body.dataset.screen,'staff');assert.match(root.innerHTML,/Nhật ký bài làm/);assert.match(root.innerHTML,/Xem kết quả/);assert.doesNotMatch(root.innerHTML,/ket-material|KET · Tài liệu giáo viên|KET · Teacher materials/);
 const ket=allExams.find(e=>e.id==='ket-01');
 await click('open-test',{exam:ket.id});assert.doesNotMatch(root.innerHTML,/Practice materials|ket\/01\/full-test\.mp3|WeWIN_KET_Mock_01\.pdf|Partner discussion/);assert.match(root.innerHTML,/data-action="start"/);
 stored={id:'ket-fixture',exam_id:ket.id,exam_version:ket.version,answers:{},writing:{'r6-1':'EMAIL FIXTURE','r7-1':'STORY FIXTURE'},created_at:'2026-11-07T01:00:00Z',submitted_at:null};
 await click('load-attempt',{id:stored.id});await click('part',{value:'5'});assert.match(root.innerHTML,/Write 25 or more words/);assert.match(root.innerHTML,/EMAIL FIXTURE/);
 await click('part',{value:'6'});assert.match(root.innerHTML,/Write 35 or more words/);assert.match(root.innerHTML,/STORY FIXTURE/);
 await click('skill',{value:'listening'});assert.match(audio.src,/ket\/01\/listening-1\.mp3/);
 await click('confirm-submit');assert.match(root.innerHTML,/EMAIL FIXTURE/);assert.match(root.innerHTML,/STORY FIXTURE/);assert.doesNotMatch(root.innerHTML,/shield-strip/);assert.ok(!calls.includes('writing'));
 const pending=allExams.find(e=>e.id==='flyers-40');
 stored={id:'flyers40-fixture',exam_id:pending.id,exam_version:pending.version,answers:{},writing:{},created_at:'2026-11-17T01:00:00Z',submitted_at:null};
 await click('load-attempt',{id:stored.id});await click('skill',{value:'listening'});
 assert.match(root.innerHTML,/id="audio-play"/);assert.match(root.innerHTML,/id="audio-seek"/);
 assert.match(audio.src,/flyers40\/40\/listening-1\.mp3/);assert.ok(!String(audio.src).includes('undefined'));
 const savedAudio=pending.audio;pending.audio=[];await click('part',{value:'1'});
 assert.match(root.innerHTML,/Audio Listening của đề này đang chờ bổ sung/);assert.doesNotMatch(root.innerHTML,/id="audio-play"|id="audio-seek"/);pending.audio=savedAudio;
 const zoo=allExams.find(e=>e.id==='flyers-08'),activations=new Map();
 for(const region of zoo.listening[4].interaction.regions)pictureRegions.push({dataset:{region:region.id},getAttribute:()=>null,addEventListener:(event,fn)=>activations.set(region.id+event,fn)});
 stored={id:'zoo-fixture',exam_id:zoo.id,exam_version:zoo.version,answers:{},writing:{},created_at:'2026-11-19T01:00:00Z',submitted_at:null};
 await click('load-attempt',{id:stored.id});await click('skill',{value:'listening'});await click('part',{value:'4'});
 await click('picture-colour',{value:'purple'});activations.get('ground-bagclick')({type:'click'});
 assert.match(root.innerHTML,/data-region="ground-bag"[^]*?fill="#9560c8"/);assert.match(root.innerHTML,/1\/3 objects coloured/);
 activations.get('bench-hatclick')({type:'click'});activations.get('kite-leftclick')({type:'click'});const full=root.innerHTML;
 activations.get('ground-ballclick')({type:'click'});assert.equal(root.innerHTML,full);assert.equal(node('picture-feedback').hidden,false);assert.match(node('picture-feedback').textContent,/3.*Erase/);
 // A full picture can still be recoloured, and erasing frees a slot.
 await click('picture-colour',{value:'green'});activations.get('ground-bagclick')({type:'click'});assert.match(root.innerHTML,/data-region="ground-bag"[^]*?fill="#40a35a"/);
 await click('picture-tool',{value:'erase'});activations.get('kite-leftclick')({type:'click'});assert.match(root.innerHTML,/2\/3 objects coloured/);
 await click('picture-tool',{value:'colour'});activations.get('ground-ballclick')({type:'click'});assert.match(root.innerHTML,/3\/3 objects coloured/);
 await click('undo-picture');assert.match(root.innerHTML,/2\/3 objects coloured/);
});
