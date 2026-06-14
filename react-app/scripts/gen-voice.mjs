// One-time: generate high-quality narration (Kokoro TTS) for every story page and
// SAVE to public/audio/. The app then plays the saved audio — best voice, free, offline.
import { InferenceClient } from '@huggingface/inference';
import fs from 'fs';
import { STORIES } from '../src/data.js';

const tok = process.env.HF_TOKEN ||
  (fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').match(/^VITE_HF_TOKEN=(.*)$/m) || [])[1].trim();
const client = new InferenceClient(tok);

const outDir = new URL('../public/audio/', import.meta.url);
fs.mkdirSync(outDir, { recursive: true });

for (let s = 0; s < STORIES.length; s++) {
  const story = STORIES[s];
  for (let p = 0; p < story.pages.length; p++) {
    const out = new URL(`s${s}-p${p}.wav`, outDir);
    if (fs.existsSync(out)) { console.log('skip', `s${s}-p${p}`); continue; }
    const last = p === story.pages.length - 1;
    const text = story.pages[p] + (last ? `  The moral of the story is: ${story.moral}` : '');
    try {
      const blob = await client.textToSpeech({ model: 'hexgrad/Kokoro-82M', inputs: text, provider: 'auto' });
      fs.writeFileSync(out, Buffer.from(await blob.arrayBuffer()));
      console.log('saved', `s${s}-p${p}.wav`, blob.size, 'bytes');
    } catch (e) {
      console.log('FAIL', `s${s}-p${p}`, e.message.slice(0, 110));
    }
  }
}
console.log('Done.');
