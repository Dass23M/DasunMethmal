import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Contact from '@/components/sections/Contact';
import FaqSection from '@/components/sections/FaqSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Schedule a call or send a project inquiry to Dasun Methmal — Full-Stack Developer & Creative Engineer.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-24">
        <Contact />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
