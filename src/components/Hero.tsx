"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    hero.querySelectorAll("[data-rv]").forEach((el) => observer.observe(el));

    setTimeout(() => setIsLoaded(true), 100);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero relative min-h-[100svh] flex flex-col"
      style={{ padding: "0 var(--pad)" }}
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "46%",
          background: "linear-gradient(rgba(3,6,9,.72), rgba(3,6,9,.34) 46%, transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="hero-top relative z-20"
        style={{
          paddingTop: "calc(var(--nav-h) + clamp(12px,2.6vh,34px))",
          maxWidth: "min(560px,46vw)",
        }}
      >
        <p className="eyebrow flex items-center gap-2.5 mb-5" data-rv="up">
          <span
            className="dot"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--color-vermilion)",
              boxShadow: "0 0 10px var(--color-vermilion)",
            }}
            aria-hidden="true"
          />
          Champion Breeder
        </p>
        <h1
          id="hero-heading"
          className="display h-hero mb-4"
          data-rv="up"
          style={{ transitionDelay: "80ms" }}
        >
          From Our Home<span className="block" style={{ transitionDelay: "160ms" }}> to Yours</span>
        </h1>
        <p className="hero-sub body-lg max-w-[322px]" data-rv="up" style={{ transitionDelay: "240ms" }}>
          AKC Registered English & French Bulldogs — Champion Bloodlines, Home-Raised in Florida
        </p>
      </div>

      <div className="hero-spacer flex-1" style={{ minHeight: "clamp(140px,26vh,300px)" }} aria-hidden="true" />

      <div
        className="hero-foot relative z-20"
        style={{ paddingBottom: "clamp(22px,4.2vh,42px)" }}
      >
        <div
          className="hero-cue flex items-center justify-end gap-3 mb-3.5"
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
          data-rv="fade"
        >
          <span>Scroll to Begin</span>
          <div
            className="track relative overflow-hidden"
            style={{ width: "54px", height: "1px", background: "var(--color-line)" }}
          >
            <i
              className="animate-cue"
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--color-bone)",
                transformOrigin: "left",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="chapters grid grid-cols-4 gap-[clamp(14px,2.4vw,40px)] border-t border-[var(--color-line-soft)] pt-4.5" role="tablist" aria-label="Chapters">
          {[
            { label: "Threshold", desc: "The torii gate & moonlit approach" },
            { label: "Pathways", desc: "Lantern courts & moonlit gardens" },
            { label: "Craft", desc: "Sacred lessons & ancient wisdom" },
            { label: "Afterlight", desc: "The vermilion moon rises" },
          ].map((chapter, index) => (
            <button
              key={chapter.label}
              className="chip flex gap-3.5 items-start cursor-pointer"
              role="tab"
              aria-selected={false}
              data-rv="up"
              style={{ transitionDelay: `${320 + index * 80}ms` }}
            >
              <span className="num flex-none" style={{ transition: "color .4s, transform .5s var(--ease-out)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="tx min-w-0 pt-1">
                <b
                  className="block"
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-bone-dim)",
                    marginBottom: "6px",
                    transition: "color .4s",
                    textShadow: "0 1px 16px rgba(3,6,8,.9)",
                  }}
                >
                  {chapter.label}
                </b>
                <p
                  className="m-0"
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.5",
                    color: "#7d8781",
                    maxWidth: "22ch",
                    transition: "color .4s",
                  }}
                >
                  {chapter.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        <a
          href="#contact"
          className="arrowlink inline-flex items-center gap-3 mt-8"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-bone)",
            transitionDelay: "640ms",
          }}
          data-rv="up"
        >
          Reserve a Puppy
          <span
            className="ar grid place-items-center transition-all duration-450"
            style={{
              width: "34px",
              height: "34px",
              border: "1px solid var(--color-line)",
              borderRadius: "50%",
            }}
            aria-hidden="true"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transition: "transform .5s var(--ease-out)" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

      <aside
        className="hero-side absolute right-[var(--pad)] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3.5 pointer-events-none hidden md:flex"
        aria-hidden="true"
      >
        <span className="v" style={{ writingMode: "vertical-rl", fontSize: "13px", letterSpacing: "0.62em", color: "rgba(223,231,224,.5)" }}>
          ChampionBullies
        </span>
      </aside>
    </section>
  );
}