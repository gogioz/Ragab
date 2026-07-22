"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 1s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <section className="relative min-h-screen bg-navy flex items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A96A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="section-label mb-6 block">
              Investigative Reporter · Journalist · TV Producer
            </span>
            <h1
              ref={headlineRef}
              className="font-display text-white text-5xl lg:text-7xl font-bold leading-[1.08] mb-6"
            >
              Stories That <span className="text-gold italic">Demand</span> to
              Be Told
            </h1>
            <div className="accent-line" />
            <p className="font-body text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
              Award-winning investigative journalist with 15+ years uncovering
              the stories that matter — from war zones to corporate boardrooms,
              across print, digital, and television.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#work" className="btn-primary">
                View My Work
              </Link>
              <Link href="#contact" className="btn-outline">
                Get in Touch
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                { n: "100+", label: "Published Investigations" },
                { n: "15", label: "Years Experience" },
                { n: "8", label: "Press Awards" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-gold text-3xl font-bold">
                    {s.n}
                  </p>
                  <p className="font-sans text-white/50 text-xs tracking-widest uppercase mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo — naturally sized to the image */}
          <div className="relative hidden lg:flex justify-center">
            {/* Offset border — matches the image size exactly */}
            <div className="relative inline-block">
              <div className="absolute -top-4 -right-4 -bottom-0 -left-0 border-2 border-gold/30 pointer-events-none" />

              <div className="relative overflow-hidden">
                <img
                  src="hero.png"
                  alt="Ahmed Ragab — Investigative Reporter & TV Producer"
                  className="block w-full max-w-sm object-contain"
                />

                {/* Gold caption bar */}
                <div className="bg-gold px-6 py-4">
                  <p className="font-display text-navy font-bold text-lg">
                    Ahmed Ragab
                  </p>
                  <p className="font-sans text-navy/70 text-xs tracking-widest uppercase">
                    Investigative Reporter & TV Producer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
