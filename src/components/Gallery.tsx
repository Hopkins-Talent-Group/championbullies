"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ReservationProvider, useReservation } from "@/context/ReservationContext";
import { ReservationModal } from "@/components/ReservationModal";
import type { PuppyData } from "@/context/ReservationContext";

// The photograph is required here: every card renders one.
type Pup = PuppyData & { image: string };

const pups: Pup[] = [
  { key: "daphne", name: "Daphne", image: "/images/dogs/daphne.jpg", gender: "Female", breed: "English Bulldog", year: 2024, price: "$4,500" },
  { key: "fred", name: "Fred", image: "/images/dogs/fred.jpg", gender: "Male", breed: "English Bulldog", year: 2024, price: "$4,800" },
  { key: "scooby", name: "Scooby", image: "/images/dogs/scooby.jpg", gender: "Male", breed: "English Bulldog", year: 2024, price: "$4,200" },
  { key: "scrappy", name: "Scrappy", image: "/images/dogs/scrappy.jpg", gender: "Male", breed: "English Bulldog", year: 2024, price: "$4,500" },
  { key: "shaggy", name: "Shaggy", image: "/images/dogs/shaggy.jpg", gender: "Male", breed: "English Bulldog", year: 2024, price: "$4,000" },
  { key: "velma", name: "Velma", image: "/images/dogs/velma.jpg", gender: "Female", breed: "English Bulldog", year: 2024, price: "$4,800" },
  { key: "blue-angel", name: "Blue Angel", image: "/images/dogs/blue-angel.jpg", gender: "Male", breed: "French Bulldog", year: 2023, price: "$5,500" },
  { key: "margo", name: "Margo", image: "/images/dogs/margo.jpg", gender: "Female", breed: "French Bulldog", year: 2019, price: "$5,200" },
];

export function Gallery() {
  return (
    <ReservationProvider>
      <GalleryContent />
    </ReservationProvider>
  );
}

function GalleryContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const { actions } = useReservation();

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
    <>
      <section
        ref={sectionRef}
        id="gallery"
        aria-labelledby="gallery-heading"
        style={{
          borderTop: "1px solid var(--line-soft)",
          padding: "clamp(55px,11vh,144px) var(--pad)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
          <div className="flex flex-wrap items-end justify-between gap-[21px]" data-rv="up">
            <div>
              <p className="eyebrow">Available Puppies</p>
              <h2 id="gallery-heading" className="display h-sec" style={{ marginTop: 13 }}>
                Meet the Litter
              </h2>
            </div>
            <p className="body-lg" style={{ maxWidth: "55ch", fontSize: 13 }}>
              Every photograph was taken in our home, cropped, never retouched, never stock.
            </p>
          </div>

          <ul
            className="mt-[clamp(21px,5vh,34px)] grid grid-cols-1 gap-[13px] sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)]"
            style={{ padding: 0, listStyle: "none" }}
            role="list"
          >
            {pups.map((pup: Pup, index) => (
              <li key={pup.key} data-rv="up" style={{ transitionDelay: `${index * 90}ms` }}>
                <article className="group">
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
                      alt={`${pup.name}, a ${pup.breed} puppy raised in our home`}
                      fill
                      sizes="(min-width: 900px) 24vw, (min-width: 600px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ transitionTimingFunction: "var(--ease-out)" }}
                    />
                    <div className="absolute top-3 right-3">
                      <span style={{
                        background: "rgba(5,7,10,0.86)",
                        color: "#ffffff",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "5px 8px",
                        borderRadius: "var(--r-chip)",
                      }}>
                        {pup.breed}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-[13px]" style={{ marginTop: 13 }}>
                    <div>
                      <h3 style={{
                        fontFamily: "var(--font-slab)",
                        fontWeight: 600,
                        fontSize: "clamp(16px,1.4vw,21px)",
                      }}>
                        {pup.name}
                      </h3>
                      <p className="caption" style={{ marginTop: 2, color: "var(--muted)" }}>
                        {pup.gender} • {pup.year}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-slab)",
                      fontWeight: 600,
                      fontSize: "clamp(16px,1.4vw,21px)",
                      color: "var(--accent)",
                    }}>
                      {pup.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rs-btn rs-btn-outline w-full"
                    onClick={() => {
                      actions.open(pup);
                    }}
                    style={{ marginTop: 13 }}
                  >
                    Reserve {pup.name}
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReservationModal />
    </>
  );
}
