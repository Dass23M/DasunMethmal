'use client';

import React from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
}

/**
 * SEO-Friendly Viewport Deferred Section.
 * Emits full SSR HTML text copy for search engine indexers (>3,000 words for Googlebot),
 * while utilizing CSS `content-visibility: auto` to defer layout and rendering work off-screen.
 */
export default function LazySection({
  children,
  minHeight = '300px',
  className = '',
}: LazySectionProps) {
  return (
    <div
      className={`lazy-section-wrapper ${className}`}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: `1px ${minHeight}`,
        minHeight,
      }}
    >
      {children}
    </div>
  );
}
