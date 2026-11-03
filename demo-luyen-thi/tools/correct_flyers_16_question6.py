"""Correct only Mock 16 Reading Part 5 question 6; keep the scoring key unchanged."""
from pathlib import Path
from PIL import Image
import argparse
import copy
import json
import fitz

parser = argparse.ArgumentParser()
parser.add_argument('--source', type=Path, required=True)
parser.add_argument('--font', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
prompt = 'Instead of doing everything together, the helpers ______.'
old_sentence = 'The children prepared faster after they ________________________ .'
new_sentence = 'Instead of doing everything together, the helpers ________________________ .'

# Edit the PDF text in memory, then render the existing question-page asset.
# The supplied PDF and every other question remain untouched.
doc = fitz.open(args.source)
page = doc[12]
spans = [s for b in page.get_text('dict')['blocks'] for line in b.get('lines', []) for s in line['spans'] if s['text'] == old_sentence]
assert len(spans) == 1, 'Expected the original question 6 exactly once.'
span = spans[0]
font_buffer = args.font.read_bytes()
font = fitz.Font(fontbuffer=font_buffer)
assert 'dejavusans' in font.name.replace(' ', '').lower()
assert span['origin'][0] + font.text_length(new_sentence, fontsize=span['size']) < 570
box = fitz.Rect(span['bbox']) + (-0.3, -0.5, 0.3, 1.5)
page.add_redact_annot(box, fill=(1, 1, 1))
page.apply_redactions()
page.insert_font(fontname='WeWINCorrected', fontbuffer=font_buffer)
color = tuple(((span['color'] >> shift) & 255) / 255 for shift in [16, 8, 0])
page.insert_text(span['origin'], new_sentence, fontname='WeWINCorrected', fontsize=span['size'], color=color)
assert old_sentence not in page.get_text()
assert new_sentence in page.get_text()
path = 'flyers/16/page-13.jpg'
page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), clip=fitz.Rect(25, 85, 570, 805), alpha=False).save(root / 'assets' / path, jpg_quality=89)

def correct_exam(exams):
    before = copy.deepcopy(exams)
    exam = next(e for e in exams if e['id'] == 'flyers-16')
    question = exam['reading'][4]['questions'][5]
    assert question['id'] == 'r5-6'
    if 'answer' in question:
        assert question['answer'] == 'divided the jobs'
        assert question['accepted'] == ['divided the jobs']
    question['prompt'] = prompt
    check = copy.deepcopy(exams)
    next(e for e in check if e['id'] == 'flyers-16')['reading'][4]['questions'][5]['prompt'] = next(e for e in before if e['id'] == 'flyers-16')['reading'][4]['questions'][5]['prompt']
    assert check == before, 'Unexpected changes outside question 6.'
    return exams

for filename, prefix, indent in [('flyers-hard.mjs', 'export const flyersHard = ', 2), ('public-data.mjs', 'export const allExams = ', None)]:
    file = root / filename
    raw = file.read_text(encoding='utf-8')
    start = raw.index(prefix) + len(prefix)
    data, end = json.JSONDecoder().raw_decode(raw[start:])
    file.write_text(raw[:start] + json.dumps(correct_exam(data), ensure_ascii=False, indent=indent) + raw[start + end:], encoding='utf-8')
for filename in ['generated/exams-private.json', 'generated/exams-public.json']:
    file = root / filename
    file.write_text(json.dumps(correct_exam(json.loads(file.read_text(encoding='utf-8'))), ensure_ascii=False), encoding='utf-8')

file = root / 'media-manifest.mjs'
raw = file.read_text(encoding='utf-8')
manifest = json.loads(raw.removeprefix('export default ').rstrip(';\n'))
entry = manifest['images'][path]
files = set(manifest['files']) - {v['file'] for v in entry['variants']}
im = Image.open(root / 'assets' / path).convert('RGB')
assert im.size == (entry['width'], entry['height'])
variants = []
for old in entry['variants']:
    width, height = old['width'], old['height']
    relative = f'optimized/flyers/16/page-13-q6-20261103-{width}.webp'
    destination = root / 'assets' / relative
    im.resize((width, height), Image.Resampling.LANCZOS).save(destination, 'WEBP', quality=92, method=6)
    variants.append({'file': relative, 'width': width, 'height': height, 'bytes': destination.stat().st_size})
    files.add(relative)
entry['variants'] = variants
manifest['files'] = sorted(files)
file.write_text('export default ' + json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
print('Corrected Mock 16 / Reading Part 5 / question 6. All other questions, answers, versions and scores are unchanged.')
