'use client';

import Image from 'next/image';

export default function ImpactSection() {
  return (
    <section className="w-full bg-[#f8f8fa] text-black py-12 sm:py-20 lg:py-24 px-4 sm:px-10 lg:px-20 select-none overflow-hidden border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* ── TOP SECTION: TITLE + VECTOR STAR + TOP RIGHT PHOTO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-10 sm:mb-14 lg:mb-20">
          {/* Main 3-line Headline */}
          <div className="lg:col-span-7">
            <h2 className="font-raleway font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.96] tracking-tight uppercase">
              <span className="block text-black">MY IMPACT</span>
              <span className="block">
                <span className="text-black">THROUGH </span>
                <span className="text-gray-400 font-extrabold">USER</span>
              </span>
              <span className="block text-gray-400 font-extrabold">EXPERIENCE</span>
            </h2>
          </div>

          {/* Center 8-spoke Asterisk Star Icon */}
          <div className="lg:col-span-2 hidden lg:flex justify-center pt-6">
            <svg className="w-16 h-16 text-gray-300 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="18" y1="18" x2="82" y2="82" />
              <line x1="18" y1="82" x2="82" y2="18" />
            </svg>
          </div>

          {/* Top Right Photo */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:w-[220px] lg:w-[240px] h-[200px] sm:h-[260px] lg:h-[280px] rounded-2xl overflow-hidden shadow-md border border-black/5">
              <Image
                src="/images/scroll2.png"
                alt="Impact showcase portrait"
                fill
                sizes="(max-width: 640px) 280px, 240px"
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* ── LOWER GRID: LEFT MAIN PHOTO WITH CORNER '+' CROSSHAIRS + RIGHT CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo Frame with '+' Corner Crosshairs */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative p-4 sm:p-8">
              {/* Corner '+' Crosshair Indicators */}
              <span className="absolute top-0 left-0 text-gray-400 text-xs sm:text-sm font-mono select-none">+</span>
              <span className="absolute top-0 right-0 text-gray-400 text-xs sm:text-sm font-mono select-none">+</span>
              <span className="absolute bottom-0 left-0 text-gray-400 text-xs sm:text-sm font-mono select-none">+</span>
              <span className="absolute bottom-0 right-0 text-gray-400 text-xs sm:text-sm font-mono select-none">+</span>

              {/* Main Photo */}
              <div className="relative w-[260px] xs:w-[290px] sm:w-[360px] md:w-[420px] h-[300px] xs:h-[340px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-black/5">
                <Image
                  src="/images/editorial_1.png"
                  alt="Fullstack Developer Portrait"
                  fill
                  sizes="(max-width: 640px) 290px, 420px"
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio Paragraph & Stat Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
            
            {/* Bio Paragraph */}
            <p className="font-raleway font-bold text-xs sm:text-sm md:text-base text-gray-600 uppercase tracking-wide max-w-xl leading-relaxed">
              HI, I&apos;M METHMAL, A MERN STACK &amp; FULLSTACK DEVELOPER PASSIONATE ABOUT CREATING INTUITIVE AND VISUALLY ENGAGING WEB APPLICATIONS.
            </p>

            {/* Stat Card 1: 37+ Projects */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 flex items-center gap-4 sm:gap-8 shadow-sm border border-gray-200/80">
              <div className="font-raleway font-black text-3xl sm:text-5xl md:text-6xl text-black tracking-tight shrink-0 min-w-[75px] sm:min-w-[130px]">
                37+
              </div>
              <div className="h-10 sm:h-14 w-[1px] bg-gray-200 shrink-0" />
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[#FF6B00] font-black text-sm">✳</span>
                  <h4 className="font-raleway font-bold text-xs sm:text-sm text-black tracking-wider uppercase">
                    PROJECTS COMPLETED
                  </h4>
                </div>
                <p className="font-arimo text-xs sm:text-sm text-gray-500 leading-normal">
                  I have successfully completed a variety of projects across web and fullstack applications.
                </p>
              </div>
            </div>

            {/* Stat Card 2: 72+ Clients */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 flex items-center gap-4 sm:gap-8 shadow-sm border border-gray-200/80">
              <div className="font-raleway font-black text-3xl sm:text-5xl md:text-6xl text-black tracking-tight shrink-0 min-w-[75px] sm:min-w-[130px]">
                72+
              </div>
              <div className="h-10 sm:h-14 w-[1px] bg-gray-200 shrink-0" />
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[#FF6B00] font-black text-sm">✳</span>
                  <h4 className="font-raleway font-bold text-xs sm:text-sm text-black tracking-wider uppercase">
                    HAPPY CLIENTS
                  </h4>
                </div>
                <p className="font-arimo text-xs sm:text-sm text-gray-500 leading-normal">
                  I have worked with clients from different industries delivering high quality digital products.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
