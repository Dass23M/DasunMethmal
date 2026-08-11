'use client';

import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer w-full bg-[#f5f5f7] select-none text-black">
            {/* ─── TOP LIGHT SECTION: 3 Columns ─── */}
            <div className="w-full py-16 md:py-24 px-6 sm:px-12 lg:px-20 border-b border-gray-200">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

                    {/* Column 1: Pages */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="font-sora font-bold text-base md:text-lg text-black mb-6 tracking-tight uppercase">
                            Pages
                        </h3>
                        <ul className="space-y-3 font-inter text-sm text-gray-700 font-medium">
                            <li>
                                <Link href="/" className="hover:text-[#FF6B00] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a href="#about-section" className="hover:text-[#FF6B00] transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio-section" className="hover:text-[#FF6B00] transition-colors">
                                    Works
                                </a>
                            </li>
                            <li>
                                <a href="#contact-section" className="hover:text-[#FF6B00] transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Follow Us */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="font-sora font-bold text-base md:text-lg text-black mb-6 tracking-tight uppercase">
                            Follow Us
                        </h3>
                        <p className="font-inter text-sm text-gray-700 font-medium mb-1">
                            <a href="mailto:methmal.liyanage23@gmail.com" className="hover:text-[#FF6B00] transition-colors">
                                methmal.liyanage23@gmail.com
                            </a>
                        </p>
                        <p className="font-inter text-sm text-gray-700 font-medium mb-6">
                            <a href="tel:+94703056192" className="hover:text-[#FF6B00] transition-colors">
                                +94 70 3056 192
                            </a>
                        </p>

                        {/* Social Icons Row */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-sm border border-gray-250 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300"
                                aria-label="Facebook"
                            >
                                f
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-sm border border-gray-250 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-sm border border-gray-250 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300"
                                aria-label="Twitter"
                            >
                                𝕏
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-sm border border-gray-250 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-all duration-300"
                                aria-label="YouTube"
                            >
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Address */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className="font-sora font-bold text-base md:text-lg text-black mb-6 tracking-tight uppercase">
                            Address
                        </h3>
                        <address className="not-italic font-inter text-sm text-gray-700 font-medium space-y-1">
                            <p>Colombo,</p>
                            <p>Sri Lanka</p>
                        </address>
                    </div>

                </div>
            </div>

            {/* ─── BOTTOM DARK SECTION WITH EMBLEM NOTCH & GIANT TYPOGRAPHY ─── */}
            <div className="w-full bg-black text-white relative pt-0 pb-10 overflow-hidden">

                {/* Notch & Side Social Buttons Container */}
                <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative flex flex-col md:flex-row items-center justify-between gap-6 z-20">

                    {/* Left Side Social Buttons */}
                    <div className="flex items-center gap-3.5 order-2 md:order-1">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-sora font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-sora font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Instagram
                        </a>
                    </div>

                    {/* Center Cutout Notch & Vector Emblem Logo */}
                    <div className="relative order-1 md:order-2 flex flex-col items-center -mt-1">
                        <div className="w-40 sm:w-48 h-20 sm:h-24 bg-[#f5f5f7] rounded-b-[45px] sm:rounded-b-[55px] flex items-center justify-center shadow-md relative z-10 px-4">
                            <svg
                                viewBox="0 0 140 140"
                                className="w-12 h-12 sm:w-16 sm:h-16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* U-Shape Curve */}
                                <path
                                    d="M35 30 V70 C35 89.33 50.67 105 70 105 C89.33 105 105 89.33 105 70 V55 H85 V70 C85 78.28 78.28 85 70 85 C61.72 85 55 78.28 55 70 V30 H35 Z"
                                    fill="#000000"
                                />
                                {/* Vibrant Orange Circle Accent */}
                                <circle cx="70" cy="58" r="13" fill="#FF6B00" />
                                {/* Pixel Accent Blocks */}
                                <rect x="92" y="25" width="8" height="8" fill="#000000" />
                                <rect x="102" y="25" width="8" height="8" fill="#000000" />
                                <rect x="102" y="35" width="8" height="8" fill="#000000" />
                                <rect x="92" y="45" width="8" height="8" fill="#000000" />
                                <rect x="102" y="45" width="8" height="8" fill="#000000" />
                            </svg>
                        </div>
                    </div>

                    {/* Right Side Social Buttons */}
                    <div className="flex items-center gap-3.5 order-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-sora font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://behance.net"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-sora font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Behance
                        </a>
                    </div>

                </div>

                {/* Giant Bottom Typography */}
                <div className="w-full text-center mt-10 md:mt-14 overflow-hidden px-2">
                    <div className="font-sora font-black text-white text-[15vw] sm:text-[17vw] lg:text-[18vw] leading-none tracking-tighter uppercase select-none opacity-95">
                        METHMAL
                    </div>
                </div>

                {/* Bottom Copyright Row */}
                <div className="max-w-[1440px] mx-auto px-6 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
                    <p>© {year} Methmal. All rights reserved.</p>
                    <p>Designed with passion &amp; excellence.</p>
                </div>

            </div>
        </footer>
    );
}
