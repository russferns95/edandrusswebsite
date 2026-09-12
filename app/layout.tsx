import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';

import './globals.css';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import SkipLink from '@/components/layout/SkipLink';
import StructuredData from '@/components/layout/StructuredData';
import { site } from '@/lib/site';

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Digital Marketing Agency London | Full-Service Marketing | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'digital marketing agency London',
    'SEO agency London',
    'PPC agency London',
    'conversion rate optimisation',
    'web design London',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `Digital Marketing Agency London | Full-Service Marketing | ${site.name}`,
    description: site.description,
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Digital Marketing Agency London | ${site.name}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
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
