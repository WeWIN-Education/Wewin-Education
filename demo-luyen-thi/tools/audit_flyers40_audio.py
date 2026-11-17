"""Local speech recognition and technical checks; never treat ASR differences as confirmed errors."""
import argparse,csv,difflib,hashlib,json,os,re,subprocess,time,unicodedata
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import numpy as np

parser=argparse.ArgumentParser()
parser.add_argument('pack',type=Path)
parser.add_argument('--asr',action='store_true')
parser.add_argument('--speaking',action='store_true')
parser.add_argument('--model',default='base.en')
args=parser.parse_args()
pack=args.pack.resolve();site=Path(__file__).resolve().parents[1]
out=site/'tmp/flyers40-audio-audit';out.mkdir(parents=True,exist_ok=True)
studio=json.loads((pack/'Speaking_Studio/studio_data.json').read_text(encoding='utf-8'))

def decode(path):
 run=subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(path),'-map','0:a:0','-ar','16000','-ac','1','-f','f32le','pipe:1'],capture_output=True,check=True)
 return np.frombuffer(run.stdout,dtype=np.float32)

def number(n):
 small='zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split()
 if n<20:return small[n]
 if n<100:return ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'][n//10]+(' '+small[n%10] if n%10 else '')
 return str(n)

def normalize(text):
 text=unicodedata.normalize('NFKD',text.lower()).replace('’',"'")
 text=re.sub(r'\b\d{1,2}\b',lambda m:number(int(m[0])),text)
 text=re.sub(r"[^a-z0-9\s]",'',text)
 for a,b in [('colour','color'),('grey','gray'),('tyre','tire'),('katie','katy'),('windsock','wind sock')]:text=re.sub(r'\b'+a+r'\b',b,text)
 return text.split()

def compare(reference,observed):
 expected=normalize(reference);actual=normalize(observed)
 matcher=difflib.SequenceMatcher(None,expected,actual,autojunk=False)
 diffs=[];errors=0
 for tag,i,j,a,b in matcher.get_opcodes():
  if tag=='equal':continue
  errors+=max(j-i,b-a)
  diffs.append(dict(type=tag,expected=' '.join(expected[i:j]),heard=' '.join(actual[a:b]),context=' '.join(expected[max(0,i-5):min(len(expected),j+5)])))
 return dict(referenceWords=len(expected),recognizedWords=len(actual),differenceRate=round(errors/max(len(expected),1),4),differences=diffs)

def speaking_reference(n,part):
 p=studio['speaking'][str(n)][f'part{part}']
 if part==1:return ' '.join([p['intro_text']]+[text for item in p['items'] for text in [item['examiner_text'],item['candidate_text']]])
 if part==2:return ' '.join([p['intro_a_text']]+[text for item in p['eva_items'] for text in [item['question_text'],item['answer_text']]]+[p['intro_b_text']]+[text for item in p['hugo_items'] for text in [item['question_text'],item['answer_text']]])
 if part==3:return p['opening_text']+' '+p['candidate_full_text']
 return ' '.join([p['intro_text']]+[text for item in p['items'] for text in [item['question_text'],item['answer_text']]])

jobs=[]
for n in range(40,50):
 for part in range(1,6):
  filename=f'Audio/Listening/Test_{n}/Test_{n}_Part_{part}.mp3'
  ref=(pack/f'TTS_Scripts/Test_{n}_Part_{part}_TTS.txt').read_text(encoding='utf-8')
  jobs.append(dict(test=n,part=part,kind='Listening',file=filename,reference=ref))
 if args.speaking:
  for part in range(1,5):
   filename=f'Audio/Speaking/Test_{n}/Test_{n}_Speaking_Part_{part}.mp3'
   jobs.append(dict(test=n,part=part,kind='Speaking',file=filename,reference=speaking_reference(n,part)))

if args.asr:
 from faster_whisper import WhisperModel,BatchedInferencePipeline
 started=time.monotonic()
 model=BatchedInferencePipeline(WhisperModel(args.model,device='cpu',compute_type='int8',cpu_threads=4,download_root=str(site/'tmp/asr-models')))
 for index,job in enumerate(jobs,1):
  cache=out/f"{job['kind']}-{job['test']}-{job['part']}-{args.model}.json"
  digest=hashlib.sha256((pack/job['file']).read_bytes()).hexdigest()
  if cache.exists() and json.loads(cache.read_text())['sha256']==digest:
   print(f"Cached {index}/{len(jobs)} {job['kind']} {job['test']}/{job['part']}",flush=True);continue
  begin=time.monotonic();audio=decode(pack/job['file'])
  segments,info=model.transcribe(audio,language='en',beam_size=1,batch_size=8,vad_filter=True,condition_on_previous_text=False)
  transcript=[dict(start=round(s.start,2),end=round(s.end,2),text=s.text.strip(),confidence=round(s.avg_logprob,3)) for s in segments]
  text=' '.join(s['text'] for s in transcript)
  result={**job,'model':args.model,'sha256':digest,'duration':round(len(audio)/16000,3),'seconds':round(time.monotonic()-begin,2),'segments':transcript,**compare(job['reference'],text)}
  cache.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
  print(f"ASR {index}/{len(jobs)} {job['kind']} {job['test']}/{job['part']}: {result['seconds']}s, difference {result['differenceRate']:.1%}",flush=True)
 print('ASR COMPLETE',round(time.monotonic()-started,1),flush=True)
else:
 files=[pack/job['file'] for job in jobs]
 for n in range(40,50):
  files.append(pack/f'Audio/Listening/Test_{n}/Test_{n}_Full_Listening.mp3')
  if args.speaking:files.append(pack/f'Audio/Speaking/Test_{n}/Test_{n}_Full_Speaking.mp3')
 def check(path):
  metadata=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(path)],text=True))
  audio=decode(path);absolute=np.abs(audio)
  return dict(file=path.relative_to(pack).as_posix(),bytes=path.stat().st_size,sha256=hashlib.sha256(path.read_bytes()).hexdigest(),duration=round(len(audio)/16000,3),sampleRate=metadata['streams'][0]['sample_rate'],channels=metadata['streams'][0]['channels'],peak=round(float(absolute.max()),5),rms=round(float(np.sqrt(np.mean(audio**2))),5),clippedSamples=int(np.count_nonzero(absolute>=.999)),decode='PASS')
 with ThreadPoolExecutor(max_workers=2) as pool:rows=list(pool.map(check,files))
 duplicates={}
 for row in rows:duplicates.setdefault(row['sha256'],[]).append(row['file'])
 report=dict(finalFiles=len(rows),allDecodable=True,duplicates=[files for files in duplicates.values() if len(files)>1],files=rows)
 (out/'technical.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
 print(json.dumps({k:v for k,v in report.items() if k!='files'}),flush=True)
