import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

/**
 * Preview and development deployments are kept out of the index so they never
 * compete with the live site for the brand name.
 */
const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
