"""Import supplied Starters/Movers 40–49 and a separate KET edition, preserving existing tests.
Local editorial dependencies: PyMuPDF, Pillow, ffmpeg.
"""
import argparse,ast,copy,hashlib,io,json,random,re,subprocess,shutil
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import fitz
from PIL import Image

parser=argparse.ArgumentParser();parser.add_argument('movers',type=Path);parser.add_argument('starters',type=Path);parser.add_argument('ket',type=Path);args=parser.parse_args()
site=Path(__file__).resolve().parents[1];assets=site/'assets';tag='packs20261118'
media_path=site/'media-manifest.mjs';media=json.loads(media_path.read_text(encoding='utf-8').removeprefix('export default ').rstrip(';\n'))
mapping=json.loads((site/'tools/ms40-colour-map.json').read_text())
new_images={};image_jobs=[];audio_jobs=[];papers=[];public=[]
def picture(image,name,quality=91):
 image=image.convert('RGB');key=f'{tag}/{name}.webp';new_images[key]=dict(width=image.width,height=image.height,variants=[])
 for width in sorted({min(480,image.width),min(1440,image.width)}):
  rel=f'optimized/{tag}/{name}-{width}.webp';image_jobs.append((image.copy(),key,rel,width,round(image.height*width/image.width),quality))
 return key
def render(page,name,box=(34,83,562,790)):
 pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(box),alpha=False)
 return picture(Image.open(io.BytesIO(pix.tobytes('png'))),name,93)
def literal(path,names):
 found={}
 for node in ast.parse(path.read_text(encoding='utf-8')).body:
  if isinstance(node,ast.Assign):
   for target in node.targets:
    if isinstance(target,ast.Name) and target.id in names:found[target.id]=ast.literal_eval(node.value)
 return found
def question(identifier,prompt,answer,options=None,accepted=None,number=None):
 q=dict(id=identifier,prompt=prompt,answer=answer)
 if options:q['choices']=options
 if accepted:q['accepted']=accepted
 if number is not None:q['number']=number
 return q
def letter_options(items):return [dict(value=chr(65+i),label=f'{chr(65+i)} · {text}') for i,text in enumerate(items)]
def append_part(exam,skill,num,title,questions,images=None,**extra):
 p=dict(id=f'{skill[0]}{num}',title=title,questions=questions,**extra)
 if images:p['images']=images
 exam[skill].append(p);return p
def add_audio(exam,root,pattern):
 digests=[]
 for part in range(1,len(exam['listening'])+1):
  source=root/pattern.format(part=part);assert source.is_file(),source
  digest=hashlib.sha256(source.read_bytes()).hexdigest();digests.append(digest)
  rel=f"{tag}/{exam['levelKey']}/{exam['number']}/listening-{part}.mp3"
  audio_jobs.append((source,rel,digest));exam['audio'].append(rel)
 exam['audioVersion']='20261118-'+hashlib.sha256(''.join(digests).encode()).hexdigest()[:12]
def sanitize(exam):
 p=copy.deepcopy(exam)
 for part in p['reading']+p['listening']:
  part.pop('writingImages',None)
  for q in part['questions']:
   for field in ['answer','accepted','sample']:q.pop(field,None)
 return p

