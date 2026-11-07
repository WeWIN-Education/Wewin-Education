"""Import the supplied KET pack without rebuilding or changing existing YLE papers."""
import argparse, copy, hashlib, io, json, re, shutil, subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import fitz
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('pack', type=Path)
args = parser.parse_args()
pack = args.pack.resolve()
site = Path(__file__).resolve().parents[1]
assets = site / 'assets'
manifest = json.loads((pack / 'MANIFEST.json').read_text(encoding='utf-8-sig'))
for entry in manifest['files']:
    path = pack / entry['path']
    assert path.is_relative_to(pack) and path.is_file(), entry['path']
    assert path.stat().st_size == entry['bytes'], entry['path']
    assert hashlib.sha256(path.read_bytes()).hexdigest() == entry['sha256'], entry['path']
data = json.loads((pack / 'Editable_Question_Data.json').read_text(encoding='utf-8-sig'))
assert [t['test'] for t in data] == list(range(1, 11))
media_file = site / 'media-manifest.mjs'
media = json.loads(media_file.read_text(encoding='utf-8').split('export default ', 1)[1].strip().rstrip(';'))
papers, audio_jobs = [], []

def picture(page, key, rect=None):
    if rect is None:
        blocks = [b for b in page.get_text('blocks') if 90 < b[1] < 790]
        image_boxes = [x['bbox'] for x in page.get_image_info() if 90 < x['bbox'][1] < 790]
        bottom = max([b[3] for b in blocks + image_boxes] + [150]) + 12
        rect = (35, 94, 560, min(bottom, 790))
    pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5), clip=fitz.Rect(rect), alpha=False)
    image = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    variants = []
    for width in sorted(set([min(480, image.width), image.width])):
        height = round(image.height * width / image.width)
        resized = image.resize((round(height * image.width / image.height), height), Image.Resampling.LANCZOS)
        filename = f'optimized/ket/{key}-{width}.webp'
        target = assets / filename
        target.parent.mkdir(parents=True, exist_ok=True)
        resized.save(target, 'WEBP', quality=88, method=6)
        variants.append(dict(file=filename, width=resized.width, height=resized.height, bytes=target.stat().st_size))
        if filename not in media['files']: media['files'].append(filename)
    logical = f'ket/{key}.webp'
    media['images'][logical] = dict(width=image.width, height=image.height, variants=variants)
    return logical

def choice_question(identifier, prompt, choices, answer, number):
    assert answer in 'ABCDEFGH'[:len(choices)], (identifier, answer)
    return dict(id=identifier, number=number, prompt=prompt, choices=[dict(value=chr(65+i), label=f'{chr(65+i)} · {label}') for i,label in enumerate(choices)], answer=answer)

