'use client';

import { useState, useEffect } from 'react';
import GithubCalendar from '@/components/ui/GithubCalendar';

export default function GithubSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="w-full min-h-[400px] bg-[#07080B]" />;
  }

  return (
    <section
      id="github-section"
      className="w-full bg-[#07080B] luxury-mesh-bg text-white py-20 sm:py-28 px-4 sm:px-8 lg:px-12 select-none relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF8A00]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold text-[#FF8A00] uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] radar-pulse shadow-[0_0_8px_#FF8A00]" />
              <span>{"// CODE & OPEN SOURCE TELEMETRY"}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-tight">
              GitHub <span className="text-gradient-amber animate-shimmer-text">Activity</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed mb-4 font-light">
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

        {/* GitHub Calendar Container with Obsidian Glass */}
        <div className="obsidian-surface rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
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
