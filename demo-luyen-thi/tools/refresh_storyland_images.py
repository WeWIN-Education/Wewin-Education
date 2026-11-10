"""Keep native detail; create optional 2x display images without inventing content."""
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageFilter
import json

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(r'C:\Users\wewin2026\Downloads\WEWIN_STORYLAND_50_Stories_Source')
OUT = ROOT / 'assets/storyland/artwork-v2'
OUT.mkdir(parents=True, exist_ok=True)
source = json.loads((SOURCE / 'stories.json').read_text(encoding='utf-8'))
data_path = ROOT / 'storyland/data.json'
data = json.loads(data_path.read_text(encoding='utf-8'))

def prepare(item):
    key, rel = item
    original = (SOURCE / rel).read_bytes()
    with Image.open(BytesIO(original)) as image:
        image = image.convert('RGB')
        width, height = image.size
        encoded = BytesIO()
        image.save(encoded, 'WEBP', quality=82, method=6)
        webp = encoded.getvalue()
        # Use the supplied JPEG when transcoding would increase bytes.
        payload, ext = (webp, 'webp') if len(webp) < len(original) else (original, 'jpg')
        name = f'{key}.{ext}'
        (OUT / name).write_bytes(payload)
        meta = {'w': width, 'h': height, 'sourceW': width, 'sourceH': height}
        enhanced_bytes = 0
        if width < 520:
            enhanced = image.resize((width * 2, height * 2), Image.Resampling.LANCZOS)
            enhanced = enhanced.filter(ImageFilter.UnsharpMask(radius=1, percent=85, threshold=3))
            large_name = f'{key}-2x.webp'
            enhanced.save(OUT / large_name, 'WEBP', quality=85, method=6)
            meta.update(src2x=f'assets/artwork-v2/{large_name}', w2x=width * 2, h2x=height * 2)
            enhanced_bytes = (OUT / large_name).stat().st_size
        return key, f'assets/artwork-v2/{name}', meta, len(original), len(payload), enhanced_bytes

with ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(prepare, source['assets'].items()))

data['assets'] = {key: rel for key, rel, *_ in results}
data['assetMeta'] = {key: meta for key, _, meta, *_ in results}
data_path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
report = {
    'images': len(results),
    'nativeOriginalBytes': sum(row[3] for row in results),
    'nativePublishedBytes': sum(row[4] for row in results),
    'enhancedImages': sum(bool(row[5]) for row in results),
    'enhancedBytes': sum(row[5] for row in results),
    'method': 'Original JPEG or WebP quality 82, whichever is smaller; optional Lanczos 2x plus mild unsharp mask, WebP quality 85. No AI detail reconstruction.',
}
(ROOT / 'tools/storyland-image-refresh-report.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report))
