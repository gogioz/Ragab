"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null && pathname !== "/dashboard/login") {
      router.push("/dashboard/login");
    }
  }, [user, pathname, router]);

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-gold font-display text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (pathname === "/dashboard/login") return <>{children}</>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#0d1520]">
      <Sidebar />
      {/* pt-16 on mobile to clear the fixed top bar */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
