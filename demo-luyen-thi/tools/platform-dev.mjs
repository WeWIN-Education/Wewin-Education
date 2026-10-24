import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
import {createLeadHandler} from '../lead-server.mjs';
import {createPlatformHandler,passwordHash} from '../server/platform.mjs';
import {Repository} from '../server/repository.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const production=process.argv.includes('--production-services');
let repo,handler;
if(!production){
 const {PGlite}=await import('@electric-sql/pglite');repo=new Repository(new PGlite());await repo.migrate();
 const password=await passwordHash('Local-Test-2026!');
 const admin=await repo.createUser({username:'local.admin',nickname:'Local admin fixture',role:'admin',passwordHash:password,mustChange:false});
 const teacher=await repo.createUser({username:'local.teacher',nickname:'Local teacher fixture',role:'teacher',passwordHash:password,mustChange:false});
 const student=await repo.createUser({username:'local.student',nickname:'Local student fixture',role:'student',passwordHash:password,mustChange:false});
 const cls=await repo.createClass('Local test class',teacher.id);await repo.enroll(cls.id,student.id);
 handler=createPlatformHandler({getRepository:async()=>repo,leadSecret:'development-only-lead-secret-over-thirty-two-characters',ai:async exam=>({completion:'DỮ LIỆU MÔ PHỎNG CỤC BỘ — không phải kết quả AI thật. Bài có nội dung để kiểm tra giao diện.',corrections:[{original:'They was happy.',corrected:'They were happy.',explanation:'Dùng were với chủ ngữ số nhiều.'}],vocabulary:['afterwards — sau đó','together — cùng nhau'],score:exam.levelKey==='movers'?4:4,maxScore:exam.levelKey==='movers'?6:5,sample:'The children helped one another and played together.',itemScores:exam.levelKey==='movers'?[1,1,1,1,0,0]:[]})});
}else handler=createPlatformHandler();
const lead=createLeadHandler(production?{}:{secret:'development-only-lead-secret-over-thirty-two-characters',fetchImpl:async url=>new Response(url.endsWith('viewform')?'<input name="fbzx" value="test">':'<div>Cảm ơn Quý phụ huynh đã đăng ký! WeWIN Education đã ghi nhận thông tin</div>')});
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg'};
createServer(async(req,res)=>{
 try{const path=new URL(req.url,'http://localhost').pathname;if(path==='/api/practice')return handler(req,res);if(path==='/api/lead')return lead(req,res);
 const file=resolve(root,'.'+(path==='/'?'/index.html':decodeURIComponent(path)));if(!file.startsWith(resolve(root)+sep)){res.writeHead(403);return res.end();}const info=await stat(file);if(!info.isFile())throw new Error();const headers={'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes'};
 if(req.headers.range){const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!match){res.writeHead(416);return res.end();}const start=Number(match[1]),end=Math.min(Number(match[2]||info.size-1),info.size-1);if(start>end){res.writeHead(416);return res.end();}const bytes=await readFile(file);res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${info.size}`,'Content-Length':end-start+1});return res.end(bytes.subarray(start,end+1));}
 res.writeHead(200,{...headers,'Content-Length':info.size});if(req.method==='HEAD')return res.end();res.end(await readFile(file));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(8780,'127.0.0.1',()=>console.log('Preview http://127.0.0.1:8780 — '+(production?'REAL services':'local isolated Postgres and explicitly simulated AI; fixture logins local.admin / local.teacher / local.student, password Local-Test-2026!')));
