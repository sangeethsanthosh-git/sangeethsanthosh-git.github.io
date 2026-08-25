export type TextSegmentTone = "default" | "accent" | "strong";

export interface TextSegment {
  text: string;
  tone?: TextSegmentTone;
}

export interface SkillCategory {
  category: string;
  items: Array<{
    name: string;
    icon: string;
  }>;
}

export interface ProjectItem {
  title: string;
  description: string;
  status: "completed" | "working";
  backdropDesktop: string;
  backdropMobile?: string;
  preview: string;
  before?: string;
  after?: string;
  github?: string;
  live?: string;
  notice?: string;
}

export interface WorkItem {
  title: string;
  subtitle: string;
  info: string;
  image: string;
  overlayOpacity: number;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const navigation = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "project", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Hi I'm",
  title: "Sangeeth Santhosh",
  subtitle: "Web Developer",
  rotatingRoles: [
    "Web Developer",
    "AI Builder",
    "Freelance Engineer",
    "Creative Technologist",
  ],
  backgroundWord: "PORTFOLIO",
  sideLabel: "Explore",
  sideNote: "DEV",
  scrollLabel: "Scroll Down",
};

export const about = {
  backgroundImage: "/images/about.jpg",
  intro: [
    { text: "I'm a " },
    { text: "Full-Stack Developer", tone: "accent" },
    {
      text: " with a passion for creating digital solutions that are both functional and visually engaging. From ",
    },
    { text: "sleek user interfaces to reliable backends", tone: "accent" },
    { text: ", I focus on building products that deliver " },
    { text: "clarity, performance, and impact", tone: "strong" },
    { text: "." },
  ] satisfies TextSegment[],
  summary: [
    { text: "My approach blends " },
    {
      text: "clean code, thoughtful design, and curiosity-driven problem solving",
      tone: "strong",
    },
    { text: ". For me, development isn't just about building websites — " },
    { text: "it's about crafting digital experiences that matter", tone: "accent" },
    { text: "." },
  ] satisfies TextSegment[],
  ctaLabel: "See My Work",
  ctaHref: "#project",
};

