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
  const title = project ? `${project.title} — Case Study by Dasun Methmal` : 'Portfolio Case Study — Dasun Methmal';
  const description = project
    ? project.subtitle || project.description1
    : 'Dasun Methmal Fullstack Developer & AI Engineer portfolio case study.';
  const canonicalUrl = `https://www.dasunmethmal.com/portfolio/${params.id}`;
  const image = project?.images[0] || '/images/cover_bg_2.png';

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function PortfolioSinglePage({ params }: Props) {
  const project = portfolioSingles.find((p) => p.id === params.id);
  if (!project) notFound();

  const currentIndex = portfolioSingles.findIndex((p) => p.id === params.id);
  const prevProject = portfolioSingles[(currentIndex - 1 + portfolioSingles.length) % portfolioSingles.length];
  const nextProject = portfolioSingles[(currentIndex + 1) % portfolioSingles.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.subtitle || project.description1,
    image: project.images[0],
    author: {
      '@type': 'Person',
      name: 'Dasun Methmal',
      url: 'https://www.dasunmethmal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dasun Methmal',
      url: 'https://www.dasunmethmal.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.dasunmethmal.com/portfolio/${project.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <div id="portfolio-detail-content" className="w-full bg-black py-16 sm:py-24">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8 sm:mb-16">
              <BackButtonClient />
              <div className="font-mono text-xs text-[#FF6B00] uppercase tracking-widest">
                <span>01 / CASE STUDY DETAILS</span>
              </div>
            </div>

            {/* 4-Column Metadata Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8">
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

              <div className="bg-[#12131A] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-2 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest block">
                  LINKS
                </span>
                <a
                  href={project.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sora font-bold text-xs sm:text-sm text-[#FF6B00] hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>LIVE DEMO</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sora font-bold text-xs sm:text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>SOURCE CODE</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-16">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] sm:text-xs font-semibold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/25 px-3 sm:px-4 py-1.5 rounded-full uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
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

            {/* Project Highlights Stat Grid */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-16 sm:mb-24 pt-8 border-t border-white/10">
                <span className="font-mono text-xs font-bold text-[#FF6B00] uppercase tracking-widest block mb-6">
                  {"// PROJECT HIGHLIGHTS"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="bg-[#12131A] border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#FF6B00]/40 transition-colors">
                      <span className="font-mono text-xl font-extrabold text-[#FF6B00] block mb-2">{item.number}</span>
                      <span className="font-sora font-semibold text-xs text-white/90 leading-snug">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Contributions & Key Features Grid */}
            {(project.myContributions || project.keyFeatures) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 sm:mb-24 pt-8 border-t border-white/10">
                {project.myContributions && project.myContributions.length > 0 && (
                  <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-6 bg-[#FF6B00] rounded-full" />
                      <h3 className="font-sora font-extrabold text-xl text-white tracking-tight">My Contributions</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {project.myContributions.map((contrib, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/80 font-inter leading-relaxed">
                          <span className="text-[#FF6B00] font-bold mt-0.5">✓</span>
                          <span>{contrib}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div className="bg-[#12131A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-6 bg-[#FF6B00] rounded-full" />
                      <h3 className="font-sora font-extrabold text-xl text-white tracking-tight">Key Features</h3>
                    </div>
                    <ul className="space-y-3.5">
                      {project.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/80 font-inter leading-relaxed">
                          <span className="text-[#FF6B00] font-bold mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Next / Previous Project Pagination Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
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
