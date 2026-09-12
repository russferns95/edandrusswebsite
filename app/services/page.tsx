import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import Services from '@/components/sections/Services';
import { pages } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: pages.services.metaTitle,
  description: pages.services.metaDescription,
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[{ name: 'Services', path: '/services' }]} />
      <PageHero
        kicker={pages.services.kicker}
        title={pages.services.title}
        lede={pages.services.lede}
      />
      <Services />
      <CtaBand
        title="Not sure which service you need?"
        text="Tell us the outcome you are after and we will tell you which channels get you there."
      />
    </>
  );
}
