'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';

gsap.registerPlugin(ScrollTrigger);

export default function PosterDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.gsap-reveal-blog-card');
      cards?.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 45, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: (idx % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section id="poster-design-section" ref={sectionRef} className="unslate-section select-none">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="POSTER & SOCIAL POST DESIGN" theme="dark" />

        <div>
          <div className="journal-row-1">
            <BlogCard post={blogPosts[0]} />
            <BlogCard post={blogPosts[1]} />
          </div>

          <div className="journal-row-2">
            <BlogCard post={blogPosts[2]} />
            <BlogCard post={blogPosts[3]} />
            <BlogCard post={blogPosts[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  post,
}: {
  post: (typeof blogPosts)[0];
}) {
  return (
    <div className="gsap-reveal-blog-card group">
      <div className="blog-item cursor-pointer rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-[#12131A] transition-all duration-500 hover:scale-[1.02] hover:border-white/25">
        
        {/* Poster Image Stage */}
        <div className="blog-item-inner relative overflow-hidden aspect-[4/3] w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Visible Image Header & Metadata */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0A0B0E]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              {post.readTime}
            </span>
            <span className="font-mono text-[10px] text-white/50 uppercase">{post.date}</span>
          </div>
          <h3 className="font-sora font-bold text-sm sm:text-base text-white tracking-tight leading-snug group-hover:text-[#FF6B00] transition-colors">
            {post.title}
          </h3>
        </div>

      </div>
    </div>
  );
}
