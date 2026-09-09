import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroGraphic from "../components/HeroGraphic";
import TerminalBlock from "../components/TerminalBlock";
import CodeSnippetGroup from "../components/CodeSnippetGroup";
import ScrollReveal from "../components/ScrollReveal";
import LiveValidatorPlayground from "../components/LiveValidatorPlayground";
// Import Aceternity UI background component (e.g., BackgroundBeams or BackgroundLines)
import { BackgroundBeams } from "../components/ui/background-beams";
import {
  ShieldCheck,
  Zap,
  Box,
  FileCheck2,
  RefreshCw,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const sampleSchemaTs = `import { infer, type Infer } from "subatom-infer";

// 1. Define schema with chaining & constraints
export const RegisterSchema = infer.object({
  id: infer.string().uuid(),
  handle: infer.string().min(3).max(24).toLowerCase().trim(),
  email: infer.string().email(),
  age: infer.coerce.number().int().min(18).optional(),
  plan: infer.enum(["free", "pro", "enterprise"]).default("free"),
  avatar: infer.file().mime(["image/png", "image/jpeg"]).max(5_000_000).optional(),
  joinedAt: infer.coerce.date().default(() => new Date())
}).strict();

// 2. Automatically derive static TypeScript types
export type RegisterInput = Infer<typeof RegisterSchema>;

// 3. Validate runtime payloads safely
const result = RegisterSchema.safeParse(req.body);
if (result.success) {
  console.log("Verified User:", result.data.handle);
}`;

  const sampleSchemaJs = `import { infer } from "subatom-infer";

// 1. Define schema with chaining & constraints
export const RegisterSchema = infer.object({
  id: infer.string().uuid(),
  handle: infer.string().min(3).max(24).toLowerCase().trim(),
  email: infer.string().email(),
  age: infer.coerce.number().int().min(18).optional(),
  plan: infer.enum(["free", "pro", "enterprise"]).default("free"),
  avatar: infer.file().mime(["image/png", "image/jpeg"]).max(5_000_000).optional(),
  joinedAt: infer.coerce.date().default(() => new Date())
}).strict();

// 2. Validate runtime payloads safely
const result = RegisterSchema.safeParse(req.body);
if (result.success) {
  console.log("Verified User:", result.data.handle);
}`;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-(--bg-primary)">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION WITH ACETERNITY UI BACKGROUND BEAMS */}
        <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8 flex flex-col items-center justify-center antialiased">
          {/* Aceternity UI Background Effect */}
          <BackgroundBeams className="absolute inset-0 z-0 pointer-events-none" />

          <div className="mx-auto max-w-4xl text-center space-y-6 relative z-10">
            <ScrollReveal delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur">
                <Sparkles
                  className="h-3.5 w-3.5 animate-spin"
                  style={{ animationDuration: "6s" }}
                />
                Subatom Infer v1.4.0 — Zero Dependencies
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-(--text-primary) leading-tight">
                Validate unknown runtime data. <br />
                <span className="bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Infer reliable types.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mx-auto max-w-xl text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                An ultra-fast, composable schema validation engine for JavaScript and TypeScript.
                Built with dual sync/async parsing, prototype-pollution defenses, and direct static
                type derivation.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/docs"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition transform hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 cursor-pointer" />
                </Link>
                <Link
                  href="/docs/api-reference"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-card)/80 backdrop-blur px-6 py-3 text-sm font-semibold text-(--text-primary) hover:border-emerald-500 transition"
                >
                  API Reference
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mx-auto max-w-md pt-2">
                <TerminalBlock />
              </div>
            </ScrollReveal>
          </div>

          {/* INTERACTIVE DATA FLOW VISUALIZER */}
          <ScrollReveal delay={500} className="mt-14 relative z-10 w-full">
            <HeroGraphic />
          </ScrollReveal>
        </section>

        {/* LIVE SANDBOX SECTION */}
        <section className="border-t border-(--border-color) bg-(--bg-secondary) py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <ScrollReveal>
              <div className="text-center space-y-2">
                <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-500">
                  Interactive Evaluation
                </h2>
                <h3 className="text-3xl font-extrabold text-(--text-primary)">
                  Try Subatom Infer in Real Time
                </h3>
                <p className="text-sm text-(--text-secondary) max-w-xl mx-auto">
                  Click through runtime scenarios to see how types are safely coerced, constraints
                  validated, and malicious prototype keys stripped.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <LiveValidatorPlayground />
            </ScrollReveal>
          </div>
        </section>

        {/* VALUE PILLARS & ARCHITECTURE */}
        <section className="border-t border-(--border-color) py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-12">
            <ScrollReveal>
              <div className="text-center space-y-3">
                <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-500">
                  Core Architecture
                </h2>
                <h3 className="text-3xl font-extrabold text-(--text-primary)">
                  Engineered for High-Throughput Boundaries
                </h3>
                <p className="mx-auto max-w-2xl text-sm text-(--text-secondary)">
                  Designed to run anywhere data crosses trust boundaries without performance
                  penalties or external vulnerabilities.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Zap className="h-5 w-5" />,
                  color: "bg-emerald-500/10 text-emerald-500",
                  title: "Dual Sync/Async Engine",
                  desc: "Blazing fast synchronous validation for CPU-bound pipelines, with automated branching into async routines when Promises or database checks are used.",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  color: "bg-blue-500/10 text-blue-500",
                  title: "Prototype Pollution Defense",
                  desc: "Automatic defense against __proto__ and constructor injections across object shapes, records, and merged schemas.",
                },
                {
                  icon: <FileCheck2 className="h-5 w-5" />,
                  color: "bg-purple-500/10 text-purple-500",
                  title: "First-Class File Uploads",
                  desc: "Dedicated infer.file() and infer.files() schemas with MIME checks, file extension limits, size thresholds, and storage policies.",
                },
                {
                  icon: <RefreshCw className="h-5 w-5" />,
                  color: "bg-amber-500/10 text-amber-500",
                  title: "Smart Coercion Suite",
                  desc: "Safely convert strings from URL queries and multipart forms into typed booleans, numbers, bigints, and dates via infer.coerce.*.",
                },
                {
                  icon: <Box className="h-5 w-5" />,
                  color: "bg-cyan-500/10 text-cyan-500",
                  title: "O(1) Discriminated Unions",
                  desc: "Indexed tag lookup delivers constant-time branch resolution for event payloads and state machines without test-and-fail iterations.",
                },
                {
                  icon: <Cpu className="h-5 w-5" />,
                  color: "bg-rose-500/10 text-rose-500",
                  title: "Zero Dependencies",
                  desc: "Zero external runtime dependencies. Lightweight dual ESM and CommonJS bundle with 100% test branch coverage.",
                },
              ].map((card, idx) => (
                <ScrollReveal key={card.title} delay={idx * 80}>
                  <div className="cursor-pointer rounded-2xl border border-(--border-color) bg-(--bg-card) p-6 space-y-3 shadow-sm hover:border-emerald-500/50 hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-200">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}
                    >
                      {card.icon}
                    </div>
                    <h4 className="text-lg font-bold text-(--text-primary)">{card.title}</h4>
                    <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CODE COMPARISON / EXAMPLE SHOWCASE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-(--border-color) bg-(--bg-secondary)">
          <div className="mx-auto max-w-5xl space-y-8">
            <ScrollReveal>
              <div className="text-center space-y-2">
                <h2 className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-500">
                  Clean Developer Experience
                </h2>
                <h3 className="text-3xl font-extrabold text-(--text-primary)">
                  Idiomatic JavaScript & TypeScript Syntax
                </h3>
                <p className="text-sm text-(--text-secondary)">
                  Switch between TypeScript and plain JavaScript examples anywhere in the
                  documentation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <CodeSnippetGroup
                ts={sampleSchemaTs}
                js={sampleSchemaJs}
                filename="schemas/user.ts"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-(--border-color)">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <ScrollReveal>
              <h3 className="text-3xl font-black text-(--text-primary)">
                Ready to make your application type-safe at runtime?
              </h3>
              <p className="text-sm text-(--text-secondary) max-w-xl mx-auto">
                Explore the complete documentation, learn schema patterns, and integrate Subatom
                Infer into your Node.js or Next.js app in minutes.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  href="/docs"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition transform hover:-translate-y-0.5"
                >
                  Start Reading Docs
                  <ArrowRight className="h-4 w-4 cursor-pointer" />
                </Link>
                <a
                  href="https://github.com/subatomjs/subatom-infer"
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-(--border-color) bg-(--bg-card) px-6 py-3 text-sm font-semibold text-(--text-primary) hover:border-emerald-500 transition"
                >
                  View on GitHub
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
