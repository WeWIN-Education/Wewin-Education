import manifest from './media-manifest.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const artKey=spec=>spec.file+'|'+spec.clip.map(v=>Math.round(v*1000)).join(',');
export function mediaPath(path){const item=manifest.images[path];if(!item)throw new Error('Unprepared image: '+path);return item.variants.at(-1).file;}
function tag(item,alt,{className='',sizes='(max-width: 767px) calc(100vw - 56px), (max-width: 1000px) 55vw, 680px',loading='lazy',priority='auto'}={}){
 const variants=item.variants,last=variants.at(-1),src=variants.find(v=>v.width>=960)||last;
 return `<img src="assets/${src.file}" srcset="${variants.map(v=>'assets/'+v.file+' '+v.width+'w').join(', ')}" sizes="${esc(sizes)}" width="${last.width}" height="${last.height}" alt="${esc(alt)}"${className?` class="${esc(className)}"`:''} loading="${loading}" decoding="async" fetchpriority="${priority}">`;
}
export function mediaImage(path,alt='',options={}){const item=manifest.images[path];if(!item)throw new Error('Unprepared image: '+path);return tag(item,alt,options);}
export function artworkImage(spec,alt=''){const item=manifest.art[artKey(spec)];if(!item)throw new Error('Unprepared artwork');return tag(item,alt,{className:'raster-art',sizes:'(max-width: 767px) 40vw, 260px'});}
