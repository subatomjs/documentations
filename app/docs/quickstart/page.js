import { TableOfContents } from "../../components/TableOfContents";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Pagination } from "../../components/Pagination";
import { CodeBlock } from "../../components/CodeBlock";
import { TerminalBlock } from "../../components/TerminalBlock";
import { Callout } from "../../components/Callout";

export const metadata = {
  title: "Zero-Config Quickstart",
  description:
    "Get up and running with subatom-pulse in minutes with complete server and client code.",
};

const serverQuickstartTs = `import http from "node:http";
import { subatomPulse } from "subatom-pulse";

const httpServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", timestamp: Date.now() }));
    return;
  }
  res.writeHead(404);
  res.end();
});

// Attach subatom-pulse directly to HTTP server upgrade pipeline
const io = subatomPulse({
  server: httpServer,
  path: "/ws",
  maxConnections: 10_000,
  rateLimitPerSec: 50,
  overflowPolicy: "drop-oldest",
  authenticator: async (req) => {
    const url = new URL(req.url ?? "/", \`http://\${req.headers.host}\`);
    const token = url.searchParams.get("token");
    const userId = url.searchParams.get("user") ?? "guest";

    if (!token || token !== "Bearer secret-app-token") {
      return { authenticated: false };
    }
    return { authenticated: true, userId, metadata: { userId, role: "member" } };
  }
});

io.onConnection((socket) => {
  console.log(\`[Connection Opened] ID: \${socket.id} for User: \${socket.metadata.userId}\`);

  // Greet new connection
  socket.emit("system.welcome", { id: socket.id, time: Date.now() });
});

// Idempotent SIGTERM/SIGINT teardown orchestration
io.installSignalHandlers();
httpServer.listen(3000, () => console.log("Server active on :3000"));`;

const serverQuickstartJs = `const http = require("node:http");
const { subatomPulse } = require("subatom-pulse");

const httpServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", timestamp: Date.now() }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = subatomPulse({
  server: httpServer,
  path: "/ws",
  maxConnections: 10_000,
  rateLimitPerSec: 50,
  overflowPolicy: "drop-oldest",
  authenticator: async (req) => {
    const url = new URL(req.url || "/", \`http://\${req.headers.host}\`);
    const token = url.searchParams.get("token");
    const userId = url.searchParams.get("user") || "guest";

    if (!token || token !== "Bearer secret-app-token") {
      return { authenticated: false };
    }
    return { authenticated: true, userId, metadata: { userId, role: "member" } };
  }
});

io.onConnection((socket) => {
  console.log(\`[Connection Opened] ID: \${socket.id} for User: \${socket.metadata.userId}\`);
  socket.emit("system.welcome", { id: socket.id, time: Date.now() });
});

io.installSignalHandlers();
httpServer.listen(3000, () => console.log("Server active on :3000"));`;

const clientQuickstartTs = `import { SubAtomPulse } from "subatom-pulse";

// Note: If running inside Node.js, inject native WebSocket into globalThis:
// import { WebSocket } from "ws"; globalThis.WebSocket = WebSocket as any;

const socket = new SubAtomPulse("ws://localhost:3000/ws", {
  auth: { token: "Bearer secret-app-token" },
  reconnect: true,
  reconnectAttempts: 10,
  reconnectDelayMs: 1500,
  autoConnect: true
});

socket.on("connect", () => {
  console.log("[WS Connected] Active state:", socket.state);
});

socket.on("system.welcome", (data) => {
  console.log("Handshake confirmation:", data);
});

socket.on("error", (err) => {
  console.error("Socket Protocol Error:", err);
});`;

const clientQuickstartJs = `const { SubAtomPulse } = require("subatom-pulse");

// In Node.js: globalThis.WebSocket = require("ws");

const socket = new SubAtomPulse("ws://localhost:3000/ws", {
  auth: { token: "Bearer secret-app-token" },
  reconnect: true,
  reconnectAttempts: 10,
  reconnectDelayMs: 1500,
  autoConnect: true
});

socket.on("connect", () => {
  console.log("[WS Connected] Active state:", socket.state);
});

socket.on("system.welcome", (data) => {
  console.log("Handshake confirmation:", data);
});

socket.on("error", (err) => {
  console.error("Socket Protocol Error:", err);
});`;

export default function QuickstartPage() {
  const toc = [
    { id: "installation", title: "Installation" },
    { id: "server-setup", title: "Server Setup" },
    { id: "client-setup", title: "Client Setup" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Zero-Config Quickstart", href: "/docs/quickstart" },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 01.2</span>
          <span>•</span>
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Zero-Config Quickstart
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Install the package and peer WebSocket dependencies into your modern
          TypeScript or JavaScript project.
        </p>

        <section id="installation" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Package Installation
          </h2>
          <TerminalBlock command="install subatom-pulse" />
        </section>

        <section id="server-setup" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            1. Server Setup
          </h2>
          <p className="text-xs text-surface-500 mb-4">
            Attach <code className="font-mono">subatomPulse</code> to an
            existing HTTP server to cleanly share TLS termination and health
            routes on the same port.
          </p>
          <CodeBlock
            filename="server"
            tsCode={serverQuickstartTs}
            jsCode={serverQuickstartJs}
          />
        </section>

        <section id="client-setup" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            2. Client Setup
          </h2>
          <p className="text-xs text-surface-500 mb-4">
            The client runs natively in browsers. If testing inside Node.js,
            inject <code className="font-mono">ws</code> into{" "}
            <code className="font-mono">globalThis.WebSocket</code>.
          </p>
          <CodeBlock
            filename="client"
            tsCode={clientQuickstartTs}
            jsCode={clientQuickstartJs}
          />
          <Callout type="tip" title="Automatic Reconnection">
            <code className="font-mono">SubAtomPulse</code> will automatically
            retry dropped connections every 1500ms by default. Buffered packets
            sent while offline flush as soon as the socket reopens.
          </Callout>
        </section>

        <Pagination
          prev={{ title: "The Mental Model", href: "/docs" }}
          next={{
            title: "Wire Protocol & Packet Grammar",
            href: "/docs/architecture",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
