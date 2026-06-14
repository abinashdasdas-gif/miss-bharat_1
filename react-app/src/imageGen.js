// AI image generation via Google Gemini. Key from .env.local (local dev) or
// localStorage (per-user). Never committed to the repo.
const cache = new Map(); // prompt -> data URL (per session)

export const ART_STYLES = {
  'Disney-painted': 'Disney Pixar style 3D painted illustration, soft cinematic lighting, glossy, highly detailed',
  'Watercolor': "soft watercolor children's book illustration, painterly gentle washes, dreamy",
  'Storybook': 'classic warm storybook painting, cozy, richly detailed, golden lighting',
  'Flat cartoon': 'flat vector cartoon illustration, bold clean shapes, bright flat colors'
};

export function gKey() { return (localStorage.getItem('gemini_key') || import.meta.env.VITE_GEMINI_KEY || '').trim(); }
export function gModel() { return (localStorage.getItem('gemini_img_model') || import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash-image').trim(); }

export function buildPrompt(styleKey, story, pageText) {
  const style = ART_STYLES[styleKey] || ART_STYLES['Storybook'];
  return `A wide landscape children's storybook illustration. ${style}. ${story.art}. Scene: ${pageText}. Cute, friendly, wholesome, for young children. No text, no words, no letters in the image.`;
}

export async function genImage(prompt) {
  if (cache.has(prompt)) return cache.get(prompt);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${gModel()}:generateContent?key=${encodeURIComponent(gKey())}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
    })
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}. ${t.slice(0, 160)}`);
  }
  const data = await res.json();
  const parts = (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
  const part = parts.find(p => p.inlineData || p.inline_data);
  const inl = part && (part.inlineData || part.inline_data);
  if (!inl || !inl.data) throw new Error('No image returned by the model.');
  const dataUrl = `data:${inl.mimeType || inl.mime_type || 'image/png'};base64,${inl.data}`;
  cache.set(prompt, dataUrl);
  return dataUrl;
}
