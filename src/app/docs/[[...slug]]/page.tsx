import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MermaidDiagram } from "@/components/mermaid";
import { CodeBlock } from "@/components/code-block";
import { Callout } from "@/components/callout";
import { PageNav } from "@/components/page-nav";
import { getPageBySlug, getPageNav, pageExists } from "@/lib/content";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getPageBySlug(slug);
  if (!page) return { title: "Not Found" };
  return {
    title: page.title,
    description: page.description,
  };
}

export async function generateStaticParams() {
  // Return all known paths for static generation
  const { getAllPaths } = await import("@/lib/content");
  return getAllPaths().map((path) => ({
    slug: path.split("/").filter(Boolean),
  }));
}

const components = {
  MermaidDiagram,
  CodeBlock,
  Callout,
  h2: ({ children, id }: any) => (
    <h2 id={id} className="group">
      {children}
      <a href={`#${id}`} className="heading-anchor">#</a>
    </h2>
  ),
  h3: ({ children, id }: any) => (
    <h3 id={id} className="group">
      {children}
      <a href={`#${id}`} className="heading-anchor">#</a>
    </h3>
  ),
};

export default async function DocsPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const path = slug.join("/");

  if (!pageExists(path)) {
    notFound();
  }

  const page = getPageBySlug(slug);
  if (!page) {
    notFound();
  }

  const { prev, next } = getPageNav(path);

  return (
    <div className="prose dark:prose-invert max-w-none">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">
          {page.section}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {page.title}
        </h1>
        {page.description && (
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {page.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
          <span>{page.readingTime} min read</span>
          {page.lastUpdated && <span>· Updated {page.lastUpdated}</span>}
        </div>
      </div>

      <MDXRemote source={page.content} components={components} />

      <PageNav prev={prev} next={next} />
    </div>
  );
}
