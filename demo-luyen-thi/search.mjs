export const foldSearch=value=>String(value??'').normalize('NFD').replace(/\p{M}/gu,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/\s+/g,' ').trim();
export const matchesSearch=(text,query)=>{const hay=foldSearch(text),compact=hay.replace(/[^a-z0-9]/g,'');return foldSearch(query).split(' ').filter(Boolean).every(token=>hay.includes(token)||(token.replace(/[^a-z0-9]/g,'').length>0&&compact.includes(token.replace(/[^a-z0-9]/g,''))));};
export const displayCode=value=>String(value??'').toUpperCase();
