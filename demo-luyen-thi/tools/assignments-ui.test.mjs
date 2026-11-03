import test from 'node:test';
import assert from 'node:assert/strict';
import {assignmentState,assignmentReport,renderStudentAssignments,renderClassManagement,assignmentForm} from '../assignments-ui.mjs';
import {allExams} from '../public-data.mjs';
test('deadline states distinguish a late submission, a zero score and unstarted work',()=>{
 const due='2026-11-03T03:00:00Z',now=Date.parse('2026-11-03T04:00:00Z');
 assert.equal(assignmentState({},due,now),'overdue');assert.equal(assignmentState({},due,now-7200000),'pending');assert.equal(assignmentState({attempt_id:'a'},due,now),'started');
 assert.equal(assignmentState({submitted_at:due},due,now),'submitted');assert.equal(assignmentState({submitted_at:'2026-11-03T03:00:01Z'},due,now),'late');
 const assignment={id:'a',class_id:'c',class_name:'Flyers 1',title:'Homework <script>',exam_id:'flyers-16',due_at:due};
 const html=assignmentReport({assignment,students:[{student_id:'u',nickname:'<img src=x>',username:'student',attempt_id:'p',submitted_at:due,result:{total:0,reading:{correct:0,total:43},listening:{correct:0,total:25}}}]},allExams);
 assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<img src=x>'));assert.match(html,/0\/43/);assert.match(html,/>0<\/strong>/);assert.match(html,/data-action="staff-attempt"/);
 const form=assignmentForm({cls:{id:'c',name:'Flyers 1'},exams:allExams});assert.match(form,/type="datetime-local" name="dueAt" required/);assert.match(form,/GMT\+7/);
});
test('student assignments escape instructions and staff class cards list the assigned roster',()=>{
 const row={id:'a',class_name:'Flyers 1',title:'Homework',exam_id:'flyers-16',due_at:'2026-11-04T03:00:00Z',instructions:'<script>alert(1)</script>'};
 const html=renderStudentAssignments({rows:[row],exams:allExams});assert.ok(!html.includes('<script>'));assert.match(html,/data-action="start-assignment"/);assert.equal(renderStudentAssignments({rows:[],exams:allExams,compact:true}),'');
 const staff={classes:[{id:'c',name:'Flyers 1',teacher_id:null}],users:[{id:'u',nickname:'A',username:'wewin01',role:'student'}],enrollments:[{class_id:'c',student_id:'u'}]};
 const classes=renderClassManagement({staff,user:{role:'admin'},exams:allExams});assert.match(classes,/Phân công giáo viên/);assert.match(classes,/Danh sách học viên/);assert.match(classes,/wewin01/);
});
