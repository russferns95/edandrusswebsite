import { ImageResponse } from 'next/og';

import { site } from '@/lib/site';

/**
 * Social share card, generated at build time. Used by Open Graph and Twitter
 * whenever the site is linked from Slack, WhatsApp, LinkedIn and the rest.
 */
export const alt = `${site.name} — Digital Marketing Agency London`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(150deg, #10185F 0%, #0B1458 50%, #080F42 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ width: 14, height: 26, borderRadius: 7, background: '#B48CFF' }} />
            <div style={{ width: 14, height: 50, borderRadius: 7, background: '#FFFFFF' }} />
            <div style={{ width: 14, height: 38, borderRadius: 7, background: '#145DFF' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: '#FFFFFF', letterSpacing: -1.5 }}>
            {site.name}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: -3,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Full-Service Digital Marketing Agency in London
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: 'rgba(255,255,255,0.72)', maxWidth: 820 }}>
            Technical SEO, performance-led PPC and conversion-focused web design.
          </div>
        </div>

        {/* Footer strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              display: 'flex',
              padding: '14px 30px',
              borderRadius: 999,
              background: '#FFFFFF',
              color: '#10185F',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {site.contact.email}
          </div>
          <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>Founder-led · London</div>
        </div>
      </div>
    ),
    size,
  );
}
