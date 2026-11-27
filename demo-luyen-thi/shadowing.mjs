import {getLanguage} from './language.mjs';
import {escapeHTML as esc} from './learning-ui.mjs';
import {gradeShadowing, pickRecognition} from './shadowing-score.mjs';
import {canRecordShadowing, startShadowingCapture, useRecordedSpeech} from './shadowing-capture.mjs';
import {createRecordedRecognizer} from './shadowing-asr.mjs';

const videoId = 'tuW5ZOpz79o';
const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
const storageKey = 'wewin_shadowing_progress_gogo-01-v1';
// Short excerpts, using the caption anchors on this exact YouTube upload.
const cues = [
  {start: 56.8, end: 64, text: "Hello. Hello. My name's Tony. What's your name?", vi: 'Xin chào. Xin chào. Mình tên Tony. Bạn tên gì?'},
  {start: 99.8, end: 109, text: "Hello, Gogo. How are you? How are you? I'm fine, thank you.", vi: 'Chào Gogo. Bạn khỏe không? Bạn khỏe không? Mình khỏe, cảm ơn bạn.'},
  {start: 177.8, end: 185, text: 'Goodbye, Jenny. Goodbye, Tony.', vi: 'Tạm biệt, Jenny. Tạm biệt, Tony.'},
];
const fullText = cues.map(cue => cue.text).join(' ');
const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const copy = (vi, en) => getLanguage() === 'en' ? en : vi;
const button = (name, action, attrs = '', style = '') =>
  `<button class="btn ${style}" type="button" data-shadow="${action}" ${attrs}>${name}</button>`;
const cueWords = cues.map(cue => {
  const words = cue.text.split(/\s+/);
  const weights = words.map(word => Math.max(2, word.replace(/[^\p{L}\p{N}]/gu,'').length) + (/[.!?]$/.test(word) ? 2.5 : /[,;:]$/.test(word) ? 1.5 : 0));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let elapsed = 0;
  return words.map((text, i) => {
    const start = cue.start + (cue.end - cue.start) * elapsed / total;
    elapsed += weights[i];
    return {text, start};
  });
});

let apiLoading;
function youtubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiLoading) {
    apiLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const previous = window.onYouTubeIframeAPIReady;
      function complete(error) {
        clearTimeout(timeout);
        window.onYouTubeIframeAPIReady = previous;
        if (error) { script.remove(); reject(error); }
        else resolve(window.YT);
      }
      const timeout = setTimeout(() => complete(Error('YouTube timeout')), 12000);
      window.onYouTubeIframeAPIReady = () => {
        try { previous?.(); } finally { complete(); }
      };
      script.async = true;
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = () => complete(Error('YouTube unavailable'));
      document.head.append(script);
    }).catch(error => { apiLoading = null; throw error; });
  }
  return apiLoading;
}

