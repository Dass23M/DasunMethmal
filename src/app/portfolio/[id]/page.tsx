import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
  const title = project ? `${project.title} — Case Study` : 'Case Study';
  const description = project
    ? project.subtitle || project.description1
    : 'Dasun Methmal Creative Engineer portfolio case study.';
  const canonicalUrl = `https://www.dasunmethmal.com/portfolio/${params.id}`;
  const image = project?.images[0] || '/images/cover_bg_2.png';

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: 'article', images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
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
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-24">
        {/* Top Hero */}
        <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-dashed border-white/[0.15] mb-10">
            <BackButtonClient />
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00]">
              [CASE STUDY / {String(currentIndex + 1).padStart(2, '0')}]
            </span>
          </div>

          <h1 className="font-display font-medium text-3xl sm:text-5xl lg:text-7xl tracking-[-0.03em] leading-[1.02] text-white max-w-5xl">
            {project.title}
          </h1>
          <p className="font-body text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed mt-5">
            {project.subtitle}
          </p>

          {/* 4-Column Sharp Metadata Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <div className="bg-[#111111] border border-white/[0.1] p-5">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#9CFF00] block mb-2">
                ROLE
              </span>
              <span className="font-display text-sm sm:text-base text-white block">
                {project.role}
              </span>
            </div>
            <div className="bg-[#111111] border border-white/[0.1] p-5">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#9CFF00] block mb-2">
                CLIENT
              </span>
              <span className="font-display text-sm sm:text-base text-white block">
                {project.client}
              </span>
            </div>
            <div className="bg-[#111111] border border-white/[0.1] p-5">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#9CFF00] block mb-2">
                YEAR
              </span>
              <span className="font-display text-sm sm:text-base text-white block">
                {project.date}
              </span>
            </div>
            <div className="bg-[#111111] border border-white/[0.1] p-5 flex flex-col justify-between gap-2">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#9CFF00] block">
                LINKS
              </span>
              <div className="flex flex-wrap gap-4 font-mono text-xs uppercase">
                <a
                  href={project.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#9CFF00] transition-colors"
                >
                  LIVE ↗
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#9CFF00] transition-colors"
                >
                  GITHUB ↗
                </a>
              </div>
            </div>
          </div>

          {/* Tech Stack Sharp Gray Tags */}
          <div className="flex flex-wrap gap-2 mt-8 mb-14">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Slider */}
          <PortfolioSliderClient images={project.images} />

          {/* Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 mt-12 border-t border-dashed border-white/[0.15]">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00] block mb-3">
                [OVERVIEW]
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-medium text-white tracking-tight leading-tight">
                Architecture &amp; Execution.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 font-body text-base text-zinc-300 leading-relaxed">
              <p>{project.description1}</p>
              <p>{project.description2}</p>
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-16 pt-12 border-t border-dashed border-white/[0.15]">
              <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00] block mb-6">
                [HIGHLIGHTS]
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#111111] border border-white/[0.1] hover:border-[#9CFF00] p-4 transition-colors"
                  >
                    <span className="font-mono text-xl font-bold text-[#9CFF00] block mb-2">
                      {item.number}
                    </span>
                    <span className="font-display text-xs text-zinc-200 leading-snug block">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contributions & Key Features */}
          {(project.myContributions || project.keyFeatures) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-12 border-t border-dashed border-white/[0.15]">
              {project.myContributions && project.myContributions.length > 0 && (
                <div className="bg-[#111111] border border-white/[0.1] p-7 space-y-5">
                  <h3 className="font-display text-xl text-white font-medium flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#9CFF00]" />
                    My Contributions
                  </h3>
                  <ul className="space-y-3">
                    {project.myContributions.map((contrib, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 font-body leading-relaxed">
                        <span className="text-[#9CFF00] font-mono">+</span>
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="bg-[#111111] border border-white/[0.1] p-7 space-y-5">
                  <h3 className="font-display text-xl text-white font-medium flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#9CFF00]" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 font-body leading-relaxed">
                        <span className="text-[#9CFF00] font-mono">▪</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Next / Prev Pagination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-12 border-t border-dashed border-white/[0.15]">
            <Link
              href={`/portfolio/${prevProject.id}`}
              className="group bg-[#111111] hover:bg-[#9CFF00] border border-white/[0.1] hover:border-[#9CFF00] p-6 transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-500 group-hover:text-black block mb-2">
                &lt; PREVIOUS PROJECT
              </span>
              <span className="font-display text-lg text-white group-hover:text-black transition-colors block">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/portfolio/${nextProject.id}`}
              className="group bg-[#111111] hover:bg-[#9CFF00] border border-white/[0.1] hover:border-[#9CFF00] p-6 transition-colors text-left sm:text-right"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-500 group-hover:text-black block mb-2">
                NEXT PROJECT &gt;
              </span>
              <span className="font-display text-lg text-white group-hover:text-black transition-colors block">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
