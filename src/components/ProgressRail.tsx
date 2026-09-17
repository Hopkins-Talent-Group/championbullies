"use client";

import { useEffect, useRef, useState } from "react";

const sections = ["home", "gallery", "contact"];

export function ProgressRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveIndex(index);
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
    }
  };

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches) {
    return null;
  }

  return (
    <div
      ref={railRef}
      className="rail fixed"
      style={{
        right: "calc(var(--pad) - 4px)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 45,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "center",
      }}
      aria-label="Section progress"
      role="navigation"
    >
      {sections.map((id, index) => (
        <button
          key={id}
          className={`rail-btn ${activeIndex === index ? "on" : ""}`}
          onClick={() => scrollTo(id)}
          aria-current={activeIndex === index ? "page" : undefined}
          aria-label={`Go to ${id === "home" ? "Home" : id === "gallery" ? "Gallery" : "Contact"}`}
          style={{
            width: "22px",
            height: "10px",
            display: "grid",
            placeItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <i
            style={{
              display: "block",
              width: activeIndex === index ? "22px" : "14px",
              height: "1px",
              background: activeIndex === index ? "var(--color-bone)" : "rgba(223,231,224,.26)",
              transition: "width .5s var(--ease-out), background .5s var(--ease-out)",
            }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}