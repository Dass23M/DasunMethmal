import dynamic from 'next/dynamic';
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

// Dynamically import heavy WebGL / GSAP interactive sections for fast initial page load
const ImageFanShowcase = dynamic(() => import('@/components/sections/ImageFanShowcase'), { ssr: false });
const LandoStyleSection = dynamic(() => import('@/components/sections/LandoStyleSection'), { ssr: false });
const Artifact3DSection = dynamic(() => import('@/components/sections/Artifact3DSection'), { ssr: false });
const GSAPFlipSection = dynamic(() => import('@/components/sections/GSAPFlipSection'), { ssr: false });
const EditorialShowcase = dynamic(() => import('@/components/sections/EditorialShowcase'), { ssr: false });
const PosterDesign = dynamic(() => import('@/components/sections/PosterDesign'), { ssr: false });

/**
 * Main one-page portfolio — home page.
 * Assembles all sections in order, with fixed footer reveal effect.
 */
export default function HomePage() {
  return (
    <>
      {/* Main content landmark — margin-bottom pushes content up to reveal fixed footer */}
      <main id="main-content" className="site-inner">
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <Hero />

        <div className="below-hero-reveal">
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

          {/* 3D WebGL HUD Generative Artifact Section */}
          <div className="scroll-reveal-section">
            <LazySection minHeight="600px">
              <Artifact3DSection />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="400px">
              <Portfolio />
            </LazySection>
          </div>

          {/* Pin + Flip */}
          <div className="scroll-reveal-section">
            <LazySection minHeight="600px">
              <GSAPFlipSection />
            </LazySection>
          </div>

          {/* Pinned Editorial Showcase */}
          <div className="scroll-reveal-section">
            <LazySection minHeight="500px">
              <EditorialShowcase />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="200px">
              <LogoSlider />
            </LazySection>
          </div>

          <div className="scroll-reveal-section">
            <LazySection minHeight="200px">
              <RandomTextReveal />
            </LazySection>
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
            <LazySection minHeight="600px">
              <PosterDesign />
            </LazySection>
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
        </div>
      </main>

      {/* Fixed footer at bottom of viewport */}
      <Footer />
    </>
  );
}
