export default function Stepper({ label, value, onChange, min = 0, max = 30 }) {
  function clamp(n) {
    return Math.min(max, Math.max(min, n));
  }

  return (
    <div className="stepper">
      <span className="stepper-label">{label}</span>
      <div className="stepper-control">
        <button
          type="button"
          className="stepper-btn"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          −
        </button>
        <span className="stepper-value" aria-live="polite">{value}</span>
        <button
          type="button"
          className="stepper-btn"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
