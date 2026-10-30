export class ServiceError extends Error{constructor(message,status,code){super(message);this.status=status;this.code=code;}}
export async function api(resource,{data,id,exam,signal,student,status,offset}={}){
 const params=new URLSearchParams({resource});if(id)params.set('id',id);if(exam)params.set('exam',exam);
 if(student)params.set('student',student);if(status)params.set('status',status);if(offset!==undefined)params.set('offset',offset);
 const response=await fetch('/api/practice?'+params,{credentials:'same-origin',cache:'no-store',signal,...(data===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})});
 let body;try{body=await response.json();}catch{throw new ServiceError('Unable to read the server response. Please try again.',response.status,'INVALID_RESPONSE');}
 if(!response.ok){if(response.status===401&&['GUEST_ACCESS_EXPIRED','GUEST_SESSION_EXPIRED'].includes(body.code)&&typeof window!=='undefined')window.dispatchEvent(new CustomEvent('wewin-guest-expired',{detail:{reason:body.code==='GUEST_ACCESS_EXPIRED'?'expired':'idle_expired'}}));throw new ServiceError(body.message||'The request could not be completed.',response.status,body.code);}return body;
}
