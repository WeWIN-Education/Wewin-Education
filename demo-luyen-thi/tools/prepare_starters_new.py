"""Import Starters mocks 06–15 and Hard mocks 16–25 with individual Part audio."""
from pathlib import Path
import argparse, csv, hashlib, json, re, shutil, subprocess
import fitz

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'demo-luyen-thi'
DOWNLOADS = ROOT.parent
DEFAULT_NORMAL = DOWNLOADS / '10 New Tests-20261023T094124Z-1-001' / '10 New Tests'
DEFAULT_NORMAL_AUDIO = DOWNLOADS / 'STARTERS_10_Practice_Tests_AUDIO-20261023T094315Z-1-001' / 'STARTERS_10_Practice_Tests_AUDIO'
DEFAULT_HARD = DOWNLOADS / 'WeWIN_Starters_Hard_16_25_Full_Pack'
DEFAULT_HARD_AUDIO = DOWNLOADS / '10 đề khó_Audio' / 'WeWIN_Starters_10_New_Hard_Tests_16_25_Audio'

parser = argparse.ArgumentParser()
parser.add_argument('--normal-pack-dir', type=Path, default=DEFAULT_NORMAL)
parser.add_argument('--normal-audio-dir', type=Path, default=DEFAULT_NORMAL_AUDIO)
parser.add_argument('--hard-pack-dir', type=Path, default=DEFAULT_HARD)
parser.add_argument('--hard-audio-dir', type=Path, default=DEFAULT_HARD_AUDIO)
args = parser.parse_args()
normal_root, normal_audio = args.normal_pack_dir.resolve(), args.normal_audio_dir.resolve()
hard_root, hard_audio = args.hard_pack_dir.resolve(), args.hard_audio_dir.resolve()

normal_pdf = fitz.open(normal_root / 'WeWIN_Starters_All_10_Tests_06_15.pdf')
normal_keys = fitz.open(normal_root / 'WeWIN_Starters_06_15_Answer_Keys.pdf')
hard_keys = fitz.open(hard_root / 'WeWIN_Starters_Hard_16_25_Answer_Keys.pdf')
if len(normal_pdf) != 140 or len(normal_keys) != 51 or len(hard_keys) != 51:
    raise ValueError(f'Unexpected pack lengths: normal tests={len(normal_pdf)}, normal keys={len(normal_keys)}, hard keys={len(hard_keys)}')

with (hard_audio / 'QA_Report' / 'starters_hard_manifest.csv').open(encoding='utf-8-sig', newline='') as f:
    hard_qa = list(csv.DictReader(f))
hard_part_qa = {(int(row['test'].split('_')[1]), int(row['part'].split('_')[1])): row
                for row in hard_qa if row['type'] == 'Part'}
if len(hard_part_qa) != 40 or any(row['status'] != 'PASS' for row in hard_part_qa.values()):
    raise ValueError('The Hard Starters manifest must contain 40 PASS Part files.')

def compact(text):
    return re.sub(r'\s+', ' ', text).strip()

def keyed_parts(text):
    found = list(re.finditer(r'(?m)^Part\s+(\d+)\s*$', text))
    result = {}
    for i, match in enumerate(found):
        end = found[i + 1].start() if i + 1 < len(found) else len(text)
        result[int(match.group(1))] = text[match.end():end].strip()
    return result

def numbered(text, count):
    values = {}
    current = None
    pieces = []
    def flush():
        if current is not None:
            values[current] = compact(' '.join(pieces)).rstrip('.')
    stop_labels=('Số:','Tên riêng:','Listening:','Reading & Writing:','Chấp nhận')
    for line in text.splitlines():
        match = re.match(r'^\s*(\d+)\.\s*(.*?)\s*$', line)
        if match:
            flush();current=int(match.group(1));pieces=[match.group(2)];continue
        if current is not None:
            if line.strip().startswith(stop_labels):
                break
            if line.strip():pieces.append(line.strip())
    flush()
    if set(values) != set(range(1, count + 1)):
        # Some key pages place five multiple-choice answers on one line separated by bars.
        flat = compact(text)
        letters = re.findall(r'(?<!\S)([1-5])\.\s*([ABC])(?=\s*(?:\||$))', flat)
        if len(letters) == count and {int(n) for n, _ in letters} == set(range(1, count + 1)):
            return [dict((int(n), answer) for n, answer in letters)[i] for i in range(1, count + 1)]
        raise ValueError(f'Expected answers 1–{count}; found {sorted(values)} in {flat[:240]}')
    return [values[i] for i in range(1, count + 1)]

