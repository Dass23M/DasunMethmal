import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';
import SpotlightSection from '@/components/sections/SpotlightSection';
import GithubSection from '@/components/sections/GithubSection';
import LogoSlider from '@/components/sections/LogoSlider';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Dasun Methmal — Cardiff Metropolitan University Software Engineering graduate, Full-Stack Developer, AI Engineer, and Digital Strategist.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-24">
        {/* Editorial Page Header */}
        <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
          <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00] block mb-4">
            [01 / ABOUT]
          </span>
          <h1 className="font-display font-medium uppercase tracking-[-0.04em] leading-[0.9] text-[clamp(3.2rem,9vw,7.5rem)] text-white">
            Engineer<span className="text-[#9CFF00]">_</span>
            <br />
            &amp; Builder
          </h1>
        </section>

        <About showMoreLink={false} />
        <SpotlightSection />
        <GithubSection />
        <LogoSlider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
