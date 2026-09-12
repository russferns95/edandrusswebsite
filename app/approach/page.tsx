import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import PageHero from '@/components/layout/PageHero';
import Approach from '@/components/sections/Approach';
import CtaBand from '@/components/sections/CtaBand';
import { pages } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: pages.approach.metaTitle,
  description: pages.approach.metaDescription,
  path: '/approach',
});

export default function ApproachPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[{ name: 'Our approach', path: '/approach' }]} />
      <PageHero
        kicker={pages.approach.kicker}
        title={pages.approach.title}
        lede={pages.approach.lede}
      />
      <Approach />
      <CtaBand
        title="Start with a diagnosis."
        text="Tell us where you are now and we will show you what stage one would uncover."
      />
    </>
  );
}
