import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Games from './pages/Games.jsx';
import Stories from './pages/Stories.jsx';
import { FALLBACK_CLASSES, FALLBACK_QUESTIONS } from './data.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [classes, setClasses] = useState(FALLBACK_CLASSES);
  const [questions, setQuestions] = useState(FALLBACK_QUESTIONS);

  // AJAX: reuse the same server-hosted content the old site uses
  useEffect(() => {
    fetch('../data/content.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d) { if (d.classes) setClasses(d.classes); if (d.questions) setQuestions(d.questions); } })
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <>
      <Header page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        <motion.main key={page}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
          {page === 'home' && <Home setPage={setPage} />}
          {page === 'games' && <Games classes={classes} questions={questions} />}
          {page === 'stories' && <Stories />}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
