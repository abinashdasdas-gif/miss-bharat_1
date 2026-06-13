import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speak } from '../voice.js';
import { SCENES } from '../data.js';

// free, keyless AI illustration for a story page (Pollinations.ai)
function illoUrl(story, pageText) {
  const prompt = `children's storybook illustration, soft painted cartoon style, warm vibrant colors, ${story.art}. Scene: ${pageText}. cute, friendly, no text, no words, no letters`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=460&nologo=true&seed=${story.seed}`;
}

export default function StoryReader({ story, onBack }) {
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const last = i === story.pages.length - 1;
  const text = last ? story.pages[i] + '  ✨ Moral: ' + story.moral : story.pages[i];
  const [a, b] = SCENES[i % SCENES.length];

  const read = () => speak(text);
  useEffect(() => { setLoaded(false); setFailed(false); read(); return () => speechSynthesis.cancel(); }, [i]); // eslint-disable-line

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <button className="class-chip" onClick={() => { speechSynthesis.cancel(); onBack(); }}>← Story Library</button>

      <div className="book" style={{ marginTop: 18 }}>
        <div className="book-illus" style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}>
          {!failed && (
            <motion.img key={'img' + i} className="book-img" src={illoUrl(story, story.pages[i])}
              alt={story.title}
              onLoad={() => setLoaded(true)} onError={() => setFailed(true)}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }}
              transition={{ duration: 0.5 }} />
          )}
          {!loaded && (
            <div className="book-illus-fallback">
              <span style={{ fontSize: 'clamp(70px,16vw,130px)' }}>{story.emoji}</span>
              {!failed && <div className="book-loading">🎨 Painting the picture…</div>}
            </div>
          )}
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
