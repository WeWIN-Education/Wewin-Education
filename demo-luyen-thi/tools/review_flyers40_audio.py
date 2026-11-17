"""Summarize cached ASR differences without labelling them as recording errors."""
import json
from pathlib import Path
from audio_text_compare import compare
p=Path(__file__).resolve().parents[1]/'tmp/flyers40-audio-audit'
rows=[]
for f in sorted(p.glob('*-base.en.json')):
 d=json.loads(f.read_text(encoding='utf-8'))
 d.update(compare(d['reference'],' '.join(s['text'] for s in d['segments'])))
 f.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
 rows.append(dict(file=f.name,rate=d['differenceRate'],differences=d['differences']))
(p/'asr-review.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
for d in rows:
 print(d['file'],d['rate'])
 for x in d['differences']:print(' ',repr(x['expected']),'->',repr(x['heard']))
