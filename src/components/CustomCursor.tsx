"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isHoverCapable = window.matchMedia("(hover: hover)").matches;

    if (prefersReducedMotion || !isFinePointer || !isHoverCapable) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mouseenter", () => setIsVisible(true));

    let animationFrame: number;

    const animate = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      cursorPos.current.x += dx * 0.2;
      cursorPos.current.y += dy * 0.2;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorPos.current.x - (isActive ? 26 : 13)}px, ${cursorPos.current.y - (isActive ? 26 : 13)}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`cur-dot fixed pointer-events-none ${isActive ? "act" : ""}`}
      style={{
        zIndex: 80,
        top: 0,
        left: 0,
        width: isActive ? "52px" : "26px",
        height: isActive ? "52px" : "26px",
        margin: isActive ? "-26px 0 0 -26px" : "-13px 0 0 -13px",
        border: `1px solid ${isActive ? "rgba(223,231,224,.6)" : "rgba(223,231,224,.42)"}`,
        borderRadius: "50%",
        background: isActive ? "rgba(223,231,224,.07)" : "transparent",
        transition: "width .35s var(--ease-out), height .35s var(--ease-out), margin .35s var(--ease-out), background .35s, border-color .35s, opacity .3s",
        opacity: 1,
      }}
      aria-hidden="true"
    />
  );
}