import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chess from '../components/Chess.jsx';
import TicTacToe from '../components/TicTacToe.jsx';
import { speak } from '../voice.js';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export default function Games({ classes }) {
  const ids = Object.keys(classes);
  const [cls, setCls] = useState(ids[0]);
  const [active, setActive] = useState(null); // currently-open game type
  const data = classes[cls];

  const openGame = (g) => {
    if (g.type === 'chess') { setActive('chess'); return; }
    if (g.type === 'tictactoe') { setActive('tictactoe'); return; }
    alert(`Game: ${g.title}\n(Full gameplay ports next.)`);
  };

  if (active === 'chess' || active === 'tictactoe') {
    return (
      <div className="container">
        <button className="class-chip" onClick={() => setActive(null)}>← Back to Games</button>
        <h1 className="page-title" style={{ marginTop: 20 }}>
          {active === 'chess' ? '♟️ Chess vs Computer' : '⭕ Tic-Tac-Toe'}
        </h1>
        {active === 'chess' ? <Chess speak={speak} /> : <TicTacToe speak={speak} />}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">🎮 {data.name} Games</h1>
      <p className="page-sub">{data.title}</p>

      <div className="class-chips">
        {ids.map(id => (
          <motion.button key={id} className={'class-chip' + (id === cls ? ' on' : '')}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => setCls(id)}>
            {classes[id].name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div className="grid" variants={container} initial="hidden" animate="show" key={cls}>
          {data.games.map((g, i) => (
            <motion.div key={i} className="tile" variants={item}
              whileHover={{ y: -10, scale: 1.05 }} whileTap={{ scale: 0.98 }}
              onClick={() => openGame(g)}>
              <div className="emoji">{g.emoji}</div>
              <div className="t">{g.title}</div>
              <div className="d">{g.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
