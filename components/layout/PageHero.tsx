import Reveal from '@/components/ui/Reveal';

type PageHeroProps = {
  kicker: string;
  title: string;
  lede: string;
};

/**
 * Heading block shared by every inner page. Carries the page's single <h1>,
 * so sections rendered below it start at <h2>.
 */
export default function PageHero({ kicker, title, lede }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg" aria-hidden="true">
        <span className="hero-grid" />
        <span className="hero-wash" />
      </div>

      <div className="shell">
        <Reveal className="page-hero-copy">
          <p className="section-kicker">{kicker}</p>
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-lede">{lede}</p>
        </Reveal>
      </div>
    </section>
  );
}
