import type { Metadata } from 'next';

import { site } from './site';

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
};

/**
 * Builds a page's metadata so every route gets a canonical URL and matching
 * Open Graph / Twitter tags without repeating the same object five times.
 */
export function buildPageMetadata({ title, description, path }: PageSeoInput): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
