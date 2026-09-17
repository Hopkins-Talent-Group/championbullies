"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function Hero() {
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
      { threshold: 0.12 }
    );

    root.querySelectorAll("[data-rv]").forEach((el) => observer.observe(el));
------ snippet (first lines) ------