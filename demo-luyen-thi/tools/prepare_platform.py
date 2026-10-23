"""Reproducible migration of original WeWIN material; no answers in public output."""
from pathlib import Path
import argparse,json,re,copy,fitz,hashlib,os
from PIL import Image
ROOT=Path(__file__).resolve().parents[2];SITE=ROOT/'demo-luyen-thi'
parser=argparse.ArgumentParser();parser.add_argument('--hard-pack-dir',type=Path,default=Path(os.environ.get('WEWIN_HARD_FLYERS_DIR',ROOT.parent/'WeWIN_Flyers_Hard_16_25_Full_Pack')));parser.add_argument('--hard-movers-pack-dir',type=Path,default=Path(os.environ.get('WEWIN_HARD_MOVERS_DIR',ROOT.parent/'WeWIN_Movers_Hard_16_25_Full_Pack')));args=parser.parse_args();HARD_ROOT=args.hard_pack_dir.resolve();MOVERS_HARD_ROOT=args.hard_movers_pack_dir.resolve()
OUT=SITE/'generated';OUT.mkdir(exist_ok=True)
ASSETS=SITE/'assets/platform';ASSETS.mkdir(exist_ok=True)
VERSION='2026-10-23-v2'
def module(name,marker=' = '):
    raw=(SITE/name).read_text(encoding='utf-8').split(marker,1)[1].lstrip()
    return json.JSONDecoder().raw_decode(raw)[0]
starters=module('exams.mjs');movers=module('movers.mjs')+module('movers-hard.mjs');flyers=module('flyers.mjs')+module('flyers-hard.mjs')
artwork=module('exams.mjs','export const artwork = ')
public=[];private=[]
# Coordinates are relative to the rendered picture, not page/screen pixels.
positions={6:[(15,35),(42,30),(86,32),(15,72),(70,65),(92,72)],7:[(14,28),(48,24),(88,30),(15,74),(40,78),(90,73)],8:[(23,31),(48,27),(81,30),(13,72),(70,69),(91,72)],9:[(15,29),(41,29),(84,31),(15,78),(68,71),(92,73)],10:[(13,29),(42,25),(75,26),(13,70),(36,71),(85,73)],11:[(15,26),(40,25),(87,24),(17,76),(69,70),(91,76)],12:[(18,29),(45,24),(85,29),(11,73),(34,73),(88,76)],13:[(18,27),(39,24),(79,28),(19,75),(65,73),(87,74)],14:[(21,28),(47,28),(75,34),(15,73),(68,72),(90,75)],15:[(20,25),(57,24),(83,25),(18,76),(70,71),(91,73)]}
colour_regions=[
 {'id':'kite-left','path':'M205 65 L290 32 L324 120 L236 181 Z','cx':266,'cy':105},
 {'id':'kite-right','path':'M805 148 L850 74 L908 108 L887 208 Z','cx':860,'cy':139},
 {'id':'bench-hat','path':'M858 740 Q893 717 916 642 Q934 715 957 752 Q905 772 858 740 Z','cx':909,'cy':727},
 {'id':'ground-bag','path':'M164 733 Q161 682 184 667 Q206 651 228 677 L242 705 Q279 700 294 721 L309 834 Q245 857 174 840 Z','cx':247,'cy':774},
 {'id':'held-bag','path':'M633 558 Q635 524 661 516 L703 517 Q733 530 735 568 L753 704 Q700 731 640 709 Z','cx':690,'cy':634},
 {'id':'blanket-book','path':'M27 1159 Q105 1102 166 1120 Q216 1088 270 1112 L322 1201 Q236 1217 167 1253 Q99 1233 44 1248 Z','cx':172,'cy':1187},
 {'id':'bench-ball','path':'M770 835 A88 100 0 1 0 946 835 A88 100 0 1 0 770 835 Z','cx':859,'cy':835},
 {'id':'ground-ball','path':'M549 1039 A59 65 0 1 0 667 1039 A59 65 0 1 0 549 1039 Z','cx':608,'cy':1039},
 {'id':'boy-shirt','path':'M553 466 Q586 494 626 490 L650 544 L628 560 L627 605 L564 612 L564 546 L538 530 Z','cx':595,'cy':547},
 {'id':'sign','path':'M453 1140 Q453 1117 478 1117 L957 1117 Q980 1117 980 1140 L980 1299 Q980 1320 956 1320 L477 1320 Q453 1320 453 1299 Z','cx':717,'cy':1218},
 {'id':'boy-hat','path':'M658 280 L749 237 L732 352 Z','cx':716,'cy':292}]
hard_colour_regions=copy.deepcopy(colour_regions)
hard_colour_regions[2]={'id':'bench-hat','path':'M842 542 Q868 531 889 564 L925 670 Q866 700 792 671 Z','cx':858,'cy':612}
def render(page,rect,relative):
    dest=SITE/'assets'/relative
    if not dest.exists():page.get_pixmap(matrix=fitz.Matrix(1.6,1.6),clip=fitz.Rect(rect),alpha=False).save(dest,jpg_quality=91)
    return relative
