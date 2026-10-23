"""Import WeWIN Movers Hard mocks 16–25 and QA-approved Part audio."""
from pathlib import Path
import argparse, csv, hashlib, json, re, shutil
import fitz

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'demo-luyen-thi'
DEFAULT_PACK = ROOT.parent / 'WeWIN_Movers_Hard_16_25_Full_Pack'
DEFAULT_AUDIO = ROOT.parent / 'WeWIN_Movers_Hard_16_25_Full_Pack_Audio-20261023T085554Z-1-001' / 'WeWIN_Movers_Hard_16_25_Full_Pack_Audio'
parser = argparse.ArgumentParser()
parser.add_argument('--pack-dir', type=Path, default=DEFAULT_PACK)
parser.add_argument('--audio-dir', type=Path, default=DEFAULT_AUDIO)
args = parser.parse_args()
pack = args.pack_dir.resolve()
audio_root = args.audio_dir.resolve()
keys = fitz.open(pack / 'WeWIN_Movers_Hard_16_25_Answer_Keys.pdf')
if len(keys) != 32:
    raise ValueError(f'Expected 32 answer-key pages, found {len(keys)}')
with (audio_root / 'QA_Report' / 'audio_manifest.csv').open(encoding='utf-8-sig', newline='') as f:
    qa_rows = list(csv.DictReader(f))
part_rows = {(int(r['test_folder'].split('_')[1]), int(r['name'].split('_')[1].split('.')[0])): r
             for r in qa_rows if r['type'] == 'Part'}
if len(part_rows) != 50 or any(r['status'] != 'PASS' for r in part_rows.values()):
    raise ValueError('Expected 50 Part audio files with PASS status in the supplied QA report')

def compact(text):
    return re.sub(r'\s+', ' ', text).strip()

def section(text, start, end=None):
    if start not in text:
        raise ValueError(f'Missing answer-key section: {start}')
    body = text.split(start, 1)[1]
    return body.split(end, 1)[0] if end else body

def part_text(text, n):
    match = re.search(rf'(?<!\w)Part {n}\s+(.*?)(?=\s+Part \d+\s+|$)', text)
    if not match:
        raise ValueError(f'Missing Part {n} answer')
    return match.group(1).strip()

def numbered(text, count):
    found = re.findall(r'(?:^|;\s*)(\d+)\.\s*(.*?)(?=;\s*\d+\.|$)', compact(text))
    values = {int(n): value.strip().rstrip('.') for n, value in found}
    if set(values) != set(range(1, count + 1)):
        raise ValueError(f'Expected answers 1–{count}; found {sorted(values)} in {compact(text)[:220]}')
    return [values[i] for i in range(1, count + 1)]

def accepted(value):
    return list(dict.fromkeys(x.strip().rstrip('.') for x in re.split(r'\s*/\s*', value) if x.strip()))

def qlist(prefix, values, prompts=None, choices=None):
    result = []
    for i, raw in enumerate(values):
        variants = accepted(raw)
        q = {'id': f'{prefix}-{i + 1}', 'prompt': prompts[i] if prompts else f'Question {i + 1}', 'answer': variants[0]}
        if len(variants) > 1:
            q['accepted'] = variants
        if choices:
            q['choices'] = choices
        result.append(q)
    return result

def read_page(page, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), clip=fitz.Rect(30, 90, 565, 805), alpha=False).save(destination, jpg_quality=89)

def image_page(page, relative):
    destination = SITE / 'assets' / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), clip=fitz.Rect(page.get_image_info()[1]['bbox']), alpha=False).save(destination, jpg_quality=91)
    return relative

def title_choices(page):
    values = [(a, compact(b)) for a, b in re.findall(r'^\s*([ABC])\s+(.+?)\s*$', page.get_text(), re.M)]
    if len(values) != 3 or [letter for letter, _ in values] != list('ABC'):
        raise ValueError(f'Could not read story-title options: {values}')
    return [{'value': letter, 'label': f'{letter} · {label}'} for letter, label in values]

def story_answers(text):
    values = re.findall(r'(?<!\S)(\d+)\.\s*(.*?)\s+—', text)
    result = {int(n): compact(answer) for n, answer in values}
    if set(result) != set(range(1, 8)):
        raise ValueError(f'Expected seven Part 5 answers; found {sorted(result)}')
    return [result[i] for i in range(1, 8)]

def manual_samples(text):
    compact_text = compact(text)
    found = re.findall(r'(?:^|\s)([1-6])\.\s*(.*?)(?=\s+[1-6]\.\s|\s+Chấp nhận|$)', compact_text)
    result = {int(n): answer.strip().rstrip('.') for n, answer in found}
    if set(result) != set(range(1, 7)):
        raise ValueError(f'Expected six Part 6 sample answers; found {sorted(result)}')
    return [result[i] for i in range(1, 7)]

