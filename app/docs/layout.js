import { Sidebar } from "../components/Sidebar";

export default function DocsLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
      <Sidebar />
      <div className="flex-1 min-w-0 py-8 lg:pl-10 lg:pr-6">{children}</div>
    </div>
  );
}
