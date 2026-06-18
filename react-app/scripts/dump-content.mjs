// Writes the React app's own content.json (correct CBSE shape with subjects + all games)
// into public/, so App.jsx can AJAX-load it safely in dev AND on the deployed /app/.
import { FALLBACK_CLASSES, FALLBACK_QUESTIONS } from '../src/data.js';
import fs from 'fs';

const out = new URL('../public/content.json', import.meta.url);
fs.writeFileSync(out, JSON.stringify({ classes: FALLBACK_CLASSES, questions: FALLBACK_QUESTIONS }, null, 0));
console.log('wrote public/content.json —', Object.keys(FALLBACK_CLASSES).length, 'classes');
