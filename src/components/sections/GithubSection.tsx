'use client';

import { useState, useEffect } from 'react';
import GithubCalendar from '@/components/ui/GithubCalendar';

export default function GithubSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="w-full min-h-[340px] bg-[#080808]" />;
  }

  return (
    <section
      id="github-section"
      className="w-full bg-[#080808] text-white py-20 sm:py-28 border-t border-dashed border-white/[0.12] select-none"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-dashed border-white/[0.12]">
          <div>
            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-zinc-400 block mb-2">
              [OPEN SOURCE ACTIVITY]
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight">
              GitHub <span className="text-[#9CFF00]">Commits</span>
            </h2>
          </div>

          <a
            href="https://github.com/Dass23M"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-zinc-400 hover:text-[#9CFF00] transition-colors"
          >
            <span>@Dass23M</span>
            <span className="text-[#9CFF00]">↗</span>
          </a>
        </div>

        <div className="w-full flex justify-center overflow-x-auto">
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
