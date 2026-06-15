import { useState, useRef, useEffect } from 'react';

/*
  THE QUIET SPACE — a sensory-safe learning module for autistic learners (Grades 1–5).
  Design principles applied throughout:
  - Predictability: one task on screen at a time, fixed navigation, no surprises.
  - Low sensory load: muted colors, no flashing, no chaotic motion, no sudden sound.
  - No failure states: wrong answers never punish; the child simply tries again.
  - Clear structure: an explicit "First → Then" contract so the child knows what is coming.
  All animations are gentle, slow, and can be switched off entirely (Sensory Friendly mode).
*/

// Calm, neutral narration. Slower rate + neutral pitch reduces auditory stress.
function readAloud(text) {
  if (!text || !('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;   // unhurried — easier to process
  u.pitch = 1.0;   // neutral, not excitable
  u.volume = 1;
  speechSynthesis.speak(u);
}

// Simple, concrete questions — single sentence, one idea each.
const TASKS = [
  { q: 'Which animal says "moo"?', options: [
      { text: 'Cow', ok: true }, { text: 'Cat', ok: false }, { text: 'Dog', ok: false } ] },
  { q: 'Which one do we use to see?', options: [
      { text: 'Eyes', ok: true }, { text: 'Hands', ok: false }, { text: 'Feet', ok: false } ] },
  { q: 'What comes after the number two?', options: [
      { text: 'Three', ok: true }, { text: 'One', ok: false }, { text: 'Five', ok: false } ] }
];

const SESSION_SECONDS = 90; // gentle, generous; shown only as a smooth shrinking ring (no numbers)

export default function QuietSpace() {
  const [sensory, setSensory] = useState(false);   // Sensory-Friendly theme + motion off
  const [phase, setPhase] = useState('intro');      // 'intro' (First→Then) | 'task'
  const [idx, setIdx] = useState(0);
  const [faded, setFaded] = useState({});           // option indices the child already tried
  const [solved, setSolved] = useState(false);      // current task answered correctly
  const [showStar, setShowStar] = useState(false);  // gentle success badge
  const ringRef = useRef(null);

  const task = TASKS[idx];

  // Start the smooth visual timer when a task begins. It only depletes a ring — never shows
  // changing numbers, which can cause time-pressure anxiety.
  useEffect(() => {
    if (phase !== 'task' || !ringRef.current) return;
    const ring = ringRef.current;
    const len = ring.getTotalLength();
    ring.style.transition = 'none';
    ring.style.strokeDasharray = String(len);
    ring.style.strokeDashoffset = '0';
    // force reflow so the transition starts from full
    // eslint-disable-next-line no-unused-expressions
    ring.getBoundingClientRect();
    ring.style.transition = `stroke-dashoffset ${SESSION_SECONDS}s linear`;
    ring.style.strokeDashoffset = String(len); // deplete smoothly to empty
    // (offset animates 0 -> len, gracefully emptying the ring)
    requestAnimationFrame(() => { ring.style.strokeDashoffset = String(len); });
  }, [phase, idx]);

  const startTask = () => { setPhase('task'); readAloud(task.q); };

  const choose = (i, opt) => {
    if (solved) return;
    if (opt.ok) {
      // Gentle, predictable success: a slow green star for 2 seconds. No confetti, no loud sound.
      setSolved(true);
      setShowStar(true);
      readAloud('Well done.');
      setTimeout(() => setShowStar(false), 2000);
    } else {
      // No punishment: the wrong choice simply fades back and gives a small, soft shake.
      setFaded(f => ({ ...f, [i]: true }));
      readAloud('Try again.');
    }
  };

  const nextTask = () => {
    if (idx < TASKS.length - 1) {
      setIdx(idx + 1); setFaded({}); setSolved(false); setShowStar(false); setPhase('intro');
    }
  };
  const prevTask = () => {
    if (idx > 0) { setIdx(idx - 1); setFaded({}); setSolved(false); setShowStar(false); setPhase('intro'); }
  };

  return (
    <div className={'qs-root' + (sensory ? ' qs-sensory' : '')}>
      {/* Sensory toggle — predictable, always in the same place, clearly labelled */}
      <div className="qs-topbar">
        <h1 className="qs-title">The Quiet Space</h1>
        <label className="qs-toggle">
          <span>Sensory Friendly</span>
          <button
            className={'qs-switch' + (sensory ? ' on' : '')}
            role="switch" aria-checked={sensory}
            aria-label="Sensory Friendly mode"
            onClick={() => setSensory(s => !s)}>
            <span className="qs-knob" />
          </button>
        </label>
      </div>

      {/* First → Then contract: the child always knows the task AND the reward up front */}
      <div className="qs-firstthen" aria-label="First do the task, then earn a star">
        <div className={'qs-ft-card' + (phase === 'task' && !solved ? ' active' : '')}>
          <div className="qs-ft-label">First</div>
          <div className="qs-ft-emoji">📘</div>
          <div className="qs-ft-text">Do the task</div>
        </div>
        <div className="qs-ft-arrow" aria-hidden="true">➔</div>
        <div className={'qs-ft-card' + (solved ? ' active' : '')}>
          <div className="qs-ft-label">Then</div>
          <div className="qs-ft-emoji">⭐</div>
          <div className="qs-ft-text">Earn a star</div>
        </div>
      </div>

      {phase === 'intro' && (
        <div className="qs-panel qs-center">
          <p className="qs-line">When you are ready, press Start.</p>
          <button className="qs-start" onClick={startTask}>Start</button>
        </div>
      )}

      {phase === 'task' && (
        <div className="qs-panel">
          {/* Smooth, numberless visual timer — calm sense of time, no pressure */}
          <div className="qs-timer" aria-hidden="true">
            <svg viewBox="0 0 120 120" width="84" height="84">
              <circle cx="60" cy="60" r="52" className="qs-timer-track" />
              <circle cx="60" cy="60" r="52" className="qs-timer-ring" ref={ringRef}
                transform="rotate(-90 60 60)" />
            </svg>
          </div>

          <p className="qs-question">{task.q}</p>

          <div className="qs-options" role="group" aria-label="Choose your answer">
            {task.options.map((opt, i) => (
              <button key={i}
                className={'qs-option' + (faded[i] ? ' faded' : '') + (solved && opt.ok ? ' correct' : '')}
                disabled={solved}
                onMouseEnter={() => readAloud(opt.text)}   /* read on hover (mouse) */
                onFocus={() => readAloud(opt.text)}        /* read on keyboard focus */
                onClick={() => choose(i, opt)}>            {/* choose: gives calm spoken + visual feedback */}
                {opt.text}
              </button>
            ))}
          </div>

          {/* Gentle success cue: a slow-fading green star, exactly 2 seconds, every time */}
          {showStar && <div className="qs-star" role="status" aria-label="Correct">⭐</div>}
          {solved && <p className="qs-done">Great job. You earned a star.</p>}
        </div>
      )}

      {/* Fixed, static navigation in the bottom corners — never moves, never hides */}
      <div className="qs-nav">
        <button className="qs-navbtn" onClick={prevTask} disabled={idx === 0}>‹ Back</button>
        <span className="qs-progress" aria-label={`Task ${idx + 1} of ${TASKS.length}`}>
          {idx + 1} / {TASKS.length}
        </span>
        <button className="qs-navbtn next" onClick={nextTask} disabled={!solved || idx === TASKS.length - 1}>
          Next ›
        </button>
      </div>
    </div>
  );
}
