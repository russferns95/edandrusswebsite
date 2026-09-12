import Link from 'next/link';

import Reveal from '@/components/ui/Reveal';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { services } from '@/lib/content';

const variantClass = {
  navy: 'sv-navy',
  white: 'sv-white',
  lav: 'sv-lav',
} as const;

/** Service cards. The page heading and lede come from PageHero above it. */
export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="servicesHeading">
      <div className="shell">
        <h2 className="visually-hidden" id="servicesHeading">
          What we do
        </h2>

        <div className="sv-grid">
          {services.map((service) => (
            <Reveal as="article" className={`sv-card ${variantClass[service.variant]}`} key={service.number}>
              <span className="sv-num" aria-hidden="true">
                {service.number}
              </span>
              <h3>{service.title}</h3>

              <dl className="sv-meta">
                <dt>Focus area</dt>
                <dd>{service.focus}</dd>
                <dt>Impact</dt>
                <dd>{service.impact}</dd>
              </dl>

              <Link
                className="icon-btn sv-arrow"
                href="/contact"
                aria-label={`Enquire about ${service.title}`}
              >
                <ArrowUpRightIcon />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
