"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import LangSwitcher from "@/components/LangSwitcher";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stories", href: "#stories" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check on mount in case page is already scrolled
    setScrolled(window.scrollY > 80);

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy shadow-lg shadow-black/20"
          : "bg-navy/95 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-gold text-3xl font-bold tracking-widest shrink-0"
        >
          Ahmed Ragab
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-white/80 hover:text-gold font-sans text-s font-medium tracking-[0.15em] uppercase transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <LangSwitcher />
          </li>
          {/* <li>
            <Link href="#contact" className="btn-primary text-xs py-2.5 px-6">
              Hire Me
            </Link>
          </li> */}
        </ul>

        {/* Mobile hamburger — inside nav, right side */}
        <button
          className="md:hidden text-gold text-2xl p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-gold font-sans text-sm font-medium tracking-widest uppercase transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div>
            <LangSwitcher />
          </div>
          <Link
            href="#contact"
            className="btn-primary text-center text-xs"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
}
