// Friendly female (Indian-preferred) narration — same logic as the HTML site.
function pickVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const FEMALE = /female|woman|girl|neerja|heera|veena|kalpana|swara|aditi|raveena|priya|aria|jenny|michelle|samantha|karen|zira/i;
  const MALE = /\bmale\b|ravi|rishi|prabhat|madhur|hemant|david|mark|daniel|alex|guy|brian|arthur/i;
  const isF = v => FEMALE.test(v.name) && !MALE.test(v.name);
  const indianF = voices.find(v => /(en[-_]IN|hi[-_]IN)/i.test(v.lang || '') && isF(v));
  if (indianF) return indianF;
  return voices.find(isF) || voices.find(v => !MALE.test(v.name)) || voices[0];
}

export function speak(text) {
  if (!text || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.pitch = 1.0; u.rate = 0.92;
  const v = pickVoice();
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
