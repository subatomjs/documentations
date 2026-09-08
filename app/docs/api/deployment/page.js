import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";

export const metadata = {
  title: "Production Deployment (Nginx, Caddy, AWS ALB)",
  description:
    "Production operations guide: Nginx reverse proxy configuration, TLS termination, ALB timeouts, and signal handling.",
};

const nginxConfig = `map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    server_name realtime.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name realtime.example.com;

    ssl_certificate     /etc/letsencrypt/live/realtime.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/realtime.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location = /ws {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Must exceed server heartbeatIntervalMs (30s) + heartbeatTimeoutMs (5s)
        proxy_read_timeout 75s;
        proxy_send_timeout 75s;
        proxy_buffering off;
    }

    location = /health {
        proxy_pass http://127.0.0.1:3000;
    }
}`;

const caddyConfig = `realtime.example.com {
    @websocket path /ws
    reverse_proxy @websocket 127.0.0.1:3000 {
        transport http {
            read_timeout 75s
            write_timeout 75s
        }
    }

    @health path /health
    reverse_proxy @health 127.0.0.1:3000
}`;

export default function DeploymentPage() {
  const toc = [
    { id: "nginx", title: "Nginx Reverse Proxy" },
    { id: "caddy", title: "Caddy Server" },
    { id: "alb", title: "AWS Application Load Balancer" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[{ label: "Production Deployment", href: "/docs/deployment" }]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 04.5</span>
          <span>•</span>
          <span>Operations & Reverse Proxy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Production Proxy Configuration
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Always terminate TLS at your reverse proxy, disable proxy buffering,
          and set read timeouts higher than{" "}
          <code className="font-mono">
            heartbeatIntervalMs + heartbeatTimeoutMs
          </code>{" "}
          (minimum 75s).
        </p>

        <section id="nginx" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Nginx Reverse Proxy
          </h2>
          <CodeBlock
            filename="/etc/nginx/sites-available/realtime.conf"
            singleCode={nginxConfig}
            language="nginx"
          />
        </section>

        <section id="caddy" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Caddy v2 Configuration
          </h2>
          <CodeBlock
            filename="Caddyfile"
            singleCode={caddyConfig}
            language="caddyfile"
          />
        </section>

        <section id="alb" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            AWS Application Load Balancer (ALB)
          </h2>
          <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 text-xs text-surface-600 dark:text-slate-300 space-y-2">
            <p>
              1. Forward HTTPS port 443 with ACM certificate to HTTP target
              group on port 3000.
            </p>
            <p>
              2. Set target group health check path to{" "}
              <code className="font-mono">/health</code>, status 200.
            </p>
            <p>
              3. Set ALB idle timeout attribute to at least{" "}
              <strong>75 seconds</strong>.
            </p>
          </div>
        </section>

        <Pagination
          prev={{
            title: "Metrics & Telemetry",
            href: "/docs/api/observability",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