def answer_variants(value):
    return list(dict.fromkeys(compact(x).rstrip('.') for x in re.split(r'\s*/\s*', value) if x.strip()))

def make_questions(prefix, values, prompts=None, choices=None, kind='text'):
    result = []
    for i, value in enumerate(values):
        variants = answer_variants(value)
        q = {'id': f'{prefix}-{i + 1}', 'prompt': prompts[i] if prompts else f'Question {i + 1}', 'answer': variants[0]}
        if len(variants) > 1:
            q['accepted'] = variants
        if choices:
            q['choices'] = choices
        if kind == 'colour':
            target, color = variants[0].rsplit(':', 1)
            q.update(answer={'target': target.strip(), 'colour': color.strip().lower()}, colour=True)
        result.append(q)
    return result

def prompt_rows(pages, expected=5):
    found = {}
    for page in pages:
        lines = page.get_text().splitlines()
        for i, line in enumerate(lines):
            match = re.match(r'^\s*([1-5])(?:\s+(.+))?\s*$', line)
            if not match:
                continue
            number = int(match.group(1))
            if number in found:
                continue
            pieces = [match.group(2).strip()] if match.group(2) else []
            j = i + 1
            while j < len(lines):
                value = lines[j].strip()
                if not value:
                    j += 1; continue
                if re.fullmatch(r'[1-5]', value) or re.fullmatch(r'[ABC]', value):
                    break
                if value.startswith(('MOCK ', 'WeWIN Education', 'Example')):
                    break
                pieces.append(value); j += 1
            prompt = compact(' '.join(pieces))
            if prompt:
                found[number] = prompt
    if set(found) != set(range(1, expected + 1)):
        raise ValueError(f'Could not read five English question prompts: {found}')
    return [found[i] for i in range(1, expected + 1)]

def sentence_prompts(page, first=1, last=5):
    return prompt_rows([page], last)[first - 1:last]

def p1_name_answers(block):
    rows = re.findall(r'(?m)^\s*(\d+)\.\s*([A-Z][a-z]+):\s*(.*?)(?=^\s*\d+\.\s*[A-Z][a-z]+:|\Z)', block, re.S)
    result = [(int(n), name, compact(value)) for n, name, value in rows]
    if [n for n, _, _ in result] != list(range(1, 6)):
        raise ValueError(f'Part 1 should have five name mappings: {result}')
    return result

def color_answers(block):
    rows = re.findall(r'(?m)^\s*(\d+)\.\s*(.*?)\s*:\s*(red|blue|green|orange|yellow|purple|pink|brown)\s*$', block, re.I)
    values = {int(n): (compact(target), color.lower()) for n, target, color in rows}
    if set(values) != set(range(1, 6)):
        raise ValueError(f'Part 4 should have five colour answers: {values}')
    return [values[i] for i in range(1, 6)]

def location_id(label):
    text = label.lower()
    if 'under the table' in text or 'under table' in text: return 'under-table'
    if 'on the table' in text or 'on table' in text: return 'on-table'
    if 'under the chair' in text or 'under chair' in text: return 'under-chair'
    if 'on the chair' in text or 'on chair' in text: return 'on-chair'
    if 'in the box' in text or 'in box' in text: return 'in-box'
    if 'next to the tree' in text or 'next to tree' in text or 'by the tree' in text: return 'next-tree'
    raise ValueError(f'Unknown colour location in answer key: {label}')

def example_location(page):
    text = ' '.join(page.get_text().split())
    match = re.search(r'Example:\s*(.*?)\s*[-–]\s*(red|blue|green|orange|yellow|purple|pink|brown)\b', text, re.I)
    if not match:
        raise ValueError(f'Cannot locate the printed Part 4 colour example: {text[:180]}')
    return location_id(match.group(1))

