import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
const FooterMarquee = dynamic(() => import('@/components/sections/FooterMarquee'));

// Below-the-fold dynamic code-splitting to eliminate initial thread blocking
const About = dynamic(() => import('@/components/sections/About'));
const Portfolio = dynamic(() => import('@/components/sections/Portfolio'));
const ImageFanShowcase = dynamic(() => import('@/components/sections/ImageFanShowcase'));
const LandoStyleSection = dynamic(() => import('@/components/sections/LandoStyleSection'));
const OnCraftOffCraft = dynamic(() => import('@/components/sections/OnCraftOffCraft'));
const Artifact3DSection = dynamic(() => import('@/components/sections/Artifact3DSection'), { ssr: false });
const GSAPFlipSection = dynamic(() => import('@/components/sections/GSAPFlipSection'), { ssr: false });
const EditorialShowcase = dynamic(() => import('@/components/sections/EditorialShowcase'));
const LogoSlider = dynamic(() => import('@/components/sections/LogoSlider'));
const RandomTextReveal = dynamic(() => import('@/components/sections/RandomTextReveal'));
const ScrollRevealGrid = dynamic(() => import('@/components/sections/ScrollRevealGrid'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const PosterDesign = dynamic(() => import('@/components/sections/PosterDesign'), { ssr: false });
const FaqSection = dynamic(() => import('@/components/sections/FaqSection'));
const Contact = dynamic(() => import('@/components/sections/Contact'));

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
            <ImageFanShowcase />
          </div>

          {/* Lando Norris Style Banner Section - Directly Below ImageFanShowcase */}
          <div className="scroll-reveal-section">
            <LandoStyleSection />
          </div>

          {/* ON CRAFT / OFF CRAFT Section */}
          <div className="scroll-reveal-section">
            <OnCraftOffCraft />
          </div>

          {/* 3D WebGL HUD Generative Artifact Section */}
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

          {/* Dual-band scrolling marquee before footer */}
          <FooterMarquee />
        </div>
      </main>

      {/* Fixed footer at bottom of viewport */}
      <Footer />
    </>
  );
}
