// AI image generation via Hugging Face Inference API (free token).
// Token lives only in the browser (localStorage) — never in the repo.
const cache = new Map(); // prompt -> object URL (per session)

export const ART_STYLES = {
  'Disney-painted': 'Disney Pixar style 3D painted illustration, soft cinematic lighting, glossy, highly detailed',
  'Watercolor': 'soft watercolor children\'s book illustration, painterly gentle washes, dreamy',
  'Flat cartoon': 'flat vector cartoon illustration, bold clean shapes, bright flat colors',
  'Storybook': 'classic warm storybook painting, cozy, richly detailed, golden lighting'
};

export function hfToken() { return (localStorage.getItem('hf_token') || '').trim(); }
export function hfModel() { return (localStorage.getItem('hf_img_model') || 'black-forest-labs/FLUX.1-schnell').trim(); }
export function saveHf(token, model) {
  localStorage.setItem('hf_token', (token || '').trim());
  localStorage.setItem('hf_img_model', (model || 'black-forest-labs/FLUX.1-schnell').trim());
}

export function buildPrompt(styleKey, story, pageText) {
  const style = ART_STYLES[styleKey] || ART_STYLES['Storybook'];
  return `${style}. ${story.art}. Scene: ${pageText}. cute, friendly, wholesome, for young children, no text, no words, no letters`;
}

export async function genImage(prompt) {
  if (cache.has(prompt)) return cache.get(prompt);
  const res = await fetch(`https://api-inference.huggingface.co/models/${hfModel()}`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + hfToken(), 'Content-Type': 'application/json', Accept: 'image/png' },
    body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`Image API ${res.status}. ${t.slice(0, 140)}`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  cache.set(prompt, url);
  return url;
}
