import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";

export const metadata = {
  title: "SocketServer Options API Reference",
  description:
    "Complete reference matrix for subatomPulse and SocketServer configuration options.",
};

export default function ServerApiPage() {
  const toc = [
    { id: "factory", title: "subatomPulse Factory" },
    { id: "options-table", title: "Configuration Options" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: "SocketServer API", href: "/docs/api/server" }]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 04.1</span>
          <span>•</span>
          <span>Configuration Specs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          SocketServer Options Reference
        </h1>

        <section id="factory" className="mb-8 scroll-mt-20">
          <pre className="p-3 bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg font-mono text-xs text-surface-800 dark:text-slate-300">
            function subatomPulse(options?: ServerOptions): SocketServer;
          </pre>
        </section>

        <section id="options-table" className="mb-10 scroll-mt-20">
          <div className="overflow-x-auto border border-surface-200 dark:border-surface-800 rounded-xl mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 text-surface-700 dark:text-surface-300 uppercase">
                <tr>
                  <th className="p-3.5">Option</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Default</th>
                  <th className="p-3.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-800 bg-white dark:bg-surface-950 text-surface-600 dark:text-slate-300">
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    path
                  </td>
                  <td className="p-3.5 text-surface-400">string</td>
                  <td className="p-3.5">&quot;/&quot;</td>
                  <td className="p-3.5">
                    WebSocket upgrade path. Must begin with &quot;/&quot;.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    port
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">8080</td>
                  <td className="p-3.5">
                    Listener port when server is omitted (0-65535).
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    server
                  </td>
                  <td className="p-3.5 text-surface-400">http.Server</td>
                  <td className="p-3.5">null</td>
                  <td className="p-3.5">
                    Existing Node.js HTTP/HTTPS server upgrade attachment.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    maxPayloadBytes
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">1,048,576 (1MB)</td>
                  <td className="p-3.5">
                    Maximum incoming frame size passed to ws.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    maxConnections
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">10,000</td>
                  <td className="p-3.5">
                    Admission limit. Excess returns HTTP 503.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    rateLimitPerSec
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">100</td>
                  <td className="p-3.5">Sliding token-bucket per socket ID.</td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    maxQueueMessages
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">1,000</td>
                  <td className="p-3.5">
                    Maximum pending messages per outbound connection buffer.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    maxQueueBytes
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">4,194,304 (4MB)</td>
                  <td className="p-3.5">
                    Maximum pending bytes per outbound buffer.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    overflowPolicy
                  </td>
                  <td className="p-3.5 text-surface-400">OverflowPolicy</td>
                  <td className="p-3.5">&quot;reject&quot;</td>
                  <td className="p-3.5">
                    &quot;reject&quot; | &quot;drop-oldest&quot; |
                    &quot;drop-newest&quot; | &quot;disconnect&quot;
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    heartbeatIntervalMs
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">30,000</td>
                  <td className="p-3.5">Periodic ping sweep interval.</td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    heartbeatTimeoutMs
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">5,000</td>
                  <td className="p-3.5">
                    Pong response deadline before termination.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    authTimeoutMs
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">5,000</td>
                  <td className="p-3.5">
                    Authenticator deadline (returns HTTP 408 on timeout).
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    shutdownTimeoutMs
                  </td>
                  <td className="p-3.5 text-surface-400">number</td>
                  <td className="p-3.5">10,000</td>
                  <td className="p-3.5">
                    Drain deadline before force kill during close.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Pagination
          prev={{
            title: "Redis Clustering",
            href: "/docs/reliability/clustering",
          }}
          next={{ title: "Socket Instance API", href: "/docs/api/socket" }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
