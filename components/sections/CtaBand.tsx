import Link from 'next/link';

import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

type CtaBandProps = {
  title?: string;
  text?: string;
};

/**
 * Closing call to action for every page except Contact itself, which already
 * ends in the enquiry form.
 */
export default function CtaBand({
  title = 'Ready to build a better growth engine?',
  text = 'Tell us where your digital marketing is today and where you want it to go.',
}: CtaBandProps) {
  return (
    <section className="cta-band-section" aria-labelledby="ctaBandHeading">
      <div className="shell">
        <Reveal className="cta-band">
          <span className="cta-orb cta-orb-1" aria-hidden="true" />
          <span className="cta-orb cta-orb-2" aria-hidden="true" />

          <div className="cta-band-inner">
            <div className="cta-band-copy">
              <h2 className="cta-band-title" id="ctaBandHeading">
                {title}
              </h2>
              <p className="cta-band-text">{text}</p>
            </div>

            <div className="cta-band-actions">
              <Link className="btn btn-light" href="/contact">
                Get in touch
              </Link>
              <a className="cta-band-mail" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
