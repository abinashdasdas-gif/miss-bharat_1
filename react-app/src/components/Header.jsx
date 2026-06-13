import { motion } from 'framer-motion';

const TABS = [
  { id: 'home', icon: '🏠' },
  { id: 'games', icon: '🎮' },
  { id: 'stories', icon: '📖' }
];

export default function Header({ page, setPage }) {
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
        </nav>
      </div>
    </header>
  );
}