export const education = [
  {
    year: "2025 – Pursuing",
    degree: "Master of Computer Applications",
    place: "APJ Abdul Kalam Technological University",
  },
  {
    year: "2022 – 2025",
    degree: "Bachelor of Science in Computer Science",
    place: "Kerala University",
  },
  {
    year: "2021 – 2022",
    degree: "High School",
    place: "Central Board of Secondary Education",
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Frontend & Design",
    items: [
      { name: "HTML", icon: "/skills/html.png" },
      { name: "CSS", icon: "/skills/css.png" },
      { name: "JavaScript", icon: "/skills/javascript.png" },
      { name: "React.js", icon: "/skills/react.png" },
      { name: "Next.js", icon: "/skills/nextjs.png" },
      { name: "TypeScript", icon: "/skills/typescript.png" },
      { name: "Tailwind CSS", icon: "/skills/tailwind.png" },
      { name: "Framer Motion", icon: "/skills/framer.png" },
      { name: "Figma", icon: "/skills/figma.png" },
      { name: "Canva", icon: "/skills/canva.png" },
    ],
  },
  {
    category: "Backend & Workflow",
    items: [
      { name: "Python", icon: "/skills/python.png" },
      { name: "Django", icon: "/skills/django.png" },
      { name: "Node.js", icon: "/skills/nodejs.png" },
      { name: "MySQL", icon: "/skills/mysql.png" },
      { name: "PostgreSQL", icon: "/skills/postgresql.png" },
      { name: "Postman", icon: "/skills/postman.png" },
      { name: "Git", icon: "/skills/git.png" },
      { name: "GitHub", icon: "/skills/github.png" },
      { name: "VS Code", icon: "/skills/vscode.png" },
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Cartoonizer AI",
    description:
      "AI-powered image and video stylization using OpenCV bilateral filtering and edge quantization, running entirely on CPU without heavy GPU servers.",
    backdropDesktop: "/images/cartoon.jpg",
    backdropMobile: "/images/cartoon-mb.jpj",
    preview: "/images/cartoon.jpg",
    before: "/images/before.jpeg",
    after: "/images/after.jpg",
    github: "https://github.com/sangeethsanthosh-git/Cartoonizer",
    live: "https://github.com/sangeethsanthosh-git/Cartoonizer",
    status: "completed",
  },
  {
    title: "Gistify AI",
    description:
      "Turns lengthy documents and research papers into clear summaries, extracted entities, and action plans with sub-second conversational document Q&A.",
    backdropDesktop: "/images/gistify.webp",
    backdropMobile: "/images/gistify-mb.webp",
    preview: "/images/gistify.webp",
    github: "https://github.com/sangeethsanthosh-git",
    live: "https://gistify-c.vercel.app/",
    status: "completed",
  },
  {
    title: "VidScoop",
    description:
      "Lightweight YouTube stream extractor and multi-format batch media conversion tool built for fast audio/video extractions.",
    notice:
      "Educational use only. Downloading copyrighted content without permission may violate YouTube's terms of service.",
    backdropDesktop: "/images/youtube.webp",
    backdropMobile: "/images/youtube-mb.webp",
    preview: "/images/youtube.webp",
    github: "https://github.com/sangeethsanthosh-git",
    live: "https://github.com/sangeethsanthosh-git",
    status: "working",
  },
  {
    title: "AeroSense",
    description:
      "Predictive weather tracking, live meteorological visualizations, and real-time Air Quality Index (AQI) alerts powered by OpenWeather APIs.",
    backdropDesktop: "/images/aerosense.webp",
    backdropMobile: "/images/aerosense.webp",
    preview: "/images/aerosense.webp",
    github: "https://github.com/sangeethsanthosh-git/AEROSENSE",
    live: "https://github.com/sangeethsanthosh-git/AEROSENSE",
    status: "completed",
  },
  {
    title: "EchoNotes",
    description:
      "Seamless speech-to-text note capture engine designed with web audio processing for rapid thought recording and effortless transcriptions.",
    backdropDesktop: "/images/echonotes.webp",
    backdropMobile: "/images/echonotes-mb.webp",
    preview: "/images/echonotes.webp",
    github: "https://github.com/sangeethsanthosh-git",
    live: "https://github.com/sangeethsanthosh-git",
    status: "working",
  },
  {
    title: "Portfolio V1",
    description:
      "Personal developer and designer portfolio crafted with Next.js, Tailwind CSS, and fluid motion systems showcasing interactive digital experiences.",
    backdropDesktop: "/images/portfolio.webp",
    backdropMobile: "/images/portfolio-mb.webp",
    preview: "/images/portfolio.webp",
    github: "https://github.com/sangeethsanthosh-git/sangeethsanthosh-git.github.io",
    live: "https://sangeethsanthosh-git.github.io/",
    status: "completed",
  },
  {
    title: "Profile README",
    description:
      "GitHub profile repository for presenting developer identity, links, and project highlights directly on the profile page.",
    backdropDesktop: "/images/profile-readme.jpg",
    preview: "/images/profile-readme.jpg",
    github: "https://github.com/sangeethsanthosh-git/sangeethsanthosh-git",
    status: "completed",
  },
  {
    title: "Demo",
    description:
      "A trial repository used for GitHub workflow practice, version control experiments, and repository setup learning.",
    backdropDesktop: "/images/file-integrity.jpg",
    preview: "/images/file-integrity.jpg",
    github: "https://github.com/sangeethsanthosh-git/demo",
    status: "completed",
  },
  {
    title: "File Integrity",
    description:
      "A file integrity focused project for checking content consistency and exploring browser-based security utility workflows.",
    backdropDesktop: "/images/kerala-tourism.jpg",
    preview: "/images/kerala-tourism.jpg",
    github: "https://github.com/sangeethsanthosh-git/file-integrity",
    status: "completed",
  },
  {
    title: "Kerala Tourism",
    description:
      "A tourism website concept showcasing Kerala through structured pages, visual content, and simple frontend presentation.",
    backdropDesktop: "/images/website-traffic-analyzer.jpg",
    preview: "/images/website-traffic-analyzer.jpg",
    github: "https://github.com/sangeethsanthosh-git/kerala-tourism",
    status: "completed",
  },
  {
    title: "Website Traffic Analyzer",
    description:
      "A web traffic analysis project exploring how website activity can be presented and understood through a simple frontend interface.",
    backdropDesktop: "/images/edusense.jpg",
    preview: "/images/edusense.jpg",
    github: "https://github.com/sangeethsanthosh-git/website-traffic-analyzer",
    status: "completed",
  },
  {
    title: "Edusense",
    description:
      "Lecture assistant built with Flask for education-focused workflows, helping turn learning material into more useful study support.",
    backdropDesktop: "/images/ai-budget-planner.jpg",
    preview: "/images/ai-budget-planner.jpg",
    github: "https://github.com/sangeethsanthosh-git/Edusense",
    status: "completed",
  },
  {
    title: "AI Budget Planner",
    description:
      "Flask-based AI budget planner with expense forecasting and local insights for making personal finance decisions easier to understand.",
    backdropDesktop: "/images/pcod-detection.jpg",
    preview: "/images/pcod-detection.jpg",
    github: "https://github.com/sangeethsanthosh-git/ai-budget-planner",
    status: "completed",
  },
  {
    title: "PCOD Detection System",
    description:
      "PCOS clinical support platform with AI-assisted detection workflows and desktop executable packaging.",
    backdropDesktop: "/images/finley-keycoders.jpg",
    preview: "/images/finley-keycoders.jpg",
    github: "https://github.com/sangeethsanthosh-git/PCOD-Detection-System",
    status: "completed",
  },
  {
    title: "AeroSense Mactrons",
    description:
      "A notebook-based AeroSense project exploring weather, air-quality, and environmental data workflows.",
    backdropDesktop: "/images/aerosense.webp",
    preview: "/images/aerosense.webp",
    github: "https://github.com/sangeethsanthosh-git/AEROSENSE-MACTRONS",
    status: "completed",
  },
  {
    title: "ICT",
    description:
      "Notebook repository for ICT coursework, experiments, and data-oriented learning exercises.",
    backdropDesktop: "/images/portfolio.webp",
    preview: "/images/portfolio.webp",
    github: "https://github.com/sangeethsanthosh-git/ICT",
    status: "completed",
  },
  {
    title: "Finley Keycoders",
    description:
      "JavaScript web project repository built as part of the Finley Keycoders work.",
    backdropDesktop: "/images/portfolio.webp",
    preview: "/images/portfolio.webp",
    github: "https://github.com/sangeethsanthosh-git/FINLEY-KEYCODERS",
    status: "completed",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Web Development",
    description: "Responsive websites built with modern frontend and full-stack tooling.",
  },
  {
    title: "UI Design",
    description: "Clean, user-focused interfaces with attention to hierarchy and clarity.",
  },
  {
    title: "SEO Basics",
    description: "On-page structure, metadata, and content improvements for better discoverability.",
  },
  {
    title: "Branding Support",
    description: "Visual direction and lightweight identity work for personal and client projects.",
  },
  {
    title: "Performance",
    description: "Faster experiences through cleaner components, lighter motion, and better asset use.",
  },
];

export const work: WorkItem[] = [
  {
    title: "Client Website Builds",
    subtitle: "Tailored • Business • Website",
    info: "Custom websites for clients who need a dependable online presence.",
    image: "/images/service2.png",
    overlayOpacity: 0.28,
  },
  {
    title: "Portfolio Site Building",
    subtitle: "Design • Develop • Deploy",
    info: "Personal and freelance portfolio sites that highlight skills and projects clearly.",
    image: "/images/service1.png",
    overlayOpacity: 0.28,
  },
  {
    title: "E-commerce Website",
    subtitle: "Shopify • WooCommerce • Custom",
    info: "Storefront experiences tailored for local businesses and product-focused brands.",
    image: "/images/service3.png",
    overlayOpacity: 0.4,
  },
  {
    title: "Teaching Assistance",
    subtitle: "One-on-One Concept Clarification",
    info: "Support with logic, implementation, project walkthroughs, and debugging.",
    image: "/images/service4.png",
    overlayOpacity: 0.32,
  },
];

export const experience = {
  title: "Freelancer",
  summary:
    "Half poet, half developer, and fully focused on building digital experiences that feel thoughtful, useful, and easy to use.",
};

export const socials = {
  title: "Get In Touch",
  heading: "Connect With Me",
  description:
    "Open to freelance work, collaborations, and product-focused conversations.",
  emailHref:
    "mailto:sangeethsanthoshsaa@gmail.com?subject=Hi%20Sangeeth",
  copyrightName: "sangeethsanthoshsa",
  links: [
    {
      label: "Email",
      href: "mailto:sangeethsanthoshsaa@gmail.com?subject=Hi%20Sangeeth",
      icon: "/icons/gmail.png",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sangeethsanthoshsa",
      icon: "/icons/linkedin.png",
    },
    {
      label: "Fiverr",
      href: "https://www.fiverr.com/s/Zmb6R7l",
      icon: "/icons/fiverr.svg",
    },
    { label: "Instagram", href: "https://instagram.com", icon: "/icons/instagram.png" },
    {
      label: "GitHub",
      href: "https://github.com/sangeethsanthosh-git",
      icon: "/icons/github.png",
    },
    { label: "Twitter/X", href: "https://twitter.com/sangeeth_saa", icon: "/icons/x.png" },
  ] satisfies SocialLink[],
};

