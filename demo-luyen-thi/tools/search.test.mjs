import test from 'node:test';
import assert from 'node:assert/strict';
import {foldSearch,matchesSearch,displayCode} from '../search.mjs';
test('Vietnamese names, mixed-case codes and whitespace match without changing identity',()=>{
 assert.equal(foldSearch('  Đỗ Tiến Anh Tuấn  '),'do tien anh tuan');
 assert.equal(matchesSearch('Đỗ Tiến Anh Tuấn WEWIN-HV02-16453 STARTERS FOUNDATION 01','DO tuan'),true);
 assert.equal(matchesSearch('Lê Khánh My WEWIN-HV02-18607','le khanh my'),true);
 assert.equal(matchesSearch('Lê Khánh My WEWIN-HV02-18607','wewinhv0218607'),true);
 assert.notEqual(foldSearch('FLYERS 01'),foldSearch('FLYERS 1'));
 assert.equal(displayCode('wewin-hv02-00123'),'WEWIN-HV02-00123');
 assert.equal(matchesSearch('Nguyễn Lâm','abc123'),false);
});
