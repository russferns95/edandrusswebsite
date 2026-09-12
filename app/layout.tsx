import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';

import './globals.css';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import SkipLink from '@/components/layout/SkipLink';
import StructuredData from '@/components/layout/StructuredData';
import { brandAliases, site, verification } from '@/lib/site';

/* Previews must not be indexed, or they compete with the live site. */
const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';

/* Self-hosted at build time: no render-blocking request to Google. */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const defaultTitle = `${site.name} | Digital Marketing Agency London`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Marketing',

  /* Brand spellings first: these are the terms people search by name. */
  keywords: [
    ...brandAliases,
    'digital marketing agency London',
    'SEO agency London',
    'PPC agency London',
    'conversion rate optimisation',
    'web design London',
    'founder-led marketing agency',
  ],

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: defaultTitle,
    description: site.description,
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
  },

  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
  },

  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  /* Populated once the domain is claimed in Search Console / Bing. */
  verification: {
    ...(verification.google ? { google: verification.google } : {}),
    ...(verification.bing ? { other: { 'msvalidate.01': verification.bing } } : {}),
  },

  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#10185F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StructuredData />
      </body>
    </html>
  );
}
