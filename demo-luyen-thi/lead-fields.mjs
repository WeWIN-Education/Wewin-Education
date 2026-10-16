// Keep values identical to the connected Google Form choices.
export const leadFields = [
  {name:'phone',entry:'283641756',label:'Số điện thoại phụ huynh',required:true,type:'tel',pattern:'^0[0-9]{9}$',error:'Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0.'},
  {name:'school',entry:'1697192079',label:'Bé hiện đang học ở cấp nào?',required:true,options:['Mẫu giáo','Lớp 1–2','Lớp 3–5','THCS','THPT']},
  {name:'goal',entry:'1176699610',label:'Mục tiêu học tiếng Anh hiện tại của bé là gì?',required:true,options:['Học tốt tiếng Anh ở trường','Cải thiện phát âm','Giao tiếp tự tin hơn','Luyện Cambridge','Luyện IELTS','Chưa xác định – cần tư vấn']},
  {name:'parent',entry:'963602416',label:'Tên phụ huynh'},
  {name:'area',entry:'317162965',label:'Khu vực sinh sống / cơ sở gần nhất'},
  {name:'vip',entry:'1886202968',label:'Tôi muốn nhận tài khoản WeWIN VIP',options:['Có','Chưa chắc']},
  {name:'age',entry:'464861020',label:'Độ tuổi của bé',type:'text',pattern:'^([1-9]|1[0-8])$',error:'Vui lòng nhập tuổi từ 1 đến 18.'},
  {name:'student',entry:'865282570',label:'Bạn có phải học viên tại WeWIN Education không?',options:['Tôi là học viên của WeWIN Education','Không phải']},
];

export function validateLead(input){
  const values={},errors={};
  for(const field of leadFields){
    const raw=input?.[field.name];
    const value=typeof raw==='string'?raw.trim():'';
    values[field.name]=value;
    if(field.required&&!value)errors[field.name]='Vui lòng hoàn thành thông tin này.';
    else if(value.length>160||(value&&field.options&&!field.options.includes(value)))errors[field.name]='Vui lòng chọn thông tin hợp lệ.';
    else if(value&&field.pattern&&!new RegExp(field.pattern).test(value))errors[field.name]=field.error;
  }
  return {values,errors,valid:Object.keys(errors).length===0};
}
