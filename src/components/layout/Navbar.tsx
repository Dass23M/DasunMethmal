'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

/**
 * Site navigation bar matching Unfold template layout.
 * Styled entirely with Tailwind CSS utility classes.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [awake, setAwake] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [activeSection, setActiveSection] = useState('home-section');
  const lastScrollTop = useRef(0);

  const handleScroll = useCallback(() => {
    const st = window.scrollY;

    if (st > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
      setAwake(false);
      setSleep(false);
    }

    if (st > 350) {
      if (st > lastScrollTop.current) {
        setAwake(false);
        setSleep(true);
      } else {
        setAwake(true);
        setSleep(false);
      }
    } else {
      setAwake(false);
      setSleep(true);
    }

    lastScrollTop.current = st;

    // Track active section for navbar underline indicator
    const sections = [
      'home-section',
      'portfolio-section',
      'about-section',
      'services-section',
      'skills-section',
      'testimonial-section',
      'journal-section',
      'contact-section',
    ];

    for (const sec of sections) {
      const el = document.getElementById(sec);
      if (el) {
        const top = el.offsetTop - 200;
        const height = el.offsetHeight;
        if (st >= top && st < top + height) {
          setActiveSection(sec);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

  const navClass = [
    'site-nav',
    scrolled ? 'scrolled' : '',
    awake ? 'awake' : '',
    sleep ? 'sleep' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const leftLinks = [
    { label: 'Home', id: 'home-section' },
    { label: 'Portfolio', id: 'portfolio-section' },
    { label: 'About', id: 'about-section' },
    { label: 'Services', id: 'services-section' },
  ];

  const rightLinks = [
    { label: 'Skills', id: 'skills-section' },
    { label: 'Testimonial', id: 'testimonial-section' },
    { label: 'Journal', id: 'journal-section' },
    { label: 'Contact', id: 'contact-section' },
  ];

  return (
    <nav className={navClass} aria-label="Main navigation">
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
                  scrolled={scrolled}
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
            className={`font-raleway text-[1.7rem] font-bold no-underline transition-colors duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            Methmal<span className="text-[#FF8A00]">.</span>
          </Link>
        </div>

        {/* Right Menu Items (Skills, Testimonial, Journal, Contact) */}
        <div className="flex-1 hidden lg:flex justify-end">
          <ul className="list-none p-0 m-0 flex gap-[15px]">
            {rightLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  label={item.label}
                  onClick={(e) => scrollToSection(e, item.id)}
                  href={`#${item.id}`}
                  scrolled={scrolled}
                  isActive={activeSection === item.id}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu toggle */}
        <div className="block lg:hidden">
          <a
            href="#"
            onClick={toggleMenu}
            className={`text-[14px] px-[7px] py-[10px] block transition-colors duration-300 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            Menu
          </a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  label,
  href,
  onClick,
  scrolled,
  isActive,
}: {
  label: string;
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  scrolled: boolean;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const colorClass = scrolled
    ? hovered
      ? 'text-[#FF8A00]'
      : 'text-black'
    : 'text-white';

  const underlineBg = scrolled ? 'bg-[#FF8A00]' : 'bg-white';

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
        className={`absolute bottom-0 left-[7px] right-[7px] h-[1px] transition-all duration-300 ${underlineBg} ${
          isActive || hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />
    </a>
  );
}
