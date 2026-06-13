import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { speak } from '../voice.js';
import { generateQuestion, deriveExpected, matchesExpected } from '../voiceLogic.js';

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceGame({ type, title, questions }) {
  const [question, setQuestion] = useState('');
  const [expected, setExpected] = useState(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('idle');      // idle | listening | thinking
  const [feedback, setFeedback] = useState('');
  const [good, setGood] = useState(true);
  const recRef = useRef(null);
  const respondedRef = useRef(false);

  const nextQuestion = () => {
    const q = generateQuestion(questions, type);
    setQuestion(q); setExpected(deriveExpected(q)); setFeedback('');
  };

  useEffect(() => { nextQuestion(); }, [type]); // eslint-disable-line

  useEffect(() => {
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false; rec.interimResults = true; rec.maxAlternatives = 5; rec.lang = 'en-IN';

    rec.onresult = (e) => {
      let alts = [];
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        for (let j = 0; j < res.length; j++) alts.push(res[j].transcript);
      }
      if ((alts[0] || '').trim().length >= 1) respond(alts);
    };
    rec.onspeechend = () => { if (!respondedRef.current) { setPhase('thinking'); setFeedback('💭 Thinking...'); try { rec.stop(); } catch (_) {} } };
    rec.onerror = () => { setPhase('idle'); setGood(false); setFeedback('❌ Try again! Speak louder.'); };
    rec.onend = () => setPhase(p => (p === 'listening' ? 'idle' : p));
    recRef.current = rec;
    return () => { try { rec.abort(); } catch (_) {} };
  }, []); // eslint-disable-line

  const respond = (alts) => {
    if (respondedRef.current) return;
    respondedRef.current = true;
    try { recRef.current.stop(); } catch (_) {}
    setPhase('idle');
    const said = (alts[0] || '').trim();
    if (matchesExpected(alts, expected)) {
      setScore(s => s + 1);
      const r = ['Excellent! 🌟', 'Great job! 👏', 'Perfect! ⭐', 'Well done! 🎉', 'Super! 🚀'][Math.floor(Math.random() * 5)];
      setGood(true); setFeedback(r); speak(`${r} You said ${said}.`);
    } else {
      setGood(false); setFeedback(`🙂 Almost! I heard “${said}”. Tap the mic and try again!`);
      speak(`Almost! I heard ${said}. Try again, you can do it!`);
    }
  };

  const listen = () => {
    if (!SR) { setGood(false); setFeedback('🎤 Voice not supported in this browser. Try Chrome.'); return; }
    if (phase !== 'idle') return;
    respondedRef.current = false;
    setPhase('listening'); setGood(true); setFeedback('🎤 Listening...');
    try { recRef.current.start(); } catch (_) {}
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Montserrat', margin: '10px 0 24px', fontSize: '1.4rem' }}>{question}</h2>

      <motion.button onClick={listen}
        className="mic-btn"
        animate={phase === 'listening' ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={phase === 'listening' ? { repeat: Infinity, duration: 0.7 } : {}}
        whileTap={{ scale: 0.92 }}>
        🎤
        {phase === 'listening' && <motion.span className="ring"
          initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 1.6, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.1 }} />}
        {phase === 'thinking' && <motion.span className="spin"
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />}
      </motion.button>

      <div style={{ color: '#818CF8', fontWeight: 700, fontSize: '1.2rem', margin: '16px 0' }}>🎯 Score: {score}</div>
      <div style={{ minHeight: 32, fontWeight: 700, fontSize: '1.1rem', color: good ? '#10B981' : '#EF4444' }}>{feedback}</div>

      <button className="btn" style={{ marginTop: 18 }} onClick={nextQuestion}>Next Question →</button>
    </div>
  );
}
