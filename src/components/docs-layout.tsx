"use client";

import { Sidebar, MobileSidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "./search";
import { Breadcrumbs } from "./breadcrumbs";
import { RelatedPages } from "./related-pages";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="h-14 border-b border-border-warm dark:border-charcoal-light bg-warm-white/80 dark:bg-charcoal/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <MobileSidebar />
          <Link href="https://mnemosyne.site" className="hidden lg:flex items-center gap-2 font-serif font-semibold text-charcoal dark:text-parchment">
            <img src="/logo.jpg" alt="Mnemosyne" className="w-6 h-6 rounded-md object-cover" />
            Mnemosyne
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Search />
          <a
            href="https://github.com/axdsan/mnemosyne"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-cream-dark dark:bg-charcoal-light text-warm-gray dark:text-warm-gray-muted hover:bg-border-warm dark:hover:bg-graphite transition-colors"
            aria-label="GitHub"
          >
            <ExternalLink size={18} />
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border-warm dark:border-charcoal-light bg-warm-white dark:bg-charcoal overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="prose max-w-4xl mx-auto px-6 py-10 min-h-full">
            <Breadcrumbs />
            {children}
            <RelatedPages />
          </div>
          <footer className="border-t border-border-warm dark:border-charcoal-light py-8 px-6 mt-10">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-gray-light dark:text-warm-gray">
              <div>
                &copy; {new Date().getFullYear()} Mnemosyne. Built by{" "}
                <a href="https://github.com/axdsan" className="text-accent-terracotta dark:text-accent-terracotta-light hover:underline">
                  Abdias Moya
                </a>
                .
              </div>
              <div className="flex items-center gap-4">
                <a href="https://mnemosyne.site" className="hover:text-warm-gray dark:hover:text-parchment transition-colors">
                  Website
                </a>
                <a href="https://github.com/axdsan/mnemosyne" className="hover:text-warm-gray dark:hover:text-parchment transition-colors">
                  GitHub
                </a>
                <a href="https://x.com/axdsan" className="hover:text-warm-gray dark:hover:text-parchment transition-colors">
                  X/Twitter
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
