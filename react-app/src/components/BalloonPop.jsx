import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moveSound } from '../sound.js';
import { say } from '../say.js';

const COLORS = ['#F472B6', '#60A5FA', '#FBBF24', '#34D399', '#C084FC', '#F87171', '#22D3EE'];
let nextId = 1;

export default function BalloonPop() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const poppedRef = useRef(0);

  // gently spawn balloons that float up
  useEffect(() => {
    const t = setInterval(() => {
      setBalloons(bs => {
        if (bs.length > 7) return bs; // keep it calm, not overwhelming
        return [...bs, {
          id: nextId++,
          left: 6 + Math.random() * 82,
          dur: 5.5 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 58 + Math.random() * 34
        }];
      });
    }, 950);
    return () => clearInterval(t);
  }, []);

  const remove = (id) => setBalloons(bs => bs.filter(b => b.id !== id));
  const pop = (id) => {
    remove(id);
    setScore(s => s + 1);
    moveSound(true); // cheerful pop
    poppedRef.current += 1;
    if (poppedRef.current % 5 === 0) say('Great job!');
  };

  return (
    <div className="balloon-game">
      <div className="balloon-score">🎈 Popped: {score}</div>
      <div className="balloon-area">
        <AnimatePresence>
          {balloons.map(b => (
            <motion.button key={b.id} className="balloon" aria-label="balloon"
              style={{ left: b.left + '%', width: b.size, height: b.size * 1.2, background: b.color }}
              initial={{ top: '100%', opacity: 0 }}
              animate={{ top: '-28%', opacity: 1 }}
              exit={{ scale: 1.6, opacity: 0 }}
              transition={{ top: { duration: b.dur, ease: 'linear' }, opacity: { duration: 0.3 } }}
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