for t in data:
    n = t['test']; num = f'{n:02}'; doc = fitz.open(pack / f'WeWIN_KET_Mock_{num}.pdf')
    assert len(doc) == 19
    paths = {i: picture(doc[i-1], f'{num}/page-{i:02}') for i in range(2, 19) if i not in [9,10]}
    paths[9] = picture(doc[8], f'{num}/page-09', (35, 166, 560, 288))
    paths[10] = picture(doc[9], f'{num}/page-10', (35, 187, 560, 300))
    cover = picture(doc[9], f'{num}/cover', (45, 197, 208, 269))
    e = dict(id=f'ket-{num}', number=num, title=f'A2 Key for Schools · Mock {num}', level='A2 Key (KET)', levelKey='ket', version='2026-11-07-ket-v1', cover=cover, readingCount=30, listeningCount=25, writingAssessment='teacher', audio=[f'ket/{num}/listening-{i}.mp3' for i in range(1,6)], fullAudio=f'ket/{num}/full-test.mp3', audioVersion='20261107-ket', studentPdf=f'ket/pdf/WeWIN_KET_Mock_{num}.pdf', speakingImages=[paths[18]], reading=[], listening=[])
    def part(skill, index, title, instruction, pages, questions, **extra):
        e[skill].append(dict(id=f'{skill[0]}{index}', title=title, instruction=instruction, images=[paths[i] for i in pages], questions=questions, **extra))
    part('reading',1,'Read notices and messages','For each question, choose the correct answer (A, B or C).',[2,3],[choice_question(f'r1-{i}',q['q'],q['choices'],q['answer'],i) for i,q in enumerate(t['reading1'],1)])
    profiles = [f'{name}' for letter,name,text in t['reading2']['profiles']]
    part('reading',2,'Match the people','For each question, choose the correct person (A, B or C).',[4],[choice_question(f'r2-{i}',q,profiles,a,i+6) for i,(q,a) in enumerate(t['reading2']['questions'],1)])
    part('reading',3,'Read an article','Read the article and choose the correct answer (A, B or C).',[5,6],[choice_question(f'r3-{i}',q['q'],q['choices'],q['answer'],i+13) for i,q in enumerate(t['reading3']['questions'],1)])
    # The supplied JSON has an empty Part 4 passage. Its complete text is on PDF page 7.
    assert '19' in doc[6].get_text() and '24' in doc[6].get_text()
    part('reading',4,'Choose the missing words','Choose the correct word (A, B or C) for each gap.',[7],[choice_question(f'r4-{i}',f'Gap {i+18}',q['choices'],q['answer'],i+18) for i,q in enumerate(t['reading4_options'],1)])
    def gaps(prefix, answers):
        return [dict(id=f'{prefix}-{i}', number=int(k), prompt=f'Gap {k}', answer=re.split(r'\s*/\s*',v)[0], accepted=re.split(r'\s*/\s*',v)[1:]) for i,(k,v) in enumerate(answers.items(),1)]
    part('reading',5,'Complete the message','Write ONE word in each gap.',[8],gaps('r5',t['reading5']['answers']))
    part('reading',6,'Write an email','Write 25 words or more.',[9],[dict(id='r6-1',number=31,prompt='Write your email here.',sample=t['reading6']['sample_answer'])],manual=True,minWords=25)
    part('reading',7,'Write a story',t['reading7']['prompt'],[10],[dict(id='r7-1',number=32,prompt='Write your story here.',sample=t['reading7']['sample_answer'])],manual=True,minWords=35)
    part('listening',1,'Choose the correct picture','Listen and choose the correct picture (A, B or C).',[11,12],[choice_question(f'l1-{i}',q['question'],['Picture A','Picture B','Picture C'],q['answer'],i) for i,q in enumerate(t['listening1'],1)])
    l2 = gaps('l2',t['listening2']['answers'])
    for q in l2:
        q['prompt'] = next((re.sub(r'^\d+\s*','',s).rstrip(':') for s in t['listening2']['prompts'] if re.match(rf"^{q['number']}\s",s)), q['prompt'])
    part('listening',2,'Listen and complete the notes','Write one word or a number or a date or a time in each gap.',[13],l2)
    for index, pageset in [(3,[14]),(4,[15,16])]:
        part('listening',index,'Listen and choose','Listen and choose the correct answer (A, B or C).',pageset,[choice_question(f'l{index}-{i}',q['q'],q['choices'],q['answer'],i+(index-1)*5) for i,q in enumerate(t[f'listening{index}_questions'],1)])
    l5 = t['listening5']; options = [line[2:] for line in l5['lines'] if re.match(r'^[A-H] ',line)]
    assert len(options) == 8
    questions = []
    for i,(k,a) in enumerate(l5['answers'].items(),1):
        name = next(s for s in l5['lines'] if s.startswith(k+' '))
        questions.append(choice_question(f'l5-{i}',re.sub(r'^\d+\s*|\s*\[\s*\]','',name),options,a,int(k)))
    part('listening',5,'Listen and match','Match each person to the correct option. There are three extra options.',[17],questions)
    key = {label:answer for label,answer,explanation in t['answer_key']}
    for skill in ['reading','listening']:
        for pi,p in enumerate(e[skill],1):
            if p.get('manual'): continue
            for q in p['questions']:
                expected = key[f'{skill.title()} {pi} | {q["number"]}']
                assert q['answer'] == re.split(r'\s*/\s*',expected)[0], (e['id'],q['id'],expected)
    papers.append(e)
    for i in range(1,6): audio_jobs.append((pack/f'Audio/Mock_{num}/Part_{i}.mp3',assets/e['audio'][i-1]))
    audio_jobs.append((pack/f'Audio/Mock_{num}/Full_Test.mp3',assets/e['fullAudio']))
    target=assets/e['studentPdf'];target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(pack/target.name,target)
    print(f'Prepared KET {num}: 30 Reading + 25 Listening + 2 Writing tasks',flush=True)

