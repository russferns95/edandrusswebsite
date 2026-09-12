'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal built on a single shared IntersectionObserver.
 *
 * One observer serves every revealed element on the page rather than each
 * component creating its own, and elements are unobserved once shown.
 */

type RevealCallback = () => void;

const callbacks = new WeakMap<Element, RevealCallback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          observer?.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
  }

  return observer;
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const show = () => element.classList.add('is-visible');

    // No observer support, or motion is unwelcome: show it straight away.
    const io = getObserver();
    if (!io || prefersReducedMotion()) {
      show();
      return;
    }

    // Anything already on screen at mount is shown on the next frame, so the
    // first paint still animates in rather than popping into place.
    const frame = window.requestAnimationFrame(() => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        show();
        io.unobserve(element);
        callbacks.delete(element);
      }
    });

    callbacks.set(element, show);
    io.observe(element);

    return () => {
      window.cancelAnimationFrame(frame);
      io.unobserve(element);
      callbacks.delete(element);
    };
  }, []);

  return ref;
}
