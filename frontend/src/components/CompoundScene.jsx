import { useEffect, useRef } from 'react';

// A 2.5D layered scene built from SVG, rather than a full WebGL/Three.js
// environment. This keeps the visual depth the brief asks for while staying
// lightweight and reliable to run in any browser, with no 3D assets to load
// or break.
export default function CompoundScene({ reducedMotion }) {
  const sceneRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reducedMotion || isCoarsePointer) return undefined;

    function handleMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x, y };
    }

    function animate() {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      cur.x += (tgt.x - cur.x) * 0.06;
      cur.y += (tgt.y - cur.y) * 0.06;

      const el = sceneRef.current;
      if (el) {
        el.style.setProperty('--px', cur.x.toFixed(4));
        el.style.setProperty('--py', cur.y.toFixed(4));
      }
      frameRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMove);
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  return (
    <div className={`compound-scene${reducedMotion ? ' is-static' : ''}`} ref={sceneRef} aria-hidden="true">
      <div className="compound-layer compound-sky" style={{ '--depth': 0.3 }}>
        <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16223a" />
              <stop offset="55%" stopColor="#243458" />
              <stop offset="100%" stopColor="#4a4a78" />
            </linearGradient>
          </defs>
          <rect width="1200" height="500" fill="url(#sky)" />
          <circle cx="980" cy="110" r="70" fill="#f4e7c9" opacity="0.18" />
          <circle cx="980" cy="110" r="40" fill="#f4e7c9" opacity="0.35" />
        </svg>
      </div>

      <div className="compound-layer compound-far" style={{ '--depth': 0.6 }}>
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice">
          <g fill="#2c3a5e" opacity="0.75">
            <rect x="40" y="120" width="90" height="180" />
            <rect x="150" y="80" width="70" height="220" />
            <rect x="240" y="150" width="110" height="150" />
            <rect x="470" y="100" width="80" height="200" />
            <rect x="580" y="140" width="100" height="160" />
            <rect x="820" y="90" width="75" height="210" />
            <rect x="920" y="130" width="95" height="170" />
            <rect x="1040" y="110" width="80" height="190" />
          </g>
        </svg>
      </div>

      <div className="compound-layer compound-mid" style={{ '--depth': 1 }}>
        <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMax slice">
          <g>
            {/* apartment blocks */}
            <rect x="60" y="110" width="150" height="210" fill="#39496f" />
            <rect x="230" y="150" width="120" height="170" fill="#2f3d60" />
            {/* villa cluster */}
            <polygon points="430,190 490,140 550,190 550,320 430,320" fill="#3a4a71" />
            <rect x="600" y="180" width="130" height="140" fill="#33436a" />
            <polygon points="760,200 815,155 870,200 870,320 760,320" fill="#3a4a71" />
            <rect x="920" y="130" width="110" height="190" fill="#2f3d60" />
            <rect x="1060" y="160" width="100" height="160" fill="#39496f" />

            {/* windows */}
            <g fill="#f4c968" opacity="0.55">
              <rect x="80" y="140" width="14" height="18" />
              <rect x="110" y="140" width="14" height="18" />
              <rect x="80" y="180" width="14" height="18" />
              <rect x="110" y="180" width="14" height="18" />
              <rect x="250" y="180" width="14" height="18" />
              <rect x="280" y="180" width="14" height="18" />
              <rect x="940" y="160" width="14" height="18" />
              <rect x="970" y="160" width="14" height="18" />
              <rect x="1080" y="190" width="14" height="18" />
            </g>
          </g>
        </svg>
      </div>

      <div className="compound-layer compound-near" style={{ '--depth': 1.5 }}>
        <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice">
          <rect x="0" y="150" width="1200" height="50" fill="#1b2438" />
          <rect x="0" y="150" width="1200" height="6" fill="#525d78" opacity="0.5" />
          {/* street lights */}
          <g fill="#0f1626">
            <rect x="140" y="90" width="4" height="60" />
            <circle cx="142" cy="86" r="6" fill="#f4c968" opacity="0.9" />
            <rect x="620" y="90" width="4" height="60" />
            <circle cx="622" cy="86" r="6" fill="#f4c968" opacity="0.9" />
            <rect x="1020" y="90" width="4" height="60" />
            <circle cx="1022" cy="86" r="6" fill="#f4c968" opacity="0.9" />
          </g>
          {/* trees */}
          <g fill="#28422f">
            <circle cx="260" cy="130" r="18" />
            <rect x="257" y="140" width="6" height="16" fill="#4a3626" />
            <circle cx="760" cy="128" r="20" />
            <rect x="757" y="140" width="6" height="18" fill="#4a3626" />
            <circle cx="900" cy="132" r="16" />
            <rect x="897" y="142" width="6" height="14" fill="#4a3626" />
          </g>
        </svg>
      </div>
    </div>
  );
}
