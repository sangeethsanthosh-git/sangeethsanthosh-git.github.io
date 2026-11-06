import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sangeeth Santhosh | Full-Stack Developer & Designer",
    short_name: "Sangeeth",
    description:
      "Official portfolio of Sangeeth Santhosh, a Full-Stack Web & Mobile Developer and Creative Technologist building thoughtful digital experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a110d",
    theme_color: "#165036",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/apps/github-icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/images/apps/phone-icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
