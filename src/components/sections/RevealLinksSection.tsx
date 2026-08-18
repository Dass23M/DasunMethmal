"use client";

import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipLinkProps {
  children: string;
  href: string;
}

const FlipLink = ({ children, href }: FlipLinkProps) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-6xl md:text-7xl lg:text-8xl py-2 text-white hover:text-[#FF6B00] transition-colors duration-300 select-none"
      style={{
        lineHeight: 0.85,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
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
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
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
    </motion.a>
  );
};

export default function RevealLinksSection() {
  const SOCIAL_LINKS = [
    { label: "Linkedin", href: "https://www.linkedin.com/in/dasun-methmal-607333230" },
    { label: "Github", href: "https://github.com/Dass23M" },
    { label: "Instagram", href: "https://www.instagram.com/_dase23_" },
    { label: "TikTok", href: "https://www.tiktok.com/@dcode33" },
    { label: "Facebook", href: "https://www.facebook.com/share/19NZDkGEqc" },
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
        <div className="flex flex-col items-start space-y-3 sm:space-y-4">
          {SOCIAL_LINKS.map((link) => (
            <FlipLink key={link.label} href={link.href}>
              {link.label}
            </FlipLink>
          ))}
        </div>
      </div>
    </section>
  );
}
