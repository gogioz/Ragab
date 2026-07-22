"use client";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiArrowLeft, FiMic, FiExternalLink, FiCalendar } from "react-icons/fi";

export default function PodcastShowPage({ params }) {
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (document.documentElement.getAttribute("lang") === "ar") setLang("ar");
    const fetchAll = async () => {
      const showSnap = await getDoc(doc(db, "podcasts", params.id));
      if (showSnap.exists()) setShow({ id: showSnap.id, ...showSnap.data() });
      try {
        const q = query(collection(db, "podcasts", params.id, "episodes"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setEpisodes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {
        const snap = await getDocs(collection(db, "podcasts", params.id, "episodes"));
        setEpisodes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }
      setLoading(false);
    };
    fetchAll();
  }, [params.id]);

  const isAr = lang === "ar";
  const t = (en, ar) => isAr ? (ar || en) : (en || ar);
  const arFont = { fontFamily: "'Noto Sans Arabic', sans-serif" };

  if (loading) return (
    <main className="min-h-screen bg-paper">
      <div className="bg-navy h-72 animate-pulse" />
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-4">
        <div className="h-8 bg-ink/10 animate-pulse w-3/4" />
        <div className="h-4 bg-ink/10 animate-pulse w-1/2" />
      </div>
    </main>
  );

  if (!show) return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-navy text-2xl font-bold mb-4">Show not found</p>
        <Link href="/podcasts" className="font-sans text-gold text-xs tracking-widest uppercase">← All Podcasts</Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-paper" dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
          <Link href="/podcasts"
            className="inline-flex items-center gap-2 font-sans text-gold text-xs tracking-widest uppercase hover:text-gold/70 transition-colors mb-10">
            <FiArrowLeft /> {isAr ? "كل البودكاست" : "All Podcasts"}
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Cover */}
            {show.coverImage ? (
              <img src={show.coverImage} alt="" className="w-48 h-48 object-cover flex-shrink-0 border border-white/10" />
            ) : (
              <div className="w-48 h-48 bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                <FiMic className="text-gold text-5xl opacity-30" />
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <span className="font-sans text-gold text-xs tracking-widest uppercase border border-gold/30 px-3 py-1 mb-5 inline-block">
                {isAr ? "بودكاست" : "Podcast"}
              </span>
              <h1 className="font-display text-white text-4xl lg:text-5xl font-bold mt-4 leading-tight"
                style={isAr ? arFont : {}}>
                {t(show.titleEn, show.titleAr)}
              </h1>
              <div className="w-12 h-0.5 bg-gold my-5" />
              {(show.descriptionEn || show.descriptionAr) && (
                <p className="font-body text-white/60 text-base leading-relaxed max-w-xl"
                  style={isAr ? arFont : {}}>
                  {t(show.descriptionEn, show.descriptionAr)}
                </p>
              )}
              <p className="font-sans text-white/30 text-sm mt-5">
                {episodes.length} {isAr ? "حلقة" : `episode${episodes.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="font-display text-navy text-2xl font-bold mb-8" style={isAr ? arFont : {}}>
          {isAr ? "الحلقات" : "Episodes"}
        </h2>

        {episodes.length === 0 ? (
          <p className="font-body text-muted text-center py-16">{isAr ? "لا توجد حلقات بعد" : "No episodes yet."}</p>
        ) : (
          <div className="space-y-4">
            {episodes.map((ep, i) => (
              <div key={ep.id}
                className="flex flex-col md:flex-row gap-5 bg-white border border-border p-6 hover:border-gold/40 transition-all group">

                {/* Episode number */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 border border-border text-muted font-display font-bold text-sm">
                  {String(episodes.length - i).padStart(2, "0")}
                </div>

                {/* Image */}
                {ep.image ? (
                  <img src={ep.image} alt="" className="w-20 h-20 object-cover flex-shrink-0 border border-border" />
                ) : (
                  <div className="w-20 h-20 bg-navy/5 flex-shrink-0 flex items-center justify-center border border-border">
                    <FiMic className="text-gold/40 text-2xl" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-navy text-lg font-bold group-hover:text-gold transition-colors"
                    style={isAr ? arFont : {}}>
                    {t(ep.nameEn, ep.nameAr)}
                  </h3>
                  {(ep.descriptionEn || ep.descriptionAr) && (
                    <p className="font-body text-ink/60 text-sm leading-relaxed mt-2 line-clamp-2"
                      style={isAr ? arFont : {}}>
                      {t(ep.descriptionEn, ep.descriptionAr)}
                    </p>
                  )}
                  {ep.link && (
                    <a href={ep.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-gold text-xs tracking-widest uppercase mt-4 hover:text-gold/70 transition-colors">
                      {isAr ? "استمع الآن" : "Listen Now"} <FiExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
