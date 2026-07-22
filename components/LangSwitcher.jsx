"use client";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

export default function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(languages[0]);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (lang) => {
    setCurrent(lang);
    setOpen(false);
    const html = document.documentElement;
    html.setAttribute("lang", lang.code);
    html.setAttribute("dir", lang.dir);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-gold/30 px-3 py-1.5 text-white/70 hover:text-gold hover:border-gold/60 transition-all duration-200"
      >
        <span className="font-sans text-xs font-medium tracking-widest uppercase">
          {current.code}
        </span>
        <svg
          className={`w-3 h-3 text-gold transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown — w-auto so it shrinks to content width */}
      {open && (
        <div className="absolute top-full mt-2 right-0 w-auto min-w-0 bg-navy border border-gold/20 shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className={`relative w-full flex items-center gap-3 px-4 py-2.5 whitespace-nowrap transition-colors duration-150 group
                ${
                  current.code === lang.code
                    ? "bg-gold/10 text-gold"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
            >
              {/* Active indicator */}
              {current.code === lang.code && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold" />
              )}
              <span
                className="font-sans text-sm"
                style={{
                  fontFamily:
                    lang.code === "ar"
                      ? "'Noto Sans Arabic', sans-serif"
                      : "inherit",
                }}
              >
                {lang.native}
              </span>
              <span className="font-sans text-xs tracking-widest uppercase text-white/30 group-hover:text-gold/60">
                {lang.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
