import { site } from '@/lib/site';

type Crumb = { name: string; path: string };

/**
 * Breadcrumb JSON-LD for inner pages. The organisation and website nodes are
 * emitted once from the root layout, so this only adds the trail.
 */
export default function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  const trail = [{ name: 'Home', path: '/' }, ...crumbs];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: `${site.url}${entry.path === '/' ? '' : entry.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
