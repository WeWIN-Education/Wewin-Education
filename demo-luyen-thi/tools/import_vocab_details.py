"""Import the supplied workbook and per-word recordings without changing Unit order."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from openpyxl import load_workbook
import argparse
import hashlib
import json
import shutil
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--workbook', type=Path, required=True)
parser.add_argument('--audio', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
ffmpeg = shutil.which('ffmpeg')
if not ffmpeg:
    raise SystemExit('ffmpeg is required to prepare browser-compatible MP3 recordings.')

workbook = load_workbook(args.workbook, read_only=True, data_only=True)
sheet = workbook['Tất cả từ vựng']
rows = list(sheet.values)
assert rows[0][5:10] == ('Từ vựng tiếng Anh', 'Phiên âm IPA (UK)', 'Nghĩa tiếng Việt', 'Câu ví dụ tiếng Anh', 'Dịch nghĩa câu ví dụ')
details = {}
for row in rows[1:]:
    if not row[5]:
        continue
    level = row[1].lower().removeprefix('pre-')
    key = (level, str(row[2]), row[5])
    assert key not in details, f'Duplicate workbook entry: {key}'
    assert all(isinstance(row[i], str) and row[i].strip() for i in [6, 7, 8, 9]), f'Incomplete entry: {key}'
    details[key] = row

conversions, prepared, matched = [], {}, set()
for level in ['starters', 'movers', 'flyers']:
    path = root / f'vocab-data/{level}.mjs'
    units = json.loads(path.read_text(encoding='utf-8').removeprefix('export default ').rstrip(';\n'))
    audio_catalog = json.loads((args.audio / f'Pre-{level.title()}/vocabulary.json').read_text(encoding='utf-8'))
    recordings = {(str(w['unit_code']), w['word']): w for u in audio_catalog['units'].values() for w in u['words']}
    assert len(recordings) == audio_catalog['total_words']
    for unit in units:
        for word in unit['words']:
            key = (level, unit['id'], word['en'])
            row = details[key]
            recording = recordings[(unit['id'], word['en'])]
            assert row[7] == word['vi'], f'Meaning changed: {key}'
            assert (row[6], row[8], row[9]) == (recording['ipa'], recording['example'], recording['example_vi']), f'Workbook/audio mismatch: {key}'
            source = (args.audio / recording['rel_path_by_unit']).resolve()
            assert source.is_relative_to(args.audio.resolve()) and source.is_file(), f'Missing recording: {key}'
            relative = f'vocab-audio/{level}/{int(recording["stt"]):03}.mp3'
            target = root / 'assets' / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            conversions.append((source, target))
            word.update(ipa=row[6], example=row[8], exampleVi=row[9], audio=relative)
            matched.add(key)
    prepared[level] = units
assert matched == set(details), 'The workbook and the website must contain exactly the same entries.'
assert len({target for _, target in conversions}) == len(conversions)

def convert(pair):
    source, target = pair
    subprocess.run([ffmpeg, '-nostdin', '-v', 'error', '-y', '-i', str(source), '-map', '0:a:0', '-vn', '-map_metadata', '-1', '-ac', '1', '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '64k', '-threads', '1', str(target)], check=True, capture_output=True)
    assert target.stat().st_size > 256, f'Empty recording: {target.name}'

with ThreadPoolExecutor(max_workers=8) as pool:
    list(pool.map(convert, conversions))
for level, units in prepared.items():
    (root / f'vocab-data/{level}.mjs').write_text('export default ' + json.dumps(units, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
report = {
    'sourceWorkbook': args.workbook.name,
    'sourceSha256': hashlib.sha256(args.workbook.read_bytes()).hexdigest(),
    'entries': len(matched),
    'audioFiles': len(conversions),
    'missingDetails': 0,
    'missingAudio': 0,
    'collections': {level: sum(len(u['words']) for u in units) for level, units in prepared.items()},
}
(root / 'tools/vocab-import-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False))
