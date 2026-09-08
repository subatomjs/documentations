import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { CodeBlock } from "../../../components/CodeBlock";
import { Pagination } from "../../../components/Pagination";
import { TableOfContents } from "../../../components/TableOfContents";

export const metadata = {
  title: "Auth Boundaries & Middleware Pipeline",
  description:
    "Secure WebSocket upgrades before admission and enforce role-based packet middleware.",
};

const middlewareCodeTs = `// Inbound Packet Middleware (runs after JSON decoding & validation)
io.use((packet, context, next) => {
  // Reject unauthenticated publishes to admin events
  if (packet.type === "event" && packet.event.startsWith("admin.")) {
    if (context.metadata.role !== "admin") {
      return next(new Error("Administrator credentials required"));
    }
  }
  next();
});`;

const middlewareCodeJs = `// Inbound Packet Middleware
io.use((packet, context, next) => {
  if (packet.type === "event" && packet.event.startsWith("admin.")) {
    if (context.metadata.role !== "admin") {
      return next(new Error("Administrator credentials required"));
    }
  }
  next();
});`;

export default function AuthMiddlewarePage() {
  const toc = [
    { id: "upgrade-auth", title: "Upgrade Authenticator" },
    { id: "middleware", title: "Packet Middleware Pipeline" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            {
              label: "Auth & Middleware",
              href: "/docs/reliability/auth-middleware",
            },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 03.3</span>
          <span>•</span>
          <span>Security Controls</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Auth Boundaries & Middleware Pipeline
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Authentication occurs during the HTTP Upgrade phase before any
          WebSocket connection object is instantiated, preventing
          unauthenticated clients from consuming transport memory.
        </p>

        <section id="upgrade-auth" className="mb-8 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Upgrade Deadlines
          </h2>
          <p className="text-xs text-surface-500 leading-relaxed mb-4">
            The <code className="font-mono">authenticator</code> hook receives
            the raw Node <code className="font-mono">IncomingMessage</code> and
            has a 5,000ms deadline (
            <code className="font-mono">authTimeoutMs</code>). If the deadline
            expires, the server returns HTTP 408.
          </p>
        </section>

        <section id="middleware" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Packet Middleware
          </h2>
          <CodeBlock
            filename="middleware"
            tsCode={middlewareCodeTs}
            jsCode={middlewareCodeJs}
          />
        </section>

        <Pagination
          prev={{
            title: "Zombie Sockets & Heartbeats",
            href: "/docs/reliability/heartbeats",
          }}
          next={{
            title: "Redis Cluster Scaling",
            href: "/docs/reliability/clustering",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
