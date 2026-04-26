// ─────────────────────────────────────────────────────────────
// JSON-LD Structured Data for SEO
// ─────────────────────────────────────────────────────────────

import { SITE_CONFIG, type PageMeta } from "./seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList JSON-LD structured data
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate TechArticle JSON-LD structured data for doc pages
 */
export function generateTechArticleJsonLd(page: PageMeta): object {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
    },
    url: `${SITE_CONFIG.siteUrl}${page.slug}`,
    datePublished: "2026-04-01",
    dateModified: "2026-04-26",
    inLanguage: "en",
    keywords: page.keywords?.join(", "),
  };
}

/**
 * Generate WebSite JSON-LD for homepage
 */
export function generateWebSiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.siteUrl,
    description:
      "Mnemosyne — The native memory system for AI agents. Persistent, structured, and context-aware memory.",
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.siteName,
      url: SITE_CONFIG.siteUrl,
    },
  };
}

/**
 * Generate SoftwareApplication JSON-LD for the product
 */
export function generateSoftwareAppJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mnemosyne",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "Native memory system for AI agents with persistent storage, hybrid search, and BEAM architecture.",
    programmingLanguage: "Python",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.authorUrl,
    },
  };
}

/**
 * Build breadcrumb items from a page's section and slug
 */
export function buildBreadcrumbs(page: PageMeta): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      name: "Docs",
      url: `${SITE_CONFIG.siteUrl}`,
    },
  ];

  if (page.section !== "home") {
    // Capitalize section name for display
    const sectionLabel = page.section
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    items.push({
      name: sectionLabel,
      url: `${SITE_CONFIG.siteUrl}/${page.section}`,
    });

    items.push({
      name: page.title.split(" — ")[0].split(" | ")[0], // Use short title
      url: `${SITE_CONFIG.siteUrl}${page.slug}`,
    });
  }

  return items;
}

/**
 * Section label map for display
 */
export const SECTION_LABELS: Record<string, string> = {
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