for level,root in [('Movers',args.movers),('Starters',args.starters)]:
 source=root/'Editable_Source';data=json.loads((source/'tests.json').read_text(encoding='utf-8'));assert len(data)==10
 bounds=json.loads((source/'bounds.json').read_text());defs=literal(source/'build.py',{'DEFS','RQ'})
 for item in data:
  n=item['n'];star=level=='Starters';lev=level.lower();doc=fitz.open(next((root/'Tests').glob(f'*{n}.pdf')));assert len(doc)==(14 if star else 19)
  if star and n==40:
   page=doc[10];old='1. What is near the frog?';hits=page.search_for(old);assert len(hits)==1
   rect=hits[0];page.add_redact_annot(rect,fill=(1,1,1));page.apply_redactions();page.insert_text((rect.x0,rect.y1-2),'1. What animal is near the pond?',fontsize=10.5,fontname='helv',color=(.1,.25,.4))
  paths={p:render(doc[p-1],f'{lev}/{n}/page-{p:02}') for p in range(3,13 if star else 16)}
  atlas=Image.open(source/f'assets/{level}{n}.png');b=bounds[f'{level}{n}']
  def band(k):
   override=source/f"assets/{'colour' if k==1 else 'read'}_{level}{n}.png"
   if k in [1,2] and override.exists():return Image.open(override).convert('RGB')
   return atlas.crop((0,round((b[k]+.003)*atlas.height),atlas.width,round((b[k+1]-.003)*atlas.height))).convert('RGB')
  main=band(0);main_key=picture(main,f'{lev}/{n}/match');cover=picture(main,f'{lev}/{n}/cover',88)
  paint=band(1);paint_key=picture(paint,f'{lev}/{n}/colour',94);height=1000*paint.height/paint.width
  exam=dict(id=f'{lev}-{n}',number=str(n),title=item['main'].removeprefix('a ').removeprefix('an ').title(),level='Pre A1 Starters' if star else 'A1 Movers',levelKey=lev,difficulty='Hard',version='2026-11-18-ms40-v1',cover=cover,audio=[],reading=[],listening=[])
  seed=item.get('seed',n)
  if star:
   qs=[]
   for i,value in enumerate(item['tickkey'],1):
    word=item['vocab'][i] if value else item['vocab'][i+6]
    text=f'These are {word}.' if word=='grapes' else f'This is {word}.' if word in ['milk','water','juice','bread','ice cream'] else f"This is {'an' if word[0] in 'aeiou' else 'a'} {word}."
    qs.append(question(f'r1-{i}',text,'yes' if value else 'no',[dict(value='yes',label='✓'),dict(value='no',label='✗')]))
   append_part(exam,'reading',1,'Look, read and tick',qs,[paths[7]])
   append_part(exam,'reading',2,'Write yes or no',[question(f'r2-{i}',q,a,['yes','no']) for i,(q,a) in enumerate(zip(item['read_stat'],item['read_key']),1)],[paths[8]])
   append_part(exam,'reading',3,'Write the words',[question(f'r3-{i}',f'Picture {i}',w) for i,w in enumerate(item['spell'][1:6],1)],[paths[9]])
   append_part(exam,'reading',4,'Complete the text',[question(f'r4-{i}',f'Gap {i}',w,item['cloze'][4]) for i,w in enumerate(item['cloze'][3],1)],[paths[10]])
   qs=[question(f'r5-{i}',q,a) for i,(q,a) in enumerate(item['star_q5'],1)]
   if n==40:
    qs[0]['prompt']='What animal is near the pond?'
    qs[1]['accepted']=['pond','rock','stone']
   append_part(exam,'reading',5,'Answer the picture questions',qs,[paths[11],paths[12]])
  else:
   append_part(exam,'reading',1,'Choose the correct words',[question(f'r1-{i}',defs['DEFS'][w],w,item['vocab'][:8]) for i,w in enumerate(item['vocab'][1:6],1)],[paths[8]])
   qs=[]
   for i,row in enumerate(item['dialogue'][1],1):
    perm=list(range(3));random.Random(seed*17+i-1).shuffle(perm)
    qs.append(question(f'r2-{i}',row[0],chr(65+perm.index(0)),letter_options([row[j+1] for j in perm])))
   append_part(exam,'reading',2,'Complete the conversation',qs,[paths[9]])
   story=item['mr3'];titles=list(enumerate(story[4]));random.Random(seed).shuffle(titles)
   qs=[question(f'r3-{i}',f'Gap {i}',w,story[3]) for i,w in enumerate(story[2],1)]
   qs.append(question('r3-6','Choose the best title.',chr(65+next(i for i,(original,_) in enumerate(titles) if original==0)),letter_options([t for _,t in titles])))
   append_part(exam,'reading',3,'Complete the story',qs,[paths[10]])
   append_part(exam,'reading',4,'Choose the missing words',[question(f'r4-{i}',f'Gap {i}',w,item['fact'][3][i]) for i,w in enumerate(item['fact'][2][1:],1)],[paths[11]])
   append_part(exam,'reading',5,'Complete the sentences',[question(f'r5-{i}',stem+' ______.',answer) for i,(stem,answer) in enumerate(item['mstory'][4],1)],[paths[12],paths[13],paths[14]])
   context=picture(band(2),f'{lev}/{n}/writing',92)
   prompts=defs['RQ'][10+n-40]+['The place in the picture is a ______.','One person in the picture is ______.','Write one full sentence about the picture.','Write another full sentence about the picture.']
   append_part(exam,'reading',6,'Write about the picture',[dict(id=f'r6-{i}',prompt=q) for i,q in enumerate(prompts,1)],[paths[15]],manual=True,writingMax=6,writingImages=[context],instruction='Look at the picture. Answer the questions and write two sentences.')
  example=item.get('ex_role',0);order=[j for j in range(6) if j!=example];random.Random(seed*37+(0 if star else 7)).shuffle(order)
  key={item['names'][j]:f'p{j+1}' for j in order}
  append_part(exam,'listening',1,'Listen and draw lines',[question(f'l1-{i}',name,target) for i,(name,target) in enumerate(key.items(),1)],matchKey=key)
  append_part(exam,'listening',2,'Listen and write',[question(f'l2-{i}',label,a,accepted=([a,a.removeprefix('Mr ')] if a.startswith('Mr ') else None)) for i,(label,a) in enumerate(zip(item['l2'][3],item['l2'][4]),1)],[paths[3]])
  if not star:append_part(exam,'listening',3,'Listen and match pictures',[question(f'l3-{i}',name,chr(65+a),letter_options([f'Picture {chr(65+j)}' for j in range(8)])) for i,(name,a) in enumerate(zip(item['match_names'][1:],item['match_ans'][1:]),1)],[paths[4]])
  number=3 if star else 4
  append_part(exam,'listening',number,'Choose the correct picture',[question(f'l{number}-{i}',row[0],chr(65+row[2]),letter_options(['Picture A','Picture B','Picture C'])) for i,row in enumerate(item['mcq'][1:],1)],[paths[4],paths[5]] if star else [paths[5],paths[6]])
  config=mapping[level][str(n)];centres=config if star else config['centres'];regions=[]
  radii={'balls':(2.2,7),'books':(3.5,4),'bags':(3.5,10),'hats':(4,7),'shoes':(3.5,5),'cups':(2.4,7),'kites':(3.4,12),'boxes':(4,10),'shirts':(4,11),'bottles':(1.4,9)}
  rx,ry=radii[item['colour_item']]
  for j,(x,y) in enumerate(centres):
   cx=x*10;cy=y*height/100;a=rx*10;c=ry*height/100
   d=f'M{cx-a} {cy}a{a} {c} 0 1 0 {2*a} 0a{a} {c} 0 1 0 {-2*a} 0Z'
   regions.append(dict(id=f'area-{j+1}',path=d,cx=cx,cy=cy))
  ex_id=mapping['positions'].index(item['positions'][0]);paint_example=dict(path=regions[ex_id]['path'],color=item['colours'][0])
  qs=[];part_number=4 if star else 5
  for i in range(1,6 if star else 5):
   target=f"area-{mapping['positions'].index(item['positions'][i])+1}"
   qs.append(question(f'l{part_number}-{i}',f'Question {i}',dict(target=target,color=item['colours'][i])))
  regions.pop(ex_id)
  if not star:
   x0,y0,x1,y1=config['sign'];x0*=10;x1*=10;y0*=height/100;y1*=height/100
   regions.append(dict(id='sign',path=f'M{x0} {y0}H{x1}V{y1}H{x0}Z',cx=(x0+x1)/2,cy=(y0+y1)/2))
   qs.append(question('l5-5','Question 5',dict(target='sign',word='OPEN')))
  append_part(exam,'listening',part_number,'Listen and colour' if star else 'Listen, colour and write',qs,painting=True)
  exam['readingCount']=25 if star else 29;exam['listeningCount']=20 if star else 25
  assert sum(len(p['questions']) for p in exam['reading'] if not p.get('manual'))==exam['readingCount']
  add_audio(exam,root/f'Audio/Listening/Test_{n}',f'Test_{n}_Part_{{part}}.mp3')
  pub=sanitize(exam);p=pub['listening'][0];p.pop('matchKey');p['questions']=[]
  printed=[s.strip() for s in doc[1].get_text().split('Example:')[0].splitlines() if s.strip() in item['names']];assert len(printed)==7
  p['interaction']=dict(type='match',image=main_key,imageHeight=1000*main.height/main.width,names=[dict(id=s,label=s) for s in printed],targets=[dict(id=f'p{j+1}',x=x,y=y,rx=10,ry=21) for j,(x,y) in enumerate([(15,28),(49,28),(83,28),(15,77),(49,77),(83,77)])],example=dict(name=item['names'][example],target=f'p{example+1}'))
  pub['listening'][-1]['questions']=[];pub['listening'][-1]['interaction']=dict(type='paint',image=paint_key,width=1000,height=height,regions=regions,example=paint_example,paintCount=5 if star else 4,writeCount=0 if star else 1)
  papers.append(exam);public.append(pub);print('Prepared',exam['id'],flush=True)

