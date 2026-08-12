import fs from 'fs';
import path from 'path';

// Automatically ensure template images are copied to public/images when Next.js loads
try {
  const srcDir = path.resolve('./images');
  const destDir = path.resolve('./public/images');

  if (fs.existsSync(srcDir)) {
    fs.mkdirSync(destDir, { recursive: true });

    function copyRecursiveSync(src, dest) {
      if (!fs.existsSync(src)) return;
      const stats = fs.statSync(src);
      if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
          copyRecursiveSync(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    }

    copyRecursiveSync(srcDir, destDir);
    console.log('[Unfold Next.js] Synced images from ./images to ./public/images');
  }


} catch (err) {
  console.error('[Unfold Next.js] Failed to auto-copy images:', err);
}

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
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  async headers() {
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
    // Disable disk cache in development to resolve Windows file rename locks (ENOENT 0.pack.gz_)
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
