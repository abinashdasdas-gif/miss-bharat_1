import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// floating 3D-style shapes scattered around the edges (Spline-inspired)
const SHAPES = [
  { g: 'linear-gradient(145deg,#F472B6,#EC4899)', s: 120, top: '12%', left: '24%', depth: 1.6, rot: -14, dur: 7 },
  { g: 'linear-gradient(145deg,#FBBF24,#F59E0B)', s: 64,  top: '30%', left: '16%', depth: 1.2, rot: 12, dur: 6 },
  { g: 'linear-gradient(145deg,#818CF8,#4F46E5)', s: 150, top: '58%', left: '10%', depth: 2.4, rot: 8, dur: 9 },
  { g: 'linear-gradient(145deg,#34D399,#10B981)', s: 96,  top: '74%', left: '30%', depth: 1.8, rot: -8, dur: 8 },
  { g: 'linear-gradient(145deg,#FBBF24,#F59E0B)', s: 104, top: '16%', left: '72%', depth: 1.7, rot: 16, dur: 6.5 },
  { g: 'linear-gradient(145deg,#C084FC,#9333EA)', s: 72,  top: '40%', left: '80%', depth: 1.3, rot: 14, dur: 7.5 },
  { g: 'linear-gradient(145deg,#60A5FA,#2563EB)', s: 140, top: '60%', left: '82%', depth: 2.6, rot: -12, dur: 9.5 },
  { g: 'linear-gradient(145deg,#F472B6,#DB2777)', s: 60,  top: '78%', left: '64%', depth: 1.1, rot: 20, dur: 6.8 },
  { g: 'linear-gradient(145deg,#34D399,#059669)', s: 58,  top: '10%', left: '52%', depth: 1.0, rot: -18, dur: 7.2 }
];

function Shape({ cfg, mx, my }) {
  const x = useTransform(mx, v => v * cfg.depth * 45);
  const y = useTransform(my, v => v * cfg.depth * 45);
  return (
    <motion.div className="shape" style={{ x, y, top: cfg.top, left: cfg.left }}>
      <motion.div className="shape-cube"
        style={{ width: cfg.s, height: cfg.s, background: cfg.g, rotate: cfg.rot }}
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

  // tilt the whole scene slightly with the cursor for an "orbit" feel
  const rotY = useTransform(mx, v => v * 10);
  const rotX = useTransform(my, v => -v * 10);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mxRaw.set((e.clientX - r.left - r.width / 2) / r.width);
    myRaw.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const onLeave = () => { mxRaw.set(0); myRaw.set(0); };

  return (
    <div className="hero" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero-grid" />
      <motion.div className="hero-shapes" style={{ rotateX: rotX, rotateY: rotY }}>
        {SHAPES.map((cfg, i) => <Shape key={i} cfg={cfg} mx={mx} my={my} />)}
        <motion.div className="hero-mascot"
          animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          👑
        </motion.div>
      </motion.div>

      <div className="hero-content">
        <motion.h1 className="hero-title"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          The all-in-one world<br />of fun learning
        </motion.h1>
        <motion.p className="hero-sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          Miss Bharat is an interactive world of games, voice fun and stories for Classes 1–5.
        </motion.p>
        <motion.button className="hero-cta"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={() => setPage('games')}>
          Start playing — it’s free →
        </motion.button>
      </div>

      <div className="hero-orbit-hint">Move your mouse to orbit</div>
    </div>
  );
}
