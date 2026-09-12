import { site } from '@/lib/site';

type BrandProps = {
  /** Light variant is used on the dark footer. */
  light?: boolean;
  href?: string;
};

/**
 * Wordmark plus the three-bar logo glyph. Anchors are plain <a> elements
 * because every destination is a section on this page.
 */
export default function BrandMark({ light = false, href = '#top' }: BrandProps) {
  return (
    <a className={light ? 'brand brand-light' : 'brand'} href={href} aria-label={`${site.name} — home`}>
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-word">{site.name}</span>
    </a>
  );
}
