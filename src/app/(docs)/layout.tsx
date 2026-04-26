import type { Metadata } from "next";
import { DocsLayout } from "@/components/docs-layout";
import { getPageMeta, getCanonicalUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Reconstruct slug path from segments (e.g., ['getting-started', 'quick-start'])
  const slugPath = slug && slug.length > 0 ? `/${slug.join("/")}` : null;
  const pageMeta = slugPath ? getPageMeta(slugPath) : null;

  if (pageMeta) {
    return {
      title: pageMeta.title,
      description: pageMeta.description,
      keywords: pageMeta.keywords,
      openGraph: {
        title: pageMeta.title,
        description: pageMeta.description,
        url: getCanonicalUrl(pageMeta.slug),
        type: "article",
        locale: "en_US",
        images: [
          {
            url: "/og-image.svg",
            width: 1200,
            height: 630,
            alt: pageMeta.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
      },
      alternates: {
        canonical: getCanonicalUrl(pageMeta.slug),
      },
    };
  }

  // Fallback for doc pages without specific metadata
  return {
    title: "Documentation",
    description:
      "Comprehensive documentation for Mnemosyne — the native memory system for AI agents with persistent, structured memory.",
    openGraph: {
      title: "Mnemosyne Documentation",
      description:
        "Comprehensive documentation for Mnemosyne — the native memory system for AI agents.",
      url: "https://docs.mnemosyne.site",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: "https://docs.mnemosyne.site",
    },
  };
}

export default async function DocsShellLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const slugPath = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";

  return (
    <>
      <StructuredData slug={slugPath} />
      <DocsLayout>{children}</DocsLayout>
    </>
  );
}
