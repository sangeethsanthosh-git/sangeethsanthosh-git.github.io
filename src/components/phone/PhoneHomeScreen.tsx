"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Layers } from "lucide-react";
import { playHapticClick } from "./phoneAudio";
import { socials } from "@/data/portfolio";

export interface AppIconItem {
  id: string;
  name: string;
  category: string;
  iconImage: string;
  gradient: string;
  badge?: string;
  isAction?: "gallery" | "github";
  href?: string;
}

// Project apps and utilities; social destinations share the footer's configuration.
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
    iconImage: "/images/apps/aura-icon.webp",
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
    iconImage: "/images/apps/kerala-icon.webp",
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
    iconImage: "/images/apps/budget-icon.webp",
    gradient: "from-emerald-600 via-teal-600 to-green-400",
  },
  {
    id: "pcod",
    name: "PCOD ML",
    category: "Clinical",
    iconImage: "/images/apps/pcod-icon.webp",
    gradient: "from-rose-600 via-pink-500 to-rose-400",
    badge: "ML",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    category: "Vision",
    iconImage: "/images/apps/cartoon-icon.webp",
    gradient: "from-fuchsia-600 via-pink-500 to-rose-400",
    badge: "AI",
  },
  {
    id: "gistify",
    name: "Gistify",
    category: "Next.js",
    iconImage: "/images/apps/gistify-icon.webp",
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
    badge: "LIVE",
  },
  {
    id: "gallery",
    name: "Photos",
    category: "Gallery",
    iconImage: "/images/apps/gallery-icon.webp",
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
  ...["Email", "LinkedIn", "Instagram"].map((label): AppIconItem => {
    const link = socials.links.find((item) => item.label === label)!;
    return {
      id: label.toLowerCase(),
      name: label === "Email" ? "Mail" : label,
      category: "Social",
      iconImage: `/icons/${label === "Email" ? "gmail" : label.toLowerCase()}.svg`,
      gradient: label === "Instagram" ? "from-purple-500 via-pink-500 to-orange-400" : "from-sky-500 to-blue-600",
      href: link.href,
    };
  }),
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

  const [page, setPage] = useState(0);
  const swipeStart = useRef<{ x: number; y: number; pointerId: number } | null>(null);
  const suppressSwipeClick = useRef(false);
  const apps = ALL_PROJECT_APPS.filter((app) => !["contact", "github", "gallery"].includes(app.id));
  const pages = [apps.slice(0, 8), apps.slice(8)];
  const dock = ALL_PROJECT_APPS.filter((app) => ["contact", "rewind", "gallery", "github"].includes(app.id));

  const renderIcon = (app: AppIconItem, inDock = false) => {
    const contents = <>
      <span className={`ios-icon-art bg-gradient-to-tr ${app.gradient}`}>
        <img src={app.iconImage} alt="" draggable={false} />
      </span>
      {!inDock && <span className="ios-icon-label">{app.name}</span>}
    </>;
    if (app.href) {
      const isEmail = app.href.startsWith("mailto:");
      return <a key={app.id} href={app.href} target={isEmail ? undefined : "_blank"} rel={isEmail ? undefined : "noopener noreferrer"} onClick={() => playHapticClick()} className="ios-app-icon" aria-label={`Open ${app.name}`} title={isEmail ? "Open your email app" : undefined}>{contents}</a>;
    }
    return <button key={app.id} onClick={() => handleAppClick(app)} className="ios-app-icon" aria-label={`Open ${app.name}`}>{contents}</button>;
  };

  return (
    <div className="ios-home"
      style={{
        touchAction: "pan-y",
        userSelect: "none",
        backgroundImage: "linear-gradient(180deg, #00000040, #00000018 45%, #00000066), url('/images/phone-wallpaper.webp')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      onPointerDown={(e) => {
        if (!e.isPrimary || e.button !== 0) return;
        suppressSwipeClick.current = false;
        swipeStart.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
      }}
      onPointerMove={(e) => {
        const start = swipeStart.current;
        if (!start || start.pointerId !== e.pointerId) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          suppressSwipeClick.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
        }
      }}
      onPointerUp={(e) => {
        const start = swipeStart.current;
        if (!start || start.pointerId !== e.pointerId) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          suppressSwipeClick.current = true;
          setPage(dx < 0 ? 1 : 0);
        }
        swipeStart.current = null;
      }}
      onPointerCancel={() => { swipeStart.current = null; }}
      onClickCapture={(e) => {
        if (suppressSwipeClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressSwipeClick.current = false;
        }
      }}
    >
      <div className="ios-home-widget">
        <div className="ios-widget-heading"><Layers size={15} /><span>PROJECT LIBRARY</span></div>
        <p>Made to explore.</p>
        <span>12 projects. A little of everything.</span>
        <button onClick={onOpenCarousel}>View project photos <ChevronRight size={14} /></button>
      </div>
      <div className="ios-home-pages" key={page}>
        <div className="ios-icon-grid">{pages[page].map((app) => renderIcon(app))}</div>
      </div>
      <div className="ios-page-controls">
        <button onClick={() => setPage(0)} aria-label="Previous app page" disabled={page === 0}><ChevronLeft size={16} /></button>
        <div className="ios-page-dots" aria-label={`App page ${page + 1} of 2`}>
          {[0, 1].map((i) => <button key={i} aria-label={`Go to app page ${i + 1}`} aria-current={i === page ? "page" : undefined} onClick={() => setPage(i)}><span className={page === i ? "active" : ""} /></button>)}
        </div>
        <button onClick={() => setPage(1)} aria-label="Next app page" disabled={page === 1}><ChevronRight size={16} /></button>
      </div>
      <button className="ios-library-search" onClick={onOpenCarousel}><Search size={12} /> Explore projects</button>
      <div className="ios-dock">{dock.map((app) => renderIcon(app, true))}</div>
    </div>
  );
}
