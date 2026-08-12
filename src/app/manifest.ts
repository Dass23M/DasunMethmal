import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dasun Methmal | Full-Stack Developer & Digital Marketer",
    short_name: "Dasun Methmal",
    description:
      "Official portfolio of Dasun Methmal, a Software Engineering graduate, Full-Stack Developer, and Digital Marketer specializing in modern web applications, digital marketing, SEO, and AI-powered solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0B",
    theme_color: "#FF6B00",
  };
}