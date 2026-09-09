1:"$Sreact.fragment"
2:I[22016,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js","/_next/static/chunks/1dc2ji6eirxav.js","/_next/static/chunks/0w1hhgum9f6q-.js"],""]
3:I[5014,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js","/_next/static/chunks/1dc2ji6eirxav.js","/_next/static/chunks/0w1hhgum9f6q-.js"],"default"]
4:I[96224,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js","/_next/static/chunks/1dc2ji6eirxav.js","/_next/static/chunks/0w1hhgum9f6q-.js"],"CodeBlock"]
f:X
14:X
14:C
0:{"buildId":"qAgkIyC4b86fNrhE0XHIT","data":[{"rsc":["$","$1","c",{"children":[["$","div",null,{"className":"flex","children":[["$","div",null,{"className":"flex-1 min-w-0","children":[["$","nav",null,{"className":"flex items-center space-x-2 text-xs font-mono text-surface-500 mb-6","aria-label":"Breadcrumb","children":[["$","$L2",null,{"href":"/","className":"hover:text-leaf-500 transition","children":["$","$L3",null,{"icon":{"name":"house","size":24,"node":[["path",{"d":"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8","key":"5wwlr5"}],["path",{"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","key":"r6nss1"}]],"aliases":["home"]},"className":"w-3.5 h-3.5"}]}],["$","$L3",null,{"icon":{"name":"chevron-right","size":24,"node":[["path",{"d":"m9 18 6-6-6-6","key":"mthhwq"}]]},"className":"w-3 h-3 text-surface-400"}],["$","$L2",null,{"href":"/docs","className":"hover:text-leaf-500 transition","children":"docs"}],[["$","div","Socket API",{"className":"flex items-center space-x-2","children":[["$","$L3",null,{"icon":"$0:data:0:rsc:props:children:0:props:children:0:props:children:0:props:children:1:props:icon","className":"w-3 h-3 text-surface-400"}],["$","span",null,{"className":"text-leaf-600 dark:text-leaf-400 font-semibold","children":"Socket API"}]]}]]]}],["$","div",null,{"className":"flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold","children":[["$","span",null,{"children":"Chapter 04.2"}],["$","span",null,{"children":"•"}],["$","span",null,{"children":"Instance API"}]]}],["$","h1",null,{"className":"text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4","children":"Socket Instance API"}],["$","p",null,{"className":"text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6","children":["A ",["$","code",null,{"className":"font-mono text-leaf-600 dark:text-leaf-400","children":"Socket"}]," represents one individual accepted connection admitted through the HTTP upgrade sequence[cite: 2]. Each instance manages its own lifecycle machine, event registry, bounded outbound queue, and room membership[cite: 1, 5]."]}],["$","section",null,{"id":"definition","className":"mb-10 scroll-mt-20","children":[["$","h2",null,{"className":"text-xl font-bold text-surface-900 dark:text-white mb-2","children":"Class Definition"}],["$","p",null,{"className":"text-xs text-surface-500 mb-3","children":["TypeScript signatures exported directly by ",["$","code",null,{"className":"font-mono","children":"subatom-pulse"}],"[cite: 2]:"]}],["$","$L4",null,{"filename":"Socket.d","singleCode":"class Socket {\n  /** Unique connection identifier generated during admission */\n  readonly id: string;\n\n  /** Read-only authentication metadata populated during HTTP Upgrade */\n  readonly metadata: Record<string, unknown>;\n\n  /** Subscribes this socket to a named room */\n  join(room: string): void;\n\n  /** Unsubscribes this socket from a named room */\n  leave(room: string): void;\n\n  /** Registers an event handler scoped exclusively to this connection */\n  on(\n    event: string,\n    handler: (\n      data: unknown,\n      ack?: (reply: unknown) => void\n    ) => void | Promise<void>\n  ): void;\n\n  /** Delivers a message strictly to this connection */\n  emit(event: string, data: unknown): void;\n\n  /** Broadcasts a message to all members in a room, excluding this socket */\n  to(room: string): { emit(event: string, data: unknown): void };\n\n  /** Closes the transport immediately with WebSocket code 1000 */\n  disconnect(): void;\n}","language":"typescript"}]]}],["$","section",null,{"id":"properties","className":"mb-10 scroll-mt-20","children":[["$","h2",null,{"className":"text-xl font-bold text-surface-900 dark:text-white mb-4","children":"Instance Properties"}],["$","div",null,{"className":"overflow-x-auto border border-surface-200 dark:border-surface-800 rounded-xl mb-6","children":["$","table",null,{"className":"w-full text-left text-xs font-mono","children":["$L5","$L6"]}]}]]}],"$L7","$L8","$L9","$La"]}],"$Lb"]}],["$Lc"],"$Ld"]}],"isPartial":"$@e","staleTime":"$f","varyParams":null},{"rsc":"$L10","isPartial":"$@11","staleTime":"$f","varyParams":null},{"rsc":"$L12","isPartial":"$@13","staleTime":"$f","varyParams":"$14"},{"rsc":"$L15","isPartial":"$@16","staleTime":"$f","varyParams":"$14"},{"rsc":"$L17","isPartial":"$@18","staleTime":"$f","varyParams":null},{"rsc":"$L19","isPartial":"$@1a","staleTime":"$f","varyParams":null}],"isUpgradeableISRFallback":false,"a":"$@1b","rootVaryParams":null,"needsRuntimeRequest":"$@1c"}
22:I[27040,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js","/_next/static/chunks/1dc2ji6eirxav.js","/_next/static/chunks/0w1hhgum9f6q-.js"],"TableOfContents"]
23:I[97367,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"OutletBoundary"]
24:"$Sreact.suspense"
26:I[97367,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"ViewportBoundary"]
27:I[97367,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"MetadataBoundary"]
28:I[27201,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"IconMark"]
29:I[39756,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"default"]
2a:I[37457,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"default"]
2b:I[60359,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js","/_next/static/chunks/1dc2ji6eirxav.js"],"Sidebar"]
2c:I[39756,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"LoadingBoundaryProvider"]
2d:I[5500,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"Image"]
2e:I[33507,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"Providers"]
2f:I[67819,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"InitialLoader"]
30:I[54588,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js"],"Navbar"]
31:I[60542,["/_next/static/chunks/3zyncrv90mr6-.js","/_next/static/chunks/08k4t2yfwiu46.js","/_next/static/chunks/43pvxld0xf-g5.js","/_next/static/chunks/3da6mkmcybyft.js"],"default"]
:HL["/_next/static/chunks/0pykix4zk4s22.css","style"]
5:["$","thead",null,{"className":"bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 text-surface-700 dark:text-surface-300 uppercase","children":["$","tr",null,{"children":[["$","th",null,{"className":"p-3.5","children":"Property"}],["$","th",null,{"className":"p-3.5","children":"Type"}],["$","th",null,{"className":"p-3.5","children":"Description"}]]}]}]
6:["$","tbody",null,{"className":"divide-y divide-surface-200 dark:divide-surface-800 bg-white dark:bg-surface-950 text-surface-600 dark:text-slate-300","children":[["$","tr",null,{"children":[["$","td",null,{"className":"p-3.5 text-leaf-600 dark:text-leaf-400 font-bold","children":"id"}],["$","td",null,{"className":"p-3.5 text-surface-400","children":"string"}],["$","td",null,{"className":"p-3.5","children":"Immutable unique connection identifier assigned when the connection passes upgrade admission[cite: 2, 4]."}]]}],["$","tr",null,{"children":[["$","td",null,{"className":"p-3.5 text-leaf-600 dark:text-leaf-400 font-bold","children":"metadata"}],["$","td",null,{"className":"p-3.5 text-surface-400","children":"Record<string, unknown>"}],["$","td",null,{"className":"p-3.5","children":["Read-only object copied directly from ",["$","code",null,{"className":"font-mono","children":"AuthResult.metadata"}]," returned by your server ",["$","code",null,{"className":"font-mono","children":"authenticator"}],"[cite: 2, 4]."]}]]}]]}]
7:["$","section",null,{"id":"methods","className":"mb-10 scroll-mt-20","children":[["$","h2",null,{"className":"text-xl font-bold text-surface-900 dark:text-white mb-4","children":"Instance Methods"}],["$","div",null,{"className":"space-y-4 text-xs text-surface-600 dark:text-slate-300","children":[["$","div",null,{"className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900","children":[["$","div",null,{"className":"flex items-center justify-between mb-1.5","children":[["$","strong",null,{"className":"text-surface-900 dark:text-white font-mono text-sm","children":"emit(event: string, data: unknown): void"}],["$","span",null,{"className":"text-[11px] font-mono text-leaf-600 dark:text-leaf-400 font-semibold","children":"Direct Target"}]]}],["$","p",null,{"className":"leading-relaxed","children":["Serializes payload as JSON and pushes it into this connection's isolated ",["$","code",null,{"className":"font-mono","children":"OutboundQueue"}],"[cite: 1, 3]. It delivers strictly to this peer and does not trigger adapter broadcast events[cite: 2]."]}]]}],["$","div",null,{"className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900","children":[["$","div",null,{"className":"flex items-center justify-between mb-1.5","children":[["$","strong",null,{"className":"text-surface-900 dark:text-white font-mono text-sm","children":"to(room: string).emit(event: string, data: unknown): void"}],["$","span",null,{"className":"text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold","children":"Sender-Excluded Broadcast"}]]}],["$","p",null,{"className":"leading-relaxed","children":["Sends the packet to every other connection currently registered in the specified room, ",["$","strong",null,{"children":"excluding the calling socket"}],". If a cluster adapter is present, it publishes across nodes[cite: 2, 3]."]}]]}],["$","div",null,{"className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900","children":[["$","div",null,{"className":"flex items-center justify-between mb-1.5","children":[["$","strong",null,{"className":"text-surface-900 dark:text-white font-mono text-sm","children":"join(room: string): void"}],["$","span",null,{"className":"text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold","children":"O(1) Set Mutation"}]]}],["$","p",null,{"className":"leading-relaxed","children":["Adds the socket identifier to the in-memory ",["$","code",null,{"className":"font-mono","children":"RoomRegistry"}]," set in $O(1)$ algorithmic complexity."]}]]}],["$","div",null,{"className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900","children":[["$","div",null,{"className":"flex items-center justify-between mb-1.5","children":[["$","strong",null,{"className":"text-surface-900 dark:text-white font-mono text-sm","children":"leave(room: string): void"}],["$","span",null,{"className":"text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold","children":"O(1) Set Mutation"}]]}],["$","p",null,{"className":"leading-relaxed","children":"Removes the socket identifier from the room index[cite: 1, 2]. Future room broadcasts will no longer be addressed to this connection buffer[cite: 1, 3]."}]]}],["$","div",null,{"className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900","children":[["$","div",null,{"className":"flex items-center justify-between mb-1.5","children":[["$","strong",null,{"className":"text-surface-900 dark:text-white font-mono text-sm","children":"on(event: string, handler: Function): void"}],["$","span",null,{"className":"text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold","children":"Event Dispatcher"}]]}],["$","p",null,{"className":"leading-relaxed","children":["Registers an event handler scoped to this socket[cite: 2]. Handlers can be synchronous or return ","$L1d",". If an acknowledged event handler throws an exception, the engine catches it and sends an error ack with code ","$L1e","[cite: 4]."]}]]}],"$L1f"]}]]}]
8:["$","section",null,{"id":"lifecycle","className":"mb-10 scroll-mt-20","children":[["$","h2",null,{"className":"text-xl font-bold text-surface-900 dark:text-white mb-2","children":"Lifecycle & Cleanup Semantics"}],["$","div",null,{"className":"my-6 rounded-xl border p-4 border-amber-500/40 dark:border-amber-500/25 bg-amber-50/50 dark:bg-amber-950/20 text-amber-950 dark:text-amber-200","children":["$","div",null,{"className":"flex items-start space-x-3","children":[["$","$L3",null,{"icon":{"name":"triangle-alert","size":24,"node":[["path",{"d":"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3","key":"wmoenq"}],["path",{"d":"M12 9v4","key":"juzpu7"}],["path",{"d":"M12 17h.01","key":"p32p05"}]],"aliases":["alert-triangle"]},"className":"w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"}],["$","div",null,{"className":"text-xs leading-relaxed flex-1","children":[["$","strong",null,{"className":"block font-semibold mb-1 text-surface-900 dark:text-surface-100","children":"Important Disconnect Event Distinction"}],["$","div",null,{"children":["Registering ",["$","code",null,{"className":"font-mono","children":"socket.on(\"disconnect\", ...)"}]," behaves as an ordinary packet handler: it triggers only if a client explicitly sends a packet with type ",["$","code",null,{"className":"font-mono","children":"\"disconnect\""}],"[cite: 4]. It is ",["$","strong",null,{"children":"not"}]," automatically invoked when the transport layer closes or drops[cite: 4]."]}]]}]]}]}],["$","div",null,{"className":"my-6 rounded-xl border p-4 border-leaf-500/40 dark:border-leaf-500/25 bg-leaf-50/50 dark:bg-leaf-950/20 text-leaf-950 dark:text-leaf-200","children":["$","div",null,{"className":"flex items-start space-x-3","children":[["$","$L3",null,{"icon":{"name":"circle-check-big","size":24,"node":[["path",{"d":"M21.801 10A10 10 0 1 1 17 3.335","key":"yps3ct"}],["path",{"d":"m9 11 3 3L22 4","key":"1pflzl"}]],"aliases":["check-circle"]},"className":"w-4 h-4 text-leaf-500 flex-shrink-0 mt-0.5"}],["$","div",null,{"className":"text-xs leading-relaxed flex-1","children":[["$","strong",null,{"className":"block font-semibold mb-1 text-surface-900 dark:text-surface-100","children":"Automatic Room Pruning"}],["$","div",null,{"children":["When a connection drops or closes, ",["$","code",null,{"className":"font-mono","children":"subatom-pulse"}]," unlinks all room memberships in ",["$","code",null,{"className":"font-mono","children":"RoomRegistry"}],", deregisters heartbeats, and clears queued delivery buffers automatically to prevent memory leaks[cite: 1, 4, 5]."]}]]}]]}]}]]}]
20:T5e5,import { subatomPulse } from "subatom-pulse";

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
  console.log(`Socket connected: ${socket.id} (User: ${userId})`);

  // 2. Room isolation: join user inbox and team broadcast rooms
  socket.join(`user:${userId}`);
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
});21:T50e,const { subatomPulse } = require("subatom-pulse");

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
  console.log(`Socket connected: ${socket.id} (User: ${userId})`);

  // 2. Room isolation: join user inbox and team broadcast rooms
  socket.join(`user:${userId}`);
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
});9:["$","section",null,{"id":"usage","className":"mb-10 scroll-mt-20","children":[["$","h2",null,{"className":"text-xl font-bold text-surface-900 dark:text-white mb-2","children":"Usage Example"}],["$","p",null,{"className":"text-xs text-surface-500 mb-3","children":["Common server patterns inside ",["$","code",null,{"className":"font-mono","children":"io.onConnection((socket) => { ... })"}],"[cite: 2]:"]}],["$","$L4",null,{"filename":"socket-lifecycle","tsCode":"$20","jsCode":"$21"}]]}]
a:["$","div",null,{"className":"mt-16 pt-8 border-t border-surface-200 dark:border-surface-800 grid grid-cols-1 sm:grid-cols-2 gap-4","children":[["$","$L2",null,{"href":"/docs/api/server","className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 hover:border-leaf-500/50 bg-surface-50/50 dark:bg-surface-900/40 transition group","children":[["$","div",null,{"className":"text-[11px] font-mono text-surface-400 flex items-center space-x-1.5 mb-1","children":[["$","$L3",null,{"icon":{"name":"arrow-left","size":24,"node":[["path",{"d":"m12 19-7-7 7-7","key":"1l729n"}],["path",{"d":"M19 12H5","key":"x3x0zl"}]]},"className":"w-3 h-3 group-hover:-translate-x-1 transition"}],["$","span",null,{"children":"Previous"}]]}],["$","div",null,{"className":"text-xs font-semibold text-surface-900 dark:text-white","children":"SocketServer Options"}]]}],["$","$L2",null,{"href":"/docs/api/client","className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 hover:border-leaf-500/50 bg-surface-50/50 dark:bg-surface-900/40 transition text-right group","children":[["$","div",null,{"className":"text-[11px] font-mono text-surface-400 flex items-center justify-end space-x-1.5 mb-1","children":[["$","span",null,{"children":"Next"}],["$","$L3",null,{"icon":{"name":"arrow-right","size":24,"node":[["path",{"d":"M5 12h14","key":"1ays0h"}],["path",{"d":"m12 5 7 7-7 7","key":"xquz4c"}]]},"className":"w-3 h-3 group-hover:translate-x-1 transition"}]]}],["$","div",null,{"className":"text-xs font-semibold text-surface-900 dark:text-white","children":"SubAtomPulse Client API"}]]}]]}]
b:["$","$L22",null,{"items":[{"id":"definition","title":"Class Definition"},{"id":"properties","title":"Instance Properties"},{"id":"methods","title":"Instance Methods"},{"id":"lifecycle","title":"Lifecycle & Cleanup Nuance"},{"id":"usage","title":"Usage Example"}]}]
c:["$","script","script-0",{"src":"/_next/static/chunks/0w1hhgum9f6q-.js","async":true}]
d:["$","$L23",null,{"children":["$","$24",null,{"name":"Next.MetadataOutlet","children":"$@25"}]}]
10:["$","$1","h",{"children":[null,["$","$L26",null,{"children":[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]}],["$","div",null,{"hidden":true,"children":["$","$L27",null,{"children":["$","$24",null,{"name":"Next.Metadata","children":[["$","title","0",{"children":"Socket Instance API Reference | subatom-pulse"}],["$","meta","1",{"name":"description","content":"Methods, properties, and lifecycle behaviors available on accepted server Socket instances."}],["$","link","2",{"rel":"author","href":"https://pulse.subatomjs.dev"}],["$","meta","3",{"name":"author","content":"Kunal Chandra Das"}],["$","meta","4",{"name":"keywords","content":"subatom,subatom-pulse,websocket,Node.js,JavaScript,TypeScript,Node.js WebSocket framework,real-time communication,ws,backpressure"}],["$","meta","5",{"name":"creator","content":"Kunal Chandra Das"}],["$","meta","6",{"name":"publisher","content":"Subatom"}],["$","meta","7",{"name":"robots","content":"index, follow"}],["$","meta","8",{"property":"og:title","content":"subatom-pulse | Enterprise Isolated WebSocket Engine for Node.js"}],["$","meta","9",{"property":"og:description","content":"Production-grade Node.js WebSocket engine featuring isolated socket lifecycles, microtask backpressure memory limits, O(1) inverted rooms, and RPC acknowledgements."}],["$","meta","10",{"property":"og:url","content":"https://pulse.subatomjs.dev"}],["$","meta","11",{"property":"og:site_name","content":"subatom-pulse"}],["$","meta","12",{"property":"og:locale","content":"en_US"}],["$","meta","13",{"property":"og:type","content":"website"}],["$","meta","14",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","15",{"name":"twitter:title","content":"subatom-pulse | Enterprise Isolated WebSocket Engine for Node.js"}],["$","meta","16",{"name":"twitter:description","content":"Production-grade Node.js WebSocket engine featuring isolated socket lifecycles, microtask backpressure memory limits, O(1) inverted rooms, and RPC acknowledgements."}],["$","link","17",{"rel":"shortcut icon","href":"/subatom_short_logo.png"}],["$","link","18",{"rel":"icon","href":"/favicon.ico?favicon.2yhnv-53bu2g1.ico","sizes":"48x48","type":"image/x-icon"}],["$","link","19",{"rel":"icon","href":"/subatom_short_logo.png"}],["$","link","20",{"rel":"apple-touch-icon","href":"/subatom_short_logo.png"}],["$","$L28","21",{}]]}]}]}],null]}]
12:["$","$1","c",{"children":[null,["$","$L29",null,{"parallelRouterKey":"children","template":["$","$L2a",null,{}]}]]}]
15:["$","$1","c",{"children":[null,["$","$L29",null,{"parallelRouterKey":"children","template":["$","$L2a",null,{}]}]]}]
17:["$","$1","c",{"children":[[["$","script","script-0",{"src":"/_next/static/chunks/1dc2ji6eirxav.js","async":true}]],["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex","children":[["$","$L2b",null,{}],["$","div",null,{"className":"flex-1 min-w-0 py-8 lg:pl-10 lg:pr-6","children":["$","$L29",null,{"parallelRouterKey":"children","template":["$","$L2a",null,{}]}]}]]}]]}]
19:["$","$L2c",null,{"loading":[["$","output","l",{"className":"fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-surface-950/80 backdrop-blur-xs transition-opacity","aria-label":"Loading documentation content","children":["$","div",null,{"className":"relative flex flex-col items-center","children":[["$","div",null,{"className":"absolute -inset-4 rounded-full bg-leaf-500/15 animate-ping"}],["$","div",null,{"className":"relative z-10 p-3 rounded-2xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-lg","children":["$","$L2d",null,{"src":"/subatom_short_logo.png","alt":"Loading subatom-pulse...","width":40,"height":40,"priority":true,"className":"w-10 h-10 object-contain select-none animate-pulse"}]}],["$","span",null,{"className":"mt-4 text-[11px] font-mono text-surface-500 tracking-wider uppercase select-none animate-pulse","children":"Connecting…"}]]}]}],[],null],"children":["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/0pykix4zk4s22.css","precedence":"next"}],["$","script","script-0",{"src":"/_next/static/chunks/3zyncrv90mr6-.js","async":true}],["$","script","script-1",{"src":"/_next/static/chunks/08k4t2yfwiu46.js","async":true}],["$","script","script-2",{"src":"/_next/static/chunks/43pvxld0xf-g5.js","async":true}]],["$","html",null,{"lang":"en","suppressHydrationWarning":true,"className":"scroll-smooth","data-scroll-behavior":"smooth","children":["$","body",null,{"suppressHydrationWarning":true,"className":"bg-white dark:bg-surface-950 text-surface-800 dark:text-slate-300 font-sans antialiased selection:bg-leaf-500 selection:text-white min-h-screen flex flex-col","children":["$","$L2e",null,{"children":[["$","$L2f",null,{}],["$","$L30",null,{}],["$","div",null,{"className":"flex-1","children":["$","$L29",null,{"parallelRouterKey":"children","error":"$31","errorStyles":[],"errorScripts":[["$","script","script-0",{"src":"/_next/static/chunks/3da6mkmcybyft.js","async":true}]],"template":["$","$L2a",null,{}],"notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]]}]}],["$","footer",null,{"className":"border-t border-surface-200 dark:border-surface-800/80 bg-white dark:bg-surface-950 py-10 transition-colors","children":["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-surface-500 font-mono space-y-2","children":[["$","p",null,{"children":["subatom-pulse ","v1.1.0"," • Maintained by"," ",["$","a",null,{"href":"mailto:kunal@subatomjs.dev","className":"text-leaf-600 dark:text-leaf-400 hover:underline font-semibold","children":"Kunal Chandra Das <kunal@subatomjs.dev>"}]," ","• Released under the ","MIT"," License"]}],["$","p",null,{"className":"text-[11px] text-surface-400","children":"Engineered for high-throughput Node.js 24+ runtimes. Native WebSockets with zero HTTP fallback bloat."}]]}]}]]}]}]}]]}]}]
1d:["$","code",null,{"className":"font-mono","children":"Promise<void>"}]
1e:["$","code",null,{"className":"font-mono","children":"HANDLER_ERROR"}]
1f:["$","div",null,{"className":"p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900","children":[["$","div",null,{"className":"flex items-center justify-between mb-1.5","children":[["$","strong",null,{"className":"text-surface-900 dark:text-white font-mono text-sm","children":"disconnect(): void"}],["$","span",null,{"className":"text-[11px] font-mono text-rose-600 dark:text-rose-400 font-semibold","children":"Graceful Close"}]]}],["$","p",null,{"className":"leading-relaxed","children":["Immediately closes the underlying WebSocket connection frame with standard close code ",["$","code",null,{"className":"font-mono","children":"1000"}],"[cite: 2]."]}]]}]
25:null
1c:true
f:300
f:C
1b:0
11:"$undefined"
13:"$undefined"
16:"$undefined"
18:"$undefined"
1a:"$undefined"
e:"$undefined"
