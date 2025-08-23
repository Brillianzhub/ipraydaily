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
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
