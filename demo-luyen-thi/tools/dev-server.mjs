import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname,sep} from 'node:path';
import {createLeadHandler} from '../lead-server.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const mock=process.argv.includes('--mock-leads');
const handler=createLeadHandler(mock?{secret:'local-testing-secret-not-used-in-production',fetchImpl:async url=>new Response(url.endsWith('viewform')?'<input name="fbzx" value="test">':'<div>Cảm ơn Quý phụ huynh đã đăng ký! WeWIN Education đã ghi nhận thông tin</div>')}:{});
const mime={'.html':'text/html','.mjs':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg'};
createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  if(path==='/api/lead')return handler(req,res);
  const file=resolve(root,'.'+(path==='/'?'/index.html':decodeURIComponent(path)));
  if(!file.startsWith(resolve(root)+sep)){res.writeHead(403);return res.end();}
  try{const info=await stat(file);if(!info.isFile())throw new Error();res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await readFile(file));}
  catch{res.writeHead(404);res.end('Not found');}
}).listen(8766,'127.0.0.1',()=>console.log('Local preview http://127.0.0.1:8766; mock leads:',mock));
