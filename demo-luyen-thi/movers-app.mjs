import {movers} from './movers.mjs';
import {flyers} from './flyers.mjs';
import {themeButton} from './theme.mjs';

const params=new URLSearchParams(location.search);
const collection=(params.get('test')||'').startsWith('flyers-')?flyers:movers;
const exam=collection.find(e=>e.id===params.get('test'))||collection[0];
const readingCount=exam.reading.filter(p=>!p.manual).flatMap(p=>p.questions).length;
const writingPart=exam.reading.findIndex(p=>p.manual)+1;
const writingCount=exam.reading[writingPart-1].questions.length;
const key=`wewin-${exam.id}-v1`;
const fresh=()=>({answers:{},manual:{},skill:'reading',part:0,screen:'intro',ended:false});
let state=fresh();
try{state={...state,...JSON.parse(sessionStorage.getItem(key)||'null')};}catch{}
if(['intro','exam','result'].includes(params.get('screen')))state.screen=params.get('screen');
if(['reading','listening'].includes(params.get('skill')))state.skill=params.get('skill');
if(params.has('part'))state.part=Number(params.get('part'))||0;
state.part=Math.min(exam[state.skill].length-1,Math.max(0,state.part));
if(state.screen==='result'&&!state.ended)state.screen='intro';
if(state.screen==='exam'&&state.ended)state.screen='result';
const root=document.querySelector('#app');
const audio=document.querySelector('#audio');
let audioSource='';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v??'').trim().toLowerCase().replace(/[.!?]+$/,'').replace(/\s+/g,' ');
const words=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five'];
for(let n=26;n<100;n++)words[n]=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'][Math.floor(n/10)]+(n%10?'-'+words[n%10]:'');
const correct=(q,v)=>(q.accepted||[q.answer]).some(a=>norm(a)===norm(v))||(/^\d+$/.test(q.answer)&&norm(v).replace(/ /g,'-')===words[Number(q.answer)]);
function scores(){return Object.fromEntries(['reading','listening'].map(skill=>{
 const qs=exam[skill].filter(p=>!p.manual).flatMap(p=>p.questions);
 return [skill,{total:qs.length,done:qs.filter(q=>norm(state.answers[q.id])).length,correct:qs.filter(q=>correct(q,state.answers[q.id])).length}];
}));}
const save=()=>{try{sessionStorage.setItem(key,JSON.stringify(state));}catch{}};
const header=()=>`<header class="site-header"><div class="header-inner"><a class="brand" href="?screen=catalog"><img src="assets/logo.png" alt="WeWIN Education"></a><span class="exam-header-label">Luyện thi · ${exam.level}</span><div class="header-actions">${themeButton()}<a class="btn ghost" href="?screen=catalog">Về chọn đề</a></div></div></header>`;
const note=`<p class="small muted">${readingCount} câu Reading có đáp án xác định được chấm tự động. Reading & Writing Part ${writingPart} cần giáo viên nhận xét, không cộng vào điểm tự động. Listening có 25 câu và audio riêng cho từng Part. Điểm luyện tập không quy đổi thành khiên Cambridge.</p>`;
function choice(q,value,label){return `<button class="choice" data-action="answer" data-id="${q.id}" data-value="${esc(value)}" aria-pressed="${state.answers[q.id]===value}">${esc(label)}</button>`;}
function question(q,i,manual){
 const value=(manual?state.manual:state.answers)[q.id]||'';
 let field;
 if(q.colour){const [target='',color='']=value.split('|');field=`<div class="mover-colour"><select data-target="${q.id}" aria-label="Câu ${i+1}: đồ vật"><option value="">Chọn đồ vật</option>${q.targets.map(t=>`<option ${target===t?'selected':''}>${esc(t)}</option>`).join('')}</select><select data-colour="${q.id}" aria-label="Câu ${i+1}: màu"><option value="">Chọn màu</option>${['red','blue','green','yellow','purple','orange','pink','brown','black','white'].map(c=>`<option ${color===c?'selected':''}>${c}</option>`).join('')}</select></div>`;}
 else if(q.choices?.length)field=`<div class="choice-group mover-choices">${q.choices.map(c=>typeof c==='string'?choice(q,c,c):choice(q,c.value,c.label)).join('')}</div>`;
 else field=`<${manual?'textarea':'input'} class="answer-input" data-question="${q.id}" ${manual?'data-manual="true" rows="8"':'type="text" maxlength="80"'} aria-label="Câu ${i+1}" placeholder="${manual?'Viết câu trả lời của bạn':'Nhập đáp án'}" ${manual?'':`value="${esc(value)}"`}>${manual?esc(value)+'</textarea>':''}`;
 return `<div class="question-row"><div class="question-header"><span class="question-number">${i+1}</span><label class="question-prompt">${esc(q.prompt)}</label></div>${field}</div>`;
}
function intro(){return `<div class="intro-grid"><div class="intro-picture"><img src="assets/${exam.cover}" alt="${esc(exam.title)}"></div><div class="intro-copy"><div class="eyebrow">${exam.level} · Mock ${exam.number}</div><h1>${esc(exam.title)}</h1><p>Luyện đọc và trả lời theo hình trong đề gốc WeWIN.</p><div class="instructions"><p>Reading · ${writingPart-1} phần chấm tự động, ${readingCount} câu</p><p>Reading & Writing Part ${writingPart} · ${writingCount} ${writingCount===1?'bài viết':'câu'} cần giáo viên nhận xét</p><p>Listening · 5 phần, 25 câu · Có audio từng Part</p></div><button class="btn primary full" data-action="start">${state.ended?'Xem kết quả':'Vào làm bài'}</button>${note}</div></div>`;}
function examView(){const part=exam[state.skill][state.part];const s=scores();
 return `<div class="skill-tabs">${['reading','listening'].map(skill=>`<button class="skill-tab ${state.skill===skill?'active':''}" data-action="skill" data-value="${skill}">${skill==='reading'?'Reading':'Listening'} <span class="badge">${s[skill].done}/${s[skill].total}</span></button>`).join('')}</div><div class="part-toolbar"><div class="part-tabs">${exam[state.skill].map((p,i)=>`<button class="part-tab ${i===state.part?'active':''}" data-action="part" data-value="${i}">Part ${i+1}${p.manual?' · Giáo viên':''}</button>`).join('')}</div><button class="btn primary" data-action="submit">Nộp bài</button></div><div class="part-title"><h2>Part ${state.part+1} · ${part.title}</h2><span>${part.questions.length} câu</span></div>${state.skill==='listening'?audioPanel():''}${part.manual?'<div class="mover-notice"><strong>Phần viết cần giáo viên nhận xét</strong><p>Câu trả lời được lưu riêng và không chấm đúng/sai tự động.</p></div>':''}<div class="exercise-grid"><section class="figure-panel"><div class="figure-header"><strong>Đề bài và tranh minh họa</strong><span class="small muted">Bấm hình để phóng to</span></div>${part.images.map((f,i)=>`<button class="mover-page" data-action="zoom" data-file="${f}" aria-label="Phóng to trang đề ${i+1}"><img src="assets/${f}" alt="Trang đề Part ${state.part+1}, trang ${i+1}" loading="lazy"></button>`).join('')}</section><section class="question-panel"><div class="answer-heading"><strong>Câu trả lời của bạn</strong><span class="small muted">Đối chiếu số câu trong đề</span></div>${part.questions.map((q,i)=>question(q,i,part.manual)).join('')}</section></div><div class="exercise-footer"><button class="btn" data-action="previous" ${state.part===0?'disabled':''}>Phần trước</button><span class="small muted">Đã lưu trong phiên này</span><button class="btn" data-action="next">${state.part===exam[state.skill].length-1?'Nộp bài':'Phần tiếp'}</button></div>`;}
