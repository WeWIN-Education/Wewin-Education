import {env, pipeline} from './assets/shadowing-model/runtime/transformers.min.js';

env.allowRemoteModels = false;
env.localModelPath = new URL('./assets/shadowing-model/', import.meta.url).href;
env.backends.onnx.wasm.wasmPaths = new URL('./assets/shadowing-model/runtime/', import.meta.url).href;
env.backends.onnx.wasm.numThreads = 1;

let recognizer;
self.onmessage = async ({data: samples}) => {
  try {
    recognizer ||= pipeline('automatic-speech-recognition', 'whisper-tiny.en', {quantized: true});
    const transcribe = await recognizer;
    self.postMessage({status: 'transcribing'});
    const result = await transcribe(samples, {max_new_tokens: 120, no_repeat_ngram_size: 4});
    self.postMessage({status: 'done', text: result.text.trim()});
  } catch {
    recognizer = null;
    self.postMessage({status: 'error'});
  }
};
