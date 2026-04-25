import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DocsLayout } from "@/components/docs-layout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mnemosyne Documentation",
    template: "%s | Mnemosyne Docs",
  },
  description:
    "Mnemosyne — The native memory system for AI agents. Persistent, structured, and context-aware memory with BEAM architecture.",
  keywords: [
    "AI memory",
    "agent memory",
    "persistent memory",
    "BEAM",
    "Mnemosyne",
    "SQLite",
    "vector search",
    "Hermes plugin",
  ],
  authors: [{ name: "Abdias Moya", url: "https://github.com/axdsan" }],
  openGraph: {
    title: "Mnemosyne Documentation",
    description: "The native memory system for AI agents",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <ThemeProvider>
          <DocsLayout>{children}</DocsLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
