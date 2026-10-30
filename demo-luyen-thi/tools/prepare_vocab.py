from pathlib import Path
import re,json,hashlib,urllib.request,io,concurrent.futures
from PIL import Image
root=Path(__file__).resolve().parent.parent
source=Path(r'C:\Users\wewin2026\Downloads\game tu vung')
out=root/'vocab-data';out.mkdir(exist_ok=True)
assets=root/'assets/vocab';assets.mkdir(exist_ok=True)
books=[];icons=set()
for level in ['starters','movers','flyers']:
 s=(source/f'WeWIN_Pre_{level.title()}.html').read_text(encoding='utf-8')
 units=json.loads(re.search(r'^const UNITS=(.*);$',s,re.M)[1])
 pictures=json.loads(re.search(r'^const pictures=(.*);$',s,re.M)[1])
 aliases=dict(re.findall(r"'([^']+)':'([^']+)'",re.search(r'^const ALIASES=(.*);$',s,re.M)[1]))
 def iconcode(value):
  if value in aliases:return aliases[value]
  if re.fullmatch(r'[0-9a-fA-F-]+',value):return value.lower()
  return '-'.join(f'{ord(c):x}' for c in value if ord(c)!=0xfe0f)
 for u in units:
  u['art']=iconcode(u.pop('icon'));icons.add(u['art'])
  for w in u['words']:
   value=pictures.get(w['en'].strip().lower()) or pictures.get(w['en'])
   if value:w['art']=iconcode(value);icons.add(w['art'])
 books.append((level,units))
def download(code):
 p=assets/f'{code}.webp'
 if p.exists():return code
 try:
  url=f'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/{code}_3d.png'
  with urllib.request.urlopen(url,timeout=25) as r:data=r.read()
  im=Image.open(io.BytesIO(data)).convert('RGBA');im.thumbnail((144,144));im.save(p,'WEBP',quality=82,method=6)
  return code
 except Exception:return None
with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:available=set(filter(None,pool.map(download,sorted(icons))))
meta=[]
for level,units in books:
 for u in units:
  if u['art'] not in available:u.pop('art')
  for w in u['words']:
   if w.get('art') not in available:w.pop('art',None)
 (out/f'{level}.mjs').write_text('export default '+json.dumps(units,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
 meta.append({'id':level,'name':'Pre-'+level.title(),'units':len(units),'words':sum(len(u['words']) for u in units)})
(root/'vocab-catalog.mjs').write_text('export const vocabBooks='+json.dumps(meta,ensure_ascii=False)+';\n',encoding='utf-8')
(assets/'ATTRIBUTION.md').write_text('Vocabulary artwork: Microsoft Fluent Emoji, MIT License.\nSource: https://github.com/microsoft/fluentui-emoji\nDistribution: https://github.com/shuding/fluentui-emoji-unicode\nResized to 144px and encoded as WebP for WeWIN.\n',encoding='utf-8')
print(json.dumps({'books':meta,'artwork':len(available),'fallbacks':len(icons)-len(available)}))
