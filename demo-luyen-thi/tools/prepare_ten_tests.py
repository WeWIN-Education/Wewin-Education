"""Import ten source exams/keys and approved artwork into the static practice site."""
from pathlib import Path
import ast
import csv
import json
import re
import shutil
import fitz

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT/'demo-luyen-thi'
PACKAGE = ROOT/'WeWIN_Starters_Cartoon_Full_10TestsPackage/pdf'
BATCH = ROOT/'output/pdf/WeWIN_Starters_Tests_02-10_Illustrated'
FIRST = ROOT/'output/pdf/WeWIN_Starters_Test_01_Images'
MP3 = Path(r'C:\Users\wewin2026\Downloads\STARTERS_10_Practice_Tests_AUDIO-20261015T094657Z-1-001\STARTERS_10_Practice_Tests_AUDIO')
SCRIPTS = ROOT/'WeWIN_Starters_Listening_Scripts_TTS_10 TestsPackage'
SHARED = SITE/'assets/shared'
SHARED.mkdir(parents=True,exist_ok=True)
for asset in (BATCH/'assets').glob('*.png'):
    shutil.copy2(asset,SHARED/asset.name)
for name in ['reading-speaking-scene-v2.png','story-three-panels-v2.png']:
    shutil.copy2(FIRST/'assets'/name,SHARED/name)

# Recover the same object regions already verified in the PDF authoring workflow.
constants = {}
tree = ast.parse((BATCH/'build_pdfs.py').read_text(encoding='utf-8'))
for node in tree.body:
    if isinstance(node,ast.Assign) and isinstance(node.targets[0],ast.Name):
        name = node.targets[0].id
        if name in ['OBJECT_BOXES','EXTRA_BOXES','OBJECT_NAMES','VOCAB_NAMES','EXTRA_NAMES']:
            constants[name]=ast.literal_eval(node.value)
artwork={}
for key,file in [('OBJECT','listening-objects-v2.png'),('EXTRA','additional-objects-v2.png')]:
    pix=fitz.Pixmap(SHARED/file)
    for name,clip in zip(constants[key+'_NAMES'],constants[key+'_BOXES']):
        artwork[name]={'file':'shared/'+file,'width':pix.width,'height':pix.height,'clip':clip}
