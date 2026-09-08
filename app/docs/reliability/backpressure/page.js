import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { Callout } from "../../../components/Callout";

export const metadata = {
  title: "Outbound Backpressure & Memory Ceilings",
  description:
    "Prevent Node.js process exhaustion from slow clients with deterministic microtask queue bounds.",
};

export default function BackpressurePage() {
  const toc = [
    { id: "policies", title: "Overflow Policies" },
    { id: "config", title: "Memory Thresholds" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Backpressure", href: "/docs/reliability/backpressure" },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 03.1</span>
          <span>•</span>
          <span>Outbound Stability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Outbound Backpressure & Memory Ceilings
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Node.js WebSockets can easily exhaust server RAM if a slow client
          (such as a mobile user on 2G) receives high-throughput broadcasts.{" "}
          <code className="font-mono">subatom-pulse</code> eliminates this
          through its microtask-scheduled{" "}
          <code className="font-mono">OutboundQueue</code>.
        </p>

        <section id="policies" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Overflow Policies
          </h2>
          <div className="overflow-x-auto border border-surface-200 dark:border-surface-800 rounded-xl mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 text-surface-700 dark:text-surface-300 uppercase">
                <tr>
                  <th className="p-3.5">Policy</th>
                  <th className="p-3.5">Behavior on Queue Saturation</th>
                  <th className="p-3.5">Recommended Production Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-800 bg-white dark:bg-surface-950 text-surface-600 dark:text-slate-300">
                <tr>
                  <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">
                    reject
                  </td>
                  <td className="p-3.5">
                    Rejects incoming push immediately. Returns false from
                    sendPacket(); queue stays intact.
                  </td>
                  <td className="p-3.5">
                    Default policy. Best for transactional, query, or CRUD
                    request-reply streams.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-leaf-600 dark:text-leaf-400">
                    drop-oldest
                  </td>
                  <td className="p-3.5">
                    Shifts out older pending messages in FIFO order to
                    accommodate new frames.
                  </td>
                  <td className="p-3.5">
                    Stock tickers, real-time gaming position broadcasts, live
                    analytics dashboards.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-cyan-600 dark:text-cyan-400">
                    drop-newest
                  </td>
                  <td className="p-3.5">
                    Discards the latest incoming message without perturbing the
                    previously queued backlog.
                  </td>
                  <td className="p-3.5">
                    Telemetry buffers where earlier state snapshots must be
                    preserved.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-rose-600 dark:text-rose-400">
                    disconnect
                  </td>
                  <td className="p-3.5">
                    Immediately terminates the socket with WebSocket code 1008
                    (Backpressure violated).
                  </td>
                  <td className="p-3.5">
                    Zero-tolerance enterprise financial feeds where stale
                    delivery is illegal.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="config" className="mb-10 scroll-mt-20">
          <Callout type="tip" title="Sizing Production Buffers">
            Set <code className="font-mono">maxQueueBytes</code> (default 4MB)
            and <code className="font-mono">maxQueueMessages</code> (default
            1,000) based on your maximum tolerated memory per connection
            multiplied by your concurrent connection target.
          </Callout>
        </section>

        <Pagination
          prev={{ title: "Broadcasts", href: "/docs/cookbooks/broadcasting" }}
          next={{
            title: "Zombie Sockets & Heartbeats",
            href: "/docs/reliability/heartbeats",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
