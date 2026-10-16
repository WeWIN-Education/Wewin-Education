from pathlib import Path
import re,json,fitz,shutil,hashlib,subprocess,sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT=Path(__file__).resolve().parents[2];SITE=ROOT/'demo-luyen-thi'
AUDIO=Path(r'C:\Users\wewin2026\Downloads\drive-download-20261016T081757Z-1-001')
d=fitz.open(ROOT/'WeWIN_Flyers_10_Tests_06_15.pdf');keys=fitz.open(ROOT/'WeWIN_Flyers_10_Tests_Keys.pdf');out=[];report=[]
def vals(t):return [v.strip().rstrip('.') for v in re.split(r'(?:^|;\s*)\d+\.\s*',t) if v.strip()]
def qlist(prefix,answers,choices=None):
 return [{'id':f'{prefix}-{i+1}','prompt':f'Câu {i+1}','answer':v.split(' / ')[0],'accepted':v.split(' / '),'choices':choices or []} for i,v in enumerate(answers)]
for idx,n in enumerate(range(6,16)):
 pages=[d[idx*18+i] for i in range(18)];first=' '.join(keys[3+idx*5].get_text().split());second=' '.join(keys[4+idx*5].get_text().split())
 title=keys[3+idx*5].get_text().splitlines()[1];dest=SITE/'assets/flyers'/f'{n:02}';dest.mkdir(parents=True,exist_ok=True);images={}
 for i in range(1,15):
  # Original page content, with enough bottom margin to include every answer choice.
  content=[b for b in pages[i].get_text('blocks') if b[1]>80 and b[1]<805]
  assert all(b[3]<=805 and b[0]>=25 and b[2]<=570 for b in content),(n,i+1)
  file=f'flyers/{n:02}/page-{i+1:02}.jpg';pages[i].get_pixmap(matrix=fitz.Matrix(1.8,1.8),clip=fitz.Rect(25,85,570,805),alpha=False).save(SITE/'assets'/file,jpg_quality=88);images[i+1]=file
 pages[0].get_pixmap(matrix=fitz.Matrix(1.2,1.2),clip=fitz.Rect(40,234.14,555,577.64),alpha=False).save(dest/'cover.jpg',jpg_quality=88)
 lp={int(p):v.strip() for p,v in re.findall(r'Listening Part (\d) (.*?)(?=Listening Part \d |Reading & Writing|$)',first)}
 rp={int(p):v.strip() for p,v in re.findall(r'(?:Reading & Writing )?Part (\d) (.*?)(?=Part \d |$)',first.split('Reading & Writing ')[1])}
 descriptions=vals(lp[1]);match=[];options=[]
 for i,v in enumerate(descriptions):
  name,desc=v.split(':',1);options.append({'value':str(i+1),'label':desc.strip()});match.append({'id':f'l1-{i+1}','prompt':name.strip(),'answer':str(i+1),'choices':[]})
 for q in match:q['choices']=options
 l=[{'title':'Listen & match','images':[images[2]],'questions':match}]
 for p,t,ch,im in [(2,'Listen & write',None,[3]),(3,'Listen & match pictures',list('ABCDEFGH'),[4]),(4,'Listen & choose',list('ABC'),[5,6])]:l.append({'title':t,'images':[images[i] for i in im],'questions':qlist(f'l{p}',vals(lp[p]),ch)})
 colors=vals(lp[5]);targets=[v.rsplit(':',1)[0].strip() for v in colors[:3]];cq=[]
 for i,v in enumerate(colors):
  target,value=v.rsplit(':',1);target=target.strip();value=value.strip()
  cq.append({'id':f'l5-{i+1}','prompt':f'Câu {i+1} · '+('Chọn đồ vật và màu' if i<3 else 'Từ viết trên '+target),'answer':target+'|'+value if i<3 else value,'choices':[],**({'colour':True,'targets':targets} if i<3 else {})})
 l.append({'title':'Listen, colour & write','images':[images[7]],'questions':cq})
 r=[]
 for p,titlepart,im,ch in [(1,'Choose the words',[8],None),(2,'Read the conversation',[9],list('ABCDEFGH')),(3,'Complete the story',[10],None),(4,'Choose the right words',[11],None)]:
  qs=qlist(f'r{p}',vals(rp[p]),ch)
  if p==3:
   titles=re.findall(r'^([ABC])\s+(.+)$',pages[9].get_text(),re.M);assert len(titles)==3
   qs[-1]['choices']=[{'value':a,'label':a+' · '+b.strip()} for a,b in titles];qs[-1]['prompt']='Câu 6 · Tên câu chuyện'
  if p==4:
   table=pages[10].get_text().split('Example\n',1)[1]
   rows=re.findall(r'(?:^|\n)(\d+)\n([^\n]+)\n([^\n]+)\n([^\n]+)',table);assert len(rows)==10,(n,rows)
   for q,(_,a,b,c) in zip(qs,rows):q['choices']=[a,b,c];assert q['answer'] in q['choices']
  r.append({'title':titlepart,'images':[images[i] for i in im],'questions':qs})
 a5=re.findall(r'\d+\. (.*?) — ',second.split('Part 5 · Complete the sentences ')[1].split('Part 6 ·')[0]);assert len(a5)==7
 r.append({'title':'Complete the story sentences','images':[images[12],images[13]],'questions':qlist('r5',a5)})
 a6=vals(second.split('Part 6 · One-word answers ')[1].split('Part 7 ·')[0]);assert len(a6)==5
 r.append({'title':'Complete the message','images':[images[14]],'questions':qlist('r6',a6)})
 sample=second.split('Part 7 · One possible story ')[1].split('Chấp nhận')[0].strip()
 r.append({'title':'Write a story','images':[images[15]],'manual':True,'questions':[{'id':'r7-1','prompt':'Viết câu chuyện ít nhất 20 từ','sample':sample}]})
 assert sum(len(p['questions']) for p in r if not p.get('manual'))==43;assert sum(len(p['questions']) for p in l)==25
 audio=[]
 for p in range(1,6):
  src=AUDIO/f'WeWIN_Flyers_Mock_{n:02}_Part_{p}.mp3';rel=f'flyers/{n:02}/listening-{p}.mp3';dst=SITE/'assets'/rel
  duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(src)],text=True));assert duration>30
  shutil.copy2(src,dst);sha=hashlib.sha256(src.read_bytes()).hexdigest();assert hashlib.sha256(dst.read_bytes()).hexdigest()==sha
  audio.append(rel);report.append({'test':f'flyers-{n:02}','part':p,'path':rel,'duration':duration,'bytes':dst.stat().st_size,'sha256':sha})
 out.append({'id':f'flyers-{n:02}','number':f'{n:02}','title':title,'level':'A2 Flyers','cover':f'flyers/{n:02}/cover.jpg','audio':audio,'audioVersion':'20261016-flyers-parts','reading':r,'listening':l});print('Prepared',n,flush=True)
(SITE/'flyers.mjs').write_text('export const flyers = '+json.dumps(out,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(ROOT/'_deploy/flyers-audio-20261016.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
