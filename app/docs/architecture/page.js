import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Pagination } from "../../components/Pagination";
import { TableOfContents } from "../../components/TableOfContents";

export const metadata = {
  title: "Wire Protocol & Packet Grammar",
  description:
    "Detailed specification of subatom-pulse JSON packet types, schemas, and connection state machine.",
};

export default function WireProtocolPage() {
  const toc = [
    { id: "grammar", title: "Packet Grammar" },
    { id: "packet-table", title: "Discriminated Packets" },
    { id: "state-machine", title: "Connection State Machine" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: "Wire Protocol", href: "/docs/architecture" }]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 01.3</span>
          <span>•</span>
          <span>Protocol Specification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Wire Protocol & Packet Grammar
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          The engine does not pass unstructured strings or raw binary blobs to
          application handlers. Everything is decoded and validated via{" "}
          <code className="font-mono">PacketValidator</code> against the rigid{" "}
          <code className="font-mono">SocketPacket</code> discriminated union.
        </p>

        <section id="grammar" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Packet Types
          </h2>
          <div className="overflow-x-auto border border-surface-200 dark:border-surface-800 rounded-xl mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 text-surface-700 dark:text-surface-300 uppercase">
                <tr>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Key Properties</th>
                  <th className="p-3.5">Payload Schema</th>
                  <th className="p-3.5">Engine Semantics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-800 bg-white dark:bg-surface-950 text-surface-600 dark:text-slate-300">
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    event
                  </td>
                  <td className="p-3.5">event, data, [id], [seq]</td>
                  <td className="p-3.5 text-surface-400 text-[11px]">{`{ type: "event", event: "chat", data: {...}, id?: "ack_1" }`}</td>
                  <td className="p-3.5">
                    Application message. When{" "}
                    <code className="font-mono">id</code> is populated, peer
                    must reply with an ack.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    ack
                  </td>
                  <td className="p-3.5">id, [data], [error]</td>
                  <td className="p-3.5 text-surface-400 text-[11px]">{`{ type: "ack", id: "ack_1", data?: {...}, error?: { code, message } }`}</td>
                  <td className="p-3.5">
                    Correlated receipt acknowledging a previous event
                    invocation. Resolves or rejects Promise.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-rose-600 dark:text-rose-400 font-bold">
                    error
                  </td>
                  <td className="p-3.5">code, message, [id], [details]</td>
                  <td className="p-3.5 text-surface-400 text-[11px]">{`{ type: "error", code: "RATE_LIMIT_EXCEEDED", message: "..." }`}</td>
                  <td className="p-3.5">
                    System or codec violation emitted directly to peer&apos;s
                    socket.on(&quot;error&quot;) listener.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-cyan-600 dark:text-cyan-400 font-bold">
                    connect
                  </td>
                  <td className="p-3.5">[sessionId]</td>
                  <td className="p-3.5 text-surface-400 text-[11px]">{`{ type: "connect", sessionId?: "sess_123" }`}</td>
                  <td className="p-3.5">
                    Internal handshaking packet confirming transport upgrade.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-surface-500 font-bold">
                    disconnect
                  </td>
                  <td className="p-3.5">[code], [reason]</td>
                  <td className="p-3.5 text-surface-400 text-[11px]">{`{ type: "disconnect", code: 1000, reason: "Normal" }`}</td>
                  <td className="p-3.5">
                    Explicit shutdown frame informing the remote peer to close
                    immediately.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="state-machine" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Connection State Machine
          </h2>
          <p className="text-xs text-surface-500 mb-4">
            Connections transition strictly through deterministic states.
            Handlers and heartbeat listeners are unlinked cleanly upon entering{" "}
            <code className="font-mono">CLOSED</code>.
          </p>
          <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 font-mono text-xs text-center text-leaf-700 dark:text-leaf-300">
            CONNECTING ➔ AUTHENTICATING ➔ OPEN ➔ CLOSING ➔ TERMINATING ➔ CLOSED
          </div>
        </section>

        <Pagination
          prev={{ title: "Zero-Config Quickstart", href: "/docs/quickstart" }}
          next={{
            title: "1-on-1 Direct Messaging",
            href: "/docs/cookbooks/private-messaging",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
