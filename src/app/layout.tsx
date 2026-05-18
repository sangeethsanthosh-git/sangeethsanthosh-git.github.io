import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import MouseSpotlight from "@/components/MouseSpotlight";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sangeeth Santhosh | Web Developer & Designer",
  description:
    "Portfolio of Sangeeth Santhosh, a web developer building thoughtful digital experiences with React, Next.js, Python, Django, and modern UI systems.",
  keywords: [
    "Sangeeth Santhosh",
    "web developer",
    "Next.js portfolio",
    "React developer",
    "Tailwind CSS",
    "Python developer",
    "Django developer",
    "full-stack developer",
    "frontend developer",
    "freelancer",
  ],
  authors: [
    {
      name: "Sangeeth Santhosh",
      url: "https://sangeethsanthosh-git.github.io",
    },
  ],
  openGraph: {
    title: "Sangeeth Santhosh | Developer & Designer",
    description:
      "Explore projects, services, and experience from Sangeeth Santhosh across frontend, backend, and UI-focused work.",
    url: "https://sangeethsanthosh-git.github.io",
    siteName: "sangeethsanthosh-git.github.io",
    images: [
      {
        url: "https://sangeethsanthosh-git.github.io/images/about.jpg",
        width: 1200,
        height: 630,
        alt: "Sangeeth Santhosh Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangeeth Santhosh | Web Developer & Designer",
    description: "Portfolio website of Sangeeth Santhosh showcasing development and design work.",
    creator: "@sangeeth_saa",
    images: ["https://sangeethsanthosh-git.github.io/images/about.jpg"],
  },
  metadataBase: new URL("https://sangeethsanthosh-git.github.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <MouseSpotlight />
        {children}
      </body>
    </html>
  );
}
