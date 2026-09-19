"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { id: "home", label: "Home", number: "01" },
  { id: "why-us", label: "Why us", number: "02" },
  { id: "gallery", label: "Puppies", number: "03" },
  { id: "about", label: "About", number: "04" },
  { id: "contact", label: "Reserve", number: "05" },
];

// Derived from the list above so a new chapter is watched for automatically.
// The old hand-written array silently stopped highlighting whenever a section
// was added to the page — this is that drift, closed.
const SECTION_IDS = chapters.map((chapter) => chapter.id);

export function Navigation() {
  const [isStuck, setIsStuck] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsStuck(scrollY > 100);

      SECTION_IDS.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveChapter(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`nav fixed top-0 left-0 z-50 flex items-center gap-6 px-[var(--pad)] transition-transform duration-550 ${isStuck ? "stuck" : ""} ${isMenuOpen ? "menu-open" : ""}`}
      style={{ height: "var(--nav-h)", width: "var(--vw)" }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="brand flex items-center gap-3 flex-none" aria-label="ChampionBullies">
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect width="32" height="32" fill="#05070a" />
          <circle cx="16" cy="17" r="8" fill="#e0231c" />
          <rect x="4" y="8" width="24" height="2.6" fill="#dfe7e0" />
          <rect x="7" y="13" width="18" height="2" fill="#dfe7e0" />
        </svg>
        <div className="brand-tx flex flex-col leading-none gap-1">
          <b style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.26em" }}>
            ChampionBullies
          </b>
          <i style={{ fontStyle: "normal", fontSize: "8px", letterSpacing: "0.34em", color: "var(--color-muted)" }}>
            AKC Registered
          </i>
        </div>
      </div>

      <div
        className={`nav-links flex gap-[clamp(18px,2.6vw,46px)] ${isMenuOpen ? "mobile-open" : "hidden md:flex"}`}
        role="menubar"
        style={{
          transition: isMenuOpen
            ? "transform .65s cubic-bezier(0.22, 0.61, 0.36, 1), opacity .4s, visibility 0s"
            : "transform .65s cubic-bezier(0.22, 0.61, 0.36, 1), opacity .4s, visibility 0s linear .65s",
        }}
      >
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            className={`nav-link relative block h-15 leading-15 overflow-hidden ${activeChapter === index ? "on" : ""}`}
            onClick={() => scrollTo(chapter.id)}
            role="menuitem"
            aria-current={activeChapter === index ? "page" : undefined}
            style={{
              fontSize: isMenuOpen ? "17px" : "11px",
              fontWeight: 500,
              letterSpacing: isMenuOpen ? "0.2em" : "0.2em",
              textTransform: "uppercase",
              color: activeChapter === index ? "var(--color-bone)" : "var(--color-bone-dim)",
              width: isMenuOpen ? "100%" : "auto",
              height: isMenuOpen ? "auto" : "15px",
              padding: isMenuOpen ? "17px 0" : "0",
              overflow: isMenuOpen ? "visible" : "hidden",
              borderBottom: isMenuOpen ? "1px solid var(--color-line-soft)" : "none",
              textAlign: isMenuOpen ? "left" : "left",
            }}
          >
            <span
              style={{
                display: "block",
                height: isMenuOpen ? "auto" : "15px",
                lineHeight: isMenuOpen ? "1.2" : "15px",
                transform: isMenuOpen ? "none !important" : "translate3d(0,0,0)",
                transition: "transform .55s var(--ease-out), color .3s",
              }}
            >
              {chapter.label}
            </span>
            <span
              className="alt"
              style={{
                position: isMenuOpen ? "static" : "absolute",
                inset: isMenuOpen ? "auto" : 0,
                transform: isMenuOpen ? "none" : "translate3d(0,100%,0)",
                color: "var(--color-bone)",
                letterSpacing: "0.32em",
                display: "block",
                height: isMenuOpen ? "auto" : "15px",
                lineHeight: isMenuOpen ? "1.2" : "15px",
                marginTop: isMenuOpen ? "6px" : 0,
                fontSize: isMenuOpen ? "10px" : "11px",
                transition: "transform .55s var(--ease-out)",
              }}
            >
              {chapter.number}
            </span>
          </button>
        ))}
      </div>

      <button
        className="nav-burger flex-none relative md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        style={{ width: "26px", height: "16px", marginLeft: "clamp(18px,2.6vw,42px)" }}
      >
        <i
          style={{
            position: "absolute",
            right: 0,
            height: "1.5px",
            background: "var(--color-bone)",
            transition: "width .45s var(--ease-out), transform .45s var(--ease-out)",
            top: isMenuOpen ? "7px" : "4px",
            width: "26px",
            transform: isMenuOpen ? "rotate(45deg)" : "none",
            transformOrigin: "center",
          }}
        />
        <i
          style={{
            position: "absolute",
            right: 0,
            height: "1.5px",
            background: "var(--color-bone)",
            transition: "width .45s var(--ease-out), transform .45s var(--ease-out)",
            top: isMenuOpen ? "7px" : "11px",
            width: isMenuOpen ? "26px" : "17px",
            transform: isMenuOpen ? "rotate(-45deg)" : "none",
            transformOrigin: "center",
            opacity: isMenuOpen ? 0 : 1,
          }}
        />
      </button>
    </nav>
  );
}