"use client";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function Stories() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");
  const ref = useRef(null);

  useEffect(() => {
    if (document.documentElement.getAttribute("lang") === "ar") setLang("ar");
    const fetch = async () => {
      try {
        const q = query(
          collection(db, "podcasts"),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        setPodcasts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        const snap = await getDocs(collection(db, "podcasts"));
        setPodcasts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const isAr = lang === "ar";
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  console.log(podcasts);
  return (
    <section id="stories" className="py-28 bg-paper" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <span className="section-label reveal block mb-4">Latest Work</span>
            <h2 className="font-display text-navy text-4xl lg:text-5xl font-bold reveal">
              Published Stories
            </h2>
            <div className="accent-line mt-6 reveal" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-8 reveal" dir="rtl">
          <div className="lg:col-span-3 bg-navy p-10 card-hover group cursor-pointer">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-gold text-xs tracking-widest uppercase">
                03/28/2022
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span className="font-sans text-white/40 text-xs">
                {/* {featured.date} */}
              </span>
            </div>
            <h3 className="font-display text-white text-2xl lg:text-3xl font-bold leading-tight mb-4 group-hover:text-gold transition-colors"></h3>
            <div className="w-8 h-px bg-gold mb-4 group-hover:w-16 transition-all duration-300" />
            <p
              className="font-body text-white/60 leading-relaxed mb-8"
              dir="rtl"
            >
              نتتبّع سِيَر أربع شخصيات لكي نحاول أن نفهم ماذا حصل ذلك اليوم
              الحار من يوليو ٢٠١٨ عندما وُجدَ الأنبا إبيفانيوس مقتولاً داخل حرم
              الدير الذي يرأسه في شمال مصر.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-sans text-gold/60 text-xs">
                {/* {featured.readTime} */}
              </span>
              {/* <span className="font-sans text-gold text-xs font-medium tracking-widest uppercase flex items-center gap-2">
                Read Story <span>→</span>
              </span> */}
            </div>
          </div>
          <div
            className="lg:col-span-2 min-h-[280px] relative"
            style={{
              background: "linear-gradient(135deg, #1e2d4a 0%, #0F172A 100%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-sans tracking-widest uppercase">
              <img
                src="https://res.cloudinary.com/dq7fwsius/image/upload/v1772834078/evibbrsa8iwf0tmoo8fj.png"
                alt="Ahmed Ragab"
                className="w-full h-full object-cotain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast, i) => (
            <article
              key={i}
              className="border border-border bg-white p-7 card-hover group cursor-pointer reveal"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-sans text-gold text-xs tracking-widest uppercase">
                  {podcast.titleAr}
                </span>
                <span className="text-muted text-xs">·</span>
                <span className="font-sans text-muted text-xs">
                  {/* {story.date} */}
                </span>
              </div>
              <h3 className="font-display text-navy text-lg font-bold leading-tight mb-3 group-hover:text-gold transition-colors">
                {/* {story.title} */}
              </h3>
              <div className="w-6 h-px bg-gold mb-3 group-hover:w-12 transition-all duration-300" />
              <p className="font-body text-ink/60 text-sm leading-relaxed mb-6">
                {/* {story.excerpt} */}
              </p>
              <span className="font-sans text-muted text-xs">
                {/* {story.readTime} */}
              </span>
            </article>
          ))}
        </div>

        <div className="text-center mt-14 reveal">
          <Link href="/stories" className="btn-primary">
            All Published Work
          </Link>
        </div>
      </div>
    </section>
  );
}
