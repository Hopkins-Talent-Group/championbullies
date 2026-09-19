"use client";

import { useEffect, useRef } from "react";

/**
 * Reveals every [data-rv] descendant the first time it scrolls into view by
 * adding the `rv-in` class the stylesheet animates.
 *
 * Hero and Contact each grew their own copy of this observer. New sections
 * share this hook instead so the reveal timing has one definition, and each
 * element is unobserved once shown so it never animates twice.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-rv]");

    // Without an observer the content must still be readable, so show it
    // immediately rather than leaving everything at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("rv-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("rv-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}