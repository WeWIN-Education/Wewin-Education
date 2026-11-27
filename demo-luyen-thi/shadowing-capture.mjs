export function canRecordShadowing() {
  return Boolean(globalThis.navigator?.mediaDevices?.getUserMedia &&
    globalThis.MediaRecorder && (globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition));
}

export async function startShadowingCapture({signal, onText, onError}) {
  const stream = await navigator.mediaDevices.getUserMedia({audio: {echoCancellation: true, noiseSuppression: true}});
  const release = () => stream.getTracks().forEach(track => track.stop());
  if (signal.aborted) {
    release();
    throw new DOMException('Cancelled', 'AbortError');
  }

  let recorder, speech, restart, chunks = [], segments = [], current = [];
  let closing = false, finishSpeech, finishRecorder;
  const speechDone = new Promise(resolve => { finishSpeech = resolve; });
  const recorderDone = new Promise(resolve => { finishRecorder = resolve; });
  const commit = () => { segments.push(...current.filter(Boolean)); current = []; };
  const abort = () => {
    closing = true;
    clearTimeout(restart);
    try { speech?.abort(); } catch {}
    if (recorder?.state === 'recording') recorder.stop();
    release();
    finishSpeech();
    finishRecorder();
  };
  signal.addEventListener('abort', abort, {once: true});

  try {
    const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg']
      .find(type => MediaRecorder.isTypeSupported?.(type));
    recorder = mimeType ? new MediaRecorder(stream, {mimeType}) : new MediaRecorder(stream);
    recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    recorder.onstop = finishRecorder;
    recorder.onerror = () => onError('audio-capture');

    const Recognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
    speech = new Recognition();
    speech.lang = 'en-US';
    speech.continuous = true;
    speech.interimResults = true;
    speech.maxAlternatives = 5;
    speech.onresult = event => {
      current.length = event.results.length;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        current[i] = Array.from(result, option => option.transcript.trim()).filter(Boolean);
      }
      if (!signal.aborted) onText([...segments, ...current.filter(Boolean)].map(options => options[0]).join(' '));
    };
    speech.onerror = ({error}) => {
      if (!closing && error !== 'no-speech' && error !== 'aborted') {
        closing = true;
        finishSpeech();
        onError(error);
      }
    };
    speech.onend = () => {
      commit();
      if (closing || signal.aborted) {
        finishSpeech();
      } else {
        restart = setTimeout(() => {
          if (!closing && !signal.aborted) {
            try { speech.start(); } catch { onError('network'); }
          }
        }, 180);
      }
    };
    recorder.start(250);
    speech.start();
  } catch (error) {
    abort();
    signal.removeEventListener('abort', abort);
    throw error;
  }

  return {
    async stop() {
      closing = true;
      clearTimeout(restart);
      try { speech.stop(); } catch { finishSpeech(); }
      if (recorder.state !== 'inactive') recorder.stop();
      let deadline;
      try {
        await Promise.race([Promise.all([recorderDone, speechDone]), new Promise(resolve => { deadline = setTimeout(resolve, 3000); })]);
        commit();
        return {segments: segments.slice(0, 200), audio: new Blob(chunks, {type: recorder.mimeType})};
      } finally {
        clearTimeout(deadline);
        signal.removeEventListener('abort', abort);
        try { speech.abort(); } catch {}
        release();
        chunks = [];
      }
    },
  };
}
