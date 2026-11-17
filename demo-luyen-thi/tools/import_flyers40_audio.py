"""Import the 50 reviewed Listening Parts; keep originals and redundant full mixes outside the web build."""
import argparse,hashlib,json,subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

parser=argparse.ArgumentParser()
parser.add_argument('pack',type=Path)
parser.add_argument('--review',type=Path,required=True)
args=parser.parse_args()
pack=args.pack.resolve();site=Path(__file__).resolve().parents[1]
review=json.loads(args.review.read_text(encoding='utf-8'))
assert review['readyForListeningPublication'] is True,'Listening content review must be completed before import.'
verified={row['file']:row for row in review['listeningFiles']}
assert len(verified)==50
jobs=[]
for n in range(40,50):
 for part in range(1,6):
  rel=f'Audio/Listening/Test_{n}/Test_{n}_Part_{part}.mp3'
  source=pack/rel;assert source.is_file(),rel
  digest=hashlib.sha256(source.read_bytes()).hexdigest()
  assert verified[rel]['sha256']==digest,'Recording changed after review: '+rel
  jobs.append((n,part,source,f'flyers40/{n}/listening-{part}.mp3',digest))

def import_part(job):
 n,part,source,rel,digest=job
 dest=site/'assets'/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 subprocess.run(['ffmpeg','-nostdin','-v','error','-y','-i',str(source),'-map','0:a:0','-vn','-map_metadata','-1','-ac','1','-ar','24000','-codec:a','libmp3lame','-b:a','96k','-threads','1',str(dest)],check=True,capture_output=True)
 def duration(path):return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(path)],text=True))
 original=duration(source);published=duration(dest)
 assert abs(original-published)<.12,(rel,original,published)
 subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(dest),'-f','null','-'],check=True,capture_output=True)
 return dict(test=n,part=part,file=rel,sourceSHA256=digest,sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),sourceBytes=source.stat().st_size,bytes=dest.stat().st_size,duration=published,status='PASS')

with ThreadPoolExecutor(max_workers=2) as pool:audio=list(pool.map(import_part,jobs))
audio_version='20261117-flyers40-'+hashlib.sha256(''.join(row['sourceSHA256'] for row in audio).encode()).hexdigest()[:12]
def update(exams):
 count=0
 for e in exams:
  if e['id'] in {f'flyers-{n}' for n in range(40,50)}:
   e['audio']=[f"flyers40/{e['number']}/listening-{p}.mp3" for p in range(1,6)]
   e['audioPending']=False;e['audioVersion']=audio_version;count+=1
 assert count==10
 return exams
for filename in ['exams-private.json','exams-public.json']:
 path=site/'generated'/filename
 path.write_text(json.dumps(update(json.loads(path.read_text(encoding='utf-8'))),ensure_ascii=False),encoding='utf-8')
private=json.loads((site/'generated/exams-private.json').read_text(encoding='utf-8'))
(site/'flyers40.mjs').write_text('export const flyers40 = '+json.dumps([e for e in private if e['id'] in {f'flyers-{n}' for n in range(40,50)}],ensure_ascii=False)+';\n',encoding='utf-8')
module=site/'public-data.mjs';raw=module.read_text(encoding='utf-8');prefix='export const allExams = '
_,end=json.JSONDecoder().raw_decode(raw[len(prefix):])
public=json.loads((site/'generated/exams-public.json').read_text(encoding='utf-8'))
module.write_text(prefix+json.dumps(public,ensure_ascii=False)+raw[len(prefix)+end:],encoding='utf-8')
report=dict(tests=10,partAudioFiles=50,audioVersion=audio_version,fullMixesPublished=0,speakingFilesPublished=0,sourceBytes=sum(a['sourceBytes'] for a in audio),publishedBytes=sum(a['bytes'] for a in audio),files=audio)
(site/'generated/flyers40-audio.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
content_report=site/'tools/flyers40-import-report.json'
if content_report.exists():
 info=json.loads(content_report.read_text(encoding='utf-8'));info.update(audioFiles=50,audioPending=False,audioVersion=audio_version)
 content_report.write_text(json.dumps(info,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='files'}))