ket=args.ket
if (ket/'WeWIN_KET').exists():ket=ket/'WeWIN_KET'
data=json.loads((ket/'Editable_Question_Data.json').read_text(encoding='utf-8-sig'));assert len(data)==10
for t in data:
 n=t['test'];num=f'{n:02}';doc=fitz.open(ket/f'WeWIN_KET_Mock_{num}.pdf');assert len(doc)==19
 paths={i:render(doc[i-1],f'ket/{num}/page-{i:02}') for i in range(2,19) if i not in [9,10]}
 paths[9]=render(doc[8],f'ket/{num}/email',(35,166,560,288));paths[10]=render(doc[9],f'ket/{num}/story',(35,187,560,485))
 cover=render(doc[9],f'ket/{num}/cover',(45,197,208,269))
 exam=dict(id=f'ket-20261118-{num}',number=num,title=f'Mock {num} · Bản 18/11',level='A2 Key (KET)',levelKey='ket',edition='2026-11-18',version='2026-11-18-ket-v1',cover=cover,readingCount=30,listeningCount=25,writingAssessment='teacher',audio=[],reading=[],listening=[],speakingImages=[paths[18]],studentPdf=f'{tag}/ket/pdf/WeWIN_KET_Mock_{num}.pdf')
 key={label:answer for label,answer,*_ in t['answer_key']}
 def kq(skill,part,i,prompt,options,absolute):
  answer=key[f'{skill.title()} {part} | {absolute}'];variants=re.split(r'\s*/\s*',answer)
  return question(f'{skill[0]}{part}-{i}',prompt,variants[0],options,variants,absolute)
 append_part(exam,'reading',1,'Read notices and messages',[kq('reading',1,i,q['q'],letter_options(q['choices']),i) for i,q in enumerate(t['reading1'],1)],[paths[2],paths[3]])
 append_part(exam,'reading',2,'Match the people',[kq('reading',2,i,q,letter_options([r[1] for r in t['reading2']['profiles']]),i+6) for i,(q,_) in enumerate(t['reading2']['questions'],1)],[paths[4]])
 append_part(exam,'reading',3,'Read an article',[kq('reading',3,i,q['q'],letter_options(q['choices']),i+13) for i,q in enumerate(t['reading3']['questions'],1)],[paths[5],paths[6]])
 append_part(exam,'reading',4,'Choose the missing words',[kq('reading',4,i,f'Gap {i+18}',letter_options(q['choices']),i+18) for i,q in enumerate(t['reading4_options'],1)],[paths[7]])
 append_part(exam,'reading',5,'Complete the message',[kq('reading',5,i,f'Gap {i+24}',None,i+24) for i in range(1,7)],[paths[8]])
 models=dict(t['writing_models'])
 for part,number,minimum,title in [(6,31,25,'Write an email'),(7,32,35,'Write a story')]:append_part(exam,'reading',part,title,[dict(id=f'r{part}-1',number=number,prompt='Write your email here.' if part==6 else 'Write your story here.',sample=models[f'Writing {number}'])],[paths[part+3]],manual=True,minWords=minimum)
 append_part(exam,'listening',1,'Choose the correct picture',[kq('listening',1,i,q['question'],letter_options(['Picture A','Picture B','Picture C']),i) for i,q in enumerate(t['listening1'],1)],[paths[11],paths[12]])
 append_part(exam,'listening',2,'Complete the notes',[kq('listening',2,i,f'Gap {i+5}',None,i+5) for i in range(1,6)],[paths[13]])
 for part,page_numbers in [(3,[14]),(4,[15,16])]:append_part(exam,'listening',part,'Listen and choose',[kq('listening',part,i,q['q'],letter_options(q['choices']),i+(part-1)*5) for i,q in enumerate(t[f'listening{part}_questions'],1)],[paths[p] for p in page_numbers])
 lines=doc[16].get_text().splitlines();options=[s[2:] for s in lines if re.match(r'^[A-H] ',s)];assert len(options)==8
 people=[re.sub(r'^\d+\s*|\s*\[\s*\]','',s) for s in lines if re.match(r'^2[1-5] ',s)];assert len(people)==5
 append_part(exam,'listening',5,'Listen and match',[kq('listening',5,i,name,letter_options(options),i+20) for i,name in enumerate(people,1)],[paths[17]])
 add_audio(exam,ket/f'Audio/Listening/Mock_{num}',f'Mock_{num}_Part_{{part}}.mp3')
 dest=assets/exam['studentPdf'];dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(ket/f'WeWIN_KET_Mock_{num}.pdf',dest)
 papers.append(exam);public.append(sanitize(exam));print('Prepared',exam['id'],flush=True)

