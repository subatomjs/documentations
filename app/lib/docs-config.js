export const SITE_METADATA = {
  title: "subatom-pulse | Enterprise Isolated WebSocket Engine for Node.js",
  description:
    "Production-grade Node.js WebSocket engine featuring isolated socket lifecycles, microtask backpressure memory limits, O(1) inverted rooms, and RPC acknowledgements.",
  siteUrl: "https://pulse.subatomjs.dev",
  githubUrl: "https://github.com/subatomjs/subatom-pulse",
  npmUrl: "https://www.npmjs.com/package/subatom-pulse",
  maintainer: "Kunal Chandra Das <kunal@subatomjs.dev>",
  license: "MIT",
  version: "v1.1.0",
  logos: {
    dark: "/subatom_dark_logo.png",
    light: "/subatom_lite_logo.png",
    short: "/subatom_short_logo.png",
  },
};

export const DOCS_NAVIGATION = [
  {
    title: "01. Architecture & Engine Core",
    items: [
      { title: "The Mental Model", href: "/docs" },
      { title: "Zero-Config Quickstart", href: "/docs/quickstart" },
      { title: "Wire Protocol & Packets", href: "/docs/architecture" },
    ],
  },
  {
    title: "02. Real-Time Cookbooks",
    items: [
      {
        title: "1-on-1 Direct Messaging",
        href: "/docs/cookbooks/private-messaging",
      },
      {
        title: "Group Rooms & Presence",
        href: "/docs/cookbooks/rooms-presence",
      },
      {
        title: "Request-Response (Ack API)",
        href: "/docs/cookbooks/acknowledgements",
      },
      {
        title: "System & Admin Broadcasts",
        href: "/docs/cookbooks/broadcasting",
      },
    ],
  },
  {
    title: "03. Reliability & Guardrails",
    items: [
      {
        title: "Outbound Backpressure",
        href: "/docs/reliability/backpressure",
      },
      {
        title: "Zombie Sockets & Heartbeats",
        href: "/docs/reliability/heartbeats",
      },
      {
        title: "Auth Boundaries & Middleware",
        href: "/docs/reliability/auth-middleware",
      },
      { title: "Redis Cluster Scaling", href: "/docs/reliability/clustering" },
    ],
  },
  {
    title: "04. Full API Reference Matrix",
    items: [
      { title: "SocketServer Options", href: "/docs/api/server" },
      { title: "Socket Instance API", href: "/docs/api/socket" },
      { title: "SubAtomPulse Client", href: "/docs/api/client" },
      { title: "Metrics & Observability", href: "/docs/api/observability" },
      { title: "Production Proxy & Nginx", href: "/docs/deployment" },
    ],
  },
];

export const SEARCH_INDEX = [
  {
    title: "Architecture & Mental Model",
    href: "/docs",
    category: "Concepts",
    keywords: [
      "mental model",
      "isolated sockets",
      "room registry",
      "backpressure",
    ],
  },
  {
    title: "Zero-Config Quickstart",
    href: "/docs/quickstart",
    category: "Guides",
    keywords: ["install", "npm", "server.ts", "client.ts", "connect"],
  },
  {
    title: "Wire Protocol & Packet Grammar",
    href: "/docs/architecture",
    category: "Protocol",
    keywords: [
      "packet",
      "grammar",
      "event",
      "ack",
      "error",
      "lifecycle",
      "validator",
    ],
  },
  {
    title: "One-to-One Private Messaging",
    href: "/docs/cookbooks/private-messaging",
    category: "Cookbook",
    keywords: ["direct message", "private chat", "user room", "multi-tab"],
  },
  {
    title: "Group Rooms & Presence",
    href: "/docs/cookbooks/rooms-presence",
    category: "Cookbook",
    keywords: ["room", "join", "leave", "broadcast", "presence", "peer"],
  },
  {
    title: "Request-Response Acknowledgements",
    href: "/docs/cookbooks/acknowledgements",
    category: "Cookbook",
    keywords: ["emitWithAck", "rpc", "timeout", "acknowledgement", "callback"],
  },
  {
    title: "System & Admin Broadcasts",
    href: "/docs/cookbooks/broadcasting",
    category: "Cookbook",
    keywords: ["admin", "broadcast", "emitToRoom", "announcement"],
  },
  {
    title: "Outbound Backpressure & Memory Ceilings",
    href: "/docs/reliability/backpressure",
    category: "Reliability",
    keywords: [
      "overflow",
      "reject",
      "drop-oldest",
      "drop-newest",
      "maxQueueBytes",
    ],
  },
  {
    title: "Zombie Sockets & Heartbeats",
    href: "/docs/reliability/heartbeats",
    category: "Reliability",
    keywords: ["ping", "pong", "zombie", "heartbeatIntervalMs", "dead peer"],
  },
  {
    title: "Auth Boundaries & Middleware",
    href: "/docs/reliability/auth-middleware",
    category: "Reliability",
    keywords: [
      "authenticator",
      "middleware",
      "token",
      "http upgrade",
      "401",
      "408",
    ],
  },
  {
    title: "Redis Cluster Scaling",
    href: "/docs/reliability/clustering",
    category: "Reliability",
    keywords: [
      "redis",
      "adapter",
      "cluster",
      "multi-node",
      "horizontal scaling",
      "nodeId",
    ],
  },
  {
    title: "SocketServer Options Reference",
    href: "/docs/api/server",
    category: "API Reference",
    keywords: [
      "SocketServer",
      "subatomPulse",
      "options",
      "port",
      "maxPayloadBytes",
    ],
  },
  {
    title: "Socket Instance API",
    href: "/docs/api/socket",
    category: "API Reference",
    keywords: [
      "socket.id",
      "socket.join",
      "socket.emit",
      "socket.to",
      "metadata",
    ],
  },
  {
    title: "SubAtomPulse Client API",
    href: "/docs/api/client",
    category: "API Reference",
    keywords: ["SubAtomPulse", "client", "autoConnect", "reconnectAttempts"],
  },
  {
    title: "Metrics & Telemetry",
    href: "/docs/api/observability",
    category: "API Reference",
    keywords: [
      "getMetrics",
      "activeConnections",
      "messagesSent",
      "droppedBytes",
      "telemetry",
    ],
  },
  {
    title: "Production Deployment (Nginx / ALB)",
    href: "/docs/deployment",
    category: "Operations",
    keywords: ["nginx", "caddy", "alb", "tls", "proxy", "upgrade", "timeout"],
  },
];