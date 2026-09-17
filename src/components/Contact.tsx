"use client";

import { useEffect, useRef, useState } from "react";

import { CONTACT, PUPPY_CATALOG, interestLabel } from "@/lib/site";
import type { ContactResponse } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error";

// Options come from the same catalog as the gallery cards: renaming a puppy or
// changing its price updates both surfaces with no second list to maintain.
const interestOptions = [
  ...PUPPY_CATALOG.map((puppy) => ({ value: puppy.key, label: interestLabel(puppy) })),
  { value: "general", label: "General Inquiry" },
];

const FAILURE_COPY: Record<string, string> = {
  network:
    "We couldn't reach the server. Check your connection and try again, or reach us by phone or email below.",
  default: "Something went wrong sending your message. Please try again or contact us directly.",
};

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", puppyKey: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
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
    setStatus("loading");
    setError(null);

    let payload: ContactResponse | null = null;
    let responseOk = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          puppyKey: formData.puppyKey === "" ? "general" : formData.puppyKey,
          message: formData.message.trim(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      responseOk = response.ok;
      payload = (await response.json().catch(() => null)) as ContactResponse | null;
    } catch {
      payload = null;
    }

    if (responseOk && payload?.success === true) {
      // Success is only shown after the server confirms it — never asserted locally.
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "", puppyKey: "" });
      setTimeout(() => setStatus("idle"), 8000);
      return;
    }

    // Surface the first server-side validation message when there is one;
    // otherwise fall back to honest generic copy (never a fake success).
    const serverMessage =
      payload && !payload.success ? payload.errors?.[0]?.message : undefined;
    setStatus("error");
    setError(serverMessage ?? (payload === null ? FAILURE_COPY.network : FAILURE_COPY.default));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldStyle = { border: "1px solid var(--line)", background: "#ffffff" };

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-heading" style={{ borderTop: "1px solid var(--line-soft)", padding: "clamp(89px,12vh,144px) var(--pad)" }}>
      <div className="mx-auto grid grid-cols-1 gap-x-[89px] gap-y-[55px] lg:grid-cols-[1fr_1.618fr]" style={{ maxWidth: "var(--max-w)" }}>
        <div data-rv="up">
          <p className="eyebrow">Reserve a Puppy</p>
          <h2 id="contact-heading" className="display h-sec" style={{ marginTop: 21 }}>Get in Touch</h2>
          <p className="body-lg" style={{ marginTop: 34, maxWidth: "55ch" }}>
            Whether you&apos;re ready to reserve a puppy or just have questions about our program, we&apos;d love to hear from you.
          </p>
          <ul className="space-y-[21px]" style={{ margin: 0, padding: 0, listStyle: "none", marginTop: 55 }} role="list">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-[13px] transition-opacity hover:opacity-70" style={{ color: "var(--ink)", fontSize: 16, fontWeight: 500 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {CONTACT.phoneLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 transition-opacity hover:opacity-70" style={{ color: "var(--ink)", fontSize: 15, fontWeight: 500 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <span className="flex items-center gap-[13px]" style={{ color: "var(--body)", fontSize: 16 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {CONTACT.location}
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} data-rv="up" style={{ transitionDelay: "120ms" }}>
          <div className="grid gap-[34px] sm:grid-cols-2">
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
              <label htmlFor="puppyKey" className="caption block" style={{ marginBottom: 8 }}>I&apos;m interested in</label>
              <select id="puppyKey" name="puppyKey" value={formData.puppyKey} onChange={handleChange} className="w-full px-[13px] py-[13px] text-[16px]" style={fieldStyle}>
                <option value="">What are you interested in?</option>
                {interestOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 34 }}>
            <label htmlFor="message" className="caption block" style={{ marginBottom: 8 }}>Message *</label>
            <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full resize-none px-[13px] py-[13px] text-[16px]" style={fieldStyle} placeholder="Tell us about what you're looking for…" aria-required="true" />
          </div>

          <div className="flex flex-wrap items-center gap-[21px]" style={{ marginTop: 34 }}>
            <button type="submit" disabled={status === "loading"} className="inline-flex items-center gap-[13px] transition-opacity hover:opacity-85 disabled:opacity-50" style={{ background: "var(--ink)", color: "#ffffff", padding: "13px 34px", borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", cursor: "pointer" }}>
              {status === "loading" ? "Sending…" : status === "success" ? "Message Sent" : "Send Message"}
            </button>
            <div aria-live="polite">
              {status === "success" && (
                <p className="text-sm" role="status" style={{ color: "var(--accent)" }}>
                  Thank you! We&apos;ll be in touch within 24 hours.
                </p>
              )}
              {status === "error" && error && (
                <p className="text-sm" role="alert" style={{ color: "#a11a1a" }}>{error}</p>
              )}
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}
