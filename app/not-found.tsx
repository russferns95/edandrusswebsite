import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="shell" style={{ textAlign: 'center' }}>
        <p className="hero-kicker">404</p>
        <h1 className="hero-title" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
          That page has moved on.
        </h1>
        <p className="hero-lede" style={{ marginInline: 'auto' }}>
          The link you followed does not exist any more. Everything we do lives on the home page.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="btn btn-primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn-ghost" href="/#contact">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
