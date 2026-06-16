// Web Audio for move/win sound effects + a real looping background music track.
let ctx = null, musicOn = false;
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

// Background music = a real track (loops softly). Replaces the old synth melody.
let bg = null;
function bgAudio() {
  if (!bg) {
    bg = new Audio(`${import.meta.env.BASE_URL}audio/bg-music.mp3`);
    bg.loop = true;
    bg.volume = 0.35; // gentle, sits under narration
  }
  return bg;
}
export function toggleMusic() {
  const a = bgAudio();
  if (musicOn) { a.pause(); musicOn = false; }
  else { a.play().catch(() => {}); musicOn = true; }
  return musicOn;
}
export function stopMusic() { if (bg) bg.pause(); musicOn = false; }
