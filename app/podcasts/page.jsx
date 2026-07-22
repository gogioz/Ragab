"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiMic, FiArrowUpRight } from "react-icons/fi";

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (document.documentElement.getAttribute("lang") === "ar") setLang("ar");
    const fetch = async () => {
      try {
        const q = query(collection(db, "podcasts"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setPodcasts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {
        const snap = await getDocs(collection(db, "podcasts"));
        setPodcasts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } finally { setLoading(false); }
    };
    fetch();
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
          {isAr ? "البودكاست" : "Podcasts"}
        </h1>
        <div className="w-12 h-0.5 bg-gold mx-auto mt-6" />
        <p className="font-body text-white/50 mt-4 text-lg max-w-xl mx-auto">
          {isAr ? "جميع برامج البودكاست لأحمد رجب" : "All podcast shows by Ahmed Ragab"}
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1,2,3,4].map(i => <div key={i} className="h-72 bg-ink/5 animate-pulse" />)}
          </div>
        ) : podcasts.length === 0 ? (
          <p className="font-body text-muted text-center py-20">{isAr ? "لا توجد برامج بعد" : "No podcasts yet."}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {podcasts.map(podcast => (
              <Link key={podcast.id} href={`/podcasts/${podcast.id}`}
                className="group bg-white border border-border hover:border-gold/40 transition-all card-hover block">
                {podcast.coverImage ? (
                  <img src={podcast.coverImage} alt="" className="w-full h-56 object-cover" />
                ) : (
                  <div className="w-full h-56 bg-navy/5 flex items-center justify-center">
                    <FiMic className="text-gold text-5xl opacity-20" />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-display text-navy text-xl font-bold mb-2 group-hover:text-gold transition-colors"
                    style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}
                    dir={isAr ? "rtl" : "ltr"}>
                    {isAr ? (podcast.titleAr || podcast.titleEn) : (podcast.titleEn || podcast.titleAr)}
                  </h2>
                  <p className="font-body text-ink/60 text-sm leading-relaxed mb-4 line-clamp-2"
                    style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}
                    dir={isAr ? "rtl" : "ltr"}>
                    {isAr ? (podcast.descriptionAr || podcast.descriptionEn) : (podcast.descriptionEn || podcast.descriptionAr)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-muted text-xs">
                      {podcast.episodeCount || 0} {isAr ? "حلقة" : "episodes"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-gold text-xs tracking-widest uppercase">
                      {isAr ? "عرض الحلقات" : "View Episodes"} <FiArrowUpRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
