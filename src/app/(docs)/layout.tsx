import { DocsLayout } from "@/components/docs-layout";

export default function DocsShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
