import { motion } from 'framer-motion';

export default function Home({ setPage }) {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <motion.h1 className="page-title" style={{ fontSize: '2.8rem' }}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        Welcome to Miss Bharat World!
      </motion.h1>
      <motion.p className="page-sub"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        AI-Powered Learning for Classes 1–5
      </motion.p>
      <motion.div className="center"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <motion.button className="btn" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={() => setPage('games')}>Start Learning 🎮</motion.button>
      </motion.div>
    </div>
  );
}
