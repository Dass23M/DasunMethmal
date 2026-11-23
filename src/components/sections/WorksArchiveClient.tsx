'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { portfolioItems } from '@/data/portfolio';

const FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'full-stack', label: 'FULL-STACK' },
  { id: 'healthcare', label: 'ENTERPRISE' },
  { id: 'marketing', label: 'GROWTH' },
];

export default function WorksArchiveClient() {
  const [filter, setFilter] = useState('all');

  const filtered = portfolioItems.filter((item) => {
    if (filter === 'all') return true;
    const cats = item.categories.toLowerCase();
    if (filter === 'ai') return cats.includes('ai') || cats.includes('machine learning');
    if (filter === 'full-stack') return cats.includes('full-stack') || cats.includes('next.js');
    if (filter === 'healthcare') return cats.includes('healthcare') || cats.includes('enterprise');
    if (filter === 'marketing') return cats.includes('marketing') || cats.includes('analytics');
    return true;
  });

  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-6 mb-12 border-y border-dashed border-white/[0.15]">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#9CFF00] text-black border-[#9CFF00] font-bold'
                    : 'bg-transparent text-zinc-400 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-zinc-500">
          {String(filtered.length).padStart(2, '0')} PROJECTS
        </span>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <Link
            key={item.id}
            href={item.href}
            className="group bg-[#111111] border border-white/[0.1] hover:border-[#9CFF00] transition-colors flex flex-col justify-between"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#181818]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#080808]/90 border border-white/15 text-[#9CFF00] font-mono text-[10px] font-bold tracking-[0.14em] px-2.5 py-0.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">
                  {item.categories}
                </p>
                <h2 className="font-display text-xl font-medium text-white group-hover:text-[#9CFF00] transition-colors leading-snug">
                  {item.title}
                </h2>
              </div>

              <div className="pt-4 border-t border-dashed border-white/[0.1] flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 group-hover:text-white">
                <span>OPEN CASE STUDY</span>
                <span className="text-[#9CFF00]">&gt;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