tests = []
audio_rows = []
for n in range(16, 26):
    pdf_path = pack / f'WeWIN_Movers_Hard_Mock_{n:02}.pdf'
    if not pdf_path.is_file():
        raise FileNotFoundError(pdf_path)
    doc = fitz.open(pdf_path)
    if len(doc) != 18:
        raise ValueError(f'{pdf_path.name}: expected 18 pages, found {len(doc)}')
    pages = [doc[i] for i in range(18)]
    key_first = compact(keys[2 + (n - 16) * 3].get_text())
    key_continued = compact(keys[3 + (n - 16) * 3].get_text())
    title = keys[2 + (n - 16) * 3].get_text().splitlines()[1].strip()
    test_id = f'movers-{n:02}'
    folder = SITE / 'assets' / 'movers' / f'{n:02}'
    folder.mkdir(parents=True, exist_ok=True)
    pages[0].get_pixmap(matrix=fitz.Matrix(1.2, 1.2), clip=fitz.Rect(40, 234.14, 555, 577.64), alpha=False).save(folder / 'cover.jpg', jpg_quality=88)
    page_files = {}
    for page_number in range(2, 16):
        relative = f'movers/{n:02}/page-{page_number:02}.jpg'
        read_page(pages[page_number - 1], SITE / 'assets' / relative)
        page_files[page_number] = relative

    # Listening Part 1: the example and names are printed around a shared picture.
    page1_text = pages[1].get_text()
    name_lines = [line.strip() for line in page1_text.split('Example:')[0].splitlines() if re.fullmatch(r'[A-Z][a-z]+', line.strip())]
    example_match = re.search(r'Example:\s*([A-Z][a-z]+)', page1_text)
    if len(name_lines) != 7 or not example_match or name_lines[0] != example_match.group(1):
        raise ValueError(f'{test_id}: expected seven people and a first-position example, got {name_lines}')
    listening_section = section(key_first, 'Listening · 25 marks', 'Reading & Writing · Parts 1–4')
    p1_answers = numbered(part_text(listening_section, 1), 5)
    match_key = {}
    for answer in p1_answers:
        m = re.match(r'([A-Z][a-z]+)\s*→', answer)
        if not m or m.group(1) not in name_lines:
            raise ValueError(f'{test_id}: invalid Part 1 mapping {answer}')
        match_key[m.group(1)] = f'p{name_lines.index(m.group(1)) + 1}'
    if len(match_key) != 5:
        raise ValueError(f'{test_id}: expected five Part 1 matches')
    p1 = {'title': 'Listen & match', 'images': [page_files[2]], 'type': 'match', 'exampleName': example_match.group(1), 'personOrder': name_lines, 'matchKey': match_key,
          'questions': [{'id': f'l1-{i + 1}', 'prompt': name, 'answer': target} for i, (name, target) in enumerate(match_key.items())]}

    p2_values = numbered(part_text(listening_section, 2), 5)
    p2_prompts = {int(i): compact(label) for i, label in re.findall(r'(?m)^\s*([1-5])\s+([^:\n]+):', pages[2].get_text())}
    if set(p2_prompts) != set(range(1, 6)):
        raise ValueError(f'{test_id}: cannot read five Part 2 prompts: {p2_prompts}')
    l2 = qlist('l2', p2_values, [p2_prompts[i] for i in range(1, 6)])

    p3_values = numbered(part_text(listening_section, 3), 5)
    p3_names = [name for name, _ in re.findall(r'\b([A-Z][a-z]+)\s+([1-5])\b', compact(pages[3].get_text())) if name != 'Part']
    if len(p3_names) != 5:
        raise ValueError(f'{test_id}: cannot read five Part 3 names: {p3_names}')
    l3 = qlist('l3', p3_values, p3_names, list('ABCDEFGH'))

    p4_values = numbered(part_text(listening_section, 4), 5)
    p4_prompts = {}
    for page in pages[4:6]:
        for i, prompt in re.findall(r'(?m)^\s*([1-5])\s+(.+\?)\s*$', page.get_text()):
            p4_prompts[int(i)] = compact(prompt)
    if set(p4_prompts) != set(range(1, 6)):
        raise ValueError(f'{test_id}: cannot read five Part 4 prompts: {p4_prompts}')
    l4 = qlist('l4', p4_values, [p4_prompts[i] for i in range(1, 6)], list('ABC'))

    paint_values = numbered(part_text(listening_section, 5), 5)
    l5 = []
    targets = ['the kite on the left', 'the hat on the bench', 'the bag next to the tree', 'the book on the blanket']
    for i, value in enumerate(paint_values[:4]):
        target, color = value.rsplit('→', 1)
        target, color = target.strip().lower(), color.strip().lower()
        if target not in targets:
            raise ValueError(f'{test_id}: unknown Part 5 coloring target {target}')
        l5.append({'id': f'l5-{i + 1}', 'prompt': f'Question {i + 1} · Choose the object and colour', 'answer': target + '|' + color, 'colour': True, 'targets': targets})
    word_match = re.match(r'\s*(\w+)\s+on the large sign', paint_values[4])
    if not word_match:
        raise ValueError(f'{test_id}: cannot read Part 5 sign word {paint_values[4]}')
    l5.append({'id': 'l5-5', 'prompt': 'Question 5 · Word on the sign', 'answer': word_match.group(1), 'targets': targets})
    p5 = {'title': 'Listen, colour & write', 'images': [page_files[7]], 'questions': l5}

    rw = section(key_first, 'Reading & Writing · Parts 1–4')
    rp = {i: part_text(rw, i) for i in range(1, 5)}
    reading = []
    for part_no, count, part_title in [(1, 5, 'Choose the words'), (2, 6, 'Read the conversation'), (3, 6, 'Complete the story'), (4, 5, 'Choose the right words')]:
        values = numbered(rp[part_no], count)
        choices = list('ABC') if part_no == 2 else None
        qs = qlist(f'r{part_no}', values, choices=choices)
        reading.append({'title': part_title, 'images': [page_files[part_no + 7]], 'questions': qs})
    reading[2]['questions'][5]['prompt'] = 'Question 6 · Best title for the story'
    reading[2]['questions'][5]['choices'] = title_choices(pages[9])
    part5_block = section(key_continued, 'Part 5 · Complete the story sentences', 'Part 6 · Suggested answers')
    r5_values = story_answers(part5_block)
    reading.append({'title': 'Complete the story sentences', 'images': [page_files[12], page_files[13], page_files[14]], 'questions': qlist('r5', r5_values)})
    samples = manual_samples(section(key_continued, 'Part 6 · Suggested answers'))
    reading.append({'title': 'Write about the picture', 'images': [page_files[15]], 'manual': True, 'questions': [{'id': f'r6-{i + 1}', 'prompt': f'Question {i + 1}', 'sample': sample} for i, sample in enumerate(samples)]})
    if sum(len(p['questions']) for p in reading if not p.get('manual')) != 29:
        raise ValueError(f'{test_id}: expected 29 auto-marked Reading answers')

    audio = []
    for part in range(1, 6):
        row = part_rows.get((n, part))
        source = audio_root / f'Test_{n}' / f'Part_{part}.mp3'
        if not row or row['status'] != 'PASS' or not source.is_file():
            raise ValueError(f'{test_id}: missing or failed audio {source}')
        if round(source.stat().st_size / (1024 * 1024), 2) != round(float(row['size_mb']), 2):
            raise ValueError(f'{test_id}: audio size differs from QA manifest for Part {part}')
        relative = f'movers/{n:02}/listening-{part}.mp3'
        destination = SITE / 'assets' / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)
        digest = hashlib.sha256(destination.read_bytes()).hexdigest()
        audio.append(relative)
        audio_rows.append({'test': test_id, 'part': part, 'file': relative, 'bytes': destination.stat().st_size, 'durationSeconds': float(row['duration_seconds']), 'sha256': digest, 'qa': row['status']})

    listening_parts = [p1, {'title': 'Listen & write', 'images': [page_files[3]], 'questions': l2},
                       {'title': 'Listen & match pictures', 'images': [page_files[4]], 'questions': l3},
                       {'title': 'Listen & choose', 'images': [page_files[5], page_files[6]], 'questions': l4}, p5]
    if sum(len(p['questions']) for p in listening_parts) != 25:
        raise ValueError(f'{test_id}: expected 25 auto-marked Listening answers')
    tests.append({'id': test_id, 'number': f'{n:02}', 'title': title, 'level': 'A1 Movers', 'difficulty': 'Hard', 'version': '2026-10-23-movers-hard-v1',
                  'cover': f'movers/{n:02}/cover.jpg', 'audio': audio, 'audioVersion': '20261023-movers-hard', 'reading': reading,
                  'listening': listening_parts})
    doc.close()

SITE.joinpath('movers-hard.mjs').write_text('export const moversHard = ' + json.dumps(tests, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
report = {'tests': len(tests), 'parts': len(audio_rows), 'allPass': all(x['qa'] == 'PASS' for x in audio_rows), 'audioBytes': sum(x['bytes'] for x in audio_rows), 'files': audio_rows}
(SITE / 'generated' / 'movers-hard-audio.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Prepared {len(tests)} Hard Movers tests, {len(audio_rows)} QA-approved Part tracks ({report["audioBytes"]:,} bytes).')
