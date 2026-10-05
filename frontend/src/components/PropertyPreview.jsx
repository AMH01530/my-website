import { useCountUp } from '../hooks/useCountUp.js';

// Stylized geometric illustrations per property type, built from SVG/CSS
// rather than external 3D assets that could fail to load. A subtle
// floating/rotation animation gives it depth without heavy rendering.
function PropertyGlyph({ type }) {
  const shapes = {
    Apartment: (
      <>
        <rect x="55" y="30" width="90" height="130" rx="4" fill="var(--preview-body)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={68 + (i % 3) * 24} y={44 + Math.floor(i / 3) * 26} width="14" height="16" fill="var(--preview-window)" />
        ))}
      </>
    ),
    Villa: (
      <>
        <polygon points="30,90 100,45 170,90 170,160 30,160" fill="var(--preview-body)" />
        <polygon points="30,90 100,45 170,90 155,90 100,58 45,90" fill="var(--preview-roof)" />
        <rect x="70" y="120" width="26" height="40" fill="var(--preview-window)" />
        <rect x="115" y="105" width="18" height="18" fill="var(--preview-window)" />
      </>
    ),
    Townhouse: (
      <>
        <rect x="35" y="60" width="50" height="100" fill="var(--preview-body)" />
        <rect x="90" y="45" width="50" height="115" fill="var(--preview-roof)" />
        <rect x="145" y="60" width="50" height="100" fill="var(--preview-body)" />
        <rect x="45" y="80" width="14" height="16" fill="var(--preview-window)" />
        <rect x="105" y="65" width="14" height="16" fill="var(--preview-window)" />
        <rect x="155" y="80" width="14" height="16" fill="var(--preview-window)" />
      </>
    ),
    Duplex: (
      <>
        <rect x="50" y="40" width="100" height="120" fill="var(--preview-body)" />
        <rect x="50" y="98" width="100" height="4" fill="var(--preview-roof)" />
        <rect x="65" y="55" width="18" height="18" fill="var(--preview-window)" />
        <rect x="117" y="55" width="18" height="18" fill="var(--preview-window)" />
        <rect x="65" y="112" width="18" height="18" fill="var(--preview-window)" />
        <rect x="117" y="112" width="18" height="18" fill="var(--preview-window)" />
      </>
    ),
    Chalet: (
      <>
        <polygon points="40,95 100,55 160,95 160,160 40,160" fill="var(--preview-body)" />
        <polygon points="30,100 100,50 170,100 155,100 100,64 45,100" fill="var(--preview-roof)" />
        <rect x="85" y="120" width="30" height="40" fill="var(--preview-window)" />
      </>
    ),
    Penthouse: (
      <>
        <rect x="55" y="70" width="90" height="90" fill="var(--preview-body)" />
        <rect x="70" y="40" width="60" height="35" fill="var(--preview-roof)" />
        <rect x="65" y="85" width="14" height="16" fill="var(--preview-window)" />
        <rect x="90" y="85" width="14" height="16" fill="var(--preview-window)" />
        <rect x="115" y="85" width="14" height="16" fill="var(--preview-window)" />
      </>
    ),
    'Twin House': (
      <>
        <polygon points="30,95 75,55 120,95 120,160 30,160" fill="var(--preview-body)" />
        <polygon points="80,95 125,55 170,95 170,160 80,160" fill="var(--preview-roof)" />
        <rect x="48" y="120" width="18" height="18" fill="var(--preview-window)" />
        <rect x="128" y="120" width="18" height="18" fill="var(--preview-window)" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 200 175" className="preview-glyph">
      <ellipse cx="100" cy="166" rx="80" ry="8" fill="var(--preview-shadow)" />
      {shapes[type] ?? shapes.Apartment}
    </svg>
  );
}

export default function PropertyPreview({ form, reducedMotion }) {
  const area = useCountUp(Number(form.area) || 0, 500, reducedMotion);
  const bedrooms = useCountUp(Number(form.bedrooms) || 0, 400, reducedMotion);
  const bathrooms = useCountUp(Number(form.bathrooms) || 0, 400, reducedMotion);

  return (
    <div className="preview-card">
      <p className="preview-kicker">Property preview</p>
      <div className={`preview-stage${reducedMotion ? '' : ' is-floating'}`}>
        <PropertyGlyph type={form.property_type} />
      </div>
      <dl className="preview-stats">
        <div>
          <dt>📐 Area</dt>
          <dd>{Math.round(area)} m²</dd>
        </div>
        <div>
          <dt>🛏 Bedrooms</dt>
          <dd>{Math.round(bedrooms)}</dd>
        </div>
        <div>
          <dt>🚿 Bathrooms</dt>
          <dd>{Math.round(bathrooms)}</dd>
        </div>
      </dl>
      <p className="preview-note">Illustrative preview — not an architectural rendering.</p>
    </div>
  );
}
