import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Anti-gravity card: cursor-reactive 3D tilt (±8°) + cursor-following glow + spring physics.
export default function TiltCard({ children, className = '', onClick, delay = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const gx = useMotionValue('50%'), gy = useMotionValue('50%');
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 24 });
  const glow = useTransform([gx, gy], ([a, b]) => `radial-gradient(320px circle at ${a} ${b}, rgba(255,255,255,.16), transparent 60%)`);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5); y.set(py - 0.5);
    gx.set(px * 100 + '%'); gy.set(py * 100 + '%');
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={onClick}
      className={'tilt-card ' + className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
      <motion.div className="tilt-glow" style={{ background: glow }} />
      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(30px)' }}>{children}</div>
    </motion.div>
  );
}
