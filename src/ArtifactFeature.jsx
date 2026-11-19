import { useEffect, useRef } from 'react';
import engraving from './assets/engraved-question.svg';
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
      <div className="artifact-stage" role="img" aria-label="A floating gunmetal cube with a recessed question mark on each side. A golden spotlight casts its shadow onto the floor.">
        <div className="artifact-air" />
        <div className="artifact-floor" />
        <div className="artifact-shadow" />
        <div className="artifact-float">
          <div className="artifact-cube">
            <div className="artifact-turn">
              {['front', 'side', 'back', 'left', 'lid', 'base'].map(face => (
                <div key={face} className={`artifact-panel artifact-panel--${face}`}>
                  {face !== 'lid' && face !== 'base' && (
                    <>
                      <img className="artifact-mark" src={engraving} alt="" draggable="false" />
                      <i className="artifact-seam" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="artifact-caption">
        <h1 id="artifact-title">Something big is coming soon…</h1>
      </div>
    </section>
  );
}
