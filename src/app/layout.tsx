import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#165036" },
    { media: "(prefers-color-scheme: dark)", color: "#0a110d" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sangeethsanthosh-git.github.io"),
  title: {
    default: "Sangeeth Santhosh | Full-Stack Developer & Creative Technologist",
    template: "%s | Sangeeth Santhosh",
  },
  description:
    "Official portfolio of Sangeeth Santhosh, a Full-Stack Web & Mobile Developer and Creative Technologist building high-performance web apps, Flutter mobile apps, Python backends, and thoughtful interactive digital experiences.",
  keywords: [
    "Sangeeth Santhosh",
    "Sangeeth Santhosh Portfolio",
    "Full-Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Flutter App Developer",
    "Python Developer",
    "Django Developer",
    "Creative Technologist",
    "UI UX Designer",
    "Frontend Developer Kerala",
    "Kochi Web Developer",
    "Freelance Software Engineer",
    "Interactive Portfolio",
    "sangeethsanthosh-git",
  ],
  authors: [
    {
      name: "Sangeeth Santhosh",
      url: "https://sangeethsanthosh-git.github.io",
    },
  ],
  creator: "Sangeeth Santhosh",
  publisher: "Sangeeth Santhosh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sangeeth Santhosh | Full-Stack Developer & Creative Technologist",
    description:
      "Explore the interactive portfolio, mobile apps, Flutter showcases, and full-stack software built by Sangeeth Santhosh.",
    url: "https://sangeethsanthosh-git.github.io",
    siteName: "Sangeeth Santhosh Portfolio",
    images: [
      {
        url: "/images/portfolio.webp",
        width: 1200,
        height: 630,
        alt: "Sangeeth Santhosh Portfolio Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangeeth Santhosh | Full-Stack Developer & Creative Technologist",
    description:
      "Explore the interactive portfolio, mobile apps, Flutter showcases, and full-stack software built by Sangeeth Santhosh.",
    creator: "@sangeeth_saa",
    images: ["/images/portfolio.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/apps/github-icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/images/apps/phone-icon.svg" },
    ],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={`${geist.variable} antialiased bg-black text-white selection:bg-[#fed78a] selection:text-[#165036]`}>
        {children}
      </body>
    </html>
  );
}
