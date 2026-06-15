// say(text): play the pre-generated Kokoro clip for fixed phrases (same voice as the
// stories), and fall back to the browser voice for anything dynamic. One voice everywhere.
import { speak, stopSpeaking } from './voice.js';

const BASE = import.meta.env.BASE_URL;
let manifest = {};
fetch(`${BASE}audio/phrases.json`).then(r => (r.ok ? r.json() : {})).then(m => { manifest = m || {}; }).catch(() => {});

const norm = t => (t || '').toLowerCase().replace(/\s+/g, ' ').trim();
let current = null;

export function say(text) {
  if (!text) return;
  stopSpeaking();
  if (current) { try { current.pause(); } catch (e) {} current = null; }
  const file = manifest[norm(text)];
  if (file) {
    const a = new Audio(`${BASE}audio/phrases/${file}`);
    current = a;
    a.addEventListener('error', () => speak(text));
    a.play().catch(err => { if (!err || err.name !== 'AbortError') speak(text); });
  } else {
    speak(text); // dynamic phrase → browser voice
  }
}
