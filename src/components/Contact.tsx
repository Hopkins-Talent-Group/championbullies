"use client";

import { useEffect, useRef, useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    litterInterest: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("rv-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", message: "", litterInterest: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="sec relative"
      style={{
        padding: "clamp(88px,15vh,190px) var(--pad)",
      }}
      aria-labelledby="contact-heading"
    >
      <div className="e-con-inner">
        <div className="e-con-full e-flex e-con e-child" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 100px)", alignItems: "start" }}>
          <div className="e-con-full e-flex elementor-invisible e-con e-child" data-rv="fade" style={{ animation: "fadeInLeft 1s var(--ease-out) forwards", opacity: 0 }}>
            <h2 id="contact-heading" className="h-sec" style={{ marginBottom: "clamp(30px,5vh,66px)" }}>
              Get in Touch
            </h2>
            <p className="body-lg" style={{ marginBottom: "clamp(30px,5vh,66px)" }}>
              We&apos;re excited to help you find the perfect <strong>English or French Bulldog companion</strong>! Whether you&apos;re ready to reserve a puppy or just have questions about our breeding program, we&apos;d love to hear from you.
            </p>

            <ul className="elementor-icon-list-items space-y-4" role="list" aria-label="Contact information">
              <li className="elementor-icon-list-item">
                <a href="#contact" className="flex items-center gap-3">
                  <span className="elementor-icon-list-icon flex-shrink-0" style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 384 512" fill="currentColor" style={{ color: "var(--color-bone)" }}>
                      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                    </svg>
                  </span>
                  <span className="elementor-icon-list-text">Florida, USA</span>
                </a>
              </li>
              <li className="elementor-icon-list-item">
                <a href="mailto:championbullies@aol.com" className="flex items-center gap-3">
                  <span className="elementor-icon-list-icon flex-shrink-0" style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" style={{ color: "var(--color-bone)" }}>
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                    </svg>
                  </span>
                  <span className="elementor-icon-list-text">championbullies@aol.com</span>
                </a>
              </li>
              <li className="elementor-icon-list-item">
                <a href="tel:+13212761159" className="flex items-center gap-3">
                  <span className="elementor-icon-list-icon flex-shrink-0" style={{ width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" style={{ color: "var(--color-bone)" }}>
                      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                    </svg>
                  </span>
                  <span className="elementor-icon-list-text">(321) 276-1159</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="e-con-full e-flex elementor-invisible e-con e-child" data-rv="fade" style={{ animation: "fadeInRight 1s var(--ease-out) forwards", opacity: 0, animationDelay: "200ms" }}>
            <p className="body-lg mb-6">
              Fill out the form below and we&apos;ll get back to you as soon as possible — usually within 24 hours.
            </p>
            <p className="body-lg mb-8">
              We respond promptly to serious inquiries. If you&apos;re interested in a specific litter or upcoming puppies, please mention that in your message!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] focus:border-[var(--color-vermilion)] focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors"
                    placeholder="Your Name"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] focus:border-[var(--color-vermilion)] focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors"
                    placeholder="your@email.com"
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] focus:border-[var(--color-vermilion)] focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </div>
                <div>
                  <label htmlFor="litterInterest" className="block text-xs font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">
                    Litter Interest
                  </label>
                  <select
                    id="litterInterest"
                    name="litterInterest"
                    value={formData.litterInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] focus:border-[var(--color-vermilion)] focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors appearance-none"
                  >
                    <option value="">Select a litter</option>
                    <option value="english-current">Current English Bulldog Litter</option>
                    <option value="french-current">Current French Bulldog Litter</option>
                    <option value="english-upcoming">Upcoming English Bulldog Litter</option>
                    <option value="french-upcoming">Upcoming French Bulldog Litter</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--color-ink-2)] border border-[var(--color-line)] focus:border-[var(--color-vermilion)] focus:outline-none focus:ring-1 focus:ring-[var(--color-vermilion)] transition-colors resize-none"
                  placeholder="Tell us about what you're looking for..."
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="cta inline-flex items-center gap-3.5 w-full md:w-auto px-7.5 py-4 border border-[var(--color-line)] rounded-full overflow-hidden transition-all duration-450"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                <span className="relative z-10" style={{ transition: "color .45s var(--ease)" }}>
                  {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                </span>
                <span className="relative z-10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: "transform .62s var(--ease-out)" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <i className="absolute inset-0 transition-transform duration-600" style={{
                  background: "var(--color-bone)",
                  transform: "translate3d(0,101%,0)",
                  zIndex: -1,
                }} aria-hidden="true" />
              </button>

              {status === "success" && (
                <p className="text-sm text-[var(--color-vermilion)]" role="alert">
                  Thank you! We&apos;ll be in touch within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translate3d(-30px, 0, 0); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translate3d(30px, 0, 0); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .elementor-invisible { animation: none !important; opacity: 1 !important; }
        }
        .cta:hover i { transform: none; }
        .cta:hover { color: #05070a; border-color: var(--color-bone); }
        .cta:hover svg path { stroke: #05070a; }
        @media (max-width: 768px) {
          .e-con-inner > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}