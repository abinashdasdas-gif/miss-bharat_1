import { useState, useEffect } from 'react';
import { say } from '../say.js';
import { moveSound, winSound } from '../sound.js';
import DifficultyBar from './DifficultyBar.jsx';

const IMAGES = ['stories/s1-p0.jpg', 'stories/s3-p0.jpg', 'stories/s2-p4.jpg', 'stories/s0-p0.jpg'];
const SIZES = { Easy: 3, Medium: 4, Hard: 5 }; // grid = N x N

function shuffled(n) {
  const a = [...Array(n * n).keys()];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.every((v, i) => v === i) ? shuffled(n) : a;
}

export default function Jigsaw() {
  const [diff, setDiff] = useState('Easy');
  const n = SIZES[diff];
  const [imgIdx, setImgIdx] = useState(0);
  const [order, setOrder] = useState(() => shuffled(SIZES.Easy));
  const [sel, setSel] = useState(null);
  const [solved, setSolved] = useState(false);
  const img = `${import.meta.env.BASE_URL}${IMAGES[imgIdx]}`;

  // reshuffle when difficulty (grid size) changes
  useEffect(() => { setOrder(shuffled(SIZES[diff])); setSel(null); setSolved(false); }, [diff]);

  const tap = (slot) => {
    if (solved) return;
    if (sel === null) { setSel(slot); return; }
    if (sel === slot) { setSel(null); return; }
    const next = [...order];
    [next[sel], next[slot]] = [next[slot], next[sel]];
    setSel(null); setOrder(next); moveSound(false);
    if (next.every((v, i) => v === i)) { setSolved(true); winSound(); say('Well done!'); }
  };

  const shuffle = () => { setSolved(false); setSel(null); setOrder(shuffled(n)); };
  const newPic = () => { setImgIdx((imgIdx + 1) % IMAGES.length); shuffle(); };

  return (
    <div className="jigsaw">
      <DifficultyBar value={diff} onChange={setDiff} />
      <p className="jigsaw-hint">{solved ? '🎉 You solved it!' : 'Tap two pieces to swap them.'}</p>

      {solved ? (
        <div className="jigsaw-board solved" style={{ backgroundImage: `url(${img})` }} />
      ) : (
        <div className="jigsaw-board" style={{ gridTemplateColumns: `repeat(${n},1fr)`, gridTemplateRows: `repeat(${n},1fr)` }}>
          {order.map((piece, slot) => {
            const px = piece % n, py = Math.floor(piece / n);
            return (
              <button key={slot} className={'jigsaw-piece' + (sel === slot ? ' sel' : '')}
                onClick={() => tap(slot)}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: `${n * 100}% ${n * 100}%`,
                  backgroundPosition: `${(px * 100) / (n - 1)}% ${(py * 100) / (n - 1)}%`
                }} />
            );
          })}
        </div>
      )}

      <div className="jigsaw-nav">
        <button className="btn" onClick={shuffle}>🔄 Shuffle</button>
        <button className="btn ghost" onClick={newPic}>🖼️ New Picture</button>
      </div>
    </div>
  );
}
