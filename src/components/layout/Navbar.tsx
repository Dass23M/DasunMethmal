'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Site navigation bar matching Unfold template layout.
 * Uses framer-motion to hide on scroll down and show on scroll up.
 */
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Check if we have scrolled past a certain point to apply the solid background
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide navbar on scroll down, show on scroll up (only after scrolling past 150px)
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const sections = [
      'home-section',
      'portfolio-section',
      'about-section',
      'services-section',
      'skills-section',
      'testimonial-section',
      'blog-section',
      'poster-design-section',
      'contact-section',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.classList.toggle('offcanvas');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.body.classList.remove('offcanvas');
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, {
          offset: 0,
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const leftLinks = [
    { label: 'Home', id: 'home-section' },
    { label: 'Portfolio', id: 'portfolio-section' },
    { label: 'About', id: 'about-section' },
    { label: 'Services', id: 'services-section' },
  ];

  const rightLinks = [
    { label: 'Skills', id: 'skills-section' },
    { label: 'Testimonial', id: 'testimonial-section' },
    { label: 'Blog', id: 'blog-section' },
    { label: 'Contact', id: 'contact-section' },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-[1002] transition-all duration-300 ${
        scrolled 
          ? 'bg-[#07080B]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-[14px]' 
          : 'bg-transparent py-[24px]'
      }`}
      aria-label="Main navigation"
    >
      {/* Sleek Gradient Scroll Progress Bar - Render only on client to avoid hydration mismatch */}
      {mounted && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B00] via-[#FFAA00] to-[#FF8A00] origin-left shadow-[0_0_12px_rgba(255,138,0,0.9)] z-50 pointer-events-none"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 relative flex items-center justify-between">
        {/* Left Menu Items (Home, Portfolio, About, Services) */}
        <div className="flex-1 hidden lg:flex items-center gap-4">
          <ul className="list-none p-0 m-0 flex gap-[15px]">
            {leftLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  label={item.label}
                  onClick={(e) => scrollToSection(e, item.id)}
                  href={`#${item.id}`}
                  isActive={activeSection === item.id}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Center Logo with Methmal */}
        <div className="absolute left-1/2 -translate-x-1/2 z-[99] flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-[1.7rem] font-bold no-underline text-white transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,138,0,0.5)] tracking-tight"
          >
            METHMAL<span className="text-[#FF8A00]">.</span>
          </Link>
        </div>

        {/* Right Menu Items (Skills, Testimonial, Journal, Contact) */}
        <div className="flex-1 hidden lg:flex justify-end items-center gap-4">
          <ul className="list-none p-0 m-0 flex gap-[15px] items-center">
            {rightLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  label={item.label}
                  onClick={(e) => scrollToSection(e, item.id)}
                  href={`#${item.id}`}
                  isActive={activeSection === item.id}
                />
              </li>
            ))}
          </ul>

          {/* Availability Status Badge */}
          <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400 select-none shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
            <span>Open to Work</span>
          </div>
        </div>

        {/* Mobile menu toggle (Left) */}
        <div className="flex lg:hidden">
          <a
            href="#"
            onClick={toggleMenu}
            className="text-[13px] font-mono font-medium tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-[#FF8A00] hover:text-[#FF8A00]"
          >
            Menu
          </a>
        </div>

      </div>
    </motion.nav>
  );
}

function NavLink({
  label,
  href,
  onClick,
  isActive,
}: {
  label: string;
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const colorClass = hovered || isActive
    ? 'text-[#FF8A00]'
    : 'text-zinc-300 hover:text-white';

  const underlineBg = 'bg-[#FF8A00]';

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-[10px_7px] block text-[14px] relative no-underline transition-colors duration-300 font-medium tracking-wide ${colorClass}`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-[7px] right-[7px] h-[1px] transition-all duration-300 ${underlineBg} ${isActive || hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
      />
    </a>
  );
}
