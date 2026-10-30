import {t,ui,languageButton,onLanguageChange} from './language.mjs';
import {mediaImage} from './media.mjs';
import {leadFields,validateLead} from './lead-fields.mjs';

const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const firstFields=['phone','school','goal'];

export function requireLeadAccess(){
  const root=document.querySelector('#app');
  const dialog=document.createElement('dialog');
  dialog.id='lead-gate';dialog.className='lead-gate';
  dialog.setAttribute('aria-labelledby','lead-title');
  dialog.setAttribute('aria-describedby','lead-description');
  let step=1,busy=false,finished=false;
  let unsubscribeLanguage=()=>{};
  const values=Object.fromEntries(leadFields.map(f=>[f.name,'']));
  let resolveAccess;
  const access=new Promise(resolve=>{resolveAccess=resolve;});
  function unlock(registered=true){if(finished)return;finished=true;unsubscribeLanguage();root.inert=false;document.body.classList.remove('lead-locked');dialog.close();dialog.remove();resolveAccess(registered);}
  function field(f){
    const title=ui`${esc(t(f.label))}${f.required?' <span class="lead-required" aria-hidden="true">*</span>':''}`;
    const error=ui`<span class="lead-field-error" id="lead-error-${f.name}" aria-live="polite"></span>`;
    if(f.options)return ui`<fieldset class="lead-field ${f.name==='goal'?'lead-wide':''}" data-field="${f.name}"><legend>${t(title)}</legend><div class="lead-options ${f.name==='goal'||f.name==='student'?'lead-options-list':''}">${f.options.map((o,i)=>ui`<label class="lead-option"><input type="radio" name="${f.name}" value="${esc(o)}" ${values[f.name]===o?'checked':''} aria-describedby="lead-error-${f.name}" ${f.required&&i===0?'required':''}><span>${esc(t(o))}</span></label>`).join('')}</div>${error}</fieldset>`;
    return ui`<div class="lead-field ${f.name==='phone'||f.name==='area'?'lead-wide':''}" data-field="${f.name}"><label for="lead-${f.name}">${t(title)}</label><input id="lead-${f.name}" name="${f.name}" class="lead-input" type="${f.type==='tel'?'tel':'text'}" ${f.name==='phone'?'inputmode="tel" autocomplete="tel-national" maxlength="10"':f.name==='age'?'inputmode="numeric" maxlength="2"':f.name==='parent'?'autocomplete="name" maxlength="160"':'autocomplete="address-level2" maxlength="160"'} ${f.required?'required':''} ${f.pattern?ui`pattern="${f.pattern}"`:''} aria-describedby="lead-error-${f.name}${f.name==='phone'?' lead-phone-hint':''}" value="${esc(values[f.name])}">${f.name==='phone'?ui`<span class="lead-hint" id="lead-phone-hint">10 chữ số, bắt đầu bằng 0</span>`:''}${error}</div>`;
  }
  function render(){
    const fields=(step===1?firstFields:['parent','age','area','vip','student']).map(name=>leadFields.find(f=>f.name===name));
    dialog.innerHTML=ui`<div class="lead-layout"><aside class="lead-intro"><div class="lead-intro-heading"><span class="eyebrow">${'WeWIN English Practice'}</span><h2>${t('Cùng bé khám phá<br>khả năng tiếng Anh')}</h2><p>Starters · Movers · Flyers</p></div>${mediaImage('win.png','Win — linh vật WeWIN',{sizes:'220px',loading:'eager'})}<div class="lead-intro-note">${t('Chọn đề phù hợp.<br>Luyện tập và xem kết quả ngay.')}</div></aside><section class="lead-main"><div class="lead-heading">${mediaImage('logo.png','WeWIN Education',{sizes:'144px',loading:'eager'})}${languageButton()}<span class="lead-step-count">Bước ${step}/2</span></div><div class="lead-progress" aria-hidden="true"><span class="active"></span><span class="${step===2?'active':''}"></span></div><h1 id="lead-title">${step===1?t('Sẵn sàng cho bài luyện?'):t('Thêm một chút về bé')}</h1><p id="lead-description">${step===1?t('Phụ huynh vui lòng điền thông tin trước khi bé bắt đầu.'):t('Các thông tin dưới đây không bắt buộc, giúp WeWIN tư vấn phù hợp hơn.')}</p><form id="lead-form" novalidate><div class="lead-fields">${fields.map(field).join('')}</div><p class="lead-submit-error" id="lead-submit-error" role="alert"></p><div class="lead-actions">${step===2?ui`<button type="button" class="btn ghost" id="lead-back">Quay lại</button>`:ui`<span class="lead-required-note"><span class="lead-required">*</span> Thông tin bắt buộc</span>`}<button type="submit" class="btn primary" id="lead-submit">${step===1?t('Tiếp tục'):t('Hoàn tất và mở bài luyện')}<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></button></div><button type="button" class="btn lead-signin" id="lead-signin"><span>Đã có tài khoản WeWIN?</span><strong>Đăng nhập</strong></button><p class="guest-login-hint">${t('Quyền khách có hiệu lực 24 giờ. Không hoạt động 3 giờ sẽ hết phiên. Đăng nhập lại bằng SĐT đã đăng ký, mật khẩu 123.')}</p><button type="button" class="btn full" id="lead-vocab">${t('Chơi Vocab miễn phí, không cần tài khoản')}</button><p class="lead-privacy">WeWIN sử dụng thông tin để liên hệ tư vấn lộ trình học tiếng Anh cho bé.</p></form></section></div>`;
    dialog.querySelector('#lead-vocab')?.addEventListener('click',()=>{if(busy)return;unlock(false);window.dispatchEvent(new Event('wewin-vocab'));});
    dialog.querySelector('#lead-signin')?.addEventListener('click',()=>window.dispatchEvent(new Event('wewin-signin')));
    dialog.querySelector('#lead-back')?.addEventListener('click',()=>{step=1;render();});
    dialog.querySelector('#lead-form').addEventListener('input',event=>{const el=event.target;if(el.name){values[el.name]=el.value;clearFieldError(el.name);}});
    dialog.querySelector('#lead-form').addEventListener('change',event=>{const el=event.target;if(el.name){values[el.name]=el.value;clearFieldError(el.name);}});
    dialog.querySelector('#lead-form').addEventListener('submit',submit);
    dialog.querySelector('input')?.focus({preventScroll:true});
  }
  function clearFieldError(name){const area=dialog.querySelector(ui`[data-field="${name}"]`);area?.classList.remove('has-error');area?.querySelectorAll('input').forEach(el=>el.removeAttribute('aria-invalid'));const label=dialog.querySelector('#lead-error-'+name);if(label)label.textContent='';}
  function errors(fields){
    for(const [name,message] of Object.entries(fields)){
      const area=dialog.querySelector(ui`[data-field="${name}"]`);if(!area)continue;
      area.classList.add('has-error');area.querySelectorAll('input').forEach(el=>el.setAttribute('aria-invalid','true'));area.querySelector('.lead-field-error').textContent=t(message);
    }
    dialog.querySelector('[aria-invalid="true"]')?.focus();
  }
  async function submit(event){
    event.preventDefault();if(busy)return;
    const result=validateLead(values);
    const visibleErrors=Object.fromEntries(Object.entries(result.errors).filter(([name])=>step===2||firstFields.includes(name)));
    if(Object.keys(visibleErrors).length){errors(visibleErrors);return;}
    if(step===1){step=2;render();return;}
    busy=true;const languageControl=dialog.querySelector('[data-action="ui-language"]');if(languageControl)languageControl.disabled=true;const button=dialog.querySelector('#lead-submit');button.disabled=true;button.setAttribute('aria-busy','true');button.textContent=t('Đang gửi thông tin…');
    dialog.querySelector('#lead-submit-error').textContent='';
    try{
      const response=await fetch('/api/lead',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(values),signal:AbortSignal.timeout(45000)});
      const data=await response.json();
      if(!response.ok||data.registered!==true){if(data.errors)errors(data.errors);throw new Error(data.message||t('Chưa gửi được thông tin. Vui lòng thử lại.'));}
      // Recheck the server cookie before enabling the exam interface.
      const check=await fetch('/api/lead',{cache:'no-store',credentials:'same-origin'});
      if(!check.ok||(await check.json()).registered!==true)throw new Error(t('Trình duyệt chưa lưu được xác nhận đăng ký. Vui lòng cho phép cookie của trang và thử lại.'));
      unlock();
    }catch(error){dialog.querySelector('#lead-submit-error').textContent=error.name==='TimeoutError'?t('Kết nối đang chậm. Thông tin vẫn được giữ; vui lòng thử lại.'):t(error.message);}
    finally{busy=false;if(!finished){if(languageControl)languageControl.disabled=false;button.disabled=false;button.removeAttribute('aria-busy');button.textContent=t('Hoàn tất và mở bài luyện');}}
  }
  const authenticated=()=>{fetch('/api/practice?resource=session',{cache:'no-store',credentials:'same-origin'}).then(async r=>{if(r.ok&&(await r.json()).registered)unlock();}).catch(()=>{});};
  window.addEventListener('wewin-authenticated',authenticated);access.then(()=>window.removeEventListener('wewin-authenticated',authenticated));
  unsubscribeLanguage=onLanguageChange(()=>{if(!finished&&!busy)render();});
  document.body.append(dialog);root.inert=true;document.body.classList.add('lead-locked');render();
  dialog.addEventListener('cancel',event=>event.preventDefault());dialog.showModal();
  fetch('/api/lead',{cache:'no-store',credentials:'same-origin'}).then(async r=>{if(r.ok&&(await r.json()).registered===true)unlock();}).catch(()=>{});
  return access;
}
