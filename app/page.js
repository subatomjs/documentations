import Link from "next/link";
import { ArrowRight, Cpu, Gauge, Layers, Zap } from "lucide-react";
import { TerminalBlock } from "./components/TerminalBlock";
import { CodeBlock } from "./components/CodeBlock";
import { SITE_METADATA } from "./lib/docs-config";
import { JsonLd } from "./components/JsonLd";
import { BrandLogo } from "./components/BrandLogo";

const serverExampleTs = `import http from "node:http";
import { subatomPulse } from "subatom-pulse";

const httpServer = http.createServer();
const io = subatomPulse({
  server: httpServer,
  path: "/ws",
  maxConnections: 10_000,
  rateLimitPerSec: 50,
  overflowPolicy: "drop-oldest",
  authenticator: async (req) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    const token = url.searchParams.get("token");
    return {
      authenticated: token === "Bearer secret-app-token",
      userId: url.searchParams.get("user") ?? "guest"
    };
  }
});

io.onConnection((socket) => {
  socket.emit("system.welcome", { id: socket.id });
});

io.installSignalHandlers();
httpServer.listen(3000);`;

const serverExampleJs = `const http = require("node:http");
const { subatomPulse } = require("subatom-pulse");

const httpServer = http.createServer();
const io = subatomPulse({
  server: httpServer,
  path: "/ws",
  maxConnections: 10_000,
  rateLimitPerSec: 50,
  overflowPolicy: "drop-oldest",
  authenticator: async (req) => {
    const url = new URL(req.url || "/", "http://localhost");
    const token = url.searchParams.get("token");
    return {
      authenticated: token === "Bearer secret-app-token",
      userId: url.searchParams.get("user") || "guest"
    };
  }
});

io.onConnection((socket) => {
  socket.emit("system.welcome", { id: socket.id });
});

io.installSignalHandlers();
httpServer.listen(3000);`;

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "subatom-pulse",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Node.js 24+",
    description: SITE_METADATA.description,
    author: {
      "@type": "Person",
      name: "Kunal Chandra Das",
      email: "kunal@subatomjs.dev",
    },
    license: "https://opensource.org/licenses/MIT",
  };

  return (
<div className="relative overflow-hidden">
      <JsonLd schema={structuredData} />

      <section className="pt-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-leaf-50 dark:bg-leaf-950/60 border border-leaf-500/30 text-leaf-700 dark:text-leaf-400 text-xs font-mono mb-8 font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>v1.1.0 • Enterprise-grade isolated WebSocket engine</span>
        </div>

        {/* Clean, warning-free single logo instance */}
        <div className="flex justify-center mb-6">
          <BrandLogo size="hero" priority />
        </div>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-surface-600 dark:text-surface-300 leading-relaxed mb-8">
          The isolated WebSocket engine built for modern Node.js 24+ runtimes.
          Bounded outbound memory queues, native room routing, and structured
          JSON wire packet enforcement without HTTP fallback bloat.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/docs/quickstart"
            className="px-6 py-3 rounded-xl bg-leaf-600 hover:bg-leaf-500 text-white font-semibold text-xs transition shadow-lg shadow-leaf-600/20 flex items-center space-x-2"
          >
            <span>Get Started Quick</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-xl bg-surface-100 dark:bg-surface-900 hover:bg-surface-200 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 font-semibold text-xs border border-surface-200 dark:border-surface-800 transition"
          >
            Explore Architecture
          </Link>
        </div>

        <div className="max-w-xl mx-auto">
          <TerminalBlock command="install subatom-pulse" />
        </div>
      </section>

      {/* Live Interactive Code Preview */}
      <section className="py-12 border-y border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-surface-900 dark:text-white tracking-tight">
              Attach Directly to Existing Node.js HTTP Pipeline[cite: 3]
            </h2>
            <p className="text-xs sm:text-sm text-surface-500 font-mono mt-1">
              Zero socket-level memory leaks. Explicit upgrade authorizers.
            </p>
          </div>
          <CodeBlock
            filename="server"
            tsCode={serverExampleTs}
            jsCode={serverExampleJs}
          />
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight">
            Engineered for Predictable Stability
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 mt-2">
            Eliminate event-loop lag caused by slow clients and unbounded socket
            buffers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-leaf-100 dark:bg-leaf-950/80 text-leaf-600 dark:text-leaf-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2">
              Isolated Sockets
            </h3>
            <p className="text-xs text-surface-500 leading-relaxed">
              Every client connection operates its own independent lifecycle
              machine, bounded FIFO outbound buffer, and tracked event
              listeners[cite: 1]. Slow peers are completely isolated[cite: 1].
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-leaf-100 dark:bg-leaf-950/80 text-leaf-600 dark:text-leaf-400 flex items-center justify-center mb-4">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2">
              Bounded Backpressure
            </h3>
            <p className="text-xs text-surface-500 leading-relaxed">
              Microtask-scheduled queue with hard memory ceilings (
              <code className="font-mono text-[11px]">maxQueueBytes</code>) and
              explicit overflow policies: reject, drop-oldest, or
              disconnect[cite: 1, 3].
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-leaf-100 dark:bg-leaf-950/80 text-leaf-600 dark:text-leaf-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2">
              Inverted Room Index
            </h3>
            <p className="text-xs text-surface-500 leading-relaxed">
              Native room routing in O(1) set complexity managed by{" "}
              <code className="font-mono text-[11px]">RoomRegistry</code>[cite:
              1]. Zero memory leaks: room sets auto-prune immediately on
              disconnect[cite: 1].
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
