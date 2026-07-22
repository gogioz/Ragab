"use client";
import { useState, useEffect, useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

const services = [
  {
    title: "Investigations",
    subtitle: "Exposing the Truth",
    description:
      "Long-term investigative journalism tracking corruption, abuse of power, and systemic injustice. Documents, data, sources — followed wherever they lead.",
    benefit: "Hold power accountable. Drive real change.",
    icon: "🔍",
    href: "/investigations",
    linkLabel: "All Investigations",
  },
  {
    title: "Podcasts",
    subtitle: "Audio Storytelling",
    description:
      "Produced and hosted podcast series covering investigative stories, interviews with key figures, and deep dives into the stories behind the headlines.",
    benefit: "Journalism that reaches audiences wherever they are.",
    icon: "🎙️",
    href: "/podcasts",
    linkLabel: "All Podcasts",
  },
];
export default function Work() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const prev = () => setCurrent((c) => (c === 0 ? services.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === services.length - 1 ? 0 : c + 1));

  return (
    <section id="work" className="py-28 bg-navy" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="section-label reveal block mb-4">What I Do</span>
          <h2 className="font-display text-white text-4xl lg:text-5xl font-bold reveal">
            My Work
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-6 reveal" />
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-2 gap-6 reveal">
          {services.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="bg-white/5 border border-white/10 p-8 hover:border-gold/50 transition-all duration-300 group card-hover flex flex-col"
            >
              <div className="text-4xl mb-5">{s.icon}</div>
              <p className="font-sans text-gold text-xs tracking-widest uppercase mb-2">
                {s.subtitle}
              </p>
              <h3 className="font-display text-white text-xl font-bold mb-4">
                {s.title}
              </h3>
              <div className="w-8 h-px bg-gold mb-4 group-hover:w-16 transition-all duration-300" />
              <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
                {s.description}
              </p>
              <p className="font-sans text-gold text-xs font-medium italic mb-8">
                {s.benefit}
              </p>

              {/* Arrow CTA — pushed to bottom */}
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
                <span className="font-sans text-white/50 text-xs tracking-widest uppercase group-hover:text-gold transition-colors duration-200">
                  {s.linkLabel}
                </span>
                <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:border-gold group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
                  <FiArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="lg:hidden">
          <Link
            href={services[current].href}
            className="block bg-white/5 border border-white/10 p-8 group"
          >
            <div className="text-4xl mb-5">{services[current].icon}</div>
            <p className="font-sans text-gold text-xs tracking-widest uppercase mb-2">
              {services[current].subtitle}
            </p>
            <h3 className="font-display text-white text-2xl font-bold mb-4">
              {services[current].title}
            </h3>
            <div className="w-8 h-px bg-gold mb-4" />
            <p className="font-body text-white/60 leading-relaxed mb-6">
              {services[current].description}
            </p>
            <p className="font-sans text-gold text-sm font-medium italic mb-8">
              {services[current].benefit}
            </p>

            {/* Arrow CTA */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-sans text-white/50 text-xs tracking-widest uppercase group-hover:text-gold transition-colors">
                {services[current].linkLabel}
              </span>
              <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:border-gold group-hover:text-gold transition-all duration-200">
                <FiArrowUpRight size={13} />
              </span>
            </div>
          </Link>

          <div className="flex items-center justify-between mt-6">
            <button onClick={prev} className="btn-outline p-3 text-lg">
              <FiArrowLeft />
            </button>
            <div className="flex gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`dot ${i === current ? "active" : ""}`}
                />
              ))}
            </div>
            <button onClick={next} className="btn-outline p-3 text-lg">
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-12 text-center reveal">
          <p className="font-display text-white/50 text-lg italic max-w-2xl mx-auto">
            "From raw tip to published investigation — I handle the full
            journey, so you get a story the world talks about."
          </p>
        </div>
      </div>
    </section>
  );
}
