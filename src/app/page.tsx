import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

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
          className="mx-auto flex items-center justify-between gap-6"
          style={{ height: "var(--nav-h)", padding: "0 var(--pad)", maxWidth: 1440 }}
        >
          <a
            href="#home"
            style={{
              fontFamily: "var(--font-slab)",
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: ".02em",
            }}
          >
            ChampionBullies<span style={{ color: "var(--accent)" }}>.</span>
          </a>
          <nav
            aria-label="Primary"
            className="flex items-center gap-8"
            style={{
              fontSize: 10.5,
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
