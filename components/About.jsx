"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 bg-paper" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="reveal relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
              <img
                src="/about.jpg"
                alt="Ahmed Ragab"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-gold" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold" />
            </div>
          </div>

          <div>
            <span className="section-label reveal block mb-4">Say Hi</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy leading-tight mb-4 reveal">
              About Me
            </h2>
            <div className="accent-line reveal" />
            <p className="font-body text-ink/80 text-lg leading-relaxed mb-6 reveal">
              Ahmed Ragab is a television producer and investigative journalist
              with a sixteen-year track record of producing high-quality print,
              television, and online reports.
            </p>
            <p className="font-body text-ink/70 leading-relaxed mb-6 reveal">
              He led the investigations unit at Al Masry Al Youm, the largest
              independent daily newspaper in Egypt, and produced the 'Sulta5'
              program on Deutsche Welle Arabic. Ragab received the ARIJ Arab
              Spring Award for Best Investigation in the Arab World in 2011 and
              has extensively covered human rights issues in his reporting.
            </p>
            <p className="font-body text-ink/70 leading-relaxed mb-6 reveal">
              This includes topics such as the prisoners' escape during the 2011
              Egyptian Revolution, the Anti-Terrorism Law and its impact on
              Egyptians' civil and political rights, and the murder of Italian
              researcher Giulio Regeni in 2016, allegedly by Egyptian security
              officers.
            </p>
            <p className="font-body text-ink/70 leading-relaxed mb-10 reveal">
              In recent years, he has written and produced critically acclaimed
              podcasts, including the investigative podcast series 'Ahraz' He
              also won the 2023 Mohammed Hassanein Heikal Foundation for Arab
              Journalism Award for the same podcast.
            </p>
            <div className="flex flex-wrap gap-3 reveal">
              {[
                "Investigative Reporting",
                "TV Production",
                "Documentary",
                "Data Journalism",
                "Long-form Writing",
                "Broadcast",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs font-medium tracking-widest uppercase px-3 py-2 border border-gold/40 text-gold bg-navy/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
