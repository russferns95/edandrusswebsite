import Reveal from '@/components/ui/Reveal';
import { aboutParagraphs } from '@/lib/content';

/**
 * Navy "who we are" panel. The page's <h1> lives in PageHero, so the statement
 * here is a distinct line rather than a repeat of the page title.
 */
export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="aboutHeading">
      <span className="ab-glow ab-glow-1" aria-hidden="true" />
      <span className="ab-glow ab-glow-2" aria-hidden="true" />
      <span className="ab-shape" aria-hidden="true" />

      <div className="shell ab-inner">
        <Reveal className="ab-left">
          <p className="ab-label">Founder-led digital marketing</p>
          <h2 className="ab-statement" id="aboutHeading">
            Senior people, start to finish.
          </h2>
        </Reveal>

        <Reveal className="ab-right">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
