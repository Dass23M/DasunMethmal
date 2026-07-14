'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <nav className="site-mobile-menu" aria-label="Mobile navigation">
      <div className="close-wrap">
        <a href="#" onClick={closeMenu}>
          <span className="close-label" style={{ color: '#000', fontSize: '14px' }}>Close</span>
          <div className="close-times">
            <span className="bar1" />
            <span className="bar2" />
          </div>
        </a>
      </div>

      <ul className="mobile-nav-ul">
        <li>
          <Link href="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <a href="#portfolio-section" onClick={(e) => handleSectionClick(e, 'portfolio-section')}>
            Portfolio
          </a>
        </li>
        <li>
          <a href="#about-section" onClick={(e) => handleSectionClick(e, 'about-section')}>
            About
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
          <a href="#journal-section" onClick={(e) => handleSectionClick(e, 'journal-section')}>
            Journal
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
