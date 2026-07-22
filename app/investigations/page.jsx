"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";

export default function InvestigationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (document.documentElement.getAttribute("lang") === "ar") setLang("ar");

    const fetchInvestigations = async () => {
      try {
        const q = query(collection(db, "investigations"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Failed to fetch ordered investigations, falling back:", err);
        try {
          const snap = await getDocs(collection(db, "investigations"));
          console.log("dddddbbbb",db)
          setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (fallbackErr) {
             console.log("dddddbbbb",db)
          console.error("Failed to fetch investigations:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInvestigations();
  }, []);

  const isAr = lang === "ar";

  return (
    <main className="min-h-screen bg-paper">
      <div className="bg-navy py-28 px-6 text-center">
        <Link href="/" className="font-sans text-gold text-xs tracking-widest uppercase hover:text-gold/70 transition-colors mb-8 inline-flex items-center gap-2">
          ← {isAr ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <h1 className="font-display text-white text-5xl lg:text-6xl font-bold mt-6"
          style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}>
          {isAr ? "التحقيقات" : "Investigations"}
        </h1>
        <div className="w-12 h-0.5 bg-gold mx-auto mt-6" />
        <p className="font-body text-white/50 mt-4 text-lg max-w-xl mx-auto">
          {isAr ? "جميع تحقيقات أحمد رجب المنشورة" : "All investigations by Ahmed Ragab"}
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-32 bg-ink/5 animate-pulse" />)}</div>
        ) : items.length === 0 ? (
          <p className="font-body text-muted text-center py-20">{isAr ? "لا توجد تحقيقات بعد" : "No investigations yet."}</p>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <Link key={item.id} href={`/investigations/${item.id}`} dir={isAr ? "rtl" : "ltr"}
                className="grid md:grid-cols-4 gap-6 bg-white border border-border p-6 hover:border-gold/40 transition-all group card-hover block">
                {item.coverImage && (
                  <div className="md:col-span-1">
                    <img src={item.coverImage} alt="" className="w-full h-32 object-cover" />
                  </div>
                )}
                <div className={item.coverImage ? "md:col-span-3" : "md:col-span-4"}>
                  <div className="flex items-center gap-3 mb-3">
                    <FiCalendar className="text-gold text-xs" />
                    <span className="font-sans text-muted text-xs">{item.date}</span>
                  </div>
                  <h2 className="font-display text-navy text-xl font-bold mb-2 group-hover:text-gold transition-colors"
                    style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}>
                    {isAr ? (item.titleAr || item.titleEn) : (item.titleEn || item.titleAr)}
                  </h2>
                  <p className="font-body text-ink/60 text-sm leading-relaxed mb-4 line-clamp-2"
                    style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}>
                    {isAr ? (item.summaryAr || item.summaryEn) : (item.summaryEn || item.summaryAr)}
                  </p>
                  <span className="inline-flex items-center gap-2 font-sans text-gold text-xs tracking-widest uppercase">
                    {isAr ? "اقرأ المزيد" : "Read More"} <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
