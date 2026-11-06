"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Completely disable on mobile / touch devices to prevent scroll lag and repaints
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches || window.innerWidth < 768;
    if (isTouch) return;

    setMounted(true);

    let rafId: number;
    let ticking = false;

    const updatePointer = (event: MouseEvent) => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
          document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
          ticking = false;
        });
      }
    };

    window.addEventListener("mousemove", updatePointer, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", updatePointer);
    };
  }, []);

  if (!mounted) return null;
  return <div aria-hidden="true" className="pointer-spotlight hidden md:block" />;
}
