import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dasun Methmal | Full-Stack Developer & Digital Marketer",
    short_name: "Dasun Methmal",
    description:
      "Official portfolio of Dasun Methmal, a Software Engineering graduate, Full-Stack Developer, and Digital Marketer specializing in modern web applications, digital marketing, SEO, and AI-powered solutions.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0A0A0B",
    theme_color: "#FF6B00",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}