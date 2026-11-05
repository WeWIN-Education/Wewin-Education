import {getLanguage} from './language.mjs';
import {escapeHTML as esc,uiIcon} from './learning-ui.mjs';
import {matchesSearch,displayCode} from './search.mjs';
const L=(vi,en)=>getLanguage()==='en'?en:vi;
const mounted=new Set();let serial=0;
function picker(host,{items,label,multiple=false,selected=[],onChange,placeholder,controlId}){
 const id=controlId||'wewin-combo-'+(++serial);let values=new Set(selected.filter(v=>v!==undefined&&v!==null)),opened=false,active=-1,results=[],timer=null,pending=false;
 host.classList.add('wewin-combo');
 const box=document.createElement('div');box.className='combo-box';box.innerHTML=`<div class="combo-chips"></div><div class="combo-input-row"><input type="text" class="combo-input" id="${id}" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="${id}-list" aria-label="${esc(label)}" autocomplete="off" placeholder="${esc(placeholder||L('Tìm và chọn…','Search and select…'))}"><button class="combo-toggle" type="button" aria-label="${L('Mở danh sách','Open options')}" tabindex="-1">${uiIcon('down')}</button></div>`;
 const popup=document.createElement('div');popup.className='combo-popup';popup.hidden=true;popup.innerHTML=`<div class="combo-results" id="${id}-list" role="listbox" ${multiple?'aria-multiselectable="true"':''} aria-label="${esc(label)}"></div><p class="combo-summary" role="status" aria-live="polite"></p>`;
 host.append(box,popup);const input=box.querySelector('input'),list=popup.querySelector('.combo-results'),summary=popup.querySelector('.combo-summary'),chips=box.querySelector('.combo-chips');
 const current=()=>items.filter(i=>values.has(i.value));
 function sync(){
  if(multiple){chips.innerHTML=current().map(i=>`<span class="combo-chip"><span>${esc(i.label)}${i.code?`<small>${esc(i.code)}</small>`:''}</span><button type="button" data-remove="${esc(i.value)}" aria-label="${esc(L('Bỏ chọn ','Remove ')+i.label)}">${uiIcon('close')}</button></span>`).join('');}
  else if(!opened)input.value=current()[0]?.label||'';
  onChange?.([...values]);
 }
 function position(){if(!opened)return;const rect=box.getBoundingClientRect(),below=innerHeight-rect.bottom-12,above=rect.top-12,useAbove=below<180&&above>below,max=Math.max(100,Math.min(320,useAbove?above:below));popup.style.left=Math.max(8,rect.left)+'px';popup.style.width=Math.min(rect.width,innerWidth-16)+'px';popup.style.maxHeight=max+'px';popup.style.top=useAbove?'auto':(rect.bottom+6)+'px';popup.style.bottom=useAbove?(innerHeight-rect.top+6)+'px':'auto';}
 function highlight(){list.querySelectorAll('[role="option"]').forEach((el,n)=>el.classList.toggle('is-active',n===active));if(active>=0){input.setAttribute('aria-activedescendant',id+'-option-'+active);list.children[active]?.scrollIntoView({block:'nearest'});}else input.removeAttribute('aria-activedescendant');}
 function render(){
  try{pending=false;const all=items.filter(i=>matchesSearch(i.search||[i.label,i.code,i.description,i.group].join(' '),input.value));all.sort((a,b)=>Number(!!a.disabled)-Number(!!b.disabled));results=all.slice(0,10);active=results.findIndex(i=>!i.disabled);list.innerHTML=results.map((i,n)=>`<div id="${id}-option-${n}" class="combo-option ${i.disabled?'is-disabled':''}" data-index="${n}" role="option" aria-selected="${values.has(i.value)}" ${i.disabled?'aria-disabled="true"':''}><div><strong>${esc(i.label)}</strong>${i.code?`<span class="combo-code">${esc(i.code)}</span>`:''}${i.description||i.group?`<small>${esc(i.description||i.group)}</small>`:''}</div><span class="combo-option-state">${i.disabled?(i.disabledText||L('Không khả dụng','Unavailable')):values.has(i.value)?uiIcon('check'):''}</span></div>`).join('');summary.textContent=all.length?`${L('Hiển thị','Showing')} ${results.length}/${all.length}${all.length>10?' · '+L('Nhập thêm để thu hẹp kết quả','Type more to narrow results'):''}`:L('Không tìm thấy kết quả. Thử tên hoặc mã khác.','No results. Try another name or code.');list.setAttribute('aria-busy','false');highlight();position();}
  catch{results=[];active=-1;list.innerHTML='';summary.textContent=L('Không tải được lựa chọn. Đóng rồi mở lại để thử lại.','Options could not load. Close and reopen to retry.');list.setAttribute('aria-busy','false');}
 }
 function open(){for(const p of mounted)if(p.host!==host)p.close();opened=true;popup.hidden=false;input.setAttribute('aria-expanded','true');if(!multiple)input.value='';render();}
 function close(){clearTimeout(timer);pending=false;opened=false;popup.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');if(!multiple)input.value=current()[0]?.label||'';}
 function choose(index){if(pending){clearTimeout(timer);render();return;}const item=results[index];if(!item||item.disabled)return;input.removeAttribute('aria-invalid');if(multiple){values.has(item.value)?values.delete(item.value):values.add(item.value);sync();render();input.focus();}else{values=new Set([item.value]);close();sync();input.focus();}}
 input.addEventListener('focus',()=>{if(input.dataset.restoreFocus){delete input.dataset.restoreFocus;return;}if(!opened)open();});
 input.addEventListener('input',()=>{if(!opened)open();clearTimeout(timer);pending=true;active=-1;input.removeAttribute('aria-activedescendant');list.setAttribute('aria-busy','true');summary.textContent=L('Đang tìm…','Searching…');timer=setTimeout(render,250);});
 input.addEventListener('keydown',e=>{if(e.isComposing)return;if(e.key==='Escape'&&opened){e.preventDefault();e.stopPropagation();close();return;}if(e.key==='Tab'){close();return;}if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();if(!opened){open();return;}if(pending){clearTimeout(timer);render();}const step=e.key==='ArrowDown'?1:-1;let n=active;for(let k=0;k<results.length;k++){n=(n+step+results.length)%results.length;if(!results[n].disabled){active=n;break;}}highlight();}else if(e.key==='Enter'&&opened){e.preventDefault();if(pending){clearTimeout(timer);render();}choose(active);}});
 popup.addEventListener('pointerdown',e=>e.preventDefault());popup.addEventListener('click',e=>{e.preventDefault();const row=e.target.closest('[data-index]');if(row)choose(Number(row.dataset.index));});
 chips.addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;values.delete(b.dataset.remove);sync();if(opened)render();input.focus();});
 box.querySelector('.combo-toggle').addEventListener('click',()=>{if(opened)close();else{input.focus();if(!opened)open();}});
 const instance={host,close,reposition:position,getValues:()=>[...values],setValues:v=>{values=new Set(v);sync();if(opened)render();},destroy:()=>{clearTimeout(timer);mounted.delete(instance);},refresh:()=>{if(opened)render();else sync();},input};mounted.add(instance);sync();return instance;
}
document.addEventListener('pointerdown',e=>{for(const p of mounted)if(!p.host.contains(e.target))p.close();});
document.addEventListener('focusin',e=>{for(const p of mounted)if(!p.host.contains(e.target))p.close();});
window.addEventListener('resize',()=>{for(const p of mounted)p.reposition();});
document.addEventListener('scroll',e=>{for(const p of mounted)if(!p.host.querySelector('.combo-popup')?.contains(e.target))p.reposition();},true);
export function enhanceSelects(root){
 for(const p of mounted)if(!p.host.isConnected)p.destroy();
 for(const select of root.querySelectorAll('select:not([data-combo-ready])')){
  select.dataset.comboReady='true';const label=select.getAttribute('aria-label')||[...(select.labels?.[0]?.childNodes||[])].filter(n=>n.nodeType===3).map(n=>n.textContent).join(' ').trim()||L('Chọn mục','Choose an option');
  const items=[...select.options].map(o=>({value:o.value,label:o.textContent,group:o.parentElement.tagName==='OPTGROUP'?o.parentElement.label:'',disabled:o.disabled}));
  const host=document.createElement('div');select.before(host);host.append(select);select.classList.add('combo-native');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
  const instance=picker(host,{items,label,controlId:select.id?'combo-'+select.id:select.closest('form')?.id&&select.name?'combo-'+select.closest('form').id+'-'+select.name:undefined,selected:[select.value],onChange:values=>{const value=values[0]??'';if(select.value!==value){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));}}});
  instance.input.disabled=select.disabled;host.querySelector('.combo-toggle').disabled=select.disabled;
  select.addEventListener('invalid',e=>{e.preventDefault();instance.input.focus();instance.input.setAttribute('aria-invalid','true');});
 }
}
let studentPicker=null;
export function mountStudentPicker(root,staff,classId){
 studentPicker?.destroy();studentPicker=null;const host=root.querySelector('#student-combobox');if(!host)return;
 const memberIds=new Set(staff.enrollments.filter(e=>e.class_id===classId).map(e=>e.student_id));
 const items=staff.users.filter(u=>u.role==='student'&&u.active).map(u=>({value:u.id,label:u.nickname,code:displayCode(u.username),description:staff.enrollments.filter(e=>e.student_id===u.id).map(e=>staff.classes.find(c=>c.id===e.class_id)).filter(c=>c&&!c.archived_at).map(c=>c.name).join(' · ')||L('Chưa có lớp','No class yet'),disabled:memberIds.has(u.id),disabledText:L('Đã trong lớp','Already enrolled')}));
 studentPicker=picker(host,{items,label:L('Tìm và chọn học viên','Search and select learners'),multiple:true,placeholder:L('Tìm họ tên không dấu hoặc mã học viên…','Search name or learner code…'),onChange:ids=>{const button=root.querySelector('#enroll-submit');if(button){button.textContent=L('Thêm vào lớp','Add to class')+' ('+ids.length+')';button.disabled=!ids.length;}}});
}
export const selectedStudents=()=>studentPicker?.getValues()||[];
export const setSelectedStudents=ids=>studentPicker?.setValues(ids);
export function enhanceListSearch(root){for(const input of root.querySelectorAll('[data-list-filter]:not([data-filter-ready])')){input.dataset.filterReady='true';let timer;input.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{if(!input.isConnected)return;const elements=[...root.querySelectorAll(input.dataset.listFilter)];let count=0;for(const el of elements){const match=matchesSearch(el.dataset.search||el.textContent,input.value);el.hidden=!match;count+=match?1:0;}const status=root.querySelector('#'+input.id+'-status');if(status)status.textContent=count?`${count}/${elements.length} ${L('kết quả','results')}`:L('Không tìm thấy kết quả.','No results found.');},250);});}}
