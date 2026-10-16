const test=new URLSearchParams(location.search).get('test')||'';
await import(test.startsWith('movers-')?'./movers-app.mjs':'./app.mjs');
