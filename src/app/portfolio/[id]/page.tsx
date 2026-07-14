import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FooterMarquee from '@/components/sections/FooterMarquee';
import MouseScroll from '@/components/ui/MouseScroll';
import { portfolioSingles } from '@/data/portfolio';
import PortfolioSliderClient from './PortfolioSliderClient';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return portfolioSingles.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const project = portfolioSingles.find((p) => p.id === params.id);
  return {
    title: project ? `${project.title} — Unfold Portfolio` : 'Portfolio — Unfold',
  };
}

/**
 * Portfolio single page.
 * Full-screen hero, image slider, project details, and description.
 */
export default function PortfolioSinglePage({ params }: Props) {
  const project = portfolioSingles.find((p) => p.id === params.id);
  if (!project) notFound();

  return (
    <>
      <div className="site-inner">
        <Navbar />

        {/* Hero */}
        <div
          className="cover-v1 gradient-bottom-black"
          style={{
            backgroundImage: `url('${project.images[0]}')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '1140px',
              margin: '0 auto',
              padding: '0 15px',
              height: '100vh',
              minHeight: '650px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '800px' }}>
              <h1 className="heading">{project.title}</h1>
              <h2 className="subheading">{project.subtitle}</h2>
            </div>
          </div>
          <MouseScroll targetId="portfolio-single-section" />
        </div>

        {/* Portfolio content */}
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
          <div id="portfolio-single-section" className="unslate-section">

            {/* Back button */}
            <div style={{ textAlign: 'right', marginBottom: '40px' }}>
              <Link
                href="/#portfolio-section"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  background: '#212121',
                  borderRadius: '30px',
                  color: '#fff',
                  fontSize: '14px',
                  border: '2px solid transparent',
                  transition: 'border-color 0.3s',
                }}
              >
                ← Back to Portfolio
              </Link>
            </div>

            <h2 className="heading-portfolio-single">{project.title}</h2>

            {/* Image slider */}
            <PortfolioSliderClient images={project.images} />

            {/* Project metadata */}
            <div className="portfolio-single-details">
              {[
                { label: 'Project Date', value: project.date, isLink: false },
                { label: 'Role', value: project.role, isLink: false },
                { label: 'Client', value: project.client, isLink: false },
                { label: 'Visit', value: project.visitUrl, isLink: true },
              ].map((detail) => (
                <div key={detail.label}>
                  <span className="detail-label">{detail.label}</span>
                  {detail.isLink ? (
                    <a href={detail.value} className="detail-val" style={{ display: 'block' }}>
                      {detail.value}
                    </a>
                  ) : (
                    <span className="detail-val" style={{ display: 'block' }}>{detail.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Description columns */}
            <div className="portfolio-single-desc">
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                {project.description1}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                {project.description2}
              </p>
            </div>

          </div>
        </div>

        {/* Dual-band animated marquee above footer */}
        <FooterMarquee />
      </div>

      <Footer />
    </>
  );
}
