import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="bg-gold py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0px, #0F172A 1px, transparent 1px, transparent 12px)`,
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="font-sans text-navy/60 text-xs tracking-[0.2em] uppercase mb-4 block">
          Featured Opportunity
        </span>
        <h2 className="font-display text-navy text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Have a Story That Needs Investigating?
        </h2>
        <p className="font-body text-navy/70 text-lg mb-10 max-w-2xl mx-auto">
          Whether you're a whistleblower, an editor, or an organisation looking
          for editorial partnership — let's talk. Your tip could become the story that changes everything.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="#contact" className="inline-block bg-navy text-gold font-sans text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-navy/90 transition-colors">
            Send a Tip
          </Link>
          <Link href="#stories" className="inline-block border-2 border-navy text-navy font-sans text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-navy/10 transition-colors">
            Read My Work
          </Link>
        </div>
      </div>
    </section>
  );
}
