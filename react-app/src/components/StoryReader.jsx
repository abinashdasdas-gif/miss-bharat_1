import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speak } from '../voice.js';
import { STORY_SCENES } from '../scenes.js';
import { ART_STYLES, gKey, gModel, saveG, buildPrompt, genImage } from '../imageGen.js';

export default function StoryReader({ story, storyIndex, onBack }) {
  const [i, setI] = useState(0);
  const [style, setStyle] = useState('Disney-painted');
  const [imgUrl, setImgUrl] = useState(null);
  const [imgState, setImgState] = useState('idle'); // idle | loading | error
  const [tok, setTok] = useState(gKey());
  const [mdl, setMdl] = useState(gModel());
  const [savedMsg, setSavedMsg] = useState('');

  const last = i === story.pages.length - 1;
  const text = last ? story.pages[i] + '  ✨ Moral: ' + story.moral : story.pages[i];
  const scene = (STORY_SCENES[storyIndex] || [])[i];

  const read = () => speak(text);
  useEffect(() => { read(); return () => speechSynthesis.cancel(); }, [i]); // eslint-disable-line

  // generate a painted illustration when a key is present
  useEffect(() => {
    let cancelled = false;
    setImgUrl(null);
    if (!gKey()) { setImgState('idle'); return; }
    setImgState('loading');
    genImage(buildPrompt(style, story, story.pages[i]))
      .then(url => { if (!cancelled) { setImgUrl(url); setImgState('idle'); } })
      .catch(() => { if (!cancelled) setImgState('error'); });
    return () => { cancelled = true; };
  }, [i, style, story]); // eslint-disable-line

  const save = () => { saveG(tok, mdl); setSavedMsg(tok ? '✓ Saved — generating painted art!' : 'Key cleared.'); setI(x => x); };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="class-chip" onClick={() => { speechSynthesis.cancel(); onBack(); }}>← Library</button>
        <label style={{ color: '#CBD5E1', fontSize: '.9rem' }}>🎨 Art:</label>
        <select value={style} onChange={e => setStyle(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(15,23,42,.8)', color: '#E2E8F0', border: '1px solid rgba(99,102,241,.4)' }}>
          {Object.keys(ART_STYLES).map(k => <option key={k}>{k}</option>)}
        </select>
      </div>

      <div className="book" style={{ marginTop: 16 }}>
        <div className="book-illus">
          {/* SVG scene as the base / fallback */}
          <div style={{ position: 'absolute', inset: 0 }}
            dangerouslySetInnerHTML={{ __html: scene || `<div style="font-size:120px;text-align:center">${story.emoji}</div>` }} />
          <AnimatePresence>
            {imgUrl && (
              <motion.img key={imgUrl} className="book-img" src={imgUrl} alt={story.title}
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
            )}
          </AnimatePresence>
          {imgState === 'loading' && <div className="book-loading-badge">🎨 Painting “{style}”…</div>}
        </div>

        <div className="book-text-wrap">
          <div className="book-title">{story.title}</div>
          <AnimatePresence mode="wait">
            <motion.div key={'txt' + i} className="book-text"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}>
              {text}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="book-controls">
          <button className="page-btn" disabled={i === 0} onClick={() => setI(i - 1)}>‹ Back</button>
          <span className="page-count">{i + 1} / {story.pages.length}</span>
          <button className="page-btn" onClick={read}>🔊 Read</button>
          <button className="page-btn next" onClick={() => (last ? onBack() : setI(i + 1))}>
            {last ? 'The End 🎉' : 'Next ›'}
          </button>
        </div>
      </div>

      <details className="ai-setup" style={{ marginTop: 16, background: 'rgba(30,41,59,.7)', border: '1px solid rgba(99,102,241,.25)', borderRadius: 12, padding: '12px 16px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#818CF8' }}>
          🎨 {gKey() ? 'Painted art is ON — manage key' : 'Turn on painted art (free Gemini key)'}
        </summary>
        <p style={{ color: '#94A3B8', fontSize: '.85rem', margin: '10px 0', lineHeight: 1.5 }}>
          Get a free key at <b>aistudio.google.com/apikey</b> and paste it below.
          🔒 Saved only on this device. Without a key, the built-in scenes are shown.
        </p>
        <input type="password" placeholder="AIza..." value={tok} onChange={e => setTok(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 8, borderRadius: 8, background: 'rgba(15,23,42,.8)', color: '#E2E8F0', border: '1px solid rgba(99,102,241,.3)' }} />
        <input placeholder="model (e.g. gemini-2.0-flash-preview-image-generation)" value={mdl} onChange={e => setMdl(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 8, background: 'rgba(15,23,42,.8)', color: '#E2E8F0', border: '1px solid rgba(99,102,241,.3)' }} />
        <button className="btn" style={{ marginTop: 10, padding: '10px 22px' }} onClick={save}>Save</button>
        <span style={{ marginLeft: 12, color: '#10B981', fontSize: '.85rem' }}>{savedMsg}</span>
        {imgState === 'error' && <div style={{ color: '#EF4444', fontSize: '.85rem', marginTop: 8 }}>⚠️ Couldn’t generate — check the token/model, or the model may be warming up. Showing built-in art.</div>}
      </details>
    </div>
  );
}
