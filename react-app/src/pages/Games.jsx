import { useState } from 'react';
import { motion } from 'framer-motion';
import Chess from '../components/Chess.jsx';
import ChessDance from '../components/ChessDance.jsx';
import TicTacToe from '../components/TicTacToe.jsx';
import VoiceGame from '../components/VoiceGame.jsx';
import TiltCard from '../components/TiltCard.jsx';

export default function Games({ classes, questions }) {
  const ids = Object.keys(classes);
  const [cls, setCls] = useState(ids[0]);
  const [active, setActive] = useState(null); // { kind, game }
  const [chessMode, setChessMode] = useState('play'); // 'play' | 'dance'
  const data = classes[cls];

  const openGame = (g) => {
    if (g.type === 'chess') { setChessMode('play'); setActive({ kind: 'chess' }); return; }
    if (g.type === 'tictactoe') { setActive({ kind: 'tictactoe' }); return; }
    setActive({ kind: 'voice', game: g });
  };

  if (active) {
    return (
      <div className="container">
        <button className="class-chip" onClick={() => setActive(null)}>← Back to Games</button>
        {active.kind === 'chess' && (
          <>
            <h1 className="page-title" style={{ marginTop: 20 }}>♟️ Chess</h1>
            <div className="chess-modes">
              <button className={'class-chip' + (chessMode === 'play' ? ' on' : '')} onClick={() => setChessMode('play')}>♟️ Play</button>
              <button className={'class-chip' + (chessMode === 'dance' ? ' on' : '')} onClick={() => setChessMode('dance')}>🕺 Chess Dance</button>
            </div>
            {chessMode === 'play' ? <Chess /> : <ChessDance onPlay={() => setChessMode('play')} />}
          </>
        )}
        {active.kind === 'tictactoe' && (
          <><h1 className="page-title" style={{ marginTop: 20 }}>⭕ Tic-Tac-Toe</h1><TicTacToe /></>
        )}
        {active.kind === 'voice' && (
          <><h1 className="page-title" style={{ marginTop: 20 }}>{active.game.emoji} {active.game.title}</h1>
            <VoiceGame type={active.game.type} title={active.game.title} questions={questions} /></>
        )}
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

      {SUBJECTS.map(sub => {
        const games = data.games.filter(g => (g.subject || 'Fun') === sub.key);
        if (!games.length) return null;
        return (
          <section key={cls + sub.key} style={{ marginBottom: 36 }}>
            <div className="subject-head" style={{ '--c': sub.color }}>
              <span className="subject-icon">{sub.icon}</span>
              <span>{sub.label}</span>
              <span className="subject-line" />
            </div>
            <div className="grid">
              {games.map((g, i) => (
                <TiltCard key={cls + '-' + g.type} className="tile" delay={i * 0.04} onClick={() => openGame(g)}>
                  <div className="emoji">{g.emoji}</div>
                  <div className="t">{g.title}</div>
                  <div className="d">{g.desc}</div>
                </TiltCard>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const SUBJECTS = [
  { key: 'Maths', label: 'Maths', icon: '📘', color: '#60A5FA' },
  { key: 'English', label: 'English', icon: '📕', color: '#F472B6' },
  { key: 'Fun', label: 'Brain Games', icon: '🎲', color: '#34D399' }
];