COLOR_POSITIONS = {
    'under-table': (51.3, 52.4), 'on-table': (51.3, 21.6),
    'on-chair': (81.3, 34.9), 'under-chair': (81.3, 63.0),
    'in-box': (78.5, 86.6), 'next-tree': (18.1, 55.6)
}

# Each image uses a stable character arrangement. These semantic roles keep name
# targets aligned with the person described in the independent answer key.
MATCH_ROLE_MAPS = {
 6:{'Ben':'green','Lucy':'yellow','Tom':'orange','Kim':'purple','Nick':'blue','Ann':'pink','Alex':'red'},
 7:{'Tom':'green','Ben':'orange','Lucy':'purple','Sam':'blue','Kim':'pink','Ann':'yellow','Alex':'red'},
 8:{'Ben':'green','Kim':'purple','Nick':'blue','Ann':'pink','Lucy':'yellow','Tom':'orange','Alex':'red'},
 9:{'Tom':'green','Sam':'blue','Kim':'pink','Ann':'yellow','Ben':'orange','Lucy':'purple','Alex':'red'},
10:{'Ben':'green','Ann':'pink','Lucy':'yellow','Tom':'orange','Kim':'purple','Nick':'blue','Alex':'red'},
11:{'Tom':'red','Ann':'yellow','Ben':'glasses','Lucy':'purple','Sam':'blue','Kim':'pink','Alex':'win'},
12:{'Ben':'red','Lucy':'yellow','Tom':'glasses','Kim':'purple','Nick':'blue','Ann':'pink','Alex':'win'},
13:{'Tom':'red','Ann':'yellow','Ben':'glasses','Lucy':'purple','Sam':'blue','Kim':'pink','Alex':'win'},
14:{'Ben':'red','Lucy':'yellow','Tom':'glasses','Kim':'purple','Nick':'blue','Ann':'pink','Alex':'win'},
15:{'Tom':'red','Ann':'yellow','Ben':'glasses','Lucy':'purple','Sam':'blue','Kim':'pink','Alex':'win'},
16:{'Bill':'red','May':'yellow','Alex':'glasses','Sue':'purple','Hugo':'blue','Eva':'pink','Ann':'win'},
17:{'Hugo':'red','Eva':'yellow','Dan':'glasses','Jill':'purple','Matt':'blue','Grace':'pink','Ann':'win'},
18:{'Alex':'red','Grace':'yellow','Mark':'glasses','May':'purple','Bill':'blue','Sue':'pink','Ann':'win'},
19:{'Matt':'red','Alice':'yellow','Hugo':'glasses','Eva':'purple','Dan':'blue','Jill':'pink','Ann':'grandmother'},
20:{'Dan':'red','Jill':'yellow','Bill':'glasses','Grace':'purple','Mark':'blue','May':'pink','Ann':'baker'},
21:{'Mark':'red','Sue':'yellow','Matt':'glasses','Alice':'purple','Alex':'blue','Eva':'pink','Ann':'win'},
22:{'Bill':'red','Eva':'yellow','Dan':'glasses','May':'purple','Hugo':'blue','Grace':'pink','Ann':'win'},
23:{'Alex':'red','May':'yellow','Mark':'glasses','Sue':'purple','Matt':'blue','Jill':'pink','Ann':'win'},
24:{'Hugo':'red','Jill':'yellow','Alex':'glasses','Grace':'purple','Bill':'blue','Alice':'pink','Ann':'win'},
25:{'Matt':'red','Grace':'yellow','Bill':'glasses','Eva':'purple','Mark':'blue','Sue':'pink','Ann':'win'}
}
MATCH_PROFILES = {
 'early':{'yellow':(14,37),'green':(37,37),'red':(76,34),'orange':(93,55),'blue':(11,76),'purple':(40,75),'pink':(70,74)},
 'grid':{'red':(15,31),'yellow':(48,31),'glasses':(83,31),'purple':(18,73),'blue':(57,73),'pink':(85,71),'win':(51,53)},
 'party':{'red':(16,31),'yellow':(42,32),'glasses':(85,31),'purple':(17,74),'blue':(65,68),'pink':(85,68),'win':(51,53)},
 'soccer':{'red':(15,31),'yellow':(45,31),'glasses':(84,31),'purple':(15,72),'blue':(42,74),'pink':(85,71),'win':(51,53)},
 'zoo':{'red':(19,32),'yellow':(46,31),'glasses':(82,31),'purple':(17,72),'blue':(63,71),'pink':(84,71),'win':(51,53)},
 'market':{'red':(12,31),'yellow':(40,30),'glasses':(70,31),'purple':(16,73),'blue':(42,72),'pink':(85,73),'grandmother':(58,50)},
 'bakery':{'red':(12,30),'yellow':(36,30),'glasses':(84,30),'purple':(16,73),'blue':(68,73),'pink':(86,72),'baker':(54,15)}
}
MATCH_PROFILE_BY_TEST = {**{n:'early' for n in range(6,11)}, **{n:'grid' for n in range(11,16)},
                         16:'party',17:'soccer',18:'zoo',19:'market',20:'bakery', **{n:'grid' for n in range(21,26)}}

