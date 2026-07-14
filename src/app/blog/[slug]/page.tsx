import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FooterMarquee from '@/components/sections/FooterMarquee';
import MouseScroll from '@/components/ui/MouseScroll';
import { blogPosts } from '@/data/blog';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  return {
    title: post ? `${post.title} — Unfold Journal` : 'Journal — Unfold',
    description: post ? `${post.title} by ${post.author}` : '',
  };
}

/**
 * Blog single page.
 * - Full-screen parallax hero with post title and meta
 * - Article content with images
 * - Threaded comments list
 * - Leave a comment form
 * - Post navigation (prev/next)
 */
export default function BlogSinglePage({ params }: Props) {
  const postIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  if (postIndex === -1) notFound();
  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <>
      <div className="site-inner">
        <Navbar />

        {/* Hero */}
        <div
          className="cover-v1 overlay page-cover-fixed"
          style={{
            backgroundImage: `url('${post.heroImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="page-cover-inner">
            <div style={{ textAlign: 'center', maxWidth: '720px', padding: '0 8px' }}>
              <h1 className="blog-heading">{post.title}</h1>
              <p style={{ fontSize: '16px', color: '#fff', marginTop: '12px' }}>
                By {post.author} on {post.date} &bull; {post.readTime}
              </p>
            </div>
          </div>
          <MouseScroll targetId="blog-single-section" />
        </div>

        {/* Blog content */}
        <div id="blog-single-section" className="unslate-section">
          <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>

              <h3 style={{ marginBottom: '20px', color: '#fff', fontWeight: 700 }}>
                On her way she met a copy
              </h3>
              <p style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                Far far away, behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                right at the coast of the Semantics, a large language ocean.
              </p>
              <p style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                A small river named Duden flows by their place and supplies it with the necessary
                regelialia. It is a paradisematic country, in which roasted parts of sentences fly
                into your mouth.
              </p>
              <p style={{ marginBottom: '20px' }}>
                <img src="/images/work_1_a_full.jpg" alt="Blog image" style={{ width: '100%', height: 'auto' }} />
              </p>
              <p style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                Even the all-powerful Pointing has no control about the blind texts it is an almost
                unorthographic life One day however a small line of blind text by the name of Lorem
                Ipsum decided to leave for the far World of Grammar.
              </p>
              <p style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                The Big Oxmox advised her not to do so, because there were thousands of bad Commas,
                wild Question Marks and devious Semikoli, but the Little Blind Text didn&apos;t listen.
              </p>
              <p style={{ marginBottom: '30px' }}>
                <img src="/images/work_1_full.jpg" alt="Blog image 2" style={{ width: '100%', height: 'auto' }} />
              </p>
              <p style={{ marginBottom: '30px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.8' }}>
                When she reached the first hills of the Italic Mountains, she had a last view back
                on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and
                the subline of her own road, the Line Lane.
              </p>

              {/* Categories / Tags */}
              <div style={{ paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' }}>
                <p style={{ fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  Categories:{' '}
                  <a href="#" style={{ color: '#fff' }}>Design</a>,{' '}
                  <a href="#" style={{ color: '#fff' }}>Events</a>{' '}
                  &nbsp; Tags:{' '}
                  <a href="#" style={{ color: '#fff' }}>#html</a>,{' '}
                  <a href="#" style={{ color: '#fff' }}>#trends</a>
                </p>
              </div>

              {/* Post navigation */}
              <div className="post-navigation">
                <div className="post-nav-prev">
                  {prevPost && (
                    <Link href={`/blog/${prevPost.slug}`}>
                      <span className="post-nav-label">Previous Post</span>
                      <span className="post-nav-title">{prevPost.title}</span>
                    </Link>
                  )}
                </div>
                <div className="post-nav-next">
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`}>
                      <span className="post-nav-label">Next Post</span>
                      <span className="post-nav-title">{nextPost.title}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Comments */}
              <div style={{ paddingTop: '50px' }}>
                <h3 style={{ marginBottom: '40px', color: '#fff', fontWeight: 700, fontSize: '22px' }}>
                  6 Comments
                </h3>

                <ul className="comment-list">
                  <CommentItem
                    name="Irish Smith"
                    date="January 9, 2018 at 2:21pm"
                    image="/images/person_woman_2.jpg"
                  />
                  <li style={{ listStyle: 'none', width: '100%', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div className="comment-vcard">
                        <img
                          src="/images/person_woman_1.jpg"
                          alt="Christine Stewart"
                          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="comment-body">
                        <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '4px' }}>Christine Stewart</h3>
                        <div className="comment-meta">January 9, 2018 at 2:21pm</div>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus.
                        </p>
                        <a href="#" className="reply-btn">Reply</a>
                      </div>
                    </div>
                    {/* Nested children */}
                    <ul className="comment-children" style={{ paddingLeft: '60px', listStyle: 'none', marginTop: '20px' }}>
                      <CommentItem
                        name="Chintan Patel"
                        date="January 9, 2018 at 2:21pm"
                        image="/images/person_man_3.jpg"
                      />
                      <ul className="comment-children" style={{ paddingLeft: '60px', listStyle: 'none', marginTop: '20px' }}>
                        <CommentItem
                          name="John Doe"
                          date="January 9, 2018 at 2:21pm"
                          image="/images/person_man_2.jpg"
                        />
                        <ul className="comment-children" style={{ paddingLeft: '60px', listStyle: 'none', marginTop: '20px' }}>
                          <CommentItem
                            name="Ben Afflick"
                            date="January 9, 2018 at 2:21pm"
                            image="/images/person_man_1.jpg"
                          />
                        </ul>
                      </ul>
                    </ul>
                  </li>
                  <CommentItem
                    name="Jean Doe"
                    date="January 9, 2018 at 2:21pm"
                    image="/images/person_woman_3.jpg"
                  />
                </ul>
              </div>

              {/* Comment Form */}
              <div style={{ paddingTop: '50px', marginBottom: '60px' }}>
                <h3 style={{ marginBottom: '40px', color: '#fff', fontWeight: 700, fontSize: '22px' }}>
                  Leave a comment
                </h3>
                <form className="form-outline" action="#">
                  <div className="form-group" style={{ position: 'relative', marginBottom: '50px' }}>
                    <label htmlFor="comment-name">Name *</label>
                    <input type="text" id="comment-name" className="form-control" />
                  </div>
                  <div className="form-group" style={{ position: 'relative', marginBottom: '50px' }}>
                    <label htmlFor="comment-email">Email *</label>
                    <input type="email" id="comment-email" className="form-control" />
                  </div>
                  <div className="form-group" style={{ position: 'relative', marginBottom: '50px' }}>
                    <label htmlFor="comment-website">Website</label>
                    <input type="url" id="comment-website" className="form-control" />
                  </div>
                  <div className="form-group" style={{ position: 'relative', marginBottom: '50px' }}>
                    <label htmlFor="comment-message">Message</label>
                    <textarea id="comment-message" rows={5} className="form-control" />
                  </div>
                  <div>
                    <button type="submit" className="btn-outline-pill">
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>

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

function CommentItem({
  name,
  date,
  image,
}: {
  name: string;
  date: string;
  image: string;
}) {
  return (
    <li style={{ listStyle: 'none', display: 'flex', gap: '20px', marginBottom: '30px', width: '100%' }}>
      <div className="comment-vcard">
        <img
          src={image}
          alt={name}
          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <div className="comment-body">
        <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '4px' }}>{name}</h3>
        <div className="comment-meta">{date}</div>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum
          necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure!
        </p>
        <a href="#" className="reply-btn">Reply</a>
      </div>
    </li>
  );
}