function result(){const s=scores();return `<div class="result-heading"><div class="eyebrow">Kết quả luyện tập · Mock ${exam.number}</div><h1>Bạn đã hoàn thành bài luyện</h1></div><div class="score-grid"><section class="score-card total"><div class="score-label">Tổng câu chấm tự động</div><div class="score-number">${s.reading.correct+s.listening.correct}<span> / ${readingCount+25}</span></div></section>${['reading','listening'].map(skill=>`<section class="score-card"><div class="score-label">${skill==='reading'?'Reading':'Listening'}</div><div class="score-number">${s[skill].correct}<span> / ${s[skill].total}</span></div><p>${s[skill].done}/${s[skill].total} câu đã trả lời</p></section>`).join('')}</div><div class="mover-notice">${note}</div><div class="result-actions"><a class="btn" href="?screen=catalog">Về chọn đề</a><button class="btn primary" data-action="restart">Làm lại</button></div>${['reading','listening'].map(skill=>exam[skill].map((p,pi)=>`<section class="review-group"><h3>${skill==='reading'?'Reading':'Listening'} · Part ${pi+1} · ${p.title}</h3>${p.questions.map((q,i)=>p.manual?`<div class="question-row"><strong>Câu ${i+1} · Cần giáo viên nhận xét</strong><p>Bạn viết: ${esc(state.manual[q.id]||'Chưa trả lời')}</p><p class="muted">Ví dụ tham khảo: ${esc(q.sample)}</p></div>`:`<div class="review-row"><span class="question-number">${i+1}</span><span>${esc(q.prompt)}</span><div>Bạn trả lời: ${esc(state.answers[q.id]||'Bỏ trống')}<br>Đáp án: ${esc(q.answer.replace('|',' · '))}</div><span class="review-status ${correct(q,state.answers[q.id])?'good':'bad'}">${correct(q,state.answers[q.id])?'Đúng':norm(state.answers[q.id])?'Sai':'Bỏ trống'}</span></div>`).join('')}</section>`).join('')).join('')}`;}

