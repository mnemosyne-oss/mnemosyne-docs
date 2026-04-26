import { getPageMeta } from "@/lib/seo";
import {
  generateBreadcrumbJsonLd,
  generateTechArticleJsonLd,
  generateWebSiteJsonLd,
  generateSoftwareAppJsonLd,
  buildBreadcrumbs,
} from "@/lib/structured-data";

interface StructuredDataProps {
  slug: string;
}

export function StructuredData({ slug }: StructuredDataProps) {
  const jsonLdArray: object[] = [];

  if (slug === "/") {
    // Homepage: WebSite + SoftwareApplication
    jsonLdArray.push(generateWebSiteJsonLd());
    jsonLdArray.push(generateSoftwareAppJsonLd());
  } else {
    // Doc pages: TechArticle + BreadcrumbList
    const pageMeta = getPageMeta(slug);
    if (pageMeta) {
      jsonLdArray.push(generateTechArticleJsonLd(pageMeta));
      jsonLdArray.push(
        generateBreadcrumbJsonLd(buildBreadcrumbs(pageMeta))
      );
    }
  }

  if (jsonLdArray.length === 0) return null;

  return (
    <>
      {jsonLdArray.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
    </>
  );
}
