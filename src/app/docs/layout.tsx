import { PageNav } from "@/components/page-nav";
import { getPageNav } from "@/lib/content";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <PageNav />
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="prose dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
