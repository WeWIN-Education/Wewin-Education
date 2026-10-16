from pathlib import Path
import re,json,fitz

ROOT=Path(__file__).resolve().parents[2]
PACK=ROOT/'WeWIN_Movers_10_New_Tests_06_15_Full_Pack'
SITE=ROOT/'demo-luyen-thi'
keys=fitz.open(PACK/'WeWIN_Movers_06_15_Answer_Keys.pdf')
out=[]
for n in range(6,16):
    d=fitz.open(PACK/f'WeWIN_Movers_Mock_{n:02}.pdf')
    k=[p.get_text() for p in keys if f'MOCK {n:02} • ANSWERS' in p.get_text()]
    assert len(k)==2,(n,len(k))
    first=' '.join(k[0].split());second=' '.join(k[1].split())
    listening=first.split('Listening · 25 marks ')[1].split('Reading & Writing')[0]
    reading=first.split('Reading & Writing · Parts 1–4 ')[1]
    def parts(s):return {int(a):b.strip() for a,b in re.findall(r'Part (\d) (.*?)(?=Part \d |$)',s)}
    lp,rp=parts(listening),parts(reading)
    def vals(s):
        items=re.split(r'(?:^|;\s*)\d+\.\s*',s)
        return [x.strip().rstrip('.') for x in items if x.strip()]
    dest=SITE/'assets/movers'/f'{n:02}';dest.mkdir(parents=True,exist_ok=True)
    images={}
    for i in range(1,15):
        # Keep the full question content and original art, excluding only page furniture.
        pix=d[i].get_pixmap(matrix=fitz.Matrix(1.8,1.8),clip=fitz.Rect(30,90,565,790),alpha=False)
        file=f'movers/{n:02}/page-{i+1:02}.jpg'
        pix.save(SITE/'assets'/file,jpg_quality=88)
        images[i+1]=file
    d[0].get_pixmap(matrix=fitz.Matrix(1.2,1.2),clip=fitz.Rect(38,218,555,600),alpha=False).save(dest/'cover.jpg',jpg_quality=88)
    def qlist(prefix,answers,choice=None):
        return [{'id':f'{prefix}-{i+1}','prompt':f'Câu {i+1}', 'answer':v,'choices':choice or []} for i,v in enumerate(answers)]
    l=[]
    desc=vals(lp[1]);assert len(desc)==5,(n,desc)
    match=[]
    for i,x in enumerate(desc):
        name,detail=x.split('→',1)
        match.append({'id':f'l1-{i+1}','prompt':name.strip(),'answer':str(i+1),'choices':[]})
    choices=[{'value':str(i+1),'label':x.split('→',1)[1].strip()} for i,x in enumerate(desc)]
    for q in match:q['choices']=choices
    l.append({'title':'Listen & match','images':[images[2]],'questions':match})
    l.append({'title':'Listen & write','images':[images[3]],'questions':qlist('l2',vals(lp[2]))})
    l.append({'title':'Listen & match pictures','images':[images[4]],'questions':qlist('l3',vals(lp[3]),list('ABCDEFGH'))})
    l.append({'title':'Listen & choose','images':[images[5],images[6]],'questions':qlist('l4',vals(lp[4]),list('ABC'))})
    p5=vals(lp[5]);assert len(p5)==5,(n,p5)
    cq=[]
    targets=['the kite on the left','the hat on the bench','the bag next to the tree','the book on the blanket']
    for i,x in enumerate(p5[:4]):
        target,color=x.split('→');target=target.strip();color=color.strip()
        cq.append({'id':f'l5-{i+1}','prompt':f'Câu {i+1} · Chọn đồ vật và màu','answer':target+'|'+color,'colour':True,'targets':targets})
    word=re.match(r'(\w+) on ',p5[4]).group(1)
    cq.append({'id':'l5-5','prompt':'Câu 5 · Từ viết trên bảng','answer':word,'choices':[]})
    l.append({'title':'Listen, colour & write','images':[images[7]],'questions':cq})
    r=[]
    for p,count in [(1,5),(2,6),(3,6),(4,5)]:
        av=vals(rp[p]);assert len(av)==count,(n,p,av)
        if p==3:av[-1]=av[-1].split('—')[0].strip()
        qs=qlist(f'r{p}',av,list('ABC') if p==2 else None)
        if p==3:qs[-1]['choices']=list('ABC');qs[-1]['prompt']='Câu 6 · Tên câu chuyện'
        r.append({'title':['Choose the words','Read the conversation','Complete the story','Choose the right words'][p-1],'images':[images[p+7]],'questions':qs})
    story=second.split('Part 5 · Complete the story sentences ')[1].split('Part 6 ·')[0]
    av=re.findall(r'\d+\. (.*?) — ',story);assert len(av)==7,(n,av)
    r.append({'title':'Complete the story sentences','images':[images[12],images[13],images[14]],'questions':qlist('r5',av)})
    samples=second.split('Part 6 · Suggested answers ')[1].split('Chấp nhận')[0]
    samples=re.findall(r'\d+\. (.*?)(?= \d+\. |$)',samples)
    assert len(samples)==6,(n,samples)
    r.append({'title':'Write about the picture','images':[images[15]],'manual':True,'questions':[{'id':f'r6-{i+1}','prompt':f'Câu {i+1}','sample':v} for i,v in enumerate(samples)]})
    assert sum(len(p['questions']) for p in l)==25
    assert sum(len(p['questions']) for p in r if not p.get('manual'))==29
    e={'id':f'movers-{n:02}','number':f'{n:02}','title':k[0].splitlines()[1],'level':'A1 Movers','cover':f'movers/{n:02}/cover.jpg','audio':[None]*5,'reading':r,'listening':l}
    out.append(e);print('Prepared',e['id'],e['title'],flush=True)
(SITE/'movers.mjs').write_text('export const movers = '+json.dumps(out,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
