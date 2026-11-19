import test from 'node:test';
import assert from 'node:assert/strict';
import {allExams} from '../public-data.mjs';
import {personAtPoint,matchScene} from '../picture-ui.mjs';
import {mediaPath} from '../media.mjs';
import {readFile} from 'node:fs/promises';

const part=allExams.find(e=>e.id==='flyers-23').listening[0],spec=part.interaction;
test('Mock 23 names can reach every target, including the previously missed yellow-shirt girl',()=>{
  for(const target of spec.targets){
    const y=100+target.y*spec.imageHeight/100;
    assert.equal(personAtPoint(spec,target.x*10,y)?.id,target.id);
    assert.equal(personAtPoint(spec,target.x*10,y-target.ry*spec.imageHeight/200)?.id,target.id);
  }
  // IDs are referenced by saved answers and the independent answer key.
  assert.equal(personAtPoint(spec,360,100+spec.imageHeight*.27)?.id,'p6');
  assert.equal(personAtPoint(spec,760,100+spec.imageHeight*.27)?.id,'p2');
  assert.equal(personAtPoint(spec,880,100+spec.imageHeight*.72)?.id,'p3');
  assert.equal(personAtPoint(spec,200,100+spec.imageHeight*.72)?.id,'p5');
  assert.equal(personAtPoint(spec,660,100+spec.imageHeight*.72)?.id,'p7');
  assert.equal(personAtPoint(spec,500,0),undefined);
  assert.equal(personAtPoint(spec,1000,1000),undefined);
  assert.match(matchScene(part,{},''),/data-person="p6"/);
});
test('overlapping person areas pick the nearest centre rather than the last SVG element',()=>{
  const overlapping={imageHeight:1000,targets:[{id:'front',x:50,y:50,rx:15,ry:20},{id:'other',x:60,y:50,rx:15,ry:20}]};
  assert.equal(personAtPoint(overlapping,505,600).id,'front');
  assert.equal(personAtPoint(overlapping,595,600).id,'other');
});
test('all Flyers story tasks use the existing illustration-only assets',()=>{
  const flyers=allExams.filter(e=>e.levelKey==='flyers');
  assert.equal(flyers.length,30);
  for(const exam of flyers){const p=exam.reading.at(-1);assert.ok(p.manual);assert.equal(p.storyImages.length,1);assert.ok(mediaPath(p.storyImages[0]).endsWith('.webp'));}
});
test('Test 08 keeps the zoo coordinates in both generated catalogs and preserves scoring target IDs',async()=>{
 const regions=JSON.parse(await readFile(new URL('./zoo-paint-regions.json',import.meta.url),'utf8'));
 const generated=JSON.parse(await readFile(new URL('../generated/exams-public.json',import.meta.url),'utf8'));
 for(const id of ['movers-08','flyers-08']){
  const spec=allExams.find(e=>e.id===id).listening[4].interaction;
  assert.deepEqual(spec.regions,regions);
  assert.deepEqual(generated.find(e=>e.id===id).listening[4].interaction,spec);
  assert.deepEqual(spec.regions.map(r=>r.id),['kite-left','kite-right','bench-hat','ground-bag','held-bag','blanket-book','bench-ball','ground-ball','boy-shirt','sign','boy-hat']);
  // The bag is beside the tree at 10% width, not on the tree at 25% width.
  const bag=spec.regions.find(r=>r.id==='ground-bag');assert.ok(bag.cx>90&&bag.cx<110);assert.ok(bag.cy>840&&bag.cy<880);
 }
});
