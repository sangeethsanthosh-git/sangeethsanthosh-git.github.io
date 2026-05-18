"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/portfolio";

const isAnimatedAsset = (src: string) => src.endsWith(".webp") || src.endsWith(".gif");

export default function Project() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeProject = projects[current];
  const activeBackdropMobile = activeProject.backdropMobile ?? activeProject.backdropDesktop;

  const next = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prev = () => setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        prev();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section
      id="project"
      className="relative overflow-hidden bg-[#111111] py-20 text-white sm:py-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeProject.title}-backdrop`}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="md:hidden">
            <Image
              src={activeBackdropMobile}
              alt=""
              aria-hidden="true"
              fill
              priority={current === 0}
              unoptimized={isAnimatedAsset(activeBackdropMobile)}
              sizes="100vw"
              className="object-cover opacity-24 blur-[1px]"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src={activeProject.backdropDesktop}
              alt=""
              aria-hidden="true"
              fill
              priority={current === 0}
              unoptimized={isAnimatedAsset(activeProject.backdropDesktop)}
              sizes="100vw"
              className="object-cover opacity-28 blur-[1px]"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(42,42,42,0.14),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(42,42,42,0.1),transparent_24%),linear-gradient(180deg,rgba(12,12,12,0.7),rgba(17,17,17,0.9))]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#dcefe9]/80 sm:text-sm sm:tracking-[0.35em]">
              Projects
            </p>
          </div>

          <div className="flex gap-3 self-start">
            <button
              type="button"
              onClick={prev}
              aria-label="Show previous project"
              className="rounded-full border border-white/15 bg-white/8 p-3 text-white transition duration-200 hover:scale-[1.02] hover:bg-white/12"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Show next project"
              className="rounded-full border border-white/15 bg-white/8 p-3 text-white transition duration-200 hover:scale-[1.02] hover:bg-white/12"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-20 z-30 -mx-4 mb-3 bg-[#111111]/88 px-4 pb-2 pt-2 backdrop-blur-md sm:static sm:mx-0 sm:mb-0 sm:bg-transparent sm:px-0 sm:pt-0 sm:backdrop-blur-none">
            <div className="scrollbar-hide relative overflow-x-auto pb-1">
              <div className="flex w-max min-w-full items-end gap-2 px-1 pr-6">
                {projects.map((project, index) => {
                  const isActive = index === current;

                  return (
                    <button
                      key={project.title}
                      type="button"
                      onClick={() => setCurrent(index)}
                      className={`w-fit min-w-[4.35rem] shrink-0 rounded-t-[1.05rem] border border-white/12 border-b-0 px-2.5 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-200 sm:min-w-[8.25rem] sm:rounded-t-[1.25rem] sm:px-3.5 sm:py-3.5 lg:min-w-[9rem] ${
                        isActive
                          ? "bg-[linear-gradient(180deg,rgba(205,242,232,0.94),rgba(178,228,213,0.82))] text-[#08211d]"
                          : "bg-[linear-gradient(180deg,rgba(241,236,227,0.96),rgba(217,223,215,0.86))] text-[#102724]"
                      }`}
                    >
                      <span className="hidden text-[10px] uppercase tracking-[0.32em] opacity-65 sm:block">
                        File 0{index + 1}
                      </span>
                      <span className="mt-0 block text-[11px] font-semibold uppercase tracking-[0.22em] sm:mt-2 sm:text-[15px] sm:tracking-normal">
                        <span className="hidden sm:block">{project.title}</span>
                        <span className="sm:hidden">{`P${index + 1}`}</span>
                      </span>
                      <span className="mt-1 hidden whitespace-nowrap text-[10px] uppercase tracking-[0.22em] opacity-55 sm:block">
                        {project.status === "working" ? "In Progress" : "Completed"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(242,236,228,0.14),rgba(181,211,198,0.08))] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:p-5">
            <div className="absolute inset-x-0 top-0 h-16 rounded-t-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />
            <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

            <AnimatePresence mode="wait">
              <motion.article
                key={activeProject.title}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0d1726]/95 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-6 lg:p-8"
              >
                <div className="absolute inset-0">
                  <div className="md:hidden">
                    <Image
                      src={activeBackdropMobile}
                      alt=""
                      aria-hidden="true"
                      fill
                      unoptimized={isAnimatedAsset(activeBackdropMobile)}
                      sizes="100vw"
                      className="object-cover opacity-26"
                    />
                  </div>
                  <div className="hidden md:block">
                    <Image
                      src={activeProject.backdropDesktop}
                      alt=""
                      aria-hidden="true"
                      fill
                      unoptimized={isAnimatedAsset(activeProject.backdropDesktop)}
                      sizes="100vw"
                      className="object-cover opacity-30"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_22%),linear-gradient(180deg,rgba(18,18,18,0.18),rgba(18,18,18,0.78))]" />
                <div className="absolute inset-y-4 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)]" />

                <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#dcefe9] sm:text-[11px]">
                        Project Compilation
                      </span>
                      {activeProject.status === "working" ? (
                        <span className="rounded-full border border-orange-300/30 bg-orange-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-200 sm:text-[11px]">
                          Currently Working On
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <span className="text-xs uppercase tracking-[0.32em] text-white/42">
                        Open File 0{current + 1}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <h3 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                      {activeProject.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                      {activeProject.description}
                    </p>

                    {activeProject.notice ? (
                      <p className="mt-5 rounded-2xl border border-yellow-200/20 bg-yellow-100/95 px-4 py-3 text-sm font-medium text-yellow-900">
                        {activeProject.notice}
                      </p>
                    ) : null}

                    <div className="mt-7 flex flex-wrap gap-3">
                      {[
                        activeProject.status === "working" ? "In Progress" : "Completed",
                        activeProject.github ? "GitHub Available" : "Private Build",
                        activeProject.live ? "Live Demo" : "Preview Only",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/66"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                      {activeProject.live ? (
                        <a
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/15 bg-white px-5 py-3 text-center text-sm font-medium text-[#07131f] transition duration-200 hover:scale-[1.02]"
                        >
                          View Live
                        </a>
                      ) : null}

                      {activeProject.github ? (
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/15 bg-white/8 px-5 py-3 text-center text-sm font-medium text-white transition duration-200 hover:scale-[1.02] hover:bg-white/12"
                        >
                          GitHub Repo
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
                    <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/8 shadow-2xl">
                      {activeProject.before && activeProject.after ? (
                        <BeforeAfterSlider before={activeProject.before} after={activeProject.after} />
                      ) : (
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={activeProject.preview}
                            alt={`${activeProject.title} preview`}
                            fill
                            loading="lazy"
                            unoptimized={isAnimatedAsset(activeProject.preview)}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(3,8,20,0.28))]" />
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-center text-sm text-white/58 lg:text-left">
                      Tap a file tab to open another project. Swipe works on mobile too.
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSlider({ after, before }: { after: string; before: string }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const updatePosition = (clientX: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const nextPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setPosition(nextPosition);
    });
  };

  return (
    <div
      className="relative aspect-[4/3] cursor-col-resize overflow-hidden select-none"
      style={{ touchAction: "none" }}
      onPointerDown={(event) => {
        setIsDragging(true);
        updatePosition(event.clientX, event.currentTarget);
      }}
      onPointerMove={(event) => {
        if (isDragging) {
          updatePosition(event.clientX, event.currentTarget);
        }
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <Image
        src={before}
        alt="Original preview"
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />

      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image
          src={after}
          alt="Processed preview"
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-y-0 w-[2px] bg-white" style={{ left: `${position}%` }} />
      <div
        className="absolute inset-y-0 w-10 -translate-x-1/2 rounded-full border border-white/35 bg-black/35 backdrop-blur-sm"
        style={{ left: `${position}%` }}
      />

      <div className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs sm:tracking-[0.2em]">
        Before
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white sm:right-4 sm:top-4 sm:px-3 sm:text-xs sm:tracking-[0.2em]">
        After
      </div>
    </div>
  );
}
