"use client";

import { WHY_US } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";

/**
 * The four points the old homepage made under "What Makes Us Different".
 * Laid out as numbered entries on hairlines rather than four identical boxes,
 * so it stays prose the way the rest of the page is.
 */
export function WhyUs() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="why-us"
      aria-labelledby="why-us-heading"
      style={{
        borderTop: "1px solid var(--line-soft)",
        padding: "clamp(89px, 12vh, 144px) var(--pad)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <header style={{ maxWidth: "61ch" }} data-rv="up">
          <p className="eyebrow">{WHY_US.eyebrow}</p>
          <h2 id="why-us-heading" className="display h-sec" style={{ marginTop: 21 }}>
            {WHY_US.heading}
          </h2>
          <p className="body-lg" style={{ marginTop: 21 }}>
            {WHY_US.lead}
          </p>
        </header>

        <ol
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            listStyle: "none",
            margin: "89px 0 0",
            padding: 0,
            columnGap: "clamp(34px, 6vw, 89px)",
          }}
        >
          {WHY_US.items.map((item, index) => (
            <li
              key={item.title}
              data-rv="up"
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: 34,
                paddingBottom: 34,
                transitionDelay: `${index * 90}ms`,
              }}
            >
              <p className="caption" style={{ color: "var(--accent)" }}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-slab)",
                  fontWeight: 600,
                  fontSize: "var(--fs-h3)",
                  lineHeight: 1.2,
                  margin: "13px 0 0",
                }}
              >
                {item.title}
              </h3>
              <p className="body-lg" style={{ marginTop: 13, maxWidth: "55ch" }}>
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
