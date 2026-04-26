import Link from "next/link";
import { ArrowRight, Zap, Shield, Database, Brain, Search, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
            <Zap size={14} />
            v2.0 — Now with Hermes Plugin Integration
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Memory for AI Agents
            <br />
            <span className="text-brand-600 dark:text-brand-400">That Actually Works</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Mnemosyne is a native memory system for AI agents. Persistent, structured, and
            context-aware — built on SQLite with vector search, full-text retrieval, and
            biological-inspired BEAM architecture.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://docs.mnemosyne.com/getting-started/quick-start"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link
              href="https://docs.mnemosyne.com/architecture/beam-overview"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 border-t border-sidebar-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-zinc-900 dark:text-zinc-100 mb-12">
            Why Mnemosyne?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain size={24} />}
              title="BEAM Architecture"
              description="Biological-inspired memory tiers: Working, Episodic, Semantic, and Scratchpad — each optimized for different access patterns."
            />
            <FeatureCard
              icon={<Search size={24} />}
              title="Hybrid Retrieval"
              description="Combine dense vector similarity with SQLite FTS5 full-text search for results that are both relevant and precise."
            />
            <FeatureCard
              icon={<Database size={24} />}
              title="SQLite Native"
              description="Zero external dependencies. Single-file database with ACID transactions, portability, and proven reliability."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Privacy First"
              description="All data stays local. Optional encryption at rest. No cloud required, no data exfiltration."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Sub-100ms Queries"
              description="Optimized indexing and caching deliver median retrieval latency under 100ms for typical workloads."
            />
            <FeatureCard
              icon={<Rocket size={24} />}
              title="Hermes Integration"
              description="First-class plugin for the Hermes agent framework. Auto-context injection, tool schema, and seamless operation."
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-6 border-t border-sidebar-border bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <Stat value="&lt;100ms" label="Median Query" />
          <Stat value="4" label="Memory Tiers" />
          <Stat value="0" label="External Deps" />
          <Stat value="∞" label="Scale Potential" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Ready to give your agent a memory?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Start with the Quick Start guide and have Mnemosyne running in under 5 minutes.
          </p>
          <Link
            href="https://docs.mnemosyne.com/getting-started/quick-start"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
          >
            Quick Start
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-1">{value}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  );
}
