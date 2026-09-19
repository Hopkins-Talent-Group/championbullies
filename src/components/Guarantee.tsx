"use client";

import { GUARANTEE } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";

/**
 * The reservation dialog asks buyers to acknowledge a health guarantee, a
 * spay/neuter contract, and a deposit — but the page never explained any of
 * them. This section states them on the page, in the form's own words, so
 * nobody meets the terms for the first time inside a modal.
 */
export function Guarantee() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="guarantee"
      aria-labelledby="guarantee-heading"
      style={{
        borderTop: "1px solid var(--line-soft)",
        padding: "clamp(89px, 12vh, 144px) var(--pad)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <header style={{ maxWidth: "61ch" }} data-rv="up">
          <p className="eyebrow">{GUARANTEE.eyebrow}</p>
          <h2 id="guarantee-heading" className="display h-sec" style={{ marginTop: 21 }}>
            {GUARANTEE.heading}
          </h2>
          <p className="body-lg" style={{ marginTop: 21 }}>
            {GUARANTEE.lead}
          </p>
        </header>

        <ul
          className="grid grid-cols-1 gap-[34px] sm:grid-cols-2 lg:grid-cols-4"
          style={{ listStyle: "none", margin: "89px 0 0", padding: 0 }}
        >
          {GUARANTEE.items.map((item, index) => (
            <li
              key={item.title}
              data-rv="up"
              style={{
                borderTop: "2px solid var(--accent)",
                paddingTop: 21,
                transitionDelay: `${index * 90}ms`,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-slab)",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              <p style={{ marginTop: 13, fontSize: 13, lineHeight: 1.618, color: "var(--body)" }}>
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="caption" data-rv="up" style={{ marginTop: 55, maxWidth: "72ch", lineHeight: 1.8 }}>
          {GUARANTEE.note}
        </p>
      </div>
    </section>
  );
}