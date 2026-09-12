import { services } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * Schema.org JSON-LD. A marketing agency that sells SEO should be marked up
 * properly itself — this describes the business and what it offers.
 */
export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organisation`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: ['London', 'United Kingdom', 'Worldwide'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    knowsAbout: [
      'Search Engine Optimisation',
      'Pay-Per-Click Advertising',
      'Conversion Rate Optimisation',
      'Web Design and Development',
      'Content Strategy and Digital PR',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital marketing services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.impact },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Content is generated from our own config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
