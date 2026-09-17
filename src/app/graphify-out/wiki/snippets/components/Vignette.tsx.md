"use client";

export function Vignette() {
  return (
    <div
      id="vignette"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 55,
        pointerEvents: "none",
        background: "radial-gradient(125% 95% at 50% 42%, transparent 40%, rgba(2,4,6,.55) 100%)",
      }}
      aria-hidden="true"
    />
  );
}
------ snippet (first lines) ------