import type { Metadata, Viewport } from 'next';
import { Sora, Inter, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import MobileMenu from '@/components/layout/MobileMenu';

// Dynamically import GSAP-dependent components
// to keep them out of the critical layout bundle.
const Loader = dynamic(() => import('@/components/layout/Loader'), {
  ssr: false,
});

const GSAPSectionAnimator = dynamic(
  () => import('@/components/providers/GSAPSectionAnimator'),
  {
    ssr: false,
  }
);

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

// -----------------------------------------------------------------------------
// Site configuration
// -----------------------------------------------------------------------------

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dasunmethmal.com';

const siteName = 'Dasun Methmal';

const siteTitle =
  'Dasun Methmal | Software Engineer & Full-Stack Developer';

const siteDescription =
  'Dasun Methmal is a Software Engineering graduate from Cardiff Metropolitan University, UK, specializing in Full-Stack Development, AI, Machine Learning, and modern web technologies.';

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
    'Dasun Methmal Software Engineer',
    'Software Engineer',
    'Full-Stack Developer',
    'Full Stack Developer',
    'Software Engineering Graduate',
    'Cardiff Metropolitan University',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Java Developer',
    'Spring Boot Developer',
    'TypeScript Developer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Web Developer',
    'Web Development',
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

  openGraph: {
    type: 'website',
    locale: 'en_US',

    url: siteUrl,

    siteName: siteName,

    title: siteTitle,

    description:
      'Official portfolio of Dasun Methmal, a Software Engineering graduate and Full-Stack Developer building modern web applications, AI solutions, and scalable digital products.',

    images: [
      {
        url: '/images/cover_bg_2.png',
        width: 1200,
        height: 630,
        alt: 'Dasun Methmal — Software Engineer & Full-Stack Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: siteTitle,

    description:
      'Portfolio of Dasun Methmal, Software Engineering graduate and Full-Stack Developer specializing in modern web technologies, AI, and machine learning.',

    images: ['/images/cover_bg_2.png'],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
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
        'Official portfolio website of Dasun Methmal, Software Engineer and Full-Stack Developer.',

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

      jobTitle: 'Software Engineer & Full-Stack Developer',

      description:
        'Dasun Methmal is a Software Engineering graduate from Cardiff Metropolitan University, UK, specializing in Full-Stack Development, AI, Machine Learning, and modern web technologies.',

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
        'Software Engineering',
        'Full-Stack Development',
        'Web Development',
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
        'Digital Products',
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
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
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