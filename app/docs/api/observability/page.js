import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";

export const metadata = {
  title: "Metrics & Observability API",
  description:
    "Expose real-time engine vitals, queue overflows, and dropped bytes to Prometheus or Datadog.",
};

export default function ObservabilityPage() {
  const toc = [
    { id: "metrics-cards", title: "Telemetry Metrics" },
    { id: "api-call", title: "getMetrics() Method" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: "Observability", href: "/docs/api/observability" }]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 04.4</span>
          <span>•</span>
          <span>Observability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Metrics & Real-Time Telemetry
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Expose real-time engine vitals to Prometheus or Datadog via{" "}
          <code className="font-mono">io.getMetrics()</code>.
        </p>

        <section id="metrics-cards" className="mb-8 scroll-mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 font-mono text-xs">
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4 rounded-xl">
              <span className="text-surface-400 block mb-1">
                activeConnections
              </span>
              <span className="text-surface-900 dark:text-white text-lg font-bold">
                Gauge
              </span>
              <span className="text-[10px] text-surface-400 block mt-1">
                Live active sockets
              </span>
            </div>
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4 rounded-xl">
              <span className="text-surface-400 block mb-1">messagesSent</span>
              <span className="text-leaf-600 dark:text-leaf-400 text-lg font-bold">
                Counter
              </span>
              <span className="text-[10px] text-surface-400 block mt-1">
                Frames delivered
              </span>
            </div>
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4 rounded-xl">
              <span className="text-surface-400 block mb-1">
                queueOverflows
              </span>
              <span className="text-amber-600 dark:text-amber-400 text-lg font-bold">
                Counter
              </span>
              <span className="text-[10px] text-surface-400 block mt-1">
                Backpressure hits
              </span>
            </div>
            <div className="bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4 rounded-xl">
              <span className="text-surface-400 block mb-1">droppedBytes</span>
              <span className="text-rose-600 dark:text-rose-400 text-lg font-bold">
                Bytes
              </span>
              <span className="text-[10px] text-surface-400 block mt-1">
                Evicted frames
              </span>
            </div>
          </div>
        </section>

        <section id="api-call" className="mb-10 scroll-mt-20">
          <pre className="p-4 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl font-mono text-xs text-surface-800 dark:text-slate-300">
            {`const snapshot = io.getMetrics();
// {
//   activeConnections: 1204,
//   totalConnections: 45012,
//   messagesReceived: 981240,
//   messagesSent: 2450120,
//   messageErrors: 2,
//   queueOverflows: 0,
//   droppedBytes: 0,
//   adapterErrors: 0
// }`}
          </pre>
        </section>

        <Pagination
          prev={{ title: "SubAtomPulse Client API", href: "/docs/api/client" }}
          next={{ title: "Production Proxy & Nginx", href: "/docs/deployment" }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
