'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Only run on desktop devices
    if (typeof window === 'undefined' || window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor initially (hide it until mouse moves)
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      // Use quickTo for better performance
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
      
      xTo(e.clientX);
      yTo(e.clientY);

      // Fade in on first move
      if (cursor.style.opacity === "0") {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a clickable element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('pf-card') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#FF8A00] pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ${
        isHovering ? 'scale-[2.5] bg-[#FF8A00]/20 backdrop-blur-sm' : 'scale-100'
      }`}
      style={{ 
        willChange: 'transform'
      }}
    />
  );
}
