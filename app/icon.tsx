import { ImageResponse } from 'next/og';

/** Favicon: the three-bar logo glyph, generated at build time. */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 3,
          background: '#10185F',
          paddingBottom: 8,
        }}
      >
        <div style={{ width: 5, height: 10, borderRadius: 3, background: '#B48CFF' }} />
        <div style={{ width: 5, height: 18, borderRadius: 3, background: '#FFFFFF' }} />
        <div style={{ width: 5, height: 14, borderRadius: 3, background: '#145DFF' }} />
      </div>
    ),
    size,
  );
}
