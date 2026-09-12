import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import PageHero from '@/components/layout/PageHero';
import About from '@/components/sections/About';
import CtaBand from '@/components/sections/CtaBand';
import Story from '@/components/sections/Story';
import { pages } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: pages.about.metaTitle,
  description: pages.about.metaDescription,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[{ name: 'About', path: '/about' }]} />
      <PageHero kicker={pages.about.kicker} title={pages.about.title} lede={pages.about.lede} />
      <About />
      <Story />
      <CtaBand />
    </>
  );
}
