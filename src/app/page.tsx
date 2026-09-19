import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import Image from "next/image";

// Golden ratio scale — base unit 13px
// φ¹ = 21px  → container gap
// φ² = 34px  → nav item gap
// φ³ = 55px  → section breathing room
const PHI = 1.618;
const BASE = 13;
const GAP_MD = Math.round(BASE * PHI);        // 21
const GAP_LG = Math.round(BASE * PHI * PHI);  // 34

export default function Home() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-40 border-b"
        style={{
          borderColor: "var(--line-soft)",
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            height: "72px",
            padding: "0 var(--pad)",
            maxWidth: "var(--max-w)",
            gap: `${GAP_MD}px`,
          }}
        >
          <a
            href="#home"
            style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            <Image
              src="/images/branding/logo/horizontal-logo-v2.png"
              alt="ChampionBullies logo"
              width={200}
              height={53}
              priority
              style={{ width: 200, height: "auto" }}
            />
          </a>

          <nav
            aria-label="Primary"
            className="flex items-center"
            style={{
              gap: `${GAP_LG}px`,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
            }}
          >
            <a href="#home" className="hidden sm:inline transition-opacity hover:opacity-60">
              Home
            </a>
            <a href="#gallery" className="hidden sm:inline transition-opacity hover:opacity-60">
              Puppies
            </a>
            <a
              href="#contact"
              className="transition-opacity hover:opacity-60"
              style={{ color: "var(--accent)" }}
            >
              Reserve a Puppy
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}