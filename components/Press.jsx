"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Jane's investigation into offshore tax networks was the most rigorous, carefully sourced piece of financial journalism I've edited in 20 years. It sparked three parliamentary inquiries.",
    name: "Michael Okafor",
    title: "Executive Editor, The Financial Chronicle",
  },
  {
    quote: "She embedded with our documentary team for eight months and completely transformed how we think about narrative structure. The film won a BAFTA. That says it all.",
    name: "Sara Lindqvist",
    title: "Head of Documentaries, Nordic Broadcasting",
  },
  {
    quote: "When we needed someone who could handle both the data and the human story, Jane was the only name on our list. She delivered a piece that changed policy.",
    name: "Dr. Amara Nwosu",
    title: "Director, Centre for Investigative Journalism",
  },
  {
    quote: "Jane's broadcast instincts are unmatched. She knows what makes compelling television without ever sacrificing journalistic integrity. Rare combination.",
    name: "Tom Beckett",
    title: "Senior Producer, World News Network",
  },
];

const outlets = ["The Guardian","BBC","Channel 4","Reuters","Der Spiegel","Le Monde","Al Jazeera","Wired"];

export default function Press() {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const t = testimonials[current];

  return (
    <section id="press" className="py-28 bg-navy" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <span className="section-label reveal block mb-4">Testimonials / Proof Points</span>
          <h2 className="font-display text-white text-4xl lg:text-5xl font-bold reveal">What Editors Say</h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-6 reveal" />
        </div>

        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="quote-mark mb-2">"</div>
          <blockquote className="font-display text-white text-xl lg:text-2xl leading-relaxed italic mb-8 transition-all duration-500">
            {t.quote}
          </blockquote>
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="font-sans text-gold font-medium">{t.name}</p>
          <p className="font-sans text-white/40 text-sm mt-1">{t.title}</p>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`dot ${i === current ? "active" : ""}`}
                style={{ borderRadius: i === current ? "2px" : "50%", width: i === current ? "24px" : "8px" }}
              />
            ))}
          </div>
        </div>

        <div className="mt-24 reveal">
          <p className="font-sans text-white/30 text-xs tracking-[0.2em] uppercase text-center mb-10">Published & Broadcast In</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {outlets.map((outlet) => (
              <span key={outlet} className="font-display text-white/30 text-lg font-bold hover:text-gold/60 transition-colors cursor-default tracking-wide">
                {outlet}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
