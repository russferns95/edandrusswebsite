import { services } from '@/lib/content';
import { brandAliases, site } from '@/lib/site';

/**
 * Schema.org JSON-LD.
 *
 * Three linked nodes: the organisation (the entity), the website, and the
 * page being viewed. `alternateName` carries the spellings people actually
 * type, which is what lets a search engine connect "ed and russ" and
 * "ed & russ" to the same business.
 */

type BreadcrumbEntry = { name: string; path: string };

type StructuredDataProps = {
  /** Path of the current page, e.g. "/services". */
  path?: string;
  /** Trail shown in search results. Home is prepended automatically. */
  breadcrumbs?: BreadcrumbEntry[];
};

export default function StructuredData({ path = '/', breadcrumbs = [] }: StructuredDataProps) {
  const organisationId = `${site.url}/#organisation`;
  const websiteId = `${site.url}/#website`;

  const organisation = {
    '@type': 'ProfessionalService',
    '@id': organisationId,
    name: site.name,
    legalName: site.legalName,
    alternateName: [...brandAliases],
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    slogan: site.tagline,
    areaServed: [
      { '@type': 'City', name: 'London' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressRegion: 'Greater London',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: 'GB',
      availableLanguage: ['English'],
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
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.impact,
          provider: { '@id': organisationId },
          areaServed: 'GB',
        },
      })),
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    alternateName: [...brandAliases],
    description: site.description,
    inLanguage: 'en-GB',
    publisher: { '@id': organisationId },
  };

  const trail = [{ name: 'Home', path: '/' }, ...breadcrumbs];

  const breadcrumbList =
    breadcrumbs.length > 0
      ? {
          '@type': 'BreadcrumbList',
          '@id': `${site.url}${path}#breadcrumbs`,
          itemListElement: trail.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.name,
            item: `${site.url}${entry.path === '/' ? '' : entry.path}`,
          })),
        }
      : null;

  const graph = [organisation, website, breadcrumbList].filter(Boolean);

  return (
    <script
      type="application/ld+json"
      // Built entirely from our own config — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
