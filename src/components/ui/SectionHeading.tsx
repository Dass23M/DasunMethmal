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
}

export default function SectionHeading({
  title,
  meta = '©2026',
  theme = 'dark',
  className = '',
}: SectionHeadingProps) {
  const isLight = theme === 'light';

  return (
    <div
      className={`w-full mb-8 sm:mb-12 border-b pb-3 transition-colors ${
        isLight ? 'border-black/15 text-black' : 'border-white/15 text-white'
      } ${className}`}
    >
      <div className="flex items-center justify-between text-xs sm:text-sm font-bold tracking-widest uppercase">
        <span className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] inline-block flex-shrink-0" />
          <span className="font-raleway tracking-widest">{title}</span>
        </span>
        <span className="font-mono text-xs opacity-65">{meta}</span>
      </div>
    </div>
  );
}
