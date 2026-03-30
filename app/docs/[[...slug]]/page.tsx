import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { docs } from 'fumadocs-mdx:collections/server';
import Link from 'next/link';

interface DocEntry {
  title?: string;
  description?: string;
  info?: {
    path?: string;
  };
  _exports?: {
    frontmatter?: Record<string, string>;
  };
}

function docUrl(doc: DocEntry): string {
  const path = doc.info?.path;
  if (!path) return '';
  // path like "openclaw-tech-blog.mdx" → "/docs/openclaw-tech-blog"
  const name = path.replace(/\.mdx?$/, '');
  return `/docs/${name}`;
}

function getCategoryByUrl(url: string): string | undefined {
  const allDocs = docs.docs as DocEntry[];
  const doc = allDocs.find((d) => docUrl(d) === url);
  return doc?._exports?.frontmatter?.category;
}

function getRelatedDocs(currentUrl: string, category: string): DocEntry[] {
  const allDocs = docs.docs as DocEntry[];
  return allDocs
    .filter((d) => {
      const u = docUrl(d);
      if (!u || u === currentUrl || u === '/docs' || u.endsWith('/index')) return false;
      return d._exports?.frontmatter?.category === category;
    })
    .slice(0, 5);
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const gitConfig = {
    user: 'pizza2024',
    repo: 'my-blog',
    branch: 'main',
  };

  const category = getCategoryByUrl(page.url);
  const related = category ? getRelatedDocs(page.url, category) : [];

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/docs/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-semibold text-fd-muted-foreground uppercase tracking-wider mb-4">
            同类文章
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((rel) => (
              <Link
                key={docUrl(rel)}
                href={docUrl(rel) || '#'}
                className="group flex flex-col gap-1 p-4 rounded-lg border hover:border-fd-primary/50 hover:bg-fd-accent/50 transition-colors"
              >
                <span className="text-sm font-medium group-hover:text-fd-primary transition-colors">
                  {rel.title}
                </span>
                {rel.description && (
                  <span className="text-xs text-fd-muted-foreground line-clamp-2">
                    {rel.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
