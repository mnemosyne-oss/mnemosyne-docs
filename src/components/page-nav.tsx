"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export function PageNav({ prev, next }: PageNavProps) {
  return (
    <div className="flex items-center justify-between mt-16 pt-8 border-t border-sidebar-border">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ChevronLeft size={16} />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Previous</span>
            <span className="font-medium">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-right"
        >
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Next</span>
            <span className="font-medium">{next.title}</span>
          </div>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
