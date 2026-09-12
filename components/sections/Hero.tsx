import Link from 'next/link';

import HeroVisual from './HeroVisual';
import Reveal from '@/components/ui/Reveal';
import { hero } from '@/lib/content';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-grid" />
        <span className="hero-wash" />
      </div>

      <div className="shell hero-inner">
        <Reveal className="hero-copy">
          <p className="hero-kicker">{hero.kicker}</p>
          <h1 className="hero-title">{hero.title}</h1>
          <p className="hero-lede">{hero.lede}</p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">
              Get in touch
            </Link>
            <Link className="btn btn-ghost" href="/services">
              Explore services
            </Link>
          </div>

          <ul className="hero-trust">
            {hero.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="hero-visual" aria-hidden="true">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
