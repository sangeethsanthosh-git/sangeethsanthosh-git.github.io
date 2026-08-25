"use client";

import React, { useState, useEffect, useRef } from "react";

interface SkillItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Databases" | "Tools";
  icon: string;
  color: string;
  desc: string;
}

const flowSkills: SkillItem[] = [
  { id: "react", name: "React 19", category: "Frontend", icon: "/skills/react.png", color: "#61DAFB", desc: "Component architecture & reactive hooks." },
  { id: "nextjs", name: "Next.js 15", category: "Frontend", icon: "/skills/nextjs.png", color: "#ffffff", desc: "SSR, App Router & edge deployments." },
  { id: "typescript", name: "TypeScript", category: "Frontend", icon: "/skills/typescript.png", color: "#3178C6", desc: "Strict typing & enterprise architecture." },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", icon: "/skills/tailwind.png", color: "#38B2AC", desc: "Utility-first modern design systems." },
  { id: "python", name: "Python AI", category: "Backend", icon: "/skills/python.png", color: "#3776AB", desc: "OpenCV computer vision & ML scripting." },
  { id: "django", name: "Django REST", category: "Backend", icon: "/skills/django.png", color: "#092E20", desc: "Scalable MVC backend & secure APIs." },
  { id: "nodejs", name: "Node.js", category: "Backend", icon: "/skills/nodejs.png", color: "#339933", desc: "Asynchronous high-concurrency runtimes." },
  { id: "postgresql", name: "PostgreSQL", category: "Databases", icon: "/skills/postgresql.png", color: "#4169E1", desc: "Relational indexing & ACID transactions." },
  { id: "mysql", name: "MySQL", category: "Databases", icon: "/skills/mysql.png", color: "#4479A1", desc: "Structured schemas & query optimization." },
  { id: "mongodb", name: "MongoDB", category: "Databases", icon: "/skills/mongodb.png", color: "#47A248", desc: "NoSQL document collections & pipelines." },
  { id: "framer", name: "Framer Motion", category: "Frontend", icon: "/skills/framer.png", color: "#0055FF", desc: "Spring physics & gesture interactions." },
  { id: "figma", name: "Figma", category: "Tools", icon: "/skills/figma.png", color: "#F24E1E", desc: "Vector prototyping & UI design tokens." },
  { id: "github", name: "Git & GitHub", category: "Tools", icon: "/skills/github.png", color: "#ffffff", desc: "Version control & automated workflows." },
  { id: "vscode", name: "VS Code", category: "Tools", icon: "/skills/vscode.png", color: "#007ACC", desc: "Modular development environment." },
  { id: "postman", name: "Postman", category: "Tools", icon: "/skills/postman.png", color: "#FF6C37", desc: "API endpoint testing & inspection." },
  { id: "javascript", name: "JavaScript", category: "Frontend", icon: "/skills/javascript.png", color: "#F7DF1E", desc: "Modern ES6+ asynchronous patterns." },
  { id: "html5", name: "HTML5", category: "Frontend", icon: "/skills/html.png", color: "#E34F26", desc: "Accessible semantic DOM architecture." },
  { id: "css3", name: "CSS3", category: "Frontend", icon: "/skills/css.png", color: "#1572B6", desc: "Custom properties & 3D matrices." },
  { id: "canva", name: "Canva Pro", category: "Tools", icon: "/skills/canva.png", color: "#00C4CC", desc: "Creative visual brand identities." },
];

