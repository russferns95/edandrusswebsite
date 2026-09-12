import Reveal from '@/components/ui/Reveal';

/**
 * The mosaic of cards directly beneath the hero. Each card is bespoke, so the
 * markup stays explicit rather than being driven from a data array.
 */
export default function FeatureCards() {
  return (
    <section className="features" aria-labelledby="featuresHeading">
      <div className="shell">
        <h2 className="visually-hidden" id="featuresHeading">
          What working with Sio, Ed &amp; Russ looks like
        </h2>

        <div className="feature-grid">
          <Reveal as="article" className="fcard fcard-lead">
            <div className="fcard-body">
              <h3>Growth without the guesswork.</h3>
              <p>
                Connected SEO, PPC and conversion systems designed around commercial outcomes—not vanity
                metrics.
              </p>
              <a className="btn btn-light btn-sm" href="#approach">
                Explore our approach
              </a>
            </div>
            <span className="fcard-orb" aria-hidden="true" />
            <span className="fcard-orb-sm" aria-hidden="true" />
          </Reveal>

          <Reveal as="article" className="fcard fcard-stat-light">
            <span className="fstat-visual" aria-hidden="true">
              <i className="fs-shape fs-shape-1" />
              <i className="fs-shape fs-shape-2" />
              <i className="fs-shape fs-shape-3" />
            </span>
            <div>
              <h3 className="fstat-figure fstat-figure-sm">SEO + PPC + CRO</h3>
              <p className="fstat-label">One connected growth engine</p>
            </div>
          </Reveal>

          <Reveal as="article" className="fcard fcard-stat-navy">
            <span className="fstat-orbit" aria-hidden="true">
              <i />
              <i />
            </span>
            <div>
              <h3 className="fstat-figure">100%</h3>
              <p className="fstat-label">Founder-led execution</p>
            </div>
          </Reveal>

          <Reveal as="article" className="fcard fcard-tall">
            <div className="fcard-body">
              <h3>
                Digital marketing.
                <br />
                Built for growth.
              </h3>
              <p>
                Technical precision, performance marketing and conversion-focused design working together.
              </p>
              <a className="btn btn-primary btn-sm" href="#services">
                Discover more
              </a>
            </div>
            <span className="fcard-shape" aria-hidden="true" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
