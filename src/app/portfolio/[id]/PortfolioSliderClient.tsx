'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
}

export default function PortfolioSliderClient({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full mb-12 sm:mb-16">
      {/* Main Image Stage */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#12131A] shadow-2xl group">
        <Image
          src={images[current]}
          alt={`Project Showcase ${current + 1}`}
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          priority={current === 0}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
        />

        {/* Subtle Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Prev / Next Navigation Controls */}
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-10">
            <button
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#FF6B00] border border-white/20 hover:border-[#FF6B00] text-white hover:text-black flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-xl"
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#FF6B00] border border-white/20 hover:border-[#FF6B00] text-white hover:text-black flex items-center justify-center pointer-events-auto backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-xl"
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Slide Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full font-mono text-[10px] font-bold text-white/80 uppercase tracking-widest z-10">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Pill Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i ? 'w-7 bg-[#FF6B00]' : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
