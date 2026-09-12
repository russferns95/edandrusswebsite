import type { Metadata } from 'next';

import PageHero from '@/components/layout/PageHero';
import ContactSection from '@/components/sections/ContactSection';
import { pages } from '@/lib/content';

export const metadata: Metadata = {
  title: pages.contact.metaTitle,
  description: pages.contact.metaDescription,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker={pages.contact.kicker}
        title={pages.contact.title}
        lede={pages.contact.lede}
      />
      <ContactSection />
    </>
  );
}
