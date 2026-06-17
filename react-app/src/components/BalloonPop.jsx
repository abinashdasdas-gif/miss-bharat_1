import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moveSound } from '../sound.js';
import { say } from '../say.js';
import DifficultyBar from './DifficultyBar.jsx';

const COLORS = ['#F472B6', '#60A5FA', '#FBBF24', '#34D399', '#C084FC', '#F87171', '#22D3EE'];
let nextId = 1;

// difficulty tunes spawn rate, max balloons on screen, and rise speed
const DIFF = {
  Easy:   { cap: 4, spawn: 1300, durMin: 8, durRand: 3 },
  Medium: { cap: 5, spawn: 1050, durMin: 6, durRand: 3 },
  Hard:   { cap: 7, spawn: 750,  durMin: 4, durRand: 2.5 }
};

export default function BalloonPop() {
  const [diff, setDiff] = useState('Easy');
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const poppedRef = useRef(0);

  // (re)start spawning whenever difficulty changes
  useEffect(() => {
    setBalloons([]);
    const cfg = DIFF[diff];
    const t = setInterval(() => {
      setBalloons(bs => {
        if (bs.length >= cfg.cap) return bs;
        return [...bs, {
          id: nextId++,
          left: 6 + Math.random() * 82,
          dur: cfg.durMin + Math.random() * cfg.durRand,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 58 + Math.random() * 30
        }];
      });
    }, cfg.spawn);
    return () => clearInterval(t);
  }, [diff]);

  const remove = (id) => setBalloons(bs => bs.filter(b => b.id !== id));
  const pop = (id) => {
    remove(id);
    setScore(s => s + 1);
    moveSound(true);
    poppedRef.current += 1;
    if (poppedRef.current % 5 === 0) say('Great job!');
  };

  return (
    <div className="balloon-game">
      <DifficultyBar value={diff} onChange={setDiff} />
      <div className="balloon-score">🎈 Popped: {score}</div>
      <div className="balloon-area">
        <AnimatePresence>
          {balloons.map(b => (
            <motion.button key={b.id} className="balloon" aria-label="balloon"
              style={{ left: b.left + '%', top: '100%', width: b.size, height: b.size * 1.2, background: b.color }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -620, opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ y: { duration: b.dur, ease: 'linear' }, opacity: { duration: 0.3 } }}
              onAnimationComplete={() => remove(b.id)}
              onClick={() => pop(b.id)}
              whileTap={{ scale: 0.75 }}>
              <span className="balloon-string" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <p className="balloon-hint">Tap the balloons before they float away! 🎯</p>
    </div>
  );
}
