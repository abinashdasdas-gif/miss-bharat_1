import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { moveSound, winSound } from '../sound.js';

const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const winnerOf = (b) => { for (const [a,c,d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]; return null; };

export default function TicTacToe({ speak }) {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [over, setOver] = useState(false);
  const [status, setStatus] = useState('You are ❌ — tap a square');

  useEffect(() => { if (speak) speak("Let's play Tic-Tac-Toe! You are X. Try to get three in a row!"); }, []); // eslint-disable-line

  const computerMove = (b) => {
    const empties = b.map((v, i) => (v ? null : i)).filter(i => i !== null);
    const tryWin = (mark) => { for (const i of empties) { const c = [...b]; c[i] = mark; if (winnerOf(c) === mark) return i; } return null; };
    let m = tryWin('⭕'); if (m === null) m = tryWin('❌');
    if (m === null && b[4] === '') m = 4;
    if (m === null) { const corners = [0,2,6,8].filter(i => b[i] === ''); if (corners.length) m = corners[Math.floor(Math.random()*corners.length)]; }
    if (m === null) m = empties[Math.floor(Math.random()*empties.length)];
    const nb = [...b]; nb[m] = '⭕'; setBoard(nb);
    moveSound(false);
    if (speak) speak('Computer placed an O.');
    const w = winnerOf(nb);
    if (w) { setOver(true); setStatus('💻 Computer wins! Try again.'); if (speak) speak('Computer got three in a row. Try again, you can do it!'); return; }
    if (!nb.includes('')) { setOver(true); setStatus("🤝 It's a draw!"); if (speak) speak("It's a draw! Good game!"); return; }
    setStatus('You are ❌ — tap a square');
  };

  const onCell = (i) => {
    if (over || board[i]) return;
    const nb = [...board]; nb[i] = '❌'; setBoard(nb);
    moveSound(false);
    if (speak) speak('You placed an X.');
    const w = winnerOf(nb);
    if (w) { setOver(true); setStatus('🎉 You win!'); winSound(); if (speak) speak('Three in a row! You win! Wonderful!'); return; }
    if (!nb.includes('')) { setOver(true); setStatus("🤝 It's a draw!"); if (speak) speak("It's a draw! Good game!"); return; }
    setStatus('Computer thinking...');
    setTimeout(() => computerMove(nb), 400);
  };

  const restart = () => {
    setBoard(Array(9).fill('')); setOver(false); setStatus('You are ❌ — tap a square');
    if (speak) speak("New game! You are X. Good luck!");
  };

  return (
    <div style={{ textAlign: 'center' }}>
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
