import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex min-h-screen flex-col">
        <Topbar />
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
