"use client";

import React from "react";
import {
  Lock,
  Flashlight,
  Camera,
  Github,
  Fingerprint,
  Phone,
  Sparkles,
} from "lucide-react";
import { playHapticClick } from "./phoneAudio";

interface PhoneLockScreenProps {
  time: string;
  onUnlock: () => void;
  phoneOS: "iphone" | "android";
}

export default function PhoneLockScreen({ time, onUnlock, phoneOS }: PhoneLockScreenProps) {
  const isIphone = phoneOS === "iphone";

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      onClick={() => {
        playHapticClick();
        onUnlock();
      }}
      className="absolute inset-0 z-50 flex flex-col justify-between p-5 select-none cursor-pointer transition-opacity duration-300 bg-cover bg-top overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.12) 35%, rgba(0, 0, 0, 0.65) 100%), url('/images/phone-wallpaper.jpg')`,
      }}
    >
      {/* ================= APPLE iOS 18 LOCK SCREEN ================= */}
      {isIphone ? (
        <>
          {/* Top Lock Icon & Padlock */}
          <div className="pt-8 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 mb-1 border border-white/10">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[10px] font-medium tracking-wide text-white/70 uppercase">
              Face ID
            </p>

            {/* Apple San Francisco Style Lock Clock */}
            <h1 className="mt-1 text-6xl font-light tracking-tight text-white/95 font-sans drop-shadow-md">
              {time}
            </h1>
            <p className="mt-0.5 text-xs font-medium text-white/80 drop-shadow">
              {currentDate}
            </p>
          </div>

          {/* iOS Notifications Stack */}
          <div className="flex-1 flex flex-col justify-center gap-2 max-w-[275px] mx-auto w-full my-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
                <div className="flex items-center gap-1.5 font-semibold text-white/90">
                  <Github className="w-3.5 h-3.5 text-[#faecd2]" />
                  <span>GitHub</span>
                </div>
                <span>2m ago</span>
              </div>
              <p className="text-xs font-semibold text-white">sangeethsanthosh-git</p>
              <p className="text-[11px] text-white/75 line-clamp-1">
                Pushed 3 commits to <span className="text-[#faecd2]">rewind</span> • Flutter
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
                <div className="flex items-center gap-1.5 font-semibold text-white/90">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AURA Voice AI</span>
                </div>
                <span>Now</span>
              </div>
              <p className="text-xs font-semibold text-white">All systems nominal</p>
              <p className="text-[11px] text-white/75">
                Voice companion ready • Tap to try apps
              </p>
            </div>
          </div>

          {/* Bottom iOS Action Buttons & Home Gesture Bar */}
          <div className="pb-2 flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between px-3">
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors shadow">
                <Flashlight className="w-5 h-5 text-[#faecd2]" />
              </div>
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:bg-white/20 transition-colors shadow">
                <Camera className="w-5 h-5 text-[#faecd2]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 animate-bounce">
              <p className="text-[9px] font-semibold tracking-wider text-white/70 uppercase">
                Swipe up to unlock
              </p>
              <div className="w-28 h-1 rounded-full bg-white/60" />
            </div>
          </div>
        </>
      ) : (
        /* ================= SAMSUNG GALAXY ONE UI LOCK SCREEN ================= */
        <>
          {/* Top Samsung Minimalist Clock */}
          <div className="pt-8 flex flex-col items-start px-2">
            <h1 className="text-5xl font-light tracking-tight text-white/95 font-sans leading-none">
              {time}
            </h1>
            <p className="text-xs font-normal text-white/75 mt-1">
              {currentDate}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#faecd2] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Galaxy AI • Ready to test</span>
            </div>
          </div>

          {/* Samsung Notification Card */}
          <div className="flex-1 flex flex-col justify-center max-w-[280px] mx-auto w-full my-2">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/15 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-md bg-[#225424] text-[#faecd2] flex items-center justify-center text-[10px] font-bold">
                  SS
                </div>
                <span className="text-[11px] font-semibold text-white">Sangeeth OS</span>
                <span className="text-[9px] text-white/50 ml-auto">Just now</span>
              </div>
              <p className="text-xs text-white/90">Welcome to Galaxy S24 Ultra demo</p>
              <p className="text-[10px] text-white/60">Tap fingerprint to test portfolio apps</p>
            </div>
          </div>

          {/* Samsung Optical Fingerprint Sensor Icon */}
          <div className="flex flex-col items-center justify-center my-auto pb-2">
            <div className="relative w-14 h-14 rounded-full border border-cyan-400/40 bg-cyan-950/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20 animate-pulse">
              <Fingerprint className="w-8 h-8" />
              <div className="absolute inset-0 rounded-full border border-cyan-400/20 scale-125 animate-ping opacity-30" />
            </div>
            <p className="text-[9px] font-mono text-cyan-400/80 mt-2 uppercase tracking-widest">
              Touch Fingerprint Sensor
            </p>
          </div>

          {/* Samsung Bottom Corner Shortcuts */}
          <div className="pb-1 w-full flex items-center justify-between px-2">
            {/* Phone Dialer Shortcut with Arc */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow">
                <Phone className="w-5 h-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-12 h-12 rounded-full border-t border-r border-emerald-400/30 pointer-events-none" />
            </div>

            <span className="text-[10px] text-white/50 font-sans">
              Swipe to unlock
            </span>

            {/* Camera Shortcut with Arc */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/90 shadow">
                <Camera className="w-5 h-5" />
              </div>
              <div className="absolute -top-1 -left-1 w-12 h-12 rounded-full border-t border-l border-white/30 pointer-events-none" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
