'use client';

import React from 'react';

/**
 * ScrollRevealWrapper wraps below-hero sections.
 * Animation choreography is orchestrated by GSAPSectionAnimator
 * to prevent duplicate tweens and ensure smooth 60fps scrolling.
 */
export default function ScrollRevealWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="below-hero-reveal w-full">
      {children}
    </div>
  );
}

