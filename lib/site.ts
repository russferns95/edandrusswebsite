/**
 * Single source of truth for site-wide identity, contact points and navigation.
 * Change these values here and every component picks them up.
 */

export const site = {
  name: 'Sio, Ed & Russ',
  legalName: 'Sio, Ed & Russ',
  tagline: 'Founder-led digital marketing for ambitious brands.',
  description:
    'Sio, Ed & Russ is a leading London digital marketing agency. We deliver data-driven SEO, PPC, web design, and content strategy designed to grow your business.',
  locale: 'en-GB',

  /** Public site URL. Vercel sets VERCEL_URL automatically on preview deploys. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.edandruss.com'),

  contact: {
    email: 'info@edandruss.com',
    phone: '+44 7404200646',
    phoneHref: 'tel:+447404200646',
    location: 'London, United Kingdom',
    responseTime: 'We reply to every enquiry within one working day',
  },
} as const;

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const footerLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;
