"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Heart,
  Share2,
  X,
  Info,
  Smartphone,
  Layers,
  Sparkles,
  Play,
} from "lucide-react";
import PhoneLockScreen from "./phone/PhoneLockScreen";
import PhoneHomeScreen from "./phone/PhoneHomeScreen";
import {
  RewindApp,
  ChronicleApp,
  AuraApp,
  DayformApp,
  VaultApp,
  KeralaTourismApp,
  TrafficApp,
  EduSenseApp,
  BudgetApp,
  PcodApp,
  CartoonizerApp,
  GistifyApp,
  KeyCodersApp,
  ContactApp,
} from "./phone/PhoneApps";
import { playHapticClick, isAudioPlaying } from "./phone/phoneAudio";

export interface ProjectData {
  title: string;
  category: string;
  date: string;
  desc: string;
  tags: string[];
  github: string;
  live: string;
  img: string;
}

// Strictly ordered by newly pushed date on GitHub (sangeethsanthosh-git)
const PROJECTS: ProjectData[] = [
  {
    title: "Rewind",
    category: "FLUTTER / RETRO AUDIO",
    date: "Oct 2026",
    desc: "Retro portable cassette walkman & Hi-Fi local audio player for Android with tactile physics, animated spools, and physical cassette aesthetics.",
    tags: ["Flutter", "Dart", "Audio Player", "Retro UI", "Android"],
    github: "https://github.com/sangeethsanthosh-git/rewind",
    live: "https://github.com/sangeethsanthosh-git/rewind",
    img: "/images/rewind.png",
  },
  {
    title: "Chronicle Journal",
    category: "FLUTTER / ARTISANAL SCRAPBOOK",
    date: "Oct 2026",
    desc: "Artisanal offline-first Android journaling app inspired by physical notebooks, scrapbooks, polaroids, and archival typography.",
    tags: ["Flutter", "Dart", "Offline-First", "Journaling", "Android"],
    github: "https://github.com/sangeethsanthosh-git/chronicle-journal",
    live: "https://github.com/sangeethsanthosh-git/chronicle-journal",
    img: "/images/chronicle.png",
  },
  {
    title: "AURA AI",
    category: "PYTHON / AUTONOMOUS VOICE AI",
    date: "Sep 2026",
    desc: "Autonomous desktop voice companion for Windows featuring local Ollama LLM integration, speech synthesis, and real-time system automation.",
    tags: ["Python", "Ollama", "Local AI", "Desktop Assistant", "Speech"],
    github: "https://github.com/sangeethsanthosh-git/AURA",
    live: "https://github.com/sangeethsanthosh-git/AURA",
    img: "/images/aura.jpg",
  },
  {
    title: "Dayform",
    category: "FLUTTER / MINIMAL PLANNER",
    date: "Sep 2026",
    desc: "Serene, privacy-first personal calendar, habit tracker, reminder, and daily planner app built with Flutter and offline SQLite storage.",
    tags: ["Flutter", "Dart", "Calendar", "Productivity", "Android"],
    github: "https://github.com/sangeethsanthosh-git/dayform",
    live: "https://github.com/sangeethsanthosh-git/dayform",
    img: "/images/dayform.png",
  },
  {
    title: "File Integrity Vault",
    category: "SECURITY / CRYPTO SHA-256",
    date: "Jun 2026",
    desc: "Cryptographic SHA-256 file integrity monitoring system with real-time tampering detection, automated logging, and alert notifications.",
    tags: ["Python", "Cryptography", "Security", "SHA-256", "Integrity"],
    github: "https://github.com/sangeethsanthosh-git/file-integrity",
    live: "https://github.com/sangeethsanthosh-git/file-integrity",
    img: "/images/file-integrity.jpg",
  },
  {
    title: "Kerala Tourism Hub",
    category: "WEB / CULTURAL HERITAGE",
    date: "May 2026",
    desc: "Interactive cultural exploration platform showcasing Kerala destinations, festivals, and culinary heritage with responsive media galleries.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Tourism"],
    github: "https://github.com/sangeethsanthosh-git/kerala-tourism",
    live: "https://github.com/sangeethsanthosh-git/kerala-tourism",
    img: "/images/kerala-tourism.jpg",
  },
  {
    title: "Website Traffic Analyzer",
    category: "ANALYTICS / PYTHON & FLASK",
    date: "May 2026",
    desc: "Server traffic log parser and visitor session analytics engine with geo-IP lookup, referral clustering, and interactive trend charts.",
    tags: ["Python", "Flask", "Chart.js", "Log Parsing", "Analytics"],
    github: "https://github.com/sangeethsanthosh-git/website-traffic-analyzer",
    live: "https://github.com/sangeethsanthosh-git/website-traffic-analyzer",
    img: "/images/website-traffic-analyzer.jpg",
  },
  {
    title: "EduSense",
    category: "AI EDTECH / FLASK & NLP",
    date: "May 2026",
    desc: "Intelligent lecture assistant with automatic transcript summarization, keyword extraction, and contextual study flashcard generation.",
    tags: ["Flask", "Python", "NLP", "EdTech", "Summarization"],
    github: "https://github.com/sangeethsanthosh-git/Edusense",
    live: "https://github.com/sangeethsanthosh-git/Edusense",
    img: "/images/edusense.jpg",
  },
  {
    title: "AI Budget Planner",
    category: "FINTECH / FORECASTING AI",
    date: "May 2026",
    desc: "Personal financial assistant utilizing time-series forecasting, expense anomaly detection, and automated monthly budget allocations.",
    tags: ["Python", "Flask", "Machine Learning", "Forecasting", "FinTech"],
    github: "https://github.com/sangeethsanthosh-git/ai-budget-planner",
    live: "https://github.com/sangeethsanthosh-git/ai-budget-planner",
    img: "/images/ai-budget-planner.jpg",
  },
  {
    title: "PCOD Detection System",
    category: "HEALTHCARE ML / PYTHON",
    date: "Apr 2026",
    desc: "Clinical machine learning decision support tool with multi-variable biomarker evaluation and packaged cross-platform desktop UI.",
    tags: ["Python", "Scikit-learn", "Machine Learning", "Healthcare", "Tkinter"],
    github: "https://github.com/sangeethsanthosh-git/PCOD-Detection-System",
    live: "https://github.com/sangeethsanthosh-git/PCOD-Detection-System",
    img: "/images/pcod-detection.jpg",
  },
  {
    title: "Cartoonizer AI",
    category: "COMPUTER VISION / OPENCV",
    date: "Apr 2026",
    desc: "AI-powered image & video stylization using OpenCV bilateral filtering & edge quantization, running entirely on CPU without heavy GPU servers.",
    tags: ["Python", "OpenCV", "Django", "Computer Vision"],
    github: "https://github.com/sangeethsanthosh-git/Cartoonizer",
    live: "https://github.com/sangeethsanthosh-git/Cartoonizer",
    img: "/images/cartoon.jpg",
  },
  {
    title: "Gistify AI",
    category: "NEXT.JS / DOCUMENT INTELLIGENCE",
    date: "Nov 2025",
    desc: "Turns lengthy documents and research papers into clear summaries, extracted entities, and action plans with sub-second document Q&A.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "HuggingFace"],
    github: "https://github.com/sangeethsanthosh-git/Gistify",
    live: "https://gistify-c.vercel.app/",
    img: "/images/gistify.webp",
  },
  {
    title: "Finley KeyCoders",
    category: "COMMUNITY / FULL-STACK",
    date: "Nov 2025",
    desc: "Tech community portal with developer leaderboard, algorithmic challenges, member spotlights, and collaborative event management.",
    tags: ["React", "Node.js", "Express", "Tailwind CSS", "Community"],
    github: "https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS",
    live: "https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS",
    img: "/images/finley-keycoders.jpg",
  },
];

