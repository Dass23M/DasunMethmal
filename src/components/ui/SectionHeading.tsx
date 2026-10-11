'use client';

/**
 * Editorial-style section header divider matching EditorialShowcase.
 * Features orange dot indicator, uppercase tracking title, year meta, and thin line divider.
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
  theme = 'dark',
  className = '',
  subtitle,
  category,
}: SectionHeadingProps) {
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full mb-8 sm:mb-16 border-b pb-5 transition-colors relative ${
        isLight
          ? 'border-black/15 text-black'
          : 'border-black/15 dark:border-white/10 text-black dark:text-white'
      } ${className}`}
    >
      {category && (
        <span className="font-mono text-xs font-bold text-[#FF8A00] tracking-widest uppercase mb-2 block">
          {"// " + category}
        </span>
      )}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold tracking-widest uppercase">
        <span className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF8A00] shadow-[0_0_8px_#FF8A00]" />
          </span>
          <span className="font-display tracking-[0.16em] text-sm sm:text-base font-extrabold text-black dark:text-white">
            {title}
          </span>
        </span>
        <span className="font-mono text-[11px] opacity-60 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
          {meta}
        </span>
      </div>
      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-black/60 dark:text-white/60 font-body max-w-xl">
          {subtitle}
        </p>
      )}
      {/* Ambient gradient highlight */}
      <div className="absolute -bottom-[1px] left-0 w-28 h-[2px] bg-gradient-to-r from-[#FF8A00] via-[#FFAA00] to-transparent" />
    </div>
  );
}

