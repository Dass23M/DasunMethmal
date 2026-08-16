import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LazySection from '@/components/ui/LazySection';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import OnCraftOffCraft from '@/components/sections/OnCraftOffCraft';
import LogoSlider from '@/components/sections/LogoSlider';
import RandomTextReveal from '@/components/sections/RandomTextReveal';
import ScrollRevealGrid from '@/components/sections/ScrollRevealGrid';
import Testimonials from '@/components/sections/Testimonials';
import FaqSection from '@/components/sections/FaqSection';
import Contact from '@/components/sections/Contact';
import FooterMarquee from '@/components/sections/FooterMarquee';
import ImageFanShowcase from '@/components/sections/ImageFanShowcase';
import LandoStyleSection from '@/components/sections/LandoStyleSection';

import dynamic from 'next/dynamic';

import GSAPFlipSection from '@/components/sections/GSAPFlipSection';
import EditorialShowcase from '@/components/sections/EditorialShowcase';
import PosterDesign from '@/components/sections/PosterDesign';

const InfiniteGallery3D = dynamic(
  () => import('@/components/sections/InfiniteGallery3D'),
  { ssr: false }
);

/**
 * Main one-page portfolio — home page.
 * Assembles all sections in order, with fixed footer reveal effect.
 */
import ScrollRevealWrapper from '@/components/ui/ScrollRevealWrapper';

export default function HomePage() {
  return (
    <>
      {/* Main content landmark — margin-bottom pushes content up to reveal fixed footer */}
      <main id="main-content" className="site-inner">
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <Hero />

        <ScrollRevealWrapper>
          {/* 2. Pinned Scrub About Section */}
          <div className="scroll-reveal-section">
            <About />
          </div>

          {/* 3. Image Fan Showcase */}
          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <ImageFanShowcase />
            </LazySection>
          </div>


          {/* Lando Norris Style Banner Section */}
          <div className="scroll-reveal-section">
            <LazySection minHeight="300px">
              <LandoStyleSection />
            </LazySection>
          </div>

          {/* ON CRAFT / OFF CRAFT Section */}
          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <OnCraftOffCraft />
            </LazySection>
          </div>



          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <Portfolio />
            </LazySection>
          </div>

          {/* Pin + Flip */}
          <div className="scroll-reveal-section">
            <GSAPFlipSection />
          </div>

          {/* 3D Infinite Gallery Tunnel */}
          <div className="scroll-reveal-section">
            <InfiniteGallery3D />
          </div>

          {/* Pinned Editorial Showcase */}
          <div className="scroll-reveal-section">
            <EditorialShowcase />
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="200px">
              <LogoSlider />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <RandomTextReveal />
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <ScrollRevealGrid />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <Testimonials />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <PosterDesign />
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="300px">
              <FaqSection />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <Contact />
            </LazySection>
          </div>

          {/* Dual-band scrolling marquee before footer */}
          <FooterMarquee />
        </ScrollRevealWrapper>
      </main>

      {/* Fixed footer at bottom of viewport */}
      <Footer />
    </>
  );
}
