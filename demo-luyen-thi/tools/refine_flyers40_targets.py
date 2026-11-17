"""Apply reviewed spatial target IDs and the PDF's printed name order without re-encoding artwork."""
import argparse,json
from pathlib import Path
import fitz
parser=argparse.ArgumentParser();parser.add_argument('pack',type=Path);args=parser.parse_args()
site=Path(__file__).resolve().parents[1]
data=json.loads((args.pack/'Editable_Source/data.json').read_text(encoding='utf-8'))
mapping=json.loads((site/'tools/flyers40-picture-map.json').read_text())
priv=json.loads((site/'generated/exams-private.json').read_text(encoding='utf-8'))
pub=json.loads((site/'generated/exams-public.json').read_text(encoding='utf-8'))
for item in data:
 n=item['n'];points=sorted(enumerate(mapping[str(n)]['people']),key=lambda p:(p[1][1],p[1][0]))
 ids={old:f'p{i+1}' for i,(old,_) in enumerate(points)}
 exam=next(e for e in priv if e['id']==f'flyers-{n}');part=exam['listening'][0]
 part['matchKey']={name:ids[i] for i,name in enumerate(item['names'][:6]) if i>0}
 for q in part['questions']:q['answer']=part['matchKey'][q['prompt']]
 with fitz.open(args.pack/f'Tests/Flyers_Hard_Test_{n}.pdf') as doc:
  names=[s.strip() for s in doc[1].get_text().split('Example:')[0].splitlines() if s.strip() in item['names']]
 assert len(names)==7 and set(names)==set(item['names'])
 spec=next(e for e in pub if e['id']==exam['id'])['listening'][0]['interaction']
 spec['targets']=[dict(id=ids[old],x=x,y=y,rx=7,ry=12) for old,(x,y) in points]
 spec['names']=[dict(id=name,label=name) for name in names]
 spec['example']={'name':item['names'][0],'target':ids[0]}
for filename,value in [('exams-private.json',priv),('exams-public.json',pub)]:
 (site/'generated'/filename).write_text(json.dumps(value,ensure_ascii=False),encoding='utf-8')
(site/'flyers40.mjs').write_text('export const flyers40 = '+json.dumps([e for e in priv if e['id'] in {f'flyers-{n}' for n in range(40,50)}],ensure_ascii=False)+';\n',encoding='utf-8')
module=site/'public-data.mjs';raw=module.read_text(encoding='utf-8');prefix='export const allExams = '
_,end=json.JSONDecoder().raw_decode(raw[len(prefix):])
module.write_text(prefix+json.dumps(pub,ensure_ascii=False)+raw[len(prefix)+end:],encoding='utf-8')
print('Applied spatial target IDs and original printed name order to ten new tests only.')
