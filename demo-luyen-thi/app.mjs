import {exam, exams, artwork, selectExam, characters, balls, colours, answered, correct, score, answerLabel} from './exam.mjs';

const $ = selector => document.querySelector(selector);
const root = $('#app');
const modal = $('#modal');
const audio = $('#audio');
const keyFor = id => `wewin-${id}-v1`;
const fresh = () => ({answers:{},started:null,ended:null,skill:'reading',part:0,screen:'catalog'});
let storageOK = true;
const initial = new URLSearchParams(location.search);
selectExam(initial.get('test') || 'starters-01');
let KEY = keyFor(exam.id);
function readAttempt(id) {
  try {
    const saved=JSON.parse(sessionStorage.getItem(keyFor(id)));
    if(saved?.answers && ['reading','listening'].includes(saved.skill)) return {...fresh(),...saved,part:Math.min(3,Math.max(0,Number(saved.part)||0))};
  } catch { storageOK=false; }
  return fresh();
}
let state = readAttempt(exam.id);
if(['catalog','intro','exam','result'].includes(initial.get('screen'))) state.screen=initial.get('screen');
if(['reading','listening'].includes(initial.get('skill'))) state.skill=initial.get('skill');
if(initial.has('part')) state.part=Math.min(3,Math.max(0,Number(initial.get('part'))||0));
if(state.screen==='result' && !state.ended) state.screen='catalog';
if(state.screen==='exam' && state.ended) state.screen='result';
let category = 'all';
let selectedWord = '';
let activeIndex = 0;
let activeBall = '';
let reviewSkill = 'reading';
let audioSource = '';
let soundTesting = false;
let modalAction = null;
let returnedFocus = null;

