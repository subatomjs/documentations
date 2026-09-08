import { TableOfContents } from "../../../components/TableOfContents";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { Pagination } from "../../../components/Pagination";
import { CodeBlock } from "../../../components/CodeBlock";
import { Callout } from "../../../components/Callout";

export const metadata = {
  title: "Request-Response & Ack API",
  description:
    "Handle synchronous acknowledgements, correlation IDs, and timeouts over WebSockets.",
};

const ackCodeTs = `// Client Promise RPC with 3000ms timeout
try {
  const result = await socket.emitWithAck<{ status: string }>(
    "order.checkout",
    { cartId: "cart_9981" },
    3000
  );
  console.log("Order confirmed:", result.status);
} catch (err: any) {
  // Handles server exceptions, network drops, or timeout expirations
  console.error("Checkout failed:", err.message);
}

// Server handler replying to acknowledgement callback
socket.on("order.checkout", async (data, ack) => {
  const status = await processOrder(data.cartId);
  ack?.({ status: "success", orderId: "ord_123" });
});`;

const ackCodeJs = `// Client Promise RPC with 3000ms timeout
try {
  const result = await socket.emitWithAck(
    "order.checkout",
    { cartId: "cart_9981" },
    3000
  );
  console.log("Order confirmed:", result.status);
} catch (err) {
  console.error("Checkout failed:", err.message);
}

// Server handler replying to acknowledgement callback
socket.on("order.checkout", async (data, ack) => {
  const status = await processOrder(data.cartId);
  ack?.({ status: "success", orderId: "ord_123" });
});`;

export default function AcknowledgementsPage() {
  const toc = [
    { id: "rpc", title: "Promise RPC: emitWithAck" },
    { id: "boundary", title: "Server Crash Boundary" },
  ];

  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <Breadcrumbs
          items={[
            {
              label: "Acknowledgements",
              href: "/docs/cookbooks/acknowledgements",
            },
          ]}
        />

        <div className="flex items-center space-x-2 text-leaf-600 dark:text-leaf-400 text-xs font-mono mb-2 uppercase tracking-widest font-semibold">
          <span>Chapter 02.3</span>
          <span>•</span>
          <span>RPC & Acknowledgements</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-4">
          Request-Response Patterns (Ack Engine)
        </h1>
        <p className="text-surface-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          Unlike raw WebSockets where frames are fire-and-forget,{" "}
          <code className="font-mono">subatom-pulse</code> provides first-class
          RPC acknowledgements via callbacks or Promises (
          <code className="font-mono">emitWithAck</code>).
        </p>

        <section id="rpc" className="mb-8 scroll-mt-20">
          <CodeBlock filename="ack" tsCode={ackCodeTs} jsCode={ackCodeJs} />
        </section>

        <section id="boundary" className="mb-10 scroll-mt-20">
          <Callout type="warning" title="Server Crash Boundary">
            If an event handler throws an unhandled exception while serving an
            acknowledged event, the engine automatically catches it and emits an
            error ack packet with code{" "}
            <code className="font-mono">HANDLER_ERROR</code>. The client&apos;s{" "}
            <code className="font-mono">emitWithAck</code> Promise rejects
            cleanly with that message.
          </Callout>
        </section>

        <Pagination
          prev={{
            title: "Group Rooms",
            href: "/docs/cookbooks/rooms-presence",
          }}
          next={{
            title: "Admin Broadcasts",
            href: "/docs/cookbooks/broadcasting",
          }}
        />
      </div>
      <TableOfContents items={toc} />
    </div>
  );
}
