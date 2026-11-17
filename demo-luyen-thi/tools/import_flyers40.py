"""Import Flyers 40–49 locally from authoritative data; audio is supplied separately."""
import argparse,ast,copy,hashlib,io,json,re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import fitz
from PIL import Image

parser=argparse.ArgumentParser()
parser.add_argument('pack',type=Path)
args=parser.parse_args()
pack=args.pack.resolve();site=Path(__file__).resolve().parents[1]
source=pack/'Editable_Source';assets=site/'assets'
data=json.loads((source/'data.json').read_text(encoding='utf-8'))
assert [e['n'] for e in data]==list(range(40,50))
prior_audio={}
prior_report=site/'tools/flyers40-import-report.json'
if prior_report.exists() and json.loads(prior_report.read_text())['sourceSHA256']==hashlib.sha256((source/'data.json').read_bytes()).hexdigest():
 prior_audio={e['id']:e for e in json.loads((site/'generated/exams-private.json').read_text(encoding='utf-8')) if e.get('audioVersion') and len(e.get('audio',[]))==5 and all((site/'assets'/p).is_file() for p in e['audio'])}
bounds=json.loads((source/'bounds.json').read_text())
picture_map=json.loads((site/'tools/flyers40-picture-map.json').read_text())
teacher={}
for node in ast.parse((source/'teacher_data.py').read_text(encoding='utf-8')).body:
 if isinstance(node,ast.Assign):
  for target in node.targets:
   if isinstance(target,ast.Name) and target.id in ('WRITING_MODELS','R6_ACCEPT'):teacher[target.id]=ast.literal_eval(node.value)
assert len(teacher['WRITING_MODELS'])==len(teacher['R6_ACCEPT'])==10
media_file=site/'media-manifest.mjs'
media=json.loads(media_file.read_text(encoding='utf-8').removeprefix('export default ').rstrip(';\n'))
images={};jobs=[]

def picture(image,name,quality=90,cap=1440):
 image=image.convert('RGB');logical=f'flyers40/{name}.webp'
 images[logical]=dict(width=image.width,height=image.height,variants=[])
 widths=sorted(set([min(480,image.width),min(cap,image.width)]))
 for width in widths:
  relative=f'optimized/flyers40/{name}-{width}.webp'
  height=round(image.height*width/image.width)
  jobs.append((image.copy(),relative,width,height,quality,logical))
 return logical

def encode(job):
 image,relative,width,height,quality,logical=job
 dest=assets/relative;dest.parent.mkdir(parents=True,exist_ok=True)
 image.resize((width,height),Image.Resampling.LANCZOS).save(dest,'WEBP',quality=quality,method=5)
 return logical,dict(file=relative,width=width,height=height,bytes=dest.stat().st_size)

def atlas_band(e,index):
 image=Image.open(source/f"assets/atlas{e['n']}.png")
 b=bounds[str(e['n'])]
 return image.crop((0,round((b[index]+.002)*image.height),image.width,round((b[index+1]-.002)*image.height)))

def question(identifier,prompt,answer,choices=None,accepted=None):
 result=dict(id=identifier,prompt=prompt,answer=answer)
 if choices:result['choices']=choices
 if accepted:result['accepted']=accepted
 return result

def choices(values):return [dict(value=chr(65+i),label=f'{chr(65+i)} · {label}') for i,label in enumerate(values)]

