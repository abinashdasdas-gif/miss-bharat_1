import { motion } from 'framer-motion';
import { FadeUp } from '../components/FadeUp.jsx';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4';
const HEADING = 'WE BUILD END-TO-END AI AUTOMATION SYSTEMS.';
const words = HEADING.split(' ');

export default function VideoHero() {
  return (
    <>
      {/* Fixed background video — transparent section sits over it */}
      <video className="vh-video" src={VIDEO_SRC} autoPlay muted loop playsInline />

      <section className="vh-section">
        <div className="vh-content">
          <h2 className="vh-heading">
            {words.map((w, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                {w}
              </motion.span>
            ))}
          </h2>

          <FadeUp as="p" delay={0.9} y={24} className="vh-sub">
            We provide all-in-one AI automation services in one place.
          </FadeUp>
        </div>
      </section>
    </>
  );
}
