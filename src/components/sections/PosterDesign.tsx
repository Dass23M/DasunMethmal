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
      <div className="blog-item cursor-pointer rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:border-white/25">
        <div className="blog-item-inner relative">
          <div className="blog-overlay">
            <div className="blog-overlay-content">
              <h3 className="font-sora font-bold text-lg text-white">{post.title}</h3>
              <p className="post-meta font-mono text-xs text-[#FF6B00] mt-1">
                By {post.author} <span>•</span> {post.readTime}
              </p>
            </div>
          </div>
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={400}
            loading="lazy"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
