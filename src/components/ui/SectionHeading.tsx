'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * High-End Luxury Editorial Section Heading
 * Features:
 * - Dynamic scroll-triggered beam draw
 * - Kinetic typography with letter-spacing settling
 * - Radar pulse live beacon
 * - Frosted glass meta pill with glow
 */
interface SectionHeadingProps {
  title: string;
  meta?: string;
  theme?: 'dark' | 'light';
  className?: string;
  subtitle?: string;
  category?: string;
}

export default function SectionHeading({
  title,
  meta = '©2026',
  className = '',
  subtitle,
  category,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`w-full mb-10 sm:mb-16 relative ${className}`}
    >
      {/* Category Tag with Cyber Pulse */}
      {category && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
          }}
          className="flex items-center gap-2 mb-2.5"
        >
          <span className="font-mono text-[11px] sm:text-xs font-bold text-[#FF8A00] tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] animate-pulse shadow-[0_0_8px_#FF8A00]" />
            {'// ' + category}
          </span>
        </motion.div>
      )}

      {/* Main Title Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-bold tracking-widest uppercase">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -16 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
          }}
          className="flex items-center gap-3.5"
        >
          {/* Radar Beacon */}
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A00] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-tr from-[#FF6B00] to-[#FFAA00] shadow-[0_0_12px_#FF8A00]" />
          </span>

          {/* Heading Text */}
          <h2 className="font-display tracking-[0.14em] sm:tracking-[0.18em] text-lg sm:text-2xl md:text-3xl font-extrabold text-white leading-none uppercase drop-shadow-md">
            {title}
          </h2>
        </motion.div>

        {/* Year Meta Glass Chip */}
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
          }}
          className="font-mono text-[11px] sm:text-xs font-semibold text-zinc-400 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-sm"
        >
          {meta}
        </motion.span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25 } },
          }}
          className="mt-3 text-xs sm:text-sm md:text-base text-zinc-400 font-body max-w-2xl leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated Bottom Laser Beam Divider */}
      <div className="relative mt-5 sm:mt-6 w-full h-[1px] bg-white/[0.08] overflow-hidden">
        <motion.div
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 } },
          }}
          className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] via-[#FFAA00] to-transparent w-full h-full"
        />
        <motion.div
          variants={{
            hidden: { left: '-10%' },
            visible: { left: '100%', transition: { duration: 1.4, ease: 'easeInOut', delay: 0.3 } },
          }}
          className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
        />
      </div>
    </motion.div>
  );
}