export function createShadowing() {
  const recordedRecognizer = createRecordedRecognizer();
  const recordedMode = useRecordedSpeech(globalThis.navigator) || !(globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition);
  let host, shell, player, playerTimer, ready = false, playerError = false, playbackRate = 1, playing = false;
  let index = 0, whole = false, translation = true, selectedCue = null, animation = null, highlightedWord, auto = false, autoTimer;
  let state = 'idle', recording, captureScope, recordTimer, recordStarted, recordLimit, transcript = '', issue = '';
  let recordingUrl, result;
  let checkingRecording = '';
  let scores = {};
  try {
    const saved = JSON.parse(globalThis.localStorage?.getItem(storageKey) || '{}');
    scores = Object.fromEntries(Object.entries(saved || {}).filter(([i, value]) => /^(0|1|2|whole)$/.test(i) && Number.isInteger(value) && value >= 0 && value <= 100));
  } catch {}

  const busy = () => state !== 'idle';
  const selected = () => cues[index];
  const show = selector => shell?.querySelector(selector);
  const clearAuto = () => { auto = false; clearTimeout(autoTimer); };

  function resultMarkup() {
    const labels = {correct: copy('Đúng', 'Correct'), incorrect: copy('Sai khác', 'Different'), missing: copy('Thiếu', 'Missing'), extra: copy('Thừa', 'Extra')};
    const replay = recordingUrl ? `<div class="shadow-replay"><strong>${copy('Nghe giọng của bạn', 'Your recording')}</strong><audio controls preload="metadata" src="${esc(recordingUrl)}" aria-label="${copy('Bản ghi của bạn', 'Your recording')}"></audio></div>` : '';
    if (!result) return replay;
    return `<section class="shadow-result" aria-label="${copy('Kết quả đối chiếu', 'Match result')}">
      <div class="shadow-result-top"><div><h3>${copy('Mức khớp nội dung', 'Content match')}</h3><p>${copy('Điểm dựa trên từ trình duyệt nhận ra, không phải điểm phát âm.', 'This score measures the words recognised by your browser. It is not a pronunciation score.')}</p></div><strong role="status">${result.score}%</strong></div>
      <dl class="shadow-stats">${Object.entries(labels).map(([key, value]) => `<div><dt>${value}</dt><dd>${result.counts[key]}${key === 'correct' ? '/' + result.total : ''}</dd></div>`).join('')}</dl>
      <div class="shadow-alignment" lang="en">${result.results.map(item => `<span class="shadow-word-result is-${item.status}" title="${labels[item.status]}">${esc(item.expected || item.actual)}${item.status === 'incorrect' ? `<del>${esc(item.actual)}</del>` : ''}${item.status !== 'correct' ? `<small lang="${getLanguage()}">${labels[item.status]}</small>` : ''}</span>`).join('')}</div>
      <p class="shadow-heard"><strong>${copy('Máy nghe được', 'Recognised words')}</strong><br><span lang="en">${esc(transcript)}</span></p>
      ${replay}
    </section>`;
  }

  function renderParts() {
    if (!shell?.isConnected) return;
    const buttons = show('.shadow-sentences');
    const deck = show('.shadow-studio');
    const clicked = shell.contains(document.activeElement) ? document.activeElement.dataset.shadow : '';
    const activeIndex = shell.contains(document.activeElement) ? document.activeElement.dataset.index : '';
    const progress = Object.entries(scores).filter(([key]) => key !== 'whole').map(([, value]) => value);
    show('.shadow-progress').textContent = copy(`Đã luyện ${progress.length}/${cues.length} đoạn`, `${progress.length}/${cues.length} clips practised`);
    buttons.innerHTML = cues.map((cue, i) => `<button type="button" class="shadow-cue" data-shadow="select" data-index="${i}" aria-pressed="${index === i}" ${busy() ? 'disabled' : ''}>
      <span class="shadow-cue-meta"><span>${clock(cue.start + .2)}</span>${scores[i] === undefined ? '' : `<strong>${scores[i]}%</strong>`}</span>
      <span class="shadow-cue-copy"><strong lang="en">${esc(cue.text)}</strong>${translation ? `<span>${esc(cue.vi)}</span>` : ''}</span>
    </button>`).join('');
    const canRecord = canRecordShadowing();
    const prompt = whole ? esc(fullText) : cueWords[index].map((word, i) =>
      `<button class="shadow-timed-word" type="button" data-shadow="word" data-index="${i}" ${!ready || busy() ? 'disabled' : ''}>${esc(word.text)}</button>`).join(' ');
    const micLabel = ({
      starting: copy('Đang mở micro…', 'Opening microphone…'),
      recording: copy('Dừng ghi âm', 'Stop recording'),
      processing: checkingRecording || copy('Đang đối chiếu…', 'Checking words…'),
    })[state] || (result || recordingUrl ? copy('Ghi âm lại', 'Record again') : copy('Ghi âm', 'Record'));
    deck.innerHTML = `
      <div class="shadow-mode" role="group" aria-label="${copy('Chế độ luyện', 'Practice mode')}">
        ${button(copy('Từng đoạn', 'By clip'), 'clip', `aria-pressed="${!whole}" ${busy() ? 'disabled' : ''}`)}
        ${button(copy('Cả bài mẫu', 'Full sample'), 'whole', `aria-pressed="${whole}" ${busy() ? 'disabled' : ''}`)}
      </div>
      <div class="shadow-prompt">
        <header><h2>${whole ? copy('Đọc cả bài mẫu', 'Read the full sample') : copy(`Nhắc lại đoạn ${index + 1}`, `Repeat clip ${index + 1}`)}</h2>
        ${whole && scores.whole !== undefined ? `<strong>${copy('Lần gần nhất', 'Last score')} · ${scores.whole}%</strong>` : ''}</header>
        <p class="shadow-model" lang="en">${prompt}</p>
        <p class="shadow-clock" ${state === 'recording' ? '' : 'hidden'}></p>
        <p class="shadow-live" lang="en" ${state === 'recording' || state === 'processing' ? '' : 'hidden'}>${esc(transcript)}</p>
        <p class="shadow-checking" role="status" ${checkingRecording ? '' : 'hidden'}>${esc(checkingRecording)}</p>
        <p class="shadow-error" role="alert" ${issue ? '' : 'hidden'}>${esc(issue)}</p>
        ${canRecord ? `<p class="shadow-note">${recordedMode ? copy('Điện thoại chấm sau khi dừng ghi. Lần đầu cần tải bộ nhận dạng khoảng 54 MB. Giọng nói được xử lý ngay trên thiết bị.', 'Your device scores the recording after you stop. First use needs a download of about 54 MB. Speech is processed on your device.') :
          copy('Trình duyệt có thể dùng dịch vụ nhận dạng của hãng. Nếu dịch vụ không trả chữ, Exam chấm lại từ bản ghi ngay trên thiết bị.', 'Your browser may use its speech recognition service. If it returns no words, Exam checks the recording on your device.')}</p>` :
          `<p class="shadow-note">${copy('Để ghi âm, hãy mở bằng trình duyệt hỗ trợ micro như Chrome, Edge hoặc Safari.', 'To record, use a browser with microphone support, such as Chrome, Edge or Safari.')}</p>`}
      </div>
      <div class="shadow-actions">
        ${button(copy('Đoạn trước', 'Previous clip'), 'previous', busy() || index === 0 ? 'disabled' : '')}
        ${button(copy('Nghe đoạn mẫu', 'Listen to clip'), 'listen', !ready || busy() ? 'disabled' : '')}
        ${button(micLabel, 'record', ` ${(!canRecord || state === 'starting' || state === 'processing') ? 'disabled' : ''}`, state === 'recording' ? 'shadow-stop' : 'primary')}
        ${button(copy('Đoạn tiếp', 'Next clip'), 'next', busy() || index === cues.length - 1 ? 'disabled' : '')}
      </div>
      <div class="shadow-shortcuts">${whole ? '' : button(auto ? copy('Tắt luyện tự động', 'Stop auto-practice') : copy('Luyện tự động', 'Auto-practice'), 'auto', `aria-pressed="${auto}" ${!auto && (!ready || !canRecord || busy()) ? 'disabled' : ''}`)}
        <small>${copy('Phím tắt R nghe lại · M ghi/dừng · ← → đổi đoạn', 'R replay · M record/stop · ← → change clip')}</small>
      </div>
      ${resultMarkup()}`;
    show('.shadow-load').hidden = ready;
    show('.shadow-load-text').textContent = playerError ? copy('Không mở được trình phát nhúng. Bạn có thể mở video trên YouTube.', 'The embedded player could not load. You can watch on YouTube.') :
      copy('Mở video để nghe từng đoạn hội thoại.', 'Load the video to listen to the dialogue clips.');
    show('[data-shadow="load"]').disabled = Boolean(player && !playerError);
    show('.shadow-speed').disabled = !ready || busy();
    show('.shadow-speed').value = String(playbackRate);
    show('.shadow-source').href = videoUrl + '&t=' + Math.floor(selected().start) + 's';
    if (clicked) {
      const targets = [...shell.querySelectorAll('[data-shadow]')];
      targets.find(el => el.dataset.shadow === clicked && el.dataset.index === activeIndex)?.focus({preventScroll: true});
    }
  }

  function clearReplay() {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    recordingUrl = null;
    result = null;
    transcript = '';
  }

  function settleClip() {
    selectedCue = null;
    cancelAnimationFrame(animation);
    highlightedWord?.classList.remove('is-current');
    player?.pauseVideo?.();
    if (auto) autoTimer = setTimeout(() => { if (auto) beginRecording(); }, 250);
  }

  function tick() {
    if (!ready || !playing) return;
    const time = player.getCurrentTime();
    if (selectedCue && time >= selectedCue.end) {
      settleClip();
      return;
    }
    const word = !whole && time < selected().end ? cueWords[index].findLastIndex(item => item.start <= time) : -1;
    const next = word < 0 ? null : show('.shadow-model')?.children[word];
    if (next !== highlightedWord) {
      highlightedWord?.classList.remove('is-current');
      next?.classList.add('is-current');
      highlightedWord = next;
    }
    animation = requestAnimationFrame(tick);
  }

  async function loadPlayer() {
    const container = shell;
    if (playerError) { player?.destroy?.(); player = null; }
    playerError = false;
    show('.shadow-load-text').textContent = copy('Đang mở video…', 'Loading video…');
    show('[data-shadow="load"]').disabled = true;
    function fail() {
      if (shell !== container) return;
      clearTimeout(playerTimer);
      clearAuto();
      ready = false;
      playerError = true;
      renderParts();
    }
    try {
      const yt = await youtubeApi();
      if (shell !== container || !container.isConnected) return;
      const embed = document.createElement('iframe');
      embed.src = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&playsinline=1&rel=0&origin=${encodeURIComponent(location.origin)}`;
      embed.title = 'Gogo · Episode 1';
      embed.referrerPolicy = 'strict-origin-when-cross-origin';
      embed.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
      embed.allowFullscreen = true;
      show('.shadow-video').replaceChildren(embed);
      playerTimer = setTimeout(fail, 12000);
      player = new yt.Player(embed, {events: {
        onReady() {
          if (shell !== container || playerError) return;
          clearTimeout(playerTimer);
          ready = true;
          renderParts();
        },
        onStateChange(event) {
          if (shell !== container) return;
          playing = event.data === yt.PlayerState.PLAYING;
          cancelAnimationFrame(animation);
          if (playing && busy()) { player.pauseVideo(); return; }
          if (playing) tick();
          else if (event.data === yt.PlayerState.ENDED && selectedCue) settleClip();
        },
        onError: fail,
        onAutoplayBlocked() {
          if (shell !== container) return;
          clearAuto();
          issue = copy('Trình duyệt chặn phát tự động. Hãy bấm Phát trực tiếp trên video.', 'Playback was blocked. Press Play on the video.');
          renderParts();
        },
      }});
    } catch { fail(); }
  }

  function listen(start = selected().start) {
    if (!ready || busy()) return;
    clearTimeout(autoTimer);
    show('.shadow-replay audio')?.pause();
    selectedCue = selected();
    player.seekTo(start, true);
    player.setPlaybackRate(playbackRate);
    player.playVideo();
  }

  function select(i, seek = true) {
    if (busy() || i < 0 || i >= cues.length) return;
    if (i !== index) clearReplay();
    index = i;
    issue = '';
    selectedCue = null;
    if (ready && seek) {
      player.pauseVideo();
      player.seekTo(selected().start, true);
      player.pauseVideo();
    }
    renderParts();
  }

  function captureError(code) {
    if (['NotAllowedError', 'not-allowed', 'service-not-allowed'].includes(code)) return copy('Micro hoặc nhận dạng giọng nói chưa được cấp quyền. Hãy kiểm tra quyền của trang.', 'Microphone or speech recognition permission is missing. Check the site permissions.');
    if (code === 'network') return copy('Nhận dạng giọng nói bị gián đoạn. Hãy kiểm tra mạng rồi thử lại.', 'Speech recognition was interrupted. Check your connection and try again.');
    return copy('Không thu được âm thanh. Hãy kiểm tra micro rồi thử lại.', 'Audio could not be recorded. Check the microphone and try again.');
  }

  async function beginRecording() {
    if (busy() || !canRecordShadowing()) return;
    clearTimeout(autoTimer);
    if (ready) player.pauseVideo();
    selectedCue = null;
    clearReplay();
    issue = '';
    state = 'starting';
    const scope = new AbortController();
    captureScope = scope;
    const reference = whole ? fullText : selected().text;
    recordLimit = whole ? 30 : Math.max(4, Math.round((selected().end - selected().start) * 2 + 2));
    renderParts();
    try {
      const started = await startShadowingCapture({
        signal: scope.signal,
        liveRecognition: !recordedMode,
        onText(value) {
          if (scope.signal.aborted) return;
          transcript = value;
          const live = show('.shadow-live');
          if (live) live.textContent = value;
        },
        onError(code) {
          if (scope.signal.aborted) return;
          issue = captureError(code);
          clearAuto();
          if (state === 'recording') finishRecording(reference);
        },
      });
      if (scope.signal.aborted) return;
      recording = started;
      state = 'recording';
      recordStarted = Date.now();
      renderParts();
      const update = () => {
        const elapsed = (Date.now() - recordStarted) / 1000;
        const time = show('.shadow-clock');
        if (time) time.textContent = `${copy('Đang ghi', 'Recording')} · ${clock(elapsed)} / ${clock(recordLimit)}`;
        if (elapsed >= recordLimit) finishRecording(reference);
      };
      if (issue) { finishRecording(reference); return; }
      recordTimer = setInterval(update, 200);
      update();
    } catch (error) {
      if (scope.signal.aborted) return;
      issue = captureError(error.name);
      clearAuto();
      state = 'idle';
      captureScope = null;
      renderParts();
    }
  }

  async function finishRecording(reference = whole ? fullText : selected().text) {
    if (state !== 'recording') return;
    const scope = captureScope;
    state = 'processing';
    clearInterval(recordTimer);
    renderParts();
    try {
      const out = await recording.stop();
      if (scope.signal.aborted) return;
      if (out.audio.size) recordingUrl = URL.createObjectURL(out.audio);
      transcript = pickRecognition(reference, out.segments) || transcript.trim();
      if (!transcript && out.audio.size) {
        checkingRecording = copy('Đang chuẩn bị nhận dạng bản ghi…', 'Preparing recording recognition…');
        renderParts();
        try {
          transcript = await recordedRecognizer.transcribe(out.audio, {
            signal: scope.signal,
            onStatus() {
              checkingRecording = copy('Đang nghe lại bản ghi để chấm…', 'Transcribing your recording…');
              renderParts();
            },
          });
          if (scope.signal.aborted) return;
        } catch {
          if (scope.signal.aborted) return;
          issue = copy('Bản ghi vẫn nghe lại được. Thiết bị chưa chạy được bộ nhận dạng. Kiểm tra kết nối rồi thử lại.', 'Your recording is still available. The recognizer could not run. Check your connection and try again.');
        }
      }
      if (!transcript) {
        issue ||= copy('Bộ nhận dạng không trả về từ nào. Bạn có thể nghe lại bản ghi rồi thử lại.', 'The recognizer returned no words. Play back your recording and try again.');
        clearAuto();
      } else {
        result = gradeShadowing(reference, transcript);
        scores[whole ? 'whole' : index] = result.score;
        try { localStorage.setItem(storageKey, JSON.stringify(scores)); } catch {}
        if (auto && index < cues.length - 1) autoTimer = setTimeout(() => { if (auto) { select(index + 1, false); listen(); } }, 1200);
        else clearAuto();
      }
    } catch {
      if (!scope.signal.aborted) { clearAuto(); issue = captureError('audio-capture'); }
    } finally {
      if (!scope.signal.aborted) {
        state = 'idle';
        checkingRecording = '';
        recording = null;
        captureScope = null;
        renderParts();
        show('.shadow-result')?.scrollIntoView({block: 'nearest'});
      }
    }
  }

  function action(target) {
    switch (target.dataset.shadow) {
      case 'load': loadPlayer(); break;
      case 'listen': listen(); break;
      case 'word': clearAuto(); listen(cueWords[index][Number(target.dataset.index)].start); break;
      case 'record': if (state === 'recording') finishRecording(); else beginRecording(); break;
      case 'previous': clearAuto(); select(index - 1); break;
      case 'next': clearAuto(); select(index + 1); break;
      case 'select': clearAuto(); select(Number(target.dataset.index)); break;
      case 'translation': translation = !translation; target.setAttribute('aria-pressed', String(translation)); renderParts(); break;
      case 'clip':
      case 'whole':
        if (busy()) return;
        clearAuto();
        whole = target.dataset.shadow === 'whole';
        clearReplay();
        issue = '';
        renderParts();
        break;
      case 'auto':
        if (auto) {
          clearAuto();
          selectedCue = null;
          player.pauseVideo();
          if (state === 'starting') { captureScope?.abort(); captureScope = null; state = 'idle'; }
          if (state === 'recording') finishRecording();
        } else if (!busy() && ready && canRecordShadowing()) {
          auto = true;
          listen();
        }
        renderParts();
        break;
    }
  }

  function keyboard(event) {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.target.closest?.('button,input,textarea,select,a,audio,[contenteditable],dialog')) return;
    const key = event.key.toLowerCase();
    if (key === 'm') { event.preventDefault(); if (state === 'recording') finishRecording(); else beginRecording(); }
    else if (key === ' ' && ready && !busy()) {
      event.preventDefault();
      clearAuto();
      if (playing) player.pauseVideo();
      else if (selectedCue) player.playVideo();
      else listen();
    }
    else if (!busy() && ['r', 'arrowleft', 'arrowright'].includes(key)) {
      event.preventDefault();
      if (key === 'r') listen();
      else { clearAuto(); select(index + (key === 'arrowleft' ? -1 : 1)); }
    }
  }

  function stop() {
    if (!shell) return;
    document.removeEventListener('keydown', keyboard);
    window.removeEventListener('pagehide', stop);
    clearAuto();
    clearTimeout(playerTimer);
    clearInterval(recordTimer);
    captureScope?.abort();
    recordedRecognizer.stop();
    captureScope = recording = null;
    state = 'idle';
    issue = '';
    checkingRecording = '';
    cancelAnimationFrame(animation);
    highlightedWord = null;
    clearReplay();
    player?.destroy?.();
    player = null;
    shell = host = null;
    ready = playing = playerError = false;
    selectedCue = null;
  }

  function mount(root) {
    const slot = root.querySelector('#shadowing-root');
    if (!slot || slot === host) return;
    stop();
    host = slot;
    host.innerHTML = `<section class="shadowing" aria-labelledby="shadowing-title">
      <header class="shadow-heading"><div><h1 id="shadowing-title">Shadowing</h1><p>${copy('Nghe câu mẫu, nhắc lại và xem những từ trình duyệt nhận ra.', 'Listen, repeat, and see which words your browser recognises.')}</p></div>
      <span class="shadow-badge">${copy('Bài thử · A1', 'Pilot lesson · A1')}</span></header>
      <div class="shadow-grid">
        <div class="shadow-main">
          <section class="shadow-player" aria-labelledby="shadow-video-title">
            <header><h2 id="shadow-video-title">${copy('Học tiếng Anh cùng Gogo · Tập 1', 'Learn English with Gogo · Episode 1')}</h2><a class="shadow-source" href="${videoUrl}" rel="noopener noreferrer" target="_blank">YouTube ↗</a></header>
            <div class="shadow-media"><div class="shadow-video"></div><div class="shadow-load"><p class="shadow-load-text"></p>${button(copy('Mở video mẫu', 'Load sample video'), 'load', '', 'primary')}</div></div>
            <div class="shadow-video-tools"><label>${copy('Tốc độ', 'Speed')} <select class="shadow-speed" disabled><option value=".5">0.5×</option><option value=".75">0.75×</option><option value="1">1×</option><option value="1.25">1.25×</option></select></label>
            <span>${copy('Thời điểm tô sáng từng từ là ước lượng.', 'Word highlighting uses estimated timing.')}</span></div>
          </section>
          <section class="shadow-studio" aria-label="${copy('Phòng luyện nói', 'Speaking studio')}"></section>
        </div>
        <aside class="shadow-transcript" aria-label="${copy('Lời thoại mẫu', 'Sample dialogue')}">
          <header><div><h2>${copy('Lời thoại mẫu', 'Sample dialogue')}</h2><p class="shadow-progress"></p></div>
          ${button(copy('Bản dịch', 'Translation'), 'translation', `aria-pressed="${translation}"`)}</header>
          <div class="shadow-sentences"></div>
        </aside>
      </div>
    </section>`;
    shell = host.firstElementChild;
    shell.addEventListener('click', event => {
      const target = event.target.closest('[data-shadow]');
      if (target && !target.disabled) action(target);
    });
    show('.shadow-speed').addEventListener('change', event => {
      playbackRate = Number(event.target.value);
      player?.setPlaybackRate?.(playbackRate);
    });
    document.addEventListener('keydown', keyboard);
    window.addEventListener('pagehide', stop, {once: true});
    renderParts();
  }

  return {mount, stop};
}
