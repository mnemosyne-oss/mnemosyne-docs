export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="prose max-w-none">
        {children}
      </div>
    </div>
  );
}