def save_page(page, destination, clip=(25, 60, 570, 805), scale=1.8):
    destination.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=fitz.Rect(*clip), alpha=False).save(destination, jpg_quality=90)

def save_scene(doc, page, destination):
    infos = [x for x in page.get_image_info(xrefs=True) if x.get('xref') and x['width'] > 500 and x['height'] > 500 and .8 < x['width'] / x['height'] < 2]
    if not infos:
        raise ValueError('Matching picture not found on the Listening Part 1 page.')
    info = max(infos, key=lambda x: x['width'] * x['height'])
    pix = fitz.Pixmap(doc, info['xref'])
    if pix.n > 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    destination.parent.mkdir(parents=True, exist_ok=True)
    pix.save(destination, jpg_quality=91)

def page_name_labels(page):
    image = next(x for x in page.get_image_info() if x['width'] > 500 and x['height'] > 500 and .8 < x['width'] / x['height'] < 2)
    top_y, bottom_y = image['bbox'][1], image['bbox'][3]
    labels = []
    for block in page.get_text('dict')['blocks']:
        for line in block.get('lines', []):
            for span in line.get('spans', []):
                name = span['text'].strip()
                y0 = span['bbox'][1]
                in_top_name_row = top_y - 120 < y0 < top_y
                in_bottom_name_row = bottom_y < y0 < bottom_y + 80
                if re.fullmatch(r'[A-Z][a-z]+', name) and (in_top_name_row or in_bottom_name_row):
                    labels.append((span['bbox'][1], span['bbox'][0], name))
    # Keep the printed 3-name row above the image and the 4-name row below it.
    unique = {}
    for y, x, name in sorted(labels):
        unique.setdefault(name, (y, x))
    names = sorted(unique, key=lambda name: unique[name])
    if len(names) != 7:
        raise ValueError(f'Expected the seven names around the Part 1 picture, got {names}')
    return names

def question_prompts(pages, count=5):
    found = {}
    for page in pages:
        lines = page.get_text().splitlines()
        for i, line in enumerate(lines):
            m = re.match(r'^\s*([1-5])(?:\s+(.+?))?\s*$', line)
            if not m:
                continue
            number = int(m.group(1))
            if number in found:
                continue
            pieces = [m.group(2).strip()] if m.group(2) else []
            j = i + 1
            while j < len(lines):
                value = lines[j].strip()
                if not value:
                    j += 1; continue
                if re.fullmatch(r'[1-5]|[ABC]', value) or value.startswith(('MOCK ', 'WeWIN Education', 'Example')):
                    break
                pieces.append(value); j += 1
            prompt = compact(' '.join(pieces))
            if prompt:
                found[number] = prompt
    if set(found) != set(range(1, count + 1)):
        return [f'Question {i}' for i in range(1, count + 1)]
    return [found[i] for i in range(1, count + 1)]

