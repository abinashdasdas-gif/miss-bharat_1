// AI image generation via Hugging Face Inference Providers (official SDK, auto-routing).
// Token from .env.local (local dev) or localStorage (per-user). Never committed.
import { InferenceClient } from '@huggingface/inference';

const cache = new Map(); // prompt -> object URL (per session)

export const ART_STYLES = {
  'Disney-painted': 'Disney/Pixar-style painted illustration, soft volumetric cinematic lighting, gentle warm color palette, subtle rim light, smooth soft shading, expressive friendly faces',
  'Watercolor': "soft watercolor children's picture-book illustration, delicate painterly washes, gentle pastel palette, soft edges, dreamy and tender mood",
  'Storybook': 'classic warm hand-painted storybook illustration, cozy golden-hour lighting, rich but soft detail, painterly brushwork, nostalgic and gentle',
  'Flat cartoon': 'clean flat cartoon illustration, soft gradients, rounded friendly shapes, bright cheerful palette, gentle soft shadows'
};

// shared cinematic/quality + consistency wording added to every page
const QUALITY = 'cinematic wide composition, soft focus background, shallow depth of field, gentle atmosphere, beautiful soft lighting, highly detailed, consistent character design across the whole story, same art style every time';
const NEGATIVE = 'no text, no words, no letters, no captions, no title, no panel borders, no watermark, not scary, no harsh shadows';

export function gKey() { return (localStorage.getItem('hf_token') || import.meta.env.VITE_HF_TOKEN || '').trim(); }
export function gModel() { return (localStorage.getItem('hf_img_model') || import.meta.env.VITE_HF_MODEL || 'black-forest-labs/FLUX.1-schnell').trim(); }

export function buildPrompt(styleKey, story, pageText) {
  const style = ART_STYLES[styleKey] || ART_STYLES['Storybook'];
  // character description first (repeated every page) → then scene → then style → then quality
  return `${story.art}. Scene: ${pageText}. ${style}. ${QUALITY}. ${NEGATIVE}.`;
}

export async function genImage(prompt, seed) {
  const key = prompt + '|' + (seed ?? '');
  if (cache.has(key)) return cache.get(key);
  const client = new InferenceClient(gKey());
  const params = { num_inference_steps: 6 };
  if (seed != null) params.seed = seed;          // fixed seed per story → consistent look
  const blob = await client.textToImage({ model: gModel(), inputs: prompt, parameters: params, provider: 'auto' });
  const url = URL.createObjectURL(blob);
  cache.set(key, url);
  return url;
}
