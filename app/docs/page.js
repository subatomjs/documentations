import { TableOfContents } from "../components/TableOfContents";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Pagination } from "../components/Pagination";
import { Callout } from "../components/Callout";
import { JsonLd } from "../components/JsonLd";

export const metadata = {
  title: "Architecture & Mental Model",
  description:
    "Comprehensive architecture guide to subatom-pulse, covering isolated socket state machines, backpressure limits, and the inverted room index.",
};

export default function MentalModelPage() {
  const toc = [
    { id: "mental-model", title: "The Mental Model" },
    { id: "core-pillars", title: "Core Architectural Pillars" },
    { id: "packet-sequence", title: "Packet Execution Flow" },
    { id: "enterprise-guarantees", title: "Enterprise Guarantees" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <JsonLd
          schema={{
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "subatom-pulse Architecture & The Mental Model",
            author: { "@type": "Person", name: "Kunal Chandra Das" },
          }}
        />

        <Breadcrumbs items={[{ label: "The Mental Model", href: "/docs" }]} />

        <section id="mental-model" className="mb-12 scroll-mt-20">
          <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
            <span>Chapter 01</span>
            <span>•</span>
            <span>Core Concepts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
            Architecture & The Mental Model
          </h1>
          <p className="text-surface-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            <code className="text-leaf-600 dark:text-leaf-400 font-mono font-semibold">
              subatom-pulse
            </code>{" "}
            is an enterprise-grade WebSocket engine designed for Node.js 24+
            runtimes. It provides completely isolated connection lifecycles,
            structured JSON wire packet enforcement, deterministic outbound
            queue memory bounds, and native room routing without the bloat of
            HTTP fallback transports.
          </p>

          <Callout type="note" title="Pure WebSocket Protocol">
            subatom-pulse uses native WebSockets through{" "}
            <code className="font-mono">ws</code>. It is not Socket.IO
            compatible: the protocol is pure JSON WebSocket traffic with no HTTP
            long-polling overhead.
          </Callout>
        </section>

        <section id="core-pillars" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white tracking-tight mb-4">
            Three Architectural Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-5 rounded-xl">
              <div className="text-leaf-600 dark:text-leaf-400 text-base font-bold mb-2">
                1. Isolated Sockets
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">
                Every connection is an independent entity holding its own
                lifecycle state machine, bounded FIFO outbound buffer, and
                tracked event registry. A slow client never affects another
                client.
              </p>
            </div>
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-5 rounded-xl">
              <div className="text-leaf-600 dark:text-leaf-400 text-base font-bold mb-2">
                2. Inverted Room Index
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">
                Rooms are indexed sets in memory managed by{" "}
                <code className="font-mono">RoomRegistry</code>. Joining and
                leaving operates in O(1) complexity, and all rooms are
                automatically pruned on disconnect.
              </p>
            </div>
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-5 rounded-xl">
              <div className="text-leaf-600 dark:text-leaf-400 text-base font-bold mb-2">
                3. Bounded Backpressure
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">
                Outgoing traffic does not bloat process memory unchecked. Strict
                memory ceilings (
                <code className="font-mono">maxQueueBytes</code>) and policies (
                <code className="font-mono">drop-oldest</code>,{" "}
                <code className="font-mono">reject</code>) govern every frame.
              </p>
            </div>
          </div>
        </section>

        <section id="packet-sequence" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white tracking-tight mb-4">
            Packet Execution Flow
          </h2>
          <div className="bg-surface-900 border border-surface-800 rounded-xl p-5 font-mono text-xs overflow-x-auto text-slate-300">
            <pre className="leading-relaxed">
              {`┌────────────────┐     HTTP Upgrade (Authenticator)    ┌─────────────────────────┐
│ Client Connect │ ──────────────────────────────────> │ SocketServer Admission  │
└────────────────┘                                     └────────────┬────────────┘
                                                                    │ Authenticated
                                                                    ▼
┌──────────────────┐   Microtask Dequeue   ┌─────────────────────────────────────┐
│ WebSocket.send() │ <───────────────────  │ OutboundQueue (Per-Client Limits)   │
└──────────────────┘                       └──────────────────┬──────────────────┘
                                                              ▲
                                                              │ Packets Enqueued
┌──────────────────┐    Middleware Execution    ┌─────────────┴──────────────────┐
│ Event Handlers   │ <───────────────────────── │ PacketDecoder & Validator      │
└──────────────────┘                            └────────────────────────────────┘`}
            </pre>
          </div>
        </section>

        <section id="enterprise-guarantees" className="mb-12 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white tracking-tight mb-4">
            Enterprise Guarantees
          </h2>
          <ul className="space-y-3 text-xs text-surface-600 dark:text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-leaf-500 font-bold">•</span>
              <span>
                <strong>Bounded memory:</strong> inbound payload, connection
                count, message rate, queue message count, and queue byte limits
                are enforced.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-leaf-500 font-bold">•</span>
              <span>
                <strong>Backpressure policy:</strong>{" "}
                <code className="font-mono">reject</code>,{" "}
                <code className="font-mono">drop-oldest</code>,{" "}
                <code className="font-mono">drop-newest</code>, and{" "}
                <code className="font-mono">disconnect</code> are explicit
                per-connection policies.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-leaf-500 font-bold">•</span>
              <span>
                <strong>Graceful drain:</strong> accepted outbound frames are
                flushed before a connection closes during normal shutdown; new
                frames are rejected once draining starts.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-leaf-500 font-bold">•</span>
              <span>
                <strong>Zombie cleanup:</strong> periodic ping/pong checks
                terminate connections that miss their heartbeat deadline.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-leaf-500 font-bold">•</span>
              <span>
                <strong>Signal coordination:</strong>{" "}
                <code className="font-mono">installSignalHandlers()</code>{" "}
                installs idempotent SIGTERM and SIGINT handlers.
              </span>
            </li>
          </ul>
        </section>

        <Pagination
          next={{ title: "Zero-Config Quickstart", href: "/docs/quickstart" }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