export default function Skills(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<string>("Developers");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  // Smooth continuous conveyor wave loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isPausedRef.current) {
        setOffset((prev) => prev + 45 * delta); // 45px/s smooth motion
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Compute 3 sets of the items to allow infinite seamless looping
  const items = [...flowSkills, ...flowSkills, ...flowSkills];
  const itemWidth = 84; // tile width + margin
  const totalWaveWidth = items.length * itemWidth;

  return (
    <>
      <style>{`
        /* Flow Wave Tile */
        .flow-wave-tile {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: #181a20;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5),
                      inset 0 1px 1px rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          user-select: none;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      border-color 0.25s,
                      box-shadow 0.25s;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .flow-wave-tile {
            width: 66px;
            height: 66px;
            border-radius: 20px;
          }
        }

        .flow-wave-tile:hover {
          transform: scale(1.3) translateY(-14px) !important;
          background: #242832;
          border-color: rgba(250, 236, 210, 0.7);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8),
                      0 0 25px rgba(250, 236, 210, 0.35),
                      inset 0 1px 2px rgba(255, 255, 255, 0.5);
          z-index: 50;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* SKILLS SECTION: UNDULATING SINE WAVE APP RIBBON (MATCHING FLOW APP UI) */}
      {/* ========================================================================= */}
      <section
        id="skills"
        className="relative pt-20 pb-28 sm:pt-28 sm:pb-36 bg-[#0c0d11] text-white border-b border-white/10 overflow-hidden"
      >
        {/* Soft Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#225424]/15 via-[#3b82f6]/10 to-[#faecd2]/10 rounded-full blur-[190px] pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Main Headline (Matching Flow in every application Typography) */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic text-white tracking-tight leading-[1.05]">
            Flow in every<br />
            <span className="font-sans not-italic font-bold text-[#f9f5ed]">
              technology
            </span>
          </h2>

          <p className="mt-5 text-xs sm:text-sm text-white/65 max-w-xl mx-auto leading-relaxed">
            Work at the speed you think across every layer of development. From reactive client interfaces to scalable backend services—fluid execution across the stack.
          </p>

          {/* Active Hover Inspection Badge */}
          <div className="h-9 mt-4 flex items-center justify-center">
            {hoveredSkill ? (
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#faecd2] backdrop-blur-md shadow-xl transition-all duration-300">
                <img src={hoveredSkill.icon} alt={hoveredSkill.name} className="w-4 h-4 object-contain" />
                <span className="font-bold text-white">{hoveredSkill.name}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/70">{hoveredSkill.desc}</span>
              </div>
            ) : (
              <span className="text-xs font-mono text-white/40 tracking-wider">
                Hover any technology on the wave to inspect capabilities
              </span>
            )}
          </div>

        </div>

        {/* ================= UNDULATING SINE WAVE APP CONVEYOR TRACK ================= */}
        <div
          className="mt-8 sm:mt-12 relative w-full h-52 sm:h-64 flex items-center overflow-hidden"
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; setHoveredSkill(null); }}
        >
          <div className="relative w-full h-full flex items-center">
            {items.map((item, index) => {
              const currentX = (index * itemWidth - (offset % totalWaveWidth) + totalWaveWidth) % totalWaveWidth - itemWidth;
              
              // Sinusoidal Wave Equation: y = Amplitude * sin(frequency * x)
              const waveFrequency = 0.0035;
              const waveAmplitude = 45; // 45px vertical crest & trough
              const y = Math.sin(currentX * waveFrequency) * waveAmplitude;
              
              // Angle is derivative of sine: slope = cos(x)
              const slope = Math.cos(currentX * waveFrequency);
              const angleDeg = (Math.atan(slope * (waveAmplitude * waveFrequency)) * 180) / Math.PI;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flow-wave-tile"
                  style={{
                    position: "absolute",
                    left: `${currentX}px`,
                    transform: `translateY(${y}px) rotate(${angleDeg}deg)`,
                  }}
                  onMouseEnter={() => setHoveredSkill(item)}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM ROLE PILL SWITCHERS (MATCHING REFERENCE) ================= */}
        <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs font-medium">
          {[
            { id: "FullStack", label: "Full-Stack Dev" },
            { id: "Developers", label: "Developers" },
            { id: "Founders", label: "Founders" },
            { id: "ProductManagers", label: "Product Teams" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              type="button"
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#e8d5f2] text-[#1c1224] font-bold border-[#e8d5f2] shadow-sm scale-105"
                  : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </section>
    </>
  );
}
