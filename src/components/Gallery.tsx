"use client";

import { useEffect, useRef, useState } from "react";

const puppies = [
  { name: "Blue Angel", gender: "male", image: "/images/gallery/20181128_193532-scaled.jpg", year: 2018 },
  { name: "Lolita", gender: "female", image: "/images/gallery/20181128_193902-scaled.jpg", year: 2018 },
  { name: "Margo", gender: "female", image: "/images/gallery/20190110_192601.jpg", year: 2019 },
  { name: "Agnes", gender: "female", image: "/images/gallery/20190110_191858.jpg", year: 2019 },
  { name: "Scout", gender: "male", image: "/images/gallery/20240624_180950-scaled.jpg", year: 2024 },
  { name: "Brutus", gender: "male", image: "/images/gallery/20180312_201748.jpg", year: 2018 },
  { name: "Stella", gender: "female", image: "/images/gallery/image1.jpeg", year: 2026 },
  { name: "Duke", gender: "male", image: "/images/gallery/bulldog-7476727_960_720.jpg", year: 2018 },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<"all" | "male" | "female">("all");
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

  const filteredPuppies = puppies.filter(
    (p) => activeFilter === "all" || p.gender === activeFilter
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="sec relative"
      style={{
        padding: "clamp(88px,15vh,190px) var(--pad)",
      }}
      aria-labelledby="gallery-heading"
    >
      <div className="fg" style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "visible" }} aria-hidden="true" />

      <div className="sec-head flex items-baseline gap-4 mb-[clamp(30px,5vh,66px)]" data-rv="up">
        <span className="k" style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-muted)" }}>
          <b style={{ color: "var(--color-vermilion)", fontWeight: 500 }}>Chapter II</b> — Still Gardens
        </span>
        <div className="rule flex-1 h-px" style={{ background: "var(--color-line-soft)" }} />
      </div>

      <div className="cards grid gap-[clamp(10px,1.4vw,22px)]" style={{ gridTemplateColumns: "repeat(3, 1fr)", alignItems: "start" }} role="list" aria-label="Puppy gallery">
        {filteredPuppies.map((puppy, index) => (
          <article
            key={puppy.name}
            className="card relative cursor-pointer"
            role="listitem"
            style={{
              transform: index === 0 ? "translateY(0)" : index === 1 ? `translateY(clamp(26px,5vw,74px))` : `translateY(clamp(52px,10vw,148px))`,
              transition: "transform .5s var(--ease-out)",
              transitionDelay: `${index * 120}ms`,
            }}
            data-rv="up"
          >
            <div
              className="card-fr relative isolation-isolate"
              style={{
                aspectRatio: "4/5",
                outline: "1px solid var(--color-line-soft)",
                outlineOffset: "-1px",
                transition: "outline-color .5s var(--ease)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.outlineColor = "rgba(223,231,224,.30)"}
              onMouseLeave={(e) => e.currentTarget.style.outlineColor = "var(--color-line-soft)"}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg,rgba(3,6,9,.04) 36%,rgba(3,6,9,.72) 100%), url('${puppy.image}') center / cover no-repeat`,
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(transparent 46%, rgba(4,6,9,.80))" }} />

              <div className="glow absolute pointer-events-none" style={{
                left: "var(--gx, 50%)",
                top: "var(--gy, 50%)",
                width: "calc(var(--gr, 100px) * 2)",
                aspectRatio: "1",
                transform: "translate(-50%, -50%)",
                mixBlendMode: "screen",
                animation: "glow-swell 4s var(--ease-io) infinite alternate",
              }}>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(closest-side, rgba(232,52,28,.6), rgba(158,20,16,.3) 40%, transparent 72%)",
                    animation: "glow-pulse 3s var(--ease-io) infinite",
                  }}
                />
              </div>

              <div className="card-lab absolute left-4 right-4 bottom-3.5 z-20 flex items-end justify-between gap-2.5">
                <b style={{ fontSize: "clamp(13px,1.15vw,17px)", fontWeight: 400, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  {puppy.name}
                </b>
                <span className="jp" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(223,231,224,.62)" }}>
                  {puppy.gender === "male" ? "雄" : "雌"}
                </span>
              </div>

              <div className="card-ar absolute top-3.5 right-3.5 z-20 w-[26px] h-[26px]" style={{ opacity: 0, transform: "translate3d(-4px,4px,0)", transition: ".5s var(--ease-out)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-bone)" }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="card-meta flex justify-between mt-3" style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-muted)" }}>
                <span>{puppy.year}</span>
                <span>AKC Registered</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        @keyframes glow-swell {
          from { transform: translate(-50%, -50%) scale(0.93); }
          to { transform: translate(-50%, -50%) scale(1.07); }
        }
        @keyframes glow-pulse {
          from { opacity: 0.78; }
          50% { opacity: 1; }
          to { opacity: 0.78; }
        }
        @media (prefers-reduced-motion: reduce) {
          .glow, .glow > div { animation: none; }
        }
      `}</style>
    </section>
  );
}