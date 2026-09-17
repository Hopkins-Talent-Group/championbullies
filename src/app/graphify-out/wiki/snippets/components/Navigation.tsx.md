"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { id: "home", label: "Home", number: "01" },
  { id: "gallery", label: "Puppies", number: "02" },
  { id: "contact", label: "Reserve", number: "03" },
];

export function Navigation() {
  const [isStuck, setIsStuck] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsStuck(scrollY > 100);

      const sections = ["home", "gallery", "contact"];
------ snippet (first lines) ------