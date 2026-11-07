import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,basename} from 'node:path';
import manifest from '../media-manifest.mjs';
import {allExams} from '../public-data.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),dist=resolve(root,'dist');
if(basename(dist)!=='dist'||resolve(dist,'..')!==resolve(root))throw new Error('Unsafe build destination');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
const files=['combobox.mjs','combobox.css','search.mjs','assignments-ui.mjs','assignments.css','vocab-audio.mjs','vocab.mjs','vocab-catalog.mjs','vocab.css','storyland.mjs','storyland.css','guest-session.mjs','language.mjs','language.css','hero-mascot.css','shields.mjs','results-ui.mjs','index.html','styles.css','lead-gate.css','refresh.css','platform.css','learning.css','learning-color.css','learning-ui.mjs','learning-shell.mjs','library.mjs','theme.mjs','lead-fields.mjs','lead-gate.mjs','catalog.mjs','public-data.mjs','media.mjs','media-manifest.mjs','client-api.mjs','picture-ui.mjs','platform-app.mjs','bootstrap.mjs'];
for(const name of files)await cp(resolve(root,name),resolve(dist,name));
await cp(resolve(root,'vocab-data'),resolve(dist,'vocab-data'),{recursive:true});
await cp(resolve(root,'assets/vocab'),resolve(dist,'assets/vocab'),{recursive:true});
await cp(resolve(root,'assets/vocab-audio'),resolve(dist,'assets/vocab-audio'),{recursive:true});
await cp(resolve(root,'assets/storyland'),resolve(dist,'assets/storyland'),{recursive:true});
await cp(resolve(root,'storyland'),resolve(dist,'storyland'),{recursive:true});
const assets=new Set([...manifest.files,...allExams.flatMap(e=>[...e.audio,...(e.fullAudio?[e.fullAudio]:[]),...(e.studentPdf?[e.studentPdf]:[])]),...(allExams.some(e=>e.levelKey==='ket')?['ket/pdf/WeWIN_KET_All_10_Mock_Tests.pdf']:[]),'logo.png','favicon.png','design-20261024/education-pattern.svg']);
for(const file of assets){const destination=resolve(dist,'assets',file);await mkdir(resolve(destination,'..'),{recursive:true});await cp(resolve(root,'assets',file),destination);}
// Embed the tiny decorative pattern so previews do not depend on SVG MIME handling or another request.
const pattern=await readFile(resolve(root,'assets/design-20261024/education-pattern.svg'));
const colourCSS=await readFile(resolve(dist,'learning-color.css'),'utf8');
await writeFile(resolve(dist,'learning-color.css'),colourCSS.replaceAll('assets/design-20261024/education-pattern.svg','data:image/svg+xml;base64,'+pattern.toString('base64')));
const data=await readFile(resolve(dist,'public-data.mjs'),'utf8');
if(/"(?:answer|accepted|sample|matchKey|password_hash)"\s*:/.test(data))throw new Error('Private content in public catalog');
await writeFile(resolve(dist,'robots.txt'),'User-agent: *\nDisallow: /api/\n');
console.log(`Public build ready: ${manifest.files.length} optimized WebP files, ${allExams.reduce((n,e)=>n+e.audio.length,0)} Part audio files plus KET full recordings, StoryLand 50 bilingual stories, and student PDFs; no private keys, teacher PDFs or secrets.`);
