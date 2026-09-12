'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative hero composition. It drifts gently with the pointer on devices
 * that have one, and stays still for anyone who asked for reduced motion.
 */
export default function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = null;
      stage.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x = ((event.clientX - cx) / cx) * 10;
      y = ((event.clientY - cy) / cy) * 10;
      if (frame === null) frame = window.requestAnimationFrame(apply);
    };

    const onBlur = () => {
      x = 0;
      y = 0;
      stage.style.transform = '';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onBlur);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hv-stage" ref={stageRef}>
      <span className="hv-sphere hv-sphere-1" />
      <span className="hv-sphere hv-sphere-2" />
      <span className="hv-ring" />
      <span className="hv-blade" />

      <div className="hv-card hv-card-a">
        <span className="hv-card-dot" />
        <span className="hv-bar hv-bar-1" />
        <span className="hv-bar hv-bar-2" />
        <span className="hv-bar hv-bar-3" />
      </div>

      <div className="hv-card hv-card-b">
        <span className="hv-spark" />
        <span className="hv-bar hv-bar-4" />
        <span className="hv-bar hv-bar-5" />
      </div>

      <span className="hv-pill" />
    </div>
  );
}