def colors_for_key(part4_text, example_page):
    pairs = re.findall(r'(?m)^\s*(\d+)\.\s*(.*?)\s*:\s*(red|blue|green|orange|yellow|purple|pink|brown)\s*$', part4_text, re.I)
    rows = {int(n): (compact(target), color.lower()) for n, target, color in pairs}
    if set(rows) != set(range(1, 6)):
        raise ValueError(f'Expected five Listening Part 4 colors, found {rows}')
    def location(label):
        t = label.lower()
        if 'under the table' in t: return 'under-table'
        if 'on the table' in t: return 'on-table'
        if 'under the chair' in t: return 'under-chair'
        if 'on the chair' in t: return 'on-chair'
        if 'in the box' in t: return 'in-box'
        if 'next to the tree' in t: return 'next-tree'
        raise ValueError(f'Unknown Part 4 target: {label}')
    example_text = ' '.join(example_page.get_text().split())
    em = re.search(r'Example:\s*(.*?)\s*[-–]\s*(red|blue|green|orange|yellow|purple|pink|brown)\b', example_text, re.I)
    if not em:
        raise ValueError('Could not read the Part 4 example location.')
    example = location(em.group(1))
    answers = [(location(rows[i][0]), rows[i][1]) for i in range(1, 6)]
    if example in {target for target, _ in answers} or len({target for target, _ in answers}) != 5:
        raise ValueError(f'Color example/answers overlap or duplicate for the same scene: {example}, {answers}')
    return answers, example

