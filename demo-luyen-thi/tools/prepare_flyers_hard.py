"""Import the ten WeWIN Hard Flyers mocks and their verified Part MP3 files."""
from pathlib import Path
from PIL import Image
import argparse, csv, fitz, hashlib, json, re, shutil

ROOT=Path(__file__).resolve().parents[2]
SITE=ROOT/'demo-luyen-thi'
DEFAULT_PACK=ROOT.parent/'WeWIN_Flyers_Hard_16_25_Full_Pack'
DEFAULT_AUDIO=ROOT.parent/'10 đề khó flyers_Audio'
parser=argparse.ArgumentParser()
parser.add_argument('--pack-dir',type=Path,default=DEFAULT_PACK)
parser.add_argument('--audio-dir',type=Path,default=DEFAULT_AUDIO)
args=parser.parse_args()
pack=args.pack_dir.resolve();audio_root=args.audio_dir.resolve()
keys_path=pack/'WeWIN_Flyers_Hard_16_25_Answer_Keys.pdf'
audio_manifest=audio_root/'QA_Report'/'audio_manifest.csv'
keys=fitz.open(keys_path)
if len(keys)!=53:raise ValueError(f'Expected 53 answer-key pages, got {len(keys)}')
manifest={}
with audio_manifest.open(encoding='utf-8-sig',newline='') as f:
    for row in csv.DictReader(f):
        if row['file_type']=='Part':manifest[(int(row['test_number']),int(row['file_name'].split('_')[1].split('.')[0]))]=row

def section(text,start,end):
    if start not in text:raise ValueError(f'Missing answer section {start}')
    body=text.split(start,1)[1]
    if end and end not in body:raise ValueError(f'Missing next section {end}')
    return body.split(end,1)[0] if end else body

def numbered(text,count):
    compact=re.sub(r'\s+',' ',text).strip()
    values=re.findall(r'(?:^|;\s*)(\d+)\.\s*(.*?)(?=;\s*\d+\.|$)',compact)
    result={int(n):v.strip().rstrip('.') for n,v in values}
    if set(result)!=set(range(1,count+1)):
        raise ValueError(f'Expected answers 1-{count}; found {sorted(result)} in {compact[:180]}')
    return [result[i] for i in range(1,count+1)]

def accepted(answer):
    return list(dict.fromkeys(x.strip().rstrip('.') for x in answer.split('/') if x.strip()))

