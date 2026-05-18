"use client";

import { useEffect } from "react";

export default function MouseSpotlight() {
  useEffect(() => {
    const updatePointer = (event: MouseEvent | PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("mousemove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("mousemove", updatePointer);
    };
  }, []);

  return <div aria-hidden="true" className="pointer-spotlight" />;
}
