import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";

export const metadata = {
  title: "Multi-Node Cluster Scaling with Redis",
  description:
    "Scale subatom-pulse horizontally across Kubernetes pods and Docker containers using Redis pub/sub.",
};

const redisAdapterTs = `import { SocketAdapter, AdapterMessage, subatomPulse } from "subatom-pulse";
import Redis from "ioredis";

export class RedisClusterAdapter implements SocketAdapter {
  private readonly channel = "pulse:cluster:bus";

  constructor(
    private readonly pub: Redis,
    private readonly sub: Redis
  ) {}

  public async publish(message: AdapterMessage): Promise<void> {
    await this.pub.publish(this.channel, JSON.stringify(message));
  }

  public async subscribe(handler: (message: AdapterMessage) => void): Promise<() => void> {
    await this.sub.subscribe(this.channel);

    const onMsg = (chan: string, raw: string) => {
      if (chan !== this.channel) return;
      try {
        const parsed = JSON.parse(raw) as AdapterMessage;
        handler(parsed);
      } catch {
        // Discard malformed bridge frames
      }
    };

    this.sub.on("message", onMsg);
    return () => {
      this.sub.off("message", onMsg);
      this.sub.unsubscribe(this.channel);
    };
  }

  public async close(): Promise<void> {
    await this.pub.quit();
    await this.sub.quit();
  }
}

// Instantiate with unique cluster node ID
const io = subatomPulse({
  nodeId: process.env.POD_NAME ?? \`node-\${process.pid}\`,
  adapter: new RedisClusterAdapter(new Redis(), new Redis())
});`;

const redisAdapterJs = `const { subatomPulse } = require("subatom-pulse");
const Redis = require("ioredis");

class RedisClusterAdapter {
  constructor(pub, sub) {
    this.pub = pub;
    this.sub = sub;
    this.channel = "pulse:cluster:bus";
  }

  async publish(message) {
    await this.pub.publish(this.channel, JSON.stringify(message));
  }

  async subscribe(handler) {
    await this.sub.subscribe(this.channel);

    const onMsg = (chan, raw) => {
      if (chan !== this.channel) return;
      try {
        handler(JSON.parse(raw));
      } catch {}
    };

    this.sub.on("message", onMsg);
    return () => {
      this.sub.off("message", onMsg);
      this.sub.unsubscribe(this.channel);
    };
  }

  async close() {
    await this.pub.quit();
    await this.sub.quit();
  }
}

const io = subatomPulse({
  nodeId: process.env.POD_NAME || \`node-\${process.pid}\`,
  adapter: new RedisClusterAdapter(new Redis(), new Redis())
});`;

export default function ClusteringPage() {
  const toc = [
    { id: "adapter-concept", title: "SocketAdapter Architecture" },
    { id: "redis-code", title: "Redis Adapter Code" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Cluster Scaling", href: "/docs/reliability/clustering" },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 03.4</span>
          <span>•</span>
          <span>Horizontal Scaling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Multi-Node Cluster Scaling with Redis
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          By default, <code className="font-mono">LocalAdapter</code> manages
          room broadcasting in single-process memory. To scale out across
          multiple Docker containers or Kubernetes pods, implement{" "}
          <code className="font-mono">SocketAdapter</code>.
        </p>

        <section id="adapter-concept" className="mb-8 scroll-mt-20">
          <p className="text-xs text-surface-500 leading-relaxed mb-4">
            Each server instance must be assigned a unique{" "}
            <code className="font-mono">nodeId</code>. The engine automatically
            ignores messages originating from its own{" "}
            <code className="font-mono">nodeId</code> to avoid duplicate
            loopback deliveries.
          </p>
        </section>

        <section id="redis-code" className="mb-10 scroll-mt-20">
          <CodeBlock
            filename="cluster-adapter"
            tsCode={redisAdapterTs}
            jsCode={redisAdapterJs}
          />
        </section>

        <Pagination
          prev={{
            title: "Auth Boundaries",
            href: "/docs/reliability/auth-middleware",
          }}
          next={{ title: "SocketServer Options", href: "/docs/api/server" }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
