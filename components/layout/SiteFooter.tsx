import BrandMark from './BrandMark';
import { footerLinks, site } from '@/lib/site';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell ft-inner">
        <div className="ft-brand">
          <BrandMark light />
          <p>{site.tagline}</p>
        </div>

        <div className="ft-col">
          <h3>Quick links</h3>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
            <li>
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
            </li>
            <li className="ft-place">{site.contact.location}</li>
          </ul>
        </div>
      </div>

      <div className="shell ft-bottom">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>{site.contact.location}</p>
      </div>
    </footer>
  );
}
