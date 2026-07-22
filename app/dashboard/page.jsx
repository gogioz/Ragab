"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiFileText, FiBarChart2, FiSearch, FiMic, FiPlus } from "react-icons/fi";

const sections = [
  { label: "Articles", key: "articles", icon: <FiFileText />, href: "/dashboard/articles", color: "from-blue-500/20 to-blue-600/10" },
  { label: "Reports", key: "reports", icon: <FiBarChart2 />, href: "/dashboard/reports", color: "from-green-500/20 to-green-600/10" },
  { label: "Investigations", key: "investigations", icon: <FiSearch />, href: "/dashboard/investigations", color: "from-gold/20 to-gold/10" },
  { label: "Podcasts", key: "podcasts", icon: <FiMic />, href: "/dashboard/podcasts", color: "from-purple-500/20 to-purple-600/10" },
];

export default function DashboardPage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      const results = {};
      for (const s of sections) {
        const snap = await getDocs(collection(db, s.key));
        results[s.key] = snap.size;
      }
      setCounts(results);
    };
    fetchCounts();
  }, []);

  return (
    <div className="p-5 lg:p-10">
      <div className="mb-8 lg:mb-10">
        <h1 className="font-display text-white text-3xl lg:text-4xl font-bold">Dashboard</h1>
        <p className="font-sans text-white/40 text-sm mt-2">Manage all your content from here.</p>
        <div className="w-12 h-0.5 bg-gold mt-4" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 lg:mb-12">
        {sections.map((s) => (
          <Link key={s.key} href={s.href}
            className={`bg-gradient-to-br ${s.color} border border-white/10 p-4 lg:p-6 hover:border-gold/30 transition-all group`}>
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <span className="text-gold text-xl lg:text-2xl">{s.icon}</span>
              <FiPlus className="text-white/20 group-hover:text-gold transition-colors" />
            </div>
            <p className="font-display text-white text-3xl lg:text-4xl font-bold">{counts[s.key] ?? "—"}</p>
            <p className="font-sans text-white/50 text-xs tracking-widest uppercase mt-2">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-sans text-white/40 text-xs tracking-widest uppercase mb-4 lg:mb-5">Quick Add</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {sections.map((s) => (
            <Link key={s.key} href={`${s.href}/new`}
              className="flex items-center gap-2 border border-white/10 px-4 py-3 lg:px-5 lg:py-4 text-white/60 hover:text-gold hover:border-gold/40 transition-all font-sans text-xs lg:text-sm">
              <FiPlus /> Add {s.label.slice(0, -1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