const paths = {
  arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>', back:'<path d="m14 6-6 6 6 6"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>',
  book:'<path d="M12 5v15M12 5C9 3 5 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-2-1-6-1-9 1Z"/>',
  headphones:'<path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v8H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 1-2Zm16 0h-3v8h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-1-2Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="m5 12 4 4L19 6"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
  play:'<path d="m9 5 11 7-11 7Z"/>', pause:'<path d="M8 5v14M16 5v14"/>',
  refresh:'<path d="M20 7v5h-5M4 17v-5h5M19 11a7 7 0 0 0-12-5L4 9m1 4a7 7 0 0 0 12 5l3-3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  zoom:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M10 7v6m-3-3h6"/>',
  link:'<path d="m10 13 4-4m-5 8-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0-1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',
  list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h.1M3 12h.1M3 18h.1"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6Z"/><path d="m8 12 3 3 5-5"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.info}</svg>`;
const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const image = (file, alt, cls='') => `<img class="${cls}" src="assets/${file}" alt="${escape(alt)}" loading="lazy">`;
let artSerial = 0;
function rasterArt(spec, alt='Hình minh họa') {
  const [x,y,right,bottom]=spec.clip;
  const w=right-x,h=bottom-y,clipId=`art-${++artSerial}`;
  return `<svg class="raster-art" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${escape(alt)}" focusable="false"><defs><clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs><image href="assets/${spec.file}" x="0" y="0" width="${spec.width}" height="${spec.height}" clip-path="url(#${clipId})"/></svg>`;
}
const questionArtwork = q => rasterArt(artwork[q.art], 'Hình cho câu: '+q.prompt);
function optionArtwork(questionIndex, letter, part=exam.listening[2]) {
  const word=part.questions[questionIndex].choiceArts['ABC'.indexOf(letter)];
  return `<span class="option-art" aria-hidden="true">${rasterArt(artwork[word],`Hình ${letter}`)}</span>`;
}
const button = (label, action, cls='', extra='', symbol='') => `<button class="btn ${cls}" data-action="${action}" ${extra}>${symbol?icon(symbol):''}${label}</button>`;
function examAction(selected) {
  const attempt=readAttempt(selected.id);
  const label=attempt.ended?'Xem kết quả':attempt.started?'Tiếp tục':'Bắt đầu';
  return button(label,'open-test','primary full',`data-test="${selected.id}"`,'arrow');
}
const timeLabel = seconds => `${Math.floor(seconds/60).toString().padStart(2,'0')}:${Math.floor(seconds%60).toString().padStart(2,'0')}`;
const elapsed = () => state.started ? Math.max(0,Math.floor(((state.ended||Date.now())-state.started)/1000)) : 0;
const currentPart = () => exam[state.skill][state.part];
const announce = text => { $('#announcer').textContent=text; };
function persist() {
  try { sessionStorage.setItem(KEY,JSON.stringify(state)); storageOK=true; } catch { storageOK=false; }
}
function syncUrl() {
  const params=new URLSearchParams({screen:state.screen,test:exam.id});
  if(state.screen==='exam') { params.set('skill',state.skill); params.set('part',state.part); }
  history.replaceState(null,'',`${location.pathname}?${params}`);
}
function header(inExam=false) {
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="?screen=catalog" data-action="catalog" aria-label="WeWIN — Về chọn đề">${image('logo.png','WeWIN Education')}</a>${inExam?
    `<div class="header-context"><span class="header-divider"></span><span>Luyện thi tiếng Anh</span></div><div class="header-context">${button('Về chọn đề','catalog','ghost','','back')}</div>`:
    `<nav class="main-nav" aria-label="Điều hướng"><a href="https://wewin.edu.vn/" target="_blank" rel="noopener">Trang chủ WeWIN</a><a class="nav-active" href="?screen=catalog" data-action="catalog" aria-current="page">Luyện thi</a>${button('Hướng dẫn','help','ghost','','info')}</nav>`}
  </div></header>`;
}
function footer() {
  return `<footer class="site-footer"><span>© 2026 WeWIN Education</span><span>Tài liệu luyện tập WeWIN · Không phải đề thi chính thức Cambridge</span></footer>`;
}
function crumb(last) {
  return `<div class="breadcrumb"><button data-action="catalog">Luyện thi tiếng Anh</button>${icon('chevron')}<span>${last}</span></div>`;
}
function render() {
  const previousFocus = document.activeElement;
  const focusData = previousFocus?.dataset?.action ? {...previousFocus.dataset} : null;
  stopWhenLeaving();
  if(state.screen==='exam' && !state.started) state.started=Date.now();
  root.innerHTML=state.screen==='intro'?renderIntro():state.screen==='exam'?renderExam():state.screen==='result'?renderResult():renderCatalog();
  persist(); syncUrl(); updateAudioUI();
  if(focusData) {
    const replacement = [...root.querySelectorAll('[data-action]')].find(el=>['action','value','id'].every(key=>el.dataset[key]===focusData[key]));
    replacement?.focus({preventScroll:true});
  }
}
function renderCatalog() {
  const cards=[
    ...exams.map(e=>({...e,level:'starters',tag:e.level,number:'Test '+e.number,live:true})),
    {level:'movers',tag:'A1 Movers',number:'Mock 06–15',title:'Bộ đề luyện A1 Movers',cover:'birthday.png'},
    {level:'flyers',tag:'A2 Flyers',number:'Mock 06–15',title:'Bộ đề luyện A2 Flyers',cover:'birthday.png'},
  ].filter(c=>category==='all'||category===c.level);
  const stats=score(state.answers);
  return `${header()}<main class="shell"><div class="breadcrumb"><span>WeWIN Education</span>${icon('chevron')}<span>Luyện thi</span></div>
    <section class="hero"><div class="hero-copy"><div class="eyebrow">WeWIN English Practice</div><h1>Luyện thi tiếng Anh<br>cùng WeWIN</h1><p>Chọn một trong 10 đề Starters, luyện Reading & Listening<br>và xem kết quả ngay sau khi hoàn thành.</p><div class="hero-meta"><span>${icon('book')}Đề luyện theo cấp độ</span><span>${icon('check')}Chấm kết quả tự động</span><span>${icon('headphones')}Audio cho từng đề</span></div></div><div class="hero-art">${image('win.png','Win — linh vật WeWIN')}<span class="art-note">Cùng Win luyện mỗi ngày</span></div></section>
    ${state.started?`<section class="resume-banner"><div><strong>${state.ended?'Bạn đã hoàn thành Test '+exam.number:'Bạn có một bài đang làm'}</strong><span class="muted small">${exam.title} · ${state.ended?`${stats.total}/40 câu đúng`:`${stats.answered}/40 câu đã trả lời`}</span></div>${button(state.ended?'Xem kết quả':'Tiếp tục làm bài',state.ended?'result':'resume','','','arrow')}</section>`:''}
    <section aria-label="Danh sách đề"><div class="catalog-heading"><div><h2>Chọn bộ đề của bạn</h2><p>10 đề Starters · Luyện Reading và Listening trực tuyến.</p></div><div class="tabbar" role="group" aria-label="Lọc cấp độ">${[['all','Tất cả'],['starters','Starters'],['movers','Movers'],['flyers','Flyers']].map(([id,title])=>`<button class="${category===id?'active':''}" data-action="category" data-value="${id}" aria-pressed="${category===id}">${title}</button>`).join('')}</div></div>
    <div class="exam-grid">${cards.map(c=>`<article class="exam-card"><div class="cover ${c.live?'park':''}">${image(c.cover,`${c.tag} — hình minh họa từ bộ đề`)}<span class="cover-badge">${c.number}</span></div><div class="card-body"><div class="card-meta"><span class="level">${c.tag}</span>${c.live?'<span class="available">Có thể làm ngay</span>':'<span class="muted small">Sắp có</span>'}</div><h3>${c.title}</h3><p>${c.live?'40 câu Reading & Listening · Tranh minh họa mới':'Tài liệu đã có. Bài luyện trực tuyến đang được chuẩn bị.'}</p>${c.live?`<div class="skills"><span>${icon('book')}Reading · 20 câu</span><span>${icon('headphones')}Listening · 20 câu</span></div><div class="card-actions">${examAction(c)}</div>`:'<div class="coming-label">Bài luyện sắp được mở</div>'}</div></article>`).join('')}</div></section>
    <div class="howto"><div class="howto-item"><span class="step-no">1</span><div><h3>Chọn một đề</h3><p>Xem nội dung và hướng dẫn trước khi làm.</p></div></div><div class="howto-item"><span class="step-no">2</span><div><h3>Đọc, nghe và trả lời</h3><p>Làm từng phần, có thể quay lại để sửa.</p></div></div><div class="howto-item"><span class="step-no">3</span><div><h3>Xem kết quả</h3><p>Nhận điểm và xem lại đáp án từng câu.</p></div></div></div></main>${footer()}`;
}
function renderIntro() {
  return `${header()}<main class="shell">${crumb('Starters · Test '+exam.number)}<div class="intro-grid"><div class="intro-picture">${image(exam.cover,'Tranh minh họa Test '+exam.number)}<div class="intro-caption"><span class="level">Pre A1 Starters</span><span class="muted small">Test ${exam.number}</span></div></div><div class="intro-copy"><div class="eyebrow">Starters · Test ${exam.number}</div><h1>${exam.title}</h1><p>Luyện đọc hiểu và nghe tiếng Anh qua những hình ảnh quen thuộc. Làm từng phần và xem kết quả khi hoàn thành.</p><div class="intro-stats"><div class="intro-stat">${icon('book')}<strong>Reading</strong><small>4 phần · 20 câu</small></div><div class="intro-stat">${icon('headphones')}<strong>Listening</strong><small>4 phần · 20 câu</small></div></div><div class="instructions"><p>${icon('check')}Có thể sửa đáp án và quay lại các phần.</p><p>${icon('check')}Được nghe lại audio trong lúc luyện tập.</p><p>${icon('check')}Không giới hạn thời gian làm bài.</p></div><div class="soundcheck"><div><strong>Kiểm tra âm thanh</strong><div class="soundcheck-status" id="soundcheck-status">Bật loa hoặc đeo tai nghe trước khi bắt đầu.</div></div>${button('Nghe thử','soundcheck','','','play')}</div>${button(state.started&&!state.ended?'Tiếp tục bài đang làm':'Vào làm bài','start','primary full','','arrow')}<p class="small muted" style="margin-top:12px">Luyện Reading & Listening, chấm theo số câu đúng.${exam.audioMode==='full'?' Audio Listening là bản nghe toàn đề, tiếp tục khi chuyển Part.':''}</p></div></div></main>${footer()}`;
}
function partTabs() {
  return `<div class="part-tabs" role="group" aria-label="Các phần ${state.skill}">${exam[state.skill].map((p,i)=>{
    const count=p.questions.filter(q=>answered(q,state.answers[q.id])).length;
    return `<button class="part-tab ${state.part===i?'active':''}" data-action="part" data-value="${i}" aria-pressed="${state.part===i}">Part ${i+1}<small data-part-count="${i}">${count}/5</small></button>`;
  }).join('')}</div>`;
}
function renderExam() {
  const part=currentPart(); const s=score(state.answers);
  if(state.skill==='listening') setAudio(exam.audio[state.part]);
  return `${header(true)}<main class="shell exam-shell"><div class="exam-top"><div><div class="eyebrow">Pre A1 Starters · Test ${exam.number}</div><h1>${exam.title}</h1></div><div class="attempt-meta"><div class="timer">${icon('clock')}<span id="timer">${timeLabel(elapsed())}</span></div><div class="progress-count"><span id="progress-label">${s.answered}/40 câu đã trả lời</span><div class="progress-track"><span id="progress-fill" style="width:${s.answered/40*100}%"></span></div></div></div></div>
    <div class="skill-tabs" role="group" aria-label="Kỹ năng">${['reading','listening'].map(skill=>`<button class="skill-tab ${state.skill===skill?'active':''}" data-action="skill" data-value="${skill}" aria-pressed="${state.skill===skill}">${icon(skill==='reading'?'book':'headphones')}${skill==='reading'?'Reading':'Listening'}<span class="badge" data-skill-count="${skill}">${s[skill].answered}/20</span></button>`).join('')}</div>
    <div class="part-toolbar">${partTabs()}${button('Nộp bài','submit','primary','','check')}</div>
    <div class="part-title"><div><h2>Part ${state.part+1} · ${part.title}</h2><p>${part.instruction}</p></div><span class="part-count">5 câu hỏi</span></div>
    ${state.skill==='listening'?audioPanel():''}
    <div class="exercise-grid"><section class="figure-panel" aria-label="Tranh và hướng dẫn">${renderFigure(part)}</section><section class="question-panel" aria-label="Trả lời câu hỏi">${renderQuestions(part)}</section></div>
    <div class="exercise-footer"><div class="footer-actions">${button('Phần trước','previous','',''+(state.skill==='reading'&&state.part===0?'disabled':''),'back')}${button(state.skill==='listening'&&state.part===3?'Nộp bài':'Phần tiếp','next',state.skill==='listening'&&state.part===3?'primary':'','','arrow')}</div><span class="save-status" id="save-status">${icon('check')}${storageOK?'Đã lưu trong phiên này':'Đang giữ đáp án trên màn hình'}</span><span class="muted small">${state.skill==='reading'?'Reading':'Listening'} · Part ${state.part+1}/4</span></div>
    </main>${footer()}`;
}
function audioPanel() {
  return `<div class="audio-panel"><button class="audio-button" data-action="audio-play" aria-label="Phát audio" id="audio-play">${icon(audio.paused?'play':'pause')}</button><div class="audio-label"><strong>${exam.audioMode==='full'?'Listening · Toàn đề':'Listening · Part '+(state.part+1)}</strong><span>${exam.audioMode==='full'?'Audio chung cho 4 Part · Tiếp tục khi chuyển phần':'Nghe và trả lời 5 câu hỏi'}</span></div><div class="audio-track"><input type="range" id="audio-seek" min="0" max="${Number.isFinite(audio.duration)?audio.duration:1}" step=".1" value="${audio.currentTime||0}" aria-label="Tua audio"><span class="audio-time" id="audio-time">00:00 / --:--</span></div>${button('Nghe từ đầu','audio-reset','ghost','','refresh')}<span class="audio-error" id="audio-error" hidden></span></div>`;
}
function figureHeader(title, file) {
  return `<div class="figure-header"><strong>${title}</strong>${file?button('Phóng to','zoom','',`data-file="${file}"`,'zoom'):''}</div>`;
}
function figureNote(text) { return `<div class="figure-note">${icon('info')}<span>${text}</span></div>`; }
function renderFigure(part) {
  if(part.type==='match') {
    const selected=part.questions[activeIndex];
    return `${figureHeader('Chọn nhân vật',part.image)}<div class="match-caption match-selected">Đang chọn: <strong>${selected.prompt}</strong><span class="small">· Bấm vào nhân vật trong tranh</span></div><div class="visual match-visual">${image(part.image,'Tranh có bảy nhân vật trong công viên')}${characters.map((c,i)=>{
      const linked=part.questions.find(q=>state.answers[q.id]===c.id);
      const active=linked?.id===selected.id;
      return `<button class="pin ${linked?'matched':''} ${active?'active':''}" style="left:${c.x}%;top:${c.y}%" data-action="match" data-value="${c.id}" aria-label="Nối ${selected.prompt} với nhân vật ${i+1}" aria-pressed="${active}"><small>${linked?linked.prompt:c.id==='p1'?part.exampleName:i+1}</small></button>`;
    }).join('')}</div>${figureNote(part.exampleName+' là ví dụ ở góc trên trái. Chọn tên, rồi bấm đúng nhân vật. Có thể đổi bất kỳ lúc nào.')}`;
  }
  if(part.type==='colour') {
    const selected=part.questions[activeIndex]; const value=state.answers[selected.id];
    const paint=balls.map(b=>{
      const a=part.questions.map(q=>state.answers[q.id]).find(a=>a?.target===b.id&&a.colour);
      return a?`<ellipse cx="${b.x}" cy="${b.y}" rx="3.0" ry="3.6" fill="${colours.find(c=>c.id===a.colour)?.hex}" fill-opacity=".78" style="mix-blend-mode:multiply"/>`:'';
    }).join('');
    return `${figureHeader('Listen & colour',part.image)}<div class="match-caption">Đang làm: <strong>Câu ${activeIndex+1}</strong><span class="small">· Chọn bóng, rồi chọn màu</span></div><div class="visual">${image(part.image,'Tranh quả bóng ở các vị trí quanh bàn, cây, ghế và hộp')}<svg class="scene-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${paint}</svg>${balls.map((b,i)=>`<button class="ball-hit ${activeBall===b.id?'active':''}" style="left:${b.x}%;top:${b.y}%" data-action="ball" data-value="${b.id}" aria-label="Chọn ${b.label.toLowerCase()}" title="Quả bóng ${i+1}"></button>`).join('')}</div><div class="colour-palette" role="group" aria-label="Chọn màu">${colours.map(c=>`<button class="colour-choice" data-action="colour" data-value="${c.id}" aria-pressed="${value?.colour===c.id}"><span class="swatch" style="--swatch:${c.hex}"></span>${c.label}</button>`).join('')}</div>${figureNote(part.hint)}`;
  }
  if(part.id==='r1') return `${figureHeader('Look at each picture')}<div class="object-gallery">${part.questions.map((q,i)=>`<div class="object-row"><span class="question-number">${i+1}</span>${questionArtwork(q)}</div>`).join('')}</div>${figureNote('Đọc từng câu bên phải và đối chiếu với hình cùng số.')}`;
  if(part.type==='words') return `${figureHeader('Read the text')}<article class="reading-passage"><h3>${part.passageTitle}</h3><p>${part.example}</p>${part.questions.map((q,i)=>`<p>${q.prompt.replace('___',`<span class="gap-label">(${i+1}) ${escape(state.answers[q.id]||'_____')}</span>`)}</p>`).join('')}</article><div class="word-bank" role="group" aria-label="Ngân hàng từ">${part.bank.map(word=>`<button class="${selectedWord===word?'selected':''} ${Object.values(state.answers).includes(word)?'used':''}" data-action="word" data-value="${word}" aria-pressed="${selectedWord===word}">${word}</button>`).join('')}</div>${figureNote(selectedWord?`Đã chọn “${selectedWord}”. Bấm vào chỗ trống ở bên phải để điền.`:part.hint)}`;
  if(part.story) return `${figureHeader('Look at the pictures',part.storyArts[0].file)}<div class="story-list">${part.storyArts.map((art,i)=>`<div class="story-item">${rasterArt(art,`Tranh ${i+1} trong câu chuyện`)}<span class="story-number">Tranh ${i+1}</span></div>`).join('')}</div>${figureNote(part.hint)}`;
  if(part.image) return `${figureHeader('Look at the picture',part.image)}<div class="visual">${image(part.image,'Tranh dùng cho các câu hỏi trong Part này')}</div><div class="example"><p>Ví dụ</p><strong>There is a tree. → Yes</strong><strong>There are two girls. → No</strong></div>${figureNote(part.hint)}`;
  return `${figureHeader('Listen carefully')}<div class="listening-guide">${icon('headphones')}<div><h3>${part.type==='pictures'?'Listen and choose':'A new friend'}</h3><p>${part.hint}</p></div></div>${image('win.png','Win đang đồng hành cùng bạn','mini-art')}<div class="example"><p>Ví dụ trong audio</p><strong>${part.type==='pictures'?'What is on the table? → B':'What is the girl’s name? → '+part.exampleName}</strong></div>${figureNote('Audio đã có ví dụ và hai lượt nghe. Bạn có thể dừng hoặc nghe lại trong chế độ luyện tập.')}`;
}
function renderQuestions(part) {
  const count=part.questions.filter(q=>answered(q,state.answers[q.id])).length;
  const heading=`<div class="answer-heading"><strong>Câu trả lời của bạn</strong><span id="answer-count">${count}/5 câu</span></div>`;
  if(part.type==='match'||part.type==='colour') return heading+`<div class="${part.type==='match'?'match-answers':''}">`+part.questions.map((q,i)=>{
    const val=state.answers[q.id];
    const label=part.type==='match'?(val?answerLabel(q,val):'Chưa nối'):val?.target?(val.colour?answerLabel(q,val):`${balls.find(b=>b.id===val.target)?.label} · Chọn màu`):'Chưa tô màu';
    return `<button class="name-row ${i===activeIndex?'active':''}" data-action="active-question" data-value="${i}" aria-pressed="${i===activeIndex}"><span class="name"><span class="question-number">${i+1}</span>${q.prompt}</span><span class="status">${escape(label)}${icon(part.type==='match'&&val?'check':'chevron')}</span></button>`;
  }).join('')+'</div>'+(part.type==='match'?'':figureNote(part.hint));
  return heading+part.questions.map((q,i)=>{
    const val=state.answers[q.id];
    let content='';
    if(part.type==='binary') content=`<div class="choice-group" role="group" aria-label="Câu ${i+1}">${part.options.map(([key,label,sub])=>`<button class="choice" data-action="answer" data-id="${q.id}" data-value="${key}" aria-pressed="${val===key}"><span class="${sub?'choice-symbol':''}">${label}</span>${sub?`<span>${sub}</span>`:''}</button>`).join('')}</div>`;
    if(part.type==='text') content=`<input class="answer-input" id="${q.id}" data-question="${q.id}" type="text" maxlength="40" autocomplete="off" autocapitalize="off" spellcheck="false" value="${escape(val||'')}" placeholder="${q.numeric?'Nhập số hoặc từ':'Nhập một từ'}" aria-label="Câu ${i+1}: ${escape(q.prompt)}">${q.picture?`<div class="input-note">Dựa vào tranh ${q.picture}</div>`:''}`;
    if(part.type==='words') content=`<button class="gap-button ${val?'filled':''}" data-action="fill-word" data-id="${q.id}"><span>${escape(val||'Bấm để điền từ đã chọn')}</span>${icon('chevron')}</button>`;
    if(part.type==='pictures') content=`<div class="picture-options" role="group" aria-label="Câu ${i+1}">${['A','B','C'].map(letter=>`<button class="picture-choice" data-action="answer" data-id="${q.id}" data-value="${letter}" aria-pressed="${val===letter}" aria-label="Câu ${i+1}, hình ${letter}">${optionArtwork(i,letter)}<span class="option-label">${letter}${val===letter?icon('check'):''}</span></button>`).join('')}</div>`;
    return `<div class="question-row"><div class="question-header"><span class="question-number">${i+1}</span><label class="question-prompt" ${part.type==='text'?`for="${q.id}"`:''}>${q.prompt}</label></div>${content}</div>`;
  }).join('');
}
function renderResult() {
  const s=score(state.answers);
  return `${header()}<main class="shell result-shell">${crumb('Kết quả · Test '+exam.number)}<div class="result-heading">${image('win.png','Win chúc mừng bạn đã hoàn thành bài')}<div class="eyebrow">Đã hoàn thành bài luyện</div><h1>${s.total===40?'Bạn đã làm đúng tất cả!':'Bạn đã hoàn thành Test '+exam.number+'!'}</h1><p>${exam.title} · Pre A1 Starters</p></div><div class="score-grid"><section class="score-card total"><div class="score-label">${icon('shield')}Tổng kết quả</div><div class="score-number">${s.total}<span> / 40</span></div><p>${Math.round(s.total/40*100)}% câu đúng · ${40-s.answered} câu bỏ trống</p></section><section class="score-card"><div class="score-label">${icon('book')}Reading</div><div class="score-number">${s.reading.correct}<span> / 20</span></div><p>${Math.round(s.reading.correct/20*100)}% câu đúng</p></section><section class="score-card"><div class="score-label">${icon('headphones')}Listening</div><div class="score-number">${s.listening.correct}<span> / 20</span></div><p>${Math.round(s.listening.correct/20*100)}% câu đúng</p></section></div><div class="result-actions"><span class="timer">${icon('clock')}Thời gian làm: ${timeLabel(elapsed())}</span><div class="buttons">${button('Về chọn đề','catalog','','','back')}${button('Làm lại','restart','primary','','refresh')}</div></div><div class="review-toolbar"><h2>Xem lại bài làm</h2><div class="tabbar" role="group" aria-label="Xem lại kỹ năng">${['reading','listening'].map(skill=>`<button class="${reviewSkill===skill?'active':''}" data-action="review-skill" data-value="${skill}" aria-pressed="${reviewSkill===skill}">${skill==='reading'?'Reading':'Listening'}</button>`).join('')}</div></div>
    ${exam[reviewSkill].map((part,idx)=>`<section class="review-group"><div class="part-title"><h3>Part ${idx+1} · ${part.title}</h3>${button('Xem phần này','review-part','ghost',`data-skill="${reviewSkill}" data-value="${idx}"`,'zoom')}</div><div class="review-table"><div class="review-row review-head"><span>Câu</span><span>Câu hỏi</span><span>Đáp án</span><span>Kết quả</span></div>${part.questions.map((q,i)=>{
      const good=correct(q,state.answers[q.id]); const done=answered(q,state.answers[q.id]);
      return `<div class="review-row"><span class="question-number">${i+1}</span><span class="review-question">${q.prompt}</span><div class="review-answer"><small>Bạn trả lời</small>${escape(answerLabel(q,state.answers[q.id]))}<small style="margin-top:8px">Đáp án đúng</small><span style="color:var(--success)">${escape(answerLabel(q,q.answer))}</span></div><span class="review-status ${good?'good':'bad'}">${icon(good?'check':'close')}${good?'Đúng':done?'Sai':'Bỏ trống'}</span></div>`;
    }).join('')}</div></section>`).join('')}<p class="small muted">Điểm luyện tập WeWIN được tính theo số câu đúng, không quy đổi thành khiên Cambridge.</p></main>${footer()}`;
}
function navigate(screen) {
  state.screen=screen; selectedWord=''; render(); window.scrollTo({top:0,behavior:'instant'});
}
function choosePart(skill,part) {
  const changed=state.skill!==skill||state.part!==part;
  if(changed && (skill!=='listening'||state.skill!=='listening'||exam.audioMode!=='full')) {audio.pause(); if(skill==='listening')audio.currentTime=0;}
  state.skill=skill; state.part=part; selectedWord=''; activeIndex=0; activeBall=''; render();
  window.scrollTo({top:0,behavior:'instant'});
}
function updateProgress() {
  const s=score(state.answers);
  if($('#progress-label')) $('#progress-label').textContent=`${s.answered}/40 câu đã trả lời`;
  if($('#progress-fill')) $('#progress-fill').style.width=`${s.answered/40*100}%`;
  for(const skill of ['reading','listening']) { const el=$(`[data-skill-count="${skill}"]`); if(el)el.textContent=`${s[skill].answered}/20`; }
  if(state.screen==='exam') {
    const part=currentPart(); const count=part.questions.filter(q=>answered(q,state.answers[q.id])).length;
    if($('#answer-count'))$('#answer-count').textContent=`${count}/5 câu`;
    for(let i=0;i<4;i++){ const el=$(`[data-part-count="${i}"]`);if(el)el.textContent=`${exam[state.skill][i].questions.filter(q=>answered(q,state.answers[q.id])).length}/5`; }
  }
  const save=$('#save-status'); if(save)save.innerHTML=icon('check')+(storageOK?'Đã lưu trong phiên này':'Đang giữ đáp án trên màn hình');
}
function setAnswer(id,value,redraw=true) {
  if(state.ended)return;
  state.answers[id]=value; persist();
  if(redraw) { render(); const matching=root.querySelector(`[data-id="${id}"][aria-pressed="true"]`);if(matching)matching.focus({preventScroll:true}); }
  else updateProgress();
}
function openDialog(title,body,actions='',onConfirm=null,cls='') {
  returnedFocus=document.activeElement;
  modalAction=onConfirm; modal.className=cls;
  modal.innerHTML=`<div class="zoom-header"><h2 id="modal-title">${title}</h2>${button('','close-dialog','icon-only ghost','aria-label="Đóng"','close')}</div>${body}${actions?`<div class="dialog-actions">${actions}</div>`:''}`;
  modal.showModal();
}
modal.addEventListener('close',()=>{ modalAction=null; if(returnedFocus?.isConnected)returnedFocus.focus({preventScroll:true}); });
function submit() {
  const s=score(state.answers);
  openDialog('Nộp bài luyện tập?',`<p>${s.answered===40?'Bạn đã trả lời đủ 40 câu. Nộp bài để xem kết quả Reading và Listening.':`Bạn còn <strong>${40-s.answered} câu chưa trả lời</strong>. Các câu bỏ trống được tính 0 điểm. Bạn có thể quay lại làm tiếp hoặc nộp bài ngay.`}</p>`,button('Làm tiếp','close-dialog')+button('Nộp và xem kết quả','confirm','primary'),()=>{
    state.ended=Date.now();audio.pause();modal.close();navigate('result');announce('Đã nộp bài. Tổng điểm '+score(state.answers).total+' trên 40.');
  });
}
function restart() {
  openDialog('Làm lại Test '+exam.number+'?', '<p>Bắt đầu một lượt luyện mới với câu trả lời trống. Kết quả của lượt hiện tại sẽ được thay thế trong phiên demo này.</p>',button('Giữ kết quả','close-dialog')+button('Bắt đầu lượt mới','confirm','primary'),()=>{modal.close();state=fresh();state.started=Date.now();activeIndex=0;activeBall='';navigate('exam');});
}
function setAudio(file) {
  if(audioSource===file)return;
  audio.pause(); audioSource=file; audio.src=`assets/${file}?v=${exam.audioVersion}`; audio.load();
}
function stopWhenLeaving() {
  if(state.screen!=='exam'||state.skill!=='listening')audio.pause();
  if(state.screen!=='intro')soundTesting=false;
}
function updateAudioUI() {
  const play=$('#audio-play');if(play){play.innerHTML=icon(audio.paused?'play':'pause');play.setAttribute('aria-label',audio.paused?'Phát audio':'Dừng audio');}
  const seek=$('#audio-seek'); if(seek){seek.max=Number.isFinite(audio.duration)?audio.duration:1;seek.value=audio.currentTime||0;seek.disabled=!Number.isFinite(audio.duration);}
  const label=$('#audio-time');if(label)label.textContent=`${timeLabel(audio.currentTime||0)} / ${Number.isFinite(audio.duration)?timeLabel(audio.duration):'--:--'}`;
}
function showAudioError(message) {
  const el=$('#audio-error');if(el){el.hidden=false;el.innerHTML=`${message} ${button('Thử lại','audio-retry','ghost')}`;}
  const test=$('#soundcheck-status');if(test){test.className='audio-test-error';test.textContent=message;}
}
async function playAudio() {
  try {await audio.play(); const el=$('#audio-error');if(el)el.hidden=true;} catch {showAudioError('Chưa phát được audio. Kiểm tra loa hoặc kết nối rồi thử lại.');}
}
audio.addEventListener('timeupdate',()=>{
  if(soundTesting && audio.currentTime>=12){audio.pause();soundTesting=false;const el=$('#soundcheck-status');if(el)el.textContent='Đã phát đoạn nghe thử. Bạn có thể bắt đầu làm bài.';}
  updateAudioUI();
});
for(const event of ['loadedmetadata','play','pause','ended','durationchange'])audio.addEventListener(event,updateAudioUI);
audio.addEventListener('error',()=>showAudioError('Không tải được audio. Thử tải lại bản nghe.'));
document.addEventListener('input',event=>{
  if(event.target.matches('[data-question]'))setAnswer(event.target.dataset.question,event.target.value,false);
  if(event.target.id==='audio-seek'&&Number.isFinite(audio.duration)){audio.currentTime=Number(event.target.value);updateAudioUI();}
});
document.addEventListener('click',event=>{
  const target=event.target.closest('[data-action]');if(!target || target.disabled)return;
  const {action,value,id,file,skill,test}=target.dataset;
  event.preventDefault();
  if(action==='close-dialog'){modal.close();return;}
  if(action==='confirm'){modalAction?.();return;}
  if(action==='catalog'){audio.pause();navigate('catalog');}
  if(action==='category'){category=value;render();}
  if(action==='open-test'){
    persist();
    if(!selectExam(test))return;
    KEY=keyFor(exam.id);state=readAttempt(exam.id);
    audio.pause();audioSource='';soundTesting=false;
    selectedWord='';activeIndex=0;activeBall='';reviewSkill='reading';
    navigate(state.ended?'result':state.started?'exam':'intro');
  }
  if(action==='intro')navigate('intro');
  if(action==='resume')navigate('exam');
  if(action==='result'&&state.ended)navigate('result');
  if(action==='start'){
    if(state.ended)state=fresh();
    if(!state.started)state.started=Date.now();
    navigate('exam');
  }
  if(action==='skill')choosePart(value,0);
  if(action==='part')choosePart(state.skill,Number(value));
  if(action==='previous'){
    if(state.part>0)choosePart(state.skill,state.part-1);else if(state.skill==='listening')choosePart('reading',3);
  }
  if(action==='next'){
    if(state.part<3)choosePart(state.skill,state.part+1);else if(state.skill==='reading')choosePart('listening',0);else submit();
  }
  if(action==='answer')setAnswer(id,value);
  if(action==='word'){selectedWord=selectedWord===value?'':value;render();}
  if(action==='fill-word'){
    if(selectedWord)setAnswer(id,selectedWord);
    else if(state.answers[id]){delete state.answers[id];render();}
    else announce('Chọn một từ trong khung bên trái trước.');
  }
  if(action==='active-question'){
    activeIndex=Number(value);activeBall=state.answers[currentPart().questions[activeIndex].id]?.target||'';render();
    if(matchMedia('(max-width:767px)').matches) $('.match-caption')?.scrollIntoView({block:'start',behavior:'smooth'});
  }
  if(action==='match'){
    const part=currentPart();const selected=part.questions[activeIndex];
    for(const question of part.questions)if(question.id!==selected.id&&state.answers[question.id]===value)delete state.answers[question.id];
    state.answers[selected.id]=value;
    announce(`Đã nối ${selected.prompt} với ${characters.find(c=>c.id===value).label}.`);
    const next=part.questions.findIndex(q=>!state.answers[q.id]);if(next>=0)activeIndex=next;
    render();
  }
  if(action==='ball'){
    activeBall=value;const selected=currentPart().questions[activeIndex];
    for(const question of currentPart().questions)if(question.id!==selected.id&&state.answers[question.id]?.target===value)delete state.answers[question.id];
    state.answers[selected.id]={...(state.answers[selected.id]||{}),target:value};render();announce('Đã chọn quả bóng. Chọn màu để hoàn thành câu này.');
  }
  if(action==='colour'){
    if(!activeBall){announce('Bấm vào một quả bóng trong tranh trước khi chọn màu.');return;}
    const selected=currentPart().questions[activeIndex];setAnswer(selected.id,{target:activeBall,colour:value});announce('Đã tô màu cho câu '+(activeIndex+1));
  }
  if(action==='audio-play'){if(audio.paused)playAudio();else audio.pause();}
  if(action==='audio-reset'){audio.currentTime=0;playAudio();}
  if(action==='audio-retry'){audio.load();playAudio();}
  if(action==='soundcheck'){
    if(soundTesting){audio.pause();soundTesting=false;return;}
    setAudio(exam.audio[0]);audio.currentTime=0;soundTesting=true;
    $('#soundcheck-status').textContent='Đang phát 12 giây đầu của audio Listening…';playAudio();
  }
  if(action==='zoom')openDialog('Xem tranh',image(file,'Tranh phóng to','zoom-image'),' ',null,'zoom-dialog');
  if(action==='submit')submit();
  if(action==='restart')restart();
  if(action==='review-skill'){reviewSkill=value;render();}
  if(action==='review-part'){
    const p=exam[skill][Number(value)];
    let media=p.image?image(p.image,'Tranh của phần bài luyện','zoom-image'):p.story?p.storyArts.map((art,i)=>rasterArt(art,`Tranh ${i+1}`)).join(''):p.id==='r1'?p.questions.map(q=>questionArtwork(q)).join(''):p.type==='pictures'?p.questions.map((q,i)=>`<p>${q.prompt}</p><div class="picture-options">${['A','B','C'].map(l=>`<div class="picture-choice">${optionArtwork(i,l,p)}<span class="option-label">${l}</span></div>`).join('')}</div>`).join(''):`<p>${p.instruction}</p>${p.questions.map(q=>`<p>${q.prompt}</p>`).join('')}`;
    openDialog(`${skill==='reading'?'Reading':'Listening'} · Part ${Number(value)+1}`,media,' ',null,'zoom-dialog');
  }
  if(action==='help')openDialog('Cách luyện tập cùng WeWIN', '<p>Chọn một trong 10 Test và bấm “Vào làm bài”. Mỗi kỹ năng có 4 Part, mỗi Part gồm 5 câu. Bạn có thể quay lại để sửa, nghe lại audio và phóng to tranh.</p><p>Làm xong, bấm “Nộp bài” để nhận điểm Reading, Listening và xem đáp án từng câu. Câu trả lời được lưu riêng cho mỗi test trong phiên trình duyệt này.</p>',button('Đã hiểu','close-dialog','primary'));
});
setInterval(()=>{const el=$('#timer');if(el)el.textContent=timeLabel(elapsed());},1000);
render();
