import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { docs } from 'fumadocs-mdx:collections/server';
import CategorySidebar from '@/components/CategorySidebar';

interface PageItem {
  url: string;
  title: string;
  description?: string;
  category: string;
}

function getAllPages(): PageItem[] {
  const pages = docs.docs as Array<{
    url?: string;
    title?: string;
    description?: string;
    category?: string;
  }>;

  return pages
    .filter((p) => p.url && p.url !== '/docs' && !p.url.endsWith('/index'))
    .map((p) => ({
      url: p.url!,
      title: p.title ?? 'Untitled',
      description: p.description,
      category: p.category ?? '其他',
    }));
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const allPages = getAllPages();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 2,
        component: <CategorySidebar items={allPages} />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
