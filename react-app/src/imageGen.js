// AI image generation via Hugging Face Inference API (free token).
// Token from .env.local (local dev) or localStorage (per-user). Never committed.
const cache = new Map(); // prompt -> object URL (per session)

export const ART_STYLES = {
  'Disney-painted': 'Disney Pixar style 3D painted illustration, soft cinematic lighting, glossy, highly detailed',
  'Watercolor': "soft watercolor children's book illustration, painterly gentle washes, dreamy",
  'Storybook': 'classic warm storybook painting, cozy, richly detailed, golden lighting',
  'Flat cartoon': 'flat vector cartoon illustration, bold clean shapes, bright flat colors'
};

export function gKey() { return (localStorage.getItem('hf_token') || import.meta.env.VITE_HF_TOKEN || '').trim(); }
export function gModel() { return (localStorage.getItem('hf_img_model') || import.meta.env.VITE_HF_MODEL || 'black-forest-labs/FLUX.1-schnell').trim(); }

export function buildPrompt(styleKey, story, pageText) {
  const style = ART_STYLES[styleKey] || ART_STYLES['Storybook'];
  return `A wide landscape children's storybook illustration. ${style}. ${story.art}. Scene: ${pageText}. Cute, friendly, wholesome, for young children. No text, no words, no letters.`;
}

export async function genImage(prompt) {
  if (cache.has(prompt)) return cache.get(prompt);
  const res = await fetch(`https://api-inference.huggingface.co/models/${gModel()}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + gKey(), 'Content-Type': 'application/json', Accept: 'image/png' },
    body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`HF ${res.status}. ${t.slice(0, 160)}`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  cache.set(prompt, url);
  return url;
}