def extract_exam(n, doc, key_doc, key_index, audio_base, audio_number, hard=False, qa=None, page_start=0):
    pages = [doc[page_start + i] for i in range(14)]
    key_listening = key_doc[key_index].get_text()
    key_reading = key_doc[key_index + 2].get_text()
    title = key_listening.splitlines()[1].strip()
    test_id = f'starters-{n:02}'
    asset_dir = SITE / 'assets' / 'tests' / f'{n:02}'
    asset_dir.mkdir(parents=True, exist_ok=True)
    cover_rel = f'tests/{n:02}/cover.jpg'
    save_page(pages[0], SITE / 'assets' / cover_rel, clip=(40, 215, 555, 580), scale=1.2)

    page_rel = {}
    for pdf_page in [3, 4, 5, 7, 8, 9, 10, 11, 12]:
        rel = f'tests/{n:02}/page-{pdf_page:02}.jpg'
        save_page(pages[pdf_page - 1], SITE / 'assets' / rel)
        page_rel[pdf_page] = rel
    match_rel = f'tests/{n:02}/matching.jpg'
    save_scene(doc, pages[1], SITE / 'assets' / match_rel)
    color_rel = f'tests/{n:02}/colour.jpg'
    save_page(pages[5], SITE / 'assets' / color_rel, clip=(30, 245, 565, 680), scale=1.9)

    listen_parts = keyed_parts(key_listening)
    read_parts = keyed_parts(key_reading)
    p1_answers = p1_name_answers(listen_parts[1])
    example_match = re.search(r'Example:\s*([A-Z][a-z]+)', pages[1].get_text())
    if not example_match:
        raise ValueError(f'{test_id}: missing Part 1 example name')
    example_name = example_match.group(1)
    keyed_names = {name for _, name, _ in p1_answers} | {example_name}
    labels = page_name_labels(pages[1])
    # One printed name is unused by the five questions and example, but remains a selectable target.
    filler = next((name for name in labels if name not in keyed_names), None)
    role_map = MATCH_ROLE_MAPS[n]
    if filler is None or set(role_map) != set(labels):
        raise ValueError(f'{test_id}: role map does not match printed names: labels={labels}, role_names={sorted(role_map)}')
    profile = MATCH_PROFILES[MATCH_PROFILE_BY_TEST[n]]
    person_order = [example_name] + [name for _, name, _ in p1_answers] + [filler]
    person_targets = [{'x': profile[role_map[name]][0], 'y': profile[role_map[name]][1], 'rx': 8, 'ry': 16} for name in person_order]
    person_target_by_name = {name: f'p{i+1}' for i, name in enumerate(person_order)}
    match_key = {name: person_target_by_name[name] for _, name, _ in p1_answers}
    l1_questions = [{'id': f'l1-{i}', 'prompt': name, 'answer': match_key[name]} for i, (_, name, _) in enumerate(p1_answers, 1)]
    l1 = {'id': 'l1', 'type': 'match', 'title': 'Listen & match', 'instruction':'Listen and draw lines. There is one example.',
          'image':match_rel,'exampleName':example_name,'personOrder':person_order,'personTargets':person_targets,'matchKey':match_key,'questions':l1_questions}

    l2_values = numbered(listen_parts[2], 5)
    l2_prompts = question_prompts([pages[2]])
    l2 = {'id':'l2','title':'Names & numbers','instruction':'Read the questions. Listen and write a name or a number.','image':page_rel[3],
          'questions':make_questions('l2',l2_values,l2_prompts)}
    l3_values = numbered(listen_parts[3], 5)
    l3_prompts = question_prompts(pages[3:5])
    l3 = {'id':'l3','title':'Listen & choose','instruction':'Listen and tick the box. There is one example.','images':[page_rel[4],page_rel[5]],
          'questions':make_questions('l3',l3_values,l3_prompts,list('ABC'))}
    l4_answers, example_color = colors_for_key(listen_parts[4], key_doc[key_index + 1])
    region_positions = [{'id':target,'x':COLOR_POSITIONS[target][0],'y':COLOR_POSITIONS[target][1]}
                        for target, _ in l4_answers]
    l4 = {'id':'l4','type':'colour','title':'Listen & colour','instruction':'Listen and colour. There is one example.',
          'image':color_rel,'regionPositions':region_positions,
          'questions':[{'id':f'l4-{i+1}','prompt':f'Question {i+1}','answer':{'target':target,'colour':color},'colour':True}
                       for i,(target,color) in enumerate(l4_answers)]}

    r1_values = numbered(read_parts[1],5);r1_prompts=question_prompts([pages[6]])
    r1={'id':'r1','title':'Look and read','instruction':'Look and read. Put a tick or a cross in the box. There are two examples.',
        'image':page_rel[7],'type':'binary','options':[['tick','✓','True'],['cross','✗','False']],
        'questions':make_questions('r1',r1_values,r1_prompts)}
    r2_values=numbered(read_parts[2],5);r2_prompts=question_prompts([pages[7]])
    r2={'id':'r2','title':'Read the picture','instruction':'Look and read. Write yes or no.','image':page_rel[8],'type':'binary',
        'options':[['yes','Yes','Yes'],['no','No','No']],'questions':make_questions('r2',r2_values,r2_prompts)}
    r3_values=numbered(read_parts[3],5)
    r3={'id':'r3','title':'Write the words','instruction':'Look at the pictures and letters. Write the words.','image':page_rel[9],'type':'text',
        'questions':make_questions('r3',r3_values)}
    r4_values=numbered(read_parts[4],5)
    r4={'id':'r4','title':'Complete the text','instruction':'Read the text. Choose a word from the box and write it next to each number.','image':page_rel[10],'type':'text',
        'questions':make_questions('r4',r4_values)}
    r5_values=numbered(read_parts[5],5);r5_prompts=question_prompts(pages[10:12])
    r5={'id':'r5','title':'Read the story','instruction':'Look at the pictures and read the questions. Write one-word answers.','images':[page_rel[11],page_rel[12]],'type':'text',
        'questions':make_questions('r5',r5_values,r5_prompts)}

    for part,expected in [(l1,5),(l2,5),(l3,5),(l4,5),(r1,5),(r2,5),(r3,5),(r4,5),(r5,5)]:
        if len(part['questions'])!=expected:raise ValueError(f'{test_id} {part["id"]}: wrong question count')
    if len(l4['questions'])!=5 or example_color in {q['answer']['target'] for q in l4['questions']}:
        raise ValueError(f'{test_id}: colour example overlaps a scored question')

    audio=[]
    for part in range(1,5):
        if hard:
            row=qa[(n,part)]
            source=audio_base/f'Test_{n}'/f'Part_{part}.mp3'
            if row['status']!='PASS' or round(source.stat().st_size/(1024*1024),2)!=round(float(row['size_mb']),2):
                raise ValueError(f'{test_id} Part {part}: audio failed supplied QA/size check')
            duration=float(row['duration_seconds']);qa_status=row['status']
        else:
            source=audio_base/'Individual_Parts'/f'WeWIN_Starters_Test_{audio_number:02}_Part_{part}.mp3'
            if not source.is_file() or source.stat().st_size<1_000_000:
                raise FileNotFoundError(f'Missing supplied Starters audio: {source}')
            duration=None;qa_status='SUPPLIED'
        relative=f'tests/{n:02}/listening-{part}.mp3';destination=SITE/'assets'/relative
        destination.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,destination)
        digest=hashlib.sha256(destination.read_bytes()).hexdigest()
        if not hard:
            ffprobe=shutil.which('ffprobe')
            if ffprobe:
                probe=subprocess.run([ffprobe,'-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(source)],capture_output=True,text=True)
                if probe.returncode:raise ValueError(f'Normal audio failed ffprobe: {source.name}')
                duration=float(probe.stdout.strip())
        audio.append(relative);audio_rows.append({'test':test_id,'part':part,'file':relative,'bytes':destination.stat().st_size,'durationSeconds':duration,'sha256':digest,'qa':qa_status})

    exam={'id':test_id,'number':f'{n:02}','title':title,'level':'Pre A1 Starters','audioMode':'parts','audioVersion':'20261023-starters-hard' if hard else '20261023-starters-new',
          'version':'2026-10-23-starters-hard-v1' if hard else '2026-10-23-starters-06-15-v1',
          'difficulty':'Hard' if hard else None,'cover':cover_rel,'audio':audio,
          'reading':[r1,r2,r3,r4,r5],'listening':[l1,l2,l3,l4]}
    if not hard:exam.pop('difficulty')
    return exam

def preserve_artwork():
    path=SITE/'exams.mjs';raw=path.read_text(encoding='utf-8')
    marker='export const artwork = '
    return json.JSONDecoder().raw_decode(raw.split(marker,1)[1].lstrip())[0]

normal_tests=[];hard_tests=[];audio_rows=[]
normal_answer_start=1
for offset,n in enumerate(range(6,16)):
    start=offset*14
    test=extract_exam(n,normal_pdf,normal_keys,normal_answer_start+offset*5,normal_audio,n-5,hard=False,page_start=start)
    normal_tests.append(test)
    print(f'Prepared Starters Mock {n:02}: {test["title"]}',flush=True)

for n in range(16,26):
    doc=fitz.open(hard_root/f'WeWIN_Starters_Hard_Mock_{n:02}.pdf')
    if len(doc)!=14:raise ValueError(f'Expected 14 pages for Hard Mock {n:02}, found {len(doc)}')
    test=extract_exam(n,doc,hard_keys,1+(n-16)*5,hard_audio,n,hard=True,qa=hard_part_qa)
    hard_tests.append(test);doc.close()
    print(f'Prepared Hard Starters Mock {n:02}: {test["title"]}',flush=True)

if len(normal_tests)!=10 or len(hard_tests)!=10 or len(audio_rows)!=80:
    raise ValueError('Expected 20 Starters tests with 80 supplied individual Part tracks.')
(SITE/'exams.mjs').write_text('export const exams = '+json.dumps(normal_tests,ensure_ascii=False,indent=2)+';\nexport const artwork = '+json.dumps(preserve_artwork(),ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(SITE/'starters-hard.mjs').write_text('export const startersHard = '+json.dumps(hard_tests,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
report={'normalTests':len(normal_tests),'hardTests':len(hard_tests),'parts':len(audio_rows),'bytes':sum(x['bytes'] for x in audio_rows),'allHardAudioPass':all(x['qa']=='PASS' for x in audio_rows if x['test'].startswith('starters-16') or int(x['test'].split('-')[1])>=16),'files':audio_rows}
(SITE/'generated'/'starters-audio-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Prepared 20 Starters tests with {len(audio_rows)} individual Part recordings ({report["bytes"]:,} bytes).')
