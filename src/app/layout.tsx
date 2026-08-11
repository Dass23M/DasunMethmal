import type { Metadata, Viewport } from 'next';
import { Sora, Inter, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import MobileMenu from '@/components/layout/MobileMenu';

// Dynamically import GSAP-dependent components to keep them out of the critical layout bundle
const Loader = dynamic(() => import('@/components/layout/Loader'), { ssr: false });
const GSAPSectionAnimator = dynamic(() => import('@/components/providers/GSAPSectionAnimator'), { ssr: false });

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FF6B00',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dasunmethmal.com'),
  title: 'Dasun Methmal — Fullstack Developer & Digital Marketer Portfolio',
  description:
    'Dasun Methmal is a Fullstack Developer, AI Engineer & Tech Strategist building modern web applications, scalable platforms, and high-impact digital products.',
  keywords: [
    'Dasun Methmal',
    'Dasun Methmal Portfolio',
    'Methmal',
    'Fullstack Developer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Next.js Developer',
    'React Developer',
    'Digital Marketer',
    'Web Development Portfolio',
  ],
  authors: [{ name: 'Dasun Methmal', url: 'https://github.com/Dass23M' }],
  creator: 'Dasun Methmal',
  publisher: 'Dasun Methmal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dasunmethmal.com',
    title: 'Dasun Methmal — Fullstack Developer & Digital Marketer Portfolio',
    description:
      'Explore Dasun Methmal’s engineering portfolio featuring Web Development, Machine Learning, AI Applications, and High-Performance Web Architecture.',
    siteName: 'Dasun Methmal Portfolio',
    images: [
      {
        url: '/images/cover_bg_2.png',
        width: 1200,
        height: 630,
        alt: 'Dasun Methmal Fullstack Portfolio',
      },
    ],
  },
  alternates: {
    canonical: 'https://dasunmethmal.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dasun Methmal — Fullstack Developer & Digital Marketer',
    description:
      'Fullstack Developer & AI Engineer portfolio showcasing web apps, predictive models, and growth solutions.',
    images: ['/images/cover_bg_2.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://dasunmethmal.com/#website',
      url: 'https://dasunmethmal.com',
      name: 'Dasun Methmal Portfolio',
      description: 'Dasun Methmal — Fullstack Developer & AI Engineer Portfolio',
      inLanguage: 'en-US',
    },
    {
      '@type': 'Person',
      '@id': 'https://dasunmethmal.com/#person',
      name: 'Dasun Methmal',
      jobTitle: 'Fullstack Developer & AI Engineer',
      url: 'https://dasunmethmal.com',
      sameAs: [
        'https://www.linkedin.com/in/dasun-methmal-607333230',
        'https://www.facebook.com/share/19NZDkGEqc',
        'https://www.instagram.com/_dase23_',
        'https://www.tiktok.com/@dcode33',
        'https://github.com/Dass23M',
      ],
      knowsAbout: [
        'Web Development',
        'Machine Learning',
        'Next.js',
        'TypeScript',
        'React',
        'Python',
        'Digital Marketing',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {/* Smooth weighted scroll & GSAP section animator providers */}
        <SmoothScrollProvider>
          <GSAPSectionAnimator>
            {/* Page loader */}
            <Loader />

            {/* Mobile slide-out menu */}
            <MobileMenu />

            {/* Main site wrapper */}
            <div className="unslate_co--site-wrap">
              {children}
            </div>
          </GSAPSectionAnimator>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
