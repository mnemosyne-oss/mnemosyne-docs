"use client";

import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  href: string;
  excerpt: string;
  section: string;
}

const searchIndex: SearchResult[] = [
  { title: "Quick Start", href: "/getting-started/quick-start", excerpt: "Get Mnemosyne running in 5 minutes", section: "Getting Started" },
  { title: "Installation", href: "/getting-started/installation", excerpt: "pip install mnemosyne-memory or use as Hermes plugin", section: "Getting Started" },
  { title: "Configuration", href: "/getting-started/configuration", excerpt: "All environment variables, YAML config, and provider setup", section: "Getting Started" },
  { title: "First Steps", href: "/getting-started/first-steps", excerpt: "Write, read, and search memories after installation", section: "Getting Started" },
  { title: "Updating Mnemosyne", href: "/getting-started/updating", excerpt: "Upgrade from v2.7 through v3.1.2, schema migrations, and rollback", section: "Getting Started" },
  { title: "System Architecture", href: "/architecture/system-design", excerpt: "High-level system design and data flow", section: "Architecture" },
  { title: "Tiered Degradation", href: "/architecture/tiered-degradation", excerpt: "Three-tier memory lifecycle from hot to cold with automatic compression", section: "Architecture" },
  { title: "Veracity Signal", href: "/architecture/veracity-signal", excerpt: "Track memory trustworthiness with confidence levels and audit inferred content", section: "Architecture" },
  { title: "Working Memory", href: "/memory-systems/working", excerpt: "Short-term agent context and conversation history", section: "Memory Systems" },
  { title: "Episodic Memory", href: "/memory-systems/episodic", excerpt: "Long-term experience storage and retrieval", section: "Memory Systems" },
  { title: "Semantic Memory", href: "/memory-systems/semantic", excerpt: "Structured knowledge and facts", section: "Memory Systems" },
  { title: "Scratchpad", href: "/memory-systems/scratchpad", excerpt: "Temporary workspace for reasoning", section: "Memory Systems" },
  { title: "Hybrid Retrieval", href: "/retrieval/hybrid-search", excerpt: "Combining vector and full-text search", section: "Retrieval" },
  { title: "Vector Search", href: "/retrieval/vector-search", excerpt: "Dense embedding-based similarity search", section: "Retrieval" },
  { title: "FTS5 Search", href: "/retrieval/fts5-search", excerpt: "SQLite full-text search capabilities", section: "Retrieval" },
  { title: "API Reference", href: "/api/overview", excerpt: "Complete Python API documentation", section: "API" },
  { title: "Hermes Plugin", href: "/api/hermes-plugin", excerpt: "Integration with Hermes agent framework", section: "API" },
  { title: "Deployment", href: "/deployment/overview", excerpt: "Deploy Mnemosyne to production", section: "Deployment" },
  { title: "Operations", href: "/operations/monitoring", excerpt: "Monitoring, backups, and maintenance", section: "Operations" },
  { title: "Security", href: "/security/overview", excerpt: "Encryption, access control, and privacy", section: "Security" },
  { title: "Use Cases", href: "/use-cases/overview", excerpt: "Real-world patterns and case studies", section: "Use Cases" },
  { title: "vs Hindsight", href: "/comparisons/hindsight", excerpt: "Honest technical comparison with Hindsight self-hosted", section: "Comparisons" },
  { title: "vs Mem0", href: "/comparisons/mem0", excerpt: "Honest technical comparison with Mem0 cloud platform", section: "Comparisons" },
  { title: "vs Letta", href: "/comparisons/letta", excerpt: "Honest comparison with Letta's virtual context memory model", section: "Comparisons" },
  { title: "vs Zep", href: "/comparisons/zep", excerpt: "Temporal knowledge graph comparison with Zep's context engine", section: "Comparisons" },
  { title: "vs Cognee", href: "/comparisons/cognee", excerpt: "Triple-store architecture comparison with Cognee's graph memory", section: "Comparisons" },
  { title: "vs Honcho", href: "/comparisons/honcho", excerpt: "Reasoning-based memory comparison with Honcho's Neuromancer", section: "Comparisons" },
  { title: "vs SuperMemory", href: "/comparisons/supermemory", excerpt: "Five-layer context stack comparison with SuperMemory platform", section: "Comparisons" },
  { title: "Cross-Provider Migration", href: "/migration/overview", excerpt: "Import memories from Mem0, Letta, Zep, and more", section: "Migration" },
  { title: "From Mem0", href: "/migration/from-mem0", excerpt: "Migrate memories from Mem0 cloud or self-hosted", section: "Migration" },
  { title: "From Letta (MemGPT)", href: "/migration/from-letta", excerpt: "Import AgentFile (.af) or API memories from Letta", section: "Migration" },
  { title: "From Zep", href: "/migration/from-zep", excerpt: "Session-by-session extraction from Zep temporal graph", section: "Migration" },
];

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = searchIndex.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.section.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      handleSelect(results[selected]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cream-dark dark:bg-charcoal-light text-warm-gray dark:text-warm-gray-muted text-sm hover:bg-border-warm dark:hover:bg-graphite transition-colors w-48 justify-between"
      >
        <span className="flex items-center gap-2">
          <SearchIcon size={14} />
          <span>Search docs...</span>
        </span>
        <kbd className="hidden sm:inline-block text-xs bg-border-warm dark:bg-graphite px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-charcoal/50 dark:bg-midnight/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl bg-warm-white dark:bg-charcoal rounded-xl shadow-2xl border border-border-warm dark:border-charcoal-light overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-warm dark:border-charcoal-light">
              <SearchIcon size={18} className="text-warm-gray-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent outline-none text-charcoal dark:text-parchment placeholder:text-warm-gray-muted"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-warm-gray-muted hover:text-warm-gray dark:hover:text-parchment"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length === 0 && query && (
                <div className="px-4 py-8 text-center text-warm-gray dark:text-warm-gray-muted">
                  No results found for &quot;{query}&quot;
                </div>
              )}
              {results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-cream dark:hover:bg-charcoal-light transition-colors ${
                    i === selected ? "bg-cream dark:bg-charcoal-light" : ""
                  }`}
                >
                  <FileText size={16} className="mt-0.5 text-warm-gray-muted shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-charcoal dark:text-parchment">
                      {result.title}
                    </div>
                    <div className="text-xs text-warm-gray dark:text-warm-gray-muted mt-0.5">
                      {result.section} — {result.excerpt}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
