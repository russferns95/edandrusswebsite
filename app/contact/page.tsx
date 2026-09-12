import BreadcrumbSchema from '@/components/layout/BreadcrumbSchema';
import PageHero from '@/components/layout/PageHero';
import ContactSection from '@/components/sections/ContactSection';
import { pages } from '@/lib/content';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: pages.contact.metaTitle,
  description: pages.contact.metaDescription,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[{ name: 'Contact', path: '/contact' }]} />
      <PageHero
        kicker={pages.contact.kicker}
        title={pages.contact.title}
        lede={pages.contact.lede}
      />
      <ContactSection />
    </>
  );
}
