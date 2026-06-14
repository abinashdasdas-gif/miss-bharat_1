import { useState } from 'react';
import TiltCard from '../components/TiltCard.jsx';

const STATS = [
  { label: 'Total Play Time', value: '2h 15m', detail: 'This week' },
  { label: 'Games Completed', value: '42', detail: 'Across all classes' },
  { label: 'Vocabulary Learned', value: '156', detail: 'New words' },
  { label: 'Speech Progress', value: '89%', detail: 'Pronunciation accuracy' }
];

export default function Dashboard() {
  const [time, setTime] = useState(30);
  const [diff, setDiff] = useState(3);
  const [filter, setFilter] = useState(true);

  return (
    <div className="container">
      <h1 className="page-title" style={{ textAlign: 'left' }}>👨‍👩‍👧 Parent Dashboard</h1>

      <div className="dash-grid">
        {STATS.map((s, i) => (
          <TiltCard key={s.label} className="stat-card" delay={i * 0.06}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-detail">{s.detail}</div>
          </TiltCard>
        ))}
      </div>

      <div className="controls-card">
        <h2 style={{ fontFamily: 'Montserrat', marginBottom: 22 }}>⏱️ Daily Limits & Safety</h2>

        <div className="control-row">
          <div className="control-label">Daily Play Time: <b>{time} minutes</b></div>
          <input type="range" min="10" max="120" value={time} onChange={e => setTime(+e.target.value)} className="slider" />
        </div>
        <div className="control-row">
          <div className="control-label">Difficulty Level: <b>{diff} / 5</b></div>
          <input type="range" min="1" max="5" value={diff} onChange={e => setDiff(+e.target.value)} className="slider" />
        </div>

        <div className="toggle-row" onClick={() => setFilter(f => !f)}>
          <span>Content Filter (kid-safe)</span>
          <div className={'switch' + (filter ? ' on' : '')}><div className="knob" /></div>
        </div>

        <button className="btn" style={{ marginTop: 22 }} onClick={() => alert('✓ Settings saved!')}>Save Settings</button>
      </div>
    </div>
  );
}
