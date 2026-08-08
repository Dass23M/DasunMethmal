import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FooterMarquee from '@/components/sections/FooterMarquee';
import MouseScroll from '@/components/ui/MouseScroll';
import { portfolioSingles } from '@/data/portfolio';
import PortfolioSliderClient from './PortfolioSliderClient';
import BackButtonClient from './BackButtonClient';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return portfolioSingles.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const project = portfolioSingles.find((p) => p.id === params.id);
  return {
    title: project ? `${project.title} — Methmal Portfolio` : 'Portfolio — Methmal',
  };
}

export default function PortfolioSinglePage({ params }: Props) {
  const project = portfolioSingles.find((p) => p.id === params.id);
  if (!project) notFound();

  const currentIndex = portfolioSingles.findIndex((p) => p.id === params.id);
  const prevProject = portfolioSingles[(currentIndex - 1 + portfolioSingles.length) % portfolioSingles.length];
  const nextProject = portfolioSingles[(currentIndex + 1) % portfolioSingles.length];

  return (
    <>
      <div className="site-inner bg-black text-white select-none">
        <Navbar />

        {/* ── 1. Hero Cover Header Stage ── */}
        <div
          className="cover-v1 gradient-bottom-black page-cover-fixed relative flex items-center justify-center min-h-[75vh] sm:min-h-[85vh]"
          style={{
            backgroundImage: `url('${project.images[0]}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark luxury gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-0" />

          <div className="page-cover-inner relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 text-center pt-24 pb-16">
            <div className="max-w-4xl mx-auto space-y-4">
              <span className="inline-block font-mono text-xs font-bold text-[#FF6B00] uppercase tracking-widest bg-[#FF6B00]/10 border border-[#FF6B00]/30 px-4 py-1.5 rounded-full mb-2">
                {"// CASE STUDY SHOWCASE"}
              </span>

              <h1 className="font-sora font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                {project.title}
              </h1>

              <p className="font-inter font-normal text-base sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed pt-2">
                {project.subtitle}
              </p>
            </div>
          </div>

          <MouseScroll targetId="portfolio-detail-content" />
        </div>

        {/* ── 2. Main Portfolio Detail Content ── */}
        <div id="portfolio-detail-content" className="w-full bg-black py-12 sm:py-20">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-10 sm:mb-14">
              <BackButtonClient />
              <div className="font-mono text-xs text-[#FF6B00] uppercase tracking-widest">
                <span>01 / CASE STUDY DETAILS</span>
              </div>
            </div>

            {/* 4-Column Metadata Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16">
              <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-1">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">
                  ROLE
                </span>
                <span className="font-sora font-bold text-xs sm:text-base text-white block truncate">
                  {project.role}
                </span>
              </div>

              <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-1">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">
                  CLIENT
                </span>
                <span className="font-sora font-bold text-xs sm:text-base text-white block truncate">
                  {project.client}
                </span>
              </div>

              <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-1">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">
                  YEAR
                </span>
                <span className="font-sora font-bold text-xs sm:text-base text-white block">
                  {project.date}
                </span>
              </div>

              <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-1 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">
                  PROJECT LINK
                </span>
                <a
                  href={project.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sora font-bold text-xs sm:text-base text-[#FF6B00] hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>VISIT LIVE SITE</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </div>
            </div>

            {/* Featured Image Slider Showcase */}
            <PortfolioSliderClient images={project.images} />

            {/* Editorial Narrative & Description */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-8 border-t border-white/10 mb-16 sm:mb-24">
              
              {/* Left Column: Overview Header & Highlight Quote */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">
                  {"// OVERVIEW & ENGINEERING STORY"}
                </span>

                <h2 className="font-sora font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  High-Impact Architecture &amp; Execution.
                </h2>

                <div className="border-l-2 border-[#FF6B00] pl-5 py-1">
                  <p className="font-sora font-bold text-base sm:text-lg text-white/95 leading-relaxed">
                    &ldquo;{project.subtitle}&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Column: Detailed Narrative Paragraphs */}
              <div className="lg:col-span-7 space-y-6">
                <p className="font-inter font-normal text-base sm:text-lg text-white/80 leading-relaxed">
                  {project.description1}
                </p>
                <p className="font-inter font-normal text-base sm:text-lg text-white/80 leading-relaxed">
                  {project.description2}
                </p>
              </div>

            </div>

            {/* Bottom Next / Previous Project Pagination Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-white/10">
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="group bg-[#12131A] hover:bg-[#FF6B00] border border-white/10 hover:border-[#FF6B00] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <span className="font-mono text-[10px] font-bold text-white/50 group-hover:text-black uppercase tracking-widest block mb-2">
                  ← PREVIOUS PROJECT
                </span>
                <span className="font-sora font-bold text-lg text-white group-hover:text-black transition-colors block">
                  {prevProject.title}
                </span>
              </Link>

              <Link
                href={`/portfolio/${nextProject.id}`}
                className="group bg-[#12131A] hover:bg-[#FF6B00] border border-white/10 hover:border-[#FF6B00] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between text-left sm:text-right"
              >
                <span className="font-mono text-[10px] font-bold text-white/50 group-hover:text-black uppercase tracking-widest block mb-2">
                  NEXT PROJECT →
                </span>
                <span className="font-sora font-bold text-lg text-white group-hover:text-black transition-colors block">
                  {nextProject.title}
                </span>
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Marquee & Footer */}
        <FooterMarquee />
      </div>

      <Footer />
    </>
  );
}
