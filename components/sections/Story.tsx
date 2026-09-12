import Reveal from '@/components/ui/Reveal';
import { storyParagraphs } from '@/lib/content';

export default function Story() {
  const [lead, ...rest] = storyParagraphs;

  return (
    <section className="story" aria-labelledby="storyHeading">
      <span className="st-grid" aria-hidden="true" />
      <span className="st-wash" aria-hidden="true" />

      <div className="shell st-inner">
        <Reveal className="st-left">
          <h2 className="st-title" id="storyHeading">
            Our Story
          </h2>
          <span className="st-rule" aria-hidden="true" />
        </Reveal>

        <Reveal className="st-right">
          <p className="st-lead">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
