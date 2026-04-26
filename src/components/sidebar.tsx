"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, BookOpen, Layers, Brain, Search, Code, Rocket, Shield, Briefcase, Settings, Menu, X } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  items?: { title: string; href: string; badge?: string }[];
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Getting Started",
    icon: <BookOpen size={16} />,
    items: [
      { title: "Quick Start", href: "/getting-started/quick-start" },
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Configuration", href: "/getting-started/configuration" },
      { title: "First Steps", href: "/getting-started/first-steps" },
    ],
  },
  {
    title: "Architecture",
    icon: <Layers size={16} />,
    items: [
      { title: "BEAM Overview", href: "/architecture/beam-overview" },
      { title: "System Design", href: "/architecture/system-design" },
      { title: "Data Flow", href: "/architecture/data-flow" },
      { title: "Sleep Consolidation", href: "/architecture/sleep-consolidation" },
      { title: "AAAK Compression", href: "/architecture/aaak-compression" },
    ],
  },
  {
    title: "Memory Systems",
    icon: <Brain size={16} />,
    items: [
      { title: "Working Memory", href: "/memory-systems/working" },
      { title: "Episodic Memory", href: "/memory-systems/episodic" },
      { title: "Semantic Memory", href: "/memory-systems/semantic" },
      { title: "Scratchpad", href: "/memory-systems/scratchpad" },
      { title: "Temporal Graph", href: "/memory-systems/temporal-graph" },
    ],
  },
  {
    title: "Retrieval",
    icon: <Search size={16} />,
    items: [
      { title: "Hybrid Search", href: "/retrieval/hybrid-search" },
      { title: "Vector Search", href: "/retrieval/vector-search" },
      { title: "FTS5 Search", href: "/retrieval/fts5-search" },
      { title: "Ranking & Scoring", href: "/retrieval/ranking" },
    ],
  },
  {
    title: "API",
    icon: <Code size={16} />,
    items: [
      { title: "Overview", href: "/api/overview" },
      { title: "Python SDK", href: "/api/python-sdk" },
      { title: "Hermes Plugin", href: "/api/hermes-plugin" },
      { title: "REST API", href: "/api/rest" },
      { title: "Tool Schema", href: "/api/tool-schema" },
    ],
  },
  {
    title: "Deployment",
    icon: <Rocket size={16} />,
    items: [
      { title: "Overview", href: "/deployment/overview" },
      { title: "Fly.io", href: "/deployment/fly-io" },
      { title: "Docker", href: "/deployment/docker" },
      { title: "Systemd", href: "/deployment/systemd" },
      { title: "Cron Jobs", href: "/deployment/cron" },
    ],
  },
  {
    title: "Operations",
    icon: <Settings size={16} />,
    items: [
      { title: "Monitoring", href: "/operations/monitoring" },
      { title: "Backups", href: "/operations/backups" },
      { title: "Migration", href: "/operations/migration" },
      { title: "Performance", href: "/operations/performance" },
      { title: "Troubleshooting", href: "/operations/troubleshooting" },
    ],
  },
  {
    title: "Security",
    icon: <Shield size={16} />,
    items: [
      { title: "Overview", href: "/security/overview" },
      { title: "Encryption", href: "/security/encryption" },
      { title: "Access Control", href: "/security/access-control" },
      { title: "Data Privacy", href: "/security/data-privacy" },
    ],
  },
  {
    title: "Use Cases",
    icon: <Briefcase size={16} />,
    items: [
      { title: "Overview", href: "/use-cases/overview" },
      { title: "Multi-Agent", href: "/use-cases/multi-agent" },
      { title: "Long-Running", href: "/use-cases/long-running" },
      { title: "Knowledge Base", href: "/use-cases/knowledge-base" },
    ],
  },
];

function SidebarItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.items && item.items.length > 0;
  const [expanded, setExpanded] = useState(isActive || pathname.startsWith(item.href + "/"));

  return (
    <div>
      <Link
        href={item.href}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-cream-dark dark:bg-charcoal-light text-accent-terracotta dark:text-accent-terracotta-light font-medium"
            : "text-warm-gray dark:text-warm-gray-muted hover:bg-cream-dark dark:hover:bg-charcoal-light hover:text-charcoal dark:hover:text-parchment"
        } ${depth > 0 ? "ml-4" : ""}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren && (
          <ChevronRight
            size={14}
            className={`shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        )}
        <span className="truncate">{item.title}</span>
        {item.items?.some((i) => i.badge) && (
          <span className="ml-auto badge badge-new">New</span>
        )}
      </Link>
      {hasChildren && expanded && (
        <div className="mt-0.5">
          {item.items!.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ml-6 ${
                pathname === sub.href
                  ? "bg-cream-dark dark:bg-charcoal-light text-accent-terracotta dark:text-accent-terracotta-light font-medium"
                  : "text-warm-gray-light dark:text-warm-gray-muted hover:bg-cream-dark dark:hover:bg-charcoal-light hover:text-warm-gray dark:hover:text-parchment"
              }`}
            >
              <span className="truncate">{sub.title}</span>
              {sub.badge && <span className={`ml-auto badge badge-${sub.badge}`}>{sub.badge}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  return (
    <div className={`${mobile ? "" : "w-64 shrink-0"} h-full flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-warm dark:border-charcoal-light shrink-0">
        <Link href="/" className="flex items-center gap-2 font-serif font-semibold text-charcoal dark:text-parchment">
          <div className="w-7 h-7 rounded-lg bg-charcoal dark:bg-parchment flex items-center justify-center text-cream dark:text-midnight text-sm font-bold">
            M
          </div>
          Mnemosyne
        </Link>
        {mobile && onClose && (
          <button onClick={onClose} className="text-warm-gray dark:text-warm-gray-muted hover:text-charcoal dark:hover:text-parchment">
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="px-3 py-4 space-y-6 overflow-y-auto flex-1 min-h-0 overscroll-contain">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 px-3 mb-2 text-xs font-semibold text-warm-gray-muted dark:text-warm-gray uppercase tracking-wider">
              {section.icon}
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-cream-dark dark:bg-charcoal-light text-warm-gray dark:text-warm-gray-muted"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="relative w-80 max-w-[85vw] h-full bg-warm-white dark:bg-charcoal border-r border-border-warm dark:border-charcoal-light shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            <Sidebar mobile onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
