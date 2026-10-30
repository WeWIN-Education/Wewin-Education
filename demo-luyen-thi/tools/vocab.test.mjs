import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {vocabBooks} from '../vocab-catalog.mjs';
import {normaliseWord,wordOptions,unitProgress,createVocabUI} from '../vocab.mjs';

function browser(search='?screen=vocab'){
 const listeners=new Map(),windowListeners=new Map(),nodes=new Map(),storage=new Map();
 const node=id=>{if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',textContent:'',dataset:{},paused:true,open:false,querySelector(){return null;},querySelectorAll(){return [];},contains(){return false;},addEventListener(){},pause(){},focus(){},load(){},setAttribute(){},scrollIntoView(){},close(){this.open=false;}});return nodes.get(id);};
 const add=(map,name,fn)=>map.set(name,[...(map.get(name)||[]),fn]);
 globalThis.document={documentElement:{dataset:{}},body:{dataset:{}},activeElement:null,hidden:false,querySelector:s=>s.startsWith('#')?node(s.slice(1)):null,querySelectorAll:()=>[],getElementById:node,addEventListener:(n,f)=>add(listeners,n,f),createElement(){throw Error('Unexpected lead gate on public Vocab');}};
 globalThis.window={history:{replaceState(){},pushState(){}},scrollTo(){},addEventListener:(n,f)=>add(windowListeners,n,f),dispatchEvent:e=>{for(const f of windowListeners.get(e.type)||[])f(e);}};
 globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
 globalThis.sessionStorage={getItem:()=>null,setItem(){}};globalThis.matchMedia=()=>({matches:false});globalThis.location={search,href:'http://localhost/'+search};
 return {node,listeners,windowListeners,storage,async click(action,id){const el={dataset:{vocab:action,id},disabled:false};for(const f of listeners.get('click')||[])await f({target:{closest:s=>s==='[data-vocab]'?el:null},preventDefault(){}});await new Promise(r=>setTimeout(r,0));}};
}

test('all three source word collections and their artwork ship locally',async()=>{
 assert.deepEqual(vocabBooks.map(b=>[b.units,b.words]),[[16,381],[13,399],[16,494]]);
 for(const b of vocabBooks){const {default:units}=await import(`../vocab-data/${b.id}.mjs`);assert.equal(units.length,b.units);assert.equal(units.reduce((n,u)=>n+u.words.length,0),b.words);assert.equal(new Set(units.map(u=>u.id)).size,units.length);for(const u of units){assert.ok(u.words.length>0);for(const item of [u,...u.words]){if(item.art)await access(new URL(`../assets/vocab/${item.art}.webp`,import.meta.url));}for(const w of u.words){assert.equal(typeof w.en,'string');assert.equal(typeof w.vi,'string');}}}
 const build=await readFile(new URL('./build.mjs',import.meta.url),'utf8');assert.match(build,/'vocab-data'/);assert.match(build,/'assets\/vocab'/);
});

test('options never duplicate meanings, spelling accepts punctuation, and completion uses best records',()=>{
 const word={en:'cat',vi:'mèo'},pool=[word,{en:'a cat',vi:'mèo'},{en:'dog',vi:'chó'},{en:'bird',vi:'chim'}];
 const options=wordOptions(word,pool,'vi',3);assert.equal(options.length,3);assert.equal(new Set(options.map(w=>w.vi)).size,3);assert.ok(options.includes(word));
 assert.equal(normaliseWord('Ice-cream!'),'ice cream');assert.equal(normaliseWord(' How   old? '),'how old');
 assert.deepEqual(unitProgress({id:'a',words:Array(9).fill(word)},{results:{'a:0:quiz':{stars:2},'a:0:match':{stars:3},'a:1:spell':{stars:1}}}),{done:1,total:2,pct:50});
});

test('quiz, matching, spelling and listening render, finish, and save separate local records',async()=>{
 const b=browser();let html='',ui;ui=createVocabUI({redraw:()=>html=ui.render()});await ui.open('starters','15');html=ui.render();
 const {default:units}=await import('../vocab-data/starters.mjs');const words=units.find(u=>u.id==='15').words;assert.equal(words.length,4);
 await b.click('mode','quiz');
 for(let i=0;i<4;i++){const en=html.match(/<h2 lang="en">([^<]+)/)[1],word=words.find(w=>w.en===en);const matches=[...html.matchAll(/data-vocab="answer" data-id="(\d+)"[^>]*><span>[A-D]<\/span>([^<]+)/g)];const selected=matches.find(m=>m[2]===word.vi);assert.ok(selected);await b.click('answer',selected[1]);assert.match(html,/Chính xác/);await b.click('next');}
 assert.match(html,/vocab-result-score">4\/4/);let saved=JSON.parse(b.storage.get('wewin-wordquest-v1-starters'));assert.equal(saved.results['15:0:quiz'].stars,3);
 await b.click('return');await b.click('mode','spell');
 for(let i=0;i<4;i++){const vi=html.match(/<h2 lang="vi">([^<]+)/)[1],w=words.find(w=>w.vi===vi);for(const f of b.listeners.get('input')||[])f({target:{id:'vocab-spelling',value:w.en}});for(const f of b.listeners.get('submit')||[])f({target:{id:'vocab-spell-form'},preventDefault(){}});await b.click('next');}
 assert.match(html,/vocab-result-score">4\/4/);
 await b.click('return');await b.click('mode','match');
 const left=[...html.matchAll(/data-vocab="match-left" data-id="(\d+)"[^>]*>([^<]+)/g)],right=[...html.matchAll(/data-vocab="match-right" data-id="(\d+)"[^>]*>([^<]+)/g)];
 // Speech unsupported feedback must not prevent matching.
 for(const l of left){const w=words.find(w=>w.en===l[2]);await b.click('match-left',l[1]);await b.click('match-right',right.find(r=>r[2]===w.vi)[1]);}
 await b.click('next');assert.match(html,/vocab-result-score">4\/4/);
 await b.click('return');await b.click('mode','listen');
 for(let i=0;i<4;i++){assert.match(html,/data-vocab="hear"/);await b.click('answer','0');assert.match(html,/data-vocab="next"/);await b.click('next');}
 saved=JSON.parse(b.storage.get('wewin-wordquest-v1-starters'));assert.deepEqual(Object.keys(saved.results).sort(),['15:0:listen','15:0:match','15:0:quiz','15:0:spell']);
 // Replay mistakes is a review round and must leave the main record intact.
 if(html.includes('data-vocab="review"')){const original=JSON.stringify(saved.results);await b.click('review');while(html.includes('data-vocab="answer"')){await b.click('answer','0');await b.click('next');}assert.equal(JSON.stringify(JSON.parse(b.storage.get('wewin-wordquest-v1-starters')).results),original);}
});

test('anonymous and expired guests can use the complete Vocab shell without a registration gate',async()=>{
 const b=browser('?screen=vocab&game=flyers&unit=1'),calls=[];
 globalThis.fetch=async url=>{const resource=new URL(url,'http://localhost').searchParams.get('resource');calls.push(resource);assert.equal(resource,'session');return {ok:true,status:200,json:async()=>({registered:false,user:null,guest:null,guestStatus:'idle_expired'})};};
 await import('../platform-app.mjs?vocab-public-test');const root=b.node('app');assert.match(root.innerHTML,/vocab-modes/);assert.match(root.innerHTML,/data-action="vocab"/);assert.doesNotMatch(root.innerHTML,/id="lead-gate"/);assert.deepEqual(calls,['session']);
 for(const f of b.windowListeners.get('wewin-guest-expired')||[])f({detail:{reason:'expired'}});assert.equal(document.body.dataset.screen,'vocab');assert.match(root.innerHTML,/vocab-modes/);
});
