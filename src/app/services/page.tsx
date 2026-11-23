import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServicesEditorial from '@/components/sections/ServicesEditorial';
import AcidBanner from '@/components/sections/AcidBanner';
import FaqSection from '@/components/sections/FaqSection';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Full-stack web development, UI/UX engineering, AI/ML integration, and digital growth services by Dasun Methmal.',
};

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery & Architecture',
    desc: 'Defining product goals, system data models, and technical milestones before writing code.',
  },
  {
    num: '02',
    title: 'Interface & Motion',
    desc: 'Designing clean typographic hierarchy, responsive layouts, and purposeful interactions.',
  },
  {
    num: '03',
    title: 'Full-Stack Engineering',
    desc: 'Building fast, maintainable TypeScript, Next.js, Node.js, and Python/AI microservices.',
  },
  {
    num: '04',
    title: 'Launch & Growth',
    desc: 'Performance audits, technical SEO, analytics instrumentation, and continuous iteration.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-24">
        <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-12">
          <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00] block mb-4">
            [02 / SERVICES]
          </span>
          <h1 className="font-display font-medium uppercase tracking-[-0.04em] leading-[0.9] text-[clamp(3.2rem,9vw,7.5rem)] text-white">
            Capabilities<span className="text-[#9CFF00]">_</span>
          </h1>
        </section>

        <ServicesEditorial />
        <AcidBanner />

        {/* Process Grid */}
        <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="flex items-center justify-between pb-6 mb-12 border-b border-dashed border-white/[0.14] font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
            <span>[WORKFLOW]</span>
            <span className="text-white">04 PHASES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-[#111111] border border-white/[0.1] p-7 flex flex-col justify-between gap-8 hover:border-[#9CFF00] transition-colors"
              >
                <span className="font-mono text-xs text-[#9CFF00] tracking-[0.16em]">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display text-xl text-white font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FaqSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
