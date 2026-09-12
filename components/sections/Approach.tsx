import Reveal from '@/components/ui/Reveal';
import { CheckCircleIcon } from '@/components/ui/Icons';
import { approach } from '@/lib/content';

/**
 * The four-stage operating model behind every engagement. The page heading and
 * lede come from PageHero above it.
 */
export default function Approach() {
  return (
    <section className="approach" id="approach" aria-labelledby="approachHeading">
      <div className="shell">
        <div className="ap-panel">
          <h2 className="visually-hidden" id="approachHeading">
            Our four-stage approach
          </h2>

          <ol className="ap-steps">
            {approach.steps.map((step) => (
              <Reveal as="li" className="ap-step" key={step.number}>
                <span className="ap-step-badge" aria-hidden="true">
                  {step.number}
                </span>
                <span className="ap-step-phase">{step.phase}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>

          <div className="ap-principles">
            {approach.principles.map((principle) => (
              <div className="ap-principle" key={principle.title}>
                <CheckCircleIcon />
                <div>
                  <h4>{principle.title}</h4>
                  <p>{principle.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
