"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { FiCalendar, FiExternalLink, FiArrowLeft, FiMic } from "react-icons/fi";

export default function DetailPage({ collectionName, backHref, backLabel, readLabel, isPodcast = false }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");
  const [lightbox, setLightbox] = useState(null);

  // Get id from URL
  const id = typeof window !== "undefined" ? window.location.pathname.split("/").at(-1) : null;

  useEffect(() => {
    if (document.documentElement.getAttribute("lang") === "ar") setLang("ar");
    if (!id) return;
    getDoc(doc(db, collectionName, id)).then((d) => {
      if (d.exists()) setItem({ id: d.id, ...d.data() });
      setLoading(false);
    });
  }, [id]);

  const isAr = lang === "ar";
  const ar = (enVal, arVal) => isAr ? (arVal || enVal) : (enVal || arVal);

  if (loading) return (
    <main className="min-h-screen bg-paper">
      <div className="bg-navy h-72 animate-pulse" />
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-4">
        <div className="h-8 bg-ink/10 animate-pulse w-3/4" />
        <div className="h-4 bg-ink/10 animate-pulse w-1/2" />
        <div className="h-40 bg-ink/10 animate-pulse" />
      </div>
    </main>
  );

  if (!item) return (
    <main className="min-h-screen bg-paper flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-navy text-2xl font-bold mb-4">Not found</p>
        <Link href={backHref} className="font-sans text-gold text-xs tracking-widest uppercase">
          ← {backLabel}
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-paper" dir={isAr ? "rtl" : "ltr"}>

      {/* Hero / Cover */}
      <div className="relative bg-navy overflow-hidden">
        {item.coverImage ? (
          <>
            <img src={item.coverImage} alt="" className="w-full h-[55vh] object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-transparent" />
          </>
        ) : (
          <div className="h-64 bg-gradient-to-br from-navy to-navy/80" />
        )}

        {/* Back link */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
          <Link href={backHref}
            className="inline-flex items-center gap-2 font-sans text-gold text-xs tracking-widest uppercase hover:text-gold/70 transition-colors">
            <FiArrowLeft /> {backLabel}
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-16 pb-12 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-sans text-gold text-xs tracking-widest uppercase border border-gold/30 px-3 py-1">
              {collectionName.slice(0, -1)}
            </span>
            {item.date && (
              <span className="font-sans text-white/50 text-xs flex items-center gap-1">
                <FiCalendar size={11} /> {item.date}
              </span>
            )}
          </div>
          <h1
            className="font-display text-white text-3xl lg:text-5xl font-bold leading-tight"
            style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}
          >
            {ar(item.titleEn, item.titleAr)}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Summary */}
            {(item.summaryEn || item.summaryAr) && (
              <div className="mb-10">
                <div className="w-12 h-0.5 bg-gold mb-6" />
                <p
                  className="font-body text-ink/80 text-lg leading-relaxed"
                  style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}
                >
                  {ar(item.summaryEn, item.summaryAr)}
                </p>
              </div>
            )}

            {/* External / Podcast link */}
            {(item.externalLink || item.podcastLink) && (
              <a
                href={item.externalLink || item.podcastLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-navy font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors mb-12"
              >
                {isPodcast ? <FiMic /> : <FiExternalLink />}
                {isPodcast
                  ? (isAr ? "استمع الآن" : "Listen Now")
                  : (isAr ? "اقرأ المقال الكامل" : readLabel)}
              </a>
            )}

            {/* Image gallery */}
            {item.images && item.images.length > 0 && (
              <div className="mt-10">
                <h3
                  className="font-display text-navy text-xl font-bold mb-6"
                  style={isAr ? { fontFamily: "'Noto Sans Arabic', sans-serif" } : {}}
                >
                  {isAr ? "الصور" : "Gallery"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {item.images.map((img, i) => (
                    <button key={i} onClick={() => setLightbox(img)} className="overflow-hidden group">
                      <img
                        src={img}
                        alt={`Image ${i + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Cover image in sidebar if no hero */}
              {item.coverImage && (
                <img src={item.coverImage} alt="" className="w-full object-cover border border-border" />
              )}

              {/* Meta info */}
              <div className="bg-white border border-border p-6 space-y-4">
                <h4 className="font-sans text-xs tracking-widest uppercase text-muted border-b border-border pb-3">
                  {isAr ? "تفاصيل" : "Details"}
                </h4>
                {item.date && (
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-widest mb-1">
                      {isAr ? "التاريخ" : "Date"}
                    </p>
                    <p className="font-sans text-ink text-sm font-medium">{item.date}</p>
                  </div>
                )}
                <div>
                  <p className="font-sans text-xs text-muted uppercase tracking-widest mb-1">
                    {isAr ? "النوع" : "Type"}
                  </p>
                  <p className="font-sans text-ink text-sm font-medium capitalize">{collectionName.slice(0, -1)}</p>
                </div>
              </div>

              {/* Back link */}
              <Link href={backHref}
                className="flex items-center gap-2 font-sans text-gold text-xs tracking-widest uppercase hover:text-gold/70 transition-colors">
                <FiArrowLeft /> {backLabel}
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain" />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl"
          >
            ×
          </button>
        </div>
      )}
    </main>
  );
}
