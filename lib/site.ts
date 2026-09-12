/**
 * Single source of truth for site-wide identity, contact points and navigation.
 * Change these values here and every component picks them up.
 */

/**
 * Strips any protocol Vercel may or may not include and returns an https URL
 * with no trailing slash, which is what canonical tags expect.
 */
function normaliseUrl(value: string): string {
  const withoutProtocol = value.replace(/^https?:\/\//, '');
  return `https://${withoutProtocol.replace(/\/+$/, '')}`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return normaliseUrl(explicit);

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return normaliseUrl(vercelProduction);

  const vercelDeployment = process.env.VERCEL_URL?.trim();
  if (vercelDeployment) return normaliseUrl(vercelDeployment);

  return 'https://www.edandruss.com';
}

export const site = {
  name: 'Ed & Russ',
  legalName: 'Ed & Russ',
  tagline: 'Founder-led digital marketing for ambitious brands.',
  description:
    'Ed & Russ is a leading London digital marketing agency. We deliver data-driven SEO, PPC, web design, and content strategy designed to grow your business.',
  locale: 'en-GB',

  /**
   * Public site URL, used for canonical tags, the sitemap and social metadata.
   *
   * Getting this wrong is the fastest way to stay out of search results: if
   * canonicals point at a domain the site is not actually served from, Google
   * indexes that other address instead of this one. Order of preference:
   *
   *   1. NEXT_PUBLIC_SITE_URL      — set this once a custom domain is live
   *   2. VERCEL_PROJECT_PRODUCTION_URL — stable production domain on Vercel
   *   3. VERCEL_URL                — per-deployment URL (previews)
   *   4. the custom domain, for local development
   */
  url: resolveSiteUrl(),

  contact: {
    email: 'info@edandruss.com',
    phone: '+44 7404200646',
    phoneHref: 'tel:+447404200646',
    location: 'London, United Kingdom',
    responseTime: 'We reply to every enquiry within one working day',
  },
} as const;

/** Primary navigation. Each entry is a real route, not an in-page anchor. */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Approach', href: '/approach' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our approach', href: '/approach' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/**
 * Spellings people actually type when looking for the business. These feed
 * schema.org alternateName, which is how a search engine learns that all of
 * these refer to the same entity.
 */
export const brandAliases = [
  'Ed and Russ',
  'Ed & Russ',
  'Ed + Russ',
  'EdandRuss',
  'Ed and Russ London',
  'Ed & Russ Digital Marketing',
  'Ed and Russ Digital Marketing Agency',
  'edandruss',
] as const;

/** Verification tokens, set once the domain is claimed in each console. */
export const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
};
