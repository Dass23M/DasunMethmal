import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import AcidBanner from '@/components/sections/AcidBanner';
import ServicesEditorial from '@/components/sections/ServicesEditorial';
import LogoSlider from '@/components/sections/LogoSlider';
import WorksResultsSection from '@/components/sections/WorksResultsSection';
import Testimonials from '@/components/sections/Testimonials';
import SpotlightSection from '@/components/sections/SpotlightSection';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="w-full bg-[#080808] text-white">
        <Hero />
        <About />
        <AcidBanner />
        <ServicesEditorial />
        <LogoSlider />
        <WorksResultsSection />
        <Testimonials />
        <SpotlightSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
