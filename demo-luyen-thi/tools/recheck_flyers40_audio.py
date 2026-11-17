"""Second-pass recognition of selected audio intervals with the larger English model."""
import argparse,hashlib,json,subprocess,time
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel
parser=argparse.ArgumentParser();parser.add_argument('pack',type=Path);parser.add_argument('requests',type=Path);args=parser.parse_args()
site=Path(__file__).resolve().parents[1];out=site/'tmp/flyers40-audio-audit';requests=json.loads(args.requests.read_text(encoding='utf-8'))
model=WhisperModel('small.en',device='cpu',compute_type='int8',cpu_threads=4,download_root=str(site/'tmp/asr-models'))
for item in requests:
 target=out/(item['id']+'-small.en.json')
 begin=time.monotonic();source=args.pack/item['file']
 digest=hashlib.sha256(source.read_bytes()).hexdigest()
 if target.exists() and json.loads(target.read_text(encoding='utf-8')).get('sha256')==digest:continue
 pcm=subprocess.run(['ffmpeg','-v','error','-ss',str(item['start']),'-i',str(source),'-t',str(item['end']-item['start']),'-ar','16000','-ac','1','-f','f32le','pipe:1'],capture_output=True,check=True).stdout
 segments,_=model.transcribe(np.frombuffer(pcm,dtype=np.float32),language='en',beam_size=5,vad_filter=True,condition_on_previous_text=False)
 transcript=[dict(start=round(s.start+item['start'],2),end=round(s.end+item['start'],2),text=s.text.strip()) for s in segments]
 result={**item,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'model':'small.en','segments':transcript,'seconds':round(time.monotonic()-begin,2)}
 target.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
 print(item['id'],result['seconds'],' '.join(s['text'] for s in transcript),flush=True)
