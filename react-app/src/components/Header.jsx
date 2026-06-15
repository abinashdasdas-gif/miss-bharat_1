import { useState } from 'react';
import { motion } from 'framer-motion';
import { toggleMusic } from '../sound.js';

const TABS = [
  { id: 'home', icon: '🏠' },
  { id: 'games', icon: '🎮' },
  { id: 'stories', icon: '📖' },
  { id: 'quiet', icon: '🌿' },
  { id: 'dashboard', icon: '👨‍👩‍👧' }
];

export default function Header({ page, setPage }) {
  const [music, setMusic] = useState(false);
  return (
    <header className="header">
      <div className="header-content">
        <motion.div className="logo"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          🌟 Miss Bharat World
        </motion.div>
        <nav className="nav">
          {TABS.map(t => (
            <button key={t.id} className={page === t.id ? 'on' : ''} onClick={() => setPage(t.id)}>
              {t.icon}
            </button>
          ))}
          <button title="Music" onClick={() => setMusic(toggleMusic())}>{music ? '🔊' : '🎵'}</button>
        </nav>
      </div>
    </header>
  );
}
