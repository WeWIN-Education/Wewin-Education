async function decodeRecording(blob) {
  const Context = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  if (!Context) throw new Error('AUDIO_DECODE_UNSUPPORTED');
  const context = new Context(1, 1, 16000);
  const audio = await context.decodeAudioData(await blob.arrayBuffer());
  const samples = new Float32Array(Math.min(audio.length, 480000));
  for (let channel = 0; channel < audio.numberOfChannels; channel++) {
    const data = audio.getChannelData(channel);
    for (let i = 0; i < samples.length; i++) samples[i] += data[i] / audio.numberOfChannels;
  }
  return samples;
}

export function createRecordedRecognizer() {
  let worker;
  const stop = () => { worker?.terminate(); worker = undefined; };
  return {
    stop,
    async transcribe(blob, {signal, onStatus}) {
      const samples = await decodeRecording(blob);
      if (signal.aborted) throw signal.reason;
      const energy = samples.reduce((sum, value) => sum + value * value, 0);
      if (Math.sqrt(energy / Math.max(1, samples.length)) < .002) return '';
      return new Promise((resolve, reject) => {
        worker ||= new Worker(new URL('./shadowing-asr-worker.mjs', import.meta.url), {type: 'module'});
        const active = worker;
        const timeout = setTimeout(() => fail(new Error('ASR_TIMEOUT')), 150000);
        function clean() {
          clearTimeout(timeout);
          signal.removeEventListener('abort', abort);
          active.onmessage = active.onerror = null;
        }
        function fail(error) {
          clean();
          stop();
          reject(error);
        }
        const abort = () => fail(signal.reason);
        signal.addEventListener('abort', abort, {once: true});
        active.onerror = () => fail(new Error('ASR_LOAD_FAILED'));
        active.onmessage = ({data}) => {
          if (data.status === 'transcribing') onStatus();
          if (data.status === 'error') fail(new Error('ASR_FAILED'));
          else if (data.status === 'done') {
            clean();
            resolve(data.text);
          }
        };
        try { active.postMessage(samples, [samples.buffer]); } catch (error) { fail(error); }
      });
    },
  };
}
