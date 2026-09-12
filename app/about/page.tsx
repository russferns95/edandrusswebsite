import type { Metadata } from 'next';

import PageHero from '@/components/layout/PageHero';
import About from '@/components/sections/About';
import CtaBand from '@/components/sections/CtaBand';
import Story from '@/components/sections/Story';
import { pages } from '@/lib/content';

export const metadata: Metadata = {
  title: pages.about.metaTitle,
  description: pages.about.metaDescription,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero kicker={pages.about.kicker} title={pages.about.title} lede={pages.about.lede} />
      <About />
      <Story />
      <CtaBand />
    </>
  );
}
