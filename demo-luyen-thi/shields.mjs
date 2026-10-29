// Scale the supplied 20-question Listening and 25-question Reading bands to each paper.
export function shieldsFor(skill, correct, total) {
  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0 || correct <= 0) return 0;
  const base = skill === 'listening' ? 20 : 25;
  const limits = skill === 'listening' ? [4, 8, 12, 16] : [5, 11, 17, 21];
  const band = limits.findIndex(limit => correct * base <= limit * total);
  return band < 0 ? 5 : band + 1;
}
