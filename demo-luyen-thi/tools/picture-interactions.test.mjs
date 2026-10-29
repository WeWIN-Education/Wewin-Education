import test from 'node:test';
import assert from 'node:assert/strict';
import {allExams} from '../public-data.mjs';
import {personAtPoint,matchScene} from '../picture-ui.mjs';
import {mediaPath} from '../media.mjs';

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
  assert.equal(flyers.length,20);
  for(const exam of flyers){const p=exam.reading.at(-1);assert.ok(p.manual);assert.equal(p.storyImages.length,1);assert.match(p.storyImages[0],/writing-context\.jpg$/);assert.ok(mediaPath(p.storyImages[0]).endsWith('.webp'));}
});
