import {exams, artwork} from './exams.mjs';
export {exams, artwork};
export const characters = [
  {id:'p1', x:15, y:34, label:'Nhân vật 1'},
  {id:'p2', x:42, y:34, label:'Nhân vật 2'},
  {id:'p3', x:68, y:34, label:'Nhân vật 3'},
  {id:'p4', x:15, y:74, label:'Nhân vật 4'},
  {id:'p5', x:38, y:74, label:'Nhân vật 5'},
  {id:'p6', x:63, y:74, label:'Nhân vật 6'},
  {id:'p7', x:85, y:74, label:'Nhân vật 7'},
];
export const balls = [
  {id:'under-table', x:27.36, y:43.32, label:'Bóng dưới bàn'},
  {id:'on-chair', x:67.83, y:58.34, label:'Bóng trên ghế'},
  {id:'under-tree', x:83.41, y:44.02, label:'Bóng dưới cây'},
  {id:'next-box', x:9.46, y:79.74, label:'Bóng cạnh hộp'},
  {id:'in-box', x:25.84, y:78.17, label:'Bóng trong hộp'},
  {id:'other', x:89.88, y:79.83, label:'Bóng ở góc phải'},
];
export const colours = [
  {id:'red', label:'Đỏ', hex:'#e65055'},
  {id:'blue', label:'Xanh dương', hex:'#287bd0'},
  {id:'green', label:'Xanh lá', hex:'#40a35a'},
  {id:'yellow', label:'Vàng', hex:'#f3ce37'},
  {id:'purple', label:'Tím', hex:'#9560c8'},
  {id:'orange', label:'Cam', hex:'#ee9445'},
];
export let exam = exams[0];
export function selectExam(id) {
  const selected = exams.find(item => item.id === id);
  if (!selected) return false;
  exam = selected;
  return true;
}
export const normalise = value => String(value ?? '').trim().toLowerCase().replace(/\s+/g,' ');
export function answered(question, value) {
  return typeof question.answer === 'object' ? !!(value?.target && value?.colour) : normalise(value) !== '';
}
export function correct(question, value) {
  if (typeof question.answer === 'object') return value?.target === question.answer.target && value?.colour === question.answer.colour;
  return [question.answer,...(question.accepted || [])].some(x=>normalise(x) === normalise(value));
}
export function score(answers, selectedExam=exam) {
  const result={};
  for(const skill of ['reading','listening']) {
    const questions=selectedExam[skill].flatMap(p=>p.questions);
    result[skill]={total:questions.length, correct:questions.filter(q=>correct(q,answers[q.id])).length, answered:questions.filter(q=>answered(q,answers[q.id])).length};
  }
  result.total=result.reading.correct+result.listening.correct;
  result.answered=result.reading.answered+result.listening.answered;
  return result;
}
export function answerLabel(question, value) {
  if(!answered(question,value)) return 'Chưa trả lời';
  if(typeof question.answer === 'object') return `${balls.find(b=>b.id===value.target)?.label || ''} · ${colours.find(c=>c.id===value.colour)?.label || ''}`;
  if(question.id.startsWith('l1')) return characters.find(c=>c.id===value)?.label || value;
  return {tick:'✓ Đúng',cross:'✗ Sai'}[value] || String(value);
}
