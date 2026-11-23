'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
  className = '',
  subtitle,
  category,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`w-full mb-12 sm:mb-16 relative ${className}`}
    >
      {category && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: -6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
          }}
          className="font-mono text-[11px] font-medium text-[#FF6B00] tracking-[0.18em] uppercase mb-3"
        >
          {category}
        </motion.p>
      )}

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          },
        }}
        className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 leading-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
          }}
          className="mt-3 text-sm sm:text-base text-zinc-600 font-body max-w-xl leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      )}

      <div className="relative mt-6 w-full h-px bg-zinc-200">
        <motion.div
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
            },
          }}
          className="absolute inset-y-0 left-0 w-16 bg-[#FF6B00]"
        />
      </div>
    </motion.div>
  );
}
