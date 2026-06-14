// Friendly female (Indian-preferred) narration — robust against async voice loading + Chrome quirks.
let _voices = [];
function loadVoices() {
  try { _voices = window.speechSynthesis.getVoices() || []; } catch (e) { _voices = []; }
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  // voices often aren't ready on first call — refresh when the browser loads them
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice() {
  const voices = _voices.length ? _voices : (('speechSynthesis' in window) ? window.speechSynthesis.getVoices() : []);
  if (!voices.length) return null;
  const FEMALE = /female|woman|girl|neerja|heera|veena|kalpana|swara|aditi|raveena|priya|aria|jenny|michelle|samantha|karen|zira/i;
  const MALE = /\bmale\b|ravi|rishi|prabhat|madhur|hemant|david|mark|daniel|alex|guy|brian|arthur/i;
  const isF = v => FEMALE.test(v.name) && !MALE.test(v.name);
  const indianF = voices.find(v => /(en[-_]IN|hi[-_]IN)/i.test(v.lang || '') && isF(v));
  if (indianF) return indianF;
  return voices.find(isF) || voices.find(v => !MALE.test(v.name)) || voices[0];
}

export function speak(text) {
  if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const synth = window.speechSynthesis;
  try {
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.pitch = 1.0;
    u.rate = 0.92;
    u.volume = 1;
    u.lang = 'en-IN';
    const v = pickVoice();
    if (v) u.voice = v;
    // tiny defer: calling speak() in the same tick as cancel() can silently drop it in Chrome
    setTimeout(() => {
      try {
        synth.speak(u);
        synth.resume(); // Chrome sometimes leaves the queue paused
      } catch (e) {}
    }, 60);
  } catch (e) {}
}

export function stopSpeaking() {
  try { window.speechSynthesis.cancel(); } catch (e) {}
}
