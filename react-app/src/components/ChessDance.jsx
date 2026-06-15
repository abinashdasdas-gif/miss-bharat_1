import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { say } from '../say.js';

// Each piece is a silly character taught with Total Physical Response (a body motion).
// The glyph animation roughly mimics the piece's real legal move.
const PIECES = [
  { glyph: '♟', name: 'Babba the Baby Step', sub: 'The Pawn', color: '#34D399',
    story: 'Babba’s shoes are two sizes too big, so he takes one brave baby step forward — and munches diagonally!',
    motion: '👣 STOMP one step forward… then lean and poke diagonally — NOM NOM!',
    line: 'I am Babba the brave baby step! I walk one step forward, and I eat going diagonal. Stomp! Nom nom!',
    anim: { y: [0, -26, 0] } },
  { glyph: '♜', name: 'Robo-Rook', sub: 'The Rook', color: '#60A5FA',
    story: 'Robo-Rook glued a giant ruler to his back and refuses to bend it — straight lines only!',
    motion: '🤖 Stiff robot arms — ZOOM straight: forward, back, and sideways!',
    line: 'Beep! I am Robo Rook! I only zoom in straight lines: up, down, or sideways. Zoom!',
    anim: { x: [0, 46, -46, 0] } },
  { glyph: '♞', name: 'Sir Hoppy', sub: 'The Knight', color: '#C084FC',
    story: 'Sir Hoppy has springy hooves and is a touch dizzy — so he hops in a wobbly L and leaps over everyone!',
    motion: '🐴 Two steps… then turn and one step — BOING, in an L!',
    line: 'Pip pip! I am Sir Hoppy! I jump in an L shape and leap over everyone. Boing!',
    anim: { x: [0, 0, 38, 38, 0], y: [0, -44, -44, 0, 0] } },
  { glyph: '♝', name: 'Bishop Slippy', sub: 'The Bishop', color: '#F472B6',
    story: 'Bishop Slippy is terrified of the cracks between tiles, so he only tiptoes on the diagonals!',
    motion: '⛪ Lean and SWOOSH corner to corner — diagonals only!',
    line: 'The cracks! I am Bishop Slippy! I only slide diagonally, corner to corner. Swoosh!',
    anim: { x: [0, 40, -40, 0], y: [0, -40, 40, 0] } },
  { glyph: '♛', name: 'Queen Bossy-Boots', sub: 'The Queen', color: '#FBBF24',
    story: 'The Queen graduated top of robot school AND diagonal dance class — so she can do everything!',
    motion: '👑 Power pose, then twirl pointing every way — TA-DAAA!',
    line: 'Darling, I am the Queen! I can move any direction, as far as I like. Ta-da!',
    anim: { rotate: [0, 360], scale: [1, 1.12, 1] } },
  { glyph: '♚', name: 'King Tippy-Toes', sub: 'The King', color: '#F87171',
    story: 'The King is so important and so sleepy that he only shuffles one tiny step — in any direction!',
    motion: '🤴 One teeny careful step… creak… STEP. Mind the royal hip!',
    line: 'Oh my royal back! I am the King. I take one tiny step in any direction. Creak. Step.',
    anim: { y: [0, -10, 0], x: [0, 8, -8, 0] } }
];

export default function ChessDance({ onPlay }) {
  const [i, setI] = useState(0);
  const last = i === PIECES.length - 1;
  const p = PIECES[i];

  useEffect(() => { say(p.line); return () => {}; }, [i]); // eslint-disable-line

  return (
    <div className="dance">
      <p className="dance-intro">🕺 Copy the silly move with your body!</p>

      <div className="dance-stage">
        <AnimatePresence mode="wait">
          <motion.div key={i} className="dance-glyph" style={{ color: p.color }}
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <motion.span style={{ display: 'inline-block' }}
              animate={p.anim} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              {p.glyph}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      <h2 className="dance-name">{p.name}</h2>
      <div className="dance-tag">{p.sub}</div>
      <p className="dance-story">{p.story}</p>
      <div className="dance-motion">{p.motion}</div>

      <div className="dance-nav">
        <button className="page-btn" disabled={i === 0} onClick={() => setI(i - 1)}>‹ Back</button>
        <button className="page-btn" onClick={() => say(p.line)}>🔊 Again</button>
        <span className="dance-count">{i + 1} / {PIECES.length}</span>
        <button className="page-btn next" onClick={() => (last ? onPlay() : setI(i + 1))}>
          {last ? 'Play Chess ♟️' : 'Next ›'}
        </button>
      </div>
    </div>
  );
}
