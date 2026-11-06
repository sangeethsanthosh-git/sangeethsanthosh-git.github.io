"use client";

import React from "react";
import {
  Lock,
  Flashlight,
  Camera,
  Github,
} from "lucide-react";
import { playHapticClick } from "./phoneAudio";

interface PhoneLockScreenProps {
  time: string;
  onUnlock: () => void;
  phoneOS?: "iphone" | "android";
}

export default function PhoneLockScreen({ time, onUnlock }: PhoneLockScreenProps) {
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
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.12) 35%, rgba(0, 0, 0, 0.65) 100%), url('/images/phone-wallpaper.webp')`,
      }}
    >
      {/* ================= APPLE iOS 18 LOCK SCREEN ================= */}
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
            <span>Preview</span>
          </div>
          <p className="text-xs font-semibold text-white">sangeethsanthosh-git</p>
          <p className="text-[11px] text-white/75 line-clamp-1">
            Explore the source of <span className="text-[#faecd2]">rewind</span> • Flutter
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
          <p className="text-xs font-semibold text-white">Explore interactive projects</p>
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
            Tap to unlock
          </p>
          <div className="w-28 h-1 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
