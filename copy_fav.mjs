import fs from 'fs';
import path from 'path';

const src = path.resolve('public/images/favicon.ico.jpeg');

const targets = [
  'public/favicon.ico',
  'src/app/favicon.ico',
  'public/favicon.png',
  'public/favicon-32x32.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/apple-touch-icon.png'
];

if (fs.existsSync(src)) {
  targets.forEach((targetPath) => {
    const fullDest = path.resolve(targetPath);
    fs.mkdirSync(path.dirname(fullDest), { recursive: true });
    fs.copyFileSync(src, fullDest);
  });
  console.log('SUCCESSFULLY GENERATED ALL FAVICONS AND ICONS IN PUBLIC!');
} else {
  console.error('Source file not found at:', src);
}
