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
const q = (id, prompt, answer, more={}) => ({id, prompt, answer, ...more});
export const exam = {
  id:'starters-01', title:'A day in the park', level:'Pre A1 Starters', audioVersion:'20261014',
  reading:[
    {id:'r1', title:'Look & read', instruction:'Look and read. Choose a tick (✓) or a cross (✗).', hint:'Nhìn hình và đọc câu. Chọn đúng hoặc sai.', type:'binary', options:[['tick','✓','Đúng'],['cross','✗','Sai']], questions:[
      q('r1-1','This is a pencil.','tick',{image:'reading-object-1.png'}),
      q('r1-2','This is a shirt.','cross',{image:'reading-object-2.png'}),
      q('r1-3','This is a bus.','tick',{image:'reading-object-3.png'}),
      q('r1-4','This is a fish.','tick',{image:'reading-object-4.png'}),
      q('r1-5','This is a flower.','cross',{image:'reading-object-5.png'}),
    ]},
    {id:'r2', title:'Read the picture', instruction:'Look at the picture. Read and choose yes or no.', hint:'Đọc từng câu và chọn Yes hoặc No dựa vào tranh.', type:'binary', image:'reading-scene.png', options:[['yes','Yes',''],['no','No','']], questions:[
      q('r2-1','The boy is holding a book.','yes'),
      q('r2-2','There is a plane next to the tree.','no'),
      q('r2-3','The girl has an orange shirt.','yes'),
      q('r2-4','The animal is on the table.','no'),
      q('r2-5','There are two pieces of fruit on the table.','yes'),
    ]},
    {id:'r3', title:'Complete the text', instruction:'Read. Choose a word from the box for each gap.', hint:'Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.', type:'words', bank:['fish','pencil','sun','eyes','chair','ball','legs','tail'], questions:[
      q('r3-1','It has two ___ to see with.','eyes'),
      q('r3-2','It has a long ___ behind its body.','tail'),
      q('r3-3','A cat can sit on a ___ in a living room.','chair'),
      q('r3-4','It can play with a small round ___.','ball'),
      q('r3-5','Some cats like eating ___.','fish'),
    ]},
    {id:'r4', title:'Read the story', instruction:'Look at the pictures. Write one word for each answer.', hint:'Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.', type:'text', story:true, questions:[
      q('r4-1','What is between the dog and the tree?','ball',{picture:1}),
      q('r4-2','What colour is the girl’s shirt?','pink',{picture:1}),
      q('r4-3','The ball is under the ...','tree',{picture:2}),
      q('r4-4','Who has the ball now?','girl',{picture:3}),
      q('r4-5','How many dogs are there?','one',{picture:3, accepted:['1']}),
    ]},
  ],
  listening:[
    {id:'l1', title:'Listen & match', instruction:'Listen and match each name to a child in the picture.', hint:'Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.', type:'match', image:'listening-scene.png', questions:[
      q('l1-1','Grace','p5'), q('l1-2','Sam','p6'), q('l1-3','Anna','p3'), q('l1-4','Ben','p4'), q('l1-5','Tom','p2'),
    ]},
    {id:'l2', title:'Names & numbers', instruction:'Read the questions. Listen and write a name or a number.', hint:'Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là Lucy.', type:'text', questions:[
      q('l2-1','How old is Lucy?','6',{accepted:['six'],numeric:true}),
      q('l2-2','What is the name of the cat?','Ben'),
      q('l2-3','How many books are in the bag?','4',{accepted:['four'],numeric:true}),
      q('l2-4','What is the teacher’s name?','Grace'),
      q('l2-5','What number is on the door?','10',{accepted:['ten'],numeric:true}),
    ]},
    {id:'l3', title:'Listen & choose', instruction:'Listen and choose one picture for each question.', hint:'Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.', type:'pictures', questions:[
      q('l3-1','What does Lucy want?','A'),
      q('l3-2','Which picture does Tom like?','C'),
      q('l3-3','What can Anna see?','B'),
      q('l3-4','What is in the box?','A'),
      q('l3-5','What is in the picture?','C'),
    ]},
    {id:'l4', title:'Listen & colour', instruction:'Listen and colour the balls in the picture.', hint:'Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng đỏ trên bàn là ví dụ.', type:'colour', image:'colour-scene-v2.png', questions:[
      q('l4-1','Câu 1',{target:'under-table',colour:'orange'}),
      q('l4-2','Câu 2',{target:'on-chair',colour:'yellow'}),
      q('l4-3','Câu 3',{target:'under-tree',colour:'green'}),
      q('l4-4','Câu 4',{target:'next-box',colour:'purple'}),
      q('l4-5','Câu 5',{target:'in-box',colour:'blue'}),
    ]},
  ],
};
export const normalise = value => String(value ?? '').trim().toLowerCase().replace(/\s+/g,' ');
export function answered(question, value) {
  return typeof question.answer === 'object' ? !!(value?.target && value?.colour) : normalise(value) !== '';
}
export function correct(question, value) {
  if (typeof question.answer === 'object') return value?.target === question.answer.target && value?.colour === question.answer.colour;
  return [question.answer,...(question.accepted || [])].some(x=>normalise(x) === normalise(value));
}
export function score(answers) {
  const result={};
  for(const skill of ['reading','listening']) {
    const questions=exam[skill].flatMap(p=>p.questions);
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
