"use client";

import { useEffect, useRef } from "react";

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="foot relative"
      style={{
        padding: "clamp(50px,8vh,96px) var(--pad) clamp(26px,4vh,40px)",
        borderTop: "1px solid var(--color-line-soft)",
      }}
      role="contentinfo"
    >
      <div className="foot-grid grid gap-[clamp(22px,4vw,60px)]" style={{ gridTemplateColumns: "minmax(0,1.4fr) repeat(3, minmax(0,.6fr))" }} data-rv="up">
        <div className="foot-brand">
          <p className="site-description show" style={{ marginBottom: "16px" }}>
            AKC Registered | Champion Bloodlines | Home-Raised Bulldogs
          </p>
        </div>
        <nav aria-label="Puppies">
          <h4 style={{ margin: "0 0 16px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-muted)" }}>
            Puppies
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
            <li><a href="#gallery" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Available Puppies</a></li>
            <li><a href="#gallery" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>English Bulldogs</a></li>
            <li><a href="#gallery" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>French Bulldogs</a></li>
            <li><a href="#contact" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Reserve a Puppy</a></li>
          </ul>
        </nav>
        <nav aria-label="About">
          <h4 style={{ margin: "0 0 16px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-muted)" }}>
            About Us
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
            <li><a href="#home" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Our Story</a></li>
            <li><a href="#contact" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Breeding Program</a></li>
            <li><a href="#contact" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Health Guarantee</a></li>
            <li><a href="#contact" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Testimonials</a></li>
          </ul>
        </nav>
        <nav aria-label="Contact">
          <h4 style={{ margin: "0 0 16px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-muted)" }}>
            Contact
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
            <li><a href="tel:+13212761159" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>(321) 276-1159</a></li>
            <li><a href="mailto:championbullies@aol.com" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>championbullies@aol.com</a></li>
            <li><a href="#contact" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Florida, USA</a></li>
            <li><a href="#contact" style={{ fontSize: "13px", color: "#8f9a93", transition: "color .35s" }}>Visit Us</a></li>
          </ul>
        </nav>
      </div>

      <div className="foot-base flex flex-col md:flex-row justify-between items-center gap-5 flex-wrap" style={{ marginTop: "clamp(38px,6vh,74px)", paddingTop: "20px", borderTop: "1px solid var(--color-line-soft)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-muted)" }} data-rv="up">
        <span>&copy; {new Date().getFullYear()} ChampionBullies. All rights reserved.</span>
        <span style={{ display: "flex", gap: "24px" }}>
          <a href="#home" style={{ transition: "color .35s" }}>Privacy Policy</a>
          <a href="#home" style={{ transition: "color .35s" }}>Terms of Service</a>
        </span>
        <span style={{ textAlign: "right" }}>Made with care in Florida</span>
      </div>
    </footer>
  );
}