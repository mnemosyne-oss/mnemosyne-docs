"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRelatedPages } from "@/lib/related-pages";
import { getPageMeta } from "@/lib/seo";

export function RelatedPages() {
  const pathname = usePathname();
  const relatedSlugs = getRelatedPages(pathname);

  if (relatedSlugs.length === 0) return null;

  const pages = relatedSlugs
    .map((slug) => {
      const meta = getPageMeta(slug);
      if (!meta) return null;
      return {
        title: meta.title.split(" — ")[0].split(" | ")[0],
        description: meta.description.slice(0, 100) + "...",
        href: slug,
      };
    })
    .filter(Boolean) as { title: string; description: string; href: string }[];

  if (pages.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border-warm dark:border-charcoal-light">
      <h3 className="text-sm font-semibold text-warm-gray-muted dark:text-warm-gray uppercase tracking-wider mb-4">
        Related Pages
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group block p-4 rounded-lg border border-border-warm dark:border-charcoal-light hover:border-accent-terracotta/40 dark:hover:border-accent-terracotta-light/40 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50 transition-all"
          >
            <div className="font-medium text-sm text-charcoal dark:text-parchment group-hover:text-accent-terracotta dark:group-hover:text-accent-terracotta-light transition-colors">
              {page.title}
            </div>
            <div className="text-xs text-warm-gray-light dark:text-warm-gray-muted mt-1 line-clamp-2">
              {page.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
