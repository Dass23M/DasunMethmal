'use client';

import Link from 'next/link';

export default function BackButtonClient() {
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.location.href = '/#portfolio-section';
    }
  };

  return (
    <Link
      href="/#portfolio-section"
      onClick={handleBackClick}
      className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#FF6B00] border border-white/20 hover:border-[#FF6B00] text-white hover:text-black font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:scale-105"
    >
      <span>←</span>
      <span>BACK TO PORTFOLIO</span>
    </Link>
  );
}
