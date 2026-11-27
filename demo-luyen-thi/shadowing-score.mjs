const small = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ');
const tens = 'zero ten twenty thirty forty fifty sixty seventy eighty ninety'.split(' ');
const homophones = 'to/too/two there/their/theyre your/youre its/it\'s no/know right/write here/hear by/buy/bye for/four one/won weather/whether where/wear new/knew see/sea be/bee our/hour son/sun meet/meat week/weak through/threw eight/ate whole/hole piece/peace wait/weight would/wood i/eye ok/okay mom/mum gray/grey cent/sent made/maid tail/tale male/mail allowed/aloud flour/flower fair/fare pair/pear plane/plain break/brake road/rode steal/steel dear/deer night/knight not/knot which/witch whose/whos were/were'.split(' ').map(group => group.split('/'));
const sounds = new Map(homophones.flatMap(group => group.map(word => [word.replaceAll("'", ''), group[0]])));

export function transcriptLines(value) {
  const lines = [];
  for (const line of value.split(/\r?\n/).map(line => line.trim()).filter(Boolean)) {
    const speaker = line.match(/^([A-Z][A-Za-z.'’]*(?: [A-Z][A-Za-z.'’]*){0,2}):\s+/);
    const body = line.slice(speaker?.[0].length || 0).replace(/\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc|e\.g|i\.e)\./gi, word => word.replaceAll('.', '\u0001'));
    const sentences = body.match(/[^.!?]+(?:[.!?]+["'”’]?|$)/g) || [];
    sentences.forEach((text, i) => lines.push({speaker: i === 0 ? speaker?.[1] || null : null, text: text.trim().replaceAll('\u0001', '.')}));
  }
  return lines;
}

function numberWords(n) {
  if (n < 20) return small[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + small[n % 10] : '');
  return small[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numberWords(n % 100) : '');
}

function tokens(value) {
  return value.normalize('NFKC')
    .replace(/\b(\d{1,2}):([0-5]\d)\b/g, (_, h, m) => Number(m) ? h + ' ' + Number(m) : h)
    .replace(/\b\d{1,3}\b/g, n => numberWords(Number(n)))
    .split(/[\s\-–—]+/).map(raw => {
      const norm = raw.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^\p{L}\p{N}']/gu, '').replace(/^'+|'+$/g, '');
      const key = norm.replaceAll("'", '')
        .replace(/^(\w{3,})our(s?)$/, '$1or$2')
        .replace(/tre(s?)$/, 'ter$1')
        .replace(/ise(s|d)?$/, 'ize$1').replace(/ising$/, 'izing')
        .replace(/ll(ed|ing|er)$/, 'l$1');
      return {raw, norm, key: sounds.get(key) || key};
    }).filter(token => token.norm);
}

function charDistance(a, b) {
  let row = Array.from({length: b.length + 1}, (_, i) => i);
  for (let i = 0; i < a.length; i++) {
    const next = [i + 1];
    for (let j = 0; j < b.length; j++) next.push(Math.min(row[j] + Number(a[i] !== b[j]), row[j + 1] + 1, next[j] + 1));
    row = next;
  }
  return row[b.length];
}

function wordsMatch(a, b) {
  if (a.norm === b.norm || a.key === b.key) return true;
  const [short, long] = a.norm.length <= b.norm.length ? [a.norm, b.norm] : [b.norm, a.norm];
  if (short.length >= 3 && long.startsWith(short) && /^(s|es|d|ed)$/.test(long.slice(short.length))) return true;
  return short.length >= 5 && charDistance(short, long) <= (short.length >= 9 ? 2 : 1);
}

export function pickRecognition(reference, segments) {
  const words = new Set(tokens(reference).map(word => word.key));
  return segments.slice(0, 200).map(alternatives => {
    let best = '', highest = -Infinity;
    for (const text of alternatives.slice(0, 5)) {
      const rank = tokens(text).reduce((total, word) => total + (words.has(word.key) ? 1 : -.5), 0);
      if (rank > highest) { highest = rank; best = text; }
    }
    return best;
  }).join(' ').trim();
}

export function gradeShadowing(reference, recognition) {
  const expected = tokens(transcriptLines(reference).map(line => line.text).join(' '));
  const actual = tokens(recognition.slice(0, 5000)).slice(0, 1000);
  if (!expected.length) throw Error('EMPTY_TRANSCRIPT');
  const grid = Array.from({length: expected.length + 1}, () => new Uint16Array(actual.length + 1));
  const matches = Array.from({length: expected.length}, () => new Uint8Array(actual.length));
  for (let i = 0; i <= expected.length; i++) grid[i][0] = i;
  for (let j = 0; j <= actual.length; j++) grid[0][j] = j;
  for (let i = 1; i <= expected.length; i++) {
    for (let j = 1; j <= actual.length; j++) {
      matches[i - 1][j - 1] = Number(wordsMatch(expected[i - 1], actual[j - 1]));
      grid[i][j] = Math.min(grid[i - 1][j - 1] + 1 - matches[i - 1][j - 1], grid[i - 1][j] + 1, grid[i][j - 1] + 1);
    }
  }
  const wer = grid[expected.length][actual.length] / expected.length;
  const results = [];
  const counts = {correct: 0, incorrect: 0, missing: 0, extra: 0};
  let i = expected.length, j = actual.length;
  while (i || j) {
    let result;
    const match = i && j && matches[i - 1][j - 1];
    if (i && j && grid[i][j] === grid[i - 1][j - 1] + (match ? 0 : 1)) {
      result = {status: match ? 'correct' : 'incorrect', expected: expected[--i].raw, actual: actual[--j].raw};
      if (!match) result.nearMiss = charDistance(expected[i].norm, actual[j].norm) <= Math.max(1, Math.floor(expected[i].norm.length / 4));
    } else if (i && grid[i][j] === grid[i - 1][j] + 1) {
      result = {status: 'missing', expected: expected[--i].raw};
    } else {
      result = {status: 'extra', actual: actual[--j].raw};
    }
    counts[result.status]++;
    results.push(result);
  }
  return {score: Math.round(Math.max(0, 100 * (1 - wer))), wer, results: results.reverse(), counts, total: expected.length};
}
