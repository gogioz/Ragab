"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FiFileText, FiBarChart2, FiSearch, FiMic, FiLogOut, FiHome, FiGrid, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: <FiGrid /> },
  { label: "Articles", href: "/dashboard/articles", icon: <FiFileText /> },
  { label: "Reports", href: "/dashboard/reports", icon: <FiBarChart2 /> },
  { label: "Investigations", href: "/dashboard/investigations", icon: <FiSearch /> },
  { label: "Podcasts", href: "/dashboard/podcasts", icon: <FiMic /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/dashboard/login");
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">
        <p className="font-display text-gold text-lg font-bold tracking-widest">AHMED RAGAB</p>
        <p className="font-sans text-white/30 text-xs tracking-widest uppercase mt-1">Content Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-all duration-200 ${
                active
                  ? "bg-gold/10 text-gold border-l-2 border-gold"
                  : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-6 border-t border-white/10 space-y-2">
        <Link href="/" onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <FiHome className="text-lg" /> View Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 font-sans text-sm text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <FiLogOut className="text-lg" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-navy border-b border-white/10 flex items-center justify-between px-5 py-4">
        <p className="font-display text-gold text-base font-bold tracking-widest">AHMED RAGAB</p>
        <button onClick={() => setOpen(!open)} className="text-white/60 hover:text-white transition-colors">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-navy z-40 flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-navy border-r border-white/10 flex-col flex-shrink-0">
        <NavContent />
      </aside>
    </>
  );
}
