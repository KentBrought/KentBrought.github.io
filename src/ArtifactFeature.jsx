import { useEffect, useRef } from 'react';
import './artifact.css';

export default function ArtifactFeature() {
  const feature = useRef(null);

  useEffect(() => {
    const element = feature.current;
    const motion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    function reset() {
      element.style.removeProperty('--pitch');
      element.style.removeProperty('--yaw');
    }
    function tilt(event) {
      if (!motion.matches || event.pointerType === 'touch') return;
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--yaw', `${((event.clientX - rect.left) / rect.width - 0.5) * 16}deg`);
      element.style.setProperty('--pitch', `${(0.5 - (event.clientY - rect.top) / rect.height) * 8}deg`);
    }
    const observer = 'IntersectionObserver' in window && new IntersectionObserver(([entry]) => {
      element.classList.toggle('is-offscreen', !entry.isIntersecting);
    });
    if (observer) observer.observe(element);
    element.addEventListener('pointermove', tilt);
    element.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    return () => {
      if (observer) observer.disconnect();
      element.removeEventListener('pointermove', tilt);
      element.removeEventListener('pointerleave', reset);
      motion.removeEventListener('change', reset);
    };
  }, []);

  return (
    <section className="artifact-feature" ref={feature} aria-labelledby="artifact-title">
      <div className="artifact-register">NOW / 2026—</div>
      <div className="artifact-stage" role="img" aria-label="A floating gunmetal cube with a question mark engraved on its face. A golden spotlight casts its shadow onto the floor.">
        <div className="artifact-air" />
        <div className="artifact-floor" />
        <div className="artifact-shadow" />
        <div className="artifact-float">
          <div className="artifact-cube">
            <div className="artifact-turn">
              {['front', 'side', 'back', 'left', 'lid', 'base'].map(face => (
                <div key={face} className={`artifact-panel artifact-panel--${face}`}>
                  {face === 'front' && <span aria-hidden="true" className="artifact-mark">?</span>}
                  {face !== 'lid' && face !== 'base' && <i className="artifact-seam" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="artifact-caption">
        <p className="artifact-status">CURRENTLY IN DEVELOPMENT</p>
        <h1 id="artifact-title">Something’s taking shape.</h1>
      </div>
    </section>
  );
}
