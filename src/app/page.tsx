import dynamic from "next/dynamic";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <SectionFallback id="skills" className="bg-[#faecd2] text-[#225424]" label="Loading skills..." />,
});

const Project = dynamic(() => import("@/components/Project"), {
  loading: () => (
    <SectionFallback id="project" className="bg-black text-white" label="Loading projects..." />
  ),
});

const Work = dynamic(() => import("@/components/Work"), {
  loading: () => <SectionFallback id="work" className="bg-[#2a2a2a] text-white" label="Loading work..." />,
});

function SectionFallback({
  className,
  id,
  label,
}: {
  className: string;
  id: string;
  label: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 text-sm text-white/70 sm:px-6 lg:px-8">{label}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <Education />
      <Skills />
      <Project />
      <Services />
      <Experience />
      <Work />
      <Footer />
    </>
  );
}
