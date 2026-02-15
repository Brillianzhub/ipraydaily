// components/DashboardLayout.tsx
"use client";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthRoute = pathname === "/auth";

  if (isAuthRoute) {
    return <>{children}</>; // No layout
  }

  return (
    <div className="flex bg-gray-50">
      <div className="sticky top-0 h-screen overflow-y-auto">
        <AdminSidebar />
      </div>
      <div className="flex-1 min-h-screen flex flex-col">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
