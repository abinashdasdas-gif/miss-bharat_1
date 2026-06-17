import { useState } from 'react';
import { motion } from 'framer-motion';
import { moveSound, winSound } from '../sound.js';
import { say } from '../say.js';
import DifficultyBar from './DifficultyBar.jsx';

const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
const PIECE_NAMES = { K: 'King', Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight', P: 'Pawn' };
// funny battle-cry shouted by the capturing piece (matches Kokoro phrase-bank clips)
const CAPTURE_LINES = {
  P: 'Snack time! Open wide!',
  R: 'Demolition mode activated!',
  N: 'Pardon me, old chap! Incoming!',
  B: 'Surprise, darling!',
  Q: "You've been Queened, darling! Bye bye!",
  K: 'Move along now, whippersnapper!'
};
const PIECE_INFO = {
  P: 'Pawn. It walks one step forward, and captures sideways.',
  N: 'Knight! It jumps in an L-shape and can hop over other pieces.',
  B: 'Bishop. It slides diagonally, as far as you like.',
  R: 'Rook. It slides straight — up, down, or sideways.',
  Q: 'Queen, the most powerful piece! She moves any direction.',
  K: 'King. He moves one square in any direction. Keep him safe!'
};

const START = () => [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR']
];

const inB = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

function legalMoves(board, r, c) {
  const p = board[r][c];
  if (!p) return [];
  const color = p[0], type = p[1], enemy = color === 'w' ? 'b' : 'w', moves = [];
  const add = (rr, cc) => { if (inB(rr, cc) && (!board[rr][cc] || board[rr][cc][0] === enemy)) moves.push([rr, cc]); };
  const ray = dirs => dirs.forEach(([dr, dc]) => {
    let rr = r + dr, cc = c + dc;
    while (inB(rr, cc)) {
      if (!board[rr][cc]) moves.push([rr, cc]);
      else { if (board[rr][cc][0] === enemy) moves.push([rr, cc]); break; }
      rr += dr; cc += dc;
    }
  });
  if (type === 'P') {
    const dir = color === 'w' ? -1 : 1, start = color === 'w' ? 6 : 1;
    if (inB(r + dir, c) && !board[r + dir][c]) {
      moves.push([r + dir, c]);
      if (r === start && !board[r + 2 * dir][c]) moves.push([r + 2 * dir, c]);
    }
    [[dir, -1], [dir, 1]].forEach(([dr, dc]) => {
      const rr = r + dr, cc = c + dc;
      if (inB(rr, cc) && board[rr][cc] && board[rr][cc][0] === enemy) moves.push([rr, cc]);
    });
  } else if (type === 'N') {
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr, dc]) => add(r + dr, c + dc));
  } else if (type === 'K') {
    [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(([dr, dc]) => add(r + dr, c + dc));
  } else if (type === 'R') ray([[-1,0],[1,0],[0,-1],[0,1]]);
  else if (type === 'B') ray([[-1,-1],[-1,1],[1,-1],[1,1]]);
  else if (type === 'Q') ray([[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]);
  return moves;
}

/* ---- difficulty-aware computer AI (black) ---- */
const VAL = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 1000 };
const rand = a => a[Math.floor(Math.random() * a.length)];
function applyTo(b, fr, fc, tr, tc) {
  const nb = b.map(row => row.slice());
  const p = nb[fr][fc]; nb[tr][tc] = p; nb[fr][fc] = '';
  if (p === 'wP' && tr === 0) nb[tr][tc] = 'wQ';
  if (p === 'bP' && tr === 7) nb[tr][tc] = 'bQ';
  return nb;
}
function material(b) { // + favours white, − favours black
  let s = 0;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { const p = b[r][c]; if (p) s += (p[0] === 'w' ? 1 : -1) * VAL[p[1]]; }
  return s;
}
function allMoves(b, color) {
  const mv = [];
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++)
    if (b[r][c] && b[r][c][0] === color) legalMoves(b, r, c).forEach(m => mv.push([r, c, m[0], m[1]]));
  return mv;
}
// returns [fr,fc,tr,tc] for black, or null if no moves
function chooseBlackMove(b, diff) {
  const moves = allMoves(b, 'b');
  if (!moves.length) return null;
  if (diff === 'Easy') {
    const caps = moves.filter(m => b[m[2]][m[3]]);          // mostly random, sometimes grabs a free piece
    return (caps.length && Math.random() < 0.35) ? rand(caps) : rand(moves);
  }
  if (diff === 'Medium') {
    let best = [], bs = -1;                                  // greedy: take the most valuable capture
    moves.forEach(m => { const t = b[m[2]][m[3]]; const sc = t ? VAL[t[1]] : 0; if (sc > bs) { bs = sc; best = [m]; } else if (sc === bs) best.push(m); });
    return rand(best);
  }
  // Hard: 2-ply minimax on material — black minimises white's best reply
  let best = [], bestVal = Infinity;
  for (const m of moves) {
    if (b[m[2]][m[3]] && b[m[2]][m[3]][1] === 'K') return m; // grab the king if exposed
    const after = applyTo(b, m[0], m[1], m[2], m[3]);
    const wReplies = allMoves(after, 'w');
    let worst = wReplies.length ? -Infinity : material(after);
    for (const w of wReplies) { const v = material(applyTo(after, w[0], w[1], w[2], w[3])); if (v > worst) worst = v; }
    if (worst < bestVal) { bestVal = worst; best = [m]; } else if (worst === bestVal) best.push(m);
  }
  return rand(best);
}

