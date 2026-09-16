"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const pups = [
  { key: "margo", name: "Margo", image: "/images/dogs/margo.jpg", year: 2019 },
  { key: "blue-angel", name: "Blue Angel", image: "/images/dogs/blue-angel.jpg", year: 2018 },
  { key: "puppy-2019", name: null, image: "/images/dogs/puppy-2019.jpg", year: 2019 },
  { key: "puppy-2018", name: null, image: "/images/dogs/puppy-2018.jpg", year: 2018 },
];

export function Gallery() {
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    root.querySelectorAll("[data-rv]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      style={{
        borderTop: "1px solid var(--line-soft)",
        padding: "clamp(64px,11vh,140px) var(--pad)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div className="flex flex-wrap items-end justify-between gap-6" data-rv="up">
          <div>
            <p className="eyebrow">Available Puppies</p>
            <h2 id="gallery-heading" className="display h-sec" style={{ marginTop: 16 }}>
              Meet the Litter
            </h2>
          </div>
          <p className="body-lg" style={{ maxWidth: "44ch", fontSize: 14 }}>
            Every photograph was taken in our home — cropped, never retouched, never stock.
          </p>
        </div>

        <ul
          className="mt-[clamp(30px,5vh,56px)] grid grid-cols-1 gap-[clamp(14px,1.6vw,24px)] sm:grid-cols-2 lg:grid-cols-4"
          style={{ padding: 0, listStyle: "none" }}
          role="list"
        >
          {pups.map((pup, index) => (
            <li key={pup.key} data-rv="up" style={{ transitionDelay: `${index * 90}ms` }}>
              <article className="group cursor-pointer">
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "4 / 5",
                    outline: "1px solid var(--line)",
                    outlineOffset: "-1px",
                    transition: "outline-color .4s var(--ease)",
                  }}
                >
                  <Image
                    src={pup.image}
                    alt={
                      pup.name
                        ? `${pup.name}, an English bulldog puppy raised in our home`
                        : "An English bulldog puppy raised in our home"
                    }
                    fill
                    sizes="(min-width: 900px) 24vw, (min-width: 600px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3" style={{ marginTop: 14 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-slab)",
                      fontWeight: 600,
                      fontSize: "clamp(16px,1.4vw,20px)",
                    }}
                  >
                    {pup.name ?? "English Bulldog"}
                  </h3>
                  <span className="caption">{pup.year}</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
