import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speak } from '../voice.js';
import { STORY_SCENES } from '../scenes.js';
import { gKey, buildPrompt, genImage } from '../imageGen.js';

const STYLE = 'Disney-painted'; // single fixed art style

export default function StoryReader({ story, storyIndex, onBack }) {
  const [i, setI] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgState, setImgState] = useState('idle'); // idle | loading | error
  const last = i === story.pages.length - 1;
  const text = last ? story.pages[i] + '  ✨ Moral: ' + story.moral : story.pages[i];
  const scene = (STORY_SCENES[storyIndex] || [])[i];
  const hasKey = !!gKey();

  const read = () => speak(text);
  useEffect(() => { read(); return () => speechSynthesis.cancel(); }, [i]); // eslint-disable-line

  // generate a painted illustration with Gemini (falls back to SVG scene)
  useEffect(() => {
    let cancelled = false;
    setImgUrl(null);
    if (!hasKey) { setImgState('idle'); return; }
    setImgState('loading');
    genImage(buildPrompt(STYLE, story, story.pages[i]), story.seed)
      .then(url => { if (!cancelled) { setImgUrl(url); setImgState('idle'); } })
      .catch(() => { if (!cancelled) setImgState('error'); });
    return () => { cancelled = true; };
  }, [i, story, hasKey]); // eslint-disable-line

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="class-chip" onClick={() => { speechSynthesis.cancel(); onBack(); }}>← Library</button>
      </div>

      <div className="book" style={{ marginTop: 16 }}>
        <div className="book-illus">
          {/* Show SVG scene only when there's no painted art (no key, or generation failed) */}
          {(!hasKey || imgState === 'error') && (
            <div style={{ position: 'absolute', inset: 0 }}
              dangerouslySetInnerHTML={{ __html: scene || `<div style="font-size:120px;text-align:center">${story.emoji}</div>` }} />
          )}
          {/* Clean loader while the painted image generates (no SVG flash) */}
          {hasKey && imgState === 'loading' && !imgUrl && (
            <div className="book-painting">
              <div className="paint-spinner" />
              <div className="paint-text">🎨 Painting the picture…</div>
            </div>
          )}
          <AnimatePresence>
            {imgUrl && (
              <motion.img key={imgUrl} className="book-img" src={imgUrl} alt={story.title}
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
            )}
          </AnimatePresence>
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

      {imgState === 'error' && (
        <div style={{ color: '#EF4444', fontSize: '.85rem', marginTop: 10 }}>
          ⚠️ Couldn’t generate the painted image (key/model/quota). Showing our built-in art.
        </div>
      )}
    </div>
  );
}
