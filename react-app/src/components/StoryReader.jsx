import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speak } from '../voice.js';
import { STORY_SCENES } from '../scenes.js';

export default function StoryReader({ story, storyIndex, onBack }) {
  const [i, setI] = useState(0);
  const [imgOk, setImgOk] = useState(true);
  const last = i === story.pages.length - 1;
  const text = last ? story.pages[i] + '  ✨ Moral: ' + story.moral : story.pages[i];
  const scene = (STORY_SCENES[storyIndex] || [])[i];
  // pre-generated painted image saved in public/stories (free, instant, offline)
  const imgSrc = `${import.meta.env.BASE_URL}stories/s${storyIndex}-p${i}.jpg`;

  const read = () => speak(text);
  useEffect(() => { setImgOk(true); read(); return () => speechSynthesis.cancel(); }, [i]); // eslint-disable-line

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="class-chip" onClick={() => { speechSynthesis.cancel(); onBack(); }}>← Library</button>
      </div>

      <div className="book" style={{ marginTop: 16 }}>
        <div className="book-illus">
          {/* SVG scene is the always-present base / fallback */}
          <div style={{ position: 'absolute', inset: 0 }}
            dangerouslySetInnerHTML={{ __html: scene || `<div style="font-size:120px;text-align:center">${story.emoji}</div>` }} />
          {/* saved painted image fades in on top when available */}
          <AnimatePresence>
            {imgOk && (
              <motion.img key={imgSrc} className="book-img" src={imgSrc} alt={story.title}
                onError={() => setImgOk(false)}
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
    </div>
  );
}
