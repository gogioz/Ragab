import Link from "next/link";
import {
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiFacebook,
  FiMail,
} from "react-icons/fi";

const socials = [
  {
    icon: <FiFacebook />,
    href: "https://www.facebook.com/citizenRagab?paipv=0&eav=AfYLiY6GfrujG83JUu8B592rGC6k6zjTSSJa4rfiltnAfVEiNU1XEcTUfXKiLgBuNaE&_rdr",
    label: "Facebook",
  },
  { icon: <FiTwitter />, href: "https://x.com/Ragab", label: "Twitter" },
  {
    icon: <FiLinkedin />,
    href: "http://linkedin.com/in/ahmed-ragab-7a542216/",
    label: "LinkedIn",
  },
  { icon: <FiMail />, href: "ahmed.m.ragab@proton.me", label: "Mail" },
];

const footerLinks = [
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60">
      <div className="border-t border-gold/20 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Link
              href="/"
              className="font-display text-gold text-2xl font-bold tracking-widest block mb-4"
            >
              Ahmed Ragab
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
              Investigative Reporter, Journalist & TV Producer. Telling the
              stories that demand to be told.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-white text-xs font-semibold tracking-widest uppercase mb-5">
              Follow My Work
            </h4>
            <div className="flex gap-4 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/40 hover:text-gold transition-colors text-xl"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="border border-white/10 p-4">
              <p className="font-sans text-xs text-white/40 mb-3">
                Get new investigations in your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-xs font-sans text-white placeholder:text-white/30 outline-none focus:border-gold/50 transition-colors"
                />
                <button className="bg-gold text-navy px-4 py-2 font-sans text-xs font-semibold hover:bg-gold-light transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} Ahmed Ragab. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <p className="font-sans text-xs text-white/30">
              Designed By{" "}
              <span>
                <a className="underline" href="https://hagerfathi.netlify.app/">
                  Hager Fathi
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