def encode_image(job):
 image,key,rel,width,height,quality=job;dest=assets/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 image.resize((width,height),Image.Resampling.LANCZOS).save(dest,'WEBP',quality=quality,method=5)
 return key,dict(file=rel,width=width,height=height,bytes=dest.stat().st_size)
with ThreadPoolExecutor(max_workers=6) as pool:
 for key,variant in pool.map(encode_image,image_jobs):new_images[key]['variants'].append(variant)
for item in new_images.values():item['variants'].sort(key=lambda v:v['width'])
def encode_audio(job):
 source,rel,digest=job;dest=assets/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',str(source),'-map','0:a:0','-vn','-map_metadata','-1','-ac','1','-ar','24000','-codec:a','libmp3lame','-b:a','96k','-threads','1',str(dest)],check=True,capture_output=True)
 def duration(p):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(p)],text=True))
 a=duration(source);b=duration(dest);assert abs(a-b)<.12,(rel,a,b)
 subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(dest),'-f','null','-'],check=True,capture_output=True)
 return dict(file=rel,sourceSHA256=digest,sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),sourceBytes=source.stat().st_size,bytes=dest.stat().st_size,duration=b,status='PASS')
with ThreadPoolExecutor(max_workers=2) as pool:audios=list(pool.map(encode_audio,audio_jobs))
ids={e['id'] for e in papers};assert len(ids)==30
for filename,added in [('exams-private.json',papers),('exams-public.json',public)]:
 path=site/'generated'/filename;old=json.loads(path.read_text(encoding='utf-8'));preserved=[e for e in old if e['id'] not in ids];assert len(preserved)==80
 path.write_text(json.dumps(preserved+added,ensure_ascii=False),encoding='utf-8')
