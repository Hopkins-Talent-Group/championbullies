import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Canvas } from "@/components/Canvas";
import { Navigation } from "@/components/Navigation";
import { ProgressRail } from "@/components/ProgressRail";
import { CustomCursor } from "@/components/CustomCursor";
import { Grain } from "@/components/Grain";
import { Vignette } from "@/components/Vignette";

export default function Home() {
  return (
    <>
      <Canvas />
      <Grain />
      <Vignette />
      <Navigation />
      <ProgressRail />
      <CustomCursor />
      <main className="page">
        <Hero />
        <Gallery />
        <Contact />
        <Footer />
      </main>
    </>
  );
}