import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { moveSound, winSound } from '../sound.js';
import { say } from '../say.js';
import DifficultyBar from './DifficultyBar.jsx';

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const winnerOf = (b) => { for (const [a,c,d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]; return null; };
const emptiesOf = (b) => b.map((v, i) => (v ? null : i)).filter(i => i !== null);
const rand = a => a[Math.floor(Math.random() * a.length)];

// perfect play for Hard: minimax (computer = ⭕ maximises)
function minimax(b, isComputer) {
  const w = winnerOf(b);
  if (w === '⭕') return 10;
  if (w === '❌') return -10;
  const empties = emptiesOf(b);
  if (!empties.length) return 0;
  const scores = empties.map(i => { const c = [...b]; c[i] = isComputer ? '⭕' : '❌'; return minimax(c, !isComputer); });
  return isComputer ? Math.max(...scores) : Math.min(...scores);
}
function bestMove(b) {
  let best = -Infinity, mv = -1;
  emptiesOf(b).forEach(i => { const c = [...b]; c[i] = '⭕'; const s = minimax(c, false); if (s > best) { best = s; mv = i; } });
  return mv;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [over, setOver] = useState(false);
  const [status, setStatus] = useState('You are ❌ — tap a square');
  const [diff, setDiff] = useState('Medium');

  useEffect(() => { say("Let's play Tic-Tac-Toe! You are X. Try to get three in a row!"); }, []); // eslint-disable-line

  const computerMove = (b) => {
    const empties = emptiesOf(b);
    const tryWin = (mark) => { for (const i of empties) { const c = [...b]; c[i] = mark; if (winnerOf(c) === mark) return i; } return null; };
    let m;
    if (diff === 'Easy') {
      m = rand(empties);                                  // random — easy to beat
    } else if (diff === 'Medium') {
      m = tryWin('⭕'); if (m === null) m = tryWin('❌');   // win, then block, else random
      if (m === null) m = rand(empties);
    } else {
      m = bestMove(b);                                    // Hard — unbeatable
    }
    const nb = [...b]; nb[m] = '⭕'; setBoard(nb);
    moveSound(false);
    say('Computer placed an O.');
    const w = winnerOf(nb);
    if (w) { setOver(true); setStatus('💻 Computer wins! Try again.'); say('Computer got three in a row. Try again, you can do it!'); return; }
    if (!nb.includes('')) { setOver(true); setStatus("🤝 It's a draw!"); say("It's a draw! Good game!"); return; }
    setStatus('You are ❌ — tap a square');
  };

  const onCell = (i) => {
    if (over || board[i]) return;
    const nb = [...board]; nb[i] = '❌'; setBoard(nb);
    moveSound(false);
    say('You placed an X.');
    const w = winnerOf(nb);
    if (w) { setOver(true); setStatus('🎉 You win!'); winSound(); say('Three in a row! You win! Wonderful!'); return; }
    if (!nb.includes('')) { setOver(true); setStatus("🤝 It's a draw!"); say("It's a draw! Good game!"); return; }
    setStatus('Computer thinking...');
    setTimeout(() => computerMove(nb), 400);
  };

  const restart = () => {
    setBoard(Array(9).fill('')); setOver(false); setStatus('You are ❌ — tap a square');
    say("New game! You are X. Good luck!");
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <DifficultyBar value={diff} onChange={setDiff} />
      <div style={{ color: '#818CF8', fontWeight: 600, minHeight: 28, marginBottom: 14 }}>{status}</div>
      <div className="ttt-board">
        {board.map((v, i) => (
          <motion.div key={i} className="ttt-cell" onClick={() => onCell(i)}
            whileHover={{ scale: v ? 1 : 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ color: v === '❌' ? '#EC4899' : '#6366F1' }}>
            {v && (
              <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}>{v}</motion.span>
            )}
          </motion.div>
        ))}
      </div>
      <button className="btn" style={{ marginTop: 18 }} onClick={restart}>🔄 New Game</button>
    </div>
  );
}
