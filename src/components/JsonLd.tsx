import React from "react";

export default function JsonLd(): React.ReactElement {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://sangeethsanthosh-git.github.io/#person",
    name: "Sangeeth Santhosh",
    alternateName: ["sangeethsanthosh-git", "Sangeeth", "sangeethsanthoshsa"],
    url: "https://sangeethsanthosh-git.github.io",
    image: "https://sangeethsanthosh-git.github.io/images/about.jpg",
    jobTitle: "Full-Stack Web & Mobile Developer",
    description:
      "Full-Stack Developer and Creative Technologist specializing in Next.js, React, Flutter, Python, Django, and modern interactive UI systems.",
    email: "mailto:sangeethsanthoshsaa@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "APJ Abdul Kalam Technological University",
      },
      {
        "@type": "EducationalOrganization",
        name: "Kerala University",
      },
    ],
    sameAs: [
      "https://github.com/sangeethsanthosh-git",
      "https://www.linkedin.com/in/sangeethsanthoshsa",
      "https://twitter.com/sangeeth_saa",
      "https://www.fiverr.com/s/Zmb6R7l",
    ],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
      "Dart",
      "Python",
      "Django",
      "Flask",
      "Machine Learning",
      "UI/UX Design",
      "REST APIs",
      "Full-Stack Engineering",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sangeethsanthosh-git.github.io/#website",
    url: "https://sangeethsanthosh-git.github.io",
    name: "Sangeeth Santhosh Portfolio",
    description:
      "Interactive portfolio of Sangeeth Santhosh showcasing full-stack web applications, Flutter mobile apps, AI engineering projects, and UI design showcases.",
    author: {
      "@id": "https://sangeethsanthosh-git.github.io/#person",
    },
    inLanguage: "en-US",
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services Offered by Sangeeth Santhosh",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "Web Development",
        description:
          "Responsive websites and progressive web apps built with modern frontend and full-stack tooling including React and Next.js.",
        provider: {
          "@id": "https://sangeethsanthosh-git.github.io/#person",
        },
      },
      {
        "@type": "Service",
        position: 2,
        name: "UI Design",
        description:
          "Clean, user-focused interfaces with meticulous attention to visual hierarchy, typography, and motion clarity.",
        provider: {
          "@id": "https://sangeethsanthosh-git.github.io/#person",
        },
      },
      {
        "@type": "Service",
        position: 3,
        name: "SEO Basics & Optimization",
        description:
          "On-page structure, metadata, schema markup, performance optimization, and content discoverability.",
        provider: {
          "@id": "https://sangeethsanthosh-git.github.io/#person",
        },
      },
      {
        "@type": "Service",
        position: 4,
        name: "Branding Support",
        description:
          "Visual identity direction, color systems, and modern digital asset design for products and personal brands.",
        provider: {
          "@id": "https://sangeethsanthosh-git.github.io/#person",
        },
      },
      {
        "@type": "Service",
        position: 5,
        name: "Performance Engineering",
        description:
          "Faster load speeds through lightweight motion, code splitting, optimized assets, and 60 FPS mobile rendering.",
        provider: {
          "@id": "https://sangeethsanthosh-git.github.io/#person",
        },
      },
      {
        "@type": "Service",
        position: 6,
        name: "Full-Stack Code & APIs",
        description:
          "Robust end-to-end software connecting modern web interfaces, mobile clients, databases, and secure APIs.",
        provider: {
          "@id": "https://sangeethsanthosh-git.github.io/#person",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
    </>
  );
}
