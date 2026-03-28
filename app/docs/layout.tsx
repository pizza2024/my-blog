import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { docs } from 'fumadocs-mdx:collections/server';
import type { Item, Folder, Node } from 'fumadocs-core/page-tree';

function buildCategoryTree() {
  // docs 是 DocsCollectionEntry，docs.docs 是所有页面的数组
  const pages = docs.docs as Array<{
    url?: string;
    title?: string;
    description?: string;
    category?: string;
  }>;

  const grouped = new Map<string, Item[]>();
  const uncategorized: Item[] = [];

  for (const page of pages) {
    const url = page.url;
    // 跳过 index 页面
    if (!url || url === '/docs' || url.endsWith('/index')) continue;

    const category = page.category;
    const item: Item = {
      type: 'page',
      name: page.title ?? 'Untitled',
      url,
      description: page.description,
    };

    if (category) {
      if (!grouped.has(category)) grouped.set(category, []);
      grouped.get(category)!.push(item);
    } else {
      uncategorized.push(item);
    }
  }

  const CATEGORY_ORDER = ['AI框架', '组件', '工具', '日记'];
  const sortedCategories = [...grouped.keys()].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  const nodes: Node[] = [];

  for (const cat of sortedCategories) {
    const items = grouped.get(cat)!;
    const folder: Folder = {
      type: 'folder',
      name: cat,
      defaultOpen: true,
      children: items.sort((a, b) => String(a.name).localeCompare(String(b.name))),
    };
    nodes.push(folder);
  }

  if (uncategorized.length > 0) {
    nodes.push({
      type: 'folder',
      name: '其他',
      defaultOpen: false,
      children: uncategorized.sort((a, b) => String(a.name).localeCompare(String(b.name))),
    });
  }

  return { name: 'root', children: nodes };
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const tree = buildCategoryTree();

  return (
    <DocsLayout tree={tree as unknown as Parameters<typeof DocsLayout>[0]['tree']} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
