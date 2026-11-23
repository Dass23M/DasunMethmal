import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Design notes, visual direction studies, and engineering journal by Dasun Methmal.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-24">
        <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-12">
          <span className="font-mono text-xs tracking-[0.16em] uppercase text-[#9CFF00] block mb-4">
            [04 / BLOG &amp; JOURNAL]
          </span>
          <h1 className="font-display font-medium uppercase tracking-[-0.04em] leading-[0.9] text-[clamp(3.2rem,9vw,7.5rem)] text-white">
            Editorial<span className="text-[#9CFF00]">_</span>
            <br />
            Notes
          </h1>
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
          <div className="border-t border-dashed border-white/[0.15] pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-[#111111] border border-white/[0.1] hover:border-[#9CFF00] transition-colors flex flex-col justify-between"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#181818]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#E5E5E5] text-black font-mono text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-0.5">
                    {post.categoryLabel}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">
                      <span>{post.date}</span>
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="font-display text-xl font-medium text-white group-hover:text-[#9CFF00] transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-zinc-400 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dashed border-white/[0.1] flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 group-hover:text-white">
                    <span>READ ARTICLE</span>
                    <span className="text-[#9CFF00]">&gt;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
