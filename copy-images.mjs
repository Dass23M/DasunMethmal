import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('./images');
const destDir = path.resolve('./public/images');

fs.mkdirSync(destDir, { recursive: true });

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
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

// Copy favicon to all Googlebot Search Favicon target paths
const favSrc = path.resolve('./public/images/favicon.ico.jpeg');
const targets = [
  './public/favicon.ico',
  './public/icon-192.png',
  './public/icon-512.png',
  './public/apple-touch-icon.png',
  './public/favicon-32x32.png',
  './src/app/favicon.ico',
];

if (fs.existsSync(favSrc)) {
  targets.forEach((targetPath) => {
    fs.copyFileSync(favSrc, path.resolve(targetPath));
  });
  console.log('Successfully generated all Googlebot Search Favicon target files!');
}

console.log('Successfully copied images to public/images');
