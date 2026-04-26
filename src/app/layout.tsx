import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-alt",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream dark:bg-midnight text-charcoal dark:text-parchment transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
