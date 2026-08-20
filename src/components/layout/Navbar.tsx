'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

/**
 * Site navigation bar matching Unfold template layout.
 * Uses framer-motion to hide on scroll down and show on scroll up.
 */
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home-section');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { scrollY } = useScroll();

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
    { label: 'Poster Design', id: 'poster-design-section' },
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
      className={`fixed top-0 left-0 right-0 z-[1002] transition-colors duration-300 py-[20px] ${
        scrolled 
          ? 'bg-white/90 dark:bg-[#080808]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 shadow-xl' 
          : 'bg-transparent py-[30px]'
      }`}
      aria-label="Main navigation"
    >
      <div className="w-full max-w-[1140px] mx-auto px-[15px] relative flex items-center justify-between">
        {/* Left Menu Items (Home, Portfolio, About, Services) */}
        <div className="flex-1 hidden lg:flex">
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
        <div className="absolute left-1/2 -translate-x-1/2 z-[99]">
          <Link
            href="/"
            className="font-sora text-[1.7rem] font-bold no-underline text-black dark:text-white transition-colors duration-300"
          >
            METHMAL<span className="text-[#FF8A00]">.</span>
          </Link>
        </div>

        {/* Right Menu Items (Skills, Testimonial, Journal, Contact) */}
        <div className="flex-1 hidden lg:flex justify-end items-center gap-[15px]">
          <ul className="list-none p-0 m-0 flex gap-[15px]">
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
          
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu toggle & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggle />
          <a
            href="#"
            onClick={toggleMenu}
            className="text-[14px] px-[7px] py-[10px] block text-black dark:text-white transition-colors duration-300"
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
    : 'text-black/80 dark:text-white/90';

  const underlineBg = 'bg-[#FF8A00]';

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-[10px_7px] block text-[14px] relative no-underline transition-colors duration-300 ${colorClass}`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-[7px] right-[7px] h-[1px] transition-all duration-300 ${underlineBg} ${isActive || hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
      />
    </a>
  );
}
