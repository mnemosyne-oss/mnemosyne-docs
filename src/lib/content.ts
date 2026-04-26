import { readFileSync } from "fs";
import { join } from "path";

export interface DocPage {
  slug: string[];
  title: string;
  description: string;
  section: string;
  content: string;
  readingTime: number;
  lastUpdated?: string;
}

const CONTENT_DIR = join(process.cwd(), "content");

// Full navigation order for prev/next links
export const pageOrder: string[] = [
  "getting-started/quick-start",
  "getting-started/installation",
  "getting-started/configuration",
  "getting-started/first-steps",
  "architecture/beam-overview",
  "architecture/system-design",
  "architecture/data-flow",
  "architecture/sleep-consolidation",
  "architecture/aaak-compression",
  "memory-systems/working",
  "memory-systems/episodic",
  "memory-systems/semantic",
  "memory-systems/scratchpad",
  "memory-systems/temporal-graph",
  "retrieval/hybrid-search",
  "retrieval/vector-search",
  "retrieval/fts5-search",
  "retrieval/ranking",
  "api/overview",
  "api/python-sdk",
  "api/hermes-plugin",
  "api/rest",
  "api/tool-schema",
  "deployment/overview",
  "deployment/fly-io",
  "deployment/docker",
  "deployment/systemd",
  "deployment/cron",
  "operations/monitoring",
  "operations/backups",
  "operations/migration",
  "operations/performance",
  "operations/troubleshooting",
  "security/overview",
  "security/encryption",
  "security/access-control",
  "security/data-privacy",
  "use-cases/overview",
  "use-cases/multi-agent",
  "use-cases/long-running",
  "use-cases/knowledge-base",
];

const sectionMap: Record<string, string> = {
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

export function pageExists(path: string): boolean {
  return pageOrder.includes(path);
}

export function getAllPaths(): string[] {
  return pageOrder;
}

export function getPageBySlug(slug: string[]): DocPage | null {
  const path = slug.join("/");
  if (!pageExists(path)) return null;

  try {
    const filePath = join(CONTENT_DIR, `${path}.mdx`);
    const content = readFileSync(filePath, "utf-8");

    // Extract title from first h1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug[slug.length - 1];

    // Extract description from first paragraph after title
    const descMatch = content.match(/^#\s+.+\n\n(.+)$/m);
    const description = descMatch ? descMatch[1].slice(0, 160) : "";

    const section = sectionMap[slug[0]] || "Documentation";

    // Estimate reading time (200 wpm)
    const words = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return {
      slug,
      title,
      description,
      section,
      content,
      readingTime,
      lastUpdated: "2026-04-25",
    };
  } catch {
    return null;
  }
}

export function getPageNav(
  currentPath: string
): { prev?: { title: string; href: string }; next?: { title: string; href: string } } {
  const idx = pageOrder.indexOf(currentPath);
  if (idx === -1) return {};

  const result: { prev?: { title: string; href: string }; next?: { title: string; href: string } } = {};

  if (idx > 0) {
    const prevPath = pageOrder[idx - 1];
    const prevPage = getPageBySlug(prevPath.split("/"));
    if (prevPage) {
      result.prev = { title: prevPage.title, href: `https://docs.mnemosyne.site/${prevPath}` };
    }
  }

  if (idx < pageOrder.length - 1) {
    const nextPath = pageOrder[idx + 1];
    const nextPage = getPageBySlug(nextPath.split("/"));
    if (nextPage) {
      result.next = { title: nextPage.title, href: `https://docs.mnemosyne.site/${nextPath}` };
    }
  }

  return result;
}