hard_positions={n:[(20,40),(50,38),(85,38),(14,73),(50,66),(66,70),(87,70)] for n in range(16,26)}
movers_hard_positions={n:[(20,34),(87,31),(40,35),(55,57),(89,62),(67,62),(18,62)] for n in range(16,26)}
def targets(n,level):
    points=movers_hard_positions[n] if level=='movers' and n in movers_hard_positions else hard_positions[n] if n in hard_positions else positions[n]
    return [{'id':f'p{i+1}','x':x,'y':y,'rx':10,'ry':18} for i,(x,y) in enumerate(points)]
def clean(q):
    return {k:copy.deepcopy(v) for k,v in q.items() if k not in ['answer','accepted','sample','targets','colour']}
def number_question(q,i):
    q['prompt']=re.sub(r'^Câu\s+(\d+)(.*)',lambda m:'Question '+m[1]+(' · Best title for the story' if 'Tên' in m[2] else ''),q.get('prompt',''))
    return q
for level,source in [('starters',starters),('movers',movers),('flyers',flyers)]:
    for original in source:
        e=copy.deepcopy(original);e['levelKey']=level;e['version']=e.get('version',VERSION)
        pub={k:copy.deepcopy(v) for k,v in e.items() if k not in ['reading','listening','personOrder','exampleName','matchKey']}
        if level!='starters':
            n=int(e['number'])
            if level=='flyers' and n<=15:
                doc=fitz.open(ROOT/'WeWIN_Flyers_10_Tests_06_15.pdf');pages=[doc[(n-6)*18+i] for i in range(18)]
            elif level=='flyers':
                doc=fitz.open(HARD_ROOT/f'WeWIN_Flyers_Hard_Mock_{n:02}.pdf');pages=[doc[i] for i in range(18)]
            elif n<16:
                doc=fitz.open(ROOT/'WeWIN_Movers_10_New_Tests_06_15_Full_Pack'/f'WeWIN_Movers_Mock_{n:02}.pdf');pages=[doc[i] for i in range(18)]
            else:
                doc=fitz.open(MOVERS_HARD_ROOT/f'WeWIN_Movers_Hard_Mock_{n:02}.pdf');pages=[doc[i] for i in range(18)]
        for skill in ['reading','listening']:
            pub[skill]=[]
            for pi,p in enumerate(e[skill]):
                p['id']=f'{skill[0]}{pi+1}';part={k:copy.deepcopy(v) for k,v in p.items() if k not in ['questions','hint','options','personOrder','exampleName','matchKey']}
                part['questions']=[number_question(clean(q),i) for i,q in enumerate(p['questions'])]
                if level=='starters':
                    if p.get('options'):part['options']=[(x[0],x[1],{'tick':'True','cross':'False','yes':'Yes','no':'No'}.get(x[0],x[0])) for x in p['options']]
                    if p.get('type')=='match':
                        names=[p['exampleName']]+[q['prompt'] for q in p['questions']]
                        names.append(next(x for x in ['May','Pat','Kim','Alex','Nick','Sue','Bill'] if x not in names))
                        part['interaction']={'type':'match','image':p['image'],'names':[{'id':x,'label':x} for x in dict.fromkeys(names)],'targets':[{'id':f'p{i+1}','x':x,'y':y,'rx':6,'ry':12} for i,(x,y) in enumerate([(15,34),(42,34),(68,34),(15,74),(38,74),(63,74),(85,74)])],'example':{'name':p['exampleName'],'target':'p1'}}
                        p['matchKey']={q['prompt']:q['answer'] for q in p['questions']};part['questions']=[]
                    if p.get('type')=='colour':
                        ids=['under-table','on-chair','under-tree','next-box','in-box','other'];xy=[(27.36,43.32),(67.83,58.34),(83.41,44.02),(9.46,79.74),(25.84,78.17),(89.88,79.83)]
                        iw,ih=Image.open(SITE/'assets'/p['image']).size;h=1000*ih/iw
                        regions=[{'id':k,'path':f'M {x*10-30} {y*h/100} a30 {h*.036} 0 1 0 60 0 a30 {h*.036} 0 1 0 -60 0','cx':x*10,'cy':y*h/100} for k,(x,y) in zip(ids,xy)]
                        part['interaction']={'type':'paint','image':p['image'],'width':1000,'height':h,'regions':regions,'paintCount':5,'writeCount':0}
                        for i,q in enumerate(p['questions']):q['answer']={'target':q['answer']['target'],'color':q['answer']['colour']};q['prompt']=f'Question {i+1}'
                        p['painting']=True;part['questions']=[]
                elif skill=='listening':
                    if pi==0:
                        page=pages[1]
                        prepared_key=copy.deepcopy(p.get('matchKey'))
                        if p.get('personOrder'):
                            names=p['personOrder'];example=p['exampleName'];key=prepared_key
                        else:
                            text=page.get_text().split('\n2\n',1)[1];names=[x.strip() for x in text.split('Example:')[0].splitlines() if x.strip()];assert len(names)==7,(e['id'],names)
                            example=text.split('Example:')[1].strip().splitlines()[0];key={}
                        image=render(page,page.get_image_info()[1]['bbox'],f'platform/{e["id"]}-match.jpg')
                        part['interaction']={'type':'match','image':image,'names':[{'id':x,'label':x} for x in names],'targets':targets(n,level),'example':{'name':example,'target':'p1'}}
                        if not p.get('personOrder'):
                            for q in p['questions']:
                                desc=q['choices'][int(q['answer'])-1]['label'].lower().split(';')[0].split(',')[0]
                                target=next(v for word,v in [('yellow','p2'),('glasses','p3'),('purple','p4'),('curly','p5'),('pink','p6')] if word in desc)
                                q['answer']=target;key[q['prompt']]=target;q['choices']=[]
                        p['matchKey']=key;part['questions']=[];part.pop('images',None)
                    if pi==2:
                        text=pages[3].get_text();lines=text.split('\n4\n',1)[1].splitlines();names=[x for x in lines if re.fullmatch('[A-Z][a-z]+',x)];assert len(names)==6,(e['id'],names)
                        part['context']=text.splitlines()[2]
                        for i,q in enumerate(part['questions']):q['prompt']=names[i+1]
                    if pi==3:
                        qs=[]
                        for pg in pages[4:6]:qs+=re.findall(r'^([1-5])\s+(.+)$',pg.get_text(),re.M)
                        if len(qs)==5:
                            for q,(_,label) in zip(part['questions'],qs):q['prompt']=label
                    if pi==4:
                        image=render(pages[6],pages[6].get_image_info()[1]['bbox'],f'platform/{e["id"]}-paint.jpg')
                        regions=hard_colour_regions if e.get('difficulty')=='Hard' else colour_regions
                        part['interaction']={'type':'paint','image':image,'width':1000,'height':1500,'regions':regions,'paintCount':4 if level=='movers' else 3,'writeCount':1 if level=='movers' else 2}
                        for i,q in enumerate(p['questions']):
                            q['prompt']=f'Question {i+1}'
                            if q.get('colour'):
                                target,color=q['answer'].split('|');color=color.strip();region='kite-left' if 'kite' in target else 'bench-hat' if 'hat' in target else 'ground-bag' if 'bag' in target else 'blanket-book'
                                q['answer']={'target':region,'color':color}
                            else:q['answer']={'target':'blanket-book' if level=='flyers' and i==3 else 'sign','word':q['answer']}
                        p['painting']=True;part['questions']=[];part.pop('images',None)
                if p.get('manual'):
                    if level=='flyers':
                        p['writingImages']=[render(pages[14],(25,215,570,360),f'platform/{e["id"]}-writing-context.jpg')]
                    part['writingMax']=6 if level=='movers' else 5
                    part['contextTitle']=e['title'];part['characters']=['Win'] if level=='flyers' and n>=16 else ['Win','Lily'] if level=='flyers' and n not in [12,14] else ['Win','Tom'] if level=='flyers' else ['Win']
                    part['instruction']='Look at the three pictures. Write a story using 20 or more words.' if level=='flyers' else 'Look at the picture. Complete the sentences, answer the questions, then write two sentences of your own.'
                    if level=='movers':
                        body=pages[14].get_text().split('Example:')[1]
                        prompts=re.findall(r'\n([1-6])\n(.*?)(?=\n[1-6]\n|$)',body,re.S)
                        for q,(_,label) in zip(part['questions'],prompts):q['prompt']=' '.join(label.strip().split())
                    else:part['questions'][0]['prompt']='Write your story here.'
                if part.get('interaction',{}).get('type')=='match':
                    iw,ih=Image.open(SITE/'assets'/part['interaction']['image']).size;part['interaction']['imageHeight']=1000*ih/iw
                for q in part['questions']:
                    if q.get('choices') and any(isinstance(x,dict) and ('the girl' in x.get('label','') or 'the boy' in x.get('label','')) for x in q['choices']):raise ValueError('Leaked descriptive option')
                for original_q,new_q in zip(p['questions'],part['questions']):original_q['prompt']=new_q['prompt']
                pub[skill].append(part)
        pub['readingCount']=sum(len(p['questions']) for p in e['reading'] if not p.get('manual'));pub['listeningCount']=sum(len(p['questions']) for p in e['listening'])
        public.append(pub);private.append(e)
(OUT/'exams-private.json').write_text(json.dumps(private,ensure_ascii=False),encoding='utf-8')
(OUT/'exams-public.json').write_text(json.dumps(public,ensure_ascii=False),encoding='utf-8')
(OUT/'artwork.json').write_text(json.dumps(artwork,ensure_ascii=False),encoding='utf-8')
(SITE/'public-data.mjs').write_text('export const allExams = '+json.dumps(public,ensure_ascii=False)+';\nexport const artwork = '+json.dumps(artwork,ensure_ascii=False)+';\nexport const exams=allExams.filter(e=>e.levelKey===\'starters\');export const movers=allExams.filter(e=>e.levelKey===\'movers\');export const flyers=allExams.filter(e=>e.levelKey===\'flyers\');\n',encoding='utf-8')
print(f'Prepared {len(public)} versioned tests with public interactions and private scoring keys.')
