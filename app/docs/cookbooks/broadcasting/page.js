import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";

export const metadata = {
  title: "System & Admin Broadcasts",
  description:
    "Send server-wide or channel-wide notifications to all connected clients.",
};

const broadcastTs = `// 1. Broadcast to a specific room (includes all local and cluster members)
io.to("notifications:all").emit("system.announcement", {
  title: "Scheduled Maintenance",
  startsAt: Date.now() + 3600000
});

// 2. Broadcast to all members in a room, optionally excluding a specific connection ID
io.emitToRoom("project:42", "task.updated", { taskId: 101 }, socket.id);`;

const broadcastJs = `// 1. Broadcast to a specific room
io.to("notifications:all").emit("system.announcement", {
  title: "Scheduled Maintenance",
  startsAt: Date.now() + 3600000
});

// 2. Broadcast excluding specific socket
io.emitToRoom("project:42", "task.updated", { taskId: 101 }, socket.id);`;

export default function BroadcastingPage() {
  const toc = [{ id: "broadcast", title: "Broadcasting APIs" }];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Broadcasts", href: "/docs/cookbooks/broadcasting" },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 02.4</span>
          <span>•</span>
          <span>Broadcast Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          System & Admin Broadcasts
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Broadcast messages can be issued directly from the server instance (
          <code className="font-mono">io</code>) to rooms without requiring a
          client sender.
        </p>

        <section id="broadcast" className="mb-10 scroll-mt-20">
          <CodeBlock
            filename="broadcast"
            tsCode={broadcastTs}
            jsCode={broadcastJs}
          />
        </section>

        <Pagination
          prev={{
            title: "Acknowledgements",
            href: "/docs/cookbooks/acknowledgements",
          }}
          next={{
            title: "Outbound Backpressure",
            href: "/docs/reliability/backpressure",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
