// ─────────────────────────────────────────────────────────────
// Related pages mapping for internal linking
// ─────────────────────────────────────────────────────────────

/**
 * Maps each page slug to an array of related page slugs.
 * Used for "Related Pages" sections and internal cross-linking.
 */
export const RELATED_PAGES: Record<string, string[]> = {
  "/getting-started/quick-start": [
    "/getting-started/installation",
    "/getting-started/configuration",
    "/architecture/beam-overview",
  ],
  "/getting-started/installation": [
    "/getting-started/quick-start",
    "/getting-started/configuration",
    "/deployment/overview",
  ],
  "/getting-started/configuration": [
    "/getting-started/installation",
    "/getting-started/first-steps",
    "/operations/performance",
  ],
  "/getting-started/first-steps": [
    "/getting-started/quick-start",
    "/architecture/beam-overview",
    "/memory-systems/working",
  ],

  // Architecture
  "/architecture/beam-overview": [
    "/architecture/system-design",
    "/memory-systems/working",
    "/memory-systems/episodic",
  ],
  "/architecture/system-design": [
    "/architecture/beam-overview",
    "/architecture/data-flow",
    "/memory-systems/semantic",
  ],
  "/architecture/data-flow": [
    "/architecture/system-design",
    "/retrieval/hybrid-search",
    "/memory-systems/working",
  ],
  "/architecture/sleep-consolidation": [
    "/architecture/beam-overview",
    "/memory-systems/episodic",
    "/deployment/cron",
  ],
  "/architecture/aaak-compression": [
    "/architecture/beam-overview",
    "/memory-systems/semantic",
    "/operations/performance",
  ],

  // Memory Systems
  "/memory-systems/working": [
    "/architecture/beam-overview",
    "/memory-systems/episodic",
    "/retrieval/hybrid-search",
  ],
  "/memory-systems/episodic": [
    "/memory-systems/working",
    "/architecture/sleep-consolidation",
    "/memory-systems/temporal-graph",
  ],
  "/memory-systems/semantic": [
    "/memory-systems/working",
    "/architecture/aaak-compression",
    "/retrieval/vector-search",
  ],
  "/memory-systems/scratchpad": [
    "/memory-systems/working",
    "/architecture/beam-overview",
    "/getting-started/first-steps",
  ],
  "/memory-systems/temporal-graph": [
    "/memory-systems/episodic",
    "/memory-systems/semantic",
    "/use-cases/knowledge-base",
  ],

  // Retrieval
  "/retrieval/hybrid-search": [
    "/retrieval/vector-search",
    "/retrieval/fts5-search",
    "/retrieval/ranking",
  ],
  "/retrieval/vector-search": [
    "/retrieval/hybrid-search",
    "/memory-systems/semantic",
    "/getting-started/configuration",
  ],
  "/retrieval/fts5-search": [
    "/retrieval/hybrid-search",
    "/retrieval/ranking",
    "/api/python-sdk",
  ],
  "/retrieval/ranking": [
    "/retrieval/hybrid-search",
    "/operations/performance",
    "/retrieval/vector-search",
  ],

  // API
  "/api/overview": [
    "/api/python-sdk",
    "/api/hermes-plugin",
    "/api/rest",
  ],
  "/api/python-sdk": [
    "/api/overview",
    "/api/tool-schema",
    "/getting-started/quick-start",
  ],
  "/api/hermes-plugin": [
    "/api/overview",
    "/api/tool-schema",
    "/getting-started/configuration",
  ],
  "/api/rest": [
    "/api/overview",
    "/api/python-sdk",
    "/deployment/overview",
  ],
  "/api/tool-schema": [
    "/api/overview",
    "/api/hermes-plugin",
    "/api/python-sdk",
  ],

  // Deployment
  "/deployment/overview": [
    "/deployment/fly-io",
    "/deployment/docker",
    "/getting-started/installation",
  ],
  "/deployment/fly-io": [
    "/deployment/overview",
    "/deployment/docker",
    "/operations/monitoring",
  ],
  "/deployment/docker": [
    "/deployment/overview",
    "/deployment/fly-io",
    "/operations/backups",
  ],
  "/deployment/systemd": [
    "/deployment/overview",
    "/deployment/cron",
    "/operations/monitoring",
  ],
  "/deployment/cron": [
    "/deployment/systemd",
    "/architecture/sleep-consolidation",
    "/operations/monitoring",
  ],

  // Operations
  "/operations/monitoring": [
    "/operations/performance",
    "/operations/backups",
    "/deployment/overview",
  ],
  "/operations/backups": [
    "/operations/monitoring",
    "/operations/performance",
    "/security/encryption",
  ],
  "/getting-started/updating": [
    "/operations/backups",
    "/getting-started/installation",
    "/deployment/overview",
  ],
  "/operations/performance": [
    "/operations/monitoring",
    "/retrieval/ranking",
    "/getting-started/configuration",
  ],
  "/operations/troubleshooting": [
    "/operations/monitoring",
    "/operations/performance",
    "/getting-started/configuration",
  ],

  // Security
  "/security/overview": [
    "/security/encryption",
    "/security/access-control",
    "/security/data-privacy",
  ],
  "/security/encryption": [
    "/security/overview",
    "/operations/backups",
    "/security/access-control",
  ],
  "/security/access-control": [
    "/security/overview",
    "/api/rest",
    "/security/encryption",
  ],
  "/security/data-privacy": [
    "/security/overview",
    "/security/access-control",
    "/use-cases/overview",
  ],

  // Use Cases
  "/use-cases/overview": [
    "/use-cases/multi-agent",
    "/use-cases/long-running",
    "/use-cases/knowledge-base",
  ],
  "/use-cases/multi-agent": [
    "/use-cases/overview",
    "/memory-systems/working",
    "/api/hermes-plugin",
  ],
  "/use-cases/long-running": [
    "/use-cases/overview",
    "/memory-systems/episodic",
    "/architecture/sleep-consolidation",
  ],
  "/use-cases/knowledge-base": [
    "/use-cases/overview",
    "/memory-systems/semantic",
    "/retrieval/hybrid-search",
  ],
};

/**
 * Get related page slugs for a given page
 */
export function getRelatedPages(slug: string): string[] {
  return RELATED_PAGES[slug] || [];
}
