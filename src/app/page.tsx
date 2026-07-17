import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FooterMarquee from '@/components/sections/FooterMarquee';
import Hero from '@/components/sections/Hero';
import BestWorksBanner from '@/components/sections/BestWorksBanner';
import Portfolio from '@/components/sections/Portfolio';
import GSAPFlipSection from '@/components/sections/GSAPFlipSection';
import EditorialShowcase from '@/components/sections/EditorialShowcase';
import LogoSlider from '@/components/sections/LogoSlider';
import About from '@/components/sections/About';
import RandomTextReveal from '@/components/sections/RandomTextReveal';
import ScrollRevealGrid from '@/components/sections/ScrollRevealGrid';
import Testimonials from '@/components/sections/Testimonials';
import Journal from '@/components/sections/Journal';
import FaqSection from '@/components/sections/FaqSection';
import Contact from '@/components/sections/Contact';
import ImageFanShowcase from '@/components/sections/ImageFanShowcase';
import ImpactSection from '@/components/sections/ImpactSection';

/**
 * Main one-page portfolio — home page.
 * Assembles all sections in order, with fixed footer reveal effect.
 */
export default function HomePage() {
  return (
    <>
      {/* Site inner — margin-bottom pushes content up to reveal fixed footer */}
      <div className="site-inner">
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <Hero />

        {/* 1. Impact Section — Directly Below Hero */}
        <ImpactSection />

        <div className="below-hero-reveal">
          {/* 2. Pinned Scrub About Section */}
          <About />

          {/* 3. Image Fan Showcase */}
          <ImageFanShowcase />

          {/* 4. Best Works Banner */}
          <div className="scroll-reveal-section hidden md:block">
            <BestWorksBanner />
          </div>

          <div className="scroll-reveal-section">
            <Portfolio />
          </div>

          {/* Pin + Flip — no scroll-reveal wrapper (transform breaks ScrollTrigger pin) */}
          <GSAPFlipSection />

          {/* Pinned Editorial Showcase — placed below Services */}
          <EditorialShowcase />

          <div className="scroll-reveal-section">
            <LogoSlider />
          </div>

          <div className="scroll-reveal-section">
            <RandomTextReveal />
          </div>

          <div className="scroll-reveal-section">
            <ScrollRevealGrid />
          </div>

          <div className="scroll-reveal-section">
            <Testimonials />
          </div>

          <div className="scroll-reveal-section">
            <Journal />
          </div>

          <div className="scroll-reveal-section">
            <FaqSection />
          </div>

          <div className="scroll-reveal-section">
            <Contact />
          </div>

          <div className="scroll-reveal-section">
            <FooterMarquee />
          </div>
        </div>
      </div>

      {/* Fixed footer revealed on scroll */}
      <Footer />
    </>
  );
}
