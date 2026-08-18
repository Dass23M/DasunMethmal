"use client";

import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  label: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
}

const FlipLink = ({ label, handle, href, icon }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between w-full py-4 sm:py-6 border-b border-white/10 text-white hover:text-[#FF6B00] transition-colors duration-300 select-none"
    >
      {/* Left side: Icon Badge + Giant Text */}
      <div className="flex items-center gap-4 sm:gap-8 overflow-hidden">
        {/* Animated Icon Pill */}
        <motion.div
          variants={{
            initial: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.06)", color: "#FFFFFF" },
            hovered: { scale: 1.1, backgroundColor: "#FF6B00", color: "#000000" },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-11 h-11 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/15 shadow-md"
        >
          {icon}
        </motion.div>

        {/* Text Flip Reveal Container */}
        <div
          className="relative block overflow-hidden whitespace-nowrap text-3xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ lineHeight: 0.9 }}
        >
          <div>
            {label.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-100%" },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className="inline-block"
                key={i}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
          </div>
          <div className="absolute inset-0">
            {label.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className="inline-block text-[#FF6B00]"
                key={i}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Handle & Animated Arrow Badge */}
      <div className="hidden sm:flex items-center gap-3 font-mono text-xs sm:text-sm text-white/50 group-hover:text-white transition-colors duration-300">
        <span>{handle}</span>
        <motion.span
          variants={{
            initial: { x: 0, y: 0 },
            hovered: { x: 4, y: -4 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#FF6B00] group-hover:border-[#FF6B00] group-hover:text-black flex items-center justify-center text-sm font-bold transition-colors duration-300"
        >
          ↗
        </motion.span>
      </div>
    </motion.a>
  );
};

export default function RevealLinksSection() {
  const SOCIAL_LINKS: FlipLinkProps[] = [
    {
      label: "LinkedIn",
      handle: "@dasun-methmal",
      href: "https://www.linkedin.com/in/dasun-methmal-607333230",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      handle: "@Dass23M",
      href: "https://github.com/Dass23M",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      label: "Instagram",
      handle: "@_dase23_",
      href: "https://www.instagram.com/_dase23_",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "TikTok",
      handle: "@dcode33",
      href: "https://www.tiktok.com/@dcode33",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.83.12V9.37a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.63a6.34 6.34 0 0 0 10.82 4.47V10.4a8.28 8.28 0 0 0 5.77 2.29v-3.45a4.85 4.85 0 0 1-4-.01z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      handle: "Dasun Methmal",
      href: "https://www.facebook.com/share/19NZDkGEqc",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="social-reveal-links" className="w-full bg-[#080808] text-white py-16 sm:py-24 px-6 sm:px-12 lg:px-20 select-none">
      <div className="max-w-[1550px] mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest mb-8 pb-4">
          <span className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            {"// CONNECT & SOCIAL CHANNELS"}
          </span>
          <span>EST. 2023</span>
        </div>

        {/* Flip Links Grid */}
        <div className="flex flex-col items-start w-full">
          {SOCIAL_LINKS.map((link) => (
            <FlipLink key={link.label} label={link.label} handle={link.handle} href={link.href} icon={link.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

