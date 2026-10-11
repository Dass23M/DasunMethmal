'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of Next.js 14 and Server Actions',
    excerpt: 'Explore how Server Actions in Next.js 14 are revolutionizing data mutation and reducing client-side JavaScript.',
    date: 'Oct 12, 2023',
    category: 'Development',
    image: '/images/post-1.png',
    slug: 'future-of-nextjs-14',
  },
  {
    id: 2,
    title: 'Mastering Technical SEO for Modern Web Apps',
    excerpt: 'A deep dive into optimizing Single Page Applications (SPAs) and SSR frameworks for search engines.',
    date: 'Sep 28, 2023',
    category: 'SEO',
    image: '/images/post-2.png',
    slug: 'technical-seo-modern-web-apps',
  },
  {
    id: 3,
    title: 'Building AI-Powered User Interfaces',
    excerpt: 'How to seamlessly integrate LLMs and generative AI features into your React applications.',
    date: 'Sep 15, 2023',
    category: 'AI / UX',
    image: '/images/post-3.png',
    slug: 'ai-powered-user-interfaces',
  },
];

export default function Blog() {
  return (
    <section id="blog-section" className="w-full bg-gray-50 dark:bg-[#080808] text-black dark:text-white py-16 sm:py-24 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            category="THOUGHT LEADERSHIP"
            title="LATEST INSIGHTS"
            subtitle="Exploring the intersection of fullstack engineering, digital marketing strategy, and applied artificial intelligence."
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link href={`#blog-section`} key={post.id} className="group block h-full">
              <div className="glass-card-premium hover-lift rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col group-hover:border-[#FF8A00]/40 group-hover:shadow-[0_12px_40px_rgba(255,138,0,0.12)]">
                
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden bg-black/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />
                  <div className="absolute inset-0 bg-[#FF8A00]/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
                    <span className="font-mono text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="font-mono text-xs text-white/50 mb-3 uppercase tracking-wider">
                    {post.date}
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-[#FF8A00] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-white/70 leading-relaxed mb-6 line-clamp-3 flex-1 font-light">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="flex items-center gap-2 mt-auto text-[#FF8A00] font-display font-semibold text-sm">
                    Read Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
                
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
