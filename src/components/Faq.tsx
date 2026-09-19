"use client";

import { useState } from "react";

import { FAQ } from "@/lib/content";
import { useReveal } from "@/lib/useReveal";

/**
 * Answers to the questions the gallery and the reservation form raise but the
 * page never addressed. Built on <details>, so it is keyboard-operable and
 * searchable with no JavaScript; the state below only keeps the styling hook
 * in sync with what the browser already opened.
 */
export function Faq() {
  const sectionRef = useReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
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
        className="mx-auto grid grid-cols-1 gap-x-[89px] gap-y-[55px] lg:grid-cols-[1fr_1.618fr]"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <header data-rv="up">
          <p className="eyebrow">{FAQ.eyebrow}</p>
          <h2 id="faq-heading" className="display h-sec" style={{ marginTop: 21 }}>
            {FAQ.heading}
          </h2>
        </header>

        <dl style={{ margin: 0, borderTop: "1px solid var(--line)" }} data-rv="up">
          {FAQ.items.map((item, index) => {
            const open = openIndex === index;

            return (
              <div key={item.q} style={{ borderBottom: "1px solid var(--line)" }}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-start justify-between gap-[34px] text-left transition-opacity hover:opacity-70"
                    style={{
                      background: "none",
                      border: 0,
                      padding: "34px 0",
                      cursor: "pointer",
                      font: "inherit",
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-slab)",
                        fontWeight: 600,
                        fontSize: 21,
                        lineHeight: 1.3,
                        maxWidth: "44ch",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{ color: "var(--accent)", fontSize: 21, lineHeight: 1, flex: "none" }}
                    >
                      {open ? "\u2212" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${index}`}
                  hidden={!open}
                  className="body-lg"
                  style={{ margin: 0, paddingBottom: 34, maxWidth: "62ch" }}
                >
                  {item.a}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}