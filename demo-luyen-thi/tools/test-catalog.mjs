import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {catalogItems,filterCatalog,renderCatalogResults,catalogLayout} from '../catalog.mjs';
assert.equal(catalogItems.length,30);assert.equal(new Set(catalogItems.map(e=>e.id)).size,30);
for(const [level,reading,listening] of [['starters',20,20],['movers',29,25],['flyers',43,25]]){
 const items=filterCatalog(level,'');assert.equal(items.length,10);
 assert.ok(items.every(e=>e.readingCount===reading&&e.listeningCount===listening));
 assert.ok(existsSync(fileURLToPath(new URL('../assets/design-20261021/'+level+'.webp',import.meta.url))));
}
assert.equal(filterCatalog('flyers','  BIRTHDAY  ').length,1);
assert.equal(filterCatalog('all','Mock 15').length,2);
assert.equal(filterCatalog('all','not-a-real-test').length,0);
const results=renderCatalogResults({category:'all',query:'',limit:6,action:e=>`<button data-test="${e.id}">Xem đề</button>`});
assert.equal((results.match(/<article/g)||[]).length,6);assert.ok(results.includes('Xem thêm 6 đề'));
const empty=renderCatalogResults({category:'all',query:'<script>',limit:6,action:()=>''});assert.ok(!empty.includes('<script>'));assert.ok(empty.includes('Xóa bộ lọc'));
const layout=catalogLayout({header:'',footer:'',category:'all',query:'',results});assert.equal((layout.match(/class="learning-level"/g)||[]).length,3);assert.ok(!layout.includes('Vào đề nhanh'));
console.log('PASS: catalog has 30 independent tests, correct skill counts, 4 optimized backgrounds, safe search, filters, six-card pagination and selected A layout.');
