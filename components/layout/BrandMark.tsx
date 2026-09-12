import Link from 'next/link';

import { site } from '@/lib/site';

type BrandProps = {
  /** Light variant is used on the dark footer. */
  light?: boolean;
  href?: string;
};

/** Wordmark plus the three-bar logo glyph. */
export default function BrandMark({ light = false, href = '/' }: BrandProps) {
  return (
    <Link className={light ? 'brand brand-light' : 'brand'} href={href} aria-label={`${site.name} — home`}>
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-word">{site.name}</span>
    </Link>
  );
}
