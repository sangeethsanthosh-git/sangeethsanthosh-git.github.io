"use client";

import React from "react";
import { playHapticClick } from "./phoneAudio";

export interface AppIconItem {
  id: string;
  name: string;
  category: string;
  iconImage: string;
  gradient: string;
  badge?: string;
  isAction?: "gallery" | "github";
}

// All 13 Repositories strictly ordered by newly pushed date + Essential utilities (16 total -> 4x4 grid)
const ALL_PROJECT_APPS: AppIconItem[] = [
  {
    id: "rewind",
    name: "Rewind",
    category: "Flutter",
    iconImage: "/images/apps/rewind-icon.png",
    gradient: "from-amber-600 via-orange-500 to-yellow-500",
    badge: "PLAY",
  },
  {
    id: "chronicle",
    name: "Chronicle",
    category: "Flutter",
    iconImage: "/images/apps/chronicle-icon.png",
    gradient: "from-stone-600 via-amber-800 to-amber-900",
  },
  {
    id: "aura",
    name: "AURA AI",
    category: "Python",
    iconImage: "/images/apps/aura-icon.png",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    badge: "VOICE",
  },
  {
    id: "dayform",
    name: "Dayform",
    category: "Flutter",
    iconImage: "/images/apps/dayform-icon.png",
    gradient: "from-indigo-600 via-blue-500 to-sky-400",
  },
  {
    id: "vault",
    name: "Vault",
    category: "Crypto",
    iconImage: "/images/apps/vault-icon.svg",
    gradient: "from-emerald-700 via-green-600 to-teal-500",
    badge: "SHA256",
  },
  {
    id: "kerala",
    name: "Kerala",
    category: "Web",
    iconImage: "/images/apps/kerala-icon.svg",
    gradient: "from-teal-600 via-emerald-500 to-green-400",
    badge: "WEB",
  },
  {
    id: "traffic",
    name: "Traffic",
    category: "Flask",
    iconImage: "/images/apps/traffic-icon.svg",
    gradient: "from-violet-600 via-purple-500 to-indigo-400",
  },
  {
    id: "edusense",
    name: "EduSense",
    category: "EdTech",
    iconImage: "/images/apps/edusense-icon.svg",
    gradient: "from-sky-600 via-blue-500 to-indigo-500",
  },
  {
    id: "budget",
    name: "Budget",
    category: "FinTech",
    iconImage: "/images/apps/budget-icon.svg",
    gradient: "from-emerald-600 via-teal-600 to-green-400",
  },
  {
    id: "pcod",
    name: "PCOD ML",
    category: "Clinical",
    iconImage: "/images/apps/pcod-icon.svg",
    gradient: "from-rose-600 via-pink-500 to-rose-400",
    badge: "ML",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    category: "Vision",
    iconImage: "/images/apps/cartoon-icon.svg",
    gradient: "from-fuchsia-600 via-pink-500 to-rose-400",
    badge: "AI",
  },
  {
    id: "gistify",
    name: "Gistify",
    category: "Next.js",
    iconImage: "/images/apps/gistify-icon.svg",
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
    badge: "LIVE",
  },
  {
    id: "keycoders",
    name: "KeyCoders",
    category: "IDE",
    iconImage: "/images/apps/keycoders-icon.svg",
    gradient: "from-cyan-700 via-indigo-600 to-violet-700",
    badge: "DEV",
  },
  {
    id: "gallery",
    name: "Photos",
    category: "Gallery",
    iconImage: "/images/apps/gallery-icon.svg",
    gradient: "from-amber-500 via-rose-500 to-purple-600",
    isAction: "gallery",
  },
  {
    id: "contact",
    name: "Hire / Call",
    category: "Contact",
    iconImage: "/images/apps/phone-icon.svg",
    gradient: "from-emerald-500 via-teal-500 to-green-600",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Code",
    iconImage: "/images/apps/github-icon.svg",
    gradient: "from-zinc-800 to-black",
    isAction: "github",
  },
];

interface PhoneHomeScreenProps {
  onOpenApp: (appId: string) => void;
  onOpenCarousel: () => void;
  phoneOS?: "iphone" | "android";
}

