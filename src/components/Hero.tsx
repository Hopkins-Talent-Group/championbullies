"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("rv-in");
        });
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll("[data-rv]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="mx-auto grid grid-cols-1 items-center gap-x-[89px] gap-y-[55px] lg:grid-cols-[1.618fr_1fr]"
        style={{
          maxWidth: "var(--max-w)",
          padding: "clamp(89px,10vh,144px) var(--pad) clamp(89px,12vh,144px)",
        }}
      >
        <div>
          <p className="eyebrow flex items-center gap-3" data-rv="up">
            <span
              aria-hidden="true"
              className="inline-block"
              style={{ width: 21, height: 1, background: "var(--accent)" }}
            />
            Champion Breeder — Florida
          </p>
          <h1
            id="hero-heading"
            className="display h-hero"
            data-rv="up"
            style={{ marginTop: 34, transitionDelay: "90ms" }}
          >
            From Our Home
            <span style={{ color: "var(--accent)" }}> to Yours</span>
          </h1>
          <p
            className="body-lg"
            data-rv="up"
            style={{ marginTop: 34, maxWidth: "55ch", transitionDelay: "180ms" }}
          >
            AKC registered English &amp; French Bulldogs from champion bloodlines —
            home-raised, health-tested, and handled daily by our family.
          </p>
          <div
            className="flex flex-wrap items-center gap-x-[34px] gap-y-[13px]"
            data-rv="up"
            style={{ marginTop: 55, transitionDelay: "270ms" }}
          >
            <a
              href="#gallery"
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
              style={{
                background: "var(--ink)",
                color: "#ffffff",
                padding: "13px 34px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: ".22em",
                textTransform: "uppercase",
              }}
            >
              Meet the Puppies
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="tel:+13212761159" className="caption transition-opacity hover:opacity-70">
              (321) 276-1159
            </a>
          </div>
          <ul
            className="flex flex-wrap gap-x-[34px] gap-y-[13px]"
            data-rv="up"
            style={{ margin: 0, padding: 0, listStyle: "none", marginTop: 89, transitionDelay: "360ms" }}
          >
            {["AKC Registered", "Champion Bloodlines", "Home-Raised"].map((item) => (
              <li key={item} className="caption flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <figure
          className="relative"
          data-rv="up"
          style={{ margin: 0, transitionDelay: "150ms" }}
        >
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "4 / 5", outline: "1px solid var(--line)", outlineOffset: "-1px" }}
          >
            <Image
              src="/images/dogs/hero.jpg"
              alt="An English bulldog puppy held by a family member in our kitchen, 2024"
              fill
              priority
              sizes="(min-width: 900px) 44vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption
            className="caption flex items-center justify-between"
            style={{ marginTop: 13 }}
          >
            <span>Raised in our home — 2024</span>
            <span style={{ color: "var(--accent)" }}>ChampionBullies</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