def encode(job):
    source,target=job;target.parent.mkdir(parents=True,exist_ok=True)
    if not target.exists():
        subprocess.run(['ffmpeg','-v','error','-nostdin','-y','-i',str(source),'-map_metadata','-1','-ac','1','-ar','44100','-codec:a','libmp3lame','-b:a','96k',str(target)],check=True)
    def duration(path):
        return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(path)],text=True).strip())
    assert abs(duration(source)-duration(target)) < .15, str(target)
    subprocess.run(['ffmpeg','-v','error','-nostdin','-i',str(target),'-f','null','-'],check=True)
    return target.stat().st_size
with ThreadPoolExecutor(max_workers=4) as pool: sizes=list(pool.map(encode,audio_jobs))
shutil.copy2(pack/'WeWIN_KET_All_10_Mock_Tests.pdf',assets/'ket/pdf/WeWIN_KET_All_10_Mock_Tests.pdf')
private_dir=site/'server/materials/ket';private_dir.mkdir(parents=True,exist_ok=True)
for name in ['WeWIN_KET_Answer_Keys_and_Writing_Models.pdf','WeWIN_KET_Speaking_Examiner_Guide.pdf','WeWIN_KET_Listening_Scripts_TTS.pdf','WeWIN_KET_Part_Independence_Map.pdf','Editable_Question_Data.json','ANSWER_KEYS.txt','LISTENING_SCRIPTS.txt','SPEAKING_EXAMINER.txt','MANIFEST.json','README_VI.txt','Duration_Estimates.json']:
    shutil.copy2(pack/name,private_dir/name)
pub=copy.deepcopy(papers)
for e in pub:
    for p in e['reading']+e['listening']:
        for q in p['questions']:
            for key in ['answer','accepted','sample']:q.pop(key,None)
for filename,add in [('exams-private.json',papers),('exams-public.json',pub)]:
    target=site/'generated'/filename
    old=json.loads(target.read_text(encoding='utf-8'))
    target.write_text(json.dumps([e for e in old if e['levelKey']!='ket']+add,ensure_ascii=False),encoding='utf-8')
old_module=(site/'public-data.mjs').read_text(encoding='utf-8')
art=json.JSONDecoder().raw_decode(old_module.split('export const artwork = ',1)[1])[0]
all_public=json.loads((site/'generated/exams-public.json').read_text(encoding='utf-8'))
(site/'public-data.mjs').write_text('export const allExams = '+json.dumps(all_public,ensure_ascii=False)+';\nexport const artwork = '+json.dumps(art,ensure_ascii=False)+';\n'+''.join(f"export const {name}=allExams.filter(e=>e.levelKey==='{level}');" for name,level in [('exams','starters'),('movers','movers'),('flyers','flyers'),('ket','ket')])+'\n',encoding='utf-8')
(site/'ket.mjs').write_text('export const ket = '+json.dumps(papers,ensure_ascii=False)+';\n',encoding='utf-8')
media_file.write_text('export default '+json.dumps(media,ensure_ascii=False)+';\n',encoding='utf-8')
report=dict(tests=10,readingQuestions=300,listeningQuestions=250,writingTasks=20,finalAudioFiles=60,audioBytes=sum(sizes),manifestFilesVerified=len(manifest['files']))
(site/'tools/ket-import-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report),flush=True)
