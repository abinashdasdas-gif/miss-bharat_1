import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header.jsx';
import Games from './pages/Games.jsx';
import Stories from './pages/Stories.jsx';
import Dashboard from './pages/Dashboard.jsx';
import QuietSpace from './pages/QuietSpace.jsx';
import Landing from './pages/Landing.jsx';
import { FALLBACK_CLASSES, FALLBACK_QUESTIONS } from './data.js';

export default function App() {
  const [page, setPage] = useState('home');
  const [classes, setClasses] = useState(FALLBACK_CLASSES);
  const [questions, setQuestions] = useState(FALLBACK_QUESTIONS);

  // AJAX: load the React app's OWN content file (public/content.json — correct CBSE shape).
  // BASE_URL resolves correctly both in dev ('/') and on the deployed /app/ sub-path ('./').
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content.json`, { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d) { if (d.classes) setClasses(d.classes); if (d.questions) setQuestions(d.questions); } })
      .catch(() => { /* keep built-in fallback from data.js */ });
  }, []);

  return (
    <>
      <div className="app-orbs"><span /><span /><span /></div>
      <div className="stars" />
      <Header page={page} setPage={setPage} />
      {page === 'home' ? (
        // Landing has a fixed background video — render outside the animated <main> so it stays pinned
        <Landing setPage={setPage} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.main key={page}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}>
            {page === 'games' && <Games classes={classes} questions={questions} />}
            {page === 'stories' && <Stories />}
            {page === 'quiet' && <QuietSpace />}
            {page === 'dashboard' && <Dashboard />}
          </motion.main>
        </AnimatePresence>
      )}
    </>
  );
}
