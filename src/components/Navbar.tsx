"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/portfolio";

const colorMap: Record<string, string> = {
  about: "text-[#225424]",
  education: "text-[#f9f5ed]",
  skills: "text-[#f9f5ed]",
  project: "text-[#225424]",
  services: "text-[#f9f5ed]",
  experience: "text-[#225424]",
  work: "text-[#f9f5ed]",
  contact: "text-[#f9f5ed]",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof navigation)[number]["id"]>("about");

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + 140;
      const currentSection = [...navigation].reverse().find(({ id }) => {
        const section = document.getElementById(id);

        if (!section) {
          return false;
        }

        return section.offsetTop <= marker;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const activeColor = colorMap[activeSection] ?? "text-[#225424]";

  return (
    <header className="fixed left-1/2 top-3 z-50 flex w-[calc(100%-1rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-[#eadbb7]/70 bg-[#faecd2]/78 px-4 py-3 shadow-[0_16px_38px_rgba(27,24,18,0.16)] backdrop-blur-md sm:top-4 sm:w-[92%] sm:px-5 sm:py-4">
      <a href="#top" className={`text-lg font-semibold transition-colors duration-300 sm:text-xl ${activeColor}`}>
        S.S
      </a>

      <nav className="hidden items-center gap-5 text-sm lg:flex xl:gap-6">
        {navigation.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={`transition-colors duration-300 ${
              activeSection === id ? `${colorMap[id]} font-semibold` : "text-[#225424] hover:text-[#173d1a]"
            }`}
          >
            {label}
          </Link>
        ))}

        <Link
          href="/pdf/Sangeeth_Santhosh_SA_Resume.pdf"
          download
          className="rounded-full border border-[#225424]/20 px-4 py-2 font-medium text-[#225424] transition-transform duration-200 hover:scale-[1.02] xl:px-5"
        >
          Resume
        </Link>
      </nav>

      <button
        type="button"
        className={`z-50 transition-colors lg:hidden ${activeColor}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen ? "true" : "false"}
        aria-controls="mobile-navigation-menu"
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] lg:hidden"
          />

          <div
            id="mobile-navigation-menu"
            className="fixed inset-x-4 top-20 z-50 max-h-[calc(100svh-6.5rem)] overflow-y-auto rounded-3xl border border-[#225424]/15 bg-[#faecd2] p-5 text-sm text-[#225424] shadow-2xl lg:hidden sm:inset-x-auto sm:right-4 sm:w-[22rem]"
          >
            <div className="flex flex-col gap-2">
              {navigation.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl px-3 py-2 transition-colors ${
                    activeSection === id ? "bg-white/50 font-semibold text-[#225424]" : "text-[#225424]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              href="/pdf/Sangeeth_Santhosh_SA_Resume.pdf"
              download
              onClick={() => setMenuOpen(false)}
              className="mt-4 block rounded-full border border-[#225424]/20 px-4 py-3 text-center font-medium transition-transform duration-200 hover:scale-[1.02]"
            >
              Resume
            </Link>
          </div>
        </>
      ) : null}
    </header>
  );
}
