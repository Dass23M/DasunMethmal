import type { Metadata, Viewport } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import MobileMenu from '@/components/layout/MobileMenu';
import Loader from '@/components/layout/Loader';
import GSAPSectionAnimator from '@/components/providers/GSAPSectionAnimator';
import LenisBackgroundCanvas from '@/components/ui/LenisBackgroundCanvas';
import CustomCursor from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

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

// We load JetBrains Mono via <link> tags in the document head 
// to prevent Next.js build timeouts (AbortError) when fetching from Google Fonts API.

// -----------------------------------------------------------------------------
// Site configuration
// -----------------------------------------------------------------------------

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dasunmethmal.com';

const siteName = 'Dasun Methmal';

const siteTitle =
  'Dasun Methmal | Full-Stack Developer & Digital Marketer';

const siteDescription =
  'Dasun Methmal is a Software Engineering graduate from Cardiff Metropolitan University, UK, specializing in Full-Stack Development, Digital Marketing, SEO, AI, Machine Learning, and modern web technologies.';

// -----------------------------------------------------------------------------
// Viewport
// -----------------------------------------------------------------------------

export const viewport: Viewport = {
  themeColor: '#FF6B00',
  width: 'device-width',
  initialScale: 1,
};

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: '%s | Dasun Methmal',
  },

  description: siteDescription,

  keywords: [
    'Dasun Methmal',
    'Dasun Methmal Portfolio',
    'Dasun Methmal Full Stack Developer',
    'Dasun Methmal Digital Marketer',
    'Full-Stack Developer',
    'Full Stack Developer',
    'Digital Marketer',
    'Digital Marketing',
    'SEO Specialist',
    'SEO',
    'Web Developer',
    'Software Engineer',
    'Software Engineering Graduate',
    'Cardiff Metropolitan University',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Java Developer',
    'Spring Boot Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Web Development',
    'Modern Web Applications',
    'Search Engine Optimization',
    'Social Media Marketing',
    'Digital Products',
  ],

  authors: [
    {
      name: 'Dasun Methmal',
      url: 'https://github.com/Dass23M',
    },
  ],

  creator: 'Dasun Methmal',
  publisher: 'Dasun Methmal',

  applicationName: 'Dasun Methmal Portfolio',

  category: 'technology',

  referrer: 'origin-when-cross-origin',

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

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },



  // ---------------------------------------------------------------------------
  // Open Graph
  // ---------------------------------------------------------------------------

  openGraph: {
    type: 'website',

    locale: 'en_US',

    url: siteUrl,

    siteName: siteName,

    title: siteTitle,

    description:
      'Official portfolio of Dasun Methmal, a Full-Stack Developer and Digital Marketer specializing in modern web applications, SEO, digital marketing, AI, and scalable digital products.',

    images: [
      {
        url: '/images/cover_bg_2.png',
        width: 1200,
        height: 630,
        alt: 'Dasun Methmal — Full-Stack Developer & Digital Marketer',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Twitter / X
  // ---------------------------------------------------------------------------

  twitter: {
    card: 'summary_large_image',

    title: siteTitle,

    description:
      'Portfolio of Dasun Methmal, Full-Stack Developer and Digital Marketer specializing in web development, SEO, digital marketing, AI, and modern digital products.',

    images: ['/images/cover_bg_2.png'],
  },
};

// -----------------------------------------------------------------------------
// JSON-LD Structured Data
// -----------------------------------------------------------------------------

const jsonLd = {
  '@context': 'https://schema.org',

  '@graph': [
    // -------------------------------------------------------------------------
    // Website
    // -------------------------------------------------------------------------
    {
      '@type': 'WebSite',

      '@id': `${siteUrl}/#website`,

      url: siteUrl,

      name: siteName,

      description:
        'Official portfolio website of Dasun Methmal, Full-Stack Developer and Digital Marketer.',

      inLanguage: 'en-US',

      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },

    // -------------------------------------------------------------------------
    // Person
    // -------------------------------------------------------------------------
    {
      '@type': 'Person',

      '@id': `${siteUrl}/#person`,

      name: 'Dasun Methmal',

      url: siteUrl,

      jobTitle: 'Full-Stack Developer & Digital Marketer',

      description:
        'Dasun Methmal is a Software Engineering graduate from Cardiff Metropolitan University, UK, specializing in Full-Stack Development, Digital Marketing, SEO, AI, Machine Learning, and modern web technologies.',

      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Cardiff Metropolitan University',
      },

      sameAs: [
        'https://www.linkedin.com/in/dasun-methmal-607333230',
        'https://github.com/Dass23M',
        'https://www.instagram.com/_dase23_',
        'https://www.tiktok.com/@dcode33',
        'https://www.facebook.com/share/19NZDkGEqc',
      ],

      knowsAbout: [
        'Full-Stack Development',
        'Web Development',
        'Software Engineering',
        'Digital Marketing',
        'Search Engine Optimization',
        'SEO',
        'Social Media Marketing',
        'Digital Products',
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Java',
        'Spring Boot',
        'Python',
        'Machine Learning',
        'Artificial Intelligence',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Root Layout
// -----------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance hints */}
        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body
        className={`${sora.variable} ${inter.variable} bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-sans`}
        style={{ '--font-mono': '"JetBrains Mono", monospace' } as React.CSSProperties}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScrollProvider>
            <LenisBackgroundCanvas />
            <GSAPSectionAnimator>
              {/* Custom Interactive Cursor */}
              <CustomCursor />

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
        </ThemeProvider>
      </body>
    </html>
  );
}
