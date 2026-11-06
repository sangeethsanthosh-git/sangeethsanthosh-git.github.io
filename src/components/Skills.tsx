"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  ExternalLink,
  X,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";

// Skill item definition
export interface SkillItem {
  id: string;
  name: string;
  category: "frontend" | "mobile" | "backend" | "ai" | "tools";
  categoryLabel: string;
  badge: string;
  desc: string;
  proficiency: string;
  iconType: "image" | "svg";
  iconSrc?: string;
  glowColor: string;
  projects: string[];
}

interface StreamSlot {
  id: string;
  track: string;
  x: number; // pixel offset from folder mouth center
  y: number; // pixel offset from folder mouth center (negative is upward)
  rot: number; // tilt angle (deg)
  floatType: "float-1" | "float-2" | "float-3";
  floatDelay: string;
}

// 19 slots across 5 curved tracks for "All Skills" view (proportional heights, never colliding with tabs)
const ALL_STREAM_SLOTS: StreamSlot[] = [
  // Track 1: Far Left (3 cards)
  { id: "slot-0", track: "far-left", x: -210, y: -75, rot: -15, floatType: "float-1", floatDelay: "0.2s" },
  { id: "slot-1", track: "far-left", x: -240, y: -145, rot: -19, floatType: "float-2", floatDelay: "0.5s" },
  { id: "slot-2", track: "far-left", x: -255, y: -210, rot: -22, floatType: "float-3", floatDelay: "0.8s" },

  // Track 2: Mid Left (4 cards)
  { id: "slot-3", track: "mid-left", x: -105, y: -65, rot: -7, floatType: "float-2", floatDelay: "0.1s" },
  { id: "slot-4", track: "mid-left", x: -125, y: -120, rot: -10, floatType: "float-1", floatDelay: "0.4s" },
  { id: "slot-5", track: "mid-left", x: -138, y: -175, rot: -12, floatType: "float-3", floatDelay: "0.7s" },
  { id: "slot-6", track: "mid-left", x: -145, y: -225, rot: -14, floatType: "float-2", floatDelay: "0.3s" },

  // Track 3: Center (4 cards)
  { id: "slot-7", track: "center", x: -10, y: -80, rot: -2, floatType: "float-3", floatDelay: "0.3s" },
  { id: "slot-8", track: "center", x: 10, y: -130, rot: 2, floatType: "float-1", floatDelay: "0.6s" },
  { id: "slot-9", track: "center", x: -6, y: -180, rot: -1, floatType: "float-2", floatDelay: "0.2s" },
  { id: "slot-10", track: "center", x: 0, y: -230, rot: 1, floatType: "float-3", floatDelay: "0.5s" },

  // Track 4: Mid Right (4 cards)
  { id: "slot-11", track: "mid-right", x: 105, y: -65, rot: 7, floatType: "float-1", floatDelay: "0.2s" },
  { id: "slot-12", track: "mid-right", x: 125, y: -120, rot: 10, floatType: "float-3", floatDelay: "0.5s" },
  { id: "slot-13", track: "mid-right", x: 138, y: -175, rot: 12, floatType: "float-2", floatDelay: "0.8s" },
  { id: "slot-14", track: "mid-right", x: 145, y: -225, rot: 14, floatType: "float-1", floatDelay: "0.4s" },

  // Track 5: Far Right (4 cards)
  { id: "slot-15", track: "far-right", x: 210, y: -75, rot: 15, floatType: "float-2", floatDelay: "0.1s" },
  { id: "slot-16", track: "far-right", x: 240, y: -145, rot: 19, floatType: "float-1", floatDelay: "0.4s" },
  { id: "slot-17", track: "far-right", x: 255, y: -210, rot: 22, floatType: "float-3", floatDelay: "0.7s" },
  { id: "slot-18", track: "far-right", x: 265, y: -235, rot: 24, floatType: "float-2", floatDelay: "0.9s" },
];

// 7 slots for category-specific view (clean 3-track fan with ample headroom)
const CATEGORY_STREAM_SLOTS: StreamSlot[] = [
  { id: "cslot-0", track: "left", x: -95, y: -85, rot: -7, floatType: "float-1", floatDelay: "0.2s" },
  { id: "cslot-1", track: "left", x: -130, y: -175, rot: -12, floatType: "float-2", floatDelay: "0.5s" },
  { id: "cslot-2", track: "center", x: -4, y: -95, rot: -1, floatType: "float-3", floatDelay: "0.1s" },
  { id: "cslot-3", track: "center", x: 0, y: -205, rot: 1, floatType: "float-1", floatDelay: "0.4s" },
  { id: "cslot-4", track: "right", x: 85, y: -80, rot: 8, floatType: "float-2", floatDelay: "0.3s" },
  { id: "cslot-5", track: "right", x: 130, y: -150, rot: 14, floatType: "float-3", floatDelay: "0.6s" },
  { id: "cslot-6", track: "right", x: 155, y: -215, rot: 18, floatType: "float-1", floatDelay: "0.7s" },
];

