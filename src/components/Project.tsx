"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Project(): React.ReactElement {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [phoneOS, setPhoneOS] = useState<"iphone" | "android">("iphone");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeModalIdx, setActiveModalIdx] = useState<number>(0);
  const [clockTime, setClockTime] = useState<string>("22:40");

  const phoneTargetRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      title: "Cartoonizer AI",
      category: "AI / COMPUTER VISION",
      desc: "AI-powered image & video stylization using OpenCV bilateral filtering & edge quantization, running entirely on CPU without heavy GPU servers.",
      tags: ["Python", "OpenCV", "Tkinter", "Bilateral Filter"],
      github: "https://github.com/sangeethsanthosh-git/Cartoonizer",
      live: "https://github.com/sangeethsanthosh-git/Cartoonizer",
      img: "/images/cartoon.jpg"
    },
    {
      title: "Gistify AI",
      category: "NEXT.JS / DOCUMENT INTELLIGENCE",
      desc: "Turns lengthy documents and research papers into clear summaries, extracted entities, and action plans with sub-second conversational document Q&A.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API"],
      github: "https://github.com/sangeethsanthosh-git",
      live: "https://gistify-c.vercel.app/",
      img: "/images/gistify.webp"
    },
    {
      title: "AeroSense",
      category: "DJANGO / METEOROLOGY",
      desc: "Predictive weather tracking, live meteorological visualizations, and real-time Air Quality Index (AQI) alerts powered by OpenWeather APIs.",
      tags: ["Django", "Python", "OpenWeather", "REST APIs"],
      github: "https://github.com/sangeethsanthosh-git/AEROSENSE",
      live: "https://github.com/sangeethsanthosh-git/AEROSENSE",
      img: "/images/aerosense.webp"
    },
    {
      title: "EchoNotes",
      category: "WEB AUDIO / SPEECH RECOGNITION",
      desc: "Seamless speech-to-text note capture engine designed with web audio processing for rapid thought recording and effortless transcriptions.",
      tags: ["Web Audio API", "JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/sangeethsanthosh-git",
      live: "https://github.com/sangeethsanthosh-git",
      img: "/images/echonotes.webp"
    },
    {
      title: "VidScoop",
      category: "PYTHON / MEDIA UTILITY",
      desc: "Lightweight YouTube stream extractor and multi-format batch media conversion tool built for fast audio/video extractions.",
      tags: ["Python", "Flask", "Stream Engine", "PyTube"],
      github: "https://github.com/sangeethsanthosh-git",
      live: "https://github.com/sangeethsanthosh-git",
      img: "/images/youtube.webp"
    },
    {
      title: "Portfolio V1",
      category: "REACT / MOTION DESIGN",
      desc: "Personal developer and designer portfolio crafted with Next.js, Tailwind CSS, and fluid motion systems showcasing interactive digital experiences.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      github: "https://github.com/sangeethsanthosh-git/sangeethsanthosh-git.github.io",
      live: "https://sangeethsanthosh-git.github.io/",
      img: "/images/portfolio.webp"
    },
    {
      title: "Profile README",
      category: "GITHUB / PROFILE",
      desc: "GitHub profile repository for presenting developer identity, links, and project highlights directly on the profile page.",
      tags: ["GitHub", "Markdown", "Profile"],
      github: "https://github.com/sangeethsanthosh-git/sangeethsanthosh-git",
      live: "https://github.com/sangeethsanthosh-git/sangeethsanthosh-git",
      img: "/images/profile-readme.jpg"
    },
    {
      title: "Demo",
      category: "GITHUB / PRACTICE",
      desc: "A trial repository used for GitHub workflow practice, version control experiments, and repository setup learning.",
      tags: ["GitHub", "Version Control", "Practice"],
      github: "https://github.com/sangeethsanthosh-git/demo",
      live: "https://github.com/sangeethsanthosh-git/demo",
      img: "/images/portfolio.webp"
    },
    {
      title: "File Integrity",
      category: "SECURITY / WEB UTILITY",
      desc: "A file integrity focused project for checking content consistency and exploring browser-based security utility workflows.",
      tags: ["CSS", "Security", "Integrity"],
      github: "https://github.com/sangeethsanthosh-git/file-integrity",
      live: "https://github.com/sangeethsanthosh-git/file-integrity",
      img: "/images/file-integrity.jpg"
    },
    {
      title: "Kerala Tourism",
      category: "HTML / TOURISM WEBSITE",
      desc: "A tourism website concept showcasing Kerala through structured pages, visual content, and simple frontend presentation.",
      tags: ["HTML", "CSS", "Tourism"],
      github: "https://github.com/sangeethsanthosh-git/kerala-tourism",
      live: "https://github.com/sangeethsanthosh-git/kerala-tourism",
      img: "/images/kerala-tourism.jpg"
    },
    {
      title: "Website Traffic Analyzer",
      category: "HTML / ANALYTICS",
      desc: "A web traffic analysis project exploring how website activity can be presented and understood through a simple frontend interface.",
      tags: ["HTML", "Analytics", "Web"],
      github: "https://github.com/sangeethsanthosh-git/website-traffic-analyzer",
      live: "https://github.com/sangeethsanthosh-git/website-traffic-analyzer",
      img: "/images/website-traffic-analyzer.jpg"
    },
    {
      title: "Edusense",
      category: "FLASK / EDUCATION",
      desc: "Lecture assistant built with Flask for education-focused workflows, helping turn learning material into more useful study support.",
      tags: ["Flask", "HTML", "Education"],
      github: "https://github.com/sangeethsanthosh-git/Edusense",
      live: "https://github.com/sangeethsanthosh-git/Edusense",
      img: "/images/edusense.jpg"
    },
    {
      title: "AI Budget Planner",
      category: "PYTHON / FINANCE AI",
      desc: "Flask-based AI budget planner with expense forecasting and local insights for making personal finance decisions easier to understand.",
      tags: ["Python", "Flask", "Forecasting", "Finance"],
      github: "https://github.com/sangeethsanthosh-git/ai-budget-planner",
      live: "https://github.com/sangeethsanthosh-git/ai-budget-planner",
      img: "/images/ai-budget-planner.jpg"
    },
    {
      title: "PCOD Detection System",
      category: "PYTHON / HEALTH AI",
      desc: "PCOS clinical support platform with AI-assisted detection workflows and desktop executable packaging.",
      tags: ["Python", "AI", "Healthcare", "Desktop"],
      github: "https://github.com/sangeethsanthosh-git/PCOD-Detection-System",
      live: "https://github.com/sangeethsanthosh-git/PCOD-Detection-System",
      img: "/images/pcod-detection.jpg"
    },
    {
      title: "AeroSense Mactrons",
      category: "DATA SCIENCE / WEATHER",
      desc: "A notebook-based AeroSense project exploring weather, air-quality, and environmental data workflows.",
      tags: ["Jupyter Notebook", "Data Science", "Weather"],
      github: "https://github.com/sangeethsanthosh-git/AEROSENSE-MACTRONS",
      live: "https://github.com/sangeethsanthosh-git/AEROSENSE-MACTRONS",
      img: "/images/aerosense.webp"
    },
    {
      title: "ICT",
      category: "JUPYTER / LEARNING",
      desc: "Notebook repository for ICT coursework, experiments, and data-oriented learning exercises.",
      tags: ["Jupyter Notebook", "Learning", "Data"],
      github: "https://github.com/sangeethsanthosh-git/ICT",
      live: "https://github.com/sangeethsanthosh-git/ICT",
      img: "/images/portfolio.webp"
    },
    {
      title: "Finley Keycoders",
      category: "JAVASCRIPT / WEB PROJECT",
      desc: "JavaScript web project repository built as part of the Finley Keycoders work.",
      tags: ["JavaScript", "Web", "Frontend"],
      github: "https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS",
      live: "https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS",
      img: "/images/finley-keycoders.jpg"
    }
  ];

  // Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const minStr = minutes < 10 ? "0" + minutes : String(minutes);
      setClockTime(`${hours}:${minStr}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 3D Scroll Rotation & Landing
  useEffect(() => {
    const handleScroll = () => {
      if (!phoneTargetRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startPoint = windowHeight * 1.1;
      const endPoint = windowHeight * 0.2;

      let progress = (startPoint - rect.top) / (startPoint - endPoint);
      progress = Math.max(0, Math.min(1, progress));

      const currentRotateY = (1 - progress) * -22;
      const currentRotateX = (1 - progress) * 18;
      const currentRotateZ = (1 - progress) * -6;
      const currentY = (1 - progress) * 140;
      const currentScale = 0.9 + progress * 0.1;

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

  // Animated ASCII Background Canvas
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
          let val = (wave1 + wave2 + 2) / 4;

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const influence = 1 - dist / 220;
              val = Math.min(1, val + influence * 0.65 * Math.sin(dist * 0.1 - time * 3));
            }
          }

          const charIndex = Math.floor(val * (chars.length - 1));
          const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))];

          if (char !== " ") {
            if (val > 0.65) {
              ctx.fillStyle = `rgba(250, 236, 210, ${val * 0.28})`;
            } else if (val > 0.4) {
              ctx.fillStyle = `rgba(74, 160, 95, ${val * 0.22})`;
            } else {
              ctx.fillStyle = `rgba(34, 84, 36, ${val * 0.16})`;
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

  // Touch Swipe & Drag Handling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - currentX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          setCurrentSlide((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
        } else {
          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      isDragging = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      currentX = e.clientX;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - currentX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          setCurrentSlide((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
        } else {
          setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [projects.length]);

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
      alert("Link copied to clipboard!");
    }
  };

  const activeProject = projects[currentSlide];
  const modalProject = projects[activeModalIdx];
  const formatStoryHeadline = (title: string) => {
    const words = title.replace(/[-_]/g, " ").toUpperCase().split(/\s+/).filter(Boolean);
    if (words.length >= 4) return words.slice(0, 4);
    if (words.length === 3) return [words[0], words[1], words[2], "PROJECT"];
    if (words.length === 2) return [words[0], words[1], "DIGITAL", "BUILD"];
    return [words[0] ?? "GITHUB", "PROJECT", "DIGITAL", "BUILD"];
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=Plus+Jakarta+Sans:wght@800;900&family=Space+Mono:wght@400;700&display=swap');

        /* 3D Perspective Stage & Phone Shell */
        .phone-perspective-stage {
          perspective: 1500px;
          perspective-origin: 50% 50%;
        }

        .phone-3d-wrapper {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
          filter: drop-shadow(-20px 40px 65px rgba(0, 0, 0, 0.75));
          transition: transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1);
        }

        .phone-3d-chassis {
          position: relative;
          width: 330px;
          height: 670px;
          background: #1c151b;
          border: 11px solid #1c1f24;
          border-radius: 54px;
          box-shadow: -14px 10px 0px #111316,
                      -18px 14px 20px rgba(0, 0, 0, 0.6),
                      inset 0 0 0 2px rgba(0, 0, 0, 0.85);
          overflow: hidden;
          user-select: none;
          transform-style: preserve-3d;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @media (min-width: 768px) {
          .phone-3d-chassis {
            width: 360px;
            height: 720px;
          }
        }

        .phone-3d-chassis.is-android {
          border-radius: 38px;
          border-width: 9px;
          border-color: #16181d;
          box-shadow: -10px 8px 0px #0f1013,
                      -14px 12px 18px rgba(0, 0, 0, 0.6),
                      inset 0 0 0 2px rgba(0, 0, 0, 0.85);
        }

        .phone-button-left-1,
        .phone-button-left-2,
        .phone-button-left-3 {
          position: absolute;
          left: -16px;
          background: #2b303a;
          border-radius: 4px 0 0 4px;
          box-shadow: -2px 0 3px rgba(0,0,0,0.5);
          transition: opacity 0.3s;
        }
        .phone-button-left-1 { top: 140px; width: 5px; height: 32px; }
        .phone-button-left-2 { top: 190px; width: 5px; height: 52px; }
        .phone-button-left-3 { top: 255px; width: 5px; height: 52px; }

        .phone-3d-chassis.is-android .phone-button-left-1,
        .phone-3d-chassis.is-android .phone-button-left-2,
        .phone-3d-chassis.is-android .phone-button-left-3 {
          opacity: 0;
          pointer-events: none;
        }

        .phone-button-right-1,
        .phone-button-right-2 {
          position: absolute;
          right: -14px;
          background: #252830;
          border-radius: 0 4px 4px 0;
          box-shadow: 2px 0 3px rgba(0,0,0,0.5);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .phone-button-right-1 { top: 160px; width: 5px; height: 64px; }
        .phone-button-right-2 { top: 240px; width: 5px; height: 42px; }

        .phone-3d-chassis.is-android .phone-button-right-1,
        .phone-3d-chassis.is-android .phone-button-right-2 {
          opacity: 1;
        }

        .phone-dynamic-island {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          height: 25px;
          background: #000000;
          border-radius: 20px;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          gap: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .phone-camera-lens {
          width: 9px;
          height: 9px;
          background: #0b132b;
          border-radius: 50%;
          border: 1px solid #1c2541;
        }

        .phone-3d-chassis.is-android .phone-dynamic-island {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          top: 12px;
          padding: 0;
          justify-content: center;
        }
        .phone-3d-chassis.is-android .phone-camera-lens {
          width: 10px;
          height: 10px;
        }

        .phone-screen-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 60%);
          pointer-events: none;
          z-index: 40;
        }

        .phone-slides-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
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
          padding: 44px 20px 72px;
        }

        .phone-slide img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .heirloom-script {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .heirloom-headline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 0.96;
          text-transform: uppercase;
        }

        .heirloom-mono-tag {
          font-family: 'Space Mono', monospace;
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
          font-size: 15px;
          cursor: pointer;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.2s;
        }
        .os-toggle-btn.active {
          color: #003DD1;
        }
        .os-toggle-btn.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 2.5px;
          background: #003DD1;
          border-radius: 2px;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* PROJECT SECTION: 3D ROTATING PHONE WITH HEIRLOOM EDITORIAL VINTAGE UI */}
      {/* ========================================================================= */}
      <section
        id="project"
        ref={sectionRef}
        className="relative pt-6 pb-28 sm:pt-10 sm:pb-36 text-white border-b border-white/10 overflow-hidden z-20 bg-gradient-to-b from-[#0a110d] via-[#121814] to-[#0d0f14]"
      >
        {/* Animated Interactive ASCII Background Layer */}
        <canvas ref={canvasRef} id="ascii-bg-canvas" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"></canvas>

        {/* Rich Atmospheric Ambient Studio Glows & Aurora Mesh */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            id="phone-glow"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#225424]/25 via-[#1b4329]/15 to-[#faecd2]/10 rounded-full blur-[190px]"
          ></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#faecd2]/10 rounded-full blur-[160px]"></div>
          <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-[#225424]/20 rounded-full blur-[180px]"></div>
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[22vw] font-black uppercase text-[#faecd2]/[0.02] tracking-widest leading-none">
            MOCK
          </span>
        </div>

        {/* Soft Drifting Ambient Cloud Puffs */}
        <div className="cloud-puff w-72 h-36 top-12 left-1/5 opacity-60"></div>
        <div className="cloud-puff w-80 h-40 top-1/2 right-1/6 opacity-70" style={{ animationDelay: "-3.5s" }}></div>
        <div className="cloud-puff w-64 h-32 bottom-20 left-1/4 opacity-40" style={{ animationDelay: "-6s" }}></div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#faecd2]/80 sm:text-sm sm:tracking-[0.35em]">
              Projects
            </p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-[#f9f5ed]">
              Featured Works
            </h2>
           
          </div>

          {/* 3D PERSPECTIVE STAGE FOR ROTATING & LANDING PHONE */}
          <div className="phone-perspective-stage w-full flex flex-col items-center">
            <div
              id="phone-3d-target"
              ref={phoneTargetRef}
              className="phone-3d-wrapper -mt-24 sm:-mt-36 flex flex-col items-center"
            >
              <div
                id="phone-device"
                className={`phone-3d-chassis ${phoneOS === "android" ? "is-android" : ""}`}
              >
                {/* Left Side Physical Buttons (iPhone) */}
                <div className="phone-button-left-1"></div>
                <div className="phone-button-left-2"></div>
                <div className="phone-button-left-3"></div>

                {/* Right Side Physical Buttons (Android) */}
                <div className="phone-button-right-1"></div>
                <div className="phone-button-right-2"></div>

                {/* Dynamic Island Notch / Android Punch Hole */}
                <div className="phone-dynamic-island">
                  <div className="phone-camera-lens"></div>
                </div>

                {/* Status Bar */}
                <div className="absolute top-2 inset-x-6 flex justify-between items-center text-[11px] font-bold text-white z-40 pointer-events-none drop-shadow">
                  <span id="phone-live-clock">{clockTime}</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
                    </svg>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                    </svg>
                    <div className="w-4 h-2.5 border border-white rounded-[3px] p-[1px] flex items-center">
                      <div className="w-full h-full bg-white rounded-[1px]"></div>
                    </div>
                  </div>
                </div>

                {/* Story Header (Avatar + Handle + Ellipsis) */}
                <div className="absolute top-12 inset-x-5 flex items-center justify-between z-40 pointer-events-none drop-shadow">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#faecd2] text-[#225424] flex items-center justify-center font-bold text-[9px] shadow-sm">
                      SS
                    </div>
                    <span className="text-[11px] font-medium text-white/90 lowercase tracking-wide">
                      sangeeth_dev
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80">
                    <span className="w-1 h-1 rounded-full bg-white"></span>
                    <span className="w-1 h-1 rounded-full bg-white"></span>
                    <span className="w-1 h-1 rounded-full bg-white"></span>
                  </div>
                </div>

                {/* Glossy Glass Glare Overlay */}
                <div className="phone-screen-glare"></div>

                {/* ================= SLIDABLE TRACK OF HEIRLOOM EDITORIAL STORIES ================= */}
                <div
                  id="phone-slides"
                  ref={trackRef}
                  className="phone-slides-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {projects.map((project, index) => {
                    const headline = formatStoryHeadline(project.title);
                    return (
                      <div key={project.title} className="phone-slide text-[#faecd2]">
                        <img
                          src={project.img}
                          className="brightness-75 contrast-105"
                          alt={project.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50 pointer-events-none"></div>

                        <div className="relative z-20 pt-8 text-center">
                          <span className="heirloom-script text-2xl text-[#faecd2] drop-shadow-md">Sangeeth</span>
                        </div>

                        <div className="relative z-20 my-auto text-center px-2">
                          <h3 className="heirloom-headline text-[2.1rem] leading-[0.94] text-[#faecd2] drop-shadow-lg">
                            {headline.map((line, lineIndex) => (
                              <React.Fragment key={`${project.title}-${line}-${lineIndex}`}>
                                {line}<br />
                              </React.Fragment>
                            ))}
                          </h3>
                        </div>

                        <div className="relative z-20 text-center pb-1 space-y-1.5 flex flex-col items-center">
                          <button
                            onClick={() => openModal(index)}
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[#faecd2]/40 text-[#faecd2] text-[10px] font-mono font-bold tracking-wider hover:bg-[#faecd2]/20 transition-all shadow-sm cursor-pointer"
                          >
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                            </svg>
                            <span>Description</span>
                          </button>
                          <span className="heirloom-mono-tag text-[#faecd2]/90 block">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ================= INTERACTIVE EDITORIAL DESCRIPTION SHEET (INSIDE PHONE SCREEN) ================= */}
                <div
                  id="phone-desc-modal"
                  className={`absolute inset-0 bg-black/85 backdrop-blur-md z-50 p-6 flex flex-col justify-between transition-all duration-300 transform ${
                    modalOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                      <div>
                        <span id="modal-category" className="text-[9px] font-mono font-bold uppercase text-[#faecd2]/70 tracking-widest block">
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
                        ✕
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
                            <span key={tIdx} className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Bottom Quick Launch */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-2">
                    <a
                      id="modal-github-link"
                      href={modalProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-full border border-white/30 bg-white/10 text-center text-xs font-bold text-white hover:bg-white/20 transition-all"
                    >
                      GitHub ↗
                    </a>
                    <a
                      id="modal-live-link"
                      href={modalProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-full border border-[#faecd2]/60 bg-[#faecd2]/20 text-center text-xs font-bold text-[#faecd2] hover:bg-[#faecd2]/30 transition-all"
                    >
                      Live Demo ↗
                    </a>
                  </div>
                </div>

                {/* ================= BOTTOM ACTION BAR: SPLIT GITHUB & LIVE BUTTONS + HEART & SHARE ================= */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-3 flex items-center justify-between z-40">
                  <div className="flex-1 mr-2 flex items-center gap-1.5">
                    {/* GitHub Button */}
                    <a
                      id="phone-github-btn"
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-8 rounded-full border border-white/40 bg-black/50 backdrop-blur-md px-2 flex items-center justify-center gap-1 text-[11px] font-bold text-white shadow-sm hover:bg-white/20 transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub ↗</span>
                    </a>

                    {/* Live Demo Button */}
                    <a
                      id="phone-live-btn"
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-8 rounded-full border border-[#faecd2]/60 bg-[#faecd2]/20 backdrop-blur-md px-2 flex items-center justify-center gap-1 text-[11px] font-bold text-[#faecd2] shadow-sm hover:bg-[#faecd2]/35 transition-all"
                    >
                      <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live ↗</span>
                    </a>
                  </div>

                  {/* Heart & Share Icons */}
                  <div className="flex items-center gap-2 text-white/90">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      type="button"
                      className="p-1 hover:text-rose-400 transition-colors cursor-pointer"
                      aria-label="Like"
                    >
                      <svg
                        className={`w-5 h-5 transition-colors ${
                          isLiked ? "fill-rose-500 text-rose-500" : "fill-none stroke-current"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleShare}
                      type="button"
                      className="p-1 hover:text-[#faecd2] transition-colors cursor-pointer"
                      aria-label="Share"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Home Gesture Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full z-50"></div>
              </div>
            </div>
          </div>

          {/* iPhone / Android OS Switcher */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <button
              id="btn-os-iphone"
              type="button"
              className={`os-toggle-btn ${phoneOS === "iphone" ? "active text-slate-200" : "text-slate-400"}`}
              onClick={() => setPhoneOS("iphone")}
            >
              iPhone
            </button>
            <button
              id="btn-os-android"
              type="button"
              className={`os-toggle-btn ${phoneOS === "android" ? "active text-slate-200" : "text-slate-400"}`}
              onClick={() => setPhoneOS("android")}
            >
              Android
            </button>
          </div>

          {/* Swipe Guidance Text */}
          <p className="text-xs text-white/50 mt-3 font-mono">
            &larr; Swipe left or right to flip stories &rarr;
          </p>
        </div>
      </section>
    </>
  );
}
