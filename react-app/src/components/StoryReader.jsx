import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speak } from '../voice.js';
import { STORY_SCENES } from '../scenes.js';

export default function StoryReader({ story, storyIndex, onBack }) {
  const [i, setI] = useState(0);
  const last = i === story.pages.length - 1;
  const text = last ? story.pages[i] + '  ✨ Moral: ' + story.moral : story.pages[i];
  const scenes = STORY_SCENES[storyIndex] || [];
  const scene = scenes[i];

  const read = () => speak(text);
  useEffect(() => { read(); return () => speechSynthesis.cancel(); }, [i]); // eslint-disable-line

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <button className="class-chip" onClick={() => { speechSynthesis.cancel(); onBack(); }}>← Story Library</button>

      <div className="book" style={{ marginTop: 18 }}>
        <div className="book-illus">
          <AnimatePresence mode="wait">
            <motion.div key={'sc' + i} style={{ width: '100%', height: '100%' }}
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              dangerouslySetInnerHTML={{ __html: scene || `<div style="font-size:120px;text-align:center">${story.emoji}</div>` }} />
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
          <button className="page-btn" onClick={read}>🔊 Read to me</button>
          <button className="page-btn next" onClick={() => (last ? onBack() : setI(i + 1))}>
            {last ? 'The End 🎉' : 'Next ›'}
          </button>
        </div>
      </div>
    </div>
  );
}
