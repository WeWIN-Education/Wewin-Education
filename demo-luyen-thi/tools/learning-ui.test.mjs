import test from 'node:test';
import assert from 'node:assert/strict';
import {allExams} from '../public-data.mjs';
import {learningSummary,attemptCTA,dashboardOverview,levelCards,progressWidget} from '../learning-ui.mjs';
import {renderLibraryResults,libraryLayout} from '../library.mjs';
const exam=allExams[0],other=allExams[1];
const attempt=(e,extra={})=>({id:'sample-attempt',exam_id:e.id,exam_version:e.version,created_at:'2026-10-24T00:00:00Z',...extra});
test('progress reflects current completed tests, deduplicates retries, and preserves zero scores',()=>{
 const rows=[attempt(exam,{submitted_at:'2026-10-24',result:{total:0}}),attempt(exam,{submitted_at:'2026-10-24',result:{total:80}}),attempt(other),attempt(exam,{exam_version:'retired',submitted_at:'2026-10-24',result:{total:100}}),{exam_id:'removed-test',submitted_at:'2026-10-24',result:{total:100}}];
 const summary=learningSummary(allExams,rows);assert.equal(summary.submitted.length,2);assert.equal(summary.completed.size,1);assert.equal(summary.drafts.length,1);assert.equal(summary.best,80);assert.equal(summary.levels[0].percent,5);assert.equal(learningSummary(allExams).best,null);assert.equal(learningSummary(allExams,[rows[0]]).best,0);
});
test('test actions resume the current draft before offering a submitted result',()=>{
 const done=attempt(exam,{id:'done',submitted_at:'2026-10-24',result:{total:90}}),draft=attempt(exam,{id:'draft'});
 const cta=attemptCTA(exam,[done,draft]);assert.match(cta,/data-id="draft"/);assert.match(cta,/Tiếp tục/);assert.match(attemptCTA(exam,[done]),/Xem kết quả/);assert.match(attemptCTA(exam,[]),/data-action="open-test"/);
});
test('library preserves all levels, search, load more and accessible empty state',()=>{
 const render=opts=>renderLibraryResults({category:'all',query:'',limit:6,action:e=>attemptCTA(e),...opts});
 assert.equal((render({}).match(/<article/g)||[]).length,6);assert.match(render({}),/Xem thêm 6 đề/);assert.equal((render({category:'starters',query:'hard',limit:30}).match(/<article/g)||[]).length,10);assert.match(render({query:'nonexistent'}),/Xóa bộ lọc/);
 const cards=levelCards({exams:allExams,category:'flyers'});assert.equal((cards.match(/aria-pressed="true"/g)||[]).length,1);
 const library=libraryLayout({category:'all',query:'',results:render({})});assert.match(library,/60 đề luyện/);assert.match(library,/id="catalog-search"/);
});
test('personal data is escaped and unavailable progress never pretends to be zero',()=>{
 const markup=dashboardOverview({exams:allExams,user:{nickname:'<script>alert(1)</script>'},available:false});assert.ok(!markup.includes('<script>'));assert.match(markup,/&lt;script&gt;/);assert.match(markup,/Chưa tải được/);
 const progress=progressWidget({exams:allExams,available:false});assert.match(progress,/—\/20/);assert.match(progress,/Tải lại|Đăng nhập/);
});
