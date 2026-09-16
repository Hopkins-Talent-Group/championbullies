"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ReservationProvider, useReservation } from "@/context/ReservationContext";
import { ReservationModal } from "@/components/ReservationModal";

type Pup = {
  key: string;
  name: string;
  image: string;
  gender: string;
  breed: string;
  year: number | string;
  price: string;
};

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
  const { state, actions } = useReservation();
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
    <ReservationProvider>
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
            {pups.map((pup: Pup, index) => (
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
                      alt={`${pup.name}, a ${pup.breed} puppy raised in our home`}
                      fill
                      sizes="(min-width: 900px) 24vw, (min-width: 600px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ transitionTimingFunction: "var(--ease-out)" }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="badge" style={{
                        background: "rgba(5,7,10,0.85)",
                        color: "var(--bone)",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        border: "1px solid var(--line-soft)",
                      }}>
                        {pup.breed}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3" style={{ marginTop: 14 }}>
                    <div>
                      <h3 style={{
                        fontFamily: "var(--font-slab)",
                        fontWeight: 600,
                        fontSize: "clamp(16px,1.4vw,20px)",
                      }}>
                        {pup.name}
                      </h3>
                      <p className="caption" style={{ marginTop: 2, color: "var(--muted)" }}>
                        {pup.gender} · {pup.year}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-slab)",
                      fontWeight: 600,
                      fontSize: "clamp(16px,1.4vw,20px)",
                      color: "var(--vermilion)",
                    }}>
                      {pup.price}
                    </span>
                  </div>
                  <button
                    className="reserve-btn w-full mt-4"
                    style={{
                      padding: "12px 20px",
                      background: "transparent",
                      color: "var(--bone)",
                      border: "1px solid var(--line)",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all .35s var(--ease)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--vermilion)";
                      e.currentTarget.style.borderColor = "var(--vermilion)";
                      e.currentTarget.style.color = "#05070a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "var(--line)";
                      e.currentTarget.style.color = "var(--bone)";
                    }}
                    onClick={() => {
                      actions.open(pup as any);
                    }}
                  >
                    Reserve Now
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ReservationModal
        isOpen={state.isOpen}
        onClose={() => actions.close()}
        puppy={state.data.puppy}
      />
    </ReservationProvider>
  );
}