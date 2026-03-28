'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CATEGORY_ORDER = ['AI框架', '组件', '工具', '日记'];

interface PageItem {
  url: string;
  title: string;
  description?: string;
  category: string;
}

interface Props {
  items: PageItem[];
}

function getCategory(page: { category?: string }): string {
  return page.category ?? '其他';
}

export default function CategorySidebar({ items }: Props) {
  const pathname = usePathname();

  // 按 category 分组
  const grouped = new Map<string, PageItem[]>();
  for (const page of items) {
    if (!page.url || page.url === '/docs' || page.url.endsWith('/index')) continue;
    const cat = getCategory(page);
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(page);
  }

  // 按固定顺序排序分类
  const sortedCategories = [...grouped.keys()].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  return (
    <div className="flex flex-col gap-4 px-3 py-4 overflow-y-auto">
      {sortedCategories.map((cat) => (
        <div key={cat}>
          {/* 分类标题 */}
          <div className="text-xs font-semibold text-fd-muted-foreground uppercase tracking-wider mb-1.5 pl-2">
            {cat}
          </div>
          {/* 该分类下的文章列表 */}
          <div className="flex flex-col">
            {grouped
              .get(cat)!
              .sort((a, b) => String(a.title ?? '').localeCompare(String(b.title ?? '')))
              .map((page) => {
                const isActive = pathname === page.url;
                return (
                  <Link
                    key={page.url}
                    href={page.url}
                    className={`
                      flex flex-col gap-0.5 rounded-md px-2 py-1.5 text-sm transition-colors
                      ${isActive
                        ? 'bg-fd-accent text-fd-foreground font-medium'
                        : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent'
                      }
                    `}
                  >
                    <span className="font-medium leading-snug">{page.title}</span>
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
