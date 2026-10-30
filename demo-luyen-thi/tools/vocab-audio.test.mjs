import test from 'node:test';
import assert from 'node:assert/strict';
import {createWordPlayer} from '../vocab-audio.mjs';

test('plays the supplied file and cancels old playback callbacks when moving to another word',async()=>{
 const clips=[],states=[];let errors=0;
 const player=createWordPlayer({createAudio:()=>{let resolve,reject;const clip={paused:false,cleared:false,loaded:false,pause(){this.paused=true;},removeAttribute(name){if(name==='src')this.cleared=true;},load(){this.loaded=true;},play:()=>new Promise((a,b)=>{resolve=a;reject=b;}),resolve:()=>resolve(),reject:e=>reject(e)};clips.push(clip);return clip;},onState:(...v)=>states.push(v),onError:()=>errors++});
 const first=player.play({audio:'vocab-audio/starters/001.mp3'});assert.equal(clips[0].src,'assets/vocab-audio/starters/001.mp3');clips[0].resolve();await first;assert.deepEqual(states.at(-1),['playing','vocab-audio/starters/001.mp3']);
 const second=player.play({audio:'vocab-audio/movers/002.mp3'});assert.ok(clips[0].paused&&clips[0].cleared&&clips[0].loaded);const length=states.length;clips[0].onended();clips[0].onerror();assert.equal(states.length,length);assert.equal(errors,0);
 clips[1].onerror();clips[1].reject(new Error('Network failed'));await second;assert.equal(errors,1);assert.deepEqual(states.at(-1),['idle',null]);
 const third=player.play({audio:'vocab-audio/flyers/003.mp3'});player.stop();clips[2].reject(Object.assign(new Error('Stopped'),{name:'AbortError'}));await third;assert.equal(errors,1);assert.deepEqual(states.at(-1),['idle',null]);
 await player.play({audio:'https://untrusted.example/word.mp3'});assert.equal(clips.length,3);assert.equal(errors,2);
});
