import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// floating 3D-style shapes (Spline-inspired): color, size, position, parallax depth, float timing
const SHAPES = [
  { g: 'linear-gradient(145deg,#F472B6,#EC4899)', s: 110, top: '14%', left: '22%', depth: 1.4, rot: -12, dur: 7 },
  { g: 'linear-gradient(145deg,#818CF8,#4F46E5)', s: 150, top: '52%', left: '12%', depth: 2.2, rot: 8, dur: 9 },
  { g: 'linear-gradient(145deg,#FBBF24,#F59E0B)', s: 80,  top: '24%', left: '74%', depth: 1.8, rot: 18, dur: 6 },
  { g: 'linear-gradient(145deg,#34D399,#10B981)', s: 130, top: '60%', left: '78%', depth: 2.6, rot: -10, dur: 8 },
  { g: 'linear-gradient(145deg,#C084FC,#9333EA)', s: 70,  top: '70%', left: '46%', depth: 1.2, rot: 14, dur: 7.5 },
  { g: 'linear-gradient(145deg,#60A5FA,#2563EB)', s: 60,  top: '12%', left: '50%', depth: 1.0, rot: -16, dur: 6.5 }
];

function Shape({ cfg, mx, my }) {
  const x = useTransform(mx, v => v * cfg.depth * 40);
  const y = useTransform(my, v => v * cfg.depth * 40);
  return (
    <motion.div className="shape" style={{ x, y, top: cfg.top, left: cfg.left }}>
      <motion.div
        style={{ width: cfg.s, height: cfg.s, background: cfg.g, rotate: cfg.rot }}
        className="shape-cube"
        animate={{ y: [0, -22, 0], rotate: [cfg.rot, cfg.rot + 8, cfg.rot] }}
        transition={{ duration: cfg.dur, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function Home({ setPage }) {
  const mxRaw = useMotionValue(0), myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mxRaw.set((e.clientX - r.left - r.width / 2) / r.width);
    myRaw.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const onLeave = () => { mxRaw.set(0); myRaw.set(0); };

  return (
    <div className="hero" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero-shapes">
        {SHAPES.map((cfg, i) => <Shape key={i} cfg={cfg} mx={mx} my={my} />)}
      </div>

      <div className="hero-content">
        <motion.h1 className="hero-title"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Learn, Play &amp; Imagine<br />with Miss Bharat
        </motion.h1>
        <motion.p className="hero-sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          An interactive world of games, voice fun and stories for Classes 1–5.
        </motion.p>
        <motion.button className="hero-cta"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={() => setPage('games')}>
          Start playing — it’s free →
        </motion.button>
        <motion.div className="hero-hint"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          ✨ Move your mouse to play with the shapes
        </motion.div>
      </div>
    </div>
  );
}
