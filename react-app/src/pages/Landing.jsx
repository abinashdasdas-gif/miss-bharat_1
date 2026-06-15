import { motion } from 'framer-motion';
import { FadeUp } from '../components/FadeUp.jsx';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4';
const TITLE = 'Welcome to Miss Bharat World';
const words = TITLE.split(' ');

// playful subjects that drift over the video
const BADGES = [
  { e: '⭐', top: '16%', left: '10%', d: 6 },
  { e: '🌍', top: '20%', left: '84%', d: 7.5 },
  { e: '➕', top: '52%', left: '6%', d: 6.5 },
  { e: '🔤', top: '60%', left: '90%', d: 8 },
  { e: '🎨', top: '80%', left: '16%', d: 7 },
  { e: '🔬', top: '78%', left: '80%', d: 6.8 }
];

export default function Landing({ setPage }) {
  return (
    <>
      <video className="land-video" src={VIDEO_SRC} autoPlay muted loop playsInline />
      <div className="land-overlay" />

      {/* floating subject badges (decorative, never block taps) */}
      <div className="land-badges" aria-hidden="true">
        {BADGES.map((b, i) => (
          <motion.span key={i} className="land-badge" style={{ top: b.top, left: b.left }}
            animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
            transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}>
            {b.e}
          </motion.span>
        ))}
      </div>

      <section className="land">
        <motion.div className="land-ava"
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <span>👑</span>
        </motion.div>

        <h1 className="land-title">
          {words.map((w, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              {w}
            </motion.span>
          ))}
        </h1>

        <FadeUp as="p" delay={0.85} y={20} className="land-sub" once={false}>
          A magical world of games, stories &amp; voice fun for Classes 1–5. ✨
        </FadeUp>

        <FadeUp delay={1.05} y={20} className="land-cta" once={false}>
          <motion.button className="land-btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
            onClick={() => setPage('games')}>🎮 Start Learning</motion.button>
          <motion.button className="land-btn ghost" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
            onClick={() => setPage('stories')}>📖 Story Time</motion.button>
        </FadeUp>

        <FadeUp delay={1.3} y={14} className="land-hint" once={false}>
          🌿 Need a calm space? Tap the leaf above.
        </FadeUp>
      </section>
    </>
  );
}
