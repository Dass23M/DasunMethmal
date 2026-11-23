import fs from 'fs';
import path from 'path';

// Automatically ensure template images are copied to public/images without overwriting unchanged files
try {
  const srcDir = path.resolve('./images');
  const destDir = path.resolve('./public/images');

  if (fs.existsSync(srcDir)) {
    fs.mkdirSync(destDir, { recursive: true });

    function copyIfNeeded(src, dest) {
      if (!fs.existsSync(src)) return;
      const stats = fs.statSync(src);
      if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
          copyIfNeeded(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        });
      } else {
        if (!fs.existsSync(dest) || fs.statSync(dest).mtimeMs < stats.mtimeMs) {
          fs.copyFileSync(src, dest);
        }
      }
    }

    copyIfNeeded(srcDir, destDir);
  }
} catch (err) {
  console.error('[Unfold Next.js] Failed to auto-copy images:', err);
}

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {},
  async headers() {
    if (!isProd) {
      // Never cache unhashed dev chunks in the browser — prevents stale webpack.js & hydration errors
      return [
        {
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
            },
          ],
        },
      ];
    }

    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    // Use stable in-memory cache in dev on Windows (avoids disk lock ENOENT and stale module factories)
    if (dev) {
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