papers=[];public=[]
for index,e in enumerate(data):
 n=e['n'];doc=fitz.open(pack/f'Tests/Flyers_Hard_Test_{n}.pdf');assert len(doc)==18
 pages={}
 for page_index in range(2,14):
  page=doc[page_index]
  pix=page.get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(34,83,562,789),alpha=False)
  pages[page_index+1]=picture(Image.open(io.BytesIO(pix.tobytes('png'))),f'{n}/page-{page_index+1:02}',92)
 main=Image.open(source/f'assets/main{n}.png')
 main_path=picture(main,f'{n}/match',90)
 cover=picture(main.copy(),f'{n}/cover',88,720)
 story_path=picture(atlas_band(e,1),f'{n}/writing',92)
 colour_file=source/f'assets/colour{n}.png'
 colour=Image.open(colour_file) if colour_file.exists() else atlas_band(e,0)
 colour_path=picture(colour,f'{n}/colour',94)
 height=round(1000*colour.height/colour.width,3)
 mapping=picture_map[str(n)]
 assert len(mapping['people'])==8 and len(mapping['areas'])==5
 exam=dict(id=f'flyers-{n}',number=str(n),title=e['theme'].title(),level='A2 Flyers',levelKey='flyers',difficulty='Hard',version='2026-11-17-flyers40-v1',cover=cover,readingCount=43,listeningCount=25,audio=[],audioPending=True,reading=[],listening=[])
 if exam['id'] in prior_audio:
  previous=prior_audio[exam['id']];exam.update(audio=previous['audio'],audioVersion=previous['audioVersion'],audioPending=False)
 def part(skill,num,title,questions,page_numbers=(),**extra):
  result=dict(id=f'{skill[0]}{num}',title=title,questions=questions,**extra)
  if page_numbers:result['images']=[pages[i] for i in page_numbers]
  exam[skill].append(result);return result
 r=e['r1'];part('reading',1,'Choose the correct words',[question(f'r1-{i}',desc,answer,r['bank']) for i,(answer,desc) in enumerate(r['questions'],1)],[8])
 r=e['r2'];part('reading',2,'Complete the conversation',[question(f'r2-{i}',prompt,answer,[dict(value=op[0],label=op) for op in r[3]]) for i,(prompt,answer) in enumerate(zip(r[2],r[4]),1)],[9])
 r=e['r3'];qs=[question(f'r3-{i}',f'Gap {i}',answer,r[3]) for i,answer in enumerate(r[4],1)]
 qs.append(question('r3-6','Choose the best title for the story.',chr(65+r[6]),choices(r[5])))
 part('reading',3,'Read and complete the story',qs,[10])
 r=e['r4'];part('reading',4,'Choose the missing words',[question(f'r4-{i}',f'Gap {i}',opts[key],opts) for i,(opts,key) in enumerate(zip(r[2],r[3]),1)],[11])
 r=e['r5'];part('reading',5,'Complete the sentences',[question(f'r5-{i}',stem+' ______.',answer) for i,(stem,answer) in enumerate(r[3],1)],[12,13])
 r=e['r6'];qs=[]
 for i,(answer,variants) in enumerate(zip(r[2],teacher['R6_ACCEPT'][index]),1):
  accepted=[a.strip() for a in variants.split('/')];assert answer in accepted
  qs.append(question(f'r6-{i}',f'Gap {i}',answer,accepted=accepted))
 part('reading',6,'Write one word',qs,[14])
 part('reading',7,'Write a story',[dict(id='r7-1',prompt='Write your story here.',sample=teacher['WRITING_MODELS'][index])],manual=True,minWords=20,writingMax=5,storyImages=[story_path],writingImages=[story_path],instruction='Look at the three pictures. Write a story using 20 or more words.')
 positioned=sorted(enumerate(mapping['people']),key=lambda item:(item[1][1],item[1][0]))
 target_ids={source_index:f'p{i+1}' for i,(source_index,_) in enumerate(positioned)}
 printed_names=[line.strip() for line in doc[1].get_text().split('Example:')[0].splitlines() if line.strip() in e['names']]
 assert len(printed_names)==7 and set(printed_names)==set(e['names'])
 links={name:target_ids[i] for i,name in enumerate(e['names'][:6])}
 part('listening',1,'Listen and draw lines',[question(f'l1-{i}',name,links[name]) for i,name in enumerate(e['names'][1:6],1)],matchKey={name:links[name] for name in e['names'][1:6]})
 r=e['l2'];part('listening',2,'Listen and write',[question(f'l2-{i}',prompt,answer,accepted=([answer,'quarter to seven','a quarter to seven','6.45'] if answer=='6:45' else None)) for i,(prompt,answer) in enumerate(zip(r[3],r[4]),1)],[3])
 r=e['l3'];part('listening',3,'Listen and match',[question(f'l3-{i}',label,chr(65+key),choices([f'Picture {chr(65+k)}' for k in range(8)])) for i,(label,key) in enumerate(zip(r[1][1:],r[3][1:]),1)],[4],context=r[0])
 part('listening',4,'Choose the correct picture',[question(f'l4-{i}',q[0],chr(65+q[2]),choices(['Picture A','Picture B','Picture C'])) for i,q in enumerate(e['l4'][1:],1)],[5,6])
 regions=[];qs=[]
 for i,((action,target,answer),box) in enumerate(zip(e['l5'],mapping['areas']),1):
  x0,y0,x1,y1=box;x0*=10;x1*=10;y0*=height/100;y1*=height/100
  region=f'area-{i}'
  regions.append(dict(id=region,path=f'M{x0} {y0}H{x1}V{y1}H{x0}Z',cx=(x0+x1)/2,cy=(y0+y1)/2))
  qs.append(question(f'l5-{i}',f'Question {i}',dict(target=region,**({'color':answer.lower()} if action=='Colour' else {'word':answer}))))
 part('listening',5,'Listen, colour and write',qs,painting=True)
 assert sum(len(p['questions']) for p in exam['reading'] if not p.get('manual'))==43
 assert sum(len(p['questions']) for p in exam['listening'])==25
 pub=copy.deepcopy(exam)
 for p in pub['reading']+pub['listening']:
  for q in p['questions']:
   for key in ('answer','accepted','sample'):q.pop(key,None)
  p.pop('writingImages',None)
 pub['listening'][0]['questions']=[];pub['listening'][0].pop('matchKey')
 pub['listening'][0]['interaction']=dict(type='match',image=main_path,imageHeight=1000*main.height/main.width,names=[dict(id=name,label=name) for name in printed_names],targets=[dict(id=target_ids[source_index],x=x,y=y,rx=7,ry=12) for source_index,(x,y) in positioned],example=dict(name=e['names'][0],target=target_ids[0]))
 pub['listening'][4]['questions']=[]
 pub['listening'][4]['interaction']=dict(type='paint',image=colour_path,width=1000,height=height,regions=regions,paintCount=3,writeCount=2)
 papers.append(exam);public.append(pub)
 print(f'Prepared Flyers {n}: 43 Reading + 25 Listening; audio pending',flush=True)

