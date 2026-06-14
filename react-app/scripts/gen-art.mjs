// One-time: generate Disney-painted images for every story page and SAVE them to
// public/stories/. After this runs, the app loads the saved files — no HF at runtime.
// Usage:  node scripts/gen-art.mjs       (reads token from .env.local VITE_HF_TOKEN)
import { InferenceClient } from '@huggingface/inference';
import fs from 'fs';
import path from 'path';
import { STORIES } from '../src/data.js';

const tok = process.env.HF_TOKEN ||
  (fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8').match(/^VITE_HF_TOKEN=(.*)$/m) || [])[1].trim();
const client = new InferenceClient(tok);

const STYLE = 'Disney/Pixar-style painted illustration, soft volumetric cinematic lighting, gentle warm color palette, smooth soft shading, expressive friendly faces';
const QUALITY = 'cinematic wide composition, soft focus background, shallow depth of field, gentle atmosphere, highly detailed, consistent character design. No text, no words, no letters.';

const outDir = new URL('../public/stories/', import.meta.url);
fs.mkdirSync(outDir, { recursive: true });

for (let s = 0; s < STORIES.length; s++) {
  const story = STORIES[s];
  for (let p = 0; p < story.pages.length; p++) {
    const file = path.join(outDir.pathname.replace(/^\//, ''), `s${s}-p${p}.jpg`);
    const out = new URL(`s${s}-p${p}.jpg`, outDir);
    if (fs.existsSync(out)) { console.log('skip', `s${s}-p${p}.jpg`); continue; }
    const prompt = `${story.art}. Scene: ${story.pages[p]}. ${STYLE}. ${QUALITY}`;
    try {
      const blob = await client.textToImage({
        model: 'black-forest-labs/FLUX.1-schnell',
        inputs: prompt,
        parameters: { num_inference_steps: 6, seed: story.seed },
        provider: 'auto'
      });
      const buf = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync(out, buf);
      console.log('saved', `s${s}-p${p}.jpg`, buf.length, 'bytes');
    } catch (e) {
      console.log('FAIL', `s${s}-p${p}.jpg`, e.message);
    }
  }
}
console.log('Done.');
