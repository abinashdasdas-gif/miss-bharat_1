import { useState } from 'react';
import { motion } from 'framer-motion';
import { STORIES } from '../data.js';
import StoryReader from '../components/StoryReader.jsx';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } }
};

export default function Stories() {
  const [open, setOpen] = useState(null);

  if (open !== null) {
    return (
      <div className="container">
        <StoryReader story={STORIES[open]} onBack={() => setOpen(null)} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">📖 Story Time</h1>
      <p className="page-sub">Beautifully illustrated tales — read along or let Miss Bharat narrate</p>

      <motion.div className="story-grid" variants={container} initial="hidden" animate="show">
        {STORIES.map((s, i) => (
          <motion.div key={i} className="story-card" variants={item}
            whileHover={{ y: -8, scale: 1.03 }} whileTap={{ scale: 0.99 }}
            onClick={() => setOpen(i)}>
            <div style={{ fontSize: 54 }}>{s.emoji}</div>
            <h3>{s.title}</h3>
            <p>{s.blurb}</p>
            <div style={{ marginTop: 10, fontSize: '.8rem', color: '#818CF8', fontWeight: 600 }}>📄 {s.pages.length} pages · 🔊 Narrated</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
