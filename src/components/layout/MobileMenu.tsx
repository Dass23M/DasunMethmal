'use client';

import { useEffect } from 'react';

/**
 * Slide-out mobile menu panel.
 */
export default function MobileMenu() {
  const closeMenu = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    document.body.classList.remove('offcanvas');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.querySelector('.site-mobile-menu');
      if (menu && !menu.contains(e.target as Node) && document.body.classList.contains('offcanvas')) {
        document.body.classList.remove('offcanvas');
      }
    };
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, []);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, {
          offset: 0,
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <nav className="site-mobile-menu bg-white/95 dark:bg-[#0d0d0d]/95 text-black dark:text-white" aria-label="Mobile navigation">
      <div className="close-wrap">
        <a href="#" onClick={closeMenu} aria-label="Close mobile navigation menu">
          <span className="close-label text-black/80 dark:text-white/80 hover:text-[#FF8A00] transition-colors text-[14px] font-medium">Close</span>
          <div className="close-times">
            <span className="bar1 bg-black dark:bg-white" />
            <span className="bar2 bg-black dark:bg-white" />
          </div>
        </a>
      </div>

      <ul className="mobile-nav-ul">
        <li>
          <a href="#home-section" onClick={(e) => handleSectionClick(e, 'home-section')}>Home</a>
        </li>
        <li>
          <a href="#about-section" onClick={(e) => handleSectionClick(e, 'about-section')}>
            About
          </a>
        </li>
        <li>
          <a href="#portfolio-section" onClick={(e) => handleSectionClick(e, 'portfolio-section')}>
            Portfolio
          </a>
        </li>
        <li>
          <a href="#services-section" onClick={(e) => handleSectionClick(e, 'services-section')}>
            Services
          </a>
        </li>
        <li>
          <a href="#skills-section" onClick={(e) => handleSectionClick(e, 'skills-section')}>
            Skills
          </a>
        </li>
        <li>
          <a href="#testimonial-section" onClick={(e) => handleSectionClick(e, 'testimonial-section')}>
            Testimonial
          </a>
        </li>
        <li>
          <a href="#poster-design-section" onClick={(e) => handleSectionClick(e, 'poster-design-section')}>
            Poster Design
          </a>
        </li>
        <li>
          <a href="#contact-section" onClick={(e) => handleSectionClick(e, 'contact-section')}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
