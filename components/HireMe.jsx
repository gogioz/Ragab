import Link from "next/link";

const plans = [
  {
    tier: "Article Commission",
    price: "From $2,500",
    features: [
      "3,000–8,000 word investigations",
      "Full research & sourcing",
      "Photography coordination",
      "Two rounds of edits",
    ],
  },
  {
    tier: "TV Production",
    price: "Custom Quote",
    features: [
      "Documentary development",
      "Research & pre-production",
      "On-location production",
      "Post-production oversight",
    ],
    featured: true,
  },
  {
    tier: "Editorial Consulting",
    price: "From $500/day",
    features: [
      "Story development sessions",
      "Newsroom workshops",
      "Investigative strategy",
      "Source development training",
    ],
  },
];

export default function HireMe() {
  return (
    <section className="py-28 bg-paper border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* <span className="section-label block mb-6">Ask for the Sale</span> */}
        <h2 className="font-display text-navy text-4xl lg:text-6xl font-bold leading-tight mb-6">
          Ready to Work Together?
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
        <p className="font-body text-ink/70 text-xl leading-relaxed max-w-2xl mx-auto mb-12">
          Whether you need an investigative piece, a documentary producer, or an
          editorial consultant — I take on a limited number of projects each
          year. Let's make sure yours is one of them.
        </p>

        {/* <div className="grid md:grid-cols-3 gap-6 mb-14 text-left">
          {plans.map((p) => (
            <div
              key={p.tier}
              className={`p-8 border card-hover ${p.featured ? "bg-navy border-navy text-white" : "bg-white border-border"}`}
            >
              {p.featured && (
                <span className="font-sans text-gold text-xs tracking-widest uppercase mb-3 block">
                  Most Popular
                </span>
              )}
              <h3
                className={`font-display text-xl font-bold mb-2 ${p.featured ? "text-white" : "text-navy"}`}
              >
                {p.tier}
              </h3>
              <p
                className={`font-display text-2xl font-bold mb-5 ${p.featured ? "text-gold" : "text-navy"}`}
              >
                {p.price}
              </p>
              <div
                className={`w-8 h-px mb-5 ${p.featured ? "bg-gold" : "bg-gold/50"}`}
              />
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={`font-sans text-sm flex items-start gap-2 ${p.featured ? "text-white/70" : "text-ink/70"}`}
                  >
                    <span className="text-gold mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        <Link href="#contact" className="btn-primary text-sm px-12 py-5">
          Start a Conversation
        </Link>
        <p className="font-sans text-muted text-sm mt-4">
          Not sure what you need? Get in touch — we'll figure it out together.
        </p>
      </div>
    </section>
  );
}