export default function Chess() {
  const [board, setBoard] = useState(START);
  const [sel, setSel] = useState(null);
  const [legal, setLegal] = useState([]);
  const [turn, setTurn] = useState('w');
  const [over, setOver] = useState(false);
  const [status, setStatus] = useState('Your turn — tap a piece to learn how it moves!');
  const [faint, setFaint] = useState(null); // captured piece doing its dramatic exit { r, c, type, color }
  const [diff, setDiff] = useState('Medium');

  const applyMove = (b, fr, fc, tr, tc) => {
    const nb = b.map(row => row.slice());
    const piece = nb[fr][fc], captured = nb[tr][tc];
    nb[tr][tc] = piece; nb[fr][fc] = '';
    if (piece === 'wP' && tr === 0) nb[tr][tc] = 'wQ';
    if (piece === 'bP' && tr === 7) nb[tr][tc] = 'bQ';
    return { nb, piece, captured };
  };

  const computerMove = (b) => {
    const mv = chooseBlackMove(b, diff);
    if (!mv) { setStatus('🎉 Stalemate — well played!'); setOver(true); return; }
    const { nb, piece, captured } = applyMove(b, mv[0], mv[1], mv[2], mv[3]);
    setBoard(nb);
    if (captured) setFaint({ r: mv[2], c: mv[3], type: captured[1], color: captured[0] });
    moveSound(!!captured);
    say(captured ? CAPTURE_LINES[piece[1]] : `Computer moved the ${PIECE_NAMES[piece[1]]}.`);
    if (captured && captured[1] === 'K') { setStatus('💻 Computer wins! Try again.'); setOver(true); say('The computer wins. Try again, you can do it!'); return; }
    setTurn('w'); setStatus('Your turn — tap a piece');
  };

  const onCell = (r, c) => {
    if (over || turn !== 'w') return;
    const p = board[r][c];
    if (sel && legal.some(m => m[0] === r && m[1] === c)) {
      const { nb, piece, captured } = applyMove(board, sel[0], sel[1], r, c);
      setBoard(nb); setSel(null); setLegal([]);
      if (captured) setFaint({ r, c, type: captured[1], color: captured[0] });
      moveSound(!!captured);
      say(captured ? CAPTURE_LINES[piece[1]] : `You moved the ${PIECE_NAMES[piece[1]]}.`);
      if (captured && captured[1] === 'K') { setStatus('🎉 You win! Checkmate!'); setOver(true); winSound(); say('You win the game! Wonderful!'); return; }
      setTurn('b'); setStatus('Computer thinking...');
      setTimeout(() => computerMove(nb), 500);
      return;
    }
    if (p && p[0] === 'w') {
      setSel([r, c]); setLegal(legalMoves(board, r, c));
      setStatus('👆 ' + PIECE_INFO[p[1]]); say(PIECE_INFO[p[1]]);
    } else { setSel(null); setLegal([]); }
  };

  const restart = () => {
    setBoard(START()); setSel(null); setLegal([]); setTurn('w'); setOver(false); setFaint(null);
    setStatus('Your turn — tap a piece!');
    say("Let's play chess! Tap any of your pieces and I will tell you how it moves.");
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <DifficultyBar value={diff} onChange={setDiff} />
      <div style={{ color: '#818CF8', fontWeight: 600, minHeight: 28, marginBottom: 14 }}>{status}</div>
      <div className="chess-board">
        {board.map((row, r) => row.map((p, c) => {
          const dark = (r + c) % 2 === 1;
          const isSel = sel && sel[0] === r && sel[1] === c;
          const isMove = legal.some(m => m[0] === r && m[1] === c);
          return (
            <div key={r + '-' + c}
              className={'chess-cell ' + (dark ? 'dark' : 'light') + (isSel ? ' sel' : '') + (isMove ? ' move' : '')}
              onClick={() => onCell(r, c)}>
              {p && (
                <motion.span className={'cp cp-' + (p[0] === 'w' ? 'white' : 'black')}
                  layout layoutId={'pc-' + r + '-' + c}
                  initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                  {GLYPH[p[1]]}
                </motion.span>
              )}
              {/* captured piece's dramatic faint: spin, shrink, tumble away */}
              {faint && faint.r === r && faint.c === c && (
                <motion.span className={'cp cp-' + (faint.color === 'w' ? 'white' : 'black') + ' faint-ghost'}
                  initial={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 0.35, rotate: 540, y: 70 }}
                  transition={{ duration: 0.85, ease: 'easeIn' }}
                  onAnimationComplete={() => setFaint(null)}>
                  {GLYPH[faint.type]}
                </motion.span>
              )}
            </div>
          );
        }))}
      </div>
      <button className="btn" style={{ marginTop: 18 }} onClick={restart}>🔄 New Game</button>
    </div>
  );
}