export default function PhoneHomeScreen({
  onOpenApp,
  onOpenCarousel,
}: PhoneHomeScreenProps) {
  const handleAppClick = (app: AppIconItem) => {
    playHapticClick();
    if (app.isAction === "gallery") {
      onOpenCarousel();
    } else if (app.isAction === "github") {
      if (typeof window !== "undefined") {
        window.open("https://github.com/sangeethsanthosh-git", "_blank", "noopener,noreferrer");
      }
    } else {
      onOpenApp(app.id);
    }
  };

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col justify-between pt-9 pb-2 px-3 select-none overflow-hidden bg-cover bg-top"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 35%, rgba(0, 0, 0, 0.6) 100%), url('/images/phone-wallpaper.jpg')`,
      }}
    >
      {/* ================= APPLE iOS 18 HOME SCREEN ================= */}
      {/* iOS 18 Glass Widget */}
      <div className="p-2.5 rounded-[22px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[12px] bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs shadow">
            ☀️
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white flex items-center gap-1">
              <span>Kochi, Kerala</span>
              <span className="text-[9px] text-[#faecd2] font-mono">28°C</span>
            </p>
            <p className="text-[9px] text-white/70">Sangeeth Santhosh • 13 Projects</p>
          </div>
        </div>

        <button
          onClick={() => {
            playHapticClick();
            onOpenCarousel();
          }}
          className="px-2 py-0.5 rounded-full bg-[#faecd2] text-[#225424] text-[9px] font-bold tracking-tight hover:scale-105 transition-transform cursor-pointer shadow-xs"
          title="Switch to full project screenshot showcase"
        >
          📸 Gallery
        </button>
      </div>

      {/* iOS 18 4x4 App Grid with Apple Squircles & Authentic Icons */}
      <div className="grid grid-cols-4 gap-y-2.5 gap-x-1.5 py-1.5 max-w-[290px] mx-auto w-full">
        {ALL_PROJECT_APPS.map((app) => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="relative">
              {/* Apple Curvature Squircle */}
              <div
                className={`w-11 h-11 rounded-[15px] p-[1px] shadow-md flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-active:scale-95 border border-white/25 overflow-hidden bg-gradient-to-tr ${app.gradient}`}
              >
                <img
                  src={app.iconImage}
                  alt={app.name}
                  className="w-full h-full object-cover rounded-[14px] pointer-events-none select-none drop-shadow-sm"
                  loading="eager"
                />
              </div>

              {app.badge && (
                <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-red-500 text-[7px] font-mono font-bold text-white border border-white/30 shadow-xs z-10">
                  {app.badge}
                </span>
              )}
            </div>

            <span className="text-[9px] font-medium text-white/95 group-hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] truncate max-w-[58px] text-center">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* iOS Floating Frosted Glass Dock with Authentic Launcher Icons */}
      <div className="p-1.5 rounded-[24px] bg-white/15 backdrop-blur-2xl border border-white/25 shadow-2xl flex items-center justify-around max-w-[270px] mx-auto w-full mb-3 shrink-0">
        <button
          onClick={() => {
            playHapticClick();
            onOpenApp("contact");
          }}
          className="w-10 h-10 rounded-[14px] overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-white/20 p-0.5 bg-black/20"
          title="Phone / Contact Sangeeth"
        >
          <img src="/images/apps/phone-icon.svg" alt="Phone" className="w-full h-full object-cover rounded-[12px]" />
        </button>

        <button
          onClick={() => {
            playHapticClick();
            onOpenApp("rewind");
          }}
          className="w-10 h-10 rounded-[14px] overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-white/20 p-0.5 bg-black/20"
          title="Rewind Music"
        >
          <img src="/images/apps/rewind-icon.png" alt="Rewind" className="w-full h-full object-cover rounded-[12px]" />
        </button>

        <button
          onClick={() => {
            playHapticClick();
            onOpenApp("aura");
          }}
          className="w-10 h-10 rounded-[14px] overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-white/20 p-0.5 bg-black/20"
          title="AURA Voice AI"
        >
          <img src="/images/apps/aura-icon.png" alt="AURA AI" className="w-full h-full object-cover rounded-[12px]" />
        </button>

        <a
          href="https://github.com/sangeethsanthosh-git"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-[14px] overflow-hidden shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-white/20 p-0.5 bg-black/20 block"
          title="GitHub Repositories"
        >
          <img src="/images/apps/github-icon.svg" alt="GitHub" className="w-full h-full object-cover rounded-[12px]" />
        </a>
      </div>
    </div>
  );
}
