'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer w-full bg-[#08080A] select-none text-white border-t border-white/[0.08]">
            {/* ─── TOP LUXURY SECTION: 3 Columns ─── */}
            <div className="w-full py-16 md:py-24 px-6 sm:px-12 lg:px-20">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

                    {/* Column 1: Pages */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="font-display font-bold text-base md:text-lg text-white mb-6 tracking-tight uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                            Navigation
                        </h3>
                        <ul className="space-y-3 font-body text-sm text-zinc-400 font-medium">
                            <li>
                                <Link href="/" className="hover:text-[#FF8A00] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a href="#about-section" className="hover:text-[#FF8A00] transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#portfolio-section" className="hover:text-[#FF8A00] transition-colors">
                                    Works &amp; Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#contact-section" className="hover:text-[#FF8A00] transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Follow Us */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="font-display font-bold text-base md:text-lg text-white mb-6 tracking-tight uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                            Connect
                        </h3>
                        <p className="font-body text-sm text-zinc-300 font-medium mb-1">
                            <a href="mailto:methmal.liyanage23@gmail.com" className="hover:text-[#FF8A00] transition-colors font-mono">
                                methmal.liyanage23@gmail.com
                            </a>
                        </p>
                        <p className="font-body text-sm text-zinc-400 font-medium mb-6">
                            <a href="tel:+94703056192" className="hover:text-[#FF8A00] transition-colors font-mono">
                                +94 70 3056 192
                            </a>
                        </p>

                        {/* Social Icons Row */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.linkedin.com/in/dasun-methmal-607333230?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/[0.04] text-white flex items-center justify-center text-xs font-bold shadow-sm border border-white/10 hover:bg-[#FF8A00] hover:text-black hover:border-[#FF8A00] hover:shadow-[0_0_15px_rgba(255,138,0,0.5)] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/_dase23_?igsh=bDJjeDJmMjI0bWFm"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/[0.04] text-white flex items-center justify-center text-xs font-bold shadow-sm border border-white/10 hover:bg-[#FF8A00] hover:text-black hover:border-[#FF8A00] hover:shadow-[0_0_15px_rgba(255,138,0,0.5)] transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/share/19NZDkGEqc"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/[0.04] text-white flex items-center justify-center text-xs font-bold shadow-sm border border-white/10 hover:bg-[#FF8A00] hover:text-black hover:border-[#FF8A00] hover:shadow-[0_0_15px_rgba(255,138,0,0.5)] transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@dcode33?_r=1&_t=ZS-98n1Uw4x7iR"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full bg-white/[0.04] text-white flex items-center justify-center text-xs font-bold shadow-sm border border-white/10 hover:bg-[#FF8A00] hover:text-black hover:border-[#FF8A00] hover:shadow-[0_0_15px_rgba(255,138,0,0.5)] transition-all duration-300"
                                aria-label="TikTok"
                            >
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.83.12V9.37a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.63a6.34 6.34 0 0 0 10.82 4.47V10.4a8.28 8.28 0 0 0 5.77 2.29v-3.45a4.85 4.85 0 0 1-4-.01z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Address */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h3 className="font-display font-bold text-base md:text-lg text-white mb-6 tracking-tight uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                            Location
                        </h3>
                        <address className="not-italic font-body text-sm text-zinc-400 font-medium space-y-1">
                            <p className="text-zinc-300">Colombo, Western Province</p>
                            <p>Sri Lanka • Available Worldwide (Remote)</p>
                        </address>
                    </div>

                </div>
            </div>

            {/* ─── BOTTOM DARK SECTION WITH EMBLEM NOTCH & GIANT TYPOGRAPHY ─── */}
            <div className="w-full bg-[#050507] text-white relative pt-0 pb-10 overflow-hidden border-t border-white/[0.05]">

                {/* Notch & Side Social Buttons Container */}
                <div className="max-w-[1440px] mx-auto px-6 sm:px-12 relative flex flex-col md:flex-row items-center justify-between gap-6 z-20">

                    {/* Left Side Social Buttons */}
                    <div className="flex items-center gap-3.5 order-2 md:order-1">
                        <a
                            href="https://www.linkedin.com/in/dasun-methmal-607333230?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white font-display font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://www.instagram.com/_dase23_?igsh=bDJjeDJmMjI0bWFm"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white font-display font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Instagram
                        </a>
                    </div>

                    {/* Center Cutout Notch & Vector Emblem Logo */}
                    <div className="relative order-1 md:order-2 flex flex-col items-center -mt-1">
                        <div className="w-40 sm:w-48 h-20 sm:h-24 bg-[#0d0d12] border-b border-x border-white/10 rounded-b-[45px] sm:rounded-b-[55px] flex items-center justify-center shadow-2xl relative z-10 px-4">
                            <svg
                                viewBox="0 0 140 140"
                                className="w-12 h-12 sm:w-16 sm:h-16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* U-Shape Curve */}
                                <path
                                    d="M35 30 V70 C35 89.33 50.67 105 70 105 C89.33 105 105 89.33 105 70 V55 H85 V70 C85 78.28 78.28 85 70 85 C61.72 85 55 78.28 55 70 V30 H35 Z"
                                    fill="#FFFFFF"
                                />
                                {/* Vibrant Orange Circle Accent */}
                                <circle cx="70" cy="58" r="13" fill="#FF8A00" />
                                {/* Pixel Accent Blocks */}
                                <rect x="92" y="25" width="8" height="8" fill="#FFFFFF" />
                                <rect x="102" y="25" width="8" height="8" fill="#FFFFFF" />
                                <rect x="102" y="35" width="8" height="8" fill="#FFFFFF" />
                                <rect x="92" y="45" width="8" height="8" fill="#FFFFFF" />
                                <rect x="102" y="45" width="8" height="8" fill="#FFFFFF" />
                            </svg>
                        </div>
                    </div>

                    {/* Right Side Social Buttons */}
                    <div className="flex items-center gap-3.5 order-3">
                        <a
                            href="https://www.facebook.com/share/19NZDkGEqc"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white font-display font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.tiktok.com/@dcode33?_r=1&_t=ZS-98n1Uw4x7iR"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 rounded-full border border-white/15 bg-white/[0.03] text-white font-display font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-sm"
                        >
                            TikTok
                        </a>
                    </div>

                </div>

                {/* Giant Bottom Typography */}
                <div className="w-full text-center mt-10 md:mt-14 overflow-hidden px-2">
                    <div className="font-display font-black bg-gradient-to-b from-white/95 via-white/50 to-white/10 bg-clip-text text-transparent text-[15vw] sm:text-[17vw] lg:text-[18vw] leading-none tracking-tighter uppercase select-none">
                        DASUN METHMAL
                    </div>
                </div>

                {/* Bottom Copyright Row */}
                <div className="max-w-[1440px] mx-auto px-6 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 gap-4">
                    <p>© {year} Dasun Methmal. All rights reserved.</p>
                    
                    {/* Website Launches Verified Badge */}
                    <a
                        href="https://websitelaunches.com/site/dasunmethmal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block opacity-90 hover:opacity-100 transition-opacity my-2 md:my-0"
                    >
                        <Image
                            src="https://websitelaunches.com/badge/dasunmethmal.com.svg"
                            alt="Established online - Public launch record"
                            width={255}
                            height={55}
                            unoptimized
                            className="h-10 w-auto"
                        />
                    </a>

                    <p>Designed with passion &amp; excellence.</p>
                </div>

            </div>
        </footer>
    );
}
