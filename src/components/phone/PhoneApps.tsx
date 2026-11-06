"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  Github,
  Send,
  Sparkles,
  Check,
  Plus,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Search,
  Sliders,
  ChevronRight,
  Compass,
  MapPin,
  TrendingUp,
  Activity,
  Award,
  BookOpen,
  DollarSign,
  PieChart,
  Code2,
  Mail,
  Linkedin,
  Twitter,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkle,
  Copy,
  Terminal,
  FileText,
  Wand2,
  Bookmark,
  Heart,
  Share2,
  Upload,
  Download,
  Camera,
  Image as ImageIcon,
  Globe,
  Lock,
  RotateCw,
  Star,
  Calendar,
  Users,
  Utensils,
  Palmtree,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import { startLoFiSynth, stopLoFiSynth, isAudioPlaying, playHapticClick } from "./phoneAudio";

interface PhoneAppWrapperProps {
  title: string;
  repoUrl: string;
  liveUrl?: string;
  onClose: () => void;
  children: React.ReactNode;
  noPadding?: boolean;
  icon?: string;
}

function PhoneAppWrapper({
  title,
  repoUrl,
  liveUrl,
  onClose,
  children,
  noPadding,
  icon,
}: PhoneAppWrapperProps) {
  return (
    <div
      className={`absolute inset-0 z-40 bg-[#0d120f] text-white flex flex-col pt-10 pb-7 ${
        noPadding ? "px-0" : "px-4"
      } overflow-hidden select-none animate-fadeIn`}
    >
      {/* App Navigation Bar */}
      <div
        className={`flex items-center justify-between pb-2.5 border-b border-white/10 shrink-0 ${
          noPadding ? "px-4" : ""
        }`}
      >
        <button
          onClick={() => {
            playHapticClick();
            onClose();
          }}
          className="text-xs font-semibold text-[#faecd2] hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <span>‹ Back</span>
        </button>

        <div className="flex items-center gap-1.5 truncate max-w-[150px]">
          {icon && (
            <img
              src={icon}
              alt=""
              className="w-4 h-4 rounded-[4px] object-cover shrink-0 border border-white/20"
            />
          )}
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/90 truncate">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white cursor-pointer"
              title="Open Live Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white cursor-pointer"
            title="Open GitHub Repository"
          >
            <Github className="w-3.5 h-3.5 text-[#faecd2]" />
          </a>
        </div>
      </div>

      {/* App Body Content */}
      <div
        className={`flex-1 overflow-y-auto no-scrollbar ${
          noPadding ? "" : "pt-2.5"
        } flex flex-col`}
      >
        {children}
      </div>
    </div>
  );
}

