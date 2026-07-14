import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';

export default function Journal() {
  return (
    <section id="journal-section" className="unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="My Journal" />

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
    <div className="gsap-reveal-blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-item">
        <div className="blog-item-inner">
          <div className="blog-overlay">
            <div className="blog-overlay-content">
              <h3>{post.title}</h3>
              <p className="post-meta">
                By {post.author} <span>•</span> {post.readTime}
              </p>
            </div>
          </div>
          <img src={post.image} alt={post.title} loading="lazy" />
        </div>
      </Link>
    </div>
  );
}