(site/'packs20261118.mjs').write_text('export const packs20261118 = '+json.dumps(papers,ensure_ascii=False)+';\n',encoding='utf-8')
raw=(site/'public-data.mjs').read_text(encoding='utf-8');art=json.JSONDecoder().raw_decode(raw.split('export const artwork = ',1)[1])[0]
all_public=json.loads((site/'generated/exams-public.json').read_text(encoding='utf-8'))
(site/'public-data.mjs').write_text('export const allExams = '+json.dumps(all_public,ensure_ascii=False)+';\nexport const artwork = '+json.dumps(art,ensure_ascii=False)+';\n'+''.join(f"export const {name}=allExams.filter(e=>e.levelKey==='{level}');" for name,level in [('exams','starters'),('movers','movers'),('flyers','flyers'),('ket','ket')])+'\n',encoding='utf-8')
old_files={v['file'] for k,item in media['images'].items() if k.startswith(tag+'/') for v in item['variants']}
media['images']={k:v for k,v in media['images'].items() if not k.startswith(tag+'/')};media['images'].update(new_images)
media['files']=sorted(set(media['files'])-old_files|{v['file'] for item in new_images.values() for v in item['variants']})
media_path.write_text('export default '+json.dumps(media,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
private_folder=site/'server/materials/ket20261118';private_folder.mkdir(parents=True,exist_ok=True)
for name in ['Editable_Question_Data.json','ANSWER_KEYS.txt','LISTENING_SCRIPTS.txt','WeWIN_KET_Answer_Keys_and_Writing_Models.pdf']:
 shutil.copy2(ket/name,private_folder/name)
report=dict(tests=30,starters=10,movers=10,ketNewEdition=10,previousTestsPreserved=80,audioParts=len(audios),audioFiles=audios,images=len(new_images),webpVariants=sum(len(i['variants']) for i in new_images.values()),editorialCorrections=[dict(exam='starters-40',question='r5-1',prompt='What animal is near the pond?',answer='frog')])
(site/'generated/packs20261118-report.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='audioFiles'}),flush=True)
