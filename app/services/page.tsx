import type { Metadata } from 'next';

import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import Services from '@/components/sections/Services';
import { pages } from '@/lib/content';

export const metadata: Metadata = {
  title: pages.services.metaTitle,
  description: pages.services.metaDescription,
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
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
