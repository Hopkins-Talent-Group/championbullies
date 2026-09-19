"use client";

import Image from "next/image";
import { ReservationProvider, useReservation } from "@/context/ReservationContext";
import { ReservationModal } from "@/components/ReservationModal";
import { PUPPY_CATALOG, type PuppyCatalogEntry } from "@/lib/site";

const groups = [
  { key: "males", title: "Available Males", puppies: PUPPY_CATALOG.filter(p => p.gender === "Male" && p.status === "available") },
  { key: "females", title: "Available Females", puppies: PUPPY_CATALOG.filter(p => p.gender === "Female" && p.status === "available") },
  { key: "reserved", title: "Reserved", puppies: PUPPY_CATALOG.filter(p => p.status === "reserved") },
];

export function Gallery() {
  return (
    <ReservationProvider>
      <section id="gallery" aria-labelledby="gallery-heading" style={{ borderTop: "1px solid var(--line-soft)", padding: "clamp(89px,12vh,144px) var(--pad)" }}>
        <div className="mx-auto" style={{ maxWidth: 1241 }}>
          <header className="text-center">
            <p className="eyebrow">Available Puppies</p>
            <h2 id="gallery-heading" className="display h-sec" style={{ marginTop: 21 }}>Meet the Litter</h2>
            <p className="body-lg mx-auto" style={{ marginTop: 21, maxWidth: "55ch" }}>
              Every photograph was taken in our home, cropped, never retouched, never stock.
            </p>
          </header>
          <div className="flex flex-col" style={{ marginTop: 89, gap: "clamp(89px,10vw,144px)" }}>
            {groups.filter(group => group.puppies.length > 0).map(group => (
              <section key={group.key} aria-labelledby={`gallery-${group.key}`}>
                <h3 id={`gallery-${group.key}`} className="display text-center" style={{ fontSize: 26, marginBottom: 55, color: group.key === "reserved" ? "var(--muted)" : "var(--ink)" }}>
                  {group.title}
                </h3>
                <ul className="flex flex-wrap justify-center gap-x-[34px] gap-y-[55px] lg:gap-x-[55px]" style={{ padding: 0, listStyle: "none" }} role="list">
                  {group.puppies.map(puppy => (
                    <li key={puppy.key} className="w-full max-w-[377px] sm:w-[calc((100%_-_34px)/2)] lg:w-[calc((100%_-_110px)/3)]">
                      <PuppyCard puppy={puppy} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
      <ReservationModal />
    </ReservationProvider>
  );
}

function PuppyCard({ puppy }: { puppy: PuppyCatalogEntry }) {
  const { actions } = useReservation();
  const reserved = puppy.status === "reserved";
  const gender = puppy.gender;

  return (
    <article className="group">
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5", outline: "1px solid var(--line)", outlineOffset: "-1px", opacity: reserved ? 0.8 : 1 }}>
        <Image
          src={puppy.image}
          alt={`${puppy.name}, ${puppy.breed} puppy${reserved ? " (reserved)" : ""}`}
          fill
          sizes="(min-width: 1024px) 377px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]"
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        />
        <div className="absolute top-3 right-3">
          <span style={{ background: "rgba(5,7,10,0.86)", color: "#ffffff", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 8px", borderRadius: "var(--r-chip)" }}>
            {reserved ? "Reserved" : puppy.breed}
          </span>
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-[13px]" style={{ marginTop: 34 }}>
        <div>
          <h4 style={{ fontFamily: "var(--font-slab)", fontWeight: 600, fontSize: 21, color: reserved ? "var(--muted)" : "var(--ink)" }}>{puppy.name}</h4>
          <p className="caption" style={{ marginTop: 8 }}>{gender} &bull; {puppy.year}</p>
        </div>
        <span style={{ fontFamily: "var(--font-slab)", fontWeight: 600, fontSize: 21, color: reserved ? "var(--muted)" : "var(--accent)" }}>...</span>
      </div>
      <button type="button" className="rs-btn rs-btn-outline w-full" disabled={reserved} onClick={() => { if (!reserved) actions.open({ ...puppy, gender }); }} style={{ marginTop: 34 }}>
        {reserved ? "Reserved" : `Reserve ${puppy.name}`}
      </button>
    </article>
  );
}
