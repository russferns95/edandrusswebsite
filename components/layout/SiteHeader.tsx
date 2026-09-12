'use client';

import { useEffect, useState } from 'react';

import BrandMark from './BrandMark';
import { navLinks } from '@/lib/site';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Sticky header gains a border and shadow once the page moves. */
  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > 8);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes the mobile panel. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  /* Never leave the panel open when the desktop nav returns. */
  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'} id="siteHeader">
      <div className="shell header-inner">
        <BrandMark />

        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="btn btn-primary btn-sm header-cta" href="#contact">
            Get in touch
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div className="mobile-nav" id="mobileNav" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-primary btn-block" href="#contact" onClick={() => setMenuOpen(false)}>
          Get in touch
        </a>
      </div>
    </header>
  );
}