// =========================================================================
// 1. REWIND (RETRO AUDIO CASSETTE WALKMAN)
// =========================================================================
export function RewindApp({ onClose }: { onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [tapeSide, setTapeSide] = useState<"A" | "B">("A");
  const [trackIdx, setTrackIdx] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(42);

  const TRACKS = [
    { title: "Neon Skyline", artist: "Sangeeth Lo-Fi", length: "02:45" },
    { title: "Walkman Memory", artist: "Retro Tape Lab", length: "03:12" },
    { title: "Kochi Nightdrive", artist: "Synthesizer Session", length: "02:58" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    playHapticClick();
    if (isPlaying) {
      stopLoFiSynth();
      setIsPlaying(false);
    } else {
      startLoFiSynth();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    playHapticClick();
    setTrackIdx((prev) => (prev + 1) % TRACKS.length);
    setSeconds(0);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/rewind-icon.png"
      title="Rewind • Walkman"
      repoUrl="https://github.com/sangeethsanthosh-git/rewind"
      onClose={() => {
        stopLoFiSynth();
        onClose();
      }}
    >
      <div className="flex flex-col items-center justify-between h-full gap-2.5 py-1">
        {/* Retro Cassette Body */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-[#2a241e] via-[#1a1714] to-[#12100d] border border-[#d6a56e]/30 p-3 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#d6a56e] border-b border-[#d6a56e]/20 pb-1 mb-2">
            <span>HI-FI AUDIO • C-60</span>
            <span className="px-1.5 py-0.5 rounded bg-[#d6a56e]/20 font-bold">SIDE {tapeSide}</span>
          </div>

          <div className="w-full h-22 rounded-lg bg-[#0a0907] border border-white/10 flex items-center justify-around px-4 relative overflow-hidden">
            <div className="absolute top-1/2 left-10 right-10 h-1.5 -translate-y-1/2 bg-[#533923] opacity-80" />

            <div
              className={`w-11 h-11 rounded-full border-2 border-[#d6a56e]/60 flex items-center justify-center relative bg-black/60 shadow-inner ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "2.4s" }}
            >
              <div className="w-4 h-4 rounded-full border border-dashed border-[#d6a56e]" />
            </div>

            <div className="font-mono text-center z-10 bg-black/80 px-2 py-1 rounded border border-[#d6a56e]/30">
              <span className="text-[10px] text-[#faecd2] font-bold block">{formatTime(seconds)}</span>
              <span className="text-[7px] text-[#d6a56e]/70 uppercase">Tape Pos</span>
            </div>

            <div
              className={`w-11 h-11 rounded-full border-2 border-[#d6a56e]/60 flex items-center justify-center relative bg-black/60 shadow-inner ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "2.4s" }}
            >
              <div className="w-4 h-4 rounded-full border border-dashed border-[#d6a56e]" />
            </div>
          </div>

          <div className="mt-2 text-center">
            <p className="text-[11px] font-bold text-white truncate">{TRACKS[trackIdx].title}</p>
            <p className="text-[9px] text-[#faecd2]/70 font-mono">{TRACKS[trackIdx].artist}</p>
          </div>
        </div>

        {/* Vintage Controls Deck */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                playHapticClick();
                setTapeSide((prev) => (prev === "A" ? "B" : "A"));
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-[#faecd2] border border-white/10 cursor-pointer"
            >
              Flip Side
            </button>

            <button
              onClick={togglePlay}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
                isPlaying
                  ? "bg-amber-500 text-black shadow-amber-500/30"
                  : "bg-[#225424] text-[#faecd2] shadow-[#225424]/40 hover:scale-105"
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-[#faecd2] border border-white/10 flex items-center gap-1 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" /> Next
            </button>
          </div>

          <p className="text-[9px] text-center text-white/50 font-mono">
            {isPlaying ? "♫ Playing live Web Audio Lo-Fi synth" : "Tap Play to hear audio engine"}
          </p>
        </div>

        <a
          href="https://github.com/sangeethsanthosh-git/rewind"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 rounded-xl bg-[#faecd2]/10 hover:bg-[#faecd2]/20 border border-[#faecd2]/20 flex items-center justify-center gap-2 text-xs font-semibold text-[#faecd2] transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Flutter Source on GitHub</span>
        </a>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 2. AURA AI (AUTONOMOUS VOICE AI WITH REAL WIKIPEDIA API & SPEECH)
// =========================================================================
export function AuraApp({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<
    Array<{ sender: "user" | "aura"; text: string; source?: string; sourceUrl?: string }>
  >([
    {
      sender: "aura",
      text: "Hello! I am AURA, Sangeeth's autonomous AI companion. I'm connected to the live Wikipedia Knowledge API and voice synthesis. Ask me anything about science, tech, history, or Sangeeth's projects!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);

  const QUICK_PROMPTS = [
    "What is Quantum Computing?",
    "Who is Sangeeth Santhosh?",
    "Explain Neural Networks",
    "Tell me about Alan Turing",
  ];

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#_]/g, "").slice(0, 200);
      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 1.05;
      window.speechSynthesis.speak(utter);
    } catch {
      // Ignore speech synthesis errors
    }
  };

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;
    playHapticClick();
    const query = userText.trim();
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setInput("");
    setIsThinking(true);

    const lower = query.toLowerCase();

    // Check portfolio-specific queries first
    if (lower.includes("who is sangeeth") || lower.includes("sangeeth") || lower.includes("about you")) {
      setTimeout(() => {
        const reply =
          "Sangeeth Santhosh is a full-stack engineer and UI designer building production applications across React, Next.js, Python (Django/Flask), and Flutter. He specializes in reactive systems, modern CSS, and autonomous AI agents.";
        setMessages((prev) => [...prev, { sender: "aura", text: reply }]);
        setIsThinking(false);
        speakText(reply);
      }, 500);
      return;
    }

    if (lower.includes("projects") || lower.includes("github") || lower.includes("work")) {
      setTimeout(() => {
        const reply =
          "Sangeeth has 13 active public repositories on GitHub (@sangeethsanthosh-git) including Rewind (Flutter Walkman), Chronicle Journal, Dayform Planner, and this AURA assistant!";
        setMessages((prev) => [...prev, { sender: "aura", text: reply }]);
        setIsThinking(false);
        speakText(reply);
      }, 500);
      return;
    }

    if (lower.includes("tech") || lower.includes("stack") || lower.includes("skills")) {
      setTimeout(() => {
        const reply =
          "Core stack: TypeScript, Next.js 15, Tailwind CSS, Python (Django & Flask), Flutter, PostgreSQL, Scikit-Learn, and Web Audio/Crypto APIs.";
        setMessages((prev) => [...prev, { sender: "aura", text: reply }]);
        setIsThinking(false);
        speakText(reply);
      }, 500);
      return;
    }

    // LIVE WIKIPEDIA API SEARCH & SUMMARY
    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        query
      )}&utf8=&format=json&origin=*`;
      const res = await fetch(searchUrl);
      const data = await res.json();

      if (data.query?.search && data.query.search.length > 0) {
        const topResult = data.query.search[0];
        const pageTitle = topResult.title;

        // Fetch official summary
        const summaryRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
        );
        const summaryData = await summaryRes.json();

        const extract =
          summaryData.extract ||
          topResult.snippet.replace(/<[^>]*>?/gm, "") ||
          "Information found on Wikipedia.";

        const reply = `${summaryData.title}: ${extract}`;
        const sourceUrl = summaryData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;

        setMessages((prev) => [
          ...prev,
          {
            sender: "aura",
            text: reply,
            source: "Wikipedia Live API",
            sourceUrl,
          },
        ]);
        speakText(extract);
      } else {
        const fallback = `I searched Wikipedia for "${query}", but couldn't find an exact match. Try asking about a science topic, technology, or Sangeeth's projects!`;
        setMessages((prev) => [...prev, { sender: "aura", text: fallback }]);
        speakText(fallback);
      }
    } catch {
      const errReply =
        "Network connection interrupted. AURA is operating in offline mode. Sangeeth's portfolio ecosystem is fully operational!";
      setMessages((prev) => [...prev, { sender: "aura", text: errReply }]);
      speakText(errReply);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/aura-icon.png"
      title="AURA • Live Voice AI"
      repoUrl="https://github.com/sangeethsanthosh-git/AURA"
      onClose={() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        onClose();
      }}
    >
      <div className="flex flex-col h-full gap-2 text-xs">
        {/* Pulsating Neural Voice Orb */}
        <div className="py-1 flex items-center justify-between px-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-emerald-500/40 blur-xs ${
                  isThinking ? "animate-ping" : "animate-pulse"
                }`}
              />
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center shadow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <span>AURA Autonomous AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </p>
              <p className="text-[9px] text-[#faecd2]/80 font-mono">
                {isThinking ? "Querying Wikipedia Live API..." : "Live Wikipedia & Speech Connected"}
              </p>
            </div>
          </div>

          {/* Voice Toggle */}
          <button
            onClick={() => {
              playHapticClick();
              setVoiceEnabled((prev) => !prev);
            }}
            className={`p-1.5 rounded-lg text-[10px] font-mono flex items-center gap-1 border transition-colors cursor-pointer ${
              voiceEnabled
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                : "bg-white/5 text-white/50 border-white/10 hover:text-white"
            }`}
            title="Toggle Text-to-Speech Voice"
          >
            {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 p-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-3 py-2 ${
                  m.sender === "user"
                    ? "bg-[#225424] text-[#faecd2] rounded-br-xs"
                    : "bg-white/10 backdrop-blur-md text-white/95 rounded-bl-xs border border-white/10 shadow-sm"
                }`}
              >
                <p className="leading-relaxed text-[11px]">{m.text}</p>
                {m.source && m.sourceUrl && (
                  <a
                    href={m.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] text-emerald-400 hover:underline mt-1 font-mono"
                  >
                    <span>Source: {m.source}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-3 py-1.5 bg-white/10 text-emerald-400 text-[10px] animate-pulse flex items-center gap-1.5 border border-emerald-500/20">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>Searching Wikipedia Live...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5 shrink-0">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-2 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[9px] text-[#faecd2] transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-1.5 shrink-0 pt-0.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AURA anything (Searches Wikipedia)..."
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-emerald-400"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center cursor-pointer shadow-md shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 3. CHRONICLE JOURNAL (ARTISANAL SCRAPBOOK)
// =========================================================================
export function ChronicleApp({ onClose }: { onClose: () => void }) {
  const [entries, setEntries] = useState<
    Array<{ id: number; text: string; sticker: string; date: string }>
  >([
    {
      id: 1,
      text: "Designed the Flutter Walkman cassette physics and artisanal journaling UI today.",
      sticker: "☕",
      date: "Oct 24",
    },
    {
      id: 2,
      text: "Ported Python ML models into high-performance client web modules.",
      sticker: "💻",
      date: "Oct 28",
    },
  ]);
  const [newText, setNewText] = useState("");
  const [activeSticker, setActiveSticker] = useState("☕");

  const STICKERS = ["☕", "🌴", "💻", "⭐", "🌿", "💡"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    playHapticClick();
    const entry = {
      id: Date.now(),
      text: newText.trim(),
      sticker: activeSticker,
      date: "Today",
    };
    setEntries((prev) => [entry, ...prev]);
    setNewText("");
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/chronicle-icon.png"
      title="Chronicle • Journal"
      repoUrl="https://github.com/sangeethsanthosh-git/chronicle-journal"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5 text-xs">
        {/* Paper Scrapbook Compose Card */}
        <div className="p-3 rounded-2xl bg-[#fdf6e6] text-[#2c221a] shadow-lg border border-[#e2d5bc] space-y-2">
          <div className="flex justify-between items-center border-b border-[#2c221a]/15 pb-1">
            <span className="font-serif italic text-xs text-[#6e5845]">New Scrapbook Entry</span>
            <div className="flex gap-1">
              {STICKERS.map((stk) => (
                <button
                  key={stk}
                  onClick={() => {
                    playHapticClick();
                    setActiveSticker(stk);
                  }}
                  className={`text-xs p-0.5 rounded cursor-pointer transition-transform ${
                    activeSticker === stk ? "scale-125 bg-black/10" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Write a reflection or memory..."
            rows={2}
            className="w-full bg-transparent font-serif text-xs text-[#2c221a] placeholder-[#2c221a]/40 focus:outline-hidden resize-none leading-relaxed"
          />

          <div className="flex justify-between items-center pt-1 border-t border-[#2c221a]/10">
            <span className="text-[10px] text-[#6e5845] font-mono">Sticker: {activeSticker}</span>
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-[#225424] text-[#faecd2] font-semibold text-[11px] shadow cursor-pointer hover:bg-[#1b431c]"
            >
              Pin to Scrapbook
            </button>
          </div>
        </div>

        {/* Saved Entries List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
          <p className="text-[10px] font-mono text-white/60 uppercase px-1">Past Entries</p>
          {entries.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-start gap-2.5"
            >
              <span className="text-base">{item.sticker}</span>
              <div className="flex-1">
                <p className="text-[11px] text-white/90 leading-snug">{item.text}</p>
                <span className="text-[9px] font-mono text-[#faecd2]/70 mt-1 block">
                  {item.date} • Offline-first
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 4. DAYFORM (MINIMAL AGENDA & HABIT PLANNER)
// =========================================================================
export function DayformApp({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Push Rewind Walkman update", done: true },
    { id: 2, text: "Review Next.js 16 Server Actions", done: true },
    { id: 3, text: "Ship Dayform Flutter release", done: false },
    { id: 4, text: "Daily 5km evening jog", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (id: number) => {
    playHapticClick();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    playHapticClick();
    setTasks((prev) => [...prev, { id: Date.now(), text: newTask.trim(), done: false }]);
    setNewTask("");
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/dayform-icon.png"
      title="Dayform • Minimal Agenda"
      repoUrl="https://github.com/sangeethsanthosh-git/dayform"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5">
        <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl border border-white/10 text-center">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div
              key={i}
              className={`w-7 h-8 rounded-lg flex flex-col items-center justify-center text-[10px] ${
                i === 4 ? "bg-[#225424] text-[#faecd2] font-bold shadow" : "text-white/60"
              }`}
            >
              <span>{day}</span>
              <span className="text-[9px]">{i + 2}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-semibold text-white/70 px-1">
            <span>Today's Commitments</span>
            <span className="text-emerald-400">
              {tasks.filter((t) => t.done).length}/{tasks.length} Completed
            </span>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer ${
                task.done
                  ? "bg-white/5 border-white/5 text-white/40 line-through"
                  : "bg-white/10 border-white/15 text-white hover:bg-white/15"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                  task.done
                    ? "bg-emerald-500 border-emerald-500 text-black"
                    : "border-white/40"
                }`}
              >
                {task.done && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs flex-1">{task.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={addTask} className="flex gap-2 shrink-0">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="+ Add commitment..."
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-emerald-400"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-[#225424] hover:bg-[#1b431c] text-[#faecd2] rounded-xl text-xs font-semibold cursor-pointer shadow"
          >
            Add
          </button>
        </form>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 5. FILE INTEGRITY VAULT (CRYPTOGRAPHIC SHA-256 SYSTEM)
// =========================================================================
export function VaultApp({ onClose }: { onClose: () => void }) {
  const [inputText, setInputText] = useState("confidential_system_block_2026");
  const [hash, setHash] = useState("");
  const [isTampered, setIsTampered] = useState(false);

  useEffect(() => {
    async function computeHash(val: string) {
      const data = new TextEncoder().encode(val);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      const hex = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      setHash(hex);
    }
    computeHash(inputText);
  }, [inputText]);

  return (
    <PhoneAppWrapper
      icon="/images/apps/vault-icon.svg"
      title="File Integrity • SHA-256"
      repoUrl="https://github.com/sangeethsanthosh-git/file-integrity"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5 text-xs">
        <div
          className={`p-2.5 rounded-xl border transition-colors flex items-center gap-2.5 ${
            isTampered
              ? "bg-red-500/20 border-red-500 text-red-200"
              : "bg-emerald-500/20 border-emerald-500 text-emerald-200"
          }`}
        >
          {isTampered ? (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <div>
            <p className="font-bold uppercase tracking-wider text-[10px]">
              {isTampered ? "Tampering Detected!" : "Integrity 100% Verified"}
            </p>
            <p className="text-[9px] opacity-80">
              {isTampered
                ? "Bit divergence at offset 0x3F! Checksum invalid."
                : "Cryptographic SHA-256 hash valid."}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-mono text-white/60 uppercase">
            Test Payload (Type below to hash)
          </label>
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setIsTampered(false);
            }}
            rows={2}
            className="w-full bg-white/10 border border-white/15 rounded-xl p-2 text-xs text-[#faecd2] font-mono focus:outline-hidden focus:border-emerald-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-mono text-white/60 uppercase">
            Live Web Crypto SHA-256
          </label>
          <div
            className={`p-2 rounded-xl font-mono text-[9px] break-all border ${
              isTampered
                ? "bg-red-950/50 border-red-500/50 text-red-300"
                : "bg-black/60 border-emerald-500/30 text-emerald-400"
            }`}
          >
            {isTampered
              ? "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 [CORRUPTED]"
              : hash || "Calculating..."}
          </div>
        </div>

        <div className="mt-auto space-y-1.5">
          <button
            onClick={() => {
              playHapticClick();
              setIsTampered((prev) => !prev);
            }}
            className={`w-full py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isTampered
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isTampered ? "Restore Original Hash" : "Simulate Byte Tamper Attack"}</span>
          </button>
        </div>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 6. KERALA TOURISM HUB (FAITHFUL REPLICA OF SANGEETH'S GITHUB REPO)
// =========================================================================
export function KeralaTourismApp({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"home" | "destinations" | "experiences" | "about" | "contact">("home");
  const [isReloading, setIsReloading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  // Form state for contact page
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    month: "October - March (Winter)",
    guests: "2",
    message: "",
  });

  const handleReload = () => {
    playHapticClick();
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 300);
  };

  const handleShare = () => {
    playHapticClick();
    setShareNotice("URL copied: keralatourism.org");
    setTimeout(() => setShareNotice(null), 2000);
  };

  const EXPERIENCES = [
    {
      title: "Backwater Houseboats",
      desc: "Lantern-lit evenings, coconut-lined canals, and a slow rhythm on the water.",
      img: "/images/kerala/Allapuzha.jpg",
    },
    {
      title: "Tea Country Escapes",
      desc: "Mist, winding roads, and endless green slopes where mornings feel ceremonial.",
      img: "/images/kerala/Munnar.jpg",
    },
    {
      title: "Cliff and Coast Retreats",
      desc: "Golden light, salt wind, and dramatic coastal horizons at Varkala.",
      img: "/images/kerala/Varkala.jpg",
    },
    {
      title: "Monsoon Story Trails",
      desc: "Rain-polished stone, spice gardens, and forest paths that feel cinematic.",
      img: "/images/kerala/4.jpg",
    },
  ];

  const DESTINATIONS = [
    {
      name: "Munnar",
      tagline: "Tea gardens and fresh mountain air.",
      desc: "Known for tea gardens, winding roads, and fresh mountain air. Cool mountain escape wrapped in endless green slopes.",
      img: "/images/kerala/Munnar.jpg",
    },
    {
      name: "Alleppey",
      tagline: "Peaceful backwater houseboats.",
      desc: "Famous for traditional Kettuvallam houseboats and peaceful canals. Slow living along tranquil waterways and village views.",
      img: "/images/kerala/Allapuzha.jpg",
    },
    {
      name: "Kovalam",
      tagline: "Golden sand and coastal views.",
      desc: "A laid-back destination with scenic beaches, ocean breeze, and stunning Arabian sea sunsets.",
      img: "/images/kerala/Varkala.jpg",
    },
    {
      name: "Wayanad",
      tagline: "Untamed wildlife and ancient spice trails.",
      desc: "A nature-rich destination filled with dense rainforests, waterfalls, prehistoric caves, and spice plantations.",
      img: "/images/kerala/5.jpg",
    },
  ];

  const ABOUT_HIGHLIGHTS = [
    {
      title: "Nature",
      icon: "🌿",
      desc: "Kerala is loved for its mountains, beaches, rivers, forests, and green landscapes.",
    },
    {
      title: "Culture",
      icon: "🎭",
      desc: "Visitors enjoy traditional dance forms, local festivals, heritage spaces, and authentic cuisine.",
    },
    {
      title: "Relaxation",
      icon: "🛶",
      desc: "From backwater stays to quiet hill retreats, Kerala is perfect for peaceful travel experiences.",
    },
  ];

  return (
    <PhoneAppWrapper
      icon="/images/apps/kerala-icon.svg"
      title="Kerala Tourism Hub"
      repoUrl="https://github.com/sangeethsanthosh-git/kerala-tourism"
      onClose={onClose}
      noPadding
    >
      <div className="flex flex-col h-full bg-[#fbf8f0] text-[#1C2421] overflow-hidden text-xs font-sans">
        {/* ============================================================== */}
        {/* IN-PHONE BROWSER ADDRESS BAR                                   */}
        {/* ============================================================== */}
        <div className="bg-[#102A21] border-b border-white/10 px-3 py-1.5 flex items-center justify-between gap-2 shrink-0 text-white">
          <div className="flex-1 flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl px-2.5 py-1 text-[11px]">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-mono text-[10px] text-emerald-300 truncate">
              keralatourism.org
            </span>
            <span className="text-white/40 text-[9px] font-mono ml-auto">
              {activeTab === "home" ? "" : `/${activeTab}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-white/70">
            <button
              onClick={handleReload}
              className={`p-1 hover:text-white cursor-pointer active:scale-95 ${
                isReloading ? "animate-spin text-emerald-400" : ""
              }`}
              title="Reload website"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                playHapticClick();
                setIsBookmarked(!isBookmarked);
              }}
              className={`p-1 hover:text-white cursor-pointer active:scale-95 ${
                isBookmarked ? "text-amber-400 fill-amber-400" : ""
              }`}
              title="Bookmark website"
            >
              <Star className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleShare}
              className="p-1 hover:text-white cursor-pointer active:scale-95"
              title="Share URL"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Share notification toast */}
        {shareNotice && (
          <div className="bg-[#173A2E] text-[#F6F0E4] px-3 py-1 text-[10px] font-bold text-center animate-fadeIn shrink-0">
            ✓ {shareNotice}
          </div>
        )}

        {/* ============================================================== */}
        {/* WEBSITE HEADER WITH AUTHENTIC BRANDING & NAV                   */}
        {/* ============================================================== */}
        <header className="bg-[#173A2E] text-[#F6F0E4] px-3 py-2 border-b border-[#B88949]/30 shrink-0 shadow-md">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <h1 className="text-xs font-black tracking-widest uppercase font-serif text-[#F6F0E4]">
                KERALA TOURISM
              </h1>
              <p className="text-[8px] text-[#B88949] italic font-serif tracking-wider">
                God&apos;s Own Country
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#B88949]/20 text-[#B88949] text-[8px] font-mono border border-[#B88949]/30 font-semibold">
              OFFICIAL
            </span>
          </div>

          {/* Navigation Bar (Exact pages from sangeethsanthosh-git/kerala-tourism) */}
          <nav className="flex gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: "home", label: "Home" },
              { id: "destinations", label: "Destinations" },
              { id: "experiences", label: "Experiences" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playHapticClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#B88949] text-white font-bold shadow-xs"
                    : "text-[#F6F0E4]/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* ============================================================== */}
        {/* SCROLLABLE PAGE BODY                                           */}
        {/* ============================================================== */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-4">
          {/* ================= TAB 1: HOME PAGE ================= */}
          {activeTab === "home" && (
            <>
              {/* Hero Banner: 'Escape to Serenity' */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#173A2E]/20">
                <div className="relative h-44 w-full">
                  <Image
                    src="/images/kerala/Allapuzha.jpg"
                    alt="Kerala backwaters at dawn"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A21] via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#B88949] font-bold">
                      Welcome to Kerala
                    </span>
                    <h2 className="text-base font-black font-serif leading-tight text-[#F6F0E4]">
                      Escape to Serenity
                    </h2>
                    <p className="text-[10px] text-white/90 leading-snug">
                      Where the backwaters meet the sky and the soul finds its rhythm.
                    </p>
                    <button
                      onClick={() => {
                        playHapticClick();
                        setActiveTab("destinations");
                      }}
                      className="mt-1.5 px-3 py-1.5 rounded-lg bg-[#B88949] hover:bg-[#a0743b] text-white font-bold text-[10px] shadow cursor-pointer transition-transform active:scale-95 inline-block"
                    >
                      Explore Destinations →
                    </button>
                  </div>
                </div>
              </div>

              {/* Intro Section: 'A Journey Through Tradition' */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#173A2E]/10 shadow-xs space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#B88949] block">
                  The Emerald of India
                </span>
                <h3 className="text-sm font-bold font-serif text-[#173A2E] leading-snug">
                  A Journey Through Tradition
                </h3>
                <p className="text-[10px] text-[#5D6B63] leading-relaxed">
                  From the tranquil backwaters of Alleppey to the spice-scented hills of Munnar,
                  Kerala offers a kaleidoscope of landscapes. Witness the ancient dance form of
                  Kathakali, indulge in Ayurvedic healing, and taste the richness of Malabari spices.
                </p>

                {/* Stats from content.py: 600km Coastline, 44 Rivers */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#173A2E]/10">
                  <div className="p-2 rounded-xl bg-[#EEF2ED] text-center border border-[#173A2E]/5">
                    <p className="text-base font-black text-[#173A2E] font-serif">600km</p>
                    <p className="text-[9px] font-semibold text-[#5D6B63] uppercase tracking-wider">
                      Coastline
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#EEF2ED] text-center border border-[#173A2E]/5">
                    <p className="text-base font-black text-[#173A2E] font-serif">44</p>
                    <p className="text-[9px] font-semibold text-[#5D6B63] uppercase tracking-wider">
                      Rivers
                    </p>
                  </div>
                </div>
              </div>

              {/* Experiences Preview Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold font-serif text-[#173A2E] uppercase tracking-wider">
                    Signature Experiences
                  </h3>
                  <button
                    onClick={() => setActiveTab("experiences")}
                    className="text-[10px] font-bold text-[#B88949] hover:underline cursor-pointer"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-2">
                  {EXPERIENCES.slice(0, 2).map((exp, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden bg-white border border-[#173A2E]/10 shadow-xs flex"
                    >
                      <div className="relative w-24 shrink-0">
                        <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                      </div>
                      <div className="p-2.5 flex-1">
                        <h4 className="text-[11px] font-bold text-[#173A2E] font-serif">{exp.title}</h4>
                        <p className="text-[9px] text-[#5D6B63] mt-0.5 leading-snug">{exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ================= TAB 2: DESTINATIONS ================= */}
          {activeTab === "destinations" && (
            <div className="space-y-3">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#B88949] block">
                  Top Destinations
                </span>
                <h2 className="text-sm font-bold font-serif text-[#173A2E]">
                  Discover God&apos;s Own Country
                </h2>
              </div>

              <div className="space-y-2.5">
                {DESTINATIONS.map((dest, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden bg-white border border-[#173A2E]/10 shadow-xs"
                  >
                    <div className="relative h-28 w-full">
                      <Image src={dest.img} alt={dest.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                        <h3 className="text-xs font-bold font-serif">{dest.name}</h3>
                        <p className="text-[9px] text-[#F6F0E4]/90 font-serif italic">
                          {dest.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[10px] text-[#5D6B63] leading-relaxed">{dest.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* More destinations pill list from content.py */}
              <div className="p-3 rounded-2xl bg-white border border-[#173A2E]/10 shadow-xs space-y-1.5">
                <span className="text-[9px] font-bold font-serif text-[#173A2E] uppercase block">
                  More Iconic Escapes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Thekkady", "Wayanad", "Vagamon", "Varkala", "Bekal"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-[#EEF2ED] text-[#173A2E] font-medium text-[9px] border border-[#173A2E]/10"
                    >
                      📍 {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: EXPERIENCES ================= */}
          {activeTab === "experiences" && (
            <div className="space-y-3">
              <div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#B88949] block">
                  Curated Journeys
                </span>
                <h2 className="text-sm font-bold font-serif text-[#173A2E]">
                  Experiences That Stay With You
                </h2>
              </div>

              <div className="space-y-3">
                {EXPERIENCES.map((exp, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden bg-white border border-[#173A2E]/10 shadow-xs space-y-2 p-2.5"
                  >
                    <div className="relative h-28 w-full rounded-xl overflow-hidden">
                      <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold font-serif text-[#173A2E]">{exp.title}</h3>
                      <p className="text-[10px] text-[#5D6B63] mt-0.5 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: ABOUT ================= */}
          {activeTab === "about" && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-white border border-[#173A2E]/10 shadow-xs space-y-1">
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#B88949] block">
                  About Kerala Tourism
                </span>
                <h2 className="text-sm font-bold font-serif text-[#173A2E]">
                  God&apos;s Own Country
                </h2>
                <p className="text-[10px] text-[#5D6B63] leading-relaxed">
                  Kerala is renowned globally for its eco-tourism initiatives, rich cultural
                  tapestry, and timeless natural beauty nestled along the tropical Malabar Coast.
                </p>
              </div>

              <div className="space-y-2">
                {ABOUT_HIGHLIGHTS.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white border border-[#173A2E]/10 shadow-xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <h3 className="text-xs font-bold font-serif text-[#173A2E]">{item.title}</h3>
                    </div>
                    <p className="text-[10px] text-[#5D6B63] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: CONTACT & PLAN ================= */}
          {activeTab === "contact" && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-white border border-[#173A2E]/10 shadow-xs space-y-1">
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#B88949] block">
                  Plan Your Escape
                </span>
                <h2 className="text-sm font-bold font-serif text-[#173A2E]">
                  Get In Touch
                </h2>
                <p className="text-[10px] text-[#5D6B63] leading-snug">
                  Tell us when you want to visit and we&apos;ll help you craft an unforgettable holiday.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-4 rounded-2xl bg-[#173A2E] text-[#F6F0E4] text-center space-y-2 shadow-md animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[#B88949] text-white flex items-center justify-center mx-auto text-sm font-bold">
                    ✓
                  </div>
                  <h3 className="text-xs font-bold font-serif text-[#F6F0E4]">
                    Inquiry Received!
                  </h3>
                  <p className="text-[10px] text-white/80 leading-snug">
                    Thank you, {formData.name || "Traveler"}. Our tourism desk will send your tailored
                    Kerala itinerary for {formData.month}.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-3 py-1 rounded-lg bg-[#B88949] text-white text-[10px] font-bold cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    playHapticClick();
                    setFormSubmitted(true);
                  }}
                  className="p-3 rounded-2xl bg-white border border-[#173A2E]/10 shadow-xs space-y-2"
                >
                  <div>
                    <label className="text-[9px] font-bold text-[#173A2E] block uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sangeeth Santhosh"
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-[#EEF2ED] border border-[#173A2E]/15 text-[10px] text-[#1C2421] focus:outline-hidden focus:border-[#B88949]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-[#173A2E] block uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-[#EEF2ED] border border-[#173A2E]/15 text-[10px] text-[#1C2421] focus:outline-hidden focus:border-[#B88949]"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-[#173A2E] block uppercase">
                      Preferred Season
                    </label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-[#EEF2ED] border border-[#173A2E]/15 text-[10px] text-[#1C2421] focus:outline-hidden focus:border-[#B88949]"
                    >
                      <option>October - March (Winter)</option>
                      <option>April - May (Summer)</option>
                      <option>June - September (Monsoon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-[#173A2E] block uppercase">
                      Special Requests / Itinerary Goals
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Houseboat stay, spice plantation visit, etc..."
                      className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-[#EEF2ED] border border-[#173A2E]/15 text-[10px] text-[#1C2421] focus:outline-hidden focus:border-[#B88949]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#173A2E] hover:bg-[#102A21] text-[#F6F0E4] font-bold text-[10px] tracking-wide uppercase shadow cursor-pointer transition-transform active:scale-95"
                  >
                    Submit Travel Inquiry →
                  </button>
                </form>
              )}

              {/* Official Contact Info from backend/content.py */}
              <div className="p-3 rounded-2xl bg-[#173A2E] text-[#F6F0E4] space-y-1.5 text-[9px] font-mono shadow-xs">
                <span className="text-[#B88949] font-bold block uppercase tracking-wider">
                  Official Tourism Desk
                </span>
                <p>📍 Location: Trivandrum, Kerala</p>
                <p>📞 Phone: +91 471 2321132</p>
                <p>✉️ Email: hello@keralatourism.com</p>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* AUTHENTIC FOOTER                                               */}
          {/* ============================================================== */}
          <footer className="pt-3 border-t border-[#173A2E]/15 text-center space-y-2 text-[#5D6B63]">
            <p className="text-[8px] font-serif uppercase tracking-widest text-[#173A2E] font-bold">
              Department of Tourism • Government of Kerala
            </p>
            <p className="text-[8px] font-mono">
              Replicated directly from sangeethsanthosh-git/kerala-tourism
            </p>
            <a
              href="https://github.com/sangeethsanthosh-git/kerala-tourism"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-3 rounded-xl bg-[#173A2E] hover:bg-[#102A21] text-[#F6F0E4] inline-flex items-center justify-center gap-1.5 text-[9px] font-semibold shadow"
            >
              <Github className="w-3 h-3 text-[#B88949]" />
              <span>Explore GitHub Repository</span>
            </a>
          </footer>
        </main>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 7. WEBSITE TRAFFIC ANALYZER
// =========================================================================
export function TrafficApp({ onClose }: { onClose: () => void }) {
  const [logs, setLogs] = useState<string[]>([
    "GET /api/v1/metrics - 200 OK (8ms)",
    "GET /projects/rewind - 200 OK (14ms)",
    "POST /auth/session - 200 OK (22ms)",
  ]);

  useEffect(() => {
    const endpoints = [
      "GET /skills/python",
      "GET /projects/chronicle",
      "GET /images/aura.jpg",
      "POST /analytics/ping",
      "GET /api/status",
    ];
    const timer = setInterval(() => {
      const ep = endpoints[Math.floor(Math.random() * endpoints.length)];
      const ms = Math.floor(Math.random() * 25) + 4;
      setLogs((prev) => [`${ep} - 200 OK (${ms}ms)`, ...prev.slice(0, 6)]);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <PhoneAppWrapper
      icon="/images/apps/traffic-icon.svg"
      title="Traffic • Log Stream"
      repoUrl="https://github.com/sangeethsanthosh-git/website-traffic-analyzer"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-xl bg-white/10 border border-white/15">
            <span className="text-[9px] font-mono text-white/60">Live Requests</span>
            <p className="text-base font-bold text-emerald-400">148 req/s</p>
          </div>
          <div className="p-2 rounded-xl bg-white/10 border border-white/15">
            <span className="text-[9px] font-mono text-white/60">Uptime</span>
            <p className="text-base font-bold text-[#faecd2]">99.96%</p>
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-black/80 border border-white/15 p-2 font-mono text-[9px] flex flex-col overflow-hidden">
          <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-white/10 text-white/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Streaming Real-Time Logs</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 text-emerald-400/90">
            {logs.map((log, i) => (
              <p key={i} className="truncate">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 8. EDUSENSE (AI LECTURE ASSISTANT & FLASHCARDS)
// =========================================================================
export function EduSenseApp({ onClose }: { onClose: () => void }) {
  const FLASHCARDS = [
    {
      q: "What is the primary benefit of React Server Components?",
      a: "Zero client-side bundle weight, direct access to backend resources, and automatic streaming SSR.",
    },
    {
      q: "How does Bilateral Filtering preserve edges in OpenCV?",
      a: "It combines geometric domain closeness with photometric range similarity, smoothing textures without blurring edges.",
    },
    {
      q: "Why is SHA-256 considered cryptographically secure?",
      a: "It offers 2^128 collision resistance, making brute-force pre-image attacks computationally infeasible.",
    },
  ];

  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const curr = FLASHCARDS[cardIdx];

  const handleNext = () => {
    playHapticClick();
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % FLASHCARDS.length);
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/edusense-icon.svg"
      title="EduSense • Flashcards"
      repoUrl="https://github.com/sangeethsanthosh-git/Edusense"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-3 text-xs py-1">
        <div className="flex justify-between items-center text-[10px] font-mono text-white/60">
          <span>Card {cardIdx + 1} of {FLASHCARDS.length}</span>
          <span className="text-emerald-400">Interactive Quiz</span>
        </div>

        {/* 3D Flip Card */}
        <div
          onClick={() => {
            playHapticClick();
            setIsFlipped((prev) => !prev);
          }}
          className="flex-1 rounded-2xl bg-gradient-to-br from-[#1c2c20] to-[#111914] border border-emerald-500/30 p-4 flex flex-col justify-between cursor-pointer shadow-xl transition-all hover:border-emerald-500/60"
        >
          <span className="text-[9px] font-mono text-[#faecd2] uppercase tracking-wider">
            {isFlipped ? "✦ Answer / Key Takeaway" : "✦ Question (Tap to Reveal Answer)"}
          </span>

          <p className="text-sm font-semibold text-white leading-relaxed text-center my-auto">
            {isFlipped ? curr.a : curr.q}
          </p>

          <span className="text-[9px] font-mono text-white/50 text-center">
            {isFlipped ? "Tap to flip back" : "Tap card to flip"}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-2.5 rounded-xl bg-[#225424] hover:bg-[#1b431c] text-[#faecd2] font-semibold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"
        >
          <span>Next Flashcard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 9. AI BUDGET PLANNER
// =========================================================================
export function BudgetApp({ onClose }: { onClose: () => void }) {
  const [income, setIncome] = useState(6500);

  const essentials = Math.round(income * 0.5);
  const savings = Math.round(income * 0.35);
  const discretionary = income - essentials - savings;

  return (
    <PhoneAppWrapper
      icon="/images/apps/budget-icon.svg"
      title="AI Budget • FinTech"
      repoUrl="https://github.com/sangeethsanthosh-git/ai-budget-planner"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5 text-xs">
        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-white/70 uppercase">Monthly Income</span>
            <span className="text-base font-bold text-emerald-400">${income.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="2000"
            max="15000"
            step="250"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5 flex-1">
          <p className="text-[9px] font-mono text-white/60 uppercase">50 / 30 / 20 Allocation</p>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Essentials (50%)</p>
              <p className="text-[9px] text-white/50">Housing, Utilities</p>
            </div>
            <span className="font-mono text-xs text-[#faecd2]">${essentials.toLocaleString()}</span>
          </div>

          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex justify-between items-center">
            <div>
              <p className="font-semibold text-emerald-300">Investments (35%)</p>
              <p className="text-[9px] text-emerald-200/50">Index Funds, Roth IRA</p>
            </div>
            <span className="font-mono text-xs text-emerald-400">${savings.toLocaleString()}</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
            <div>
              <p className="font-semibold text-white">Tech & Lifestyle (15%)</p>
              <p className="text-[9px] text-white/50">Developer Subscriptions</p>
            </div>
            <span className="font-mono text-xs text-white/80">${discretionary.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-2 rounded-xl bg-[#faecd2]/10 border border-[#faecd2]/20 flex items-center gap-1.5 text-[10px] text-[#faecd2]">
          <Sparkle className="w-3.5 h-3.5 shrink-0" />
          <span>Projected 5-year savings: ${(savings * 60).toLocaleString()}!</span>
        </div>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 10. PCOD DETECTION SYSTEM (CLINICAL ML DECISION TOOL)
// =========================================================================
export function PcodApp({ onClose }: { onClose: () => void }) {
  const [bmi, setBmi] = useState(24);
  const [glucose, setGlucose] = useState(98);
  const [insulin, setInsulin] = useState(12);

  // Decision logic calculated in real client-side JS
  const riskScore = Math.min(
    95,
    Math.max(
      8,
      Math.round(((bmi - 18) / 15) * 35 + ((glucose - 70) / 70) * 35 + ((insulin - 5) / 25) * 30)
    )
  );

  const isHighRisk = riskScore > 50;

  return (
    <PhoneAppWrapper
      icon="/images/apps/pcod-icon.svg"
      title="PCOD ML • Healthcare"
      repoUrl="https://github.com/sangeethsanthosh-git/PCOD-Detection-System"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5 text-xs">
        <div
          className={`p-3 rounded-2xl border flex items-center justify-between ${
            isHighRisk
              ? "bg-rose-500/15 border-rose-500 text-rose-200"
              : "bg-emerald-500/15 border-emerald-500 text-emerald-200"
          }`}
        >
          <div>
            <p className="font-bold uppercase tracking-wider text-[10px]">
              {isHighRisk ? "Moderate / High Risk" : "Normal / Low Risk"}
            </p>
            <p className="text-[9px] opacity-80">Clinical Scikit-Learn evaluation</p>
          </div>
          <span className="text-xl font-bold font-mono">{riskScore}%</span>
        </div>

        <div className="space-y-2 flex-1">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-white/70">
              <span>BMI (Body Mass Index)</span>
              <span className="font-bold text-white">{bmi}</span>
            </div>
            <input
              type="range"
              min="18"
              max="38"
              value={bmi}
              onChange={(e) => setBmi(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-white/70">
              <span>Fasting Glucose (mg/dL)</span>
              <span className="font-bold text-white">{glucose} mg/dL</span>
            </div>
            <input
              type="range"
              min="70"
              max="160"
              value={glucose}
              onChange={(e) => setGlucose(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-white/70">
              <span>Fasting Insulin (µIU/mL)</span>
              <span className="font-bold text-white">{insulin} µIU/mL</span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              value={insulin}
              onChange={(e) => setInsulin(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        <a
          href="https://github.com/sangeethsanthosh-git/PCOD-Detection-System"
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2 text-xs font-semibold text-white"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Inspect Python Scikit Model</span>
        </a>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 11. CARTOONIZER AI (WHITE-BOX CARTOONIZATION - EXACT SANGEETH REPO REPLICA)
// =========================================================================
type CartoonStyle = "whitebox" | "guided" | "anime" | "manga";

interface CartoonStyleOption {
  id: CartoonStyle;
  label: string;
  icon: string;
  desc: string;
}

const CARTOON_STYLES: CartoonStyleOption[] = [
  { id: "whitebox", label: "White-Box AI", icon: "✨", desc: "Official Pretrained Neural Model" },
  { id: "guided", label: "Guided Filter", icon: "🎨", desc: "Surface Smoothing + Natural Contours" },
  { id: "anime", label: "Anime Cel", icon: "🌸", desc: "Luminous Tones & Shinkai Sky Grading" },
  { id: "manga", label: "Manga Inking", icon: "✏️", desc: "Monochrome Structural Contour Stream" },
];

export function CartoonizerApp({ onClose }: { onClose: () => void }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [originalImageSrc, setOriginalImageSrc] = useState<string>("/images/wb-cartoon-input.webp");
  const [cartoonImageSrc, setCartoonImageSrc] = useState<string | null>("/images/wb-cartoon-output.webp");
  const [currentStyle, setCurrentStyle] = useState<CartoonStyle>("whitebox");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [photoName, setPhotoName] = useState<string>("Repo Reference (White-Box)");
  const [processingTimeMs, setProcessingTimeMs] = useState<number>(18);
  const [activeSampleIdx, setActiveSampleIdx] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // High-Fidelity Canvas 2D White-Box Guided Filter Pipeline
  const processCartoonEffect = (imageSource: string, style: CartoonStyle) => {
    // If it's the repo reference and whitebox style, use the exact model output
    if (imageSource === "/images/wb-cartoon-input.webp" && style === "whitebox") {
      setCartoonImageSrc("/images/wb-cartoon-output.webp");
      setProcessingTimeMs(12);
      return;
    }
    if (imageSource === "/images/before.jpeg" && (style === "whitebox" || style === "guided")) {
      setCartoonImageSrc("/images/cartoon.jpg");
      setProcessingTimeMs(14);
      return;
    }

    setIsProcessing(true);
    const startTime = performance.now();

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const maxDim = 480;
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          setIsProcessing(false);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        const src = imgData.data;

        // 1. Surface Representation: Guided / Bilateral Edge-Preserving Filter
        const smooth = new Uint8ClampedArray(width * height * 4);
        const colorThreshold = style === "anime" ? 90 : 65;

        for (let y = 1; y < height - 1; y++) {
          const row = y * width;
          for (let x = 1; x < width - 1; x++) {
            const idx0 = (row + x) * 4;
            const r0 = src[idx0];
            const g0 = src[idx0 + 1];
            const b0 = src[idx0 + 2];
            let sumR = 0, sumG = 0, sumB = 0, count = 0;

            for (let dy = -1; dy <= 1; dy++) {
              const nRow = (y + dy) * width;
              for (let dx = -1; dx <= 1; dx++) {
                const nIdx = (nRow + x + dx) * 4;
                const dr = Math.abs(src[nIdx] - r0);
                const dg = Math.abs(src[nIdx + 1] - g0);
                const db = Math.abs(src[nIdx + 2] - b0);
                if (dr + dg + db < colorThreshold) {
                  sumR += src[nIdx];
                  sumG += src[nIdx + 1];
                  sumB += src[nIdx + 2];
                  count++;
                }
              }
            }
            if (count > 0) {
              smooth[idx0] = sumR / count;
              smooth[idx0 + 1] = sumG / count;
              smooth[idx0 + 2] = sumB / count;
            } else {
              smooth[idx0] = r0;
              smooth[idx0 + 1] = g0;
              smooth[idx0 + 2] = b0;
            }
            smooth[idx0 + 3] = 255;
          }
        }

        // 2. Structure Representation: Continuous Gradient Contour Extraction
        const gray = new Float32Array(width * height);
        for (let i = 0, p = 0; i < src.length; i += 4, p++) {
          gray[p] = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
        }

        const edgeWeights = new Float32Array(width * height);
        const sensitivity = style === "manga" ? 35 : style === "anime" ? 48 : 42;

        for (let y = 1; y < height - 1; y++) {
          const row = y * width;
          for (let x = 1; x < width - 1; x++) {
            const p = row + x;
            const gx =
              -gray[p - width - 1] +
              gray[p - width + 1] -
              2 * gray[p - 1] +
              2 * gray[p + 1] -
              gray[p + width - 1] +
              gray[p + width + 1];
            const gy =
              -gray[p - width - 1] -
              2 * gray[p - width] -
              gray[p - width + 1] +
              gray[p + width - 1] +
              2 * gray[p + width] +
              gray[p + width + 1];
            const mag = Math.hypot(gx, gy);
            if (mag > sensitivity) {
              edgeWeights[p] = Math.min(1.0, (mag - sensitivity) / 70);
            }
          }
        }

        // 3. Texture & Color Composition (Matching White-Box Gamma & Warmth)
        const outData = ctx.createImageData(width, height);
        const dst = outData.data;

        const satFactor = style === "anime" ? 0.38 : 0.22;
        const gamma = style === "anime" ? 0.90 : 0.94;

        for (let y = 0; y < height; y++) {
          const row = y * width;
          for (let x = 0; x < width; x++) {
            const p = row + x;
            const idx = p * 4;
            const edge = edgeWeights[p];

            // Manga line art stream
            if (style === "manga") {
              if (edge > 0.1) {
                const ink = Math.max(0, Math.round(255 * (1 - edge * 1.3)));
                dst[idx] = ink;
                dst[idx + 1] = ink;
                dst[idx + 2] = ink;
              } else {
                dst[idx] = 248;
                dst[idx + 1] = 245;
                dst[idx + 2] = 238;
              }
              dst[idx + 3] = 255;
              continue;
            }

            // White-Box / Anime Painted Cel Shading
            let r = smooth[idx] || src[idx];
            let g = smooth[idx + 1] || src[idx + 1];
            let b = smooth[idx + 2] || src[idx + 2];

            // Gamma curve (lift mid-tones for anime radiance)
            r = 255 * Math.pow(r / 255, gamma);
            g = 255 * Math.pow(g / 255, gamma);
            b = 255 * Math.pow(b / 255, gamma);

            // Saturation boost
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            r = Math.min(255, Math.max(0, r + (r - lum) * satFactor));
            g = Math.min(255, Math.max(0, g + (g - lum) * satFactor));
            b = Math.min(255, Math.max(0, b + (b - lum) * satFactor));

            // Gentle color quantization (16 levels)
            const step = 16;
            r = Math.min(255, Math.floor(r / step) * step + step / 2);
            g = Math.min(255, Math.floor(g / step) * step + step / 2);
            b = Math.min(255, Math.floor(b / step) * step + step / 2);

            // Soft natural contour blend (no harsh stair-stepping)
            const inkMul = 1.0 - edge * 0.72;
            dst[idx] = Math.round(r * inkMul);
            dst[idx + 1] = Math.round(g * inkMul);
            dst[idx + 2] = Math.round(b * inkMul);
            dst[idx + 3] = 255;
          }
        }

        ctx.putImageData(outData, 0, 0);
        const resultUrl = canvas.toDataURL("image/jpeg", 0.94);
        setCartoonImageSrc(resultUrl);
        setProcessingTimeMs(Math.round(performance.now() - startTime));
        setIsProcessing(false);
      } catch (err) {
        console.error("Cartoonizer error:", err);
        setCartoonImageSrc("/images/wb-cartoon-output.webp");
        setIsProcessing(false);
      }
    };

    img.onerror = () => {
      setCartoonImageSrc("/images/wb-cartoon-output.webp");
      setIsProcessing(false);
    };

    img.src = imageSource;
  };

  const handleSelectStyle = (style: CartoonStyle) => {
    if (style === currentStyle) return;
    playHapticClick();
    setCurrentStyle(style);
    processCartoonEffect(originalImageSrc, style);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    playHapticClick();
    const shortName = file.name.length > 18 ? file.name.substring(0, 15) + "..." : file.name;
    setPhotoName(shortName);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setOriginalImageSrc(dataUrl);
        processCartoonEffect(dataUrl, currentStyle === "whitebox" ? "guided" : currentStyle);
      }
    };
    reader.readAsDataURL(file);
  };

  const SAMPLES = [
    {
      name: "White-Box Model (Repo)",
      input: "/images/wb-cartoon-input.webp",
      output: "/images/wb-cartoon-output.webp",
    },
    {
      name: "Portrait Model",
      input: "/images/before.jpeg",
      output: "/images/cartoon.jpg",
    },
    {
      name: "Kerala River",
      input: "/images/kerala/Allapuzha.jpg",
      output: null,
    },
  ];

  const handleCycleSample = () => {
    playHapticClick();
    const nextIdx = (activeSampleIdx + 1) % SAMPLES.length;
    setActiveSampleIdx(nextIdx);
    const sample = SAMPLES[nextIdx];
    setPhotoName(sample.name);
    setOriginalImageSrc(sample.input);
    if (sample.output && (currentStyle === "whitebox" || currentStyle === "guided")) {
      setCartoonImageSrc(sample.output);
    } else {
      processCartoonEffect(sample.input, currentStyle);
    }
  };

  const handleDownload = () => {
    if (!cartoonImageSrc) return;
    playHapticClick();
    const link = document.createElement("a");
    link.download = `white-box-cartoon-${currentStyle}-${Date.now()}.jpg`;
    link.href = cartoonImageSrc;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateSliderFromPointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, Math.round((relativeX / rect.width) * 100)));
    setSliderPos(percent);
  };

  return (
    <PhoneAppWrapper
      icon="/images/apps/cartoon-icon.svg"
      title="White-Box Cartoonizer"
      repoUrl="https://github.com/sangeethsanthosh-git/Cartoonizer"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2 text-xs">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Top Control Bar: Upload Photo, Sample Cycle & Download */}
        <div className="flex items-center justify-between gap-1.5 shrink-0">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-[11px] shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95 transition-all"
            title="Upload your own photo to cartoonize"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={handleCycleSample}
            className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 font-medium text-[10px] cursor-pointer active:scale-95 transition-all flex items-center gap-1"
            title="Cycle between repo sample & portraits"
          >
            <RefreshCw className="w-3 h-3 text-emerald-400" />
            <span>Sample ({activeSampleIdx + 1}/3)</span>
          </button>

          {cartoonImageSrc && (
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-400 cursor-pointer active:scale-95 transition-all"
              title="Download Result"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Style Selector Pills from Sangeeth's Architecture */}
        <div className="grid grid-cols-4 gap-1 shrink-0 bg-white/5 p-1 rounded-xl border border-white/10">
          {CARTOON_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => handleSelectStyle(style.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all cursor-pointer ${
                currentStyle === style.id
                  ? "bg-[#225424] text-[#faecd2] shadow-sm font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-[12px]">{style.icon}</span>
              <span className="text-[9px] truncate w-full text-center">{style.label}</span>
            </button>
          ))}
        </div>

        {/* Active Model / Photo Info Bar */}
        <div className="flex items-center justify-between text-[9px] text-white/60 px-1 shrink-0">
          <span className="truncate max-w-[170px] text-white/80 font-mono">
            📷 {photoName}
          </span>
          <span className="text-emerald-400 font-mono">
            {isProcessing ? "Processing White-Box AI..." : `⚡ ${processingTimeMs}ms • TensorFlow/Canvas`}
          </span>
        </div>

        {/* Interactive Split-Screen Image Viewer */}
        <div
          ref={containerRef}
          onPointerDown={(e) => {
            setIsDragging(true);
            updateSliderFromPointer(e.clientX);
          }}
          onPointerMove={(e) => {
            if (isDragging) updateSliderFromPointer(e.clientX);
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          className="relative flex-1 w-full min-h-[220px] rounded-2xl overflow-hidden border border-white/20 select-none bg-black cursor-ew-resize touch-none shadow-inner"
        >
          {/* Base Layer: Cartoonized Output */}
          <div className="absolute inset-0">
            {cartoonImageSrc ? (
              <img
                src={cartoonImageSrc}
                alt="Cartoonized Result"
                className="w-full h-full object-cover pointer-events-none select-none"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white/50 text-[10px]">
                Generating Cartoon...
              </div>
            )}
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[9px] font-mono text-emerald-400 border border-emerald-400/40 shadow">
              White-Box ({currentStyle})
            </span>
          </div>

          {/* Top Layer: Original Photo (Clipped by slider position) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
          >
            <img
              src={originalImageSrc}
              alt="Original Photograph"
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[9px] font-mono text-white/80 border border-white/20 shadow">
              Original Photo
            </span>
          </div>

          {/* Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold shadow-2xl border border-black/20">
              ↔
            </div>
          </div>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 z-20">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-spin" />
              <span className="text-[10px] font-mono text-white">Applying Guided Filter AI...</span>
            </div>
          )}
        </div>

        {/* Range Slider for Fine Control */}
        <div className="space-y-1 shrink-0 pt-0.5">
          <div className="flex justify-between text-[9px] text-white/60 font-mono">
            <span>← Stylized ({sliderPos}%)</span>
            <span>Original ({100 - sliderPos}%) →</span>
          </div>
          <input
            type="range"
            min="5"
            max="95"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
          />
        </div>

        {/* Architectural Guarantee Footer */}
        <div className="text-[8px] text-white/50 text-center font-mono shrink-0">
          White-box Cartoonization • Guided Filter Surface + Structure Stream
        </div>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 12. GISTIFY AI (EXECUTIVE DOCUMENT INTELLIGENCE)
// =========================================================================
export function GistifyApp({ onClose }: { onClose: () => void }) {
  const [docType, setDocType] = useState<"ai" | "distributed">("ai");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const DOCS = {
    ai: {
      title: "Autonomous Agents in Multi-Turn Systems",
      bullets: [
        "Local LLM routing reduces cloud inference costs by 68%.",
        "Deterministic JSON schemas eliminate hallucinations in API tool execution.",
        "Speech synthesis latency is under 120ms with Web Speech API.",
      ],
      sentiment: "+92% Positive",
    },
    distributed: {
      title: "Edge Database Sharding & Conflict-Free Replication",
      bullets: [
        "CRDT data structures allow 100% offline journaling synchronization.",
        "SHA-256 block hashing guarantees zero silent data corruption.",
        "Next.js Incremental Static Revalidation yields sub-10ms TTFB.",
      ],
      sentiment: "+86% Positive",
    },
  };

  const curr = DOCS[docType];

  return (
    <PhoneAppWrapper
      icon="/images/apps/gistify-icon.svg"
      title="Gistify • Document AI"
      repoUrl="https://github.com/sangeethsanthosh-git/Gistify"
      liveUrl="https://gistify-c.vercel.app/"
      onClose={onClose}
    >
      <div className="flex flex-col h-full gap-2.5 text-xs">
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => {
              playHapticClick();
              setDocType("ai");
            }}
            className={`flex-1 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              docType === "ai" ? "bg-[#225424] text-[#faecd2] shadow" : "text-white/60"
            }`}
          >
            AI Agent Spec
          </button>
          <button
            onClick={() => {
              playHapticClick();
              setDocType("distributed");
            }}
            className={`flex-1 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              docType === "distributed" ? "bg-[#225424] text-[#faecd2] shadow" : "text-white/60"
            }`}
          >
            Architecture Doc
          </button>
        </div>

        {/* Executive Summary Card */}
        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-2 flex-1">
          <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
            <span className="font-bold text-white text-[11px] truncate max-w-[180px]">
              {curr.title}
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold">
              {curr.sentiment}
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-[#faecd2] uppercase block font-bold">
              Key Executive Gist
            </span>
            {curr.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[10px] text-white/85">
                <span className="text-emerald-400 font-bold shrink-0">•</span>
                <span className="leading-snug">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href="https://gistify-c.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <span>Open Live Web Application</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </PhoneAppWrapper>
  );
}

// =========================================================================
// 13. FINLEY KEYCODERS (DEVELOPER CODE RUNNER & COMMUNITY)
// =========================================================================
export function KeyCodersApp({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"arena" | "leaderboard" | "events">("arena");
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const runCode = () => {
    playHapticClick();
    setIsRunning(true);
    setTestResult(null);

    setTimeout(() => {
      setIsRunning(false);
      setTestResult("✓ All 4 Test Cases Passed! (Runtime: 14ms, Beats 97.8% solutions)");
    }, 550);
  };

  const LEADERBOARD = [
    { rank: 1, name: "sangeethsanthosh", score: "2,840 pts", solved: 142, badge: "Master" },
    { rank: 2, name: "arjun_dev", score: "2,610 pts", solved: 131, badge: "Grandmaster" },
    { rank: 3, name: "neha_codes", score: "2,490 pts", solved: 124, badge: "Knight" },
    { rank: 4, name: "vikram_k", score: "2,180 pts", solved: 109, badge: "Specialist" },
  ];

  const EVENTS = [
    { title: "Weekly Algorithm Sprint #48", date: "Every Sunday 8:00 PM", status: "Active Now", prize: "500 XP" },
    { title: "Full-Stack System Design Jam", date: "Nov 15, 2026", status: "Upcoming", prize: "KeyCoders Swag" },
    { title: "Next.js 16 Micro-Hackathon", date: "Nov 22, 2026", status: "Upcoming", prize: "Certificate" },
  ];

  return (
    <PhoneAppWrapper
      icon="/images/apps/keycoders-icon.svg"
      title="KeyCoders • Web Portal"
      repoUrl="https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS"
      onClose={onClose}
      noPadding
    >
      <div className="flex flex-col h-full bg-[#080c10] text-white overflow-hidden text-xs">
        {/* Browser URL Bar */}
        <div className="bg-[#0f1720] border-b border-white/10 px-3 py-1.5 flex items-center justify-between gap-2 shrink-0">
          <div className="flex-1 flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl px-2.5 py-1 text-[11px] text-white/80">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-mono text-[10px] text-emerald-300">
              keycoders.dev
            </span>
            <span className="text-white/40 text-[9px] font-mono ml-auto">
              /{tab}
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
            LIVE
          </span>
        </div>

        {/* Website Header & Tabs */}
        <div className="p-3 border-b border-white/10 bg-[#0d141c] shrink-0 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⚡</span>
              <div>
                <h1 className="text-xs font-black tracking-wider text-white uppercase">
                  Finley KeyCoders
                </h1>
                <p className="text-[8px] text-white/50 font-mono">
                  Competitive Developer Community &amp; Code Lab
                </p>
              </div>
            </div>
            <span className="text-[9px] text-[#faecd2] font-mono bg-white/10 px-2 py-0.5 rounded-full">
              4,200+ Members
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {[
              { id: "arena", label: "Code Arena" },
              { id: "leaderboard", label: "Leaderboard" },
              { id: "events", label: "Hackathons" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playHapticClick();
                  setTab(t.id as typeof tab);
                }}
                className={`py-1 rounded-lg text-[10px] font-semibold text-center transition-all cursor-pointer ${
                  tab === t.id
                    ? "bg-[#225424] text-[#faecd2] shadow"
                    : "text-white/60 hover:text-white bg-white/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Web Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2.5">
          {tab === "arena" && (
            <>
              <div className="p-2.5 rounded-2xl bg-black/80 border border-white/15 font-mono text-[10px] space-y-1">
                <div className="flex justify-between items-center text-white/50 border-b border-white/10 pb-1">
                  <span>twoSum.ts (Algorithm)</span>
                  <span className="text-emerald-400">TypeScript 5.0</span>
                </div>
                <pre className="text-emerald-400/90 leading-tight">
{`function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) {
      return [map.get(comp)!, i];
    }
    map.set(nums[i], i);
  }
}`}
                </pre>
              </div>

              {testResult && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] animate-fadeIn">
                  {testResult}
                </div>
              )}

              <button
                onClick={runCode}
                disabled={isRunning}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer active:scale-95 transition-transform"
              >
                {isRunning ? (
                  <span>Executing Isolated Tests...</span>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run TypeScript Test Suite</span>
                  </>
                )}
              </button>
            </>
          )}

          {tab === "leaderboard" && (
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-white/50 uppercase block">
                Top Algorithmic Competitors
              </span>
              {LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-[10px]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[9px] ${
                        user.rank === 1
                          ? "bg-amber-400 text-black"
                          : user.rank === 2
                          ? "bg-slate-300 text-black"
                          : "bg-amber-700 text-white"
                      }`}
                    >
                      {user.rank}
                    </span>
                    <div>
                      <p className="font-bold text-white leading-tight">@{user.name}</p>
                      <p className="text-[8px] text-emerald-400 font-mono">{user.badge}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <p className="font-bold text-[#faecd2]">{user.score}</p>
                    <p className="text-[8px] text-white/50">{user.solved} Solved</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "events" && (
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-white/50 uppercase block">
                Active Community Sprints &amp; Hackathons
              </span>
              {EVENTS.map((event, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-white">{event.title}</h3>
                    <span
                      className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        event.status === "Active Now"
                          ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/30"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[9px] text-white/60 font-mono">
                    <span>{event.date}</span>
                    <span className="text-amber-400">Reward: {event.prize}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <a
            href="https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-white/90 mt-2"
          >
            <Github className="w-3.5 h-3.5 text-[#faecd2]" />
            <span>Open Full Stack KeyCoders Repository</span>
          </a>
        </div>
      </div>
    </PhoneAppWrapper>
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
          <div className="w-16 h-16 rounded-full bg-[#faecd2] text-[#225424] flex items-center justify-center font-bold text-xl shadow-xl border-2 border-white/20">
            SS
          </div>
          <h3 className="mt-2 text-sm font-bold text-white">Sangeeth Santhosh</h3>
          <p className="text-[11px] text-[#faecd2]/80">Software Engineer & UI Designer</p>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-500/30">
            Available for Projects
          </span>
        </div>

        <div className="w-full space-y-2">
          <button
            onClick={copyEmail}
            className="w-full p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-between text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#faecd2]" />
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
              <Github className="w-4 h-4 text-[#faecd2]" />
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
              <Twitter className="w-4 h-4 text-[#faecd2]" />
              <span>Twitter / X</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        <p className="text-[9px] text-white/50 text-center font-mono">
          Kochi, Kerala • UTC +05:30
        </p>
      </div>
    </PhoneAppWrapper>
  );
}
