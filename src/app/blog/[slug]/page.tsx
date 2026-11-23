import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/data/blog';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const title = post ? `${post.title} — Blog` : 'Blog';
  const description = post ? post.description : 'Editorial design & engineering note by Dasun Methmal.';
  const canonicalUrl = `https://www.dasunmethmal.com/blog/${params.slug}`;
  const image = post?.heroImage || post?.image || '/images/cover_bg_2.png';

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: 'article', images: [{ url: image, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default function BlogSinglePage({ params }: Props) {
  const postIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  if (postIndex === -1) notFound();
  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="w-full bg-[#080808] text-white pt-24">
        <article className="w-full max-w-[1040px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
          {/* Top Breadcrumb */}
          <div className="flex items-center justify-between pb-6 mb-10 border-b border-dashed border-white/[0.15] font-mono text-xs tracking-[0.14em] uppercase">
            <Link href="/blog" className="text-zinc-400 hover:text-[#9CFF00] transition-colors">
              &lt; BACK TO BLOG
            </Link>
            <span className="text-[#9CFF00]">[{post.categoryLabel}]</span>
          </div>

          {/* Header */}
          <div className="space-y-5 mb-12">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-zinc-400">
              <span>BY {post.author}</span>
              <span className="w-1 h-1 bg-[#9CFF00]" />
              <span>{post.date}</span>
              <span className="w-1 h-1 bg-[#9CFF00]" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.04] text-white">
              {post.title}
            </h1>

            <p className="font-body text-base sm:text-xl text-zinc-400 leading-relaxed max-w-2xl">
              {post.description}
            </p>
          </div>

          {/* Hero Artwork */}
          <div className="relative w-full aspect-[16/10] bg-[#111111] border border-white/[0.1] overflow-hidden mb-12">
            <Image
              src={post.heroImage || post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1040px) 100vw, 1040px"
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="space-y-6 font-body text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl text-white font-medium pt-2">
              Design Direction &amp; Visual Hierarchy
            </h2>
            <p>
              Strong digital visuals start with deliberate restraint: clear focal hierarchy, disciplined grid alignment, and high-contrast typography that commands attention without visual clutter.
            </p>
            <p>
              For {post.title.toLowerCase()}, every composition element was structured to guide the eye immediately from headline to core message while maintaining sharp legibility across desktop and mobile feeds.
            </p>

            {/* Tools Used */}
            <div className="pt-8 border-t border-dashed border-white/[0.15]">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-500 block mb-3">
                TOOLS USED
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Post Pagination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-10 border-t border-dashed border-white/[0.15]">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group bg-[#111111] hover:bg-[#9CFF00] border border-white/[0.1] p-6 transition-colors"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-500 group-hover:text-black block mb-2">
                  &lt; PREVIOUS
                </span>
                <span className="font-display text-lg text-white group-hover:text-black block">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group bg-[#111111] hover:bg-[#9CFF00] border border-white/[0.1] p-6 transition-colors text-left sm:text-right"
              >
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-500 group-hover:text-black block mb-2">
                  NEXT &gt;
                </span>
                <span className="font-display text-lg text-white group-hover:text-black block">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
