"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Check, ChevronRight, Mail, Twitter, Info, Copy, Globe } from "lucide-react";
import { playHapticClick } from "./phoneAudio";

interface PhoneAppWrapperProps {
  title: string;
  repoUrl: string;
  liveUrl?: string;
  onClose: () => void;
  children: React.ReactNode;
  noPadding?: boolean;
  icon?: string;
  previewKind?: "walkthrough" | "website";
}

function PhoneAppWrapper({
  title,
  repoUrl,
  liveUrl,
  onClose,
  children,
  noPadding,
  icon,
  previewKind,
}: PhoneAppWrapperProps) {
  const [showInfo, setShowInfo] = useState(false);
  const isSample = previewKind === "walkthrough";
  const name = title.split(/[\u2022\u00b7]/)[0].trim();
  return (
    <div className="ios-app-shell absolute inset-0 z-40 flex flex-col overflow-hidden">
      <nav className="ios-app-nav" aria-label="App navigation">
        <button onClick={() => { playHapticClick(); onClose(); }} className="ios-back"><ChevronRight size={22} className="rotate-180" />Home</button>
        <span>{previewKind === "website" ? "Original website" : isSample ? "Guided demo" : "Interactive demo"}</span>
        <button onClick={() => setShowInfo(true)} aria-label="About this project" className="ios-info"><Info size={21} /></button>
      </nav>
      {previewKind !== "website" && <header className="ios-app-heading">{icon && <img src={icon} alt="" />}<h2>{name}</h2></header>}
      <div className={`ios-app-content flex-1 min-h-0 overflow-y-auto ${noPadding ? "ios-edge-content" : ""}`}>{children}</div>
      {showInfo && <div className="ios-sheet-backdrop" onClick={() => setShowInfo(false)}>
        <section className="ios-info-sheet" role="dialog" aria-modal="true" aria-label="Project information" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === "Escape") setShowInfo(false); }}>
          <button autoFocus className="ios-sheet-done" onClick={() => setShowInfo(false)}>Done</button>
          {icon && <img src={icon} alt="" />}<h3>{name}</h3>
          <p>{isSample ? "A guided walkthrough based on the project source and original repository screenshots. No backend or trained model runs in this preview." : previewKind === "website" ? "Original templates, styling, and images exported from the Kerala Tourism repository. Pages work locally; the enquiry form is a demo without server storage." : "A browser adaptation of the project. Explore its interactions here, or view the original source below."}</p>
          <a href={repoUrl} target="_blank" rel="noopener noreferrer"><Github size={18} /> View source code<ExternalLink size={15} /></a>
          {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer"><Globe size={18} /> Open full app<ExternalLink size={15} /></a>}
        </section>
      </div>}
    </div>
  );
}

// =========================================================================
// 14. CONTACT / PHONE APP
// =========================================================================
export function ContactApp({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("sangeethsanthosh.dev@gmail.com");
    setCopied(true);
    playHapticClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/phone-icon.svg"
      title="Contact Sangeeth"
      repoUrl="https://github.com/sangeethsanthosh-git"
      onClose={onClose}
    >
      <div className="flex flex-col items-center justify-between h-full py-2 gap-3">
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/contact-profile.webp"
            alt="Sangeeth Santhosh"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover shadow-xl border-2 border-white/20"
          />
          <h3 className="mt-2 text-sm font-bold text-white">Sangeeth Santhosh</h3>
          <p className="text-[11px] text-[#64a8ff]/80">Software Engineer & UI Designer</p>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-sans border border-emerald-500/30">
            Available for Projects
          </span>
        </div>

        <div className="w-full space-y-2">
          <button
            onClick={copyEmail}
            className="w-full p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-between text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#64a8ff]" />
              <span>{copied ? "Email Copied!" : "Copy Email Address"}</span>
            </div>
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
          </button>

          <a
            href="https://github.com/sangeethsanthosh-git"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-between text-xs font-semibold text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-[#64a8ff]" />
              <span>GitHub Profile</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="https://twitter.com/sangeeth_saa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-between text-xs font-semibold text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Twitter className="w-4 h-4 text-[#64a8ff]" />
              <span>Twitter / X</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        <p className="text-[11px] text-white/50 text-center font-sans">
          Kochi, Kerala • UTC +05:30
        </p>
      </div>
    </PhoneAppWrapper>
  );
}
