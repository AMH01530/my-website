import { useEffect, useRef, useState } from 'react';

// Animates a number from its previous value to `target` over `duration` ms.
// Skips the animation entirely when reduced motion is preferred.
export function useCountUp(target, duration = 700, reducedMotion = false) {
  const [value, setValue] = useState(target);
  const frame = useRef(null);
  const fromRef = useRef(target);

  useEffect(() => {
    if (reducedMotion || target == null) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current ?? 0;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(from + (target - from) * eased);
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, reducedMotion]);

  return value;
}
