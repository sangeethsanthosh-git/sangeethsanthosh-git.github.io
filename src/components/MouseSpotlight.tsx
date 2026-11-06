"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseSpotlight() {
  const [mounted, setMounted] = useState(false);
  const spotlight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Completely disable on mobile / touch devices to prevent scroll lag and repaints
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches || window.innerWidth < 768;
    if (isTouch || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setMounted(true);

    let rafId: number;
    let ticking = false;

    const updatePointer = (event: MouseEvent) => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          if (spotlight.current) {
            spotlight.current.style.transform = `translate3d(${event.clientX - 360}px, ${event.clientY - 360}px, 0)`;
          }
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
  return <div ref={spotlight} aria-hidden="true" className="pointer-spotlight hidden md:block" />;
}
