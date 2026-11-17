"""Finalize the review only after the user's revised recording passes both repeat checks."""
import argparse,hashlib,json,re,subprocess
from pathlib import Path
import numpy as np

parser=argparse.ArgumentParser();parser.add_argument('pack',type=Path);args=parser.parse_args()
site=Path(__file__).resolve().parents[1];audit=site/'tmp/flyers40-audio-audit'
technical=json.loads((audit/'technical.json').read_text())
for row in technical['files']:
 source=args.pack/row['file'];digest=hashlib.sha256(source.read_bytes()).hexdigest()
 if digest!=row['sha256']:
  assert row['file'] in ['Audio/Listening/Test_49/Test_49_Part_3.mp3','Audio/Listening/Test_49/Test_49_Full_Listening.mp3']
  pcm=subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(source),'-ar','16000','-ac','1','-f','f32le','pipe:1'],check=True,capture_output=True).stdout
  audio=np.frombuffer(pcm,dtype=np.float32)
  row.update(sha256=digest,bytes=source.stat().st_size,duration=round(len(audio)/16000,3),peak=round(float(np.abs(audio).max()),5),clippedSamples=int(np.count_nonzero(np.abs(audio)>=.999)),decode='PASS')
(audit/'technical.json').write_text(json.dumps(technical,indent=2),encoding='utf-8')
rows=[]
for path in audit.glob('*-base.en.json'):
 row=json.loads(path.read_text(encoding='utf-8'))
 assert hashlib.sha256((args.pack/row['file']).read_bytes()).hexdigest()==row['sha256'],row['file']
 rows.append(row)
assert len(rows)==90
revised=next(r for r in rows if r['kind']=='Listening' and r['test']==49 and r['part']==3)
text=' '.join(s['text'] for s in revised['segments']).lower()
assert len(re.findall(r'\bpilot\b',text))==2 and not re.search(r'\bpirate\b',text)
rechecks=[]
for name in ['user-revised49-first','user-revised49-repeat']:
 row=json.loads((audit/(name+'-small.en.json')).read_text(encoding='utf-8'))
 assert row['sha256']==revised['sha256']
 text=' '.join(s['text'] for s in row['segments']).lower()
 assert re.search(r'\bpilot\b',text) and not re.search(r'\bpirate\b',text)
 rechecks.append(dict(check=name,sha256=row['sha256'],recognized='pilot',model=row['model']))
mix=json.loads((audit/'mix-comparison.json').read_text())
assert len(mix)==20 and all(r['energyCorrelation']>.999 and abs(r['durationDifference'])<.01 for r in mix)
files=[r for r in technical['files'] if '/Listening/' in r['file'] and re.search(r'_Part_[1-5]\.mp3$',r['file'])]
assert len(files)==50 and all(r['decode']=='PASS' and r['clippedSamples']==0 for r in files)
report=dict(reviewDate='2026-11-17',readyForListeningPublication=True,source='User-supplied recordings only; assistant-generated draft not used.',partRecordingsTranscribed=90,finalRecordingsDecoded=110,fullMixesCompared=20,confirmedContentIssuesRemaining=0,userRevisedFile=revised['file'],userRevisedSHA256=revised['sha256'],pilotChecks=rechecks,method='Local base.en transcription of 90 Part recordings; selected small.en and large-v3-turbo rechecks; comparison against supplied scripts, decoded files and full-mix energy envelopes.',limitation='Speech recognition can misrecognize words and is not a certification of every pronunciation.',listeningFiles=files)
(site/'generated/flyers40-audio-review.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k not in ['listeningFiles','pilotChecks']}),flush=True)
