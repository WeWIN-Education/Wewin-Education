import {requireLeadAccess} from './lead-gate.mjs';
const access=requireLeadAccess();
const test=new URLSearchParams(location.search).get('test')||'';
await import((test.startsWith('movers-')||test.startsWith('flyers-'))?'./movers-app.mjs':'./app.mjs');
await access;
