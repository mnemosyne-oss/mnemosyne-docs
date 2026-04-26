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
  { title: "Quick Start", href: "https://docs.mnemosyne.site/getting-started/quick-start", excerpt: "Get Mnemosyne running in 5 minutes", section: "Getting Started" },
  { title: "Installation", href: "https://docs.mnemosyne.site/getting-started/installation", excerpt: "pip install mnemosyne or use as Hermes plugin", section: "Getting Started" },
  { title: "Configuration", href: "https://docs.mnemosyne.site/getting-started/configuration", excerpt: "Environment variables and setup options", section: "Getting Started" },
  { title: "BEAM Architecture", href: "https://docs.mnemosyne.site/architecture/beam-overview", excerpt: "Biological-inspired memory architecture", section: "Architecture" },
  { title: "System Architecture", href: "https://docs.mnemosyne.site/architecture/system-design", excerpt: "High-level system design and data flow", section: "Architecture" },
  { title: "Working Memory", href: "https://docs.mnemosyne.site/memory-systems/working", excerpt: "Short-term agent context and conversation history", section: "Memory Systems" },
  { title: "Episodic Memory", href: "https://docs.mnemosyne.site/memory-systems/episodic", excerpt: "Long-term experience storage and retrieval", section: "Memory Systems" },
  { title: "Semantic Memory", href: "https://docs.mnemosyne.site/memory-systems/semantic", excerpt: "Structured knowledge and facts", section: "Memory Systems" },
  { title: "Scratchpad", href: "https://docs.mnemosyne.site/memory-systems/scratchpad", excerpt: "Temporary workspace for reasoning", section: "Memory Systems" },
  { title: "Hybrid Retrieval", href: "https://docs.mnemosyne.site/retrieval/hybrid-search", excerpt: "Combining vector and full-text search", section: "Retrieval" },
  { title: "Vector Search", href: "https://docs.mnemosyne.site/retrieval/vector-search", excerpt: "Dense embedding-based similarity search", section: "Retrieval" },
  { title: "FTS5 Search", href: "https://docs.mnemosyne.site/retrieval/fts5-search", excerpt: "SQLite full-text search capabilities", section: "Retrieval" },
  { title: "API Reference", href: "https://docs.mnemosyne.site/api/overview", excerpt: "Complete Python API documentation", section: "API" },
  { title: "Hermes Plugin", href: "https://docs.mnemosyne.site/api/hermes-plugin", excerpt: "Integration with Hermes agent framework", section: "API" },
  { title: "Deployment", href: "https://docs.mnemosyne.site/deployment/overview", excerpt: "Deploy Mnemosyne to production", section: "Deployment" },
  { title: "Operations", href: "https://docs.mnemosyne.site/operations/monitoring", excerpt: "Monitoring, backups, and maintenance", section: "Operations" },
  { title: "Security", href: "https://docs.mnemosyne.site/security/overview", excerpt: "Encryption, access control, and privacy", section: "Security" },
  { title: "Use Cases", href: "https://docs.mnemosyne.site/use-cases/overview", excerpt: "Real-world patterns and case studies", section: "Use Cases" },
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
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cream-dark text-warm-gray text-sm hover:bg-border-warm transition-colors w-48 justify-between"
      >
        <span className="flex items-center gap-2">
          <SearchIcon size={14} />
          <span>Search docs...</span>
        </span>
        <kbd className="hidden sm:inline-block text-xs bg-border-warm px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-border-warm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-warm">
              <SearchIcon size={18} className="text-warm-gray-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent outline-none text-charcoal placeholder:text-warm-gray-muted"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-warm-gray-muted hover:text-warm-gray"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto">
              {results.length === 0 && query && (
                <div className="px-4 py-8 text-center text-warm-gray">
                  No results found for "{query}"
                </div>
              )}
              {results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-cream transition-colors ${
                    i === selected ? "bg-cream" : ""
                  }`}
                >
                  <FileText size={16} className="mt-0.5 text-warm-gray-muted shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-charcoal">
                      {result.title}
                    </div>
                    <div className="text-xs text-warm-gray mt-0.5">
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
