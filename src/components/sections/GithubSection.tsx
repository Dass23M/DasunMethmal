'use client';

import { useState, useEffect } from 'react';
import GithubCalendar from '@/components/ui/GithubCalendar';

export default function GithubSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="w-full min-h-[400px] bg-[#080808]" />;
  }

  return (
    <section
      id="github-section"
      className="w-full bg-[#080808] text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-12 select-none relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF6B00] uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>{"// CODE & OPEN SOURCE"}</span>
            </div>
            <h2 className="font-sora font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight">
              GitHub <span className="text-[#FF6B00]">Activity</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-inter text-xs sm:text-sm md:text-base text-white/70 leading-relaxed mb-4">
              Real-time contribution graph, commits, and open-source code activity tracked directly from my GitHub profile.
            </p>
            <a
              href="https://github.com/Dass23M"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#FF6B00] hover:text-white transition-colors"
            >
              <span>VIEW FULL PROFILE @Dass23M</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* GitHub Calendar Container */}
        <div className="w-full flex justify-center overflow-x-auto py-4">
          <GithubCalendar
            username="Dass23M"
            cellShape="rounded"
            cellSize={13}
            cellGap={3}
            startsOnSunday={true}
          />
        </div>
      </div>
    </section>
  );
}
