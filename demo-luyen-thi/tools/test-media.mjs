import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import manifest from '../media-manifest.mjs';
import {allExams,artwork} from '../public-data.mjs';
import {mediaImage,artworkImage,mediaPath,artKey} from '../media.mjs';
import {assessWriting} from '../server/writing.mjs';
import {exams} from '../server/scoring.mjs';
const root=new URL('../',import.meta.url);
let crops=0,images=0;
function check(value){
 if(Array.isArray(value)){value.forEach(check);return;}
 if(value&&typeof value==='object'){
  if(value.file&&value.clip){const item=manifest.art[artKey(value)];assert.ok(item,'Missing independent crop');assert.ok(artworkImage(value,'Test').includes('<img'));assert.ok(!artworkImage(value,'Test').includes('<svg'));crops++;return;}
  Object.values(value).forEach(check);return;
 }
 if(typeof value==='string'&&/\.(png|jpe?g|webp)$/.test(value)){assert.ok(manifest.images[value],value);assert.ok(mediaPath(value).endsWith('.webp'));images++;}
}
check(allExams);check(artwork);
for(const [path,item]of Object.entries(manifest.images)){
 let previous=0;for(const v of item.variants){assert.ok(v.width>previous&&v.width<=item.width,path);assert.ok(Math.abs(v.width/v.height-item.width/item.height)<.02,path);previous=v.width;}
 assert.ok(mediaImage(path,'<script>').includes('&lt;script&gt;'));
}
for(const path of manifest.files){const bytes=await readFile(new URL('assets/'+path,root));assert.equal(bytes.subarray(0,4).toString(),'RIFF',path);assert.equal(bytes.subarray(8,12).toString(),'WEBP',path);}
const walk=async path=>{let files=[];for(const item of await readdir(path,{withFileTypes:true})){const child=new URL(item.name+(item.isDirectory()?'/':''),path);files.push(...(item.isDirectory()?await walk(child):[child.pathname]));}return files;};
const built=await walk(new URL('../dist/assets/',import.meta.url));assert.equal(built.filter(p=>/\.mp3$/.test(p)).length,140);assert.equal(built.filter(p=>/\.(png|jpe?g|pdf)$/.test(p)).length,0);assert.equal(built.filter(p=>p.endsWith('.webp')).length,manifest.files.length);
let aiPictures=[];await assessWriting(exams.find(e=>e.id==='flyers-06'),{'r7-1':'A child wrote a short story.'},{key:'fixture-only',fetchImpl:async(url,options)=>{const request=JSON.parse(options.body);aiPictures=request.input.flatMap(i=>Array.isArray(i.content)?i.content:[]).filter(c=>c.type==='input_image').map(c=>c.image_url);return new Response(JSON.stringify({output:[{content:[{type:'output_text',text:JSON.stringify({completion:'Fixture',corrections:[],vocabulary:[],score:1,maxScore:5,sample:'Fixture',itemScores:[]})}]}]}));}});assert.equal(aiPictures.length,1);assert.ok(aiPictures[0].endsWith('.webp'));assert.ok(aiPictures[0].includes('/assets/optimized/'));
console.log(`PASS: ${images} image references, ${crops} artwork uses, ${manifest.files.length} valid WebP variants; public output has 140 audio parts and no JPG/PNG atlases.`);
