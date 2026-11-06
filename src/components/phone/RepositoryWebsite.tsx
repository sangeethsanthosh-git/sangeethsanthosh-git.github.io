"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ExternalLink, Github, Info, Lock, RotateCcw, X } from "lucide-react";

export const WEBSITE_PROJECTS = {
  rewind: { name: "Rewind", folder: "rewind", repo: "rewind", entry: "index", live: "" },
  chronicle: { name: "Chronicle", folder: "chronicle", repo: "chronicle-journal", entry: "index", live: "" },
  aura: { name: "AURA", folder: "aura", repo: "AURA", entry: "index", live: "" },
  dayform: { name: "Dayform", folder: "dayform", repo: "dayform", entry: "index", live: "" },
  kerala: { name: "Kerala Tourism", folder: "kerala", repo: "kerala-tourism", entry: "index", live: "https://kerala-tourism-qpa1.onrender.com" },
  vault: { name: "IntegrityVault", folder: "vault", repo: "file-integrity", entry: "dashboard", live: "https://file-integrity-z8xz.onrender.com" },
  traffic: { name: "Traffic Analyzer", folder: "traffic", repo: "website-traffic-analyzer", entry: "index", live: "https://website-traffic-analyzer.onrender.com" },
  edusense: { name: "EduSense", folder: "edusense", repo: "Edusense", entry: "index", live: "" },
  budget: { name: "AI Budget Planner", folder: "budget", repo: "ai-budget-planner", entry: "dashboard", live: "" },
  pcod: { name: "PCOS Platform", folder: "pcod", repo: "PCOD-Detection-System", entry: "index", live: "" },
  cartoon: { name: "Cartoonizer", folder: "cartoon", repo: "Cartoonizer", entry: "index", live: "" },
  gistify: { name: "Gistify", folder: "gistify", repo: "Gistify", entry: "index", live: "https://gistify-c.vercel.app/" },
} as const;

export type WebsiteProjectId = keyof typeof WEBSITE_PROJECTS;

export default function RepositoryWebsite({ projectId, onClose }: { projectId: WebsiteProjectId; onClose: () => void }) {
  const project = WEBSITE_PROJECTS[projectId];
  const nativeScreens = ["rewind", "chronicle", "dayform"].includes(projectId);
  const [reload, setReload] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    let visible = true;
    const sync = () => element.contentWindow?.postMessage({ type: "portfolio-preview-visibility", visible: visible && !document.hidden }, "*");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.01 });
    observer.observe(element);
    element.addEventListener("load", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); element.removeEventListener("load", sync); document.removeEventListener("visibilitychange", sync); };
  }, [projectId, reload]);
  const url = `/demos/${project.folder}/${project.entry}.html`;
  return (
    <div className="ios-app-shell repository-browser absolute inset-0 z-40 flex flex-col overflow-hidden">
      <nav className="ios-app-nav" aria-label="Browser navigation">
        <button onClick={onClose} className="ios-back"><ChevronLeft size={22} />Home</button>
        <span>{nativeScreens ? "Original native screens" : "Original project UI"}</span>
        <button onClick={() => setShowInfo(true)} aria-label="About this project" className="ios-info"><Info size={21} /></button>
      </nav>
      {!nativeScreens && <div className="repo-browser-bar">
        <button onClick={() => setReload((value) => value + 1)} aria-label="Reload project preview"><RotateCcw size={16} /></button>
        <span><Lock size={11} />{project.name}</span>
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Open preview in a new tab"><ExternalLink size={15} /></a>
      </div>}
      <iframe ref={frame} key={`${projectId}-${reload}`} src={url} title={`${project.name} original repository UI`} sandbox="allow-scripts allow-forms allow-same-origin" loading="lazy" />
      <aside className="app-preview-notice" aria-label="Preview limitation">
        <Info size={15} aria-hidden="true" />
        <p><strong>UI preview only.</strong> Explore the design; the full app experience isn’t available here.</p>
      </aside>
      {showInfo && <div className="ios-sheet-backdrop" onClick={() => setShowInfo(false)}>
        <section className="ios-info-sheet" role="dialog" aria-modal="true" aria-label="Project information" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === "Escape") setShowInfo(false); }}>
          <button autoFocus className="ios-sheet-done" onClick={() => setShowInfo(false)} aria-label="Close project information"><X size={20} /></button>
          <h3>{project.name}</h3>
          <p><strong>UI preview only.</strong> This demo lets you experience the interface, not the full capabilities of the app. Visit the repository or full app to explore everything it offers.</p>
          <p>{nativeScreens ? "Screens rendered from the original Flutter widgets using sample data. Tap the navigation and highlighted controls to explore. Native features and storage are demonstrated rather than executed; no Flutter engine is downloaded." : "The original project interface, adapted to fit this phone. Explore its pages using sample data. Accounts, uploads, AI processing, payments, and server storage are demonstrated locally."}</p>
          <a href={`https://github.com/sangeethsanthosh-git/${project.repo}`} target="_blank" rel="noopener noreferrer"><Github size={18} />View repository<ExternalLink size={15} /></a>
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} />Open full app</a>}
        </section>
      </div>}
    </div>
  );
}
