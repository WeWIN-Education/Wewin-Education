"""Compress and import WEWIN STORYLAND 50 bilingual stories, WebP artwork, MP3 recordings, and word cues."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import json
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = Path(r'C:\Users\wewin2026\Downloads\WEWIN_STORYLAND_50_Stories_Source')
AUDIO_SOURCE_DIR = SOURCE_DIR / 'assets' / 'audio'
OUT_DATA_DIR = ROOT / 'storyland'
OUT_ASSETS_DIR = ROOT / 'assets' / 'storyland'
OUT_AUDIO_DIR = OUT_ASSETS_DIR / 'audio'

FFMPEG = shutil.which('ffmpeg') or r'C:\Users\wewin2026\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe'
if not Path(FFMPEG).is_file() and not shutil.which('ffmpeg'):
    raise SystemExit('ffmpeg is required to compress StoryLand audio files.')

OUT_DATA_DIR.mkdir(parents=True, exist_ok=True)
OUT_ASSETS_DIR.mkdir(parents=True, exist_ok=True)
OUT_AUDIO_DIR.mkdir(parents=True, exist_ok=True)

raw = json.loads((SOURCE_DIR / 'stories.json').read_text(encoding='utf-8'))
stories = raw.get('stories', [])
assets_map = raw.get('assets', {})
assert len(stories) == 50, f'Expected 50 stories, found {len(stories)}'
assert len(assets_map) == 956, f'Expected 956 scene assets, found {len(assets_map)}'

image_tasks = []
new_assets_map = {}
for key, rel_path in assets_map.items():
    src_img = SOURCE_DIR / rel_path
    assert src_img.is_file(), f'Missing source image: {src_img}'
    stem = Path(rel_path).stem
    webp_name = f'{stem}.webp'
    dst_img = OUT_ASSETS_DIR / webp_name
    new_assets_map[key] = f'assets/{webp_name}'
    image_tasks.append((src_img, dst_img))


def compress_image(pair):
    src_img, dst_img = pair
    orig_size = src_img.stat().st_size
    with Image.open(src_img) as im:
        im = im.convert('RGB')
        if im.width > 560 or im.height > 400:
            im.thumbnail((560, 400), Image.Resampling.LANCZOS)
        im.save(dst_img, 'WEBP', quality=68, method=6)
    return orig_size, dst_img.stat().st_size


audio_tasks = []
for story in stories:
    sid = story['id']
    src_mp3 = AUDIO_SOURCE_DIR / f'{sid}.mp3'
    src_cues = AUDIO_SOURCE_DIR / f'{sid}.cues.json'
    assert src_mp3.is_file(), f'Missing source MP3: {src_mp3}'
    assert src_cues.is_file(), f'Missing source cues: {src_cues}'
    dst_mp3 = OUT_AUDIO_DIR / f'{sid}.mp3'
    dst_cues = OUT_AUDIO_DIR / f'{sid}.cues.json'
    cues_obj = json.loads(src_cues.read_text(encoding='utf-8'))
    cues_list = cues_obj.get('cues') if isinstance(cues_obj, dict) else cues_obj
    assert isinstance(cues_list, list) and len(cues_list) > 0, f'Invalid cues for {sid}'
    dst_cues.write_text(json.dumps({'cues': cues_list}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    story.pop('wordCues', None)
    story['audioSrc'] = f'assets/storyland/audio/{sid}.mp3'
    story['cuesSrc'] = f'assets/storyland/audio/{sid}.cues.json'
    audio_tasks.append((src_mp3, dst_mp3))


def compress_audio(pair):
    src_mp3, dst_mp3 = pair
    orig_size = src_mp3.stat().st_size
    subprocess.run([
        FFMPEG, '-nostdin', '-v', 'error', '-y',
        '-i', str(src_mp3),
        '-map', '0:a:0', '-vn', '-map_metadata', '-1',
        '-ac', '1', '-ar', '24000',
        '-codec:a', 'libmp3lame', '-b:a', '32k',
        '-threads', '1', str(dst_mp3)
    ], check=True, capture_output=True)
    assert dst_mp3.stat().st_size > 1024, f'Empty output MP3: {dst_mp3}'
    return orig_size, dst_mp3.stat().st_size


with ThreadPoolExecutor(max_workers=12) as pool:
    img_stats = list(pool.map(compress_image, image_tasks))

with ThreadPoolExecutor(max_workers=8) as pool:
    aud_stats = list(pool.map(compress_audio, audio_tasks))

catalog_out = {
    'title': raw.get('title', 'WEWIN STORYLAND'),
    'subtitle': raw.get('subtitle', 'Stories for the Mind. Lessons for the Heart.'),
    'stories': stories,
    'assets': new_assets_map,
}
(OUT_DATA_DIR / 'data.json').write_text(
    json.dumps(catalog_out, ensure_ascii=False, separators=(',', ':')),
    encoding='utf-8'
)

orig_img_bytes = sum(x[0] for x in img_stats)
new_img_bytes = sum(x[1] for x in img_stats)
orig_aud_bytes = sum(x[0] for x in aud_stats)
new_aud_bytes = sum(x[1] for x in aud_stats)

report = {
    'stories': len(stories),
    'images': len(img_stats),
    'audioFiles': len(aud_stats),
    'originalImagesMB': round(orig_img_bytes / (1024 * 1024), 2),
    'compressedImagesMB': round(new_img_bytes / (1024 * 1024), 2),
    'originalAudioMB': round(orig_aud_bytes / (1024 * 1024), 2),
    'compressedAudioMB': round(new_aud_bytes / (1024 * 1024), 2),
    'totalSavedMB': round(((orig_img_bytes + orig_aud_bytes) - (new_img_bytes + new_aud_bytes)) / (1024 * 1024), 2),
}
(ROOT / 'tools' / 'storyland-import-report.json').write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + '\n',
    encoding='utf-8'
)
print(json.dumps(report, ensure_ascii=False))
