import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,basename} from 'node:path';
import manifest from '../media-manifest.mjs';
import {allExams} from '../public-data.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),dist=resolve(root,'dist');
if(basename(dist)!=='dist'||resolve(dist,'..')!==resolve(root))throw new Error('Unsafe build destination');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
const files=['index.html','styles.css','lead-gate.css','refresh.css','platform.css','learning.css','learning-color.css','learning-ui.mjs','learning-shell.mjs','library.mjs','theme.mjs','lead-fields.mjs','lead-gate.mjs','catalog.mjs','public-data.mjs','media.mjs','media-manifest.mjs','client-api.mjs','picture-ui.mjs','platform-app.mjs','bootstrap.mjs'];
for(const name of files)await cp(resolve(root,name),resolve(dist,name));
const assets=new Set([...manifest.files,...allExams.flatMap(e=>e.audio)]);
for(const file of assets){const destination=resolve(dist,'assets',file);await mkdir(resolve(destination,'..'),{recursive:true});await cp(resolve(root,'assets',file),destination);}
const data=await readFile(resolve(dist,'public-data.mjs'),'utf8');
if(/"(?:answer|accepted|sample|matchKey|password_hash)"\s*:/.test(data))throw new Error('Private content in public catalog');
await writeFile(resolve(dist,'robots.txt'),'User-agent: *\nDisallow: /api/\n');
console.log(`Public build ready: ${manifest.files.length} optimized WebP files, ${allExams.reduce((n,e)=>n+e.audio.length,0)} original Part audio files; no original raster atlases, private keys, PDFs or secrets.`);
