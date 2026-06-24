"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/portfolio";

const isAnimatedAsset = (src: string) => src.endsWith(".webp") || src.endsWith(".gif");

const projectQuotes = [
  "A playful image pipeline that turns ordinary frames into something expressive.",
  "Long documents become clear, compact, and ready to act on.",
  "Video utilities should feel simple, fast, and direct.",
  "Weather and air quality become easier to read at a glance.",
  "Spoken ideas deserve a clean place to land.",
  "A portfolio should feel like the person behind the code.",
];

const normalizeIndex = (index: number, length: number) => ((index % length) + length) % length;
const svgNumber = (value: number) => Number(value.toFixed(4));

export default function Project() {
  const [current, setCurrent] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const lastAngleRef = useRef(0);
  const settleTimerRef = useRef<number | null>(null);
  const anglePerProject = 360 / projects.length;
  const activeProject = projects[current];
  const activeQuote = projectQuotes[current] ?? activeProject.description;

  const storyCards = useMemo(
    () =>
      projects.map((project, index) => ({
        ...project,
        quote: projectQuotes[index] ?? project.description,
      })),
    [],
  );

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  const updateFromRotation = (nextRotation: number) => {
    const nextIndex = normalizeIndex(Math.round(nextRotation / anglePerProject) * -1, projects.length);
    setCurrent(nextIndex);
  };

  const goTo = (index: number, revealDetails = false) => {
    const target = normalizeIndex(index, projects.length);
    let steps = target - current;

    if (steps > projects.length / 2) steps -= projects.length;
    if (steps < -projects.length / 2) steps += projects.length;

    const nextRotation = rotation - steps * anglePerProject;
    setIsSettling(true);
    setRotation(nextRotation);
    setCurrent(target);
    setShowMobileDetails((visible) => visible || revealDetails);

    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => setIsSettling(false), 520);
  };

  const step = (direction: 1 | -1) => {
    goTo(current + direction);
  };

  const getPointerAngle = (clientX: number, clientY: number) => {
    const rect = wheelRef.current?.getBoundingClientRect();

    if (!rect) {
      return 0;
    }

    return Math.atan2(clientY - (rect.top + rect.height / 2), clientX - (rect.left + rect.width / 2)) * (180 / Math.PI);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setIsSettling(false);
    lastAngleRef.current = getPointerAngle(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const angle = getPointerAngle(event.clientX, event.clientY);
    let diff = angle - lastAngleRef.current;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const nextRotation = rotation + diff;
    lastAngleRef.current = angle;
    setRotation(nextRotation);
    updateFromRotation(nextRotation);
  };

  const settleWheel = () => {
    setIsDragging(false);
    setIsSettling(true);

    const targetRotation = Math.round(rotation / anglePerProject) * anglePerProject;
    setRotation(targetRotation);
    updateFromRotation(targetRotation);

    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => setIsSettling(false), 520);
  };

  return (
    <section
      id="project"
      className="relative min-h-[760px] overflow-hidden bg-[#faecd2] text-[#225424] sm:min-h-[820px] lg:aspect-[16/10] lg:min-h-0"
    >
      <div className="absolute inset-0 opacity-45 mix-blend-multiply [background-image:radial-gradient(circle_at_20%_15%,rgba(0,0,0,0.035),transparent_38%),radial-gradient(circle_at_80%_75%,rgba(0,0,0,0.03),transparent_42%)]" />
      <div className="absolute inset-0 opacity-30 mix-blend-multiply [background-image:repeating-linear-gradient(0deg,rgba(27,24,18,0.035)_0px,rgba(27,24,18,0.035)_1px,transparent_1px,transparent_4px)]" />

          <div className="relative z-20 flex items-start justify-between px-5 pt-6 sm:px-10 lg:px-14">
            <div className="text-center">
              
              
              
            </div>
          </div>

          <div className="absolute left-5 top-5 z-20 max-w-[260px] text-right sm:left-5 sm:top-15 lg:left-14">
            <div className="mb-4 ml-auto h-0.5 w-11 bg-[#225424]" />
            <p className="text-[2.15rem] font-black uppercase leading-[0.94] tracking-[0.03em] sm:text-[2.8rem]">
              Project
              <br />
              stories
            </p>
            <p className="mt-4 inline-block border-t border-[#225424] pt-3 font-serif text-sm italic text-[#5b5750]">
              &quot;Drag through the builds.&quot;
            </p>
          </div>

          <div className="absolute right-5 top-35 z-20 max-w-[210px] text-right sm:right-10 md:left-[44%] md:right-auto md:top-28 md:max-w-[220px] md:text-left">
            <div className="mb-3 ml-auto h-0.5 w-8 bg-[#225424] md:ml-0" />
            <p className="font-serif text-sm italic leading-6 text-[#225424]">&quot;{activeQuote}&quot;</p>
          </div>

          <div className="absolute left-[calc(44%-74px)] top-48 z-20 hidden rotate-180 [writing-mode:vertical-rl] md:block">
            <p className="text-xs tracking-[0.28em] text-[#5b5750]">
              <b className="font-semibold text-[#225424]">{String(current + 1).padStart(2, "0")}</b> /{" "}
              {String(projects.length).padStart(2, "0")}
            </p>
          </div>

          <div className="absolute inset-x-0 top-[230px] z-10 h-[280px] sm:top-[250px]">
            {storyCards.map((project, index) => {
              let rel = index - current;

              if (rel > projects.length / 2) rel -= projects.length;
              if (rel < -projects.length / 2) rel += projects.length;

              const absRel = Math.abs(rel);
              const isActive = rel === 0;
              const scale = isActive ? 1.16 : absRel === 1 ? 0.88 : absRel === 2 ? 0.72 : 0.56;
              const opacity = isActive ? 1 : absRel === 1 ? 0.86 : absRel === 2 ? 0.5 : 0;
              const x = rel * 142;
              const y = isActive ? -14 : absRel === 1 ? 18 : 34;
              const rotateY = rel * -7;

              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => goTo(index, true)}
                  aria-label={`Show project: ${project.title}`}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={absRel > 2 ? -1 : 0}
                  className="absolute left-1/2 top-1/2 w-[138px] rounded-[4px] bg-white p-1.5 pb-3 text-left shadow-[0_18px_34px_-16px_rgba(20,16,8,0.35)] outline-none transition-[box-shadow,opacity,transform,filter] duration-500 focus-visible:ring-2 focus-visible:ring-[#225424] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faecd2] sm:w-[158px]"
                  style={{
                    opacity,
                    transform: `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    zIndex: 10 - absRel,
                    filter: isActive ? "none" : "saturate(0.75) brightness(1.02)",
                    pointerEvents: absRel > 2 ? "none" : "auto",
                  }}
                >
                  <div className="relative aspect-[0.86] overflow-hidden rounded-[3px] bg-[#cfc8ba]">
                    <Image
                      src={project.preview}
                      alt=""
                      fill
                      unoptimized={isAnimatedAsset(project.preview)}
                      sizes="160px"
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(242,238,230,0.34),rgba(27,24,18,0.28))]" />
                  </div>
                  <p className="mt-3 truncate text-[11px] font-bold uppercase tracking-[0.09em] text-[#225424]">
                    {project.title}
                  </p>
                  <p className="font-serif text-[10px] italic text-[#5b5750]">
                    {project.status === "working" ? "In progress" : "Completed"}
                  </p>
                </button>
              );
            })}
          </div>

          <article
            className={`absolute bottom-24 left-5 right-5 z-20 rounded-[6px] border border-[#225424]/15 bg-[#f8f4ec]/82 p-4 shadow-[0_20px_50px_rgba(27,24,18,0.12)] backdrop-blur-sm sm:left-10 sm:max-w-[380px] md:bottom-40 md:block lg:bottom-48 lg:left-14 ${
              showMobileDetails ? "block" : "hidden"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#817a6e]">
              Open build 0{current + 1}
            </p>
            <h3 className="mt-2 text-2xl font-black uppercase leading-none tracking-[0.02em]">
              {activeProject.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5b5750]">{activeProject.description}</p>
            {activeProject.notice ? (
              <p className="mt-3 rounded bg-[#eadbb7] px-3 py-2 text-xs font-medium text-[#5b431f]">
                {activeProject.notice}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {activeProject.live ? (
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#225424] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f2eee6] transition hover:scale-[1.02]"
                >
                  Live <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
              {activeProject.github ? (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#225424]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#225424] transition hover:scale-[1.02]"
                >
                  GitHub <Github className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </article>

          

          <div className="absolute bottom-[-78px] left-1/2 z-[7] h-16 w-[380px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(20,16,10,0.3),rgba(20,16,10,0.12)_56%,transparent_80%)] blur-sm sm:w-[560px] lg:w-[700px]" />

          <div
            ref={wheelRef}
            role="group"
            tabIndex={0}
            aria-label={`Drag or use arrow keys to browse project stories. Current project ${current + 1} of ${projects.length}.`}
            className="absolute bottom-[-155px] left-1/2 z-[8] h-[360px] w-[360px] -translate-x-1/2 cursor-grab touch-none outline-none focus-visible:ring-2 focus-visible:ring-[#225424] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faecd2] active:cursor-grabbing sm:bottom-[-200px] sm:h-[520px] sm:w-[520px] lg:bottom-[-260px] lg:h-[700px] lg:w-[700px]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={settleWheel}
            onPointerCancel={settleWheel}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                step(1);
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                step(-1);
              }
            }}
          >
            <ProjectWheel rotation={rotation} isSettling={isSettling && !isDragging} />
          </div>

          <div className="absolute bottom-6 right-6 z-20 flex gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Show previous project"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#225424]/18 bg-[#f8f4ec]/72 text-[#225424] transition hover:scale-[1.03]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Show next project"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#225424]/18 bg-[#f8f4ec]/72 text-[#225424] transition hover:scale-[1.03]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
    </section>
  );
}

function ProjectWheel({ isSettling, rotation }: { isSettling: boolean; rotation: number }) {
  const spokeCount = 24;
  const nippleCount = 36;
  const tickCount = 90;
  const hubRadius = 30;
  const rimRadius = 148;

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="projectTireGrad" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#46413a" />
          <stop offset="45%" stopColor="#26211d" />
          <stop offset="80%" stopColor="#141110" />
          <stop offset="100%" stopColor="#070606" />
        </radialGradient>
        <radialGradient id="projectSidewallGrad" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#363130" />
          <stop offset="60%" stopColor="#201d1b" />
          <stop offset="100%" stopColor="#0e0c0b" />
        </radialGradient>
        <linearGradient id="projectRimGrad" x1="20%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#f3efe6" />
          <stop offset="28%" stopColor="#cfc8b9" />
          <stop offset="52%" stopColor="#9c9484" />
          <stop offset="74%" stopColor="#cbc4b4" />
          <stop offset="100%" stopColor="#766f60" />
        </linearGradient>
        <linearGradient id="projectRimInnerGrad" x1="15%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#676052" />
          <stop offset="50%" stopColor="#8a8272" />
          <stop offset="100%" stopColor="#4d473c" />
        </linearGradient>
        <radialGradient id="projectHubGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fbf8f0" />
          <stop offset="40%" stopColor="#d6cfbd" />
          <stop offset="75%" stopColor="#a39c89" />
          <stop offset="100%" stopColor="#6e6757" />
        </radialGradient>
        <radialGradient id="projectCapGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#4a463d" />
          <stop offset="100%" stopColor="#1c1a16" />
        </radialGradient>
        <linearGradient id="projectSpokeLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e7e2d4" />
          <stop offset="100%" stopColor="#9b9484" />
        </linearGradient>
        <radialGradient id="projectAmbientShade" cx="62%" cy="68%" r="60%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
        </radialGradient>
        <radialGradient id="projectAmbientHighlight" cx="32%" cy="26%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="projectTireClip">
          <circle cx="200" cy="200" r="188" />
        </clipPath>
      </defs>

      <circle cx="200" cy="200" r="188" fill="url(#projectTireGrad)" />

      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "200px 200px",
          transition: isSettling ? "transform 520ms cubic-bezier(.22,.9,.3,1)" : "none",
        }}
      >
        <g clipPath="url(#projectTireClip)">
          <circle cx="200" cy="200" r="176" fill="url(#projectSidewallGrad)" />
          <circle cx="200" cy="200" r="183" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="200" cy="200" r="178" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="172" fill="none" stroke="#3a352f" strokeOpacity="0.6" strokeWidth="1" />

          {Array.from({ length: tickCount }).map((_, index) => {
            const angle = (index / tickCount) * Math.PI * 2;
            const x1 = svgNumber(200 + 168 * Math.cos(angle));
            const y1 = svgNumber(200 + 168 * Math.sin(angle));
            const x2 = svgNumber(200 + 174 * Math.cos(angle));
            const y2 = svgNumber(200 + 174 * Math.sin(angle));

            return (
              <line
                key={`tick-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#000"
                strokeOpacity="0.45"
                strokeWidth="0.8"
              />
            );
          })}

          {Array.from({ length: 58 }).map((_, index) => (
            <TreadBlock key={`tread-wide-${index}`} index={index} count={58} width={9} height={16} opacity={0.55} />
          ))}
          {Array.from({ length: 58 }).map((_, index) => (
            <TreadBlock
              key={`tread-slim-${index}`}
              index={index + 0.5}
              count={58}
              width={5}
              height={10}
              opacity={0.3}
            />
          ))}
        </g>

        <circle cx="200" cy="200" r="158" fill="url(#projectRimGrad)" stroke="#5b5648" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="148" fill="url(#projectRimInnerGrad)" />
        <circle cx="200" cy="200" r="148" fill="none" stroke="#3f3b30" strokeOpacity="0.7" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="139" fill="#dcd6c6" />
        <circle cx="200" cy="200" r="139" fill="none" stroke="#00000022" strokeWidth="1" />

        {Array.from({ length: nippleCount }).map((_, index) => {
          const angle = (index / nippleCount) * Math.PI * 2;

          return (
            <circle
              key={`nipple-${index}`}
              cx={svgNumber(200 + 143 * Math.cos(angle))}
              cy={svgNumber(200 + 143 * Math.sin(angle))}
              r="1.8"
              fill="#56503f"
            />
          );
        })}

        {Array.from({ length: spokeCount }).map((_, index) => {
          const baseAngle = (index / spokeCount) * Math.PI * 2;
          const cross = (11 * Math.PI) / 180;
          const rimAngle = baseAngle + (index % 2 === 0 ? cross : -cross);
          const x1 = svgNumber(200 + hubRadius * Math.cos(baseAngle));
          const y1 = svgNumber(200 + hubRadius * Math.sin(baseAngle));
          const x2 = svgNumber(200 + rimRadius * Math.cos(rimAngle));
          const y2 = svgNumber(200 + rimRadius * Math.sin(rimAngle));

          return (
            <g key={`spoke-${index}`} strokeLinecap="round">
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={index % 2 === 0 ? "#5c5648" : "#8a8372"}
                strokeWidth="3.2"
                strokeOpacity="0.55"
              />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#projectSpokeLight)" strokeWidth="1.7" />
            </g>
          );
        })}

        <circle cx="200" cy="200" r="30" fill="url(#projectHubGrad)" stroke="#5e584a" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="30" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1" />
        {Array.from({ length: 6 }).map((_, index) => {
          const angle = (index / 6) * Math.PI * 2;

          return (
            <circle
              key={`bolt-${index}`}
              cx={svgNumber(200 + 21 * Math.cos(angle))}
              cy={svgNumber(200 + 21 * Math.sin(angle))}
              r="2.4"
              fill="#4d473c"
            />
          );
        })}
        <circle cx="200" cy="200" r="11" fill="url(#projectCapGrad)" stroke="#000" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="197" cy="197" r="3" fill="#5c574a" fillOpacity="0.8" />

        <g transform="translate(200,200)">
          <rect x="-8" y="-172" width="16" height="30" rx="3" fill="#a23a1c" stroke="#5e1f0d" strokeWidth="1" />
          <rect x="-8" y="-172" width="16" height="10" rx="3" fill="#c8421f" />
          <circle cx="0" cy="-157" r="2.6" fill="#5e1f0d" />
        </g>
      </g>

      <circle cx="200" cy="200" r="188" fill="url(#projectAmbientHighlight)" clipPath="url(#projectTireClip)" />
      <circle cx="200" cy="200" r="188" fill="url(#projectAmbientShade)" clipPath="url(#projectTireClip)" />
      <circle cx="200" cy="200" r="188" fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth="2" />
      <path
        d="M 70 95 A 130 130 0 0 1 200 62"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="200" cy="200" r="34" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="3" />
    </svg>
  );
}

function TreadBlock({
  count,
  height,
  index,
  opacity,
  width,
}: {
  count: number;
  height: number;
  index: number;
  opacity: number;
  width: number;
}) {
  const angle = (index / count) * 360;
  const halfWidth = width / 2;
  const radius = 186;
  const path = `M ${-halfWidth} ${-radius} L ${halfWidth} ${-radius} L ${halfWidth * 0.6} ${
    -radius + height
  } L ${-halfWidth * 0.6} ${-radius + height} Z`;

  return (
    <g transform={`translate(200,200) rotate(${angle})`}>
      <path d={path} fill="#000" fillOpacity={opacity} />
    </g>
  );
}

