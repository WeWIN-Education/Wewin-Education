"""Build WebP variants and real atlas crops; keep editorial originals untouched."""
from pathlib import Path
from PIL import Image, ImageChops, ImageOps
import json, hashlib, math

SITE=Path(__file__).resolve().parents[1]
ASSETS=SITE/'assets'
DEST=ASSETS/'optimized'
DEST.mkdir(exist_ok=True)
exams=json.loads((SITE/'generated/exams-public.json').read_text(encoding='utf-8'))
private=json.loads((SITE/'generated/exams-private.json').read_text(encoding='utf-8'))
artwork=json.loads((SITE/'generated/artwork.json').read_text(encoding='utf-8'))
direct=set(['logo.png','win.png']+[f'design-20261021/{x}.webp' for x in ['hero','starters','movers','flyers']])
direct.update(f'design-20261024/{name}.png' for name in ['learning-world','study-corner'])
specs={}

def art_key(spec):
    return spec['file']+'|'+','.join(str(math.floor(v*1000+.5)) for v in spec['clip'])

def walk(value):
    if isinstance(value,dict):
        if 'file' in value and 'clip' in value:
            specs[art_key(value)]=value
        else:
            for item in value.values():walk(item)
    elif isinstance(value,list):
        for item in value:walk(item)
    elif isinstance(value,str) and value.lower().endswith(('.png','.jpg','.jpeg','.webp')):
        direct.add(value)

walk(exams)
walk(artwork)
for exam in private:
    for part in exam['reading']:
        direct.update(part.get('writingImages',[]))

images={};arts={};outputs=set();before=0;largest_after=0

def encode(im,stem,width,quality=86,lossless=False):
    im=ImageOps.exif_transpose(im)
    if im.mode not in ['RGB','RGBA']:im=im.convert('RGBA' if 'transparency' in im.info else 'RGB')
    width=min(width,im.width)
    height=max(1,round(im.height*width/im.width))
    if im.size!=(width,height):im=im.resize((width,height),Image.Resampling.LANCZOS)
    relative=f'optimized/{stem}-{width}.webp'
    file=ASSETS/relative;file.parent.mkdir(parents=True,exist_ok=True)
    im.save(file,'WEBP',quality=quality,method=6,lossless=lossless)
    outputs.add(relative)
    return {'file':relative,'width':width,'height':height,'bytes':file.stat().st_size}

def variants(im,stem,maximum=1440,quality=86,lossless=False):
    maximum=min(maximum,im.width)
    sizes=[s for s in [480,960] if s<maximum*.85]+[maximum]
    return [encode(im,stem,s,quality,lossless) for s in sizes]

for path in sorted(direct):
    file=ASSETS/path
    if not file.is_file():raise ValueError(f'Missing active image: {path}')
    before+=file.stat().st_size
    with Image.open(file) as source:
        im=ImageOps.exif_transpose(source).copy()
    cap=384 if path=='logo.png' else 520 if path=='win.png' else 960 if path.endswith('/cover.jpg') else 1440
    # Text pages retain all source detail; charts/interaction coordinates retain aspect ratio.
    quality=92 if '/page-' in path or '-paint.' in path else 88
    entry=variants(im,Path(path).with_suffix('').as_posix(),cap,quality,path=='logo.png')
    images[path]={'width':im.width,'height':im.height,'variants':entry}
    largest_after+=entry[-1]['bytes']

for key,spec in sorted(specs.items()):
    with Image.open(ASSETS/spec['file']) as source:
        x,y,r,b=spec['clip']
        scale_x=source.width/spec['width'];scale_y=source.height/spec['height']
        crop=source.convert('RGB').crop((math.floor(x*scale_x),math.floor(y*scale_y),math.ceil(r*scale_x),math.ceil(b*scale_y)))
    # Remove only surrounding white margins within the approved crop, then add equal breathing room.
    diff=ImageChops.difference(crop,Image.new('RGB',crop.size,'white')).convert('L').point(lambda p:255 if p>15 else 0)
    bounds=diff.getbbox()
    if not bounds:raise ValueError('Empty artwork crop: '+key)
    crop=crop.crop(bounds)
    pad=max(8,round(max(crop.size)*.055))
    canvas=Image.new('RGB',(crop.width+2*pad,crop.height+2*pad),'white');canvas.paste(crop,(pad,pad))
    stem='art/'+hashlib.sha256(key.encode()).hexdigest()[:14]
    arts[key]={'width':canvas.width,'height':canvas.height,'variants':variants(canvas,stem,960,90)}

logo=Image.open(ASSETS/'logo.png').convert('RGBA')
favicon=DEST/'ui/favicon.webp';favicon.parent.mkdir(exist_ok=True)
logo.thumbnail((192,64),Image.Resampling.LANCZOS);logo.save(favicon,'WEBP',lossless=True,method=6);outputs.add('optimized/ui/favicon.webp')
manifest={'images':images,'art':arts,'files':sorted(outputs)}
(SITE/'media-manifest.mjs').write_text('export default '+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
atlas_files={spec['file'] for spec in specs.values()}
baseline=before+sum((ASSETS/p).stat().st_size for p in atlas_files-direct)
report={'sourceImages':len(direct),'individualCrops':len(arts),'webpFiles':len(outputs),'activeOriginalBytes':baseline,'largestVariantsBytes':largest_after+sum(v['variants'][-1]['bytes'] for v in arts.values()),'allResponsiveVariantsBytes':sum((ASSETS/p).stat().st_size for p in outputs),'allOriginalRasterBytes':sum(p.stat().st_size for p in ASSETS.rglob('*') if p.suffix.lower() in ['.jpg','.png','.webp'] and DEST not in p.parents)}
(SITE/'generated/image-optimization-report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
