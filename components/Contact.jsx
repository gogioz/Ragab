"use client";
import { useState, useRef, useEffect } from "react";

export default function Contact() {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-8 bg-paper" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="section-label reveal block mb-4">
              Lead Generation / Freebie
            </span>
            <h2 className="font-display text-navy text-4xl lg:text-5xl font-bold leading-tight mb-4 reveal">
              Send a Tip or
              <br />
              Commission a Story
            </h2>
            <div className="accent-line reveal" />
            <p className="font-body text-ink/70 leading-relaxed mb-10 reveal">
              Whether you have a story tip, want to discuss a commission, or are
              looking for a TV production partner — my inbox is always open. All
              tips are treated with strict confidentiality.
            </p>
          </div>

          <div className="reveal">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-6">✓</div>
                  <h3 className="font-display text-navy text-2xl font-bold mb-3">
                    Message Received
                  </h3>
                  <p className="font-body text-ink/60">
                    Thank you for reaching out. I'll be in touch within 48
                    hours.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-border p-10 space-y-6">
                <h3 className="font-display text-navy text-2xl font-bold">
                  Get in Touch
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="font-sans text-xs tracking-widest uppercase text-muted mb-2 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="font-sans text-xs tracking-widest uppercase text-muted mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="font-sans text-xs tracking-widest uppercase text-muted mb-2 block">
                      Subject
                    </label>
                    <select
                      className="form-input"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option value="">Select a subject...</option>
                      <option>Story Tip (Confidential)</option>
                      <option>Commission / Editorial Work</option>
                      <option>TV Production Partnership</option>
                      <option>Speaking Engagement</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="font-sans text-xs tracking-widest uppercase text-muted mb-2 block">
                      Message
                    </label>
                    <textarea
                      className="form-input resize-none"
                      rows={5}
                      placeholder="Tell me about your story or project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full text-center"
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
