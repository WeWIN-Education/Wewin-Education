const test=new URLSearchParams(location.search).get('test')||'';
await import((test.startsWith('movers-')||test.startsWith('flyers-'))?'./movers-app.mjs':'./app.mjs');
