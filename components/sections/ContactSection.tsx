import ContactForm from './ContactForm';
import Reveal from '@/components/ui/Reveal';
import { MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { site } from '@/lib/site';

export default function ContactSection() {
  return (
    <section className="cta" id="contact" aria-labelledby="ctaHeading">
      <div className="shell">
        <Reveal className="cta-panel">
          <span className="cta-orb cta-orb-1" aria-hidden="true" />
          <span className="cta-orb cta-orb-2" aria-hidden="true" />

          <div className="cta-inner">
            <div>
              <h2 className="cta-title" id="ctaHeading">
                Ready to build a better growth engine?
              </h2>
              <p className="cta-text">
                Tell us where your digital marketing is today and where you want it to go. We will reply with
                a straight answer on whether we can help.
              </p>

              <dl className="cta-details">
                <div className="cta-detail">
                  <span className="cta-detail-icon" aria-hidden="true">
                    <MailIcon />
                  </span>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                    </dd>
                  </div>
                </div>

                <div className="cta-detail">
                  <span className="cta-detail-icon" aria-hidden="true">
                    <PhoneIcon />
                  </span>
                  <div>
                    <dt>Phone</dt>
                    <dd>
                      <a href={site.contact.phoneHref}>{site.contact.phone}</a>
                    </dd>
                  </div>
                </div>

                <div className="cta-detail">
                  <span className="cta-detail-icon" aria-hidden="true">
                    <PinIcon />
                  </span>
                  <div>
                    <dt>Based in</dt>
                    <dd>{site.contact.location}</dd>
                  </div>
                </div>
              </dl>

              <p className="cta-response">{site.contact.responseTime}</p>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
