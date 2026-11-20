"""Regenerate all 50 WEWIN STORYLAND MP3s and word-level .cues.json using en-GB-RyanNeural (pitch -8Hz, rate -6%)."""
from __future__ import annotations

import argparse
import asyncio
import json
import re
import shutil
import subprocess
import time
import unicodedata
from pathlib import Path

import edge_tts
import numpy as np

import os
import tempfile

ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / 'storyland' / 'data.json'
OUT_AUDIO_DIR = ROOT / 'assets' / 'storyland' / 'audio'
CACHE_DIR = Path(os.environ.get('STORYLAND_TTS_CACHE', Path(tempfile.gettempdir()) / 'wewin-storyland-ryan-n04'))

VOICE = 'en-GB-RyanNeural'
PITCH = '-8Hz'
RATE = '-6%'
SAMPLE_RATE = 24000
SCENE_GAP_SEC = 0.62
TARGET_RMS = 0.125
MAX_PEAK = 0.88
BITRATE = '48k'
FADE_SAMPLES = 240  # 10ms fade at 24kHz

FFMPEG = shutil.which('ffmpeg') or r'C:\Users\wewin2026\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe'
FFPROBE = shutil.which('ffprobe') or str(Path(FFMPEG).with_name('ffprobe.exe'))
if not Path(FFMPEG).is_file() and not shutil.which('ffmpeg'):
    raise SystemExit('ffmpeg is required.')


def norm_alnum(text: str) -> str:
    nfd = unicodedata.normalize('NFKD', text.lower())
    stripped = ''.join(ch for ch in nfd if not unicodedata.combining(ch))
    return re.sub(r'[^a-z0-9]', '', stripped.replace('đ', 'd'))


def decode_pcm(mp3_bytes_or_path: bytes | Path) -> np.ndarray:
    cmd = [FFMPEG, '-nostdin', '-v', 'error']
    if isinstance(mp3_bytes_or_path, Path):
        cmd += ['-i', str(mp3_bytes_or_path), '-ar', str(SAMPLE_RATE), '-ac', '1', '-f', 'f32le', 'pipe:1']
        proc = subprocess.run(cmd, check=True, capture_output=True)
    else:
        cmd += ['-f', 'mp3', '-i', 'pipe:0', '-ar', str(SAMPLE_RATE), '-ac', '1', '-f', 'f32le', 'pipe:1']
        proc = subprocess.run(cmd, input=mp3_bytes_or_path, check=True, capture_output=True)
    return np.frombuffer(proc.stdout, dtype=np.float32).copy()


def align_scene_words(scene_text: str, wb_events: list[dict], lead_trim_sec: float, scene_dur_sec: float, base_offset_sec: float, scene_idx: int) -> list[dict]:
    tokens = [m.group(0) for m in re.finditer(r'\S+', scene_text)]
    if not tokens:
        return []

    def wb_span(wb: dict) -> tuple[float, float]:
        s = max(0.0, wb['offset'] / 1e7 - lead_trim_sec)
        e = max(s + 0.02, (wb['offset'] + wb['duration']) / 1e7 - lead_trim_sec)
        s = min(s, scene_dur_sec)
        e = min(max(s, e), scene_dur_sec)
        return s, e

    cues: list[dict] = []
    if len(tokens) == len(wb_events):
        for word_idx, wb in enumerate(wb_events):
            s, e = wb_span(wb)
            cues.append({
                'scene': scene_idx,
                'word': word_idx,
                'start': round(base_offset_sec + s, 3),
                'end': round(base_offset_sec + e, 3),
            })
        return cues

    # Flexible alignment when TTS splits or merges tokens (numbers, contractions, hyphens)
    j = 0
    n_wb = len(wb_events)
    last_end = 0.0
    for word_idx, tok in enumerate(tokens):
        ntok = norm_alnum(tok)
        if not ntok:
            s = last_end
            e = min(scene_dur_sec, s + 0.05)
        elif j < n_wb:
            s, e = wb_span(wb_events[j])
            acc = norm_alnum(wb_events[j]['text'])
            j += 1
            # Absorb multi-part WordBoundary chunks for a single whitespace token (e.g., twenty-one or 100)
            while j < n_wb and acc and len(acc) < len(ntok) and ntok.startswith(acc):
                _, next_e = wb_span(wb_events[j])
                acc += norm_alnum(wb_events[j]['text'])
                e = max(e, next_e)
                j += 1
        else:
            s = last_end
            e = min(scene_dur_sec, s + 0.08)
        s = max(last_end, s)
        e = max(s, e)
        last_end = e
        cues.append({
            'scene': scene_idx,
            'word': word_idx,
            'start': round(base_offset_sec + s, 3),
            'end': round(base_offset_sec + e, 3),
        })
    return cues


