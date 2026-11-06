import Image from "next/image";
import { about, type TextSegment } from "@/data/portfolio";

function segmentClass(tone: TextSegment["tone"]) {
  if (tone === "accent") {
    return "font-semibold text-[#225424]";
  }

  if (tone === "strong") {
    return "font-semibold text-white";
  }

  return "";
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-20 text-white sm:py-24">
      <Image
        src={about.backgroundImage}
        alt="Sangeeth Santhosh - Full Stack Web Developer"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[#faecd2] sm:text-sm sm:tracking-[0.35em]">
          About
        </p>

        <h2 className="mt-5 max-w-4xl text-[1.85rem] font-medium leading-tight sm:mt-6 sm:text-3xl md:text-4xl">
          {about.intro.map((segment, index) => (
            <span key={`${segment.text}-${index}`} className={segmentClass(segment.tone)}>
              {segment.text}
            </span>
          ))}
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:mt-6 sm:text-base">
          {about.summary.map((segment, index) => (
            <span key={`${segment.text}-${index}`} className={segmentClass(segment.tone)}>
              {segment.text}
            </span>
          ))}
        </p>

        <a
          href={about.ctaHref}
          className="mt-8 inline-flex w-full justify-center rounded-full border border-white/30 bg-[#faecd2] px-6 py-3 text-sm font-medium text-[#225424] transition-transform duration-200 hover:scale-[1.02] sm:w-auto"
        >
          {about.ctaLabel}
        </a>
      </div>
    </section>
  );
}
