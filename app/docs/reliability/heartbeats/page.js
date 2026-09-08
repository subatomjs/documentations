import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";

export const metadata = {
  title: "Zombie Sockets & Heartbeats",
  description:
    "Detect dead connections and TCP half-open states with automated heartbeat sweeps.",
};

export default function HeartbeatsPage() {
  const toc = [
    { id: "detection", title: "Liveness Detection" },
    { id: "proxy-timing", title: "Proxy Timeout Tuning" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Heartbeats", href: "/docs/reliability/heartbeats" },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 03.2</span>
          <span>•</span>
          <span>Connection Health</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Zombie Sockets & Heartbeats
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          TCP connections can silently enter half-open states when a client
          abruptly loses connectivity (such as moving out of cellular range).
          The engine runs periodic ping/pong sweeps to detect and terminate
          zombie sockets.
        </p>

        <section id="detection" className="mb-8 scroll-mt-20">
          <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 text-xs space-y-2 text-surface-600 dark:text-slate-300">
            <p>
              •{" "}
              <code className="font-mono font-semibold">
                heartbeatIntervalMs
              </code>
              : Periodic ping interval (default 30,000ms / 30s).
            </p>
            <p>
              •{" "}
              <code className="font-mono font-semibold">
                heartbeatTimeoutMs
              </code>
              : Maximum window to receive Pong frame before termination (default
              5,000ms / 5s).
            </p>
          </div>
        </section>

        <section id="proxy-timing" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Reverse Proxy Timeout Rule
          </h2>
          <p className="text-xs text-surface-500 leading-relaxed">
            Ensure your reverse proxy (Nginx / Caddy / AWS ALB) read timeout is
            configured <strong>higher</strong> than{" "}
            <code className="font-mono">
              heartbeatIntervalMs + heartbeatTimeoutMs
            </code>{" "}
            (e.g., at least 75 seconds) so the proxy does not kill idle
            connections before the ping sweep occurs.
          </p>
        </section>

        <Pagination
          prev={{
            title: "Outbound Backpressure",
            href: "/docs/reliability/backpressure",
          }}
          next={{
            title: "Auth Boundaries & Middleware",
            href: "/docs/reliability/auth-middleware",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
