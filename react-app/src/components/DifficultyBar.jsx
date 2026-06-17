const LEVELS = ['Easy', 'Medium', 'Hard'];

// Small reusable Easy/Medium/Hard selector used by the arcade games.
export default function DifficultyBar({ value, onChange }) {
  return (
    <div className="diff-bar" role="group" aria-label="Difficulty">
      {LEVELS.map(l => (
        <button key={l} className={'diff-chip' + (value === l ? ' on' : '')}
          aria-pressed={value === l} onClick={() => onChange(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}
