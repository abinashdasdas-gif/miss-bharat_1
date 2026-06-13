import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chess from '../components/Chess.jsx';
import TicTacToe from '../components/TicTacToe.jsx';
import VoiceGame from '../components/VoiceGame.jsx';
import { speak } from '../voice.js';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export default function Games({ classes, questions }) {
  const ids = Object.keys(classes);
  const [cls, setCls] = useState(ids[0]);
  const [active, setActive] = useState(null); // { kind, game }
  const data = classes[cls];

  const openGame = (g) => {
    if (g.type === 'chess') { setActive({ kind: 'chess' }); return; }
    if (g.type === 'tictactoe') { setActive({ kind: 'tictactoe' }); return; }
    setActive({ kind: 'voice', game: g });
  };

  if (active) {
    return (
      <div className="container">
        <button className="class-chip" onClick={() => setActive(null)}>← Back to Games</button>
        <h1 className="page-title" style={{ marginTop: 20 }}>
          {active.kind === 'chess' ? '♟️ Chess vs Computer'
            : active.kind === 'tictactoe' ? '⭕ Tic-Tac-Toe'
            : `${active.game.emoji} ${active.game.title}`}
        </h1>
        {active.kind === 'chess' && <Chess speak={speak} />}
        {active.kind === 'tictactoe' && <TicTacToe speak={speak} />}
        {active.kind === 'voice' && <VoiceGame type={active.game.type} title={active.game.title} questions={questions} />}
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
