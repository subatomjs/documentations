import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";
import { Callout } from "../../../components/Callout";

export const metadata = {
  title: "Socket Instance API Reference",
  description:
    "Methods, properties, and lifecycle behaviors available on accepted server Socket instances.",
};

const socketSignatureTs = `class Socket {
  /** Unique connection identifier generated during admission */
  readonly id: string;

  /** Read-only authentication metadata populated during HTTP Upgrade */
  readonly metadata: Record<string, unknown>;

  /** Subscribes this socket to a named room */
  join(room: string): void;

  /** Unsubscribes this socket from a named room */
  leave(room: string): void;

  /** Registers an event handler scoped exclusively to this connection */
  on(
    event: string,
    handler: (
      data: unknown,
      ack?: (reply: unknown) => void
    ) => void | Promise<void>
  ): void;

  /** Delivers a message strictly to this connection */
  emit(event: string, data: unknown): void;

  /** Broadcasts a message to all members in a room, excluding this socket */
  to(room: string): { emit(event: string, data: unknown): void };

  /** Closes the transport immediately with WebSocket code 1000 */
  disconnect(): void;
}`;

const socketUsageTs = `import { subatomPulse } from "subatom-pulse";

const io = subatomPulse({
  path: "/ws",
  authenticator: async (req) => {
    // Populate metadata during HTTP upgrade handshake
    return {
      authenticated: true,
      metadata: { userId: "usr_42", role: "admin", team: "core" },
    };
  },
});

io.onConnection((socket) => {
  // 1. Read-only metadata inspection
  const userId = socket.metadata.userId as string;
  console.log(\`Socket connected: \${socket.id} (User: \${userId})\`);

  // 2. Room isolation: join user inbox and team broadcast rooms
  socket.join(\`user:\${userId}\`);
  socket.join("team:core");

  // 3. Direct messaging back to this specific socket
  socket.emit("session.ready", {
    socketId: socket.id,
    connectedAt: Date.now(),
  });

  // 4. Room emission excluding sender
  socket.to("team:core").emit("team.member_joined", {
    userId,
    socketId: socket.id,
  });

  // 5. Handling events with synchronous or asynchronous acknowledgements
  socket.on("message.send", async (data: { text?: string }, ack) => {
    if (!data?.text) {
      return ack?.({ ok: false, error: "Text payload required" });
    }

    // Forward to room peers
    socket.to("team:core").emit("message.received", {
      from: userId,
      text: data.text,
    });

    // Acknowledge receipt to caller
    ack?.({ ok: true, timestamp: Date.now() });
  });

  // 6. Manual termination
  socket.on("session.logout", () => {
    socket.disconnect(); // Closes transport with status code 1000
  });
});`;

const socketUsageJs = `const { subatomPulse } = require("subatom-pulse");

const io = subatomPulse({
  path: "/ws",
  authenticator: async (req) => {
    return {
      authenticated: true,
      metadata: { userId: "usr_42", role: "admin", team: "core" },
    };
  },
});

io.onConnection((socket) => {
  // 1. Read-only metadata inspection
  const userId = socket.metadata.userId;
  console.log(\`Socket connected: \${socket.id} (User: \${userId})\`);

  // 2. Room isolation: join user inbox and team broadcast rooms
  socket.join(\`user:\${userId}\`);
  socket.join("team:core");

  // 3. Direct messaging back to this specific socket
  socket.emit("session.ready", {
    socketId: socket.id,
    connectedAt: Date.now(),
  });

  // 4. Room emission excluding sender
  socket.to("team:core").emit("team.member_joined", {
    userId,
    socketId: socket.id,
  });

  // 5. Handling events with acknowledgements
  socket.on("message.send", async (data, ack) => {
    if (!data?.text) {
      return ack?.({ ok: false, error: "Text payload required" });
    }

    socket.to("team:core").emit("message.received", {
      from: userId,
      text: data.text,
    });

    ack?.({ ok: true, timestamp: Date.now() });
  });

  // 6. Manual termination
  socket.on("session.logout", () => {
    socket.disconnect();
  });
});`;

