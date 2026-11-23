import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WorksArchiveClient from '@/components/sections/WorksArchiveClient';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Works',
  description:
    'Selected full-stack web apps, AI platforms, and digital products built by Dasun Methmal.',
};

export default function WorksPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-20 sm:pt-24">
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10">
          <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00] block mb-4">
            [03 / WORKS]
          </span>
          <h1 className="font-display font-medium uppercase tracking-[-0.04em] leading-[0.9] text-[clamp(2.5rem,11vw,7.5rem)] text-white">
            Selected<span className="text-[#9CFF00]">_</span>
            <br />
            Works
          </h1>
        </section>

        <WorksArchiveClient />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
