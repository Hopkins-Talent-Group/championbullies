"use client";

import { useEffect, useRef, useState } from "react";

const interests = [
  { value: "daphne", label: "Daphne — English Bulldog Female ($4,500)" },
  { value: "fred", label: "Fred — English Bulldog Male ($4,800)" },
  { value: "scooby", label: "Scooby — English Bulldog Male ($4,200)" },
  { value: "scrappy", label: "Scrappy — English Bulldog Male ($4,500)" },
  { value: "shaggy", label: "Shaggy — English Bulldog Male ($4,000)" },
  { value: "velma", label: "Velma — English Bulldog Female ($4,800)" },
  { value: "blue-angel", label: "Blue Angel — French Bulldog Male ($5,500)" },
  { value: "margo", label: "Margo — French Bulldog Female ($5,200)" },
  { value: "general", label: "General Inquiry" },
];

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", litterInterest: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("rv-in");
      });
    }, { threshold: 0.12 });
    root.querySelectorAll("[data-rv]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", message: "", litterInterest: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldStyle = { border: "1px solid var(--line)", background: "#ffffff" };

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-heading" style={{ borderTop: "1px solid var(--line-soft)", padding: "clamp(55px,11vh,144px) var(--pad)" }}>
      <div className="mx-auto grid grid-cols-1 gap-x-[89px] gap-y-[34px] lg:grid-cols-[1fr_1.618fr]" style={{ maxWidth: "var(--max-w)" }}>
        <div data-rv="up">
          <p className="eyebrow">Reserve a Puppy</p>
          <h2 id="contact-heading" className="display h-sec" style={{ marginTop: 13 }}>Get in Touch</h2>
          <p className="body-lg" style={{ marginTop: 21, maxWidth: "55ch" }}>
            Whether you&apos;re ready to reserve a puppy or just have questions about our program, we&apos;d love to hear from you.
          </p>
          <ul className="space-y-[13px]" style={{ margin: 0, padding: 0, listStyle: "none", marginTop: 34 }} role="list">
            <li>
              <a href="tel:+13212761159" className="flex items-center gap-[13px] transition-opacity hover:opacity-70" style={{ color: "var(--ink)", fontSize: 16, fontWeight: 500 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                (321) 276-1159
              </a>
            </li>
            <li>
              <a href="mailto:championbullies@aol.com" className="flex items-center gap-3 transition-opacity hover:opacity-70" style={{ color: "var(--ink)", fontSize: 15, fontWeight: 500 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                championbullies@aol.com
              </a>
            </li>
            <li>
              <span className="flex items-center gap-[13px]" style={{ color: "var(--body)", fontSize: 16 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Florida, USA
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} data-rv="up" style={{ transitionDelay: "120ms" }}>
          <div className="grid gap-[21px] sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="caption block" style={{ marginBottom: 8 }}>Name *</label>
              <input id="name" name="name" type="text" required autoComplete="name" value={formData.name} onChange={handleChange} className="w-full px-[13px] py-[13px] text-[16px]" style={fieldStyle} placeholder="Your name" aria-required="true" />
            </div>
            <div>
              <label htmlFor="email" className="caption block" style={{ marginBottom: 8 }}>Email *</label>
              <input id="email" name="email" type="email" required autoComplete="email" value={formData.email} onChange={handleChange} className="w-full px-[13px] py-[13px] text-[16px]" style={fieldStyle} placeholder="you@example.com" aria-required="true" />
            </div>
            <div>
              <label htmlFor="phone" className="caption block" style={{ marginBottom: 8 }}>Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className="w-full px-[13px] py-[13px] text-[16px]" style={fieldStyle} placeholder="(555) 555-5555" />
            </div>
            <div>
              <label htmlFor="litterInterest" className="caption block" style={{ marginBottom: 8 }}>I&apos;m interested in</label>
              <select id="litterInterest" name="litterInterest" value={formData.litterInterest} onChange={handleChange} className="w-full px-[13px] py-[13px] text-[16px]" style={fieldStyle}>
                <option value="">What are you interested in?</option>
                {interests.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 21 }}>
            <label htmlFor="message" className="caption block" style={{ marginBottom: 8 }}>Message *</label>
            <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full resize-none px-[13px] py-[13px] text-[16px]" style={fieldStyle} placeholder="Tell us about what you're looking for…" aria-required="true" />
          </div>

          <div className="flex flex-wrap items-center gap-[21px]" style={{ marginTop: 21 }}>
            <button type="submit" disabled={status === "submitting"} className="inline-flex items-center gap-[13px] transition-opacity hover:opacity-85 disabled:opacity-50" style={{ background: "var(--ink)", color: "#ffffff", padding: "13px 21px", borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", cursor: "pointer" }}>
              {status === "submitting" ? "Sending…" : status === "success" ? "Message Sent" : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm" role="alert" style={{ color: "var(--accent)" }}>Thank you! We&apos;ll be in touch within 24 hours.</p>
            )}
          </div>

        </form>
      </div>
    </section>
  );
}