export default function SocketApiPage() {
  const toc = [
    { id: "definition", title: "Class Definition" },
    { id: "properties", title: "Instance Properties" },
    { id: "methods", title: "Instance Methods" },
    { id: "lifecycle", title: "Lifecycle & Cleanup Nuance" },
    { id: "usage", title: "Usage Example" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: "Socket API", href: "/docs/api/socket" }]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 04.2</span>
          <span>•</span>
          <span>Instance API</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Socket Instance API
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          A <code className="font-mono text-leaf-600 dark:text-leaf-400">Socket</code> represents one individual accepted connection admitted through the HTTP upgrade sequence[cite: 2]. Each instance manages its own lifecycle machine, event registry, bounded outbound queue, and room membership[cite: 1, 5].
        </p>

        {/* Class Definition */}
        <section id="definition" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Class Definition
          </h2>
          <p className="text-xs text-surface-500 mb-3">
            TypeScript signatures exported directly by <code className="font-mono">subatom-pulse</code>[cite: 2]:
          </p>
          <CodeBlock
            filename="Socket.d"
            singleCode={socketSignatureTs}
            language="typescript"
          />
        </section>

        {/* Properties Reference */}
        <section id="properties" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Instance Properties
          </h2>
          <div className="overflow-x-auto border border-surface-200 dark:border-surface-800 rounded-xl mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 text-surface-700 dark:text-surface-300 uppercase">
                <tr>
                  <th className="p-3.5">Property</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-800 bg-white dark:bg-surface-950 text-surface-600 dark:text-slate-300">
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    id
                  </td>
                  <td className="p-3.5 text-surface-400">string</td>
                  <td className="p-3.5">
                    Immutable unique connection identifier assigned when the connection passes upgrade admission[cite: 2, 4].
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    metadata
                  </td>
                  <td className="p-3.5 text-surface-400">
                    Record&lt;string, unknown&gt;
                  </td>
                  <td className="p-3.5">
                    Read-only object copied directly from <code className="font-mono">AuthResult.metadata</code> returned by your server <code className="font-mono">authenticator</code>[cite: 2, 4].
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Methods Reference */}
        <section id="methods" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Instance Methods
          </h2>
          <div className="space-y-4 text-xs text-surface-600 dark:text-slate-300">
            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <div className="flex items-center justify-between mb-1.5">
                <strong className="text-surface-900 dark:text-white font-mono text-sm">
                  emit(event: string, data: unknown): void
                </strong>
                <span className="text-[11px] font-mono text-leaf-600 dark:text-leaf-400 font-semibold">
                  Direct Target
                </span>
              </div>
              <p className="leading-relaxed">
                Serializes payload as JSON and pushes it into this connection&apos;s isolated <code className="font-mono">OutboundQueue</code>[cite: 1, 3]. It delivers strictly to this peer and does not trigger adapter broadcast events[cite: 2].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <div className="flex items-center justify-between mb-1.5">
                <strong className="text-surface-900 dark:text-white font-mono text-sm">
                  to(room: string).emit(event: string, data: unknown): void
                </strong>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Sender-Excluded Broadcast
                </span>
              </div>
              <p className="leading-relaxed">
                Sends the packet to every other connection currently registered in the specified room, <strong>excluding the calling socket</strong>. If a cluster adapter is present, it publishes across nodes[cite: 2, 3].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <div className="flex items-center justify-between mb-1.5">
                <strong className="text-surface-900 dark:text-white font-mono text-sm">
                  join(room: string): void
                </strong>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                  O(1) Set Mutation
                </span>
              </div>
              <p className="leading-relaxed">
                Adds the socket identifier to the in-memory <code className="font-mono">RoomRegistry</code> set in $O(1)$ algorithmic complexity.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <div className="flex items-center justify-between mb-1.5">
                <strong className="text-surface-900 dark:text-white font-mono text-sm">
                  leave(room: string): void
                </strong>
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  O(1) Set Mutation
                </span>
              </div>
              <p className="leading-relaxed">
                Removes the socket identifier from the room index[cite: 1, 2]. Future room broadcasts will no longer be addressed to this connection buffer[cite: 1, 3].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <div className="flex items-center justify-between mb-1.5">
                <strong className="text-surface-900 dark:text-white font-mono text-sm">
                  on(event: string, handler: Function): void
                </strong>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  Event Dispatcher
                </span>
              </div>
              <p className="leading-relaxed">
                Registers an event handler scoped to this socket[cite: 2]. Handlers can be synchronous or return <code className="font-mono">Promise&lt;void&gt;</code>. If an acknowledged event handler throws an exception, the engine catches it and sends an error ack with code <code className="font-mono">HANDLER_ERROR</code>[cite: 4].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <div className="flex items-center justify-between mb-1.5">
                <strong className="text-surface-900 dark:text-white font-mono text-sm">
                  disconnect(): void
                </strong>
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-semibold">
                  Graceful Close
                </span>
              </div>
              <p className="leading-relaxed">
                Immediately closes the underlying WebSocket connection frame with standard close code <code className="font-mono">1000</code>[cite: 2].
              </p>
            </div>
          </div>
        </section>

        {/* Lifecycle Nuance Callout */}
        <section id="lifecycle" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Lifecycle & Cleanup Semantics
          </h2>
          <Callout type="warning" title="Important Disconnect Event Distinction">
            Registering <code className="font-mono">socket.on(&quot;disconnect&quot;, ...)</code> behaves as an ordinary packet handler: it triggers only if a client explicitly sends a packet with type <code className="font-mono">&quot;disconnect&quot;</code>[cite: 4]. It is <strong>not</strong> automatically invoked when the transport layer closes or drops[cite: 4].
          </Callout>
          <Callout type="tip" title="Automatic Room Pruning">
            When a connection drops or closes, <code className="font-mono">subatom-pulse</code> unlinks all room memberships in <code className="font-mono">RoomRegistry</code>, deregisters heartbeats, and clears queued delivery buffers automatically to prevent memory leaks[cite: 1, 4, 5].
          </Callout>
        </section>

        {/* Usage Example */}
        <section id="usage" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Usage Example
          </h2>
          <p className="text-xs text-surface-500 mb-3">
            Common server patterns inside <code className="font-mono">io.onConnection((socket) =&gt; &#123; ... &#125;)</code>[cite: 2]:
          </p>
          <CodeBlock
            filename="socket-lifecycle"
            tsCode={socketUsageTs}
            jsCode={socketUsageJs}
          />
        </section>

        <Pagination
          prev={{ title: "SocketServer Options", href: "/docs/api/server" }}
          next={{ title: "SubAtomPulse Client API", href: "/docs/api/client" }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}