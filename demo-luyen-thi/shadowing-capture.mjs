export function canRecordShadowing() {
  return Boolean(globalThis.navigator?.mediaDevices?.getUserMedia && globalThis.MediaRecorder);
}

export function useRecordedSpeech(device) {
  // On mobile the recorder and the native recognizer can compete for the mic.
  return Boolean(device?.userAgentData?.mobile ||
    /Android|iPhone|iPad|iPod/i.test(device?.userAgent || '') ||
    (device?.platform === 'MacIntel' && device.maxTouchPoints > 1));
}

export async function startShadowingCapture({signal, onText, onError, liveRecognition = true}) {
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
    recorder.start(250);
    if (liveRecognition && Recognition) speech = new Recognition();
    else finishSpeech();
    if (speech) {
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
          // A failed recognizer must not cut off the independent recording.
        }
      };
      speech.onend = () => {
        commit();
        if (closing || signal.aborted) {
          finishSpeech();
        } else {
          restart = setTimeout(() => {
            if (!closing && !signal.aborted) {
              try { speech.start(); } catch { closing = true; finishSpeech(); }
            }
          }, 180);
        }
      };
      try { speech.start(); } catch { closing = true; finishSpeech(); }
    }
  } catch (error) {
    abort();
    signal.removeEventListener('abort', abort);
    throw error;
  }

  return {
    async stop() {
      closing = true;
      clearTimeout(restart);
      try { speech?.stop(); } catch { finishSpeech(); }
      if (recorder.state !== 'inactive') recorder.stop();
      let deadline;
      try {
        await Promise.race([Promise.all([recorderDone, speechDone]), new Promise(resolve => { deadline = setTimeout(resolve, 3000); })]);
        commit();
        return {segments: segments.slice(0, 200), audio: new Blob(chunks, {type: recorder.mimeType})};
      } finally {
        clearTimeout(deadline);
        signal.removeEventListener('abort', abort);
        try { speech?.abort(); } catch {}
        release();
        chunks = [];
      }
    },
  };
}