with ThreadPoolExecutor(max_workers=8) as pool:
 for logical,variant in pool.map(encode,jobs):images[logical]['variants'].append(variant)
for image in images.values():image['variants'].sort(key=lambda v:v['width'])
old_files={v['file'] for key,value in media['images'].items() if key.startswith('flyers40/') for v in value['variants']}
media['images']={k:v for k,v in media['images'].items() if not k.startswith('flyers40/')};media['images'].update(images)
media['files']=sorted(set(media['files'])-old_files|{v['file'] for im in images.values() for v in im['variants']})
ids={e['id'] for e in papers}
for filename,added in [('exams-private.json',papers),('exams-public.json',public)]:
 path=site/'generated'/filename;old=json.loads(path.read_text(encoding='utf-8'))
 preserved=[e for e in old if e['id'] not in ids];assert len(preserved)==70
 path.write_text(json.dumps(preserved+added,ensure_ascii=False),encoding='utf-8')
old_module=(site/'public-data.mjs').read_text(encoding='utf-8');art=json.JSONDecoder().raw_decode(old_module.split('export const artwork = ',1)[1])[0]
all_public=json.loads((site/'generated/exams-public.json').read_text(encoding='utf-8'))
(site/'public-data.mjs').write_text('export const allExams = '+json.dumps(all_public,ensure_ascii=False)+';\nexport const artwork = '+json.dumps(art,ensure_ascii=False)+';\n'+''.join(f"export const {name}=allExams.filter(e=>e.levelKey==='{level}');" for name,level in [('exams','starters'),('movers','movers'),('flyers','flyers'),('ket','ket')])+'\n',encoding='utf-8')
(site/'flyers40.mjs').write_text('export const flyers40 = '+json.dumps(papers,ensure_ascii=False)+';\n',encoding='utf-8')
media_file.write_text('export default '+json.dumps(media,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
report=dict(tests=10,readingQuestions=430,listeningQuestions=250,writingTasks=10,audioFiles=sum(len(e['audio']) for e in papers),audioPending=any(e['audioPending'] for e in papers),sourceSHA256=hashlib.sha256((source/'data.json').read_bytes()).hexdigest(),webpFiles=sum(len(im['variants']) for im in images.values()),imageBytes=sum(v['bytes'] for im in images.values() for v in im['variants']),pictureCoordinates='Manually mapped from the original artwork; source pos placeholders are not used.')
(site/'tools/flyers40-import-report.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8');print(json.dumps(report),flush=True)
