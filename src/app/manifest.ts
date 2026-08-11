import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dasun Methmal | Software Engineer & Full-Stack Developer",

    short_name: "Dasun Methmal",

    description:
      "Official portfolio of Dasun Methmal, a Software Engineering graduate and Full-Stack Developer specializing in modern web applications, AI, and machine learning.",

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
    ],
  };
}
