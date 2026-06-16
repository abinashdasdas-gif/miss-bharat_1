import { useState } from 'react';
import { say } from '../say.js';
import { moveSound, winSound } from '../sound.js';

const N = 3; // 3x3 puzzle — gentle for little kids
const IMAGES = ['stories/s1-p0.jpg', 'stories/s3-p0.jpg', 'stories/s2-p4.jpg', 'stories/s0-p0.jpg'];

function shuffled() {
  const a = [...Array(N * N).keys()];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a.every((v, i) => v === i) ? shuffled() : a; // never start already-solved
}

export default function Jigsaw() {
  const [imgIdx, setImgIdx] = useState(0);
  const [order, setOrder] = useState(shuffled);   // order[slot] = which piece sits there
  const [sel, setSel] = useState(null);
  const [solved, setSolved] = useState(false);
  const img = `${import.meta.env.BASE_URL}${IMAGES[imgIdx]}`;

  const tap = (slot) => {
    if (solved) return;
    if (sel === null) { setSel(slot); return; }
    if (sel === slot) { setSel(null); return; }
    const next = [...order];
    [next[sel], next[slot]] = [next[slot], next[sel]];
    setSel(null); setOrder(next); moveSound(false);
    if (next.every((v, i) => v === i)) { setSolved(true); winSound(); say('Well done!'); }
  };

  const shuffle = () => { setSolved(false); setSel(null); setOrder(shuffled()); };
  const newPic = () => { setImgIdx((imgIdx + 1) % IMAGES.length); shuffle(); };

  return (
    <div className="jigsaw">
      <p className="jigsaw-hint">{solved ? '🎉 You solved it!' : 'Tap two pieces to swap them.'}</p>

      {solved ? (
        <div className="jigsaw-board solved" style={{ backgroundImage: `url(${img})` }} />
      ) : (
        <div className="jigsaw-board">
          {order.map((piece, slot) => {
            const px = piece % N, py = Math.floor(piece / N);
            return (
              <button key={slot} className={'jigsaw-piece' + (sel === slot ? ' sel' : '')}
                onClick={() => tap(slot)}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: `${N * 100}% ${N * 100}%`,
                  backgroundPosition: `${(px * 100) / (N - 1)}% ${(py * 100) / (N - 1)}%`
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
