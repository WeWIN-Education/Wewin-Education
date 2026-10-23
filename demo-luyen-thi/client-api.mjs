export class ServiceError extends Error{constructor(message,status,code){super(message);this.status=status;this.code=code;}}
export async function api(resource,{data,id,exam,signal}={}){
 const params=new URLSearchParams({resource});if(id)params.set('id',id);if(exam)params.set('exam',exam);
 const response=await fetch('/api/practice?'+params,{credentials:'same-origin',cache:'no-store',signal,...(data===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})});
 let body;try{body=await response.json();}catch{throw new ServiceError('Unable to read the server response. Please try again.',response.status,'INVALID_RESPONSE');}
 if(!response.ok)throw new ServiceError(body.message||'The request could not be completed.',response.status,body.code);return body;
}
