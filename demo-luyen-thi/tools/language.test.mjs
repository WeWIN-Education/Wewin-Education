import test from 'node:test';
import assert from 'node:assert/strict';
import {getLanguage,setLanguage,t,ui,languageButton,onLanguageChange} from '../language.mjs';
import {learningHero,dashboardOverview} from '../learning-ui.mjs';
import {allExams} from '../public-data.mjs';
import {leadFields,validateLead} from '../lead-fields.mjs';

test('language switch persists a supported choice and notifies subscribers',async()=>{
 const saved=new Map();globalThis.localStorage={setItem:(key,value)=>saved.set(key,value),getItem:key=>saved.get(key)};
 let changes=0;const unsubscribe=onLanguageChange(()=>changes++);
 setLanguage('en');assert.equal(getLanguage(),'en');assert.equal(saved.get('wewin-language'),'en');assert.equal(changes,1);
 assert.equal((await import('../language.mjs?reload-check')).getLanguage(),'en');
 assert.match(languageButton(),/>EN</);assert.match(languageButton(),/Chuyển sang tiếng Việt/);
 setLanguage('invalid');assert.equal(getLanguage(),'en');assert.equal(changes,1);
 unsubscribe();setLanguage('vi');assert.equal(changes,1);assert.equal(t('Overview'),'Tổng quan');
});
test('only authored UI text changes; attributes and interpolated content never change',()=>{
 setLanguage('vi');
 const render=()=>ui`<div class="board-points" data-test="Practice complete"><strong>${'Overview'}</strong>Practice complete</div>`;
 assert.equal(render(),'<div class="board-points" data-test="Practice complete"><strong>Overview</strong>Hoàn thành bài luyện</div>');
 setLanguage('en');assert.match(render(),/Practice complete<\/div>/);
 const attrs=ui`<input class="points" value="${'Tổng quan'}"><p>Tổng quan</p>`;
 assert.match(attrs,/value="Tổng quan"/);assert.match(attrs,/<p>Overview<\/p>/);
 setLanguage('vi');
});
test('both interface languages preserve names, titles, question data and navigation',()=>{
 const original=JSON.stringify(allExams),exams=[{...allExams[0],title:'Tổng quan'}];
 const attempts=[{id:'keep-draft',exam_id:exams[0].id,exam_version:exams[0].version}];
 setLanguage('en');const english=dashboardOverview({exams:allExams,user:{nickname:'Đăng nhập'},historyHTML:''});
 assert.match(english,/Hello, Đăng nhập/);assert.match(english,/Your Cambridge journey/);assert.match(english,/Tests in progress/);
 const hero=learningHero({exams,attempts});assert.match(hero,/Tổng quan/);assert.match(hero,/Continue your test/);assert.match(hero,/data-id="keep-draft"/);
 setLanguage('vi');assert.match(dashboardOverview({exams:allExams}),/Hành trình Cambridge của bạn/);assert.equal(JSON.stringify(allExams),original);
});
test('English form labels leave Google Form option values unchanged',()=>{
 setLanguage('en');const field=leadFields.find(f=>f.name==='school'),option=field.options[0];
 assert.equal(t(field.label),'What school level is your child in?');assert.equal(t(option),'Kindergarten');assert.equal(option,'Mẫu giáo');
 const values={phone:'0900000000',school:option,goal:'Luyện Cambridge'};
 assert.equal(validateLead(values).valid,true);assert.equal(validateLead(values).values.school,option);
 setLanguage('vi');
});
