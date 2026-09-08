import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";

export const metadata = {
  title: "Group Rooms & Real-Time Presence",
  description:
    "Learn how to manage dynamic room subscriptions, member presence broadcasts, and automatic eviction.",
};

const roomCodeTs = `io.onConnection((socket) => {
  const userId = String(socket.metadata.userId);

  // 1. Join Room & Broadcast Presence
  socket.on("room.join", (data: { room?: string }, ack) => {
    if (!data?.room) return ack?.({ ok: false, error: "room name required" });

    socket.join(data.room);
    // Notify other peers in room (excludes caller)
    socket.to(data.room).emit("room.peer-joined", { room: data.room, userId });
    ack?.({ ok: true, room: data.room });
  });

  // 2. Room Messaging (Excludes caller automatically)
  socket.on("room.message", (data: { room?: string; text?: string }, ack) => {
    if (!data?.room || !data.text) {
      return ack?.({ ok: false, error: "Missing room or text payload" });
    }
    socket.to(data.room).emit("room.message", { from: userId, text: data.text });
    ack?.({ ok: true });
  });

  // 3. Voluntary Leave
  socket.on("room.leave", (data: { room?: string }, ack) => {
    if (!data?.room) return ack?.({ ok: false, error: "room required" });

    socket.leave(data.room);
    socket.to(data.room).emit("room.peer-left", { room: data.room, userId });
    ack?.({ ok: true });
  });
});`;

const roomCodeJs = `io.onConnection((socket) => {
  const userId = String(socket.metadata.userId);

  socket.on("room.join", (data, ack) => {
    if (!data?.room) return ack?.({ ok: false, error: "room name required" });

    socket.join(data.room);
    socket.to(data.room).emit("room.peer-joined", { room: data.room, userId });
    ack?.({ ok: true, room: data.room });
  });

  socket.on("room.message", (data, ack) => {
    if (!data?.room || !data.text) {
      return ack?.({ ok: false, error: "Missing room or text payload" });
    }
    socket.to(data.room).emit("room.message", { from: userId, text: data.text });
    ack?.({ ok: true });
  });

  socket.on("room.leave", (data, ack) => {
    if (!data?.room) return ack?.({ ok: false, error: "room required" });

    socket.leave(data.room);
    socket.to(data.room).emit("room.peer-left", { room: data.room, userId });
    ack?.({ ok: true });
  });
});`;

export default function RoomsPresencePage() {
  const toc = [
    { id: "overview", title: "Room Routing Concepts" },
    { id: "code", title: "Complete Room Pipeline" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            { label: "Group Rooms", href: "/docs/cookbooks/rooms-presence" },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 02.2</span>
          <span>•</span>
          <span>Room Workflows</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Group Rooms & Presence Management
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Calling <code className="font-mono">socket.to(room).emit(...)</code>{" "}
          delivers to{" "}
          <strong>every other peer in the room, excluding the sender</strong>.
          Calling <code className="font-mono">io.to(room).emit(...)</code>{" "}
          delivers to <strong>everyone</strong>.
        </p>

        <section id="overview" className="mb-8 scroll-mt-20">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
            Automatic Eviction
          </h2>
          <p className="text-xs text-surface-500 leading-relaxed">
            When a connection terminates or drops,{" "}
            <code className="font-mono">RoomRegistry</code> automatically purges
            that socket identifier from all active rooms in O(1) time without
            manual cleanup.
          </p>
        </section>

        <section id="code" className="mb-10 scroll-mt-20">
          <CodeBlock filename="rooms" tsCode={roomCodeTs} jsCode={roomCodeJs} />
        </section>

        <Pagination
          prev={{
            title: "1-on-1 Messaging",
            href: "/docs/cookbooks/private-messaging",
          }}
          next={{
            title: "Request-Response (Ack API)",
            href: "/docs/cookbooks/acknowledgements",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
