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
  images: {
    unoptimized: true,
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
