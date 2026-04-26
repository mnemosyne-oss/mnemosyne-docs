import type { MetadataRoute } from "next";
import { getAllPages, SITE_CONFIG } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getAllPages();

  return pages.map((page) => ({
    url: `${SITE_CONFIG.siteUrl}${page.slug}`,
    lastModified: new Date("2026-04-26"),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));
}
