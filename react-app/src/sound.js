// Web Audio: gentle move/win sounds + a soft background music loop. No files.
let ctx = null, musicOn = false, timer = null;
function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
function tone(freq, start, dur, vol, type) {
  const c = ac(), o = c.createOscillator(), g = c.createGain();
  o.type = type || 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.linearRampToValueAtTime(vol, start + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g); g.connect(c.destination);
  o.start(start); o.stop(start + dur + 0.02);
}
export function moveSound(capture) {
  const t = ac().currentTime;
  if (capture) { tone(660, t, 0.12, 0.25, 'square'); tone(990, t + 0.07, 0.14, 0.2, 'triangle'); }
  else { tone(440, t, 0.09, 0.18, 'sine'); }
}
export function winSound() {
  const t = ac().currentTime;
  [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.12, 0.22, 0.22, 'triangle'));
}

const MELODY = [523, 659, 784, 659, 587, 784, 880, 784, 523, 659, 784, 1047, 880, 784, 659, 587];
function loop() {
  if (!musicOn) return;
  const c = ac(), step = 0.42, t0 = c.currentTime + 0.06;
  MELODY.forEach((f, i) => tone(f, t0 + i * step, step * 0.9, 0.08, 'triangle'));
  [0, 4, 8, 12].forEach(i => tone(MELODY[i] / 2, t0 + i * step, step * 3.6, 0.05, 'sine'));
  timer = setTimeout(loop, MELODY.length * step * 1000);
}
export function toggleMusic() {
  if (musicOn) { musicOn = false; if (timer) clearTimeout(timer); }
  else { ac(); musicOn = true; loop(); }
  return musicOn;
}
export function stopMusic() { musicOn = false; if (timer) clearTimeout(timer); }
