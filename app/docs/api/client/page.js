import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";
import { Callout } from "../../../components/Callout";

export const metadata = {
  title: "SubAtomPulse Client API Reference",
  description:
    "Browser and Node.js client constructor options, instance methods, and lifecycle events.",
};

const clientSignatureTs = `interface ClientOptions {
  protocols?: string | string[];
  reconnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelayMs?: number;
  autoConnect?: boolean;
  auth?: { token?: string; [key: string]: unknown };
}

type ClientEventHandler = (data: unknown, ack?: (reply: unknown) => void) => void;

class SubAtomPulse {
  constructor(url: string, options?: ClientOptions);
  readonly connected: boolean;
  readonly state: "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";
  connect(): void;
  disconnect(): void;
  on(event: string, handler: ClientEventHandler): () => void;
  once(event: string, handler: ClientEventHandler): void;
  off(event: string, handler?: ClientEventHandler): void;
  emit(event: string, data: unknown, ack?: (reply: unknown) => void): void;
  emitWithAck<T = unknown>(event: string, data: unknown, timeoutMs?: number): Promise<T>;
}`;

const clientUsageTs = `import { SubAtomPulse } from "subatom-pulse";

// When running under Node.js, inject a WebSocket implementation:
// import { WebSocket } from "ws";
// globalThis.WebSocket = WebSocket as any;

const socket = new SubAtomPulse("ws://localhost:3000/ws", {
  auth: { token: "Bearer secret-app-token" },
  reconnect: true,
  reconnectAttempts: 10,
  reconnectDelayMs: 1500,
  autoConnect: true,
});

// Built-in client connection lifecycle events
socket.on("connect", () => {
  console.log("[WS Connected] State:", socket.state);
});

socket.on("disconnect", ({ code, reason }) => {
  console.log("[WS Closed]", code, reason);
});

socket.on("error", (err) => {
  console.error("[WS Error]", err);
});

// Fire-and-forget message
socket.emit("presence.ping", { timestamp: Date.now() });

// Request-response RPC with 5000ms timeout
try {
  const reply = await socket.emitWithAck<{ status: string }>(
    "order.status",
    { orderId: "ord_101" },
    5000
  );
  console.log("Order confirmed:", reply.status);
} catch (err: any) {
  console.error("Ack rejected or timed out:", err.message);
}`;

const clientUsageJs = `const { SubAtomPulse } = require("subatom-pulse");

// When running under Node.js, inject a WebSocket implementation:
// const { WebSocket } = require("ws");
// globalThis.WebSocket = WebSocket;

const socket = new SubAtomPulse("ws://localhost:3000/ws", {
  auth: { token: "Bearer secret-app-token" },
  reconnect: true,
  reconnectAttempts: 10,
  reconnectDelayMs: 1500,
  autoConnect: true,
});

// Built-in client connection lifecycle events
socket.on("connect", () => {
  console.log("[WS Connected] State:", socket.state);
});

socket.on("disconnect", ({ code, reason }) => {
  console.log("[WS Closed]", code, reason);
});

socket.on("error", (err) => {
  console.error("[WS Error]", err);
});

// Fire-and-forget message
socket.emit("presence.ping", { timestamp: Date.now() });

// Request-response RPC with 5000ms timeout
try {
  const reply = await socket.emitWithAck(
    "order.status",
    { orderId: "ord_101" },
    5000
  );
  console.log("Order confirmed:", reply.status);
} catch (err) {
  console.error("Ack rejected or timed out:", err.message);
}`;

