"use client";

import { useEffect, useRef, useState } from "react";

const sections = ["home", "gallery", "contact"];

export function ProgressRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveIndex(index);
          }
        }
      });
    };
------ snippet (first lines) ------