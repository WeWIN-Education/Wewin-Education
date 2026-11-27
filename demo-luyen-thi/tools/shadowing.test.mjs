import test from 'node:test';
import assert from 'node:assert/strict';
import {gradeShadowing, pickRecognition, transcriptLines} from '../shadowing-score.mjs';
import {startShadowingCapture} from '../shadowing-capture.mjs';

test('shadowing aligns spoken words without speaker labels, splitting around abbreviations', () => {
  assert.deepEqual(transcriptLines('Tony: Hello, Dr. Brown. How are you?\nJenny: I am fine.'), [
    {speaker:'Tony',text:'Hello, Dr. Brown.'},
    {speaker:null,text:'How are you?'},
    {speaker:'Jenny',text:'I am fine.'},
  ]);
  assert.equal(gradeShadowing('A: Their colour arrived at 8:30.', 'there color arrive at eight thirty').score, 100);
  assert.equal(gradeShadowing('Twelve children.', '12 children').score, 100);
  assert.equal(gradeShadowing('I want to go.', 'I went to go.').counts.incorrect, 1);
  assert.deepEqual(gradeShadowing('Hello Tony thanks goodbye.', 'Hello thanks goodbye now.').counts,
    {correct:3,incorrect:0,missing:1,extra:1});
  assert.equal(gradeShadowing('Hello.', 'Hello what are you doing?').score, 0);
  assert.equal(pickRecognition("What's your name?", [['Watts your game', "What's your name?"]]), "What's your name?");
});

test('recording merges speech sessions and releases the microphone after stopping', async t => {
  let recognition, starts = 0, trackStops = 0;
  const track = {stop() { trackStops++; }};
  const saved = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {configurable:true,value:{mediaDevices:{getUserMedia:async () => ({getTracks:() => [track]})}}});
  globalThis.MediaRecorder = class {
    static isTypeSupported() { return true; }
    mimeType = 'audio/webm';
    state = 'inactive';
    start() { this.state = 'recording'; }
    stop() {
      this.state = 'inactive';
      this.ondataavailable({data:new Blob(['fixture'])});
      this.onstop();
    }
  };
  globalThis.SpeechRecognition = class {
    constructor() { recognition = this; }
    start() { starts++; }
    stop() { this.onend(); }
    abort() {}
  };
  t.after(() => {
    if (saved) Object.defineProperty(globalThis, 'navigator', saved);
    else delete globalThis.navigator;
    delete globalThis.MediaRecorder;
    delete globalThis.SpeechRecognition;
  });
  const scope = new AbortController();
  const live = [];
  const capture = await startShadowingCapture({signal:scope.signal,onText:text=>live.push(text),onError:code=>assert.fail(code)});
  recognition.onresult({resultIndex:0,results:[[{transcript:'Hello'}]]});
  recognition.onend();
  await new Promise(resolve=>setTimeout(resolve,210));
  assert.equal(starts,2);
  recognition.onresult({resultIndex:0,results:[[{transcript:'Tony'}]]});
  const result = await capture.stop();
  assert.equal(live.at(-1),'Hello Tony');
  assert.deepEqual(result.segments,[['Hello'],['Tony']]);
  assert.equal(result.audio.size,7);
  assert.equal(trackStops,1);
});

test('a late microphone grant is closed after navigation cancels recording', async t => {
  const saved = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  let allow, stops = 0;
  Object.defineProperty(globalThis, 'navigator', {configurable:true,value:{mediaDevices:{getUserMedia:() => new Promise(resolve=>{allow=resolve;})}}});
  t.after(() => {
    if (saved) Object.defineProperty(globalThis, 'navigator', saved);
    else delete globalThis.navigator;
  });
  const scope = new AbortController();
  const pending = startShadowingCapture({signal:scope.signal});
  scope.abort();
  allow({getTracks:() => [{stop() { stops++; }}]});
  await assert.rejects(pending, {name:'AbortError'});
  assert.equal(stops, 1);
});
