import Reveal from '@/components/ui/Reveal';
import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { services } from '@/lib/content';

const variantClass = {
  navy: 'sv-navy',
  white: 'sv-white',
  lav: 'sv-lav',
} as const;

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="servicesHeading">
      <div className="shell">
        <div className="sv-head">
          <Reveal as="h2" className="sv-title" id="servicesHeading">
            Services built around growth.
          </Reveal>

          <Reveal as="p" className="sv-lede">
            From search visibility to paid acquisition and conversion-focused digital experiences, every
            service is designed to contribute to measurable commercial growth.
          </Reveal>
        </div>

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

              <a
                className="icon-btn sv-arrow"
                href="#contact"
                aria-label={`Enquire about ${service.title}`}
              >
                <ArrowUpRightIcon />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
