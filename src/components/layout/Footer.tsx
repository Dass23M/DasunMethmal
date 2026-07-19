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
                        <h4 className="font-raleway font-bold text-base md:text-lg text-black mb-6 tracking-tight uppercase">
                            Pages
                        </h4>
                        <ul className="space-y-3 font-arimo text-sm text-gray-700 font-medium">
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
                        <h4 className="font-raleway font-bold text-base md:text-lg text-black mb-6 tracking-tight uppercase">
                            Follow Us
                        </h4>
                        <p className="font-arimo text-sm text-gray-700 font-medium mb-1">
                            <a href="mailto:mail@uxoradesign.com" className="hover:text-[#FF6B00] transition-colors">
                                mail@uxoradesign.com
                            </a>
                        </p>
                        <p className="font-arimo text-sm text-gray-700 font-medium mb-6">
                            <a href="tel:+910123456789" className="hover:text-[#FF6B00] transition-colors">
                                +91 0123456789
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
                                📷
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
                                ▶
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Address */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h4 className="font-raleway font-bold text-base md:text-lg text-black mb-6 tracking-tight uppercase">
                            Address
                        </h4>
                        <address className="not-italic font-arimo text-sm text-gray-700 font-medium space-y-1">
                            <p>#21. North Street</p>
                            <p>Velachery</p>
                            <p>VelacheryChennai</p>
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
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-raleway font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-raleway font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
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
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-raleway font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://behance.net"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/80 text-white font-raleway font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Behance
                        </a>
                    </div>

                </div>

                {/* Giant Bottom Typography */}
                <div className="w-full text-center mt-10 md:mt-14 overflow-hidden px-2">
                    <h1 className="font-raleway font-black text-white text-[15vw] sm:text-[17vw] lg:text-[18vw] leading-none tracking-tighter uppercase select-none opacity-95">
                        NEXA
                    </h1>
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
