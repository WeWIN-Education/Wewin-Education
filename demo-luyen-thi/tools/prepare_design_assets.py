"""Add the approved 24 October backgrounds to the responsive WebP manifest."""
from pathlib import Path
from PIL import Image, ImageOps
import json

root=Path(__file__).resolve().parents[1]
assets=root/'assets'
manifest_path=root/'media-manifest.mjs'
manifest=json.loads(manifest_path.read_text(encoding='utf-8').removeprefix('export default ').strip().removesuffix(';'))
report=[]
for name,widths in [('learning-world',[480,960,1440]),('study-corner',[320,640,960])]:
    source=f'design-20261024/{name}.png'
    with Image.open(assets/source) as image:
        image=ImageOps.exif_transpose(image).convert('RGB')
        variants=[]
        for width in widths:
            width=min(width,image.width)
            size=(width,round(image.height*width/image.width))
            relative=f'optimized/design-20261024/{name}-{width}.webp'
            destination=assets/relative
            destination.parent.mkdir(parents=True,exist_ok=True)
            image.resize(size,Image.Resampling.LANCZOS).save(destination,'WEBP',quality=84,method=6)
            variants.append({'file':relative,'width':size[0],'height':size[1],'bytes':destination.stat().st_size})
        manifest['images'][source]={'width':image.width,'height':image.height,'variants':variants}
        manifest['files']=sorted(set(manifest['files'])|{v['file'] for v in variants})
        report.append({'source':source,'sourceBytes':(assets/source).stat().st_size,'variants':variants})
manifest_path.write_text('export default '+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
(root/'generated/design-20261024-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
