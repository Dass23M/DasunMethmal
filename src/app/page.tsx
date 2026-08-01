import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FooterMarquee from '@/components/sections/FooterMarquee';
import Hero from '@/components/sections/Hero';
import LandoStyleSection from '@/components/sections/LandoStyleSection';
import Portfolio from '@/components/sections/Portfolio';
import GSAPFlipSection from '@/components/sections/GSAPFlipSection';
import EditorialShowcase from '@/components/sections/EditorialShowcase';
import LogoSlider from '@/components/sections/LogoSlider';
import About from '@/components/sections/About';
import RandomTextReveal from '@/components/sections/RandomTextReveal';
import ScrollRevealGrid from '@/components/sections/ScrollRevealGrid';
import Testimonials from '@/components/sections/Testimonials';
import PosterDesign from '@/components/sections/PosterDesign';
import FaqSection from '@/components/sections/FaqSection';
import Contact from '@/components/sections/Contact';
import ImageFanShowcase from '@/components/sections/ImageFanShowcase';
import OnCraftOffCraft from '@/components/sections/OnCraftOffCraft';
import Artifact3DSection from '@/components/sections/Artifact3DSection';
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

        {/* Lando Norris Style Banner Section - Directly Below Hero */}
        <div className="scroll-reveal-section">
          <LandoStyleSection />
        </div>

        <div className="below-hero-reveal">
          {/* 2. Pinned Scrub About Section */}
          <div className="scroll-reveal-section">
            <About />
          </div>

          {/* 3. Image Fan Showcase */}
          <div className="scroll-reveal-section">
            <ImageFanShowcase />
          </div>

          {/* ON CRAFT / OFF CRAFT Section — Directly Below ImageFanShowcase */}
          <div className="scroll-reveal-section">
            <OnCraftOffCraft />
          </div>

          {/* 3D WebGL HUD Generative Artifact Section — Directly Below OnCraftOffCraft */}
          <div className="scroll-reveal-section">
            <Artifact3DSection />
          </div>

          <div className="scroll-reveal-section">
            <Portfolio />
          </div>

          {/* Pin + Flip */}
          <div className="scroll-reveal-section">
            <GSAPFlipSection />
          </div>

          {/* Pinned Editorial Showcase */}
          <div className="scroll-reveal-section">
            <EditorialShowcase />
          </div>

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
            <PosterDesign />
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
