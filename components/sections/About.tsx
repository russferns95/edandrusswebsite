import Reveal from '@/components/ui/Reveal';
import { storyParagraphs } from '@/lib/content';

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="aboutHeading">
      <span className="ab-glow ab-glow-1" aria-hidden="true" />
      <span className="ab-glow ab-glow-2" aria-hidden="true" />
      <span className="ab-shape" aria-hidden="true" />

      <div className="shell ab-inner">
        <Reveal className="ab-left">
          <p className="ab-label">Founder-led digital marketing</p>
          <h2 className="ab-eyebrow" id="aboutHeading">
            About us
          </h2>
          <p className="ab-statement">A different kind of agency.</p>
        </Reveal>

        <Reveal className="ab-right">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
