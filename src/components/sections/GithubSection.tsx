'use client';

import { useState, useEffect } from 'react';
import GithubCalendar from '@/components/ui/GithubCalendar';

export default function GithubSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="w-full min-h-[400px] bg-gray-50 dark:bg-[#080808]" />;
  }

  return (
    <section
      id="github-section"
      className="w-full bg-black text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-12 select-none relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF8A00] uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] radar-pulse" />
              <span>{"// CODE & OPEN SOURCE"}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight">
              GitHub <span className="text-gradient-amber">Activity</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body text-xs sm:text-sm md:text-base text-white/70 leading-relaxed mb-4 font-light">
              Real-time contribution telemetry, continuous commits, and open-source software development tracked directly from my GitHub profile.
            </p>
            <a
              href="https://github.com/Dass23M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#FF8A00] hover:text-white transition-colors group"
            >
              <span className="border-b border-[#FF8A00]/40 group-hover:border-[#FF8A00]">VIEW FULL PROFILE @Dass23M</span>
              <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>
        </div>

        {/* GitHub Calendar Container with Glassmorphism */}
        <div className="glass-card-premium rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="w-full flex justify-center overflow-x-auto py-2">
            <GithubCalendar
              username="Dass23M"
              cellShape="rounded"
              cellSize={13}
              cellGap={3}
              startsOnSunday={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