def numword(n):
    small=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
    tens=['','','twenty','thirty','forty','fifty']
    if n<20:return small[n]
    return tens[n//10]+(' '+small[n%10] if n%10 else '')

def time_variants(value):
    m=re.fullmatch(r'(\d{1,2}):(\d{2})',value)
    if not m:return []
    h,minute=map(int,m.groups());out=[value.replace(':','.'),f'{numword(h)} {numword(minute)}']
    if minute==30:out.append('half past '+numword(h))
    elif minute==15:out.append('quarter past '+numword(h))
    elif minute==45:out.append('quarter to '+numword((h%12)+1))
    elif minute<30:out.append(numword(minute)+' past '+numword(h))
    elif minute>30:out.append(numword(60-minute)+' to '+numword((h%12)+1))
    return out

def qlist(prefix,values,choices=None):
    result=[]
    for i,value in enumerate(values):
        variants=accepted(value)
        for v in time_variants(value):
            if v not in variants:variants.append(v)
        result.append({'id':f'{prefix}-{i+1}','prompt':f'Question {i+1}','answer':variants[0],'accepted':variants,'choices':choices or []})
    return result

def title_choices(page):
    rows=re.findall(r'^\s*([ABC])\s+(.+?)\s*$',page.get_text(),re.M)
    values=[(a,' '.join(b.split())) for a,b in rows]
    if len(values)!=3 or [a for a,_ in values]!=list('ABC'):
        raise ValueError(f'Could not read the three story-title choices: {values}')
    return [{'value':a,'label':a+' · '+b} for a,b in values]

def part4_choices(page):
    lines=[s.strip() for s in page.get_text().splitlines()]
    try:i=lines.index('Example')+4
    except ValueError:raise ValueError('Missing Part 4 example choices')
    found={}
    for n in range(1,11):
        while i<len(lines) and lines[i]!=str(n):i+=1
        if i+3>=len(lines):break
        found[n]=lines[i+1:i+4];i+=4
    if set(found)!=set(range(1,11)):
        raise ValueError(f'Part 4 should have ten three-word choice rows; found {sorted(found)}')
    return [found[i] for i in range(1,11)]

def write_page(page,dest):
    blocks=[b for b in page.get_text('blocks') if b[1]>80 and b[1]<805]
    if not blocks or any(b[3]>805 or b[0]<25 or b[2]>570 for b in blocks):
        raise ValueError(f'Question content falls outside crop on {dest.name}')
    page.get_pixmap(matrix=fitz.Matrix(1.8,1.8),clip=fitz.Rect(25,85,570,805),alpha=False).save(dest,jpg_quality=89)

def page_image(page,relative):
    dest=SITE/'assets'/relative;dest.parent.mkdir(parents=True,exist_ok=True)
    if not dest.exists():
        page.get_pixmap(matrix=fitz.Matrix(1.6,1.6),clip=fitz.Rect(25,85,570,805),alpha=False).save(dest,jpg_quality=91)
    return relative

tests=[];audio_rows=[]
for n in range(16,26):
    pdf=pack/f'WeWIN_Flyers_Hard_Mock_{n:02}.pdf'
    if not pdf.is_file():raise FileNotFoundError(pdf)
    doc=fitz.open(pdf)
    if len(doc)!=18:raise ValueError(f'{pdf.name}: expected 18 pages, found {len(doc)}')
    pages=[doc[i] for i in range(18)]
    key_page=keys[3+(n-16)*5].get_text()
    continuation=keys[4+(n-16)*5].get_text()
    title=key_page.splitlines()[1].strip()
    test_id=f'flyers-{n:02}'
    folder=SITE/'assets'/'flyers'/f'{n:02}';folder.mkdir(parents=True,exist_ok=True)
    cover=folder/'cover.jpg'
    if not cover.exists():pages[0].get_pixmap(matrix=fitz.Matrix(1.2,1.2),clip=fitz.Rect(40,234.14,555,577.64),alpha=False).save(cover,jpg_quality=88)
    page_files={}
    for page_number in range(2,16):
        rel=f'flyers/{n:02}/page-{page_number:02}.jpg'
        file=SITE/'assets'/rel;file.parent.mkdir(parents=True,exist_ok=True)
        if not file.exists():write_page(pages[page_number-1],file)
        page_files[page_number]=rel

    # Key pages 1-2 are the 43 objective marks and the independent story sample.
    listening_sections=[
        section(key_page,'Listening Part 1','Listening Part 2'),
        section(key_page,'Listening Part 2','Listening Part 3'),
        section(key_page,'Listening Part 3','Listening Part 4'),
        section(key_page,'Listening Part 4','Listening Part 5'),
        section(key_page,'Listening Part 5','Reading & Writing Part 1')]
    rw=key_page.split('Reading & Writing Part 1',1)[1]
    rw=re.split(r'\nListening Part \d',rw,maxsplit=1)[0]
    headings=list(re.finditer(r'(?m)^Part ([2-4])$',rw))
    if [int(m.group(1)) for m in headings]!=[2,3,4]:raise ValueError(f'{test_id}: missing Reading & Writing key headings')
    rw_parts={1:rw[:headings[0].start()].strip()}
    for i,m in enumerate(headings):rw_parts[int(m.group(1))]=rw[m.end():headings[i+1].start() if i+1<len(headings) else len(rw)].strip()
    r1,r2,r3,r4=(rw_parts[i] for i in range(1,5))
    r5=section(continuation,'Part 5 · Complete the sentences','Part 6 ·')
    r6=section(continuation,'Part 6 · One-word answers','Part 7 ·')
    sample=section(continuation,'Part 7 · One possible story','Chấp nhận').strip()
    sample=' '.join(sample.split())

    labels=pages[1].get_text().split('Example:')[0].splitlines()
    names=[s.strip() for s in labels if re.fullmatch(r'[A-Z][a-z]+',s.strip())]
    example_match=re.search(r'Example:\s*([A-Z][a-z]+)',pages[1].get_text())
    if len(names)!=7 or not example_match:raise ValueError(f'{test_id}: expected seven labelled people and one example; {names}')
    example_name=example_match.group(1)
    if names[0]!=example_name:raise ValueError(f'{test_id}: example {example_name} is not first target {names[0]}')
    match={}
    for item in re.split(r'\s*;\s*(?=\d+\.)',re.sub(r'\s+',' ',listening_sections[0]).strip()):
        m=re.match(r'\d+\.\s*([A-Z][a-z]+):',item)
        if not m or m.group(1) not in names:raise ValueError(f'{test_id}: invalid Part 1 key: {item}')
        name=m.group(1);match[name]=f'p{names.index(name)+1}'
    if len(match)!=5:raise ValueError(f'{test_id}: expected five Listening 1 matches, got {len(match)}')
    l1=[{'id':f'l1-{i+1}','prompt':name,'answer':target,'choices':[]} for i,(name,target) in enumerate(match.items())]
    p1={'title':'Listen & match','images':[page_files[2]],'questions':l1,'type':'match','exampleName':example_name,'personOrder':names,'matchKey':match}
    l2=qlist('l2',numbered(listening_sections[1],5))
    l3values=numbered(listening_sections[2],5)
    l3names=[name for name in re.findall(r'\b([A-Z][a-z]+)\s+[1-5]\b',' '.join(pages[3].get_text().split())) if name!='Part']
    if len(l3names)!=5:raise ValueError(f'{test_id}: cannot read five Part 3 names: {l3names}')
    l3=qlist('l3',l3values,list('ABCDEFGH'))
    for q,name in zip(l3,l3names):q['prompt']=name
    l4=qlist('l4',numbered(listening_sections[3],5),list('ABC'))
    l4labels=[]
    for page in pages[4:6]:
        l4labels.extend(re.findall(r'^\s*([1-5])\s+(.+?)\s*$',page.get_text(),re.M))
    prompts={int(i):label.strip() for i,label in l4labels}
    if set(prompts)!=set(range(1,6)):raise ValueError(f'{test_id}: cannot read five Part 4 prompts')
    for q in l4:q['prompt']=prompts[int(q['id'].split('-')[1])]
    paint_values=numbered(listening_sections[4],5)
    l5=[]
    for i,value in enumerate(paint_values[:3]):
        target,color=value.rsplit(':',1)
        l5.append({'id':f'l5-{i+1}','prompt':f'Question {i+1}','answer':target.strip()+'|'+color.strip().lower(),'choices':[],'colour':True})
    for i,value in enumerate(paint_values[3:],start=4):
        _,answer=value.rsplit(':',1)
        l5.append({'id':f'l5-{i}','prompt':f'Question {i}','answer':answer.strip(),'choices':[]})
    if len(l5)!=5:raise ValueError(f'{test_id}: expected five Part 5 answers')
    p5={'title':'Listen, colour & write','images':[page_files[7]],'questions':l5}

    reading=[
        {'title':'Choose the words','images':[page_files[8]],'questions':qlist('r1',numbered(r1,10))},
        {'title':'Read the conversation','images':[page_files[9]],'questions':qlist('r2',numbered(r2,5),list('ABCDEFGH'))},
        {'title':'Complete the story','images':[page_files[10]],'questions':qlist('r3',numbered(r3,6))},
        {'title':'Choose the right words','images':[page_files[11]],'questions':qlist('r4',numbered(r4,10))},
        {'title':'Complete the story sentences','images':[page_files[12],page_files[13]],'questions':qlist('r5',[m.group(2).strip() for m in re.finditer(r'(?m)^\s*(\d+)\.\s*(.*?)\s+\u2014\s*',r5)])},
        {'title':'Complete the message','images':[page_files[14]],'questions':qlist('r6',numbered(r6,5))},
        {'title':'Write a story','images':[page_files[15]],'manual':True,'questions':[{'id':'r7-1','prompt':'Write your story here.','sample':sample}]}
    ]
    reading[2]['questions'][5]['prompt']='Question 6 · Best title for the story'
    reading[2]['questions'][5]['choices']=title_choices(pages[9])
    if len(reading[4]['questions'])!=7:raise ValueError(f'{test_id}: Part 5 should have seven sentence answers')
    choices=part4_choices(pages[10]);key4=[q['answer'] for q in reading[3]['questions']]
    for q,options in zip(reading[3]['questions'],choices):
        q['choices']=options
        if q['answer'] not in options:raise ValueError(f'{test_id}: Part 4 answer {q["answer"]} not in {options}')
    if sum(len(p['questions']) for p in reading if not p.get('manual'))!=43 or sum(len(p['questions']) for p in reading)!=44:
        raise ValueError(f'{test_id}: unexpected Reading & Writing counts')

    audio=[]
    for part in range(1,6):
        row=manifest.get((n,part));src=audio_root/f'Test_{n}'/f'Part_{part}.mp3'
        if not row or row['status']!='PASS' or not src.is_file():raise ValueError(f'Missing or failed audio: {src}')
        if src.stat().st_size!=int(row['size_bytes']):raise ValueError(f'Audio size mismatch: {src}')
        relative=f'flyers/{n:02}/listening-{part}.mp3';dest=SITE/'assets'/relative;dest.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(src,dest)
        digest=hashlib.sha256(src.read_bytes()).hexdigest()
        audio.append(relative);audio_rows.append({'test':test_id,'part':part,'file':relative,'bytes':dest.stat().st_size,'duration':float(row['duration_seconds']),'sha256':digest,'qa':row['status']})
    tests.append({'id':test_id,'number':f'{n:02}','title':title,'level':'A2 Flyers','difficulty':'Hard','version':'2026-10-23-flyers-hard-v1','cover':f'flyers/{n:02}/cover.jpg','audio':audio,'audioVersion':'20261023-flyers-hard','reading':reading,'listening':[p1,{'title':'Listen & write','images':[page_files[3]],'questions':l2},{'title':'Listen & match pictures','images':[page_files[4]],'questions':l3},{'title':'Listen & choose','images':[page_files[5],page_files[6]],'questions':l4},p5]})
    doc.close()

(SITE/'flyers-hard.mjs').write_text('export const flyersHard = '+json.dumps(tests,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
report={'tests':10,'partAudios':len(audio_rows),'qaPass':sum(x['qa']=='PASS' for x in audio_rows),'bytes':sum(x['bytes'] for x in audio_rows),'assets':sum(14 for _ in tests),'audio':audio_rows}
(ROOT/'_deploy'/'flyers-hard-20261023-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
(SITE/'generated'/'flyers-hard-audio.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
(SITE/'generated'/'flyers-hard-audio.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(f'Prepared {len(tests)} hard Flyers mocks, {len(audio_rows)} verified Part tracks, {report["bytes"]:,} audio bytes.')