async def synth_scene(sem: asyncio.Semaphore, story_id: str, scene_idx: int, text: str) -> tuple[Path, Path]:
    story_cache = CACHE_DIR / story_id
    story_cache.mkdir(parents=True, exist_ok=True)
    mp3_cache = story_cache / f'scene-{scene_idx:02d}.mp3'
    wb_cache = story_cache / f'scene-{scene_idx:02d}.wb.json'

    if mp3_cache.is_file() and mp3_cache.stat().st_size > 256 and wb_cache.is_file():
        return mp3_cache, wb_cache

    async with sem:
        last_err = None
        for attempt in range(4):
            try:
                comm = edge_tts.Communicate(text, voice=VOICE, pitch=PITCH, rate=RATE, boundary='WordBoundary')
                audio_buf = bytearray()
                wbs = []
                async for chunk in comm.stream():
                    ctype = chunk.get('type')
                    if ctype == 'audio':
                        audio_buf.extend(chunk['data'])
                    elif ctype == 'WordBoundary':
                        wbs.append({
                            'offset': int(chunk['offset']),
                            'duration': int(chunk['duration']),
                            'text': chunk['text'],
                        })
                if len(audio_buf) < 256 or not wbs:
                    raise RuntimeError(f'Empty TTS result for {story_id} scene {scene_idx}')
                mp3_cache.write_bytes(bytes(audio_buf))
                wb_cache.write_text(json.dumps(wbs, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
                return mp3_cache, wb_cache
            except Exception as exc:
                last_err = exc
                await asyncio.sleep(0.8 * (attempt + 1))
        raise RuntimeError(f'Failed TTS for {story_id} scene {scene_idx}: {last_err}')


async def process_story(sem: asyncio.Semaphore, story: dict) -> dict:
    sid = story['id']
    scenes = story['scenes']
    scene_files = await asyncio.gather(*[
        synth_scene(sem, sid, idx, sc['en']) for idx, sc in enumerate(scenes)
    ])

    pcm_parts: list[np.ndarray] = []
    all_cues: list[dict] = []
    gap_samples = round(SCENE_GAP_SEC * SAMPLE_RATE)
    silence_gap = np.zeros(gap_samples, dtype=np.float32)
    cur_sample = 0

    for idx, ((mp3_p, wb_p), sc) in enumerate(zip(scene_files, scenes)):
        pcm = decode_pcm(mp3_p)
        wbs = json.loads(wb_p.read_text(encoding='utf-8'))

        active = np.where(np.abs(pcm) > 0.0025)[0]
        first_wb_sample = round((wbs[0]['offset'] / 1e7) * SAMPLE_RATE) if wbs else 0
        last_wb_sample = round(((wbs[-1]['offset'] + wbs[-1]['duration']) / 1e7) * SAMPLE_RATE) if wbs else len(pcm)

        lead_ref = min(int(active[0]) if len(active) else first_wb_sample, first_wb_sample)
        trim_start = max(0, lead_ref - round(0.05 * SAMPLE_RATE))

        tail_ref = max(int(active[-1]) if len(active) else last_wb_sample, last_wb_sample)
        trim_end = min(len(pcm), tail_ref + round(0.06 * SAMPLE_RATE))
        if trim_end <= trim_start:
            trim_start, trim_end = 0, len(pcm)

        seg = pcm[trim_start:trim_end].copy()
        fade = min(FADE_SAMPLES, len(seg) // 10)
        if fade > 1:
            seg[:fade] *= np.linspace(0.0, 1.0, fade, dtype=np.float32)
            seg[-fade:] *= np.linspace(1.0, 0.0, fade, dtype=np.float32)

        lead_trim_sec = trim_start / SAMPLE_RATE
        seg_dur_sec = len(seg) / SAMPLE_RATE
        base_offset_sec = cur_sample / SAMPLE_RATE

        scene_cues = align_scene_words(sc['en'], wbs, lead_trim_sec, seg_dur_sec, base_offset_sec, idx)
        all_cues.extend(scene_cues)

        pcm_parts.append(seg)
        cur_sample += len(seg)
        if idx < len(scenes) - 1:
            pcm_parts.append(silence_gap)
            cur_sample += gap_samples
        else:
            tail_pad = np.zeros(round(0.08 * SAMPLE_RATE), dtype=np.float32)
            pcm_parts.append(tail_pad)
            cur_sample += len(tail_pad)

    full = np.concatenate(pcm_parts)
    # Normalize story loudness uniformly using non-silent active speech RMS
    speech = full[np.abs(full) > 0.004]
    cur_rms = float(np.sqrt(np.mean(speech ** 2))) if len(speech) > 0 else float(np.sqrt(np.mean(full ** 2)))
    if cur_rms > 1e-5:
        gain = TARGET_RMS / cur_rms
        peak_after = float(np.max(np.abs(full))) * gain
        if peak_after > MAX_PEAK:
            gain = MAX_PEAK / float(np.max(np.abs(full)))
        full *= gain

    OUT_AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    out_mp3 = OUT_AUDIO_DIR / f'{sid}.mp3'
    out_cues = OUT_AUDIO_DIR / f'{sid}.cues.json'

    subprocess.run([
        FFMPEG, '-nostdin', '-v', 'error', '-y',
        '-f', 'f32le', '-ar', str(SAMPLE_RATE), '-ac', '1', '-i', 'pipe:0',
        '-map_metadata', '-1', '-ac', '1', '-ar', str(SAMPLE_RATE),
        '-codec:a', 'libmp3lame', '-b:a', BITRATE, '-threads', '1', str(out_mp3),
    ], input=full.astype(np.float32).tobytes(), check=True, capture_output=True)

    # Decode verification to ensure zero broken frames and accurate total duration
    subprocess.run([FFMPEG, '-nostdin', '-v', 'error', '-i', str(out_mp3), '-f', 'null', '-'], check=True, capture_output=True)
    final_dur = float(subprocess.check_output([
        FFPROBE, '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(out_mp3)
    ], text=True).strip())

    # Clamp final cue end cleanly inside encoded MP3 duration
    for cue in all_cues:
        cue['start'] = min(cue['start'], max(0.0, round(final_dur - 0.02, 3)))
        cue['end'] = min(max(cue['start'], cue['end']), round(final_dur, 3))

    out_cues.write_text(json.dumps({'cues': all_cues}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    return {
        'id': sid,
        'scenes': len(scenes),
        'cues': len(all_cues),
        'expectedWords': sum(len(sc['en'].split()) for sc in scenes),
        'durationSec': round(final_dur, 2),
        'bytes': out_mp3.stat().st_size,
    }


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--story', action='append', help='Specific story ID(s) to regenerate')
    parser.add_argument('--concurrency', type=int, default=10)
    args = parser.parse_args()

    catalog = json.loads(DATA_PATH.read_text(encoding='utf-8'))
    stories = catalog['stories']
    if args.story:
        wanted = set(args.story)
        stories = [s for s in stories if s['id'] in wanted]
        if not stories:
            raise SystemExit(f'No matching story IDs: {args.story}')

    sem = asyncio.Semaphore(args.concurrency)
    started = time.monotonic()
    reports = []
    for idx, story in enumerate(stories, 1):
        res = await process_story(sem, story)
        reports.append(res)
        print(
            f"[{idx}/{len(stories)}] {res['id']}: {res['durationSec']}s, {res['cues']}/{res['expectedWords']} words, {round(res['bytes']/1024, 1)} KB",
            flush=True,
        )

    total_bytes = sum(r['bytes'] for r in reports)
    total_dur = sum(r['durationSec'] for r in reports)
    summary = {
        'voice': VOICE,
        'pitch': PITCH,
        'rate': RATE,
        'bitrate': BITRATE,
        'audioVersion': '20261120-ryan-n04',
        'stories': len(reports),
        'totalMB': round(total_bytes / (1024 * 1024), 2),
        'totalMinutes': round(total_dur / 60, 2),
        'elapsedSeconds': round(time.monotonic() - started, 1),
    }
    if not args.story:
        catalog['audioVersion'] = summary['audioVersion']
        DATA_PATH.write_text(json.dumps(catalog, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print('SUMMARY:', json.dumps(summary, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    asyncio.run(main())
