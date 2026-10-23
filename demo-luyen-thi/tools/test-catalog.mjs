import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {catalogItems,filterCatalog,renderCatalogResults,catalogLayout,levels} from '../catalog.mjs';
assert.equal(catalogItems.length,40);assert.equal(new Set(catalogItems.map(e=>e.id)).size,40);
assert.deepEqual(levels.map(x=>x[0]),['movers','flyers']);assert.equal(filterCatalog('starters','').length,0);
for(const [level,count,reading,listening] of [['movers',20,29,25],['flyers',20,43,25]]){
 const items=filterCatalog(level,'');assert.equal(items.length,count);
 assert.ok(items.every(e=>e.readingCount===reading&&e.listeningCount===listening));
 assert.ok(existsSync(fileURLToPath(new URL('../assets/design-20261021/'+level+'.webp',import.meta.url))));
}
assert.equal(filterCatalog('flyers','  BIRTHDAY  ').length,1);
assert.equal(catalogItems.filter(e=>e.level==='movers').length,20);assert.equal(catalogItems.filter(e=>e.level==='flyers').length,20);assert.equal(catalogItems.some(e=>e.level==='starters'),false);
assert.equal(filterCatalog('movers',' hard ').length,10);assert.equal(filterCatalog('flyers',' hard ').length,10);assert.equal(catalogItems.filter(e=>e.difficulty==='Hard').length,20);
assert.equal(filterCatalog('all','Mock 15').length,2);
assert.equal(filterCatalog('all','not-a-real-test').length,0);
const results=renderCatalogResults({category:'all',query:'',limit:6,action:e=>`<button data-test="${e.id}">Xem đề</button>`});
assert.equal((results.match(/<article/g)||[]).length,6);assert.ok(results.includes('Xem thêm 6 đề'));
const empty=renderCatalogResults({category:'all',query:'<script>',limit:6,action:()=>''});assert.ok(!empty.includes('<script>'));assert.ok(empty.includes('Xóa bộ lọc'));
const layout=catalogLayout({header:'',footer:'',category:'all',query:'',results});assert.equal((layout.match(/class="learning-level"/g)||[]).length,2);assert.ok(!layout.includes('Starters'));assert.ok(layout.includes('2 cấp độ'));assert.ok(!layout.includes('Vào đề nhanh'));
console.log('PASS: catalog has 40 available Movers and Flyers tests; Starter cards and filters are cleared; Hard tags, backgrounds, search, pagination and selected A layout work.');
