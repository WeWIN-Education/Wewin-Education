import {getLanguage,t} from './language.mjs';
const saved=()=>{try{return localStorage.getItem('wewin-theme');}catch{return null;}};
const preference=saved();
document.documentElement.dataset.theme=preference==='dark'||(!preference&&matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';
const symbols={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',moon:'<path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z"/>'};
const learning=()=>getLanguage()==='en';
const themeLabel=dark=>learning()?(dark?'Switch to light mode':'Switch to dark mode'):(dark?'Bật chế độ sáng':'Bật chế độ tối');
export function themeButton(){const dark=document.documentElement.dataset.theme==='dark';return `<button class="btn icon-only ghost theme-toggle" data-ui="theme" aria-label="${themeLabel(dark)}" title="${themeLabel(dark)}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${symbols[dark?'sun':'moon']}</svg></button>`;}
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-ui]');if(!button)return;
 if(button.dataset.ui==='theme'){
  const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;
  try{localStorage.setItem('wewin-theme',next);}catch{}
  document.querySelectorAll('[data-ui="theme"]').forEach(el=>{el.setAttribute('aria-label',themeLabel(next==='dark'));el.title=themeLabel(next==='dark');el.innerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+symbols[next==='dark'?'sun':'moon']+'</svg>';});
  document.querySelector('#announcer').textContent=learning()?(next==='dark'?'Dark mode enabled':'Light mode enabled'):(next==='dark'?'Đã bật chế độ tối':'Đã bật chế độ sáng');
 }
 if(button.dataset.ui==='menu'){
  const menu=document.querySelector('#mobile-nav');menu.hidden=!menu.hidden;button.setAttribute('aria-expanded',!menu.hidden);
 }
});
