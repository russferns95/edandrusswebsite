import Reveal from '@/components/ui/Reveal';
import { CheckCircleIcon } from '@/components/ui/Icons';
import { approach } from '@/lib/content';

/**
 * The four-stage operating model behind every engagement — the destination for
 * the "Explore our approach" call to action in the feature mosaic.
 */
export default function Approach() {
  return (
    <section className="approach" id="approach" aria-labelledby="approachHeading">
      <div className="shell">
        <div className="ap-panel">
          <div className="ap-head">
            <Reveal>
              <p className="section-kicker">{approach.kicker}</p>
              <h2 className="ap-title" id="approachHeading">
                {approach.title}
              </h2>
            </Reveal>

            <Reveal>
              <p className="ap-lede">{approach.lede}</p>
            </Reveal>
          </div>

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

          <div className="ap-cta">
            <a className="btn btn-primary" href="#contact">
              Start with a diagnosis
            </a>
            <p>Tell us where you are now and we will show you what stage one would uncover.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
