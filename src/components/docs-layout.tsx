"use client";

import { Sidebar, MobileSidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Search } from "./search";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="h-14 border-b border-sidebar-border bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <MobileSidebar />
          <Link href="/" className="hidden lg:flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
            <div className="w-6 h-6 rounded-md bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            Mnemosyne
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Search />
          <a
            href="https://github.com/axdsan/mnemosyne"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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
        <aside className="hidden lg:block w-64 shrink-0 border-r border-sidebar-border bg-sidebar-bg overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-10 min-h-full">
            {children}
          </div>
          <footer className="border-t border-sidebar-border py-8 px-6 mt-10">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div>
                &copy; {new Date().getFullYear()} Mnemosyne. Built by{" "}
                <a href="https://github.com/axdsan" className="text-brand-600 dark:text-brand-400 hover:underline">
                  Abdias Moya
                </a>
                .
              </div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/axdsan/mnemosyne" className="hover:text-zinc-700 dark:hover:text-zinc-300">
                  GitHub
                </a>
                <a href="https://x.com/axdsan" className="hover:text-zinc-700 dark:hover:text-zinc-300">
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
