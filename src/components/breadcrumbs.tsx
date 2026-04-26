"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const SECTION_LABELS: Record<string, string> = {
  "getting-started": "Getting Started",
  architecture: "Architecture",
  "memory-systems": "Memory Systems",
  retrieval: "Retrieval",
  api: "API",
  deployment: "Deployment",
  operations: "Operations",
  security: "Security",
  "use-cases": "Use Cases",
};

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Docs", href: "/" }];

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return items;

  // First segment is the section
  const sectionSlug = segments[0];
  const sectionLabel = SECTION_LABELS[sectionSlug];
  if (sectionLabel) {
    items.push({ label: sectionLabel, href: `/${sectionSlug}` });
  }

  // If there's a second segment, it's the page
  if (segments.length > 1) {
    const pageSlug = segments[segments.length - 1];
    // Convert slug to title case
    const pageLabel = pageSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    items.push({ label: pageLabel, href: pathname });
  }

  return items;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const items = buildBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm text-warm-gray-light dark:text-warm-gray-muted flex-wrap">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight size={14} className="text-warm-gray-light dark:text-warm-gray-muted shrink-0" />
            )}
            {index === 0 && (
              <Home size={14} className="text-warm-gray-light dark:text-warm-gray-muted shrink-0 mr-0.5" />
            )}
            {index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-charcoal dark:hover:text-parchment transition-colors truncate max-w-[120px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal dark:text-parchment font-medium truncate max-w-[160px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
