// components/DashboardLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";


export default function DashboardLayout({ children }) {
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
      <div className="flex-1 flex min-h-screen flex-col">
        <AdminNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