function audioPanel(){return `<div class="audio-panel"><button class="audio-button" data-action="audio-play" id="audio-play" aria-label="Phát audio">▶</button><div class="audio-label"><strong>Listening · Part ${state.part+1}</strong><span>Nghe và trả lời 5 câu hỏi</span></div><div class="audio-track"><input type="range" id="audio-seek" min="0" max="1" step=".1" value="0" aria-label="Tua audio"><span class="audio-time" id="audio-time">00:00 / --:--</span></div><button class="btn ghost" data-action="audio-reset">Nghe từ đầu</button><span class="audio-error" id="audio-error" role="alert" hidden></span></div>`;}
const timeLabel=v=>`${Math.floor(v/60).toString().padStart(2,'0')}:${Math.floor(v%60).toString().padStart(2,'0')}`;
function updateAudioUI(){
 const play=root.querySelector('#audio-play');if(play){play.textContent=audio.paused?'▶':'❚❚';play.setAttribute('aria-label',audio.paused?'Phát audio':'Tạm dừng audio');}
 const seek=root.querySelector('#audio-seek');if(seek){seek.disabled=!Number.isFinite(audio.duration);seek.max=Number.isFinite(audio.duration)?audio.duration:1;seek.value=audio.currentTime||0;}
 const time=root.querySelector('#audio-time');if(time)time.textContent=`${timeLabel(audio.currentTime||0)} / ${Number.isFinite(audio.duration)?timeLabel(audio.duration):'--:--'}`;
}
function audioError(message){const el=root.querySelector('#audio-error');if(el){el.hidden=false;el.textContent=message;}}
async function playAudio(){try{await audio.play();const el=root.querySelector('#audio-error');if(el)el.hidden=true;}catch{audioError('Chưa phát được audio. Bấm phát để thử lại.');}}
function syncAudio(){
 if(state.screen!=='exam'||state.skill!=='listening'){audio.pause();return;}
 const src=`assets/${exam.audio[state.part]}?v=${exam.audioVersion}`;
 if(audioSource!==src){audio.pause();audioSource=src;audio.src=src;audio.load();}
 updateAudioUI();
}
for(const event of ['loadedmetadata','durationchange','timeupdate','play','pause','ended'])audio.addEventListener(event,updateAudioUI);
audio.addEventListener('error',()=>audioError('Không tải được audio. Kiểm tra kết nối và bấm phát để thử lại.'));

function render(){document.body.dataset.screen=state.screen;save();history.replaceState(null,'',`?screen=${state.screen}&test=${exam.id}&skill=${state.skill}&part=${state.part}`);root.innerHTML=`${header()}<main class="shell"><div class="exam-top"><div><div class="eyebrow">${exam.level} · Mock ${exam.number}</div><h1>${esc(exam.title)}</h1></div></div>${state.screen==='intro'?intro():state.screen==='result'?result():examView()}</main><footer class="site-footer">© 2026 WeWIN Education · Tài liệu luyện tập nội bộ</footer>`;syncAudio();}
document.addEventListener('input',event=>{const el=event.target;if(el.id==='audio-seek'&&Number.isFinite(audio.duration)){audio.currentTime=Number(el.value);updateAudioUI();return;}if(el.dataset.question){(el.dataset.manual?state.manual:state.answers)[el.dataset.question]=el.value;save();}});
document.addEventListener('change',event=>{const el=event.target;const id=el.dataset.target||el.dataset.colour;if(id){const t=root.querySelector(`[data-target="${id}"]`).value,c=root.querySelector(`[data-colour="${id}"]`).value;state.answers[id]=t&&c?t+'|'+c:'';save();}});
function submit(){const modal=document.querySelector('#modal');modal.innerHTML='<h2>Nộp bài luyện tập?</h2><p>Các câu bỏ trống tính 0 điểm; phần viết cần giáo viên nhận xét được tách riêng.</p><div class="dialog-actions"><button class="btn" data-action="close">Làm tiếp</button><button class="btn primary" data-action="confirm">Nộp và xem kết quả</button></div>';modal.showModal();}
document.addEventListener('click',event=>{const el=event.target.closest('[data-action]');if(!el)return;const {action,value,id,file}=el.dataset;
 if(action==='audio-play'){if(audio.paused)playAudio();else audio.pause();return;}
 if(action==='audio-reset'){audio.currentTime=0;playAudio();return;}
 if(action==='answer'){state.answers[id]=value;render();return;}
 if(action==='start')state.screen=state.ended?'result':'exam';
 if(action==='skill'){state.skill=value;state.part=0;}
 if(action==='part')state.part=Number(value);
 if(action==='previous'&&state.part>0)state.part--;
 if(action==='next'){if(state.part<exam[state.skill].length-1)state.part++;else return submit();}
 if(action==='submit')return submit();
 if(action==='close'){document.querySelector('#modal').close();return;}
 if(action==='confirm'){state.ended=true;state.screen='result';document.querySelector('#modal').close();}
 if(action==='restart'){state=fresh();state.screen='exam';}
 if(action==='zoom'){const m=document.querySelector('#modal');m.className='zoom-dialog';m.innerHTML=`<div class="zoom-header"><h2>Trang đề phóng to</h2><button class="btn" data-action="close">Đóng</button></div><img class="zoom-image" src="assets/${file}" alt="Trang đề phóng to">`;m.showModal();return;}
 render();window.scrollTo({top:0,behavior:'instant'});
});
render();