export default function ClientApiPage() {
  const toc = [
    { id: "signature", title: "Class Definition" },
    { id: "options", title: "Client Options" },
    { id: "methods", title: "Instance Methods" },
    { id: "events", title: "Built-In Events" },
    { id: "usage", title: "Usage Example" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: "Client API", href: "/docs/api/client" }]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 04.3</span>
          <span>•</span>
          <span>Client SDK</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          SubAtomPulse Client API
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          The <code className="font-mono text-leaf-600 dark:text-leaf-400">SubAtomPulse</code> client coordinates WebSocket connection state, offline message buffering, reconnection timers, and RPC acknowledgements[cite: 2, 4].
        </p>

        {/* Class Signature Code Block */}
        <section id="signature" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Class Definition
          </h2>
          <p className="text-xs text-surface-500 mb-3">
            TypeScript interfaces and signatures exported directly by <code className="font-mono">subatom-pulse</code>[cite: 2]:
          </p>
          <CodeBlock
            filename="SubAtomPulse.d"
            singleCode={clientSignatureTs}
            language="typescript"
          />
        </section>

        {/* Options Table */}
        <section id="options" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Client Options (<code className="font-mono text-sm">ClientOptions</code>)
          </h2>
          <div className="overflow-x-auto border border-surface-200 dark:border-surface-800 rounded-xl mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 text-surface-700 dark:text-surface-300 uppercase">
                <tr>
                  <th className="p-3.5">Option</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Default</th>
                  <th className="p-3.5">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-800 bg-white dark:bg-surface-950 text-surface-600 dark:text-slate-300">
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    protocols[cite: 2]
                  </td>
                  <td className="p-3.5 text-surface-400">string | string[][cite: 2]</td>
                  <td className="p-3.5">none[cite: 2]</td>
                  <td className="p-3.5">
                    WebSocket subprotocol or subprotocols passed to the native constructor[cite: 2].
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    reconnect[cite: 2]
                  </td>
                  <td className="p-3.5 text-surface-400">boolean[cite: 2]</td>
                  <td className="p-3.5">true[cite: 2]</td>
                  <td className="p-3.5">
                    Retry automatically after an unplanned close[cite: 2]. Set to <code className="font-mono">false</code> for one-shot connections[cite: 4].
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    reconnectAttempts[cite: 2]
                  </td>
                  <td className="p-3.5 text-surface-400">number[cite: 2]</td>
                  <td className="p-3.5">Infinity[cite: 2]</td>
                  <td className="p-3.5">
                    Maximum retry count before aborting reconnect attempts[cite: 2].
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    reconnectDelayMs[cite: 2]
                  </td>
                  <td className="p-3.5 text-surface-400">number[cite: 2]</td>
                  <td className="p-3.5">1500[cite: 2]</td>
                  <td className="p-3.5">Fixed delay (in milliseconds) between reconnection attempts[cite: 2].</td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    autoConnect[cite: 2]
                  </td>
                  <td className="p-3.5 text-surface-400">boolean[cite: 2]</td>
                  <td className="p-3.5">true[cite: 2]</td>
                  <td className="p-3.5">
                    Automatically initiate connection handshake during class instantiation[cite: 2].
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 text-leaf-600 dark:text-leaf-400 font-bold">
                    auth.token[cite: 2]
                  </td>
                  <td className="p-3.5 text-surface-400">string[cite: 2]</td>
                  <td className="p-3.5">none[cite: 2]</td>
                  <td className="p-3.5">
                    Appends token to the connection URL query string (<code className="font-mono">?token=...</code>)[cite: 2].
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Method Details */}
        <section id="methods" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Instance Methods & Semantics
          </h2>
          <div className="space-y-4 text-xs text-surface-600 dark:text-slate-300">
            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <strong className="block text-surface-900 dark:text-white font-mono text-sm mb-1">
                connect(): void[cite: 2]
              </strong>
              <p>
                Opens the WebSocket connection[cite: 2]. Use when <code className="font-mono">autoConnect: false</code> is set[cite: 4].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <strong className="block text-surface-900 dark:text-white font-mono text-sm mb-1">
                disconnect(): void[cite: 2]
              </strong>
              <p>
                Cancels pending reconnection timers, clears buffered unsent frames, rejects open <code className="font-mono">emitWithAck</code> promises, and closes the transport with WebSocket code 1000[cite: 2, 4].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <strong className="block text-surface-900 dark:text-white font-mono text-sm mb-1">
                on(event, handler): () =&gt; void[cite: 2]
              </strong>
              <p>
                Registers an event handler and returns an unsubscribe cleanup function[cite: 2].
              </p>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
              <strong className="block text-surface-900 dark:text-white font-mono text-sm mb-1">
                emitWithAck(event, data, timeoutMs?): Promise&lt;T&gt;[cite: 2]
              </strong>
              <p>
                Sends a packet requesting server acknowledgement[cite: 2]. Defaults to a 5,000ms timeout[cite: 2]. Rejects if the server throws an error or the timeout expires[cite: 1, 2].
              </p>
            </div>
          </div>
        </section>

        {/* Built-In Events */}
        <section id="events" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
            Built-in Client Lifecycle Events
          </h2>
          <p className="text-xs text-surface-500 mb-3">
            The client delivers three non-reserved lifecycle events locally[cite: 2]:
          </p>
          <ul className="space-y-2 text-xs text-surface-600 dark:text-slate-300">
            <li className="flex items-start space-x-2">
              <code className="font-mono text-leaf-600 dark:text-leaf-400 font-bold">connect</code>
              <span>— Emitted when the WebSocket connection is established and ready[cite: 2].</span>
            </li>
            <li className="flex items-start space-x-2">
              <code className="font-mono text-leaf-600 dark:text-leaf-400 font-bold">disconnect</code>
              <span>— Emitted when connection closes[cite: 2]. Receives <code className="font-mono">{`{ code, reason }`}</code>[cite: 2].</span>
            </li>
            <li className="flex items-start space-x-2">
              <code className="font-mono text-leaf-600 dark:text-leaf-400 font-bold">error</code>
              <span>— Emitted for transport errors or server protocol errors (<code className="font-mono">{`{ code, message, details? }`}</code>)[cite: 2].</span>
            </li>
          </ul>

          <Callout type="note" title="Buffer Flushing on Connect">
            Packets sent via <code className="font-mono">emit()</code> while offline are retained in an in-memory queue and flushed sequentially after the next successful connection[cite: 2, 4].
          </Callout>
        </section>

        {/* Usage Example Code Block with JS/TS Switching */}
        <section id="usage" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Usage Example
          </h2>
          <p className="text-xs text-surface-500 mb-3">
            Switch between JavaScript and TypeScript using the switcher in the header:
          </p>
          <CodeBlock
            filename="client-example"
            tsCode={clientUsageTs}
            jsCode={clientUsageJs}
          />
        </section>

        <Pagination
          prev={{ title: "Socket Instance API", href: "/docs/api/socket" }}
          next={{
            title: "Metrics & Observability",
            href: "/docs/api/observability",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}