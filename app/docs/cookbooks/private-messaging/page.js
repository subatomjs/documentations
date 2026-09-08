import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";

export const metadata = {
  title: "1-on-1 Direct Messaging Cookbook",
  description:
    "Implement scalable private 1-on-1 messaging using deterministic private rooms in subatom-pulse.",
};

const chatCodeTs = `// SERVER: Register private user inbox room on connection
io.onConnection((socket) => {
  const userId = String(socket.metadata.userId);
  const privateInbox = \`user:\${userId}\`;

  // Auto-subscribe socket to their personal room
  socket.join(privateInbox);

  // Listen for direct message dispatch
  socket.on("message.direct", (data: { toUserId?: string; text?: string }, ack) => {
    if (!data?.toUserId || !data?.text) {
      return ack?.({ ok: false, error: "Recipient 'toUserId' and 'text' required" });
    }

    // Deliver strictly to the recipient's personal room
    const targetRoom = \`user:\${data.toUserId}\`;
    socket.to(targetRoom).emit("chat.direct", {
      fromUserId: userId,
      text: data.text,
      sentAt: Date.now()
    });

    // Acknowledge receipt to sender
    ack?.({ ok: true, deliveredAt: Date.now() });
  });
});

// CLIENT: Alice sends a message to Bob
const alice = new SubAtomPulse("ws://localhost:3000/ws?user=alice&token=Bearer%20token");

alice.on("connect", async () => {
  const receipt = await alice.emitWithAck("message.direct", {
    toUserId: "bob",
    text: "Reviewing the PR now!"
  });
  console.log("Delivered to Bob's room:", receipt);
});`;

const chatCodeJs = `// SERVER: Register private user inbox room on connection
io.onConnection((socket) => {
  const userId = String(socket.metadata.userId);
  const privateInbox = \`user:\${userId}\`;

  socket.join(privateInbox);

  socket.on("message.direct", (data, ack) => {
    if (!data?.toUserId || !data?.text) {
      return ack?.({ ok: false, error: "Recipient 'toUserId' and 'text' required" });
    }

    const targetRoom = \`user:\${data.toUserId}\`;
    socket.to(targetRoom).emit("chat.direct", {
      fromUserId: userId,
      text: data.text,
      sentAt: Date.now()
    });

    ack?.({ ok: true, deliveredAt: Date.now() });
  });
});

// CLIENT: Alice sends a message to Bob
const alice = new SubAtomPulse("ws://localhost:3000/ws?user=alice&token=Bearer%20token");

alice.on("connect", async () => {
  const receipt = await alice.emitWithAck("message.direct", {
    toUserId: "bob",
    text: "Reviewing the PR now!"
  });
  console.log("Delivered to Bob's room:", receipt);
});`;

export default function PrivateMessagingPage() {
  const toc = [
    { id: "pattern", title: "The Private Room Pattern" },
    { id: "code", title: "Implementation Example" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            {
              label: "1-on-1 Messaging",
              href: "/docs/cookbooks/private-messaging",
            },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 02.1</span>
          <span>•</span>
          <span>Pattern Cookbooks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          One-to-One Private Direct Messaging
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          In high-performance WebSocket engines, sockets should never store
          direct in-memory references to other sockets. Instead,{" "}
          <code className="font-mono">subatom-pulse</code> leverages{" "}
          <strong>Deterministic Private Rooms</strong>.
        </p>

        <section id="pattern" className="mb-8 scroll-mt-20">
          <div className="p-5 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 text-xs text-surface-600 dark:text-slate-300 space-y-2">
            <h3 className="font-bold text-surface-900 dark:text-white text-sm mb-2">
              How It Works:
            </h3>
            <p>
              1. When user <code className="font-mono">user_101</code> connects,
              server invokes{" "}
              <code className="font-mono">
                socket.join(&quot;user:user_101&quot;)
              </code>
              .
            </p>
            <p>
              2. To message <code className="font-mono">user_101</code>, another
              socket emits to room{" "}
              <code className="font-mono">
                socket.to(&quot;user:user_101&quot;).emit(...)
              </code>
              .
            </p>
            <p>
              3. If a user has multiple active tabs or devices, all of them
              belong to the same room set and receive the message concurrently.
            </p>
          </div>
        </section>

        <section id="code" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Implementation
          </h2>
          <CodeBlock filename="chat" tsCode={chatCodeTs} jsCode={chatCodeJs} />
        </section>

        <Pagination
          prev={{ title: "Wire Protocol", href: "/docs/architecture" }}
          next={{
            title: "Group Rooms & Presence",
            href: "/docs/cookbooks/rooms-presence",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
