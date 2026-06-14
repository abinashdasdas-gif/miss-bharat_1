import { useState } from 'react';
import { STORIES } from '../data.js';
import StoryReader from '../components/StoryReader.jsx';
import TiltCard from '../components/TiltCard.jsx';

export default function Stories() {
  const [open, setOpen] = useState(null);

  if (open !== null) {
    return (
      <div className="container">
        <StoryReader story={STORIES[open]} storyIndex={open} onBack={() => setOpen(null)} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">📖 Story Time</h1>
      <p className="page-sub">Beautifully illustrated tales — read along or let Miss Bharat narrate</p>

      <div className="story-grid">
        {STORIES.map((s, i) => (
          <TiltCard key={i} className="story-card" delay={i * 0.06} onClick={() => setOpen(i)}>
            <div style={{ fontSize: 54 }}>{s.emoji}</div>
            <h3>{s.title}</h3>
            <p>{s.blurb}</p>
            <div style={{ marginTop: 10, fontSize: '.8rem', color: '#818CF8', fontWeight: 600 }}>📄 {s.pages.length} pages · 🔊 Narrated</div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
