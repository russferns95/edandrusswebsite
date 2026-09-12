import type { Metadata } from 'next';

import PageHero from '@/components/layout/PageHero';
import Approach from '@/components/sections/Approach';
import CtaBand from '@/components/sections/CtaBand';
import { pages } from '@/lib/content';

export const metadata: Metadata = {
  title: pages.approach.metaTitle,
  description: pages.approach.metaDescription,
  alternates: { canonical: '/approach' },
};

export default function ApproachPage() {
  return (
    <>
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