export default function Project(): React.ReactElement {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [phoneOS, setPhoneOS] = useState<"iphone" | "android">("iphone");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeModalIdx, setActiveModalIdx] = useState<number>(0);
  const [clockTime, setClockTime] = useState<string>("13:42");

  // Interactive Functioning Phone OS States
  const [phoneMode, setPhoneMode] = useState<"os" | "carousel">("os");
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [volumeLevel, setVolumeLevel] = useState<number>(75);
  const [showVolumeHUD, setShowVolumeHUD] = useState<boolean>(false);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleVolumeChange = (delta: number) => {
    playHapticClick();
    setVolumeLevel((prev) => Math.max(0, Math.min(100, prev + delta * 10)));
    setShowVolumeHUD(true);
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => setShowVolumeHUD(false), 1500);
  };

  const phoneTargetRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Live real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setClockTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3D Scroll Rotation & Landing Animation
  useEffect(() => {
    const handleScroll = () => {
      if (!phoneTargetRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startPoint = windowHeight * 1.1;
      const endPoint = windowHeight * 0.2;

      let progress = (startPoint - rect.top) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));

      const currentRotateY = (1 - progress) * -18;
      const currentRotateX = (1 - progress) * 14;
      const currentRotateZ = (1 - progress) * -4;
      const currentY = (1 - progress) * 110;

      const width = typeof window !== "undefined" ? window.innerWidth : 1200;
      const responsiveScale = width < 340 ? 0.78 : width < 380 ? 0.86 : width < 420 ? 0.92 : 1;
      const currentScale = (0.94 + progress * 0.06) * responsiveScale;

      phoneTargetRef.current.style.transform = `translateY(${currentY}px) scale(${currentScale}) rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg) rotateZ(${currentRotateZ}deg)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Slide navigation with haptic audio
  const nextSlide = useCallback(() => {
    playHapticClick();
    setCurrentSlide((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    playHapticClick();
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = useCallback((index: number) => {
    playHapticClick();
    setCurrentSlide(Math.max(0, Math.min(PROJECTS.length - 1, index)));
  }, []);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phoneMode !== "carousel") return;
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phoneMode, nextSlide, prevSlide]);

  // Real-time Touch Swipe & Drag Handling with immediate visual feedback
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);

  const handlePointerDown = (clientX: number) => {
    if (phoneMode !== "carousel") return;
    isPointerDown.current = true;
    dragStartX.current = clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isPointerDown.current || phoneMode !== "carousel") return;
    const diff = clientX - dragStartX.current;
    // Elastic resistance at the boundaries
    if ((currentSlide === 0 && diff > 0) || (currentSlide === PROJECTS.length - 1 && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handlePointerUp = () => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);

    if (dragOffset < -40 && currentSlide < PROJECTS.length - 1) {
      nextSlide();
    } else if (dragOffset > 40 && currentSlide > 0) {
      prevSlide();
    }
    setDragOffset(0);
  };

  // Window mouse move & up listeners while dragging
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onUp = () => handlePointerUp();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, dragOffset, currentSlide]);

  // Subtle interactive ASCII Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@", "{", "}", "<", ">", "/", "$", "0", "1"];
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const fontSize = 14;
    let time = 0;
    let mouse = { x: -1000, y: -1000, active: false };
    let animationId: number;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      cols = Math.floor(width / fontSize);
      rows = Math.floor(height / fontSize);
    };

    resize();
    window.addEventListener("resize", resize);

    const section = sectionRef.current;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    if (section) {
      section.addEventListener("mousemove", onMouseMove);
      section.addEventListener("mouseleave", onMouseLeave);
    }

    const renderAscii = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Space Mono", monospace`;
      time += 0.025;

      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const x = c * fontSize;
          const y = r * fontSize;

          const wave1 = Math.sin(c * 0.08 + time * 0.8) * Math.cos(r * 0.08 + time * 0.6);
          const wave2 = Math.sin((c + r) * 0.05 - time * 0.5);
          const val = (wave1 + wave2 + 2) / 4;

          const charIndex = Math.floor(val * (chars.length - 1));
          const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))];

          if (char !== " ") {
            if (val > 0.65) {
              ctx.fillStyle = `rgba(250, 236, 210, ${val * 0.25})`;
            } else if (val > 0.4) {
              ctx.fillStyle = `rgba(74, 160, 95, ${val * 0.18})`;
            } else {
              ctx.fillStyle = `rgba(34, 84, 36, ${val * 0.14})`;
            }
            ctx.fillText(char, x, y);
          }
        }
      }
      animationId = requestAnimationFrame(renderAscii);
    };

    renderAscii();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (section) {
        section.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  const openModal = (idx: number) => {
    setActiveModalIdx(idx);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "Sangeeth Santhosh - Projects",
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const activeProject = PROJECTS[currentSlide];
  const modalProject = PROJECTS[activeModalIdx];

  const formatStoryHeadline = (title: string) => {
    const words = title.replace(/[-_]/g, " ").toUpperCase().split(/\s+/).filter(Boolean);
    if (words.length >= 4) return words.slice(0, 4);
    if (words.length === 3) return [words[0], words[1], words[2], "PROJECT"];
    if (words.length === 2) return [words[0], words[1], "DIGITAL", "BUILD"];
    return [words[0] ?? "GITHUB", "PROJECT", "DIGITAL", "BUILD"];
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=Plus+Jakarta+Sans:wght@800;900&family=Space+Mono:wght@400;700&display=swap");

        /* 3D Perspective Stage */
        .phone-perspective-stage {
          perspective: 1600px;
          perspective-origin: 50% 50%;
        }

        @media (max-width: 380px) {
          .phone-perspective-stage {
            margin-bottom: -55px;
          }
        }
        @media (max-width: 340px) {
          .phone-perspective-stage {
            margin-bottom: -95px;
          }
        }

        .phone-3d-wrapper {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
          transition: transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1);
        }

        /* Flagship Precision-Milled Hardware Frame */
        .phone-realistic-chassis {
          position: relative;
          width: 326px;
          height: 664px;
          background: #090a0d;
          border-radius: 54px;
          user-select: none;
          transform-style: preserve-3d;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 3.5px;
          /* Aerospace grade Titanium bevel with realistic rim reflections */
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.22),
            0 0 0 2.5px #272a31,
            0 0 0 4.5px #121418,
            0 0 0 6px #08090b,
            -28px 40px 75px -10px rgba(0, 0, 0, 0.9),
            -14px 18px 30px -5px rgba(0, 0, 0, 0.65),
            inset 0 0 0 1.5px rgba(255, 255, 255, 0.12);
        }

        @media (min-width: 768px) {
          .phone-realistic-chassis {
            width: 350px;
            height: 708px;
          }
        }

        /* Android Flagship Variant (Galaxy S24 Ultra Sharp Angular Bezel) */
        .phone-realistic-chassis.is-android {
          border-radius: 22px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.18),
            0 0 0 2.5px #23252c,
            0 0 0 4px #0d0f13,
            -22px 35px 65px -10px rgba(0, 0, 0, 0.85),
            -10px 15px 25px -5px rgba(0, 0, 0, 0.6);
        }

        /* Antenna Band Lines */
        .antenna-band {
          position: absolute;
          width: 3.5px;
          height: 1.5px;
          background: #191b20;
          z-index: 10;
        }
        .antenna-tl { top: 72px; left: -4.5px; }
        .antenna-bl { bottom: 72px; left: -4.5px; }
        .antenna-tr { top: 72px; right: -4.5px; }
        .antenna-br { bottom: 72px; right: -4.5px; }

        /* Physical Metal Side Buttons */
        .phone-btn-left-action,
        .phone-btn-left-volup,
        .phone-btn-left-voldown {
          position: absolute;
          left: -8px;
          background: linear-gradient(180deg, #424754 0%, #20232a 100%);
          border-radius: 3px 0 0 3px;
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          transition: opacity 0.3s;
        }
        .phone-btn-left-action { top: 125px; width: 4.5px; height: 30px; }
        .phone-btn-left-volup { top: 175px; width: 4.5px; height: 50px; }
        .phone-btn-left-voldown { top: 236px; width: 4.5px; height: 50px; }

        .phone-realistic-chassis.is-android .phone-btn-left-action,
        .phone-realistic-chassis.is-android .phone-btn-left-volup,
        .phone-realistic-chassis.is-android .phone-btn-left-voldown {
          opacity: 0;
          pointer-events: none;
        }

        .phone-btn-right-power,
        .phone-btn-right-androidvol {
          position: absolute;
          right: -8px;
          background: linear-gradient(180deg, #424754 0%, #20232a 100%);
          border-radius: 0 3px 3px 0;
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          transition: opacity 0.3s;
        }
        .phone-btn-right-power { top: 180px; width: 4.5px; height: 68px; }
        .phone-btn-right-androidvol { top: 260px; width: 4.5px; height: 75px; opacity: 0; }

        .phone-realistic-chassis.is-android .phone-btn-right-power {
          top: 190px;
          height: 48px;
        }
        .phone-realistic-chassis.is-android .phone-btn-right-androidvol {
          opacity: 1;
        }

        /* Top Acoustic Speaker Grill */
        .phone-earpiece-grill {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 46px;
          height: 3px;
          background: #0d0f13;
          border-radius: 2px;
          z-index: 60;
          box-shadow: inset 0 1px 1.5px rgba(0, 0, 0, 0.9);
        }

        /* Realistic Dynamic Island (Pill with optical camera reflection) */
        .phone-dynamic-island-shell {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 104px;
          height: 27px;
          background: #000000;
          border-radius: 20px;
          z-index: 55;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 9px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Optical Camera with Sapphire Glare */
        .phone-camera-aperture {
          width: 11px;
          height: 11px;
          background: radial-gradient(circle at 35% 35%, #183350 20%, #070e18 65%, #000 100%);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }
        .phone-camera-aperture::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2.5px;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          filter: blur(0.3px);
        }

        .phone-sensor-aperture {
          width: 7px;
          height: 7px;
          background: #090b10;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .phone-privacy-dot {
          width: 4px;
          height: 4px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 6px #10b981;
        }

        /* Android Centered Punch Hole */
        .phone-realistic-chassis.is-android .phone-dynamic-island-shell {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          top: 12px;
          padding: 0;
          justify-content: center;
        }
        .phone-realistic-chassis.is-android .phone-sensor-aperture,
        .phone-realistic-chassis.is-android .phone-privacy-dot {
          display: none;
        }

        /* Ceramic Shield Glass Reflection */
        .phone-glass-specular-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            130deg,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0.04) 28%,
            transparent 48%,
            rgba(255, 255, 255, 0.03) 72%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 45;
          border-radius: inherit;
        }

        /* Inner OLED Screen Container */
        .phone-screen-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50px;
          overflow: hidden;
          background: #000;
          display: flex;
          flex-direction: column;
        }

        .phone-realistic-chassis.is-android .phone-screen-inner {
          border-radius: 32px;
        }

        .phone-slides-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: grab;
          touch-action: pan-y;
        }
        .phone-slides-track:active {
          cursor: grabbing;
        }

        .phone-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          user-select: none;
          padding: 56px 20px 76px;
        }

        .heirloom-script {
          font-family: "Playfair Display", Georgia, serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .heirloom-headline {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 0.96;
          text-transform: uppercase;
        }

        .heirloom-mono-tag {
          font-family: "Space Mono", monospace;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-size: 10px;
        }

        .cloud-puff {
          position: absolute;
          background: radial-gradient(circle, rgba(230, 210, 240, 0.35) 0%, rgba(200, 190, 230, 0.15) 50%, transparent 75%);
          filter: blur(24px);
          border-radius: 50%;
          pointer-events: none;
          z-index: 30;
          animation: cloudDrift 8s ease-in-out infinite alternate;
        }
        @keyframes cloudDrift {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-12px) scale(1.08); }
        }

        .os-toggle-btn {
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.2s;
        }
        .os-toggle-btn.active {
          color: #faecd2;
        }
        .os-toggle-btn.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2.5px;
          background: #225424;
          border-radius: 2px;
        }
      `}</style>

      {/* =========================================================================
          PROJECT SECTION: ULTRA-REALISTIC FLAGSHIP PHONE SHOWCASING 13 REPOSITORIES
          ========================================================================= */}
      <section
        id="project"
        ref={sectionRef}
        className="relative pt-8 pb-28 sm:pt-12 sm:pb-36 text-white border-b border-white/10 overflow-hidden z-20 bg-gradient-to-b from-[#0a110d] via-[#121814] to-[#0d0f14]"
      >
        {/* Animated ASCII Canvas Layer */}
        <canvas
          ref={canvasRef}
          id="ascii-bg-canvas"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-55"
        />

        {/* Ambient Studio Lighting Mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#225424]/25 via-[#1b4329]/15 to-[#faecd2]/10 rounded-full blur-[190px]" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#faecd2]/10 rounded-full blur-[160px]" />
          <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-[#225424]/20 rounded-full blur-[180px]" />
        </div>

        {/* Drifting Clouds */}
        <div className="cloud-puff w-72 h-36 top-12 left-1/5 opacity-60" />
        <div className="cloud-puff w-80 h-40 top-1/2 right-1/6 opacity-70" style={{ animationDelay: "-3.5s" }} />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[#faecd2]/80 sm:text-sm sm:tracking-[0.35em] font-medium">
              Projects
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight text-[#f9f5ed]">
              Featured Works
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60">
              Ordered by newly pushed repositories • {PROJECTS.length} active builds
            </p>
          </div>

          {/* 3D PERSPECTIVE STAGE FOR REALISTIC PHONE */}
          <div className="phone-perspective-stage w-full flex items-center justify-center relative">
            {/* Carousel Left Navigation Arrow (Active in Project Gallery mode) */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`${
                phoneMode === "carousel" ? "hidden sm:flex" : "hidden"
              } absolute left-2 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/70 backdrop-blur-md items-center justify-center text-white transition-all z-40 cursor-pointer shadow-xl ${
                currentSlide === 0
                  ? "opacity-20 cursor-not-allowed pointer-events-none"
                  : "hover:bg-white/25 hover:scale-105 active:scale-95"
              }`}
              title="Previous Project (Left Arrow)"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Carousel Right Navigation Arrow (Active in Project Gallery mode) */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === PROJECTS.length - 1}
              className={`${
                phoneMode === "carousel" ? "hidden sm:flex" : "hidden"
              } absolute right-2 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/70 backdrop-blur-md items-center justify-center text-white transition-all z-40 cursor-pointer shadow-xl ${
                currentSlide === PROJECTS.length - 1
                  ? "opacity-20 cursor-not-allowed pointer-events-none"
                  : "hover:bg-white/25 hover:scale-105 active:scale-95"
              }`}
              title="Next Project (Right Arrow)"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* PHONE 3D CONTAINER (Clear headroom, no overlapping!) */}
            <div
              id="phone-3d-target"
              ref={phoneTargetRef}
              className="phone-3d-wrapper mt-3 sm:mt-5 flex flex-col items-center"
            >
              <div
                id="phone-device"
                className={`phone-realistic-chassis ${phoneOS === "android" ? "is-android" : ""}`}
              >
                {/* Antenna Bands */}
                <div className="antenna-band antenna-tl" />
                <div className="antenna-band antenna-bl" />
                <div className="antenna-band antenna-tr" />
                <div className="antenna-band antenna-br" />

                {/* Left Physical Buttons (Action + Volume Up + Volume Down) */}
                <div
                  className="phone-btn-left-action cursor-pointer"
                  title="Action Button: Launch AURA AI"
                  onClick={() => {
                    playHapticClick();
                    setIsLocked(false);
                    setPhoneMode("os");
                    setActiveApp("aura");
                  }}
                />
                <div
                  className="phone-btn-left-volup cursor-pointer"
                  title="Volume Up"
                  onClick={() => handleVolumeChange(1)}
                />
                <div
                  className="phone-btn-left-voldown cursor-pointer"
                  title="Volume Down"
                  onClick={() => handleVolumeChange(-1)}
                />

                {/* Right Physical Buttons (Side Lock / Android Buttons) */}
                <div
                  className="phone-btn-right-power cursor-pointer"
                  title="Power: Lock/Wake Screen"
                  onClick={() => {
                    playHapticClick();
                    setIsLocked((prev) => !prev);
                  }}
                />
                <div
                  className="phone-btn-right-androidvol cursor-pointer"
                  title="Volume Toggle"
                  onClick={() => handleVolumeChange(1)}
                />

                {/* Top Acoustic Ear Speaker Grill */}
                <div className="phone-earpiece-grill" />

                {/* Dynamic Island Notch (iPhone) / Punch Hole (Android) */}
                <div
                  className="phone-dynamic-island-shell cursor-pointer"
                  title="Dynamic Island: Tap to inspect running app"
                  onClick={() => {
                    playHapticClick();
                    if (phoneMode !== "os") setPhoneMode("os");
                    if (isAudioPlaying()) {
                      setActiveApp("rewind");
                    } else if (activeApp) {
                      setActiveApp(null);
                    }
                  }}
                >
                  <div className="phone-camera-aperture" />
                  {isAudioPlaying() ? (
                    <div className="flex items-center gap-0.5 px-1 animate-pulse">
                      <div className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce" />
                      <div className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    <div className="phone-privacy-dot" />
                  )}
                  <div className="phone-sensor-aperture" />
                </div>

                {/* Ceramic Shield Glass Reflection (Curved specular glare) */}
                <div className="phone-glass-specular-glare" />

                {/* INNER OLED SCREEN */}
                <div className="phone-screen-inner relative">
                  {/* Top Status Bar: Apple iOS 18 vs Samsung Galaxy One UI */}
                  {phoneOS === "iphone" ? (
                    <div className="absolute top-2 inset-x-6 flex justify-between items-center text-[12px] font-semibold text-white/95 z-40 pointer-events-none drop-shadow">
                      <span id="phone-live-clock">{clockTime}</span>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <rect x="2" y="16" width="3" height="6" rx="1" />
                          <rect x="7" y="12" width="3" height="10" rx="1" />
                          <rect x="12" y="8" width="3" height="14" rx="1" />
                          <rect x="17" y="4" width="3" height="18" rx="1" />
                        </svg>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                        </svg>
                        <div className="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] flex items-center relative">
                          <div className="w-[85%] h-full bg-emerald-400 rounded-[1px]" />
                          <div className="absolute -right-1 top-0.5 w-[2px] h-1.5 bg-white/80 rounded-r-[1px]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-2 inset-x-4 flex justify-between items-center text-[11px] font-sans text-white/95 z-40 pointer-events-none drop-shadow">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{clockTime}</span>
                        <span className="text-[9px] text-[#faecd2] font-mono">✦</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold tracking-tight px-1 rounded bg-white/20">
                          5G
                        </span>
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                        </svg>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold">88%</span>
                          <div className="w-4 h-2.5 border border-white/90 rounded-[2px] p-[1px] flex items-center">
                            <div className="w-[88%] h-full bg-emerald-400 rounded-[1px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Volume HUD popup when volume buttons are clicked */}
                  {showVolumeHUD && (
                    <div className="absolute left-2.5 top-24 z-50 w-1.5 h-24 bg-black/70 backdrop-blur-md rounded-full p-[1px] flex flex-col justify-end border border-white/20 shadow-lg">
                      <div
                        className="w-full bg-white rounded-full transition-all duration-150"
                        style={{ height: `${volumeLevel}%` }}
                      />
                    </div>
                  )}

                  {/* 1. LOCK SCREEN MODE */}
                  {isLocked ? (
                    <PhoneLockScreen
                      time={clockTime}
                      onUnlock={() => {
                        playHapticClick();
                        setIsLocked(false);
                      }}
                      phoneOS={phoneOS}
                    />
                  ) : phoneMode === "os" ? (
                    /* 2. INTERACTIVE FUNCTIONING PHONE OS */
                    <>
                      {activeApp === "rewind" ? (
                        <RewindApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "chronicle" ? (
                        <ChronicleApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "aura" ? (
                        <AuraApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "dayform" ? (
                        <DayformApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "vault" ? (
                        <VaultApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "kerala" ? (
                        <KeralaTourismApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "traffic" ? (
                        <TrafficApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "edusense" ? (
                        <EduSenseApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "budget" ? (
                        <BudgetApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "pcod" ? (
                        <PcodApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "cartoon" ? (
                        <CartoonizerApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "gistify" ? (
                        <GistifyApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "keycoders" ? (
                        <KeyCodersApp onClose={() => setActiveApp(null)} />
                      ) : activeApp === "contact" ? (
                        <ContactApp onClose={() => setActiveApp(null)} />
                      ) : (
                        <PhoneHomeScreen
                          phoneOS={phoneOS}
                          onOpenApp={(appId) => setActiveApp(appId)}
                          onOpenCarousel={() => setPhoneMode("carousel")}
                        />
                      )}
                    </>
                  ) : (
                    /* 3. SHOWCASE CAROUSEL MODE */
                    <>
                      {/* Story Progress Indicator Bars (Clickable jumping!) */}
                      <div className="absolute top-10 inset-x-4 flex items-center gap-1 z-40">
                        {PROJECTS.map((_, pIdx) => (
                          <button
                            key={`dash-${pIdx}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToSlide(pIdx);
                            }}
                            className="h-3 -my-1 flex-1 flex items-center group cursor-pointer"
                            title={`Jump to ${PROJECTS[pIdx].title}`}
                            aria-label={`Jump to slide ${pIdx + 1}`}
                          >
                            <div className="h-[2px] w-full rounded-full overflow-hidden bg-white/20 group-hover:bg-white/40 transition-colors">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  pIdx === currentSlide
                                    ? "bg-[#faecd2] w-full"
                                    : pIdx < currentSlide
                                    ? "bg-white/80 w-full"
                                    : "w-0"
                                }`}
                              />
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Story Header (Avatar + Handle + Date Pill) */}
                      <div className="absolute top-13 inset-x-4 flex items-center justify-between z-40 pointer-events-none drop-shadow">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#faecd2] text-[#225424] flex items-center justify-center font-bold text-[9px] shadow-sm">
                            SS
                          </div>
                          <span className="text-[11px] font-medium text-white/95 lowercase tracking-wide">
                            sangeeth_dev
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-black/40 backdrop-blur-xs text-[#faecd2] border border-white/10">
                            {activeProject.date}
                          </span>
                          <span className="text-[10px] font-mono text-white/70">
                            {currentSlide + 1}/{PROJECTS.length}
                          </span>
                        </div>
                      </div>

                      {/* Tap Navigation Zones (Instagram Stories Tap Left/Right to advance) */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (Math.abs(dragOffset) < 10) prevSlide();
                        }}
                        className="absolute left-0 top-16 bottom-24 w-[35%] z-30 cursor-w-resize"
                        title="Previous Project (Tap left)"
                      />

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (Math.abs(dragOffset) < 10) nextSlide();
                        }}
                        className="absolute right-0 top-16 bottom-24 w-[35%] z-30 cursor-e-resize"
                        title="Next Project (Tap right)"
                      />

                      {/* ================= SLIDABLE TRACK OF PROJECTS ================= */}
                      <div
                        id="phone-slides"
                        ref={trackRef}
                        className="phone-slides-track"
                        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
                        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
                        onTouchEnd={handlePointerUp}
                        onMouseDown={(e) => handlePointerDown(e.clientX)}
                        style={{
                          transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
                          transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                          cursor: isDragging ? "grabbing" : "grab",
                        }}
                      >
                        {PROJECTS.map((project, index) => {
                          const headline = formatStoryHeadline(project.title);
                          return (
                            <div key={project.title} className="phone-slide text-[#faecd2]">
                              {/* Background Project Image */}
                              <div className="absolute inset-0">
                                <Image
                                  src={project.img}
                                  alt={project.title}
                                  fill
                                  sizes="350px"
                                  priority={index < 2}
                                  className="object-cover brightness-75 contrast-105 pointer-events-none select-none"
                                />
                                {/* Realistic Vignette Gradient for Text Contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/55 pointer-events-none" />
                              </div>

                              <div className="relative z-20 pt-6 text-center pointer-events-none">
                                <span className="heirloom-script text-2xl text-[#faecd2] drop-shadow-md">
                                  Sangeeth
                                </span>
                              </div>

                              <div className="relative z-20 my-auto text-center px-2 pointer-events-none">
                                <h3 className="heirloom-headline text-[2.1rem] leading-[0.94] text-[#faecd2] drop-shadow-lg">
                                  {headline.map((line, lineIndex) => (
                                    <React.Fragment key={`${project.title}-${line}-${lineIndex}`}>
                                      {line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                                </h3>
                              </div>

                              <div className="relative z-40 text-center pb-1 space-y-1.5 flex flex-col items-center">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openModal(index);
                                    }}
                                    type="button"
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#faecd2]/40 text-[#faecd2] text-[10px] font-mono font-bold tracking-wider hover:bg-[#faecd2]/20 transition-all shadow-sm cursor-pointer"
                                  >
                                    <Info className="w-3 h-3" />
                                    <span>Description</span>
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playHapticClick();
                                      setPhoneMode("os");
                                      const mappedApp =
                                        project.title === "Rewind"
                                          ? "rewind"
                                          : project.title === "Chronicle Journal"
                                          ? "chronicle"
                                          : project.title === "AURA AI"
                                          ? "aura"
                                          : project.title === "Dayform"
                                          ? "dayform"
                                          : project.title === "File Integrity Vault"
                                          ? "vault"
                                          : project.title === "Kerala Tourism Hub"
                                          ? "kerala"
                                          : project.title === "Website Traffic Analyzer"
                                          ? "traffic"
                                          : project.title === "EduSense"
                                          ? "edusense"
                                          : project.title === "AI Budget Planner"
                                          ? "budget"
                                          : project.title === "PCOD Detection System"
                                          ? "pcod"
                                          : project.title === "Cartoonizer AI"
                                          ? "cartoon"
                                          : project.title === "Gistify AI"
                                          ? "gistify"
                                          : project.title === "Finley KeyCoders"
                                          ? "keycoders"
                                          : "rewind";
                                      setActiveApp(mappedApp);
                                    }}
                                    type="button"
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold tracking-wider hover:bg-emerald-400 transition-all shadow-md cursor-pointer"
                                  >
                                    <Play className="w-3 h-3 fill-current" />
                                    <span>Try in Phone</span>
                                  </button>
                                </div>

                                <span className="heirloom-mono-tag text-[#faecd2]/90 block">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* ================= INTERACTIVE EDITORIAL DESCRIPTION SHEET ================= */}
                      <div
                        id="phone-desc-modal"
                        className={`absolute inset-0 bg-black/90 backdrop-blur-md z-50 p-6 flex flex-col justify-between transition-all duration-300 transform ${
                          modalOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-6 pointer-events-none"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-white/15 pb-3">
                            <div>
                              <span
                                id="modal-category"
                                className="text-[9px] font-mono font-bold uppercase text-[#faecd2]/70 tracking-widest block"
                              >
                                {modalProject.category}
                              </span>
                              <h4 id="modal-title" className="text-xl font-bold text-[#faecd2] mt-0.5">
                                {modalProject.title}
                              </h4>
                            </div>
                            <button
                              onClick={closeModal}
                              type="button"
                              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors cursor-pointer"
                              aria-label="Close"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-4 space-y-3 text-left">
                            <p id="modal-desc" className="text-xs text-white/85 leading-relaxed">
                              {modalProject.desc}
                            </p>

                            <div className="pt-2 border-t border-white/10">
                              <span className="text-[10px] font-mono font-bold text-[#faecd2] uppercase tracking-wider block mb-2">
                                Core Technologies
                              </span>
                              <div id="modal-tags" className="flex flex-wrap gap-1.5">
                                {modalProject.tags.map((tag, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Launch Buttons */}
                        <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-2">
                          <a
                            id="modal-github-link"
                            href={modalProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-full border border-white/30 bg-white/10 text-center text-xs font-bold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub ↗</span>
                          </a>
                          <a
                            id="modal-live-link"
                            href={modalProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-full border border-[#faecd2]/60 bg-[#faecd2]/20 text-center text-xs font-bold text-[#faecd2] hover:bg-[#faecd2]/30 transition-all flex items-center justify-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo ↗</span>
                          </a>
                        </div>
                      </div>

                      {/* ================= BOTTOM ACTION BAR: GITHUB & LIVE + HEART & SHARE ================= */}
                      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 flex items-center justify-between z-40">
                        <div className="flex-1 mr-2 flex items-center gap-1.5">
                          <a
                            id="phone-github-btn"
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-8 rounded-full border border-white/30 bg-black/60 backdrop-blur-md px-2 flex items-center justify-center gap-1 text-[11px] font-bold text-white shadow-sm hover:bg-white/20 transition-all"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub ↗</span>
                          </a>

                          <a
                            id="phone-live-btn"
                            href={activeProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-8 rounded-full border border-[#faecd2]/60 bg-[#faecd2]/25 backdrop-blur-md px-2 flex items-center justify-center gap-1 text-[11px] font-bold text-[#faecd2] shadow-sm hover:bg-[#faecd2]/40 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live ↗</span>
                          </a>
                        </div>

                        {/* Heart & Share Buttons */}
                        <div className="flex items-center gap-2 text-white/90">
                          <button
                            onClick={() => setIsLiked(!isLiked)}
                            type="button"
                            className="p-1 hover:text-rose-400 transition-colors cursor-pointer"
                            aria-label="Like"
                          >
                            <Heart
                              className={`w-5 h-5 transition-colors ${
                                isLiked ? "fill-rose-500 text-rose-500" : "text-white/80"
                              }`}
                            />
                          </button>
                          <button
                            onClick={handleShare}
                            type="button"
                            className="p-1 hover:text-[#faecd2] transition-colors cursor-pointer text-white/80"
                            aria-label="Share"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Bottom Navigation: Apple Home Gesture Bar vs Samsung 3-Button Nav */}
                  {phoneOS === "iphone" ? (
                    <button
                      onClick={() => {
                        playHapticClick();
                        if (activeApp) {
                          setActiveApp(null);
                        } else if (phoneMode === "carousel") {
                          setPhoneMode("os");
                        }
                      }}
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-3.5 flex items-center justify-center z-50 cursor-pointer group"
                      title="Home Bar: Tap to minimize app or go to Home Screen"
                      aria-label="Home Bar"
                    >
                      <div className="w-28 h-1 bg-white/70 group-hover:bg-white rounded-full transition-colors shadow-sm" />
                    </button>
                  ) : (
                    /* Samsung 3-Button Navigation Bar */
                    <div className="absolute bottom-0 inset-x-0 h-8 bg-black/85 backdrop-blur-md border-t border-white/10 z-50 flex items-center justify-around px-8 text-white/70">
                      <button
                        onClick={() => {
                          playHapticClick();
                          setPhoneMode("carousel");
                        }}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        title="Recents: Open Gallery"
                        aria-label="Recent Apps"
                      >
                        <div className="flex gap-1 items-center">
                          <div className="w-[2px] h-3.5 bg-current rounded-full" />
                          <div className="w-[2px] h-3.5 bg-current rounded-full" />
                          <div className="w-[2px] h-3.5 bg-current rounded-full" />
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          playHapticClick();
                          if (activeApp) setActiveApp(null);
                          if (phoneMode === "carousel") setPhoneMode("os");
                        }}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        title="Home: Go to Home Screen"
                        aria-label="Home"
                      >
                        <div className="w-3.5 h-3.5 border-2 border-current rounded-[3px]" />
                      </button>

                      <button
                        onClick={() => {
                          playHapticClick();
                          if (activeApp) {
                            setActiveApp(null);
                          } else if (phoneMode === "carousel") {
                            setPhoneMode("os");
                          }
                        }}
                        className="p-1 hover:text-white transition-colors cursor-pointer text-base font-bold leading-none"
                        title="Back"
                        aria-label="Back"
                      >
                        ‹
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* iPhone / Android OS Switcher */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-2 text-center">
            <button
              id="btn-os-iphone"
              type="button"
              className={`os-toggle-btn text-xs sm:text-sm ${phoneOS === "iphone" ? "active" : "text-white/40"}`}
              onClick={() => {
                playHapticClick();
                setPhoneOS("iphone");
              }}
            >
              iPhone 16 Pro (iOS 18)
            </button>
            <button
              id="btn-os-android"
              type="button"
              className={`os-toggle-btn text-xs sm:text-sm ${phoneOS === "android" ? "active" : "text-white/40"}`}
              onClick={() => {
                playHapticClick();
                setPhoneOS("android");
              }}
            >
              Galaxy S24 Ultra (One UI)
            </button>
          </div>

          {/* Swipe / Navigation Guidance & Interactive Controls */}
          <div className="mt-3.5 flex flex-col items-center gap-2 max-w-full px-2">
            {phoneMode === "carousel" ? (
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3.5">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono border border-white/10 text-white"
                  title="Previous Project (Left Arrow)"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md max-w-[210px] xs:max-w-none">
                  <span className="text-[11px] sm:text-xs font-mono text-[#faecd2] font-bold shrink-0">
                    {String(currentSlide + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-white/40 shrink-0">•</span>
                  <span className="text-[11px] sm:text-xs font-medium text-white/90 truncate max-w-[100px] xs:max-w-[140px] sm:max-w-[200px]">
                    {PROJECTS[currentSlide].title}
                  </span>
                </div>

                <button
                  onClick={nextSlide}
                  disabled={currentSlide === PROJECTS.length - 1}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono border border-white/10 text-white"
                  title="Next Project (Right Arrow)"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-[11px] sm:text-xs text-white/50 font-mono text-center">
                Tap any app to interact • Use phone home bar or back button to exit
              </p>
            )}
          </div>

          {/* Mode Switcher Pill (Placed cleanly below swipe tip, 100% visible with zero clipping) */}
          <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center justify-center p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl max-w-full">
            <button
              onClick={() => {
                playHapticClick();
                setPhoneMode("os");
              }}
              className={`py-1.5 px-3 sm:py-2 sm:px-5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                phoneMode === "os"
                  ? "bg-[#faecd2] text-[#225424] shadow-md scale-102"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Interactive Phone OS</span>
            </button>
            <button
              onClick={() => {
                playHapticClick();
                setPhoneMode("carousel");
              }}
              className={`py-1.5 px-3 sm:py-2 sm:px-5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                phoneMode === "carousel"
                  ? "bg-[#faecd2] text-[#225424] shadow-md scale-102"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Project Gallery ({PROJECTS.length})</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
