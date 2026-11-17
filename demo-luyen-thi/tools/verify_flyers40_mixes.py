"""Check full mixes against the ordered Part tracks using decoded energy envelopes."""
import argparse,json,subprocess
from pathlib import Path
import numpy as np
parser=argparse.ArgumentParser();parser.add_argument('pack',type=Path);parser.add_argument('--test',type=int,choices=range(40,50));args=parser.parse_args()
out=Path(__file__).resolve().parents[1]/'tmp/flyers40-audio-audit'
def decode(path):
 return np.frombuffer(subprocess.run(['ffmpeg','-nostdin','-v','error','-i',str(path),'-ar','8000','-ac','1','-f','f32le','pipe:1'],capture_output=True,check=True).stdout,dtype=np.float32)
def envelope(audio):
 count=len(audio)//800
 return np.sqrt(np.mean(audio[:count*800].reshape(count,800)**2,axis=1))
report=[]
if args.test and (out/'mix-comparison.json').exists():report=[r for r in json.loads((out/'mix-comparison.json').read_text()) if r['test']!=args.test]
for n in ([args.test] if args.test else range(40,50)):
 for kind,count in [('Listening',5),('Speaking',4)]:
  root=args.pack/f'Audio/{kind}/Test_{n}'
  prefix=f'Test_{n}_'+('Speaking_' if kind=='Speaking' else '')+'Part_'
  tracks=[decode(root/f'{prefix}{p}.mp3') for p in range(1,count+1)]
  parts=np.concatenate([piece for i,track in enumerate(tracks) for piece in ([track,np.zeros(11200,dtype=np.float32)] if kind=='Speaking' and i<count-1 else [track])])
  full=decode(root/f'Test_{n}_Full_{kind}.mp3')
  a=envelope(parts);b=envelope(full);length=min(len(a),len(b))
  correlation=float(np.corrcoef(a[:length],b[:length])[0,1])
  report.append(dict(test=n,kind=kind,betweenPartPauseSeconds=1.4 if kind=='Speaking' else 0,durationDifference=round((len(full)-len(parts))/8000,4),energyCorrelation=round(correlation,6)))
  print(n,kind,report[-1],flush=True)
(out/'mix-comparison.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
