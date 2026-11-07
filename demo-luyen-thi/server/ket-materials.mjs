import {readFile} from 'node:fs/promises';

// Only this fixed list can be downloaded through the staff-only materials endpoint.
export const ketMaterials = [
 ['keys','Đáp án & bài viết mẫu','WeWIN_KET_Answer_Keys_and_Writing_Models.pdf'],
 ['speaking','Hướng dẫn giáo viên Speaking','WeWIN_KET_Speaking_Examiner_Guide.pdf'],
 ['scripts','Listening scripts','WeWIN_KET_Listening_Scripts_TTS.pdf'],
 ['map','Bảng độc lập các Part','WeWIN_KET_Part_Independence_Map.pdf'],
 ['data','Dữ liệu câu hỏi gốc','Editable_Question_Data.json'],
 ['keys-text','Đáp án TXT','ANSWER_KEYS.txt'],
 ['scripts-text','Listening scripts TXT','LISTENING_SCRIPTS.txt'],
 ['speaking-text','Speaking guide TXT','SPEAKING_EXAMINER.txt'],
 ['manifest','SHA-256 manifest','MANIFEST.json'],
 ['readme','Hướng dẫn bộ đề','README_VI.txt'],
 ['duration','Thời lượng audio','Duration_Estimates.json']
];
export async function readKetMaterial(id) {
 const item=ketMaterials.find(item=>item[0]===id);
 if(!item)return null;
 const filename=item[2];
 return {filename,bytes:await readFile(new URL('./materials/ket/'+filename,import.meta.url)),type:filename.endsWith('.pdf')?'application/pdf':filename.endsWith('.json')?'application/json; charset=utf-8':'text/plain; charset=utf-8'};
}
