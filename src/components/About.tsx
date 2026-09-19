"use client";

import { ABOUT } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";

/**
 * The old site's "About Us" story, restored with the #about anchor the
 * WordPress navigation and sitemap pointed at. The program facts are set as a
 * definition list beside the narrative instead of being buried in the prose.
 */
export function About() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      style={{
        borderTop: "1px solid var(--line-soft)",
        padding: "clamp(89px, 12vh, 144px) var(--pad)",
        backgroundColor: "var(--paper)",
        backgroundImage: "radial-gradient(rgba(0,0,0,0.0809) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
        backgroundPosition: "0 0",
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 gap-x-[89px] gap-y-[55px] lg:grid-cols-[1.618fr_1fr]"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <div data-rv="up">
          <p className="eyebrow">{ABOUT.eyebrow}</p>
          <h2 id="about-heading" className="display h-sec" style={{ marginTop: 21 }}>
            {ABOUT.heading}
          </h2>
          <p
            className="body-lg"
            style={{ marginTop: 34, maxWidth: "44ch", fontSize: 21, lineHeight: 1.5, color: "var(--ink)" }}
          >
            {ABOUT.lead}
          </p>

          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body-lg" style={{ marginTop: 21, maxWidth: "62ch" }}>
              {paragraph}
            </p>
          ))}

          <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 34, marginTop: 55 }}>
            <h3
              style={{
                fontFamily: "var(--font-slab)",
                fontWeight: 600,
                fontSize: "var(--fs-h3)",
                lineHeight: 1.25,
                margin: 0,
                maxWidth: "34ch",
              }}
            >
              {ABOUT.raised.title}
            </h3>
            <p className="body-lg" style={{ marginTop: 13, maxWidth: "62ch" }}>
              {ABOUT.raised.body}
            </p>
          </div>

          <p className="body-lg" style={{ marginTop: 55, maxWidth: "62ch" }}>
            {ABOUT.closing}
          </p>

          <a
            href={ABOUT.ctaHref}
            className="inline-flex items-center transition-opacity hover:opacity-85"
            style={{
              marginTop: 34,
              background: "var(--ink)",
              color: "#ffffff",
              padding: "13px 34px",
              borderRadius: "var(--r-pill)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
            }}
          >
            {ABOUT.ctaLabel}
          </a>
        </div>

        <dl
          data-rv="up"
          style={{ margin: 0, borderTop: "1px solid var(--line)", transitionDelay: "120ms" }}
        >
          {ABOUT.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-[21px]"
              style={{ borderBottom: "1px solid var(--line-soft)", padding: "21px 0" }}
            >
              <dt style={{ fontSize: 13, color: "var(--muted)", maxWidth: "24ch" }}>
                {fact.label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-slab)",
                  fontWeight: 600,
                  fontSize: "var(--fs-h3)",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}