// 3 pocket card slots (sitting inside the folder pocket, peeking out)
interface PocketSlot {
  id: string;
  x: number;
  y: number;
  rot: number;
}

const POCKET_SLOTS: PocketSlot[] = [
  { id: "pocket-left", x: -78, y: 18, rot: -6 },
  { id: "pocket-center", x: 0, y: 4, rot: 0 },
  { id: "pocket-right", x: 78, y: 18, rot: 6 },
];

// Complete 22 skills dataset
const ALL_SKILLS: SkillItem[] = [
  {
    id: "python",
    name: "Python 3.12",
    category: "backend",
    categoryLabel: "AI & Backend",
    badge: "CORE ENGINE",
    desc: "Primary language for generative AI engineering, autonomous system scripts, Django microservices, and high-throughput data processing pipelines.",
    proficiency: "Advanced • 4+ Years",
    iconType: "image",
    iconSrc: "/skills/python.png",
    glowColor: "rgba(55, 118, 171, 0.4)",
    projects: ["AURA Windows AI", "PCOD Detection ML", "Website Traffic Analyzer"],
  },
  {
    id: "react",
    name: "React 19",
    category: "frontend",
    categoryLabel: "Frontend Architecture",
    badge: "REACTIVE UI",
    desc: "Modern reactive user interfaces utilizing Server Actions, optimistic state mutations, declarative hooks, and buttery 60 FPS component lifecycles.",
    proficiency: "Advanced • 3+ Years",
    iconType: "image",
    iconSrc: "/skills/react.png",
    glowColor: "rgba(97, 218, 251, 0.4)",
    projects: ["AI Budget Planner", "Finley KeyCoders", "EduSense Portal"],
  },
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "frontend",
    categoryLabel: "Full-Stack Framework",
    badge: "HYBRID SSR/EDGE",
    desc: "App Router architecture with React Server Components, server actions, route handlers, incremental static revalidation, and lightning edge deploys.",
    proficiency: "Advanced • Modern Stack",
    iconType: "image",
    iconSrc: "/skills/nextjs.png",
    glowColor: "rgba(0, 0, 0, 0.3)",
    projects: ["Portfolio Platform", "AI Budget Planner", "EduSense Hub"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Typed JavaScript",
    badge: "STRICT CONTRACTS",
    desc: "End-to-end type safety, generic constraints, discriminated unions, and scalable front-end architecture that catches bugs before execution.",
    proficiency: "Advanced • Daily Language",
    iconType: "image",
    iconSrc: "/skills/typescript.png",
    glowColor: "rgba(49, 120, 198, 0.4)",
    projects: ["Portfolio v2", "AI Budget Planner", "Full-Stack Clients"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Design System",
    badge: "UTILITY-FIRST",
    desc: "Crafting bespoke design systems, micro-interactions, responsive breakpoints, and tokenized palettes with zero runtime overhead.",
    proficiency: "Mastery • Production",
    iconType: "image",
    iconSrc: "/skills/tailwind.png",
    glowColor: "rgba(56, 189, 248, 0.4)",
    projects: ["Portfolio v2", "AI Budget Planner", "Kerala Tourism"],
  },
  {
    id: "flutter",
    name: "Flutter & Dart",
    category: "mobile",
    categoryLabel: "Mobile Architecture",
    badge: "NATIVE 60 FPS",
    desc: "Artisanal offline-first Android & iOS engineering featuring skeuomorphic cassette physics, custom canvas painters, and smooth haptic feedback.",
    proficiency: "Advanced • Tactile Apps",
    iconType: "image",
    iconSrc: "/skills/flutter.svg",
    glowColor: "rgba(2, 86, 155, 0.4)",
    projects: ["Rewind — Cassette Walkman", "Chronicle — Scrapbook Journal", "Dayform — Serene Planner"],
  },
  {
    id: "figma",
    name: "Figma",
    category: "frontend",
    categoryLabel: "Product & UI/UX",
    badge: "PROTOTYPING",
    desc: "High-fidelity interface wireframing, design tokens, responsive auto-layout systems, and interactive motion prototypes before writing production code.",
    proficiency: "Daily Tool • Wireframes",
    iconType: "image",
    iconSrc: "/skills/figma.png",
    glowColor: "rgba(242, 78, 30, 0.35)",
    projects: ["Rewind Walkman UI", "Chronicle Layout", "Portfolio Redesign"],
  },
  {
    id: "django",
    name: "Django & REST",
    category: "backend",
    categoryLabel: "Backend Framework",
    badge: "BATTERIES INCLUDED",
    desc: "Enterprise-grade Python backends with ORM modeling, token-based authentication, RESTful serialization, and secure middleware.",
    proficiency: "Proficient • Backend",
    iconType: "image",
    iconSrc: "/skills/django.png",
    glowColor: "rgba(9, 46, 32, 0.4)",
    projects: ["PCOD Detection API", "Traffic Analyzer Core"],
  },
  {
    id: "nodejs",
    name: "Node.js & Express",
    category: "backend",
    categoryLabel: "Server Runtime",
    badge: "ASYNC ENGINE",
    desc: "High-concurrency event-driven backends, microservice API routers, JWT authentication, and WebSocket streams.",
    proficiency: "Skilled • Backend",
    iconType: "image",
    iconSrc: "/skills/nodejs.png",
    glowColor: "rgba(83, 158, 67, 0.4)",
    projects: ["Web Traffic API", "File Integrity Monitor"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    categoryLabel: "Database & Storage",
    badge: "RELATIONAL",
    desc: "Robust relational data architecture with ACID compliance, custom indexing, JSONB document fields, and optimized schemas.",
    proficiency: "Skilled • Production",
    iconType: "image",
    iconSrc: "/skills/postgresql.png",
    glowColor: "rgba(51, 103, 145, 0.4)",
    projects: ["Finley Core", "File Integrity Vault", "Student Records"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "backend",
    categoryLabel: "Relational DB",
    badge: "SQL STORAGE",
    desc: "Structured relational databases with foreign keys, transactional queries, performance indexing, and normalized schemas.",
    proficiency: "Skilled • Relational",
    iconType: "image",
    iconSrc: "/skills/mysql.png",
    glowColor: "rgba(0, 117, 143, 0.4)",
    projects: ["Kerala Tourism System", "Student Records"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    categoryLabel: "Document Database",
    badge: "NOSQL",
    desc: "Flexible JSON-like BSON document pipelines, aggregation frameworks, and rapid prototyping for schemaless application data.",
    proficiency: "Skilled • NoSQL",
    iconType: "image",
    iconSrc: "/skills/mongodb.png",
    glowColor: "rgba(71, 162, 72, 0.4)",
    projects: ["AI Budget Planner Data", "Dynamic CMS"],
  },
  {
    id: "ai-llm",
    name: "AI & Local LLMs",
    category: "ai",
    categoryLabel: "Generative AI",
    badge: "ON-DEVICE INFERENCE",
    desc: "Local machine intelligence using Ollama, LangChain, semantic retrieval (RAG), structured JSON outputs, and autonomous agent orchestration.",
    proficiency: "Active Builder • LLMs",
    iconType: "svg",
    glowColor: "rgba(16, 163, 127, 0.45)",
    projects: ["AURA Windows AI Assistant", "Gistify Summarizer"],
  },
  {
    id: "git",
    name: "Git",
    category: "tools",
    categoryLabel: "Version Control",
    badge: "DISTRIBUTED VCS",
    desc: "Atomic commits, semantic versioning, branching strategies, and interactive rebasing for bulletproof source tracking.",
    proficiency: "Advanced • Daily Workflow",
    iconType: "image",
    iconSrc: "/skills/git.png",
    glowColor: "rgba(240, 80, 50, 0.4)",
    projects: ["All Open Source Repositories"],
  },
  {
    id: "github",
    name: "GitHub & CI/CD",
    category: "tools",
    categoryLabel: "DevOps & Cloud",
    badge: "ACTIONS & REPOS",
    desc: "Automated GitHub Actions pipelines, containerized build steps, static artifact hosting, and collaborative code reviews.",
    proficiency: "Daily Hub",
    iconType: "image",
    iconSrc: "/skills/github.png",
    glowColor: "rgba(36, 41, 46, 0.4)",
    projects: ["All Open Source Repositories"],
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "tools",
    categoryLabel: "Development Environment",
    badge: "IDE POWERHOUSE",
    desc: "Heavily configured development environment with custom linting, terminal integrations, and local debugging tools.",
    proficiency: "Daily Driver",
    iconType: "image",
    iconSrc: "/skills/vscode.png",
    glowColor: "rgba(0, 122, 204, 0.4)",
    projects: ["All Development Projects"],
  },
  {
    id: "postman",
    name: "Postman",
    category: "tools",
    categoryLabel: "API Testing",
    badge: "ENDPOINT VALIDATION",
    desc: "Comprehensive API test suites, mocking server environments, environment token handling, and automated integration checks.",
    proficiency: "Skilled • API Tooling",
    iconType: "image",
    iconSrc: "/skills/postman.png",
    glowColor: "rgba(255, 108, 55, 0.4)",
    projects: ["PCOD API Tests", "Traffic Analyzer API"],
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "frontend",
    categoryLabel: "Motion & Physics",
    badge: "SPRING ANIMATIONS",
    desc: "Declarative physics-based layout transitions, exit/enter animations, gesture tracking, and smooth interactive UI flourishes.",
    proficiency: "Advanced • Motion UI",
    iconType: "image",
    iconSrc: "/skills/framer.png",
    glowColor: "rgba(0, 85, 255, 0.4)",
    projects: ["Portfolio Interactivity", "AI Budget Animations"],
  },
  {
    id: "html",
    name: "HTML5",
    category: "frontend",
    categoryLabel: "Markup",
    badge: "SEMANTIC WEB",
    desc: "Accessible markup structures, SEO metadata optimization, and web component primitives.",
    proficiency: "Expert",
    iconType: "image",
    iconSrc: "/skills/html.png",
    glowColor: "rgba(227, 79, 38, 0.4)",
    projects: ["All Web Projects"],
  },
  {
    id: "css",
    name: "CSS3",
    category: "frontend",
    categoryLabel: "Styling",
    badge: "MODERN CSS",
    desc: "Flexbox, CSS Grid, custom properties, container queries, and hardware-accelerated animations.",
    proficiency: "Expert",
    iconType: "image",
    iconSrc: "/skills/css.png",
    glowColor: "rgba(38, 77, 228, 0.4)",
    projects: ["All Web Projects"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    categoryLabel: "Core Language",
    badge: "ES6+",
    desc: "Modern asynchronous JavaScript, event loop mastery, functional programming patterns, and DOM APIs.",
    proficiency: "Advanced",
    iconType: "image",
    iconSrc: "/skills/javascript.png",
    glowColor: "rgba(247, 223, 30, 0.4)",
    projects: ["All Web & Node Projects"],
  },
  {
    id: "canva",
    name: "Canva",
    category: "frontend",
    categoryLabel: "Visual Assets & Graphics",
    badge: "CREATIVE ASSETS",
    desc: "Social media graphics, vector banners, presentation assets, and branding collateral.",
    proficiency: "Proficient",
    iconType: "image",
    iconSrc: "/skills/canva.png",
    glowColor: "rgba(0, 196, 204, 0.4)",
    projects: ["Brand Media", "Social Assets"],
  },
];

// OpenAi / AI Sparkle Icon Component
function AiIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.8956zm16.5996 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4036-.6669zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.4074 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.1449-1.9213l2.55-1.4705 2.55 1.4705v2.941l-2.55 1.4705-2.55-1.4705z" />
    </svg>
  );
}

type CategoryFilter = "all" | "frontend" | "backend" | "ai" | "tools";

export default function Skills(): React.ReactElement {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [animKey, setAnimKey] = useState<number>(0);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [isFolderHovered, setIsFolderHovered] = useState<boolean>(false);

  // Trigger burst emergence animation on category click
  const handleCategorySelect = (newCat: CategoryFilter) => {
    if (newCat === category) return;
    setCategory(newCat);
    setAnimKey((prev) => prev + 1);
  };

  const isAll = category === "all";
  const activeSlots = isAll ? ALL_STREAM_SLOTS : CATEGORY_STREAM_SLOTS;

  // Filter skills dynamically per category
  const { floatingSkills, pocketSkills } = useMemo(() => {
    if (category === "all") {
      // 19 floating skills mapped cleanly across the 5 tracks
      const floating: SkillItem[] = [
        // Track 1 (Far Left)
        ALL_SKILLS.find((s) => s.id === "canva")!,
        ALL_SKILLS.find((s) => s.id === "html")!,
        ALL_SKILLS.find((s) => s.id === "css")!,
        // Track 2 (Mid Left)
        ALL_SKILLS.find((s) => s.id === "tailwind")!,
        ALL_SKILLS.find((s) => s.id === "javascript")!,
        ALL_SKILLS.find((s) => s.id === "typescript")!,
        ALL_SKILLS.find((s) => s.id === "python")!,
        // Track 3 (Center)
        ALL_SKILLS.find((s) => s.id === "react")!,
        ALL_SKILLS.find((s) => s.id === "nextjs")!,
        ALL_SKILLS.find((s) => s.id === "framer")!,
        ALL_SKILLS.find((s) => s.id === "figma")!,
        // Track 4 (Mid Right)
        ALL_SKILLS.find((s) => s.id === "nodejs")!,
        ALL_SKILLS.find((s) => s.id === "postgresql")!,
        ALL_SKILLS.find((s) => s.id === "mysql")!,
        ALL_SKILLS.find((s) => s.id === "mongodb")!,
        // Track 5 (Far Right)
        ALL_SKILLS.find((s) => s.id === "git")!,
        ALL_SKILLS.find((s) => s.id === "github")!,
        ALL_SKILLS.find((s) => s.id === "postman")!,
        ALL_SKILLS.find((s) => s.id === "flutter")!,
      ];

      // 3 in pocket
      const pocket: SkillItem[] = [
        ALL_SKILLS.find((s) => s.id === "django")!,
        ALL_SKILLS.find((s) => s.id === "ai-llm")!,
        ALL_SKILLS.find((s) => s.id === "vscode")!,
      ];

      return { floatingSkills: floating.filter(Boolean), pocketSkills: pocket.filter(Boolean) };
    }

    if (category === "frontend") {
      const floating = [
        ALL_SKILLS.find((s) => s.id === "html")!,
        ALL_SKILLS.find((s) => s.id === "typescript")!,
        ALL_SKILLS.find((s) => s.id === "react")!,
        ALL_SKILLS.find((s) => s.id === "figma")!,
        ALL_SKILLS.find((s) => s.id === "framer")!,
        ALL_SKILLS.find((s) => s.id === "tailwind")!,
        ALL_SKILLS.find((s) => s.id === "nextjs")!,
      ];
      const pocket = [
        ALL_SKILLS.find((s) => s.id === "javascript")!,
        ALL_SKILLS.find((s) => s.id === "css")!,
        ALL_SKILLS.find((s) => s.id === "canva")!,
      ];
      return { floatingSkills: floating.filter(Boolean), pocketSkills: pocket.filter(Boolean) };
    }

    if (category === "backend") {
      const floating = [
        ALL_SKILLS.find((s) => s.id === "mysql")!,
        ALL_SKILLS.find((s) => s.id === "python")!,
        ALL_SKILLS.find((s) => s.id === "django")!,
        ALL_SKILLS.find((s) => s.id === "nodejs")!,
        ALL_SKILLS.find((s) => s.id === "mongodb")!,
        ALL_SKILLS.find((s) => s.id === "postgresql")!,
        ALL_SKILLS.find((s) => s.id === "postman")!,
      ];
      const pocket = [
        ALL_SKILLS.find((s) => s.id === "git")!,
        ALL_SKILLS.find((s) => s.id === "vscode")!,
        ALL_SKILLS.find((s) => s.id === "github")!,
      ];
      return { floatingSkills: floating.filter(Boolean), pocketSkills: pocket.filter(Boolean) };
    }

    if (category === "ai") {
      const floating = [
        ALL_SKILLS.find((s) => s.id === "postgresql")!,
        ALL_SKILLS.find((s) => s.id === "python")!,
        ALL_SKILLS.find((s) => s.id === "react")!,
        ALL_SKILLS.find((s) => s.id === "ai-llm")!,
        ALL_SKILLS.find((s) => s.id === "nodejs")!,
        ALL_SKILLS.find((s) => s.id === "nextjs")!,
        ALL_SKILLS.find((s) => s.id === "flutter")!,
      ];
      const pocket = [
        ALL_SKILLS.find((s) => s.id === "django")!,
        ALL_SKILLS.find((s) => s.id === "git")!,
        ALL_SKILLS.find((s) => s.id === "vscode")!,
      ];
      return { floatingSkills: floating.filter(Boolean), pocketSkills: pocket.filter(Boolean) };
    }

    // tools & devops
    const floating = [
      ALL_SKILLS.find((s) => s.id === "postman")!,
      ALL_SKILLS.find((s) => s.id === "git")!,
      ALL_SKILLS.find((s) => s.id === "vscode")!,
      ALL_SKILLS.find((s) => s.id === "github")!,
      ALL_SKILLS.find((s) => s.id === "figma")!,
      ALL_SKILLS.find((s) => s.id === "nextjs")!,
      ALL_SKILLS.find((s) => s.id === "tailwind")!,
    ];
    const pocket = [
      ALL_SKILLS.find((s) => s.id === "python")!,
      ALL_SKILLS.find((s) => s.id === "react")!,
      ALL_SKILLS.find((s) => s.id === "typescript")!,
    ];
    return { floatingSkills: floating.filter(Boolean), pocketSkills: pocket.filter(Boolean) };
  }, [category]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSkill(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden select-none py-14 sm:py-18 bg-[#faecd2] text-[#225424]"
    >
      {/* Soft warm ambient lighting behind the folder */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 80%, rgba(240, 215, 175, 0.5) 0%, rgba(250, 236, 210, 0.1) 70%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean, minimal header matching Hero colorway */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.28em] text-[#225424]/80 sm:text-sm sm:tracking-[0.35em] font-medium">
            Skills
          </p>

          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#225424]">
            My Skills
          </h2>

          {/* Interactive Category Tabs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-1">
            {(
              [
                { id: "all", label: "✦ All Skills (22)" },
                { id: "frontend", label: "Frontend & UI" },
                { id: "backend", label: "Backend & Data" },
                { id: "ai", label: "AI & DevTools" },
                { id: "tools", label: "Tools & DevOps" },
              ] as const
            ).map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategorySelect(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-[#225424] text-[#faecd2] shadow-md shadow-[#225424]/20 scale-105"
                      : "bg-[#faecd2]/80 border border-[#dfcca4] text-[#225424]/80 hover:bg-[#faecd2] hover:border-[#225424]/40 shadow-xs"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STAGE WITH UNIFIED PIXEL-PERFECT COORDINATE SYSTEM
            Origin (0, 0) is the center of the folder opening.
            Plenty of headroom (mt-8 sm:mt-12) so floating cards NEVER collide with tabs!
            Scales responsively on mobile (scale 0.52 -> 0.66 -> 0.88 -> 1.0) so it fits any screen!
            ========================================================================= */}
        <div className="relative w-full max-w-4xl mx-auto h-[500px] sm:h-[550px] mt-8 sm:mt-12 flex items-end justify-center">
          {/* THE MOUTH ANCHOR (0, 0 is right at the top lip of the folder pocket) */}
          <div className="absolute left-1/2 bottom-[135px] sm:bottom-[150px] -translate-x-1/2 w-0 h-0 scale-[0.52] min-[390px]:scale-[0.66] sm:scale-[0.88] md:scale-100 transition-transform duration-300">
            {/* SVG CURVED TRACKS */}
            <svg
              key={`svg-${category}-${animKey}`}
              className="absolute left-0 top-0 overflow-visible pointer-events-none"
              style={{ width: 0, height: 0 }}
            >
              <defs>
                <linearGradient id="streamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#e89b87" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#e89b87" stopOpacity="0.35" />
                </linearGradient>
              </defs>

              {isAll ? (
                // 5 TRACKS FOR ALL 22 SKILLS
                <>
                  {/* Track 1: Far Left */}
                  <g className="path-draw-anim" style={{ animationDelay: "0ms" }}>
                    <path
                      d="M 0 -5 C -75 -25, -180 -40, -255 -210"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  {/* Track 2: Mid Left */}
                  <g className="path-draw-anim" style={{ animationDelay: "60ms" }}>
                    <path
                      d="M 0 -5 C -45 -35, -105 -95, -145 -225"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  {/* Track 3: Center */}
                  <g className="path-draw-anim" style={{ animationDelay: "120ms" }}>
                    <path
                      d="M 0 -5 C -12 -65, 12 -145, 0 -230"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  {/* Track 4: Mid Right */}
                  <g className="path-draw-anim" style={{ animationDelay: "180ms" }}>
                    <path
                      d="M 0 -5 C 45 -35, 105 -95, 145 -225"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  {/* Track 5: Far Right */}
                  <g className="path-draw-anim" style={{ animationDelay: "240ms" }}>
                    <path
                      d="M 0 -5 C 75 -25, 180 -40, 265 -235"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>

                  {/* Anchor Dots along all 5 tracks */}
                  {ALL_STREAM_SLOTS.map((slot) => (
                    <circle
                      key={`dot-${slot.id}`}
                      cx={slot.x}
                      cy={slot.y}
                      r="2.8"
                      fill="#e89b87"
                      opacity="0.8"
                    />
                  ))}
                </>
              ) : (
                // 3 CENTRAL TRACKS FOR INDIVIDUAL CATEGORIES
                <>
                  <g className="path-draw-anim" style={{ animationDelay: "0ms" }}>
                    <path
                      d="M 0 -5 C -35 -45, -95 -100, -130 -175"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <g className="path-draw-anim" style={{ animationDelay: "80ms" }}>
                    <path
                      d="M 0 -5 C -10 -55, 10 -125, 0 -205"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <g className="path-draw-anim" style={{ animationDelay: "140ms" }}>
                    <path
                      d="M 0 -5 C 35 -45, 105 -105, 155 -215"
                      stroke="url(#streamGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>

                  {CATEGORY_STREAM_SLOTS.map((slot) => (
                    <circle
                      key={`cdot-${slot.id}`}
                      cx={slot.x}
                      cy={slot.y}
                      r="3"
                      fill="#e89b87"
                      opacity="0.8"
                    />
                  ))}
                </>
              )}
            </svg>

            {/* FLOATING SQUIRCLE CARDS */}
            <div className="absolute left-0 top-0 pointer-events-none">
              {activeSlots.map((slot, index) => {
                const skill = floatingSkills[index];
                if (!skill) return null;

                const isHovered = hoveredSkillId === skill.id;
                const cardSizeClass = isAll
                  ? "w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-[16px] sm:rounded-[18px] p-2.5 sm:p-3"
                  : "w-[66px] h-[66px] sm:w-[74px] sm:h-[74px] rounded-[20px] sm:rounded-[22px] p-3 sm:p-3.5";

                return (
                  <div
                    key={`card-${skill.id}-${slot.id}-${category}-${animKey}`}
                    className="absolute pointer-events-auto cursor-pointer card-emerge-container"
                    style={
                      {
                        left: 0,
                        top: 0,
                        "--target-x": `${slot.x}px`,
                        "--target-y": `${slot.y}px`,
                        "--target-rot": `${slot.rot}deg`,
                        animationDelay: `${index * (isAll ? 38 : 60)}ms`,
                        zIndex: isHovered ? 50 : 25 + index,
                      } as React.CSSProperties
                    }
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => setHoveredSkillId(null)}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {/* Floating idle breathing wrapper */}
                    <div
                      className="relative group select-none idle-floating-wrapper"
                      style={{
                        animation: `${slot.floatType} 4.5s ease-in-out infinite`,
                        animationDelay: slot.floatDelay,
                      }}
                    >
                      {/* Floating Tooltip on Hover */}
                      <div
                        className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold shadow-lg transition-all duration-300 pointer-events-none z-50 flex items-center gap-1.5 bg-[#225424] text-[#faecd2] shadow-black/20 ${
                          isHovered
                            ? "opacity-100 -translate-y-1 scale-100"
                            : "opacity-0 translate-y-2 scale-90"
                        }`}
                      >
                        <span>{skill.name}</span>
                        <span className="opacity-70 text-[10px] font-mono">✦ {skill.badge}</span>
                      </div>

                      {/* The Squircle Tool Card */}
                      <div
                        className={`${cardSizeClass} bg-white flex items-center justify-center transition-all duration-300 ${
                          isHovered
                            ? "scale-120 -translate-y-2 shadow-2xl"
                            : "scale-100 shadow-xl"
                        }`}
                        style={{
                          transform: isHovered ? "scale(1.22)" : "scale(1)",
                          boxShadow: isHovered
                            ? `0 20px 40px -8px rgba(34, 84, 36, 0.22), 0 0 0 2px #225424, 0 10px 25px -5px ${skill.glowColor}`
                            : `0 12px 24px -6px rgba(34, 84, 36, 0.12), 0 4px 10px -2px rgba(34, 84, 36, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)`,
                        }}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          {skill.iconType === "image" && skill.iconSrc ? (
                            <Image
                              src={skill.iconSrc}
                              alt={skill.name}
                              width={36}
                              height={36}
                              className="object-contain max-w-[85%] max-h-[85%] transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="text-[#10a37f] transition-transform duration-300 group-hover:scale-110">
                              <AiIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* POCKET CARDS (Inside folder pocket, peeking out) */}
            <div className="absolute left-0 top-0 pointer-events-auto z-10">
              {POCKET_SLOTS.map((slot, index) => {
                const skill = pocketSkills[index];
                if (!skill) return null;
                const isHovered = hoveredSkillId === skill.id;

                return (
                  <div
                    key={`pocket-card-${skill.id}-${category}-${animKey}`}
                    className="absolute cursor-pointer transition-all duration-300 pocket-emerge-container"
                    style={
                      {
                        left: 0,
                        top: 0,
                        "--target-x": `${slot.x}px`,
                        "--target-y": `${slot.y}px`,
                        "--target-rot": `${slot.rot}deg`,
                        animationDelay: `${(isAll ? 38 * 19 : 420) + index * 60}ms`,
                        zIndex: isHovered ? 40 : 15 + index,
                      } as React.CSSProperties
                    }
                    onMouseEnter={() => setHoveredSkillId(skill.id)}
                    onMouseLeave={() => setHoveredSkillId(null)}
                    onClick={() => setSelectedSkill(skill)}
                    title={`Click to inspect ${skill.name}`}
                  >
                    {/* Mini Tooltip */}
                    <div
                      className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-md transition-all duration-300 pointer-events-none z-50 bg-[#225424] text-[#faecd2] ${
                        isHovered ? "opacity-100 -translate-y-1 scale-100" : "opacity-0 scale-90"
                      }`}
                    >
                      {skill.name}
                    </div>

                    {/* Squircle Card peeking out */}
                    <div
                      className="w-[60px] h-[60px] sm:w-[66px] sm:h-[66px] rounded-[18px] bg-white flex items-center justify-center p-2.5 shadow-lg border border-black/5"
                      style={{
                        boxShadow: isHovered
                          ? `0 16px 28px -6px rgba(0,0,0,0.25), 0 0 0 2px #e89b87`
                          : `0 8px 16px -4px rgba(0,0,0,0.15)`,
                      }}
                    >
                      {skill.iconType === "image" && skill.iconSrc ? (
                        <Image
                          src={skill.iconSrc}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="object-contain max-w-[85%] max-h-[85%]"
                        />
                      ) : (
                        <div className="text-[#10a37f]">
                          <AiIcon className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================================
              THE PHYSICAL PEACH FOLDER (CENTER BOTTOM)
              ===================================================================== */}
          <div
            className={`relative w-[270px] min-[390px]:w-[305px] sm:w-[330px] md:w-[360px] h-[175px] sm:h-[210px] transition-transform duration-500 ease-out select-none folder-haptic-pulse ${
              isFolderHovered ? "scale-102 -translate-y-1" : ""
            }`}
            style={{ marginBottom: "10px" }}
            onMouseEnter={() => setIsFolderHovered(true)}
            onMouseLeave={() => setIsFolderHovered(false)}
          >
            {/* 1. FOLDER BACK FLAP */}
            <div
              className="absolute inset-0 rounded-b-[28px] rounded-tr-[28px] rounded-tl-[16px] overflow-hidden"
              style={{
                background: "linear-gradient(150deg, #e49986 0%, #d48773 100%)",
                boxShadow: "0 20px 45px -10px rgba(120, 50, 35, 0.35)",
              }}
            >
              {/* Top-left tab shape extending upwards */}
              <div
                className="absolute top-0 left-0 w-32 h-7 rounded-t-xl"
                style={{
                  background: "linear-gradient(150deg, #ea9f8c 0%, #dc8f7b 100%)",
                  transform: "translateY(-100%)",
                  boxShadow: "0 -4px 12px rgba(120, 50, 35, 0.15)",
                }}
              >
                <div className="flex items-center gap-1.5 px-3 pt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8f4735]/60" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7e3b2a]">
                    STACK.V2
                  </span>
                </div>
              </div>

              {/* Pocket interior depth shadow */}
              <div
                className="absolute inset-x-0 bottom-0 h-36 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(95, 36, 24, 0.45) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* 2. FOLDER FRONT POCKET FLAP */}
            <div
              className="absolute inset-x-0 bottom-0 h-[135px] sm:h-[150px] rounded-b-[28px] rounded-t-[20px] z-20 flex flex-col justify-end p-5 sm:p-6 overflow-hidden pointer-events-none"
              style={{
                background: "linear-gradient(155deg, #f8c9b9 0%, #eaa895 100%)",
                boxShadow:
                  "inset 0 1px 1.5px rgba(255, 255, 255, 0.7), 0 18px 40px -8px rgba(120, 50, 35, 0.35)",
              }}
            >
              {/* Pocket top highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-3.5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent)",
                }}
              />

              {/* Debossed "Your Courses" matching reference photo */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold tracking-tight text-[#8c4734]"
                    style={{
                      fontFamily: "var(--font-geist), sans-serif",
                      textShadow: "0 1px 1px rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    Your Courses
                  </h3>
                  <p
                    className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#94513f]/75 mt-0.5"
                    style={{ textShadow: "0 1px 1px rgba(255, 255, 255, 0.3)" }}
                  >
                    SANGEETH SANTHOSH • 22 SKILLS
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/40 border border-white/50 text-[#8c4734] text-[10px] sm:text-xs font-semibold backdrop-blur-xs">
                  <FolderOpen className="w-3.5 h-3.5 text-[#8c4734]" />
                  <span>22 Tech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SKILL DOSSIER MODAL (WHEN A CARD IS CLICKED)
          ========================================================================= */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all duration-300 animate-scaleUp bg-[#faecd2] text-[#225424] border-[#dfcca4]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#225424]/10 transition-colors cursor-pointer text-[#225424]"
            >
              <X className="w-5 h-5 opacity-70 hover:opacity-100" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-lg border border-black/5"
                style={{
                  boxShadow: `0 12px 24px -4px ${selectedSkill.glowColor}`,
                }}
              >
                {selectedSkill.iconType === "image" && selectedSkill.iconSrc ? (
                  <Image
                    src={selectedSkill.iconSrc}
                    alt={selectedSkill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <div className="text-[#10a37f]">
                    <AiIcon className="w-10 h-10" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#225424]">
                    {selectedSkill.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#225424]/10 text-[#225424] font-bold">
                    {selectedSkill.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#225424]/70 mt-0.5">
                  {selectedSkill.categoryLabel} • {selectedSkill.proficiency}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#225424]/60 mb-1">
                Implementation & Architecture
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#225424]/90">
                {selectedSkill.desc}
              </p>
            </div>

            {/* Active Projects */}
            <div className="mt-6 pt-5 border-t border-[#dfcca4]">
              <h4 className="text-xs uppercase font-mono tracking-widest text-[#225424]/60 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#225424]" />
                Active In Projects
              </h4>

              <div className="flex flex-wrap gap-2">
                {selectedSkill.projects.map((proj) => (
                  <a
                    key={proj}
                    href="#project"
                    onClick={() => setSelectedSkill(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#faecd2]/80 hover:bg-[#faecd2] text-[#225424] border border-[#dfcca4] transition-all shadow-xs"
                  >
                    <span>{proj}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#225424] text-[#faecd2] hover:bg-[#1b431c] transition-colors cursor-pointer shadow-md shadow-[#225424]/20"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Animations for Emerge & Floating */}
      <style jsx global>{`
        /* Emerge animation: starts deep inside folder mouth (0, 0) and travels to (targetX, targetY) */
        @keyframes emergeCardAnim {
          0% {
            transform: translate(-50%, -50%) translate(0px, 20px) scale(0.12) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          75% {
            transform: translate(-50%, -50%)
              translate(calc(var(--target-x) * 1.04), calc(var(--target-y) * 1.04))
              scale(1.06) rotate(calc(var(--target-rot) + 1.5deg));
          }
          100% {
            transform: translate(-50%, -50%)
              translate(var(--target-x), var(--target-y))
              scale(1) rotate(var(--target-rot));
            opacity: 1;
          }
        }

        .card-emerge-container {
          animation: emergeCardAnim 0.68s cubic-bezier(0.16, 1.12, 0.3, 1) both;
        }

        /* Emerge for pocket cards */
        @keyframes emergePocketAnim {
          0% {
            transform: translate(-50%, -50%) translate(var(--target-x), 60px) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--target-x), var(--target-y)) scale(1) rotate(var(--target-rot));
            opacity: 1;
          }
        }

        .pocket-emerge-container {
          animation: emergePocketAnim 0.5s cubic-bezier(0.16, 1.15, 0.3, 1) both;
        }

        /* Dotted lines drawing outward */
        @keyframes drawDottedLineAnim {
          0% {
            stroke-dashoffset: 400;
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .path-draw-anim path {
          animation: drawDottedLineAnim 0.62s ease-out both;
        }

        /* Folder pulse on deal */
        @keyframes folderPulseAnim {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(0.975) translateY(3px);
          }
          65% {
            transform: scale(1.02) translateY(-2px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        .folder-haptic-pulse {
          animation: folderPulseAnim 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @media (max-width: 768px), (hover: none) {
          .idle-floating-wrapper {
            animation: none !important;
          }
        }

        /* Idle float physics */
        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1.2deg);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(-1.4deg);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-7px) rotate(1.6deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.22s ease-out forwards;
        }

        .animate-scaleUp {
          animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
