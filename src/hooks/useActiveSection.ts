"use client";

import { useEffect, useState, useRef } from 'react';

export const sections = [
  "hero",
  "features",
  "loyalty",
  "games",
  "dashboard",
  "integrations",
  "pricing",
  "faq",
  "contact",
] as const;

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Cache all section elements once on mount
  useEffect(() => {
    sectionRefs.current = sections.map((id) => document.getElementById(id));
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight / 3;

          // Loop backward — most users are at bottom, find match faster
          let foundIndex = 0;
          for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
            const el = sectionRefs.current[i];
            if (el && scrollPos >= el.offsetTop) {
              foundIndex = i;
              break;
            }
          }

          setActiveSection(foundIndex);
          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { activeSection, sections };
}