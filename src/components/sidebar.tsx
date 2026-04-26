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
      { title: "Quick Start", href: "https://docs.mnemosyne.com/getting-started/quick-start" },
      { title: "Installation", href: "https://docs.mnemosyne.com/getting-started/installation" },
      { title: "Configuration", href: "https://docs.mnemosyne.com/getting-started/configuration" },
      { title: "First Steps", href: "https://docs.mnemosyne.com/getting-started/first-steps" },
    ],
  },
  {
    title: "Architecture",
    icon: <Layers size={16} />,
    items: [
      { title: "BEAM Overview", href: "https://docs.mnemosyne.com/architecture/beam-overview" },
      { title: "System Design", href: "https://docs.mnemosyne.com/architecture/system-design" },
      { title: "Data Flow", href: "https://docs.mnemosyne.com/architecture/data-flow" },
      { title: "Sleep Consolidation", href: "https://docs.mnemosyne.com/architecture/sleep-consolidation" },
      { title: "AAAK Compression", href: "https://docs.mnemosyne.com/architecture/aaak-compression" },
    ],
  },
  {
    title: "Memory Systems",
    icon: <Brain size={16} />,
    items: [
      { title: "Working Memory", href: "https://docs.mnemosyne.com/memory-systems/working" },
      { title: "Episodic Memory", href: "https://docs.mnemosyne.com/memory-systems/episodic" },
      { title: "Semantic Memory", href: "https://docs.mnemosyne.com/memory-systems/semantic" },
      { title: "Scratchpad", href: "https://docs.mnemosyne.com/memory-systems/scratchpad" },
      { title: "Temporal Graph", href: "https://docs.mnemosyne.com/memory-systems/temporal-graph" },
    ],
  },
  {
    title: "Retrieval",
    icon: <Search size={16} />,
    items: [
      { title: "Hybrid Search", href: "https://docs.mnemosyne.com/retrieval/hybrid-search" },
      { title: "Vector Search", href: "https://docs.mnemosyne.com/retrieval/vector-search" },
      { title: "FTS5 Search", href: "https://docs.mnemosyne.com/retrieval/fts5-search" },
      { title: "Ranking & Scoring", href: "https://docs.mnemosyne.com/retrieval/ranking" },
    ],
  },
  {
    title: "API",
    icon: <Code size={16} />,
    items: [
      { title: "Overview", href: "https://docs.mnemosyne.com/api/overview" },
      { title: "Python SDK", href: "https://docs.mnemosyne.com/api/python-sdk" },
      { title: "Hermes Plugin", href: "https://docs.mnemosyne.com/api/hermes-plugin" },
      { title: "REST API", href: "https://docs.mnemosyne.com/api/rest" },
      { title: "Tool Schema", href: "https://docs.mnemosyne.com/api/tool-schema" },
    ],
  },
  {
    title: "Deployment",
    icon: <Rocket size={16} />,
    items: [
      { title: "Overview", href: "https://docs.mnemosyne.com/deployment/overview" },
      { title: "Fly.io", href: "https://docs.mnemosyne.com/deployment/fly-io" },
      { title: "Docker", href: "https://docs.mnemosyne.com/deployment/docker" },
      { title: "Systemd", href: "https://docs.mnemosyne.com/deployment/systemd" },
      { title: "Cron Jobs", href: "https://docs.mnemosyne.com/deployment/cron" },
    ],
  },
  {
    title: "Operations",
    icon: <Settings size={16} />,
    items: [
      { title: "Monitoring", href: "https://docs.mnemosyne.com/operations/monitoring" },
      { title: "Backups", href: "https://docs.mnemosyne.com/operations/backups" },
      { title: "Migration", href: "https://docs.mnemosyne.com/operations/migration" },
      { title: "Performance", href: "https://docs.mnemosyne.com/operations/performance" },
      { title: "Troubleshooting", href: "https://docs.mnemosyne.com/operations/troubleshooting" },
    ],
  },
  {
    title: "Security",
    icon: <Shield size={16} />,
    items: [
      { title: "Overview", href: "https://docs.mnemosyne.com/security/overview" },
      { title: "Encryption", href: "https://docs.mnemosyne.com/security/encryption" },
      { title: "Access Control", href: "https://docs.mnemosyne.com/security/access-control" },
      { title: "Data Privacy", href: "https://docs.mnemosyne.com/security/data-privacy" },
    ],
  },
  {
    title: "Use Cases",
    icon: <Briefcase size={16} />,
    items: [
      { title: "Overview", href: "https://docs.mnemosyne.com/use-cases/overview" },
      { title: "Multi-Agent", href: "https://docs.mnemosyne.com/use-cases/multi-agent" },
      { title: "Long-Running", href: "https://docs.mnemosyne.com/use-cases/long-running" },
      { title: "Knowledge Base", href: "https://docs.mnemosyne.com/use-cases/knowledge-base" },
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
            ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 font-medium"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
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
                  ? "bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 font-medium"
                  : "text-zinc-500 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300"
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
    <div className={`${mobile ? "" : "w-64 shrink-0"} h-full`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-bold">
            M
          </div>
          Mnemosyne
        </Link>
        {mobile && onClose && (
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="px-3 py-4 space-y-6 overflow-y-auto h-[calc(100%-3.5rem)]">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 px-3 mb-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
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
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="sidebar-overlay absolute inset-0" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-zinc-950 border-r border-sidebar-border shadow-xl">
            <Sidebar mobile onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
