"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { playHapticClick } from "./phone/phoneAudio";

export interface ServiceItem {
  id: string;
  pillLabel: string;
  title: string;
  description: string;
  isSolid: boolean;
}

// Reverted service contents from portfolio.ts
export const POSTER_SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    pillLabel: "WEB DEVELOPMENT",
    title: "Web Development",
    description:
      "Responsive websites built with modern frontend and full-stack tooling.",
    isSolid: true,
  },
  {
    id: "ui-design",
    pillLabel: "UI DESIGN",
    title: "UI Design",
    description:
      "Clean, user-focused interfaces with attention to hierarchy and clarity.",
    isSolid: false,
  },
  {
    id: "seo-basics",
    pillLabel: "SEO BASICS",
    title: "SEO Basics",
    description:
      "On-page structure, metadata, and content improvements for better discoverability.",
    isSolid: false,
  },
  {
    id: "branding",
    pillLabel: "BRANDING SUPPORT",
    title: "Branding Support",
    description:
      "Visual direction and lightweight identity work for personal and client projects.",
    isSolid: true,
  },
  {
    id: "performance",
    pillLabel: "PERFORMANCE",
    title: "Performance",
    description:
      "Faster experiences through cleaner components, lighter motion, and better asset use.",
    isSolid: true,
  },
  {
    id: "full-stack",
    pillLabel: "FULL-STACK CODE",
    title: "Full-Stack Code",
    description:
      "Robust end-to-end software connecting modern web interfaces, mobile clients, and APIs.",
    isSolid: false,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-14 sm:py-24 text-white select-none overflow-hidden bg-gradient-to-b from-[#0a110d] via-[#101712] to-[#0c120e] border-b border-white/10"
    >
      <div className="mx-auto max-w-4xl px-3 sm:px-6">
        {/* =========================================================================
            RETRO GRAPH PAPER AGENCY POSTER CARD
            (Clean Minimalist Aesthetic • 100% Responsive on Any Device)
            ========================================================================= */}
        <div
          className="relative rounded-[24px] sm:rounded-[38px] p-5 sm:p-12 lg:p-14 border-2 border-[#fed78a]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden"
          style={{
            backgroundColor: "#165036",
            backgroundImage: `
              linear-gradient(to right, rgba(254, 215, 138, 0.08) 1.5px, transparent 1.5px),
              linear-gradient(to bottom, rgba(254, 215, 138, 0.08) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "48px 48px",
          }}
        >
          {/* Subtle Paper Noise & Vignette Overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/35 pointer-events-none rounded-[inherit]" />

          {/* Top Bar: Brand Identifier (Left) & Circular Arrow Button (Right) */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="font-mono text-xs sm:text-sm font-black tracking-widest uppercase text-[#fed78a] leading-tight">
              <p>SANGEETH</p>
              <p>SANTHOSH</p>
            </div>

            <a
              href="#contact"
              onClick={() => playHapticClick()}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#fed78a] text-[#165036] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer group"
              title="Work With Me (Contact)"
              aria-label="Work With Me"
            >
              <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Center Display Headline: MY SERVICES + WORK WITH ME */}
          <div className="relative z-10 mt-6 sm:mt-12 select-none">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h2 className="text-[clamp(2.75rem,12vw,8rem)] font-black tracking-tighter text-[#fed78a] uppercase leading-none">
                MY
              </h2>

              <a
                href="#contact"
                onClick={() => playHapticClick()}
                className="font-bold uppercase tracking-widest text-xs sm:text-base md:text-lg text-[#fed78a] underline underline-offset-4 sm:underline-offset-6 decoration-2 hover:opacity-80 transition-opacity cursor-pointer font-sans"
              >
                WORK WITH ME
              </a>
            </div>

            <h2 className="text-[clamp(2.75rem,12vw,8rem)] font-black tracking-tighter text-[#fed78a] uppercase leading-none mt-1 sm:mt-2">
              SERVICES
            </h2>
          </div>

          {/* Staggered Rounded Pill Grid (Identical to Poster Layout) */}
          <div className="relative z-10 mt-8 sm:mt-14 pb-2 sm:pb-4 space-y-3 sm:space-y-4">
            {/* Row 1 */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              {/* Web Development (Solid) */}
              <a
                href="#contact"
                onClick={() => playHapticClick()}
                title={POSTER_SERVICES[0].description}
                className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md bg-[#fed78a] text-[#165036] hover:scale-105 active:scale-95"
              >
                {POSTER_SERVICES[0].pillLabel}
              </a>

              {/* UI Design (Outlined) */}
              <a
                href="#contact"
                onClick={() => playHapticClick()}
                title={POSTER_SERVICES[1].description}
                className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer border-2 border-[#fed78a] text-[#fed78a] hover:bg-[#fed78a]/15 hover:scale-105 active:scale-95"
              >
                {POSTER_SERVICES[1].pillLabel}
              </a>
            </div>

            {/* Row 2 (Staggered indent on wider screens) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pl-0 sm:pl-6">
              {/* SEO Basics (Outlined) */}
              <a
                href="#contact"
                onClick={() => playHapticClick()}
                title={POSTER_SERVICES[2].description}
                className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer border-2 border-[#fed78a] text-[#fed78a] hover:bg-[#fed78a]/15 hover:scale-105 active:scale-95"
              >
                {POSTER_SERVICES[2].pillLabel}
              </a>

              {/* Branding Support (Solid) */}
              <a
                href="#contact"
                onClick={() => playHapticClick()}
                title={POSTER_SERVICES[3].description}
                className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md bg-[#fed78a] text-[#165036] hover:scale-105 active:scale-95"
              >
                {POSTER_SERVICES[3].pillLabel}
              </a>
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              {/* Performance (Solid) */}
              <a
                href="#contact"
                onClick={() => playHapticClick()}
                title={POSTER_SERVICES[4].description}
                className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md bg-[#fed78a] text-[#165036] hover:scale-105 active:scale-95"
              >
                {POSTER_SERVICES[4].pillLabel}
              </a>

              {/* Full-Stack Code (Outlined) */}
              <a
                href="#contact"
                onClick={() => playHapticClick()}
                title={POSTER_SERVICES[5].description}
                className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer border-2 border-[#fed78a] text-[#fed78a] hover:bg-[#fed78a]/15 hover:scale-105 active:scale-95"
              >
                {POSTER_SERVICES[5].pillLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
