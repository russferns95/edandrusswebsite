import Reveal from '@/components/ui/Reveal';
import { CheckCircleIcon } from '@/components/ui/Icons';
import { blackBoxPoints } from '@/lib/content';

export default function BlackBox() {
  return (
    <section className="blackbox" id="blackbox" aria-labelledby="blackboxHeading">
      <div className="shell">
        <div className="bb-head">
          <Reveal as="h2" className="bb-title" id="blackboxHeading">
            Digital marketing
            <br />
            shouldn&apos;t be a
            <br />
            <span className="lav">black box.</span>
          </Reveal>

          <Reveal className="bb-intro">
            <p>
              Most businesses struggle with agencies that report on impressions instead of revenue. At Ed
              &amp; Russ, we build connected digital systems where every channel supports your bottom line.
            </p>
          </Reveal>
        </div>

        <ul className="bb-list">
          {blackBoxPoints.map((point) => (
            <Reveal as="li" className="bb-item" key={point.title}>
              <span className="bb-icon" aria-hidden="true">
                <CheckCircleIcon />
              </span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
