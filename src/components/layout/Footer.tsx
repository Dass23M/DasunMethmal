import Link from 'next/link';

/**
 * Fixed footer revealed by scrolling (desktop).
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center', paddingTop: '60px' }}>
            <div className="footer-logo" style={{ marginBottom: '30px' }}>
              <Link href="/">
                Methmal<span>.</span>
              </Link>
            </div>

            <ul className="footer-social">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Dribbble</a></li>
              <li><a href="#">Behance</a></li>
            </ul>

            <p className="site-copyright">
              Copyright &copy; {year} All rights reserved | This template is made with{' '}
              <span style={{ color: '#FF6B00' }}>♥</span> by{' '}
              <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