pix=fitz.Pixmap(SHARED/'vocabulary-objects-v2.png')
for i,name in enumerate(constants['VOCAB_NAMES']):
    artwork[name]={'file':'shared/vocabulary-objects-v2.png','width':pix.width,'height':pix.height,
                   'clip':[(i%4)*362,(i//4)*362,(i%4+1)*362,(i//4+1)*362]}
config=json.loads((BATCH/'test-image-map.json').read_text(encoding='utf-8'))
config['1']={'options':[['apple','pear','banana'],['fish','dog','cat'],['bike','bus','car'],['kite','book','ball'],['shirt','bag','hat']],
             'binary':['pencil','chair','bus','fish','boat'],'scene':1,'example':'red'}
matches={1:[5,6,3,4,2],2:[5,3,2,6,4],3:[5,2,4,3,6],4:[5,2,3,6,4],5:[2,6,5,3,4],
         6:[2,5,3,6,4],7:[4,5,2,6,3],8:[4,5,3,2,6],9:[4,3,6,2,5],10:[5,2,3,6,4]}
guide=fitz.open(PACKAGE/'WeWIN_Starters_Teacher_Guide.pdf')
keys={int(re.search(r'Answer key - Test (\d+)',p.get_text()).group(1)):p.get_text()
      for p in guide if 'Answer key - Test' in p.get_text()}
number_words=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
colour_names={'red':'đỏ','yellow':'vàng','green':'xanh lá','blue':'xanh dương','orange':'cam','purple':'tím'}

def answers(key,part):
    value=re.search(rf'^Part {part}: (.+)$',key,re.M).group(1)
    return [re.sub(r'^\d+\s+','',x.strip()).strip() for x in value.split('|')]

def numbered(page):
    return re.findall(r'^\d\. (.+)$',page.get_text(),re.M)

def questions(prefix,prompts,values):
    assert len(prompts)==len(values)==5,(prefix,prompts,values)
    return [{'id':f'{prefix}-{i+1}','prompt':prompt,'answer':value} for i,(prompt,value) in enumerate(zip(prompts,values))]

exams=[]
for n in range(1,11):
    cfg=config[str(n)]
    source=fitz.open(PACKAGE/f'WeWIN_Starters_Test_{n:02}.pdf')
    key=keys[n]
    test_dir=SITE/'assets/tests'/f'{n:02}'
    test_dir.mkdir(parents=True,exist_ok=True)
    # Remove only the paper's sample line, retaining all original matching subjects.
    clean=fitz.open(stream=source.tobytes(),filetype='pdf')
    stroke=b'n 493 647 m 117 516 l S'
    removed=0
    for x in clean[1].get_contents():
        stream=clean.xref_stream(x);removed+=stream.count(stroke)
        clean.update_stream(x,stream.replace(stroke,b''))
    assert removed==1,(n,removed)
    clean[1].get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(40,239.89,555,639.89),alpha=False).save(test_dir/'matching.png')
    clean.close()
    audio=[]
    audio_mode='parts'
    for part in range(1,5):
        name=f'listening-{part}.mp3'
        shutil.copy2(MP3/'Individual_Parts'/f'WeWIN_Starters_Test_{n:02}_Part_{part}.mp3',test_dir/name)
        audio.append(f'tests/{n:02}/{name}')
        if n==1:
            shutil.copy2(test_dir/name,SITE/'assets'/name)
    obsolete_full=test_dir/'listening-full.mp3'
    if obsolete_full.exists():
        obsolete_full.unlink()
    title=key.split('Answer key - Test')[1].splitlines()[1]
    example_name=re.search(r'Example: (\w+)',source[1].get_text()).group(1)
    r1=questions('r1',re.findall(r'This is [^\n]+',source[6].get_text())[2:],answers(key,1))
    for q,word in zip(r1,cfg['binary']):q['art']=word
    r2=questions('r2',numbered(source[7]),answers(key,2))
    r3_prompts=re.findall(r'^.*\(\d\) _+.*$',source[9].get_text(),re.M)
    r3_prompts=[re.sub(r'\(\d\) _+','___',x) for x in r3_prompts]
    r3=questions('r3',r3_prompts,answers(key,4))
    passage=source[9].get_text(clip=fitz.Rect(38,170,557,255)).strip().splitlines()
    r4=questions('r4',numbered(source[10]),[v.split(' / ')[0] for v in answers(key,5)])
    for q,picture in zip(r4,[1,1,2,3,3]):q['picture']=picture
    r4[-1]['accepted']=['1']
    scene='shared/reading-speaking-scene-v2.png' if n==1 else f'shared/scene-{cfg["scene"]:02}.png'
    story_file='story-three-panels-v2.png' if n==1 else f'story-{n:02}.png'
    pix=fitz.Pixmap(SHARED/story_file)
    stories=[]
    for box in [(13,13,1011,507),(13,519,1011,998),(13,1011,1011,1523)]:
        stories.append({'file':'shared/'+story_file,'width':pix.width,'height':pix.height,
                        'clip':[box[0]*pix.width/1024,box[1]*pix.height/1536,box[2]*pix.width/1024,box[3]*pix.height/1536]})
    match_names=re.findall(r'^\d\. (\w+) -',key.split('LISTENING 1\n')[1].split('LISTENING 2\n')[0],re.M)
    l1=questions('l1',match_names,[f'p{i}' for i in matches[n]])
    l2_answers=re.search(r'LISTENING 2\n(.+)',key).group(1)
    l2_answers=[re.sub(r'^\d+\.\s*','',x.strip()) for x in l2_answers.split('|')]
    l2=questions('l2',numbered(source[2]),l2_answers)
    for q in l2:
        if str(q['answer']).isdigit():q.update(numeric=True,accepted=[number_words[int(q['answer'])]])
    l3_answers=re.findall(r'\d\. ([ABC]) \(([^)]+)\)',key.split('LISTENING 3\n')[1].split('LISTENING 4\n')[0])
    l3=questions('l3',numbered(source[3])[1:]+numbered(source[4]),[a for a,word in l3_answers]) if len(numbered(source[3]))==3 else questions('l3',numbered(source[3])+numbered(source[4]),[a for a,word in l3_answers])
    for q,choices,(letter,word) in zip(l3,cfg['options'],l3_answers):
        q['choiceArts']=choices;assert choices['ABC'.index(letter)]==word
    colours=re.findall(r'^\d\. Ball [^:]+: (\w+)',key.split('LISTENING 4\n')[1].split('READING & WRITING')[0],re.M)
    l4=questions('l4',[f'Câu {i}' for i in range(1,6)],
                  [{'target':target,'colour':colour} for target,colour in zip(['under-table','on-chair','under-tree','next-box','in-box'],colours)])
    colour_file='shared/colour-scene-v2.png' if cfg['example']=='red' else f'shared/colour-{cfg["example"]}.png'
    exam={'id':f'starters-{n:02}','number':f'{n:02}','title':title,'level':'Pre A1 Starters','audioVersion':'20261015-parts',
          'audioMode':audio_mode,'audio':audio,'cover':scene,
          'reading':[
            {'id':'r1','title':'Look & read','instruction':'Look and read. Choose a tick (✓) or a cross (✗).','hint':'Nhìn hình và đọc câu. Chọn đúng hoặc sai.','type':'binary','options':[['tick','✓','Đúng'],['cross','✗','Sai']],'questions':r1},
            {'id':'r2','title':'Read the picture','instruction':'Look at the picture. Read and choose yes or no.','hint':'Đọc từng câu và chọn Yes hoặc No dựa vào tranh.','type':'binary','image':scene,'options':[['yes','Yes',''],['no','No','']],'questions':r2},
            {'id':'r3','title':'Complete the text','instruction':'Read. Choose a word from the box for each gap.','hint':'Chọn một từ trong khung, rồi bấm vào chỗ trống tương ứng.','type':'words','bank':source[9].get_text().strip().splitlines()[-8:],'passageTitle':passage[0],'example':passage[1].replace('Example: ','').strip(),'questions':r3},
            {'id':'r4','title':'Read the story','instruction':'Look at the pictures. Write one word for each answer.','hint':'Xem ba tranh theo thứ tự. Mỗi câu chỉ cần một từ hoặc một số.','type':'text','story':True,'storyArts':stories,'questions':r4}],
          'listening':[
            {'id':'l1','title':'Listen & match','instruction':'Listen and match each name to a child in the picture.','hint':'Chọn tên ở bên phải, rồi bấm vào nhân vật trong tranh để nối.','type':'match','image':f'tests/{n:02}/matching.png','exampleName':example_name,'questions':l1},
            {'id':'l2','title':'Names & numbers','instruction':'Read the questions. Listen and write a name or a number.','hint':f'Nghe và điền tên hoặc số. Ví dụ: tên của bạn gái là {example_name}.','type':'text','exampleName':example_name,'questions':l2},
            {'id':'l3','title':'Listen & choose','instruction':'Listen and choose one picture for each question.','hint':'Mỗi câu có ba hình A, B, C. Chọn một hình sau khi nghe.','type':'pictures','questions':l3},
            {'id':'l4','title':'Listen & colour','instruction':'Listen and colour the balls in the picture.','hint':f'Chọn câu, bấm vào quả bóng được nhắc đến, rồi chọn màu. Bóng {colour_names[cfg["example"]]} trên bàn là ví dụ.','type':'colour','image':colour_file,'questions':l4}]}
    assert len([q for skill in ['reading','listening'] for p in exam[skill] for q in p['questions']])==40
    exams.append(exam)
    print(f'Imported Test {n:02}: {title} / audio {audio_mode}',flush=True)
(SITE/'exams.mjs').write_text('export const exams = '+json.dumps(exams,ensure_ascii=False,indent=2)+';\nexport const artwork = '+json.dumps(artwork,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
print('Prepared ten exams, approved artwork and original supplied MP3s.',flush=True)